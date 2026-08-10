// ======================================================
// CADASTRO DA PREFEITURA
// ======================================================

// Máscara para CNPJ
function mascaraCNPJ(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
}

// Máscara para Telefone
function mascaraTelefone(valor) {
    return valor
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

// Mostrar/Esconder Senha
function mostrarSenha(id) {
    const input = document.getElementById(id);
    const icon = input.parentElement.querySelector('.btn-mostrar-senha i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Carregar cidades no select
async function carregarCidades() {
    try {
        const resposta = await fetch('../../api/cidades.php');
        const cidades = await resposta.json();

        const select = document.getElementById('cidade');
        select.innerHTML = '<option value="">Selecione a cidade</option>';

        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade.id;
            option.textContent = cidade.nome;
            select.appendChild(option);
        });
    } catch (erro) {
        console.error('Erro ao carregar cidades:', erro);
    }
}

// Aplicar máscaras
document.addEventListener('DOMContentLoaded', function() {

    carregarCidades();

    const cnpj = document.getElementById('cnpj');
    cnpj.addEventListener('input', function(e) {
        this.value = mascaraCNPJ(this.value);
    });

    const telefone = document.getElementById('telefone');
    telefone.addEventListener('input', function(e) {
        this.value = mascaraTelefone(this.value);
    });

    // Validação de senha em tempo real
    const senha = document.getElementById('usuario_senha');
    const confirmar = document.getElementById('usuario_senha_confirm');

    confirmar.addEventListener('input', function() {
        if (this.value.length > 0 && this.value !== senha.value) {
            this.style.borderColor = '#D32F2F';
        } else {
            this.style.borderColor = '#E0E0E0';
        }
    });

    senha.addEventListener('input', function() {
        if (confirmar.value.length > 0 && this.value !== confirmar.value) {
            confirmar.style.borderColor = '#D32F2F';
        } else if (confirmar.value.length > 0) {
            confirmar.style.borderColor = '#E0E0E0';
        }
    });
});

// Envio do formulário
const formCadastro = document.getElementById('formCadastro');
const mensagem = document.getElementById('mensagem');

formCadastro.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Validação das senhas
    const senha = document.getElementById('usuario_senha').value;
    const confirmar = document.getElementById('usuario_senha_confirm').value;

    if (senha !== confirmar) {
        mostrarMensagem('As senhas não coincidem.', 'erro');
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem('A senha deve ter pelo menos 6 caracteres.', 'erro');
        return;
    }

    // Validação do arquivo
    const arquivo = document.getElementById('oficio');
    if (!arquivo.files || arquivo.files.length === 0) {
        mostrarMensagem('Por favor, envie o ofício de adesão.', 'erro');
        return;
    }

    // Validação do termo
    const aceite = document.getElementById('aceite_termo');
    if (!aceite.checked) {
        mostrarMensagem('Você precisa aceitar os termos de parceria.', 'erro');
        return;
    }

    // Preparar dados
    const formData = new FormData(formCadastro);

    mostrarMensagem('Enviando dados... Aguarde.', 'carregando');

    try {
        const resposta = await fetch('../../api/prefeituras/cadastro.php', {
            method: 'POST',
            body: formData
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            mostrarMensagem(
                '✅ Cadastro solicitado com sucesso! ' +
                'A equipe do EcoLaço analisará os dados e entrará em contato em breve.',
                'sucesso'
            );

            formCadastro.reset();
            document.querySelector('.upload-label span').textContent =
                'Clique para enviar o ofício';

            // Redirecionar após 5 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 5000);

        } else {
            mostrarMensagem(dados.mensagem || 'Erro ao solicitar cadastro.', 'erro');
        }

    } catch (erro) {
        console.error('Erro:', erro);
        mostrarMensagem('Erro de conexão com o servidor.', 'erro');
    }
});

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = 'mensagem ' + tipo;
}