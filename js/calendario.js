// Funções para abrir e fechar o menu
function abrirMenu() {
    document.getElementById('menu-overlay').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Impede scroll da página principal
}

function fecharMenu() {
    document.getElementById('menu-overlay').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restaura scroll da página principal
}

// Fechar o menu ao clicar fora dele
document.getElementById('menu-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        fecharMenu();
    }
});

// Fechar o menu com a tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        fecharMenu();
    }
});

console.log("JS carregou");

const eventos = {
    "01-11": "Dia do Combate à Poluição por Agrotóxicos",
    "01-26": "Dia Mundial da Educação Ambiental",

    "02-06": "Dia do Agente de Defesa Ambiental",
    "02-22": "Aniversário do IBAMA",

    "03-01": "Dia do Turismo Ecológico",
    "03-16": "Dia das Mudanças Climáticas",
    "03-21": "Dia Mundial das Florestas",
    "03-22": "Dia Mundial da Água",

    "04-15": "Conservação do Solo",
    "04-22": "Dia da Terra",
    "04-28": "Dia da Caatinga",

    "05-03": "Dia do Solo",
    "05-17": "Reciclagem",
    "05-22": "Biodiversidade",
    "05-27": "Mata Atlântica",

    "06-03": "Educação Ambiental",
    "06-05": "Meio Ambiente",
    "06-08": "Oceanos",
    "06-17": "Combate à Seca",

    "07-17": "Proteção das Florestas",

    "08-14": "Poluição Industrial",

    "09-03": "Dia do Biólogo",
    "09-05": "Amazônia",
    "09-11": "Cerrado",
    "09-16": "Camada de Ozônio",
    "09-21": "Dia da Árvore",
    "09-22": "Fauna",

    "10-03": "Abelhas",
    "10-04": "Natureza",
    "10-05": "Aves",
    "10-12": "Mar",
    "10-15": "Consumo Consciente",

    "11-24": "Dia do Rio",
    "11-30": "Estatuto da Terra",

    "12-29": "Biodiversidade"
};



const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

function gerarCalendarioAno() {
    const container = document.getElementById("calendario-container");
    const ano = 2026;

    meses.forEach((mesNome, index) => {
        const primeiroDia = new Date(ano, index, 1).getDay();
        const diasNoMes = new Date(ano, index + 1, 0).getDate();

        let html = `
            <div class="mes-card">
                <h2>${mesNome}</h2>
                <div class="calendario-grid">
                    <div>Dom</div><div>Seg</div><div>Ter</div>
                    <div>Qua</div><div>Qui</div><div>Sex</div><div>Sab</div>
        `;

        // espaços vazios antes do dia 1
        for (let i = 0; i < primeiroDia; i++) {
            html += `<div></div>`;
        }

        // dias do mês
        for (let dia = 1; dia <= diasNoMes; dia++) {
            const mesNumero = String(index + 1).padStart(2, '0');
            const diaFormatado = String(dia).padStart(2, '0');
            const chave = `${mesNumero}-${diaFormatado}`;

            const classe = eventos[chave] ? "dia-evento" : "";

            html += `<div class="${classe}">${dia}</div>`;
        }

        html += `</div></div>`;

        container.innerHTML += html;
    });
}

gerarCalendarioAno();

function listarEventos() {
    const container = document.getElementById("lista-eventos");

    for (let data in eventos) {
        const [mes, dia] = data.split("-");
        const nomeMes = meses[mes - 1];

        container.innerHTML += `
            <p><strong>${dia}/${mes}</strong> - ${eventos[data]}</p>
        `;
    }
}

listarEventos();
