// ======================================================
// ECO LAÇO - DIAS DE COLETA
// ======================================================

let cidadesRegiao = {};
let mapa;

// ======================================================
// INICIAR MAPA
// ======================================================

function iniciarMapa() {
    if (mapa) return;

    const elementoMapa = document.getElementById('mapa-regiao');
    if (!elementoMapa) {
        console.error('ERRO: elemento #mapa-regiao não encontrado.');
        return;
    }

    mapa = L.map('mapa-regiao').setView([-23.1600, -49.9698], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(mapa);
}

// ======================================================
// CARREGAR CIDADES
// ======================================================

async function carregarCidades() {
    iniciarMapa();

    try {
        // CAMINHO CORRETO: saindo de /html e indo para /api
        const urlAPI = '../api/cidades.php';
        
        console.log('Buscando cidades em:', urlAPI);

        const resposta = await fetch(urlAPI, {
            method: 'GET',
            cache: 'no-cache'
        });

        console.log('Status da API:', resposta.status);

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const texto = await resposta.text();
        console.log('Resposta recebida da API:', texto);

        if (!texto.trim()) {
            throw new Error('A API retornou uma resposta vazia.');
        }

        let dados;
        try {
            dados = JSON.parse(texto);
        } catch (erroJSON) {
            console.error('A resposta recebida NÃO é um JSON válido:', texto);
            throw new Error('cidades.php não retornou JSON válido.');
        }

        console.log('Cidades recebidas:', dados);

        if (!Array.isArray(dados)) {
            throw new Error('cidades.php não retornou uma lista de cidades.');
        }

        cidadesRegiao = {};

        dados.forEach(cidade => {
            const id = Number(cidade.id);
            const latitude = Number(cidade.latitude);
            const longitude = Number(cidade.longitude);

            console.log('Processando cidade:', cidade.nome, latitude, longitude);

            if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
                console.warn('Cidade ignorada por coordenadas inválidas:', cidade);
                return;
            }

            cidadesRegiao[id] = {
                id: id,
                nome: cidade.nome,
                coordenadas: [latitude, longitude],
                temInfo: Number(cidade.tem_info) === 1
            };
        });

        console.log('Cidades processadas:', cidadesRegiao);

        adicionarMarcadores();
        ajustarMapaParaCidades();

    } catch (erro) {
        console.error('ERRO AO CARREGAR CIDADES:', erro);
        mostrarErroMapa(erro.message);
    }
}

// ======================================================
// ADICIONAR MARCADORES
// ======================================================

function adicionarMarcadores() {
    if (!mapa) {
        console.error('Não é possível adicionar marcadores: mapa não existe.');
        return;
    }

    const cidades = Object.values(cidadesRegiao);
    console.log(`Adicionando ${cidades.length} marcadores.`);

    if (cidades.length === 0) {
        console.warn('Nenhuma cidade disponível para criar marcadores.');
        return;
    }

    cidades.forEach(cidade => {
        const marcador = L.marker(cidade.coordenadas).addTo(mapa);

        marcador.bindPopup(`
            <div style="min-width:180px; text-align:center;">
                <strong style="font-size:17px; color:#163020;">
                    ${cidade.nome}
                </strong>
                <br><br>
                ${cidade.temInfo 
                    ? `<span style="color:#2f5d3b; font-weight:600;">✓ Informações disponíveis</span>`
                    : `<span style="color:#9b6a00; font-weight:600;">⚠ Informações em implementação</span>`
                }
            </div>
        `);

        marcador.on('click', function() {
            selecionarCidade(cidade);
        });
    });
}

// ======================================================
// AJUSTAR MAPA PARA AS CIDADES
// ======================================================

function ajustarMapaParaCidades() {
    if (!mapa) return;

    const cidades = Object.values(cidadesRegiao);
    if (cidades.length === 0) return;

    const coordenadas = cidades.map(cidade => cidade.coordenadas);
    const limites = L.latLngBounds(coordenadas);
    mapa.fitBounds(limites, { padding: [40, 40] });
}

// ======================================================
// ERRO NO MAPA
// ======================================================

function mostrarErroMapa(mensagem) {
    const mapaElemento = document.getElementById('mapa-regiao');
    if (!mapaElemento) return;

    const aviso = document.createElement('div');
    aviso.style.position = 'absolute';
    aviso.style.zIndex = '1000';
    aviso.style.top = '20px';
    aviso.style.left = '20px';
    aviso.style.right = '20px';
    aviso.style.padding = '15px 20px';
    aviso.style.background = '#fff4d6';
    aviso.style.border = '2px solid #ffc107';
    aviso.style.borderRadius = '12px';
    aviso.style.color = '#6b5200';
    aviso.style.fontWeight = '600';
    aviso.innerHTML = `
        ⚠ Não foi possível carregar as cidades.
        <br>
        <small>${mensagem}</small>
    `;

    mapaElemento.style.position = 'relative';
    mapaElemento.appendChild(aviso);
}

// ======================================================
// SELECIONAR CIDADE
// ======================================================

async function selecionarCidade(cidade) {
    const container = document.getElementById('cidade-selecionada');
    if (!container) {
        console.error('Elemento #cidade-selecionada não encontrado.');
        return;
    }

    // CIDADE SEM INFORMAÇÃO
    if (!cidade.temInfo) {
        container.innerHTML = `
            <div class="aviso">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>Cidade em implementação</strong>
                    <br>
                    As informações de coleta para <strong>${cidade.nome}</strong> ainda estão sendo cadastradas.
                </div>
            </div>
        `;
        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
    }

    // CARREGANDO
    container.innerHTML = `
        <div class="aviso">
            <i class="fas fa-spinner fa-spin"></i>
            <div>
                <strong>Carregando informações...</strong>
                <br>
                Buscando os dias de coleta de ${cidade.nome}.
            </div>
        </div>
    `;
    container.style.display = 'block';

    // BUSCAR BAIRROS
    try {
        const url = `../api/bairros.php?cidade_id=${cidade.id}`;
        console.log('Buscando bairros:', url);

        const resposta = await fetch(url, {
            method: 'GET',
            cache: 'no-cache'
        });

        if (!resposta.ok) {
            throw new Error(`Erro HTTP ${resposta.status}`);
        }

        const texto = await resposta.text();
        console.log('Resposta bairros:', texto);

        let bairros;
        try {
            bairros = JSON.parse(texto);
        } catch (erroJSON) {
            throw new Error('bairros.php não retornou JSON válido.');
        }

        if (!Array.isArray(bairros)) {
            throw new Error('bairros.php não retornou uma lista válida.');
        }

        // SEM BAIRROS
        if (bairros.length === 0) {
            container.innerHTML = `
                <div class="aviso">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Informações de coleta não cadastradas</strong>
                        <br>
                        Ainda não existem bairros cadastrados para <strong>${cidade.nome}</strong>.
                    </div>
                </div>
            `;
            container.style.display = 'block';
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            return;
        }

        // AGRUPAR BAIRROS
        const grupos = {};
        bairros.forEach(bairro => {
            const tipo = bairro.tipo_coleta || 'Regular';
            const dia = bairro.dia_coleta || '';
            const horario = bairro.horario || '';
            const observacao = bairro.observacao || '';
            const chave = `${tipo}|${dia}|${horario}|${observacao}`;

            if (!grupos[chave]) {
                grupos[chave] = {
                    tipo: tipo,
                    dia: dia,
                    horario: horario,
                    observacao: observacao,
                    bairros: []
                };
            }
            grupos[chave].bairros.push(bairro.nome);
        });

        // GERAR CARDS
        let diasColetaHTML = '';
        Object.values(grupos).forEach(grupo => {
            let icone = 'fa-recycle';
            const tipoTexto = grupo.tipo.toLowerCase();
            const observacaoTexto = grupo.observacao.toLowerCase();

            if (observacaoTexto.includes('diurna') || grupo.horario.toLowerCase().includes('07h')) {
                icone = 'fa-sun';
            } else if (observacaoTexto.includes('noturna') || grupo.horario.toLowerCase().includes('16h')) {
                icone = 'fa-moon';
            } else if (tipoTexto.includes('especial')) {
                icone = 'fa-star';
            }

            let titulo = 'Coleta Regular';
            if (tipoTexto.includes('seletiva')) {
                titulo = 'Coleta Seletiva';
            } else if (tipoTexto.includes('especial')) {
                titulo = 'Coleta Especial';
            } else if (grupo.observacao) {
                titulo = `Coleta Comum • ${grupo.observacao}`;
            }

            const bairrosHTML = grupo.bairros.map(bairro => `
                <div class="bairro-item">
                    <i class="fas fa-leaf"></i>
                    <span>${bairro}</span>
                </div>
            `).join('');

            const horarioHTML = grupo.horario ? `
                <span class="horario-coleta">
                    <i class="far fa-clock"></i> ${grupo.horario}
                </span>
            ` : '';

            diasColetaHTML += `
                <div class="dia-card">
                    <div class="dia-header">
                        <h3><i class="fas ${icone}"></i> ${titulo}</h3>
                        ${grupo.dia ? `<div class="dias-semana">${grupo.dia.toUpperCase()}</div>` : ''}
                        ${horarioHTML}
                    </div>
                    <div class="bairros-list">${bairrosHTML}</div>
                </div>
            `;
        });

        // MOSTRAR RESULTADOS
        container.innerHTML = `
            <div class="cidade-header">
                <h2>Dias de Coleta - ${cidade.nome}</h2>
                <button type="button" class="btn-voltar" onclick="voltarParaMapa()">
                    <i class="fas fa-arrow-left"></i> Voltar
                </button>
            </div>
            <div class="search-bairros-container">
                <div class="search-bairros-box">
                    <input type="text" class="search-input" placeholder="Buscar bairro..." id="searchBairro">
                    <i class="fas fa-search search-icon"></i>
                </div>
            </div>
            <div class="dias-coleta">${diasColetaHTML}</div>
        `;

        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // BUSCAR BAIRRO
        const campoBusca = document.getElementById('searchBairro');
        if (campoBusca) {
            campoBusca.addEventListener('input', buscarBairros);
        }

    } catch (erro) {
        console.error('Erro ao carregar bairros:', erro);
        container.innerHTML = `
            <div class="aviso">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>Erro ao carregar os dados</strong>
                    <br>
                    Não foi possível carregar os dados de coleta de <strong>${cidade.nome}</strong>.
                    <br><br>
                    <small>${erro.message}</small>
                </div>
            </div>
        `;
        container.style.display = 'block';
    }
}

// ======================================================
// BUSCAR BAIRRO
// ======================================================

function buscarBairros() {
    const campo = document.getElementById('searchBairro');
    if (!campo) return;

    const termo = campo.value.toLowerCase().trim();
    const bairros = document.querySelectorAll('.bairro-item');

    bairros.forEach(item => {
        const texto = item.textContent.toLowerCase();
        item.style.display = texto.includes(termo) ? 'flex' : 'none';
    });
}

// ======================================================
// VOLTAR PARA O MAPA
// ======================================================

function voltarParaMapa() {
    const container = document.getElementById('cidade-selecionada');
    if (!container) return;

    container.style.display = 'none';
    const mapaElemento = document.getElementById('mapa-regiao');
    if (mapaElemento) {
        mapaElemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ======================================================
// BUSCAR CIDADE
// ======================================================

function buscarCidade() {
    const campo = document.getElementById('searchCidade');
    if (!campo) return;

    const termo = campo.value.toLowerCase().trim();
    if (!termo) {
        alert('Digite o nome de uma cidade.');
        return;
    }

    console.log('Procurando cidade:', termo);
    console.log('Cidades disponíveis:', cidadesRegiao);

    const cidadeEncontrada = Object.values(cidadesRegiao).find(cidade =>
        cidade.nome.toLowerCase().includes(termo)
    );

    if (!cidadeEncontrada) {
        alert('Cidade não encontrada!');
        return;
    }

    mapa.setView(cidadeEncontrada.coordenadas, 13);
    selecionarCidade(cidadeEncontrada);
}

// ======================================================
// CONFIGURAR PESQUISA
// ======================================================

function configurarBuscaCidade() {
    const botao = document.getElementById('btnBuscar');
    const campo = document.getElementById('searchCidade');

    if (botao) {
        botao.addEventListener('click', buscarCidade);
    }

    if (campo) {
        campo.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                buscarCidade();
            }
        });
    }
}

// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('EcoLaço - Coleta iniciado.');
    configurarBuscaCidade();
    carregarCidades();
});