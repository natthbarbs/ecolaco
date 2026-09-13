// ======================================================
// LOGIN ADMIN
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
    mensagem.textContent = texto;
    mensagem.className = 'mensagem ' + tipo;
}

document.addEventListener('DOMContentLoaded', function() {

    const formLogin = document.getElementById('formLoginAdmin');

    if (!formLogin) {
        console.error('Formulário não encontrado!');
        return;
    }

    formLogin.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const botao = this.querySelector('button[type="submit"]');

        if (!email || !senha) {
            mostrarMensagem('Preencha todos os campos.', 'erro');
            return;
        }

        botao.disabled = true;
        botao.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
        mostrarMensagem('Autenticando...', 'carregando');

        try {
            const resposta = await fetch('../../api/admin/login_adm.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, senha })
            });

            const dados = await resposta.json();

            if (dados.sucesso) {
                mostrarMensagem('✅ Login realizado com sucesso!', 'sucesso');
                
                setTimeout(() => {
                    window.location.href = 'dashboard_adm.html';
                }, 1000);

            } else {
                mostrarMensagem(dados.mensagem || 'Erro ao fazer login.', 'erro');
            }

        } catch (erro) {
            console.error('Erro:', erro);
            mostrarMensagem('Erro de conexão com o servidor.', 'erro');
        }

        botao.disabled = false;
        botao.innerHTML = '<i class="fas fa-sign-in-alt"></i> Entrar';
    });

});