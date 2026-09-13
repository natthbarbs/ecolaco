// Abrir/fechar menu: ver js/menu.js (compartilhado entre páginas)

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

    const hoje = new Date();
    const hojeAno = hoje.getFullYear();
    const hojeMes = hoje.getMonth();
    const hojeDia = hoje.getDate();

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
            const nomeEvento = eventos[chave];

            const classes = [];
            if (nomeEvento) classes.push("dia-evento");
            if (ano === hojeAno && index === hojeMes && dia === hojeDia) classes.push("dia-hoje");

            const titulo = nomeEvento ? ` title="${nomeEvento}"` : '';

            html += `<div class="${classes.join(' ')}"${titulo}>${dia}</div>`;
        }

        html += `</div></div>`;

        container.innerHTML += html;
    });
}

gerarCalendarioAno();

// ======================================================
// PRÓXIMOS EVENTOS (a partir de hoje, com virada de ano)
// ======================================================

function renderizarProximosEventos(qtd = 4) {
    const container = document.getElementById("proximos-eventos");
    if (!container) return;

    const agora = new Date();
    const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const anoAtual = hoje.getFullYear();

    const lista = Object.entries(eventos).map(([chave, nome]) => {
        const [mes, dia] = chave.split("-").map(Number);
        let data = new Date(anoAtual, mes - 1, dia);
        if (data < hoje) {
            data = new Date(anoAtual + 1, mes - 1, dia);
        }
        return { nome, data, mes, dia };
    });

    lista.sort((a, b) => a.data - b.data);

    const proximos = lista.slice(0, qtd);

    container.innerHTML = proximos.map(evento => {
        const diffDias = Math.round((evento.data - hoje) / 86400000);
        let rotulo;
        if (diffDias <= 0) rotulo = "Hoje";
        else if (diffDias === 1) rotulo = "Amanhã";
        else rotulo = `em ${diffDias} dias`;

        return `
            <div class="proximo-evento-card">
                <div class="proximo-evento-data">
                    <span class="dia">${String(evento.dia).padStart(2, '0')}</span>
                    <span class="mes">${meses[evento.mes - 1].slice(0, 3)}</span>
                </div>
                <div class="proximo-evento-info">
                    <strong>${evento.nome}</strong>
                    <span>${rotulo}</span>
                </div>
            </div>
        `;
    }).join('');
}

renderizarProximosEventos();
