// ======================================================
// DASHBOARD PREFEITURA
// ======================================================

let prefeituraId = null;
let dadosPrefeitura = null;

// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener('DOMContentLoaded', function() {

    // Verificar autenticação
    verificarAutenticacao();

    // Navegação sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const tab = this.dataset.tab;
            trocarAba(tab);
        });
    });

    // Formulários
    document.getElementById('formColeta').addEventListener('submit', enviarColeta);
    document.getElementById('formPEV').addEventListener('submit', enviarPEV);
    document.getElementById('formCampanha').addEventListener('submit', enviarCampanha);
    document.getElementById('formComunicado').addEventListener('submit', enviarComunicado);
    document.getElementById('formPerfil').addEventListener('submit', atualizarPerfil);

});

// ======================================================
// AUTENTICAÇÃO
// ======================================================

async function verificarAutenticacao() {

    try {

        const resposta = await fetch('../../api/prefeituras/verificar.php');

        const dados = await resposta.json();

        if (!dados.autenticado) {

            window.location.href = 'login.html';
            return;

        }

        prefeituraId = dados.prefeitura_id;
        dadosPrefeitura = dados;

        // Atualizar UI
        document.getElementById('prefeituraNome').innerHTML =
            `<i class="fas fa-building"></i> ${dados.prefeitura_nome}`;

        // Carregar dados
        carregarResumo();
        carregarBairros();
        carregarHistorico();

    } catch (erro) {

        console.error('Erro ao verificar autenticação:', erro);
        window.location.href = 'login.html';

    }

}

function logout() {

    if (confirm('Tem certeza que deseja sair?')) {

        fetch('../../api/prefeituras/logout.php')
            .then(() => {
                window.location.href = 'login.html';
            })
            .catch(() => {
                window.location.href = 'login.html';
            });

    }

}

// ======================================================
// NAVEGAÇÃO
// ======================================================

function trocarAba(tab) {

    // Atualizar sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.tab === tab);
    });

    // Atualizar conteúdo
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tab}`);
    });

}

// ======================================================
// RESUMO
// ======================================================

async function carregarResumo() {

    try {

        const resposta = await fetch(
            `../../api/prefeituras/resumo.php?prefeitura_id=${prefeituraId}`
        );

        const dados = await resposta.json();

        document.getElementById('totalBairros').textContent = dados.total_bairros || 0;
        document.getElementById('totalPEVs').textContent = dados.total_pevs || 0;
        document.getElementById('totalCampanhas').textContent = dados.total_campanhas || 0;
        document.getElementById('totalPendentes').textContent = dados.total_pendentes || 0;

        // Últimas atividades
        const lista = document.getElementById('ultimasAtividades');

        if (dados.ultimas_atividades && dados.ultimas_atividades.length > 0) {

            lista.innerHTML = dados.ultimas_atividades.map(atividade => `

                <div class="atividade-item">

                    <div class="atividade-icon ${atividade.status}">
                        <i class="fas ${atividade.icone}"></i>
                    </div>

                    <div class="atividade-texto">

                        <strong>${atividade.titulo}</strong>

                        <p>${atividade.descricao}</p>

                    </div>

                    <div class="atividade-data">

                        ${atividade.data}

                    </div>

                </div>

            `).join('');

        } else {

            lista.innerHTML = '<p class="sem-dados">Nenhuma atividade recente.</p>';

        }

        // Status da prefeitura
        const statusBadge = document.getElementById('statusPrefeitura');
        const status = dadosPrefeitura.status || 'pendente';

        statusBadge.className = `status-badge ${status}`;

        const statusMap = {
            'pendente': '<i class="fas fa-clock"></i> Pendente',
            'ativo': '<i class="fas fa-check-circle"></i> Ativo',
            'inativo': '<i class="fas fa-times-circle"></i> Inativo'
        };

        statusBadge.innerHTML = statusMap[status] || statusMap.pendente;

        document.getElementById('ultimoLogin').textContent =
            dadosPrefeitura.ultimo_login || 'Nunca';

    } catch (erro) {

        console.error('Erro ao carregar resumo:', erro);

    }

}

// ======================================================
// BAIRROS
// ======================================================

async function carregarBairros() {

    try {

        // ATENÇÃO: Mudei de bairros.php para bairros_2.php
        const resposta = await fetch(
            `../../api/prefeituras/bairros_2.php?prefeitura_id=${prefeituraId}`
        );

        const dados = await resposta.json();

        if (dados.error) {
            console.error('Erro:', dados.error);
            return;
        }

        const select = document.getElementById('coleta_bairro');

        if (dados.bairros && dados.bairros.length > 0) {

            select.innerHTML = '<option value="">Selecione um bairro</option>';

            dados.bairros.forEach(bairro => {

                const option = document.createElement('option');
                option.value = bairro.id;
                option.textContent = bairro.nome;
                select.appendChild(option);

            });

        } else {

            select.innerHTML = '<option value="">Nenhum bairro disponível</option>';

        }

        // Lista de bairros cadastrados
        const lista = document.getElementById('listaBairros');

        if (dados.cadastrados && dados.cadastrados.length > 0) {

            lista.innerHTML = dados.cadastrados.map(bairro => `

                <div class="item-lista">

                    <div class="info">

                        <strong>${bairro.nome}</strong>

                        <small>
                            ${bairro.tipo_coleta || 'Não definido'} • 
                            ${bairro.dia_coleta || 'Não definido'}
                            ${bairro.horario ? `• ${bairro.horario}` : ''}
                        </small>

                    </div>

                    <span class="status ${bairro.status}">
                        ${bairro.status === 'aprovado' ? '✓ Aprovado' : 
                          bairro.status === 'pendente' ? '⏳ Pendente' : 
                          '✗ Rejeitado'}
                    </span>

                </div>

            `).join('');

        } else {

            lista.innerHTML = '<p class="sem-dados">Nenhum bairro cadastrado.</p>';

        }

    } catch (erro) {

        console.error('Erro ao carregar bairros:', erro);

    }

}

// ======================================================
// HISTÓRICO
// ======================================================

async function carregarHistorico(filtro = 'todos') {

    try {

        const resposta = await fetch(
            `../../api/prefeituras/historico.php?prefeitura_id=${prefeituraId}&filtro=${filtro}`
        );

        const dados = await resposta.json();

        const lista = document.getElementById('listaHistorico');

        if (dados.historico && dados.historico.length > 0) {

            const statusMap = {
                'pendente': '⏳ Pendente',
                'aprovado': '✓ Aprovado',
                'rejeitado': '✗ Rejeitado'
            };

            lista.innerHTML = dados.historico.map(item => `

                <div class="historico-item">

                    <div class="historico-info">

                        <strong>${item.descricao}</strong>

                        <small>
                            ${item.tipo} • ${item.data}
                            ${item.observacao_admin ? `<br>Observação: ${item.observacao_admin}` : ''}
                        </small>

                    </div>

                    <span class="historico-status ${item.status}">
                        ${statusMap[item.status] || item.status}
                    </span>

                </div>

            `).join('');

        } else {

            lista.innerHTML = '<p class="sem-dados">Nenhum envio registrado.</p>';

        }

    } catch (erro) {

        console.error('Erro ao carregar histórico:', erro);

    }

}

function filtrarHistorico() {

    const filtro = document.getElementById('filtroHistorico').value;
    carregarHistorico(filtro);

}

// ======================================================
// ENVIAR COLETA
// ======================================================

async function enviarColeta(e) {

    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('.btn-submit');

    const dados = {
        prefeitura_id: prefeituraId,
        bairro_id: document.getElementById('coleta_bairro').value,
        tipo: document.getElementById('coleta_tipo').value,
        dias: document.getElementById('coleta_dias').value,
        horario: document.getElementById('coleta_horario').value || null,
        observacao: document.getElementById('coleta_observacao').value || null
    };

    if (!dados.bairro_id || !dados.tipo || !dados.dias) {
        mostrarModal('Erro', 'Preencha todos os campos obrigatórios.');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {

        const resposta = await fetch('../../api/prefeituras/enviar_coleta.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            mostrarModal('Sucesso!', 'Informações de coleta enviadas para aprovação.');
            form.reset();
            carregarResumo();
            carregarBairros();
            carregarHistorico();
        } else {
            mostrarModal('Erro', resultado.mensagem || 'Erro ao enviar dados.');
        }

    } catch (erro) {
        console.error('Erro:', erro);
        mostrarModal('Erro', 'Erro de conexão com o servidor.');
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Informações';

}

// ======================================================
// ENVIAR PEV
// ======================================================

async function enviarPEV(e) {

    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('.btn-submit');

    const materiais = [];
    document.querySelectorAll('#formPEV .materiais-checkboxes input:checked').forEach(cb => {
        materiais.push(cb.value);
    });

    const dados = {
        prefeitura_id: prefeituraId,
        nome: document.getElementById('pev_nome').value,
        endereco: document.getElementById('pev_endereco').value,
        latitude: document.getElementById('pev_latitude').value || null,
        longitude: document.getElementById('pev_longitude').value || null,
        materiais: materiais
    };

    if (!dados.nome || !dados.endereco) {
        mostrarModal('Erro', 'Preencha todos os campos obrigatórios.');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {

        const resposta = await fetch('../../api/prefeituras/enviar_pev.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            mostrarModal('Sucesso!', 'PEV cadastrado e enviado para aprovação.');
            form.reset();
            carregarResumo();
            carregarHistorico();
        } else {
            mostrarModal('Erro', resultado.mensagem || 'Erro ao cadastrar PEV.');
        }

    } catch (erro) {
        console.error('Erro:', erro);
        mostrarModal('Erro', 'Erro de conexão com o servidor.');
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-plus-circle"></i> Cadastrar PEV';

}

// ======================================================
// ENVIAR CAMPANHA
// ======================================================

async function enviarCampanha(e) {

    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('.btn-submit');

    const dados = {
        prefeitura_id: prefeituraId,
        titulo: document.getElementById('campanha_titulo').value,
        tipo: document.getElementById('campanha_tipo').value,
        data_inicio: document.getElementById('campanha_data_inicio').value,
        data_fim: document.getElementById('campanha_data_fim').value || null,
        local: document.getElementById('campanha_local').value || null,
        descricao: document.getElementById('campanha_descricao').value
    };

    if (!dados.titulo || !dados.tipo || !dados.data_inicio || !dados.descricao) {
        mostrarModal('Erro', 'Preencha todos os campos obrigatórios.');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {

        const resposta = await fetch('../../api/prefeituras/enviar_campanha.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            mostrarModal('Sucesso!', 'Campanha enviada para aprovação.');
            form.reset();
            carregarResumo();
            carregarHistorico();
        } else {
            mostrarModal('Erro', resultado.mensagem || 'Erro ao enviar campanha.');
        }

    } catch (erro) {
        console.error('Erro:', erro);
        mostrarModal('Erro', 'Erro de conexão com o servidor.');
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Campanha';

}

// ======================================================
// ENVIAR COMUNICADO
// ======================================================

async function enviarComunicado(e) {

    e.preventDefault();

    const form = e.target;
    const btn = form.querySelector('.btn-submit');

    const dados = {
        prefeitura_id: prefeituraId,
        titulo: document.getElementById('comunicado_titulo').value,
        mensagem: document.getElementById('comunicado_mensagem').value
    };

    if (!dados.titulo || !dados.mensagem) {
        mostrarModal('Erro', 'Preencha todos os campos obrigatórios.');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

    try {

        const resposta = await fetch('../../api/prefeituras/enviar_comunicado.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            mostrarModal('Sucesso!', 'Comunicado enviado para aprovação.');
            form.reset();
            carregarResumo();
            carregarHistorico();
        } else {
            mostrarModal('Erro', resultado.mensagem || 'Erro ao enviar comunicado.');
        }

    } catch (erro) {
        console.error('Erro:', erro);
        mostrarModal('Erro', 'Erro de conexão com o servidor.');
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Comunicado';

}

// ======================================================
// ATUALIZAR PERFIL
// ======================================================

async function atualizarPerfil(e) {

    e.preventDefault();

    const btn = e.target.querySelector('.btn-submit');

    const dados = {
        prefeitura_id: prefeituraId,
        telefone: document.getElementById('perfil_telefone').value || null,
        email: document.getElementById('perfil_email').value || null
    };

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';

    try {

        const resposta = await fetch('../../api/prefeituras/atualizar_perfil.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {
            mostrarModal('Sucesso!', 'Perfil atualizado com sucesso.');
            carregarResumo();
        } else {
            mostrarModal('Erro', resultado.mensagem || 'Erro ao atualizar perfil.');
        }

    } catch (erro) {
        console.error('Erro:', erro);
        mostrarModal('Erro', 'Erro de conexão com o servidor.');
    }

    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-save"></i> Atualizar Perfil';

}

// ======================================================
// MODAL
// ======================================================

function mostrarModal(titulo, conteudo) {

    document.getElementById('modalTitulo').textContent = titulo;
    document.getElementById('modalCorpo').innerHTML = `<p>${conteudo}</p>`;
    document.getElementById('modal').classList.add('active');

}

function fecharModal() {

    document.getElementById('modal').classList.remove('active');

}

// Fechar modal clicando fora
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharModal();
    }
});