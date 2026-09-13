<?php
// api/prefeituras/enviar_indicadores.php
//
// Prefeitura logada envia (ou atualiza) os indicadores ambientais de um
// período (mês/ano). O registro entra como 'pendente' e só aparece na
// página pública depois que o admin aprovar (api/admin/aprovar_dado.php).

header('Content-Type: application/json; charset=UTF-8');
session_start();

if (!isset($_SESSION['prefeitura_id'])) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Não autenticado']);
    exit;
}

require_once "../conexao.php";

$dados = json_decode(file_get_contents('php://input'), true);

if (!$dados) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Dados inválidos']);
    exit;
}

$prefeitura_id = intval($_SESSION['prefeitura_id']);

// Descobrir a cidade da prefeitura logada
$sql_prefeitura = "SELECT cidade_id, nome FROM prefeituras WHERE id = $prefeitura_id";
$result = $conn->query($sql_prefeitura);
$prefeitura = $result ? $result->fetch_assoc() : null;

if (!$prefeitura) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Prefeitura não encontrada']);
    exit;
}

$cidade_id = intval($prefeitura['cidade_id']);

// Período (AAAA-MM)
$periodo = isset($dados['periodo']) ? trim($dados['periodo']) : '';
if (!preg_match('/^\d{4}-\d{2}$/', $periodo)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Informe o período no formato AAAA-MM.']);
    exit;
}
$periodo = $conn->real_escape_string($periodo);

// Campos numéricos (todos opcionais, exceto o período)
function numeroOuNull($valor) {
    if ($valor === null || $valor === '') return null;
    if (!is_numeric($valor)) return null;
    return $valor;
}

$populacao_atendida = numeroOuNull($dados['populacao_atendida'] ?? null);
$volume_coletado_ton = numeroOuNull($dados['volume_coletado_ton'] ?? null);
$volume_reciclavel_ton = numeroOuNull($dados['volume_reciclavel_ton'] ?? null);
$pontos_coleta_ativos = numeroOuNull($dados['pontos_coleta_ativos'] ?? null);
$fonte = isset($dados['fonte']) && $dados['fonte'] !== '' ? $conn->real_escape_string(trim($dados['fonte'])) : null;
$observacao = isset($dados['observacao']) && $dados['observacao'] !== '' ? $conn->real_escape_string(trim($dados['observacao'])) : null;

if ($populacao_atendida === null && $volume_coletado_ton === null && $volume_reciclavel_ton === null && $pontos_coleta_ativos === null) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Preencha ao menos um indicador.']);
    exit;
}

if ($volume_coletado_ton !== null && $volume_reciclavel_ton !== null && (float) $volume_reciclavel_ton > (float) $volume_coletado_ton) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'O volume reciclável não pode ser maior que o volume total coletado.']);
    exit;
}

$populacaoSql = $populacao_atendida !== null ? intval($populacao_atendida) : 'NULL';
$volumeColetadoSql = $volume_coletado_ton !== null ? floatval($volume_coletado_ton) : 'NULL';
$volumeReciclavelSql = $volume_reciclavel_ton !== null ? floatval($volume_reciclavel_ton) : 'NULL';
$pontosSql = $pontos_coleta_ativos !== null ? intval($pontos_coleta_ativos) : 'NULL';
$fonteSql = $fonte !== null ? "'$fonte'" : 'NULL';
$observacaoSql = $observacao !== null ? "'$observacao'" : 'NULL';

$sql_insert = "INSERT INTO indicadores_ambientais
                (cidade_id, prefeitura_id, periodo, populacao_atendida, volume_coletado_ton, volume_reciclavel_ton, pontos_coleta_ativos, fonte, observacao, status)
                VALUES
                ($cidade_id, $prefeitura_id, '$periodo', $populacaoSql, $volumeColetadoSql, $volumeReciclavelSql, $pontosSql, $fonteSql, $observacaoSql, 'pendente')";

if (!$conn->query($sql_insert)) {
    echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao salvar indicadores: ' . $conn->error]);
    exit;
}

$novo_id = $conn->insert_id;

// Registrar no histórico, referenciando o registro criado para que a
// aprovação do admin consiga atualizar o status em indicadores_ambientais.
$descricao = "Indicadores ambientais de {$periodo}" . ($volumeColetadoSql !== 'NULL' ? " — {$volumeColetadoSql} ton coletadas" : '');
$descricao = $conn->real_escape_string($descricao);

$sql_historico = "INSERT INTO historico_envios (prefeitura_id, tipo, descricao, status, referencia_tabela, referencia_id)
                    VALUES ($prefeitura_id, 'indicador', '$descricao', 'pendente', 'indicadores_ambientais', $novo_id)";

$conn->query($sql_historico);

echo json_encode([
    'sucesso' => true,
    'mensagem' => 'Indicadores enviados para aprovação.',
    'id' => $novo_id,
]);
