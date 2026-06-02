// =========================
// DADOS DAS CIDADES
// =========================

const cidadesRegiao = {

    'jacarezinho': {
        nome: 'Jacarezinho',
        coordenadas: [-23.1600, -49.9698],
        temInfo: true,

        diasColeta: {

            'segunda-quarta-sexta': [
                'Aeroporto',
                'V. Nossa Senhora das Graças',
                'Alto da Boa Vista',
                'Centro', 'Parque Industrial III',
                'Loteamento São Sebastião',
                'Arboris',
                'Residencial Riviera',
                'Jd. Alves',
                'Loteamento Parque Ecológico',
                'Jd. América',
                'Jd. Arruda',
                'Jd. Barão',
                'Jd. Cabral',
                'Jd. Canadá I e II',
                'Jd. Castro',
                'Jd. Cristo Rei',
                'Jd. Ismênia',
                'Jd. Kirei',
                'Jd. Maria Lúcia',
                'Jd. Marimar',
                'Jd. Popular',
                'Jd. São Francisco',
                'Jd. São Luis I e II',
                'Jd. São Paulo',
                'V. N. S. das Graças',
                'Parque dos Ipês',
                'Novo Aeroporto',
                'Jardim Alto Aeroporto',
                'Papagaios',
                'Paraiso',
                'Pq. Alvorada',
                'Pq. Bela Vista',
                'Pq. Dos Mirantes',
                'Pq. Santa Albertina',
                'Scyllas Peixoto',
                'V. Maria Angélica',
                'Vila Alves',
                'Vila Ema',
                'Vila Leão',
                'Novo Texas',
                'Vila Rosa',
                'Residencial Tonet',
                'Vila São Pedro',
                'J. Paraiso II',
                'Parque das Flores',
                'Vila Scyllas' 
            ],

            'terca-quinta-sabado': [
                'Centro',
                'Arboris',
                'Residencial Riviera',
                'Parque Industrial III',
                'Loteamento São Sebastião',
                'Ch. Maravilha',
                'Cj. H. Anita Moreira',
                'Residencial Unigarden',
                'Parque dos Estudantes II',
                'Country Club',
                'D. Pedro Filipak',
                'Jardim Primavera',
                'Inocoop',
                'Jardim Batista',
                'Jd. Alto da Boa Vista',
                'Jd. Europa',
                'Jd. João Afonso',
                'Jd. Miguel Afonso',
                'Jd. Lamura',
                'Jd. Leonor',
                'Jd. Maria Estela',
                'Jd. Marina',
                'Jd. Maristela',
                'Jd. Marumbi',
                'Jd. Morada do Sol',
                'Jd. Panorama',
                'Jd. Santa Rita',
                'Nova Alcântara',
                'Nova Jacarezinho',
                'Pedro Scandolo',
                'Pq. dos Estudantes',
                'Res. Campo Belo',
                'Res. Campo Belo II',
                'Res. Pompéia II',
                'Res. Pompéia III',
                'Vila Aggêo',
                'Vila Delamura',
                'Vila Delminda',
                'Vila Jardim',
                'Vila Maria',
                'Vila Prestes',
                'Vila Ribeiro',
                'Vila Rondon',
                'Vila Santana',
                'Vila Setti'
            ],

            'especiais': [ 
                { dias: 'TERÇAS E SÁBADOS', 
                    bairros: ['Marques dos Reis', 'Cadd', 'Cofadd'] },

                { dias: 'QUARTAS E SÁBADOS', 
                    bairros: ['Vila Rural'] }
            ]
        }
    },

    'cambara': {
        nome: 'Cambará',
        coordenadas: [-23.0444, -50.0733],
        temInfo: true,

        diasColeta: {

            'segunda-sexta': [
                'Av. Getúlio Vargas',
                'Rua Dona Úrsula'
            ],

            'terca-quinta': [
                'Sede'
            ],

            'quarta-regular': [
                'Vila Unidos',
                'Vila Santana'
            ]
        }
    },

    'cornelio-procopio': {
        nome: 'Cornélio Procópio',
        coordenadas: [-23.1811, -50.6467],
        temInfo: true,

        coletaComumDiurna: {
            horario: '07h às 16h',

            segunda: [
                'Câmpus Universitário',
                'Vale das Margaridas',
                'Ayrton Senna / Pe Paulo Broda',
                'Fortunato Sibin',
                'Sebastião Cunha',
                'Ouro Verde',
                'Dr. João Lima',
                'União I e II',
                'Florêncio Rebolho',
                'Mutirão I e II / Seminário',
                'Seminário',
                'Pioneiros',
                'Jardim Progresso',
                'Santa Terezinha',
                'Lago do Bosque / Maanain',
                'Santa Rosa',
                'Primavera / Vale do Sol',
                'Nova Esperança / Vale Verde I e II',
                'Vila Mariana / Vila Nova / Operários',
                'Veneza',
                'Royal Park / Porto Belo',
                'Novo Horizonte',
                'José Tiburcio',
                'Vicentine',
                'Independência',
                'Odilon Seganti Athayde',
                'Benedito Catarino / Marta Dequech',
                'Residencial das Orquídeas',
                'Rosário Piteli',
                'Santa Catarina'
            ],

            terca: [
                'Parque Industrial',
                'BR 369',
                'Aguativa',
                'Royal Garden',
                'Vila Morena',
                'Vila da Antena',
                'Bela Vista',
                'Vitor Dantas',
                'Belle Bergamasco',
                'João Rocha',
                'Condomínio dos Idosos',
                'Panorama',
                'Henrique Vitorelli',
                'Nossa Senhora Aparecida',
                'Ivani Paiva Gatti',
                'São Judas Tadeu',
                'Jardim Pérola',
                'Residencial Atlântico',
                'Distrito de Congonhas',
                'Alvorada',
                'Staiger',
                'São Pedro',
                'Cristo Rei',
                'Varotto',
                'Figueira',
                'Vila Moreira',
                'Vila Recreio',
                'Setor da FAFI',
                'Jardim Morumbi',
                'Jardim São Silvestre I e II'
            ]
        },

        coletaComumNoturna: {
            horario: '16h às 01h',

            diario: [
                'Área Comercial Central',
                'Extensão da Av. XV de Novembro até o Monumento do Cristo - Rua Bahia'
            ],

            segunda: [
                'Novo Bandeirantes',
                'Seugling',
                'Jardim Europa',
                'Inácio/Galeano',
                'Jardim Estoril',
                'Tauros',
                'Vila América'
            ],

            terca: [
                'Bandeirantes',
                'Vila Daher',
                'Vila Ipiranga',
                'Vila Assad / Henriques',
                'Vila Paraíso / Vila Haddad',
                'João XXIII',
                'Vitória Régia'
            ]
        },

        coletaSeletiva: {
            horario: '07h30 às 16h30',

            segunda: [
                'Henrique Vittorelli',
                'João Rocha',
                'Vitor Dantas',
                'Bela Vista',
                'Belle Bergamasco',
                'Panorama',
                'Setor da FAFI',
                'Vila da Antena',
                'Vila Moreira',
                'Vila Nossa Senhora',
                'Ivani Paiva Gatti',
                'Royal Garden'
            ],

            terca: [
                'Rosário Piteli',
                'Tauros',
                'Jardim Estoril',
                'Jardim Europa',
                'Novo Bandeirantes',
                'Porto Bello',
                'Progresso',
                'Vila América',
                'Vila Galeano/Inácio',
                'Santa Catarina',
                'Santa Terezinha',
                'Lago do Bosque',
                'Maanain'
            ],

            quarta: [
                'Área Comercial Central',
                'Vitória Régia',
                'Morumbi',
                'Vila Assad',
                'Vila Henriques',
                'São Silvestre I e II',
                'Vila Ipiranga',
                'Residencial Atlântico'
            ]

        }
    },


    'andira': {
        nome: 'Andirá',
        coordenadas: [-23.0533, -50.2269],
        temInfo: false
    },

    'bandeirantes': {
        nome: 'Bandeirantes',
        coordenadas: [-23.1108, -50.3675],
        temInfo: false
    }
};

// =========================
// MAPA
// =========================

const mapa = L.map('mapa-regiao').setView(
    [-23.1600, -50.1439],
    10
);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution:
            '&copy; OpenStreetMap contributors'
    }
).addTo(mapa);

// =========================
// MARCADORES
// =========================

Object.values(cidadesRegiao).forEach(cidade => {

    L.marker(cidade.coordenadas)
        .addTo(mapa)

        .bindPopup(`
            <strong>${cidade.nome}</strong><br>
            ${
                cidade.temInfo
                ? '✅ Informações disponíveis'
                : '⚠️ Em implementação'
            }
        `)

        .on('click', () => {
            selecionarCidade(cidade);
        });
});

// =========================
// SELECIONAR CIDADE
// =========================

function selecionarCidade(cidade) {

    const container =
        document.getElementById('cidade-selecionada');

    // =========================
    // CIDADE SEM INFO
    // =========================

    if (!cidade.temInfo) {

        container.innerHTML = `
            <div class="aviso">

                <i class="fas fa-exclamation-triangle"></i>

                <div>
                    <strong>Cidade em implementação</strong><br>

                    As informações de coleta para
                    ${cidade.nome}
                    ainda estão sendo cadastradas.
                </div>

            </div>
        `;

        container.style.display = 'block';

        return;
    }

    let diasColetaHTML = '';

    // =========================
    // CORNÉLIO PROCÓPIO
    // =========================

    if (cidade.nome === 'Cornélio Procópio') {

        const secoes = [

            {
                titulo: 'Coleta Comum • Diurna',
                dados: cidade.coletaComumDiurna,
                icone: 'fa-sun'
            },

            {
                titulo: 'Coleta Comum • Noturna',
                dados: cidade.coletaComumNoturna,
                icone: 'fa-moon'
            },

            {
                titulo: 'Coleta Seletiva',
                dados: cidade.coletaSeletiva,
                icone: 'fa-recycle'
            }
        ];

        secoes.forEach(secao => {

            Object.entries(secao.dados).forEach(([dia, bairros]) => {

                if (dia === 'horario') return;

                diasColetaHTML += `

                    <div class="dia-card">

                        <div class="dia-header">

                            <h3>
                                <i class="fas ${secao.icone}"></i>
                                ${secao.titulo}
                            </h3>

                            <div class="dias-semana">
                                ${dia.toUpperCase()}
                            </div>

                            <span class="horario-coleta">
                                ${secao.dados.horario}
                            </span>

                        </div>

                        <div class="bairros-list">

                            ${bairros.map(bairro => `

                                <div class="bairro-item">

                                    <i class="fas fa-leaf"></i>

                                    ${bairro}

                                </div>

                            `).join('')}

                        </div>

                    </div>

                `;
            });

        });

    }

    // =========================
    // OUTRAS CIDADES
    // =========================

    else {

        Object.entries(cidade.diasColeta)
            .forEach(([grupo, bairros]) => {

            if (grupo === 'especiais') return;

            diasColetaHTML += `

                <div class="dia-card">

                    <div class="dia-header">

                        <h3>Coleta Regular</h3>

                        <div class="dias-semana">
                            ${grupo.toUpperCase()}
                        </div>

                    </div>

                    <div class="bairros-list">

                        ${bairros.map(bairro => `

                            <div class="bairro-item">

                                <i class="fas fa-leaf"></i>

                                ${bairro}

                            </div>

                        `).join('')}

                    </div>

                </div>

            `;
        });

        // =========================
        // ESPECIAIS
        // =========================

        if (cidade.diasColeta.especiais) {

            cidade.diasColeta.especiais
                .forEach(especial => {

                diasColetaHTML += `

                    <div class="dia-card">

                        <div class="dia-header">

                            <h3>Coleta Especial</h3>

                            <div class="dias-semana">
                                ${especial.dias}
                            </div>

                        </div>

                        <div class="bairros-list">

                            ${especial.bairros.map(bairro => `

                                <div class="bairro-item">

                                    <i class="fas fa-star"></i>

                                    ${bairro}

                                </div>

                            `).join('')}

                        </div>

                    </div>

                `;
            });
        }
    }

    // =========================
    // RENDER
    // =========================

    container.innerHTML = `

        <div class="cidade-header">

            <h2>
                Dias de Coleta - ${cidade.nome}
            </h2>

            <button
                class="btn-voltar"
                onclick="voltarParaMapa()"
            >

                <i class="fas fa-arrow-left"></i>

                Voltar

            </button>

        </div>

        <div class="search-bairros-container">

            <div class="search-bairros-box">

                <input
                    type="text"
                    class="search-input"
                    placeholder="Buscar bairro..."
                    id="searchBairro"
                >

                <i
                    class="fas fa-search search-icon"
                ></i>

            </div>

        </div>

        <div class="dias-coleta">

            ${diasColetaHTML}

        </div>

    `;

    container.style.display = 'block';

    container.scrollIntoView({
        behavior: 'smooth'
    });

    const campoBusca =
        document.getElementById('searchBairro');

    if (campoBusca) {
        campoBusca.addEventListener(
            'input',
            buscarBairros
        );
    }


}

// =========================
// BUSCAR BAIRRO
// =========================

function buscarBairros() {

    const termo =
        document.getElementById('searchBairro')
        .value
        .toLowerCase();

    const bairros =
        document.querySelectorAll('.bairro-item');

    bairros.forEach(item => {

        const texto =
            item.textContent.toLowerCase();

        item.style.display =
            texto.includes(termo)
            ? 'flex'
            : 'none';
    });
}

// =========================
// VOLTAR
// =========================

function voltarParaMapa() {

    document.getElementById(
        'cidade-selecionada'
    ).style.display = 'none';
}

// =========================
// BUSCA DE CIDADE
// =========================

const btnBuscar =
    document.getElementById('btnBuscar');

if (btnBuscar) {

    btnBuscar.addEventListener(
        'click',
        buscarCidade
    );
}

const campoCidade =
    document.getElementById('searchCidade');

if (campoCidade) {

    campoCidade.addEventListener(
        'keydown',
        e => {

            if (e.key === 'Enter') {
                buscarCidade();
            }
        }
    );
}

function buscarCidade() {

    const termo =
        document.getElementById('searchCidade')
        .value
        .toLowerCase()
        .trim();

    const cidadeEncontrada =
        Object.values(cidadesRegiao)
        .find(cidade =>
            cidade.nome
                .toLowerCase()
                .includes(termo)
        );

    if (cidadeEncontrada) {

        mapa.setView(
            cidadeEncontrada.coordenadas,
            13
        );

        selecionarCidade(cidadeEncontrada);

    } else {

        alert('Cidade não encontrada!');
    }
}
