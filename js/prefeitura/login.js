// ======================================================
// LOGIN DA PREFEITURA
// ======================================================

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

function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById('mensagem');
    if (!mensagem) {
        console.error('Elemento #mensagem não encontrado!');
        return;
    }
    mensagem.textContent = texto;
    mensagem.className = 'mensagem ' + tipo;
}

// ======================================================
// INICIALIZAR QUANDO O DOM ESTIVER PRONTO
// ======================================================

document.addEventListener('DOMContentLoaded', function() {

    const formLogin = document.getElementById('formLogin');

    if (!formLogin) {
        console.error('❌ Formulário #formLogin não encontrado!');
        alert('Erro: Formulário de login não encontrado. Verifique se o ID está correto.');
        return;
    }

    console.log('✅ Formulário de login encontrado!');

    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const botao = this.querySelector('button[type="submit"]');

        console.log('📧 Tentando login com:', email);

        // Validar campos
        if (!email || !senha) {
            mostrarMensagem('Preencha todos os campos.', 'erro');
            return;
        }

        // Desabilitar botão
        botao.disabled = true;
        botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';

        mostrarMensagem('Autenticando...', 'carregando');

        try {
            console.log('🔄 Enviando requisição para API...');

            const resposta = await fetch('../../api/prefeituras/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            console.log('📡 Status da resposta:', resposta.status);

            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }

            const dados = await resposta.json();
            console.log('📨 Dados recebidos:', dados);

            if (dados.sucesso) {
                mostrarMensagem('✅ Login realizado com sucesso!', 'sucesso');

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

            } else {
                mostrarMensagem(dados.mensagem || 'Erro ao fazer login.', 'erro');
            }

        } catch (erro) {
            console.error('❌ Erro detalhado:', erro);
            mostrarMensagem('Erro de conexão com o servidor. Verifique se o XAMPP está rodando.', 'erro');
        }

        // Reabilitar botão
        botao.disabled = false;
        botao.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
    });

});