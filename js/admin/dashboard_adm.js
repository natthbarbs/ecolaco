// ======================================================
// DASHBOARD ADMIN
// ======================================================

let adminId = null;

// ======================================================
// INICIALIZAÇÃO
// ======================================================

document.addEventListener('DOMContentLoaded', function() {

    // Verificar autenticação
    verificarAutenticacao();

    // Navegação sidebar
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('click', function() {
            const tab = this.dataset.tab;
            trocarAba(tab);
        });
    });

});

// ======================================================
// AUTENTICAÇÃO
// ======================================================

async function verificarAutenticacao() {
    try {
        const resposta = await fetch('../../api/admin/verificar_admin.php');
        const dados = await resposta.json();

        if (!dados.autenticado) {
            window.location.href = 'login_adm.html';
            return;
        }

        adminId = dados.admin_id;
        document.getElementById('adminNome').innerHTML = 
            '<i class="fas fa-user-cog"></i> ' + dados.admin_nome;

        // Carregar dados
        carregarResumo();
        carregarPrefeituras();
        carregarDados();

    } catch (erro) {
        console.error('Erro ao verificar autenticação:', erro);
        window.location.href = 'login_adm.html';
    }
}

function logout() {
    if (confirm('Tem certeza que deseja sair?')) {
        fetch('../../api/admin/logout_admin.php')
            .then(function() {
                window.location.href = 'login_adm.html';
            });
    }
}

// ======================================================
// NAVEGAÇÃO
// ======================================================

function trocarAba(tab) {
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.classList.toggle('active', item.dataset.tab === tab);
    });

    document.querySelectorAll('.tab-content').forEach(function(content) {
        content.classList.toggle('active', content.id === 'tab-' + tab);
    });

    // Carregar dados específicos quando a aba for ativada
    if (tab === 'dados') {
        carregarDados();
    }
    if (tab === 'prefeituras') {
        carregarPrefeituras();
    }
}

// ======================================================
// RESUMO
// ======================================================

async function carregarResumo() {
    try {
        const resposta = await fetch('../../api/admin/estatisticas.php');
        const dados = await resposta.json();

        document.getElementById('totalPrefeituras').textContent = dados.total_prefeituras || 0;
        document.getElementById('totalPendentes').textContent = dados.total_pendentes || 0;
        document.getElementById('totalDados').textContent = dados.total_dados || 0;
        document.getElementById('totalCidades').textContent = dados.total_cidades || 0;

    } catch (erro) {
        console.error('Erro ao carregar resumo:', erro);
    }
}

// ======================================================
// PREFEITURAS
// ======================================================

async function carregarPrefeituras() {
    const filtro = document.getElementById('filtroPrefeituras').value;
    const lista = document.getElementById('listaPrefeituras');

    lista.innerHTML = '<p class="sem-dados">Carregando...</p>';

    try {
        const resposta = await fetch('../../api/admin/listar_prefeituras.php?filtro=' + filtro);
        const dados = await resposta.json();

        if (dados.prefeituras && dados.prefeituras.length > 0) {

            const statusMap = {
                'pendente': '<span class="status-badge pendente">⏳ Pendente</span>',
                'ativo': '<span class="status-badge ativo">✅ Ativo</span>',
                'inativo': '<span class="status-badge inativo">❌ Inativo</span>'
            };

            lista.innerHTML = dados.prefeituras.map(function(prefeitura) {
                return `
                    <div class="item-prefeitura">
                        <div class="prefeitura-info">
                            <strong>${prefeitura.nome}</strong>
                            <small>📧 ${prefeitura.email || 'Sem e-mail'}</small>
                            <span class="cidade">📍 ${prefeitura.cidade_nome || 'Cidade não definida'}</span>
                        </div>
                        <div>
                            ${statusMap[prefeitura.status] || statusMap.pendente}
                        </div>
                        <div class="prefeitura-acoes">
                            ${prefeitura.status === 'pendente' ? `
                                <button class="btn-acoes aprovar" onclick="aprovarPrefeitura(${prefeitura.id})">
                                    <i class="fas fa-check"></i> Aprovar
                                </button>
                                <button class="btn-acoes rejeitar" onclick="rejeitarPrefeitura(${prefeitura.id})">
                                    <i class="fas fa-times"></i> Rejeitar
                                </button>
                            ` : ''}
                            <button class="btn-acoes ver" onclick="verPrefeitura(${prefeitura.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

        } else {
            lista.innerHTML = '<p class="sem-dados">Nenhuma prefeitura encontrada.</p>';
        }

    } catch (erro) {
        console.error('Erro ao carregar prefeituras:', erro);
        lista.innerHTML = '<p class="sem-dados">Erro ao carregar prefeituras.</p>';
    }
}

// ======================================================
// APROVAR/REJEITAR PREFEITURA
// ======================================================

async function aprovarPrefeitura(id) {
    if (!confirm('Confirmar aprovação desta prefeitura?')) return;

    try {
        const resposta = await fetch('../../api/admin/aprovar_prefeitura.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, acao: 'aprovar' })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            alert('✅ Prefeitura aprovada com sucesso!');
            carregarPrefeituras();
            carregarResumo();
        } else {
            alert('❌ Erro: ' + dados.mensagem);
        }

    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro de conexão com o servidor.');
    }
}

async function rejeitarPrefeitura(id) {
    if (!confirm('Confirmar rejeição desta prefeitura?')) return;

    try {
        const resposta = await fetch('../../api/admin/aprovar_prefeitura.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, acao: 'rejeitar' })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            alert('✅ Prefeitura rejeitada.');
            carregarPrefeituras();
            carregarResumo();
        } else {
            alert('❌ Erro: ' + dados.mensagem);
        }

    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro de conexão com o servidor.');
    }
}

// Substitua a função verPrefeitura() por esta:

async function verPrefeitura(id) {
    try {
        const resposta = await fetch(`../../api/admin/detalhes_prefeitura.php?id=${id}`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert('Erro ao carregar dados: ' + dados.erro);
            return;
        }

        const prefeitura = dados.prefeitura;
        const usuario = dados.usuario;

        document.getElementById('modalTitulo').textContent = '📋 Detalhes da Prefeitura';
        document.getElementById('modalCorpo').innerHTML = `
            <div style="display: grid; gap: 15px;">
                <div><strong>Nome:</strong> ${prefeitura.nome}</div>
                <div><strong>CNPJ:</strong> ${prefeitura.cnpj || 'Não informado'}</div>
                <div><strong>Email:</strong> ${prefeitura.email || 'Não informado'}</div>
                <div><strong>Telefone:</strong> ${prefeitura.telefone || 'Não informado'}</div>
                <div><strong>Cidade:</strong> ${prefeitura.cidade_nome || 'Não informada'}</div>
                <div><strong>Status:</strong> <span class="status-badge ${prefeitura.status}">${prefeitura.status}</span></div>
                <div><strong>Cadastrado em:</strong> ${prefeitura.criado_em || 'Não informado'}</div>
                ${usuario ? `
                    <hr>
                    <h4>👤 Usuário Responsável</h4>
                    <div><strong>Email:</strong> ${usuario.email}</div>
                    <div><strong>Último login:</strong> ${usuario.ultimo_login || 'Nunca'}</div>
                ` : ''}
            </div>
        `;

        document.getElementById('modal').classList.add('active');

    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro ao carregar detalhes da prefeitura.');
    }
}

// ======================================================
// MODAL
// ======================================================

function fecharModal() {
    document.getElementById('modal').classList.remove('active');
}

// Fechar modal clicando fora
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharModal();
    }
});

// ======================================================
// DADOS ENVIADOS
// ======================================================

async function carregarDados() {
    const filtro = document.getElementById('filtroDados').value;
    const lista = document.getElementById('listaDados');

    lista.innerHTML = '<p class="sem-dados">Carregando...</p>';

    try {
        const resposta = await fetch(`../../api/admin/listar_dados.php?filtro=${filtro}`);
        const dados = await resposta.json();

        if (dados.dados && dados.dados.length > 0) {

            const statusMap = {
                'pendente': '<span class="status-badge pendente">⏳ Pendente</span>',
                'aprovado': '<span class="status-badge ativo">✅ Aprovado</span>',
                'rejeitado': '<span class="status-badge inativo">❌ Rejeitado</span>'
            };

            lista.innerHTML = dados.dados.map(function(item) {
                return `
                    <div class="item-dado">
                        <div class="dado-info">
                            <div class="dado-titulo">
                                ${item.icone} <strong>${item.tipo.toUpperCase()}</strong>
                            </div>
                            <div class="dado-descricao">
                                ${item.descricao}
                            </div>
                            <div class="dado-meta">
                                <span class="meta-item">
                                    <i class="fas fa-building"></i> ${item.prefeitura_nome || 'Prefeitura não identificada'}
                                </span>
                                <span class="meta-item">
                                    <i class="fas fa-calendar"></i> ${item.data_envio}
                                </span>
                            </div>
                            ${item.observacao_admin ? `
                                <div class="dado-observacao">
                                    <i class="fas fa-comment"></i> ${item.observacao_admin}
                                </div>
                            ` : ''}
                        </div>
                        <div>
                            ${statusMap[item.status] || statusMap.pendente}
                        </div>
                        <div class="dado-acoes">
                            ${item.status === 'pendente' ? `
                                <button class="btn-acoes aprovar" onclick="aprovarDado(${item.id})">
                                    <i class="fas fa-check"></i> Aprovar
                                </button>
                                <button class="btn-acoes rejeitar" onclick="rejeitarDado(${item.id})">
                                    <i class="fas fa-times"></i> Rejeitar
                                </button>
                            ` : ''}
                            <button class="btn-acoes ver" onclick="verDado(${item.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');

        } else {
            lista.innerHTML = '<p class="sem-dados">Nenhum dado encontrado.</p>';
        }

    } catch (erro) {
        console.error('Erro ao carregar dados:', erro);
        lista.innerHTML = '<p class="sem-dados">Erro ao carregar dados.</p>';
    }
}

// ======================================================
// APROVAR/REJEITAR DADO
// ======================================================

async function aprovarDado(id) {
    if (!confirm('Confirmar aprovação deste dado?')) return;

    try {
        const resposta = await fetch('../../api/admin/aprovar_dado.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, acao: 'aprovar' })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            alert('✅ Dado aprovado com sucesso!');
            carregarDados();
            carregarResumo();
        } else {
            alert('❌ Erro: ' + dados.mensagem);
        }

    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro de conexão com o servidor.');
    }
}

async function rejeitarDado(id) {
    if (!confirm('Confirmar rejeição deste dado?')) return;

    try {
        const resposta = await fetch('../../api/admin/aprovar_dado.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id, acao: 'rejeitar' })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            alert('✅ Dado rejeitado.');
            carregarDados();
            carregarResumo();
        } else {
            alert('❌ Erro: ' + dados.mensagem);
        }

    } catch (erro) {
        console.error('Erro:', erro);
        alert('Erro de conexão com o servidor.');
    }
}

function verDado(id) {
    alert('Função em desenvolvimento - Ver dado ID: ' + id);
}

// ======================================================
// NOTIFICAÇÕES
// ======================================================

let notificacoesInterval = null;

async function carregarNotificacoes() {
    try {
        const resposta = await fetch('../../api/admin/notificacoes.php');
        const dados = await resposta.json();

        const badge = document.getElementById('notificacaoBadge');
        badge.textContent = dados.total || 0;

        if (dados.total > 0) {
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }

        const lista = document.getElementById('listaNotificacoes');

        if (dados.notificacoes && dados.notificacoes.length > 0) {
            const icones = {
                'sucesso': 'fa-check-circle',
                'erro': 'fa-times-circle',
                'aviso': 'fa-exclamation-triangle',
                'info': 'fa-info-circle'
            };

            lista.innerHTML = dados.notificacoes.map(function(notif) {
                return `
                    <div class="notificacao-item nao-lida" onclick="marcarLida(${notif.id})">
                        <div class="icone ${notif.tipo}">
                            <i class="fas ${icones[notif.tipo] || 'fa-info-circle'}"></i>
                        </div>
                        <div class="conteudo">
                            <div class="titulo">${notif.titulo}</div>
                            <div class="mensagem">${notif.mensagem}</div>
                            <div class="data">${formatarData(notif.criado_em)}</div>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            lista.innerHTML = '<p class="sem-notificacoes">Nenhuma notificação</p>';
        }

    } catch (erro) {
        console.error('Erro ao carregar notificações:', erro);
    }
}

function formatarData(data) {
    const d = new Date(data);
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
}

function toggleNotificacoes() {
    const dropdown = document.getElementById('dropdownNotificacoes');
    dropdown.classList.toggle('active');
}

async function marcarLida(id) {
    try {
        await fetch('../../api/admin/marcar_lida.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });

        carregarNotificacoes();
        document.getElementById('dropdownNotificacoes').classList.remove('active');

    } catch (erro) {
        console.error('Erro ao marcar como lida:', erro);
    }
}

async function marcarTodasLidas() {
    // TODO: Implementar marcar todas como lidas
    alert('Função em desenvolvimento');
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', function(e) {
    const container = document.querySelector('.notificacoes-container');
    if (container && !container.contains(e.target)) {
        document.getElementById('dropdownNotificacoes').classList.remove('active');
    }
});

// Carregar notificações a cada 30 segundos
setInterval(carregarNotificacoes, 30000);