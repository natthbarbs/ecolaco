// =========================================================
// ECOLAÇO • MENU LATERAL (compartilhado entre páginas)
// =========================================================

function abrirMenu() {
    const overlay = document.getElementById('menu-overlay');
    if (!overlay) return;
    overlay.classList.add('aberto');
    document.body.style.overflow = 'hidden';
}

function fecharMenu() {
    const overlay = document.getElementById('menu-overlay');
    if (!overlay) return;
    overlay.classList.remove('aberto');
    document.body.style.overflow = 'auto';
}

document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('menu-overlay');

    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === this) fecharMenu();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') fecharMenu();
    });
});

function emDesenvolvimento() {
    alert('Esta funcionalidade está em desenvolvimento e será disponibilizada em breve.');
}
