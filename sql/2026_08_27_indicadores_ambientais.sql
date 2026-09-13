-- =========================================================
-- ECOLAÇO • MIGRAÇÃO: Indicadores Ambientais
-- Data: 27/08/2026
--
-- O que este script faz:
--   1) Cria a tabela `indicadores_ambientais`, onde ficam os
--      números que as prefeituras enviam (volume coletado,
--      volume reciclável, população atendida, pontos de coleta
--      ativos) por cidade e por período (mês/ano).
--   2) Adiciona o tipo 'indicador' em `historico_envios` e duas
--      colunas novas (`referencia_tabela`, `referencia_id`) para
--      que a aprovação/rejeição feita pelo admin reflita
--      automaticamente na linha correspondente de
--      `indicadores_ambientais` (o mesmo mecanismo pode ser
--      reaproveitado por futuras telas de aprovação).
--   3) Insere 3 registros de demonstração (já aprovados) para
--      Jacarezinho, Cambará e Cornélio Procópio, só para a
--      página pública não ficar vazia até as prefeituras
--      começarem a enviar dados reais.
--
-- Como aplicar (XAMPP / phpMyAdmin):
--   1. Abra o phpMyAdmin, selecione o banco `ecolaco`.
--   2. Aba "SQL" → cole o conteúdo deste arquivo → Executar.
--   (Ou: mysql -u root ecolaco < 2026_08_27_indicadores_ambientais.sql)
-- =========================================================

-- ---------------------------------------------------------
-- 1) Tabela indicadores_ambientais
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS `indicadores_ambientais` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cidade_id` int(11) NOT NULL,
  `prefeitura_id` int(11) DEFAULT NULL,
  `periodo` varchar(7) NOT NULL COMMENT 'Formato AAAA-MM, ex: 2026-07',
  `populacao_atendida` int(11) DEFAULT NULL,
  `volume_coletado_ton` decimal(10,2) DEFAULT NULL COMMENT 'Total de resíduos coletados no período, em toneladas',
  `volume_reciclavel_ton` decimal(10,2) DEFAULT NULL COMMENT 'Parte do volume coletado destinada à reciclagem, em toneladas',
  `pontos_coleta_ativos` int(11) DEFAULT NULL,
  `fonte` varchar(150) DEFAULT NULL,
  `observacao` varchar(255) DEFAULT NULL,
  `status` enum('pendente','aprovado','rejeitado') NOT NULL DEFAULT 'pendente',
  `observacao_admin` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `atualizado_em` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_cidade_id` (`cidade_id`),
  KEY `idx_status` (`status`),
  KEY `idx_prefeitura_id` (`prefeitura_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ---------------------------------------------------------
-- 2) historico_envios: novo tipo 'indicador' + colunas de referência
-- ---------------------------------------------------------
ALTER TABLE `historico_envios`
  MODIFY `tipo` enum('coleta','pev','campanha','comunicado','indicador') NOT NULL;

ALTER TABLE `historico_envios`
  ADD COLUMN `referencia_tabela` varchar(50) DEFAULT NULL AFTER `status`,
  ADD COLUMN `referencia_id` int(11) DEFAULT NULL AFTER `referencia_tabela`;

-- ---------------------------------------------------------
-- 3) Dados de demonstração (já aprovados) — Jacarezinho, Cambará
--    e Cornélio Procópio. Substitua/complemente assim que as
--    prefeituras enviarem números reais pelo dashboard.
-- ---------------------------------------------------------
INSERT INTO `indicadores_ambientais`
  (`cidade_id`, `prefeitura_id`, `periodo`, `populacao_atendida`, `volume_coletado_ton`, `volume_reciclavel_ton`, `pontos_coleta_ativos`, `fonte`, `observacao`, `status`)
VALUES
  (1, 1, '2026-07', 38000, 610.50, 92.30, 6, 'Estimativa interna (dado de demonstração para apresentação)', 'Dado de demonstração — substituir pelo envio oficial da prefeitura.', 'aprovado'),
  (2, NULL, '2026-07', 21500, 340.00, 41.80, 3, 'Estimativa interna (dado de demonstração para apresentação)', 'Dado de demonstração — substituir pelo envio oficial da prefeitura.', 'aprovado'),
  (3, NULL, '2026-07', 45000, 820.75, 128.60, 8, 'Estimativa interna (dado de demonstração para apresentação)', 'Dado de demonstração — substituir pelo envio oficial da prefeitura.', 'aprovado');
