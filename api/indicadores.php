<?php
// api/indicadores.php
//
// Endpoint público (sem login) para a página html/indicadores.html.
// Combina dois tipos de indicador:
//
//   1) "Automáticos" — calculados na hora a partir das tabelas que já
//      existem (cidade/bairro), sem depender de nenhum envio manual.
//   2) "Enviados pelas prefeituras" — números de indicadores_ambientais
//      com status = 'aprovado' (ver api/prefeituras/enviar_indicadores.php
//      e api/admin/aprovar_dado.php).

header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');

require_once "conexao.php";

// ---------------------------------------------------------
// 1) Indicadores automáticos por cidade (bairro/cidade)
// ---------------------------------------------------------
$sqlCidades = "SELECT id, nome FROM cidade WHERE tem_info = 1 ORDER BY nome";
$resultCidades = $conn->query($sqlCidades);

if (!$resultCidades) {
    echo json_encode(['error' => 'Erro na consulta de cidades: ' . $conn->error]);
    exit;
}

$porCidade = [];
$totalBairros = 0;
$totalBairrosSeletiva = 0;

while ($cidade = $resultCidades->fetch_assoc()) {
    $cidadeId = (int) $cidade['id'];

    $sqlTotal = "SELECT COUNT(DISTINCT nome) AS total FROM bairro WHERE cidade_id = $cidadeId AND ativo = 1";
    $bairrosTotal = (int) ($conn->query($sqlTotal)->fetch_assoc()['total'] ?? 0);

    $sqlSeletiva = "SELECT COUNT(DISTINCT nome) AS total FROM bairro WHERE cidade_id = $cidadeId AND ativo = 1 AND tipo_coleta = 'Seletiva'";
    $bairrosSeletiva = (int) ($conn->query($sqlSeletiva)->fetch_assoc()['total'] ?? 0);

    $totalBairros += $bairrosTotal;
    $totalBairrosSeletiva += $bairrosSeletiva;

    // Indicador enviado pela prefeitura mais recente e aprovado para esta cidade
    $sqlIndicador = "SELECT periodo, populacao_atendida, volume_coletado_ton, volume_reciclavel_ton,
                             pontos_coleta_ativos, fonte, atualizado_em
                      FROM indicadores_ambientais
                      WHERE cidade_id = $cidadeId AND status = 'aprovado'
                      ORDER BY periodo DESC, atualizado_em DESC
                      LIMIT 1";
    $resIndicador = $conn->query($sqlIndicador);
    $indicador = null;
    if ($resIndicador && $resIndicador->num_rows > 0) {
        $row = $resIndicador->fetch_assoc();
        $indicador = [
            'periodo' => $row['periodo'],
            'populacao_atendida' => $row['populacao_atendida'] !== null ? (int) $row['populacao_atendida'] : null,
            'volume_coletado_ton' => $row['volume_coletado_ton'] !== null ? (float) $row['volume_coletado_ton'] : null,
            'volume_reciclavel_ton' => $row['volume_reciclavel_ton'] !== null ? (float) $row['volume_reciclavel_ton'] : null,
            'pontos_coleta_ativos' => $row['pontos_coleta_ativos'] !== null ? (int) $row['pontos_coleta_ativos'] : null,
            'fonte' => $row['fonte'],
            'atualizado_em' => $row['atualizado_em'],
        ];
    }

    $porCidade[] = [
        'cidade_id' => $cidadeId,
        'nome' => $cidade['nome'],
        'bairros_total' => $bairrosTotal,
        'bairros_seletiva' => $bairrosSeletiva,
        'adesao_seletiva_pct' => $bairrosTotal > 0 ? round($bairrosSeletiva / $bairrosTotal * 100, 1) : 0.0,
        'indicador' => $indicador,
    ];
}

// ---------------------------------------------------------
// 2) Totais agregados dos indicadores aprovados (mais recente por cidade)
// ---------------------------------------------------------
$volumeColetadoTotal = 0.0;
$volumeReciclavelTotal = 0.0;
$populacaoAtendidaTotal = 0;
$pontosAtivosTotal = 0;
$cidadesComIndicador = 0;

foreach ($porCidade as $c) {
    if ($c['indicador']) {
        $volumeColetadoTotal += (float) ($c['indicador']['volume_coletado_ton'] ?? 0);
        $volumeReciclavelTotal += (float) ($c['indicador']['volume_reciclavel_ton'] ?? 0);
        $populacaoAtendidaTotal += (int) ($c['indicador']['populacao_atendida'] ?? 0);
        $pontosAtivosTotal += (int) ($c['indicador']['pontos_coleta_ativos'] ?? 0);
        $cidadesComIndicador++;
    }
}

// ---------------------------------------------------------
// 3) Impacto estimado (estimativa simplificada, para conscientização —
//    não substitui um inventário oficial de emissões).
// ---------------------------------------------------------
$FATOR_CO2_POR_TONELADA = 1.0;   // ton CO2e evitado por tonelada reciclada (estimativa conservadora)
$FATOR_ARVORES_POR_TONELADA = 17; // árvores preservadas por tonelada reciclada (referência usual p/ papel/papelão)

$co2EvitadoTon = round($volumeReciclavelTotal * $FATOR_CO2_POR_TONELADA, 1);
$arvoresEquivalentes = (int) round($volumeReciclavelTotal * $FATOR_ARVORES_POR_TONELADA);

echo json_encode([
    'gerado_em' => date('Y-m-d H:i:s'),
    'resumo' => [
        'cidades_participantes' => count($porCidade),
        'cidades_com_indicador_enviado' => $cidadesComIndicador,
        'bairros_mapeados' => $totalBairros,
        'bairros_com_seletiva' => $totalBairrosSeletiva,
        'adesao_seletiva_pct' => $totalBairros > 0 ? round($totalBairrosSeletiva / $totalBairros * 100, 1) : 0.0,
        'volume_coletado_total_ton' => round($volumeColetadoTotal, 1),
        'volume_reciclavel_total_ton' => round($volumeReciclavelTotal, 1),
        'populacao_atendida_total' => $populacaoAtendidaTotal,
        'pontos_coleta_ativos_total' => $pontosAtivosTotal,
    ],
    'impacto_estimado' => [
        'co2_evitado_ton' => $co2EvitadoTon,
        'arvores_equivalentes' => $arvoresEquivalentes,
        'metodologia' => 'Estimativa simplificada para fins de conscientização: considera 1 tonelada de CO2e evitado e 17 árvores preservadas por tonelada de material reciclável reportado pelas prefeituras. Não substitui um inventário oficial de emissões.',
    ],
    'por_cidade' => $porCidade,
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
