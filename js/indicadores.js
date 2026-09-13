// ======================================================
// ECOLAÇO • INDICADORES AMBIENTAIS
// ======================================================

function formatarNumero(valor, casas = 0) {
    if (valor === null || valor === undefined) return '—';
    return Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas,
    });
}

function formatarPeriodo(periodo) {
    if (!periodo) return null;
    const [ano, mes] = periodo.split('-');
    const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    const indice = parseInt(mes, 10) - 1;
    return meses[indice] ? `${meses[indice]}/${ano}` : periodo;
}

async function carregarIndicadores() {
    try {
        const resposta = await fetch('../api/indicadores.php', { cache: 'no-cache' });
        if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);

        const dados = await resposta.json();
        if (dados.error) throw new Error(dados.error);

        renderizarKpis(dados.resumo);
        renderizarImpacto(dados.impacto_estimado);
        renderizarGrafico(dados.por_cidade);
        renderizarTabela(dados.por_cidade);

    } catch (erro) {
        console.error('Erro ao carregar indicadores:', erro);
        mostrarErro(erro.message);
    }
}

function mostrarErro(mensagem) {
    const kpis = document.getElementById('indic-kpis');
    if (kpis) {
        kpis.innerHTML = `<p class="indic-carregando">⚠ Não foi possível carregar os indicadores agora.<br><small>${mensagem}</small></p>`;
    }
    const grafico = document.getElementById('indic-grafico');
    if (grafico) {
        grafico.innerHTML = `<p class="indic-carregando">⚠ Não foi possível carregar o comparativo.</p>`;
    }
    const corpoTabela = document.getElementById('indic-tabela-corpo');
    if (corpoTabela) {
        corpoTabela.innerHTML = `<tr><td colspan="7" class="indic-carregando">⚠ Não foi possível carregar os dados por cidade.</td></tr>`;
    }
}

function renderizarKpis(resumo) {
    const container = document.getElementById('indic-kpis');
    if (!container || !resumo) return;

    const tiles = [
        {
            valor: formatarNumero(resumo.cidades_participantes),
            rotulo: 'cidades participantes',
        },
        {
            valor: formatarNumero(resumo.bairros_mapeados),
            rotulo: 'bairros com cronograma de coleta',
        },
        {
            valor: `${formatarNumero(resumo.adesao_seletiva_pct, 1)}%`,
            rotulo: 'dos bairros têm coleta seletiva cadastrada',
        },
        {
            valor: `${formatarNumero(resumo.volume_coletado_total_ton, 1)} t`,
            rotulo: 'coletadas no último período enviado',
        },
    ];

    container.innerHTML = tiles.map(t => `
        <div class="indic-kpi">
            <span class="indic-valor">${t.valor}</span>
            <span class="indic-rotulo">${t.rotulo}</span>
        </div>
    `).join('');
}

function renderizarImpacto(impacto) {
    const container = document.getElementById('indic-impacto');
    const metodologia = document.getElementById('indic-metodologia');
    if (!container || !impacto) return;

    container.innerHTML = `
        <div class="indic-kpi indic-destaque">
            <span class="indic-valor">${formatarNumero(impacto.co2_evitado_ton, 1)} t</span>
            <span class="indic-rotulo">de CO₂ equivalente evitado (estimativa)</span>
        </div>
        <div class="indic-kpi indic-destaque">
            <span class="indic-valor">${formatarNumero(impacto.arvores_equivalentes)}</span>
            <span class="indic-rotulo">árvores equivalentes preservadas (estimativa)</span>
        </div>
    `;

    if (metodologia) {
        metodologia.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <div><strong>Como calculamos</strong><br>${impacto.metodologia}</div>
        `;
    }
}

function renderizarGrafico(porCidade) {
    const container = document.getElementById('indic-grafico');
    if (!container) return;

    if (!Array.isArray(porCidade) || porCidade.length === 0) {
        container.innerHTML = '<p class="indic-carregando">Nenhuma cidade cadastrada ainda.</p>';
        return;
    }

    const ordenado = [...porCidade].sort((a, b) => b.adesao_seletiva_pct - a.adesao_seletiva_pct);

    container.innerHTML = ordenado.map(c => `
        <div class="indic-bar-row">
            <span class="indic-bar-nome" title="${c.nome}">${c.nome}</span>
            <div class="indic-bar-track">
                <div class="indic-bar-fill" style="width:${Math.max(c.adesao_seletiva_pct, 0)}%"></div>
            </div>
            <span class="indic-bar-valor">${formatarNumero(c.adesao_seletiva_pct, 1)}%</span>
        </div>
    `).join('');
}

function renderizarTabela(porCidade) {
    const corpo = document.getElementById('indic-tabela-corpo');
    if (!corpo) return;

    if (!Array.isArray(porCidade) || porCidade.length === 0) {
        corpo.innerHTML = '<tr><td colspan="7" class="indic-carregando">Nenhuma cidade cadastrada ainda.</td></tr>';
        return;
    }

    corpo.innerHTML = porCidade.map(c => {
        const ind = c.indicador;
        const ehDemo = ind && ind.fonte && ind.fonte.toLowerCase().includes('demonstra');
        const tagDemo = ehDemo ? '<span class="indic-tag-demo">demo</span>' : '';

        return `
            <tr>
                <td class="indic-cidade">${c.nome}</td>
                <td>${formatarNumero(c.bairros_total)}</td>
                <td>${formatarNumero(c.bairros_seletiva)} (${formatarNumero(c.adesao_seletiva_pct, 1)}%)</td>
                <td>${ind ? formatarPeriodo(ind.periodo) + tagDemo : '<span class="indic-sem-dado">aguardando envio</span>'}</td>
                <td>${ind && ind.volume_coletado_ton !== null ? formatarNumero(ind.volume_coletado_ton, 1) + ' t' : '<span class="indic-sem-dado">—</span>'}</td>
                <td>${ind && ind.volume_reciclavel_ton !== null ? formatarNumero(ind.volume_reciclavel_ton, 1) + ' t' : '<span class="indic-sem-dado">—</span>'}</td>
                <td>${ind && ind.pontos_coleta_ativos !== null ? formatarNumero(ind.pontos_coleta_ativos) : '<span class="indic-sem-dado">—</span>'}</td>
            </tr>
        `;
    }).join('');
}

carregarIndicadores();
