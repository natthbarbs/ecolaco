-- =========================================================
-- ECOLAÇO • DADOS DE DEMONSTRAÇÃO PARA A FEIRA
-- =========================================================
-- Este script ADICIONA cidades e bairros fictícios aos que já
-- existem no banco (Jacarezinho, Cambará e Cornélio Procópio
-- não são alterados nem duplicados).
--
-- Os nomes de bairro, dias e horários de coleta abaixo são
-- FICTÍCIOS — criados só para a demonstração ter volume de
-- dados. As cidades e coordenadas são reais (Norte Pioneiro
-- do Paraná), mas os dados de coleta não vêm das prefeituras.
--
-- Como usar (phpMyAdmin, já que vocês usam XAMPP):
--   1. Abra http://localhost/phpmyadmin
--   2. Selecione o banco "ecolaco"
--   3. Aba "SQL" → cole este arquivo inteiro → Executar
-- =========================================================

-- ---------------------------------------------------------
-- 1. NOVAS CIDADES (Norte Pioneiro do Paraná, coordenadas reais)
-- ---------------------------------------------------------

INSERT INTO `cidade` (`nome`, `latitude`, `longitude`, `tem_info`) VALUES
('Santo Antônio da Platina', -23.2960000, -50.0760000, 1),
('Ibaiti',                   -23.8472000, -50.1931000, 1),
('Wenceslau Braz',           -23.8738900, -49.8027800, 1),
('Siqueira Campos',          -23.6889000, -49.8339000, 1);

-- Guarda os IDs recém-criados pra usar nos INSERTs de bairro abaixo
SET @id_platina  = (SELECT id FROM cidade WHERE nome = 'Santo Antônio da Platina');
SET @id_ibaiti   = (SELECT id FROM cidade WHERE nome = 'Ibaiti');
SET @id_wbraz    = (SELECT id FROM cidade WHERE nome = 'Wenceslau Braz');
SET @id_siqueira = (SELECT id FROM cidade WHERE nome = 'Siqueira Campos');

-- ---------------------------------------------------------
-- 2. BAIRROS FICTÍCIOS — Santo Antônio da Platina
-- ---------------------------------------------------------

INSERT INTO `bairro` (`cidade_id`, `nome`, `tipo_coleta`, `dia_coleta`, `horario`, `observacao`, `ativo`) VALUES
(@id_platina, 'Centro',              'Regular',  'Segunda, Quarta e Sexta', '07:00-11:00', 'Diurna', 1),
(@id_platina, 'Jardim das Palmeiras','Regular',  'Segunda, Quarta e Sexta', '07:00-11:00', 'Diurna', 1),
(@id_platina, 'Vila Rocio',          'Regular',  'Terça, Quinta e Sábado',  '16:00-20:00', 'Noturna', 1),
(@id_platina, 'Parque das Águas',    'Seletiva', 'Terça e Sexta',           '13:00-17:00', '', 1),
(@id_platina, 'Jardim Primavera',    'Seletiva', 'Quarta',                  '13:00-17:00', '', 1),
(@id_platina, 'Conselheiro Zacarias','Regular',  'Segunda e Quinta',        '07:00-11:00', 'Diurna', 1);

-- ---------------------------------------------------------
-- 3. BAIRROS FICTÍCIOS — Ibaiti
-- ---------------------------------------------------------

INSERT INTO `bairro` (`cidade_id`, `nome`, `tipo_coleta`, `dia_coleta`, `horario`, `observacao`, `ativo`) VALUES
(@id_ibaiti, 'Centro',            'Regular',  'Segunda, Quarta e Sexta', '07:00-11:00', 'Diurna', 1),
(@id_ibaiti, 'Vila Nova',         'Regular',  'Segunda, Quarta e Sexta', '07:00-11:00', 'Diurna', 1),
(@id_ibaiti, 'Jardim Bela Vista', 'Regular',  'Terça e Sexta',           '16:00-20:00', 'Noturna', 1),
(@id_ibaiti, 'Parque São Jorge',  'Seletiva', 'Quinta',                  '13:00-17:00', '', 1),
(@id_ibaiti, 'Vila Operária',     'Seletiva', 'Terça e Quinta',          '13:00-17:00', '', 1);

-- ---------------------------------------------------------
-- 4. BAIRROS FICTÍCIOS — Wenceslau Braz
-- ---------------------------------------------------------

INSERT INTO `bairro` (`cidade_id`, `nome`, `tipo_coleta`, `dia_coleta`, `horario`, `observacao`, `ativo`) VALUES
(@id_wbraz, 'Centro',             'Regular',  'Segunda, Quarta e Sexta', '07:00-11:00', 'Diurna', 1),
(@id_wbraz, 'Jardim Esperança',   'Regular',  'Terça e Quinta',          '16:00-20:00', 'Noturna', 1),
(@id_wbraz, 'Vila São Pedro',     'Seletiva', 'Sexta',                   '13:00-17:00', '', 1),
(@id_wbraz, 'Recanto Verde',      'Regular',  'Segunda e Quinta',        '07:00-11:00', 'Diurna', 1);

-- ---------------------------------------------------------
-- 5. BAIRROS FICTÍCIOS — Siqueira Campos
-- ---------------------------------------------------------

INSERT INTO `bairro` (`cidade_id`, `nome`, `tipo_coleta`, `dia_coleta`, `horario`, `observacao`, `ativo`) VALUES
(@id_siqueira, 'Centro',            'Regular',  'Segunda, Quarta e Sexta', '07:00-11:00', 'Diurna', 1),
(@id_siqueira, 'Jardim Alvorada',   'Regular',  'Terça e Sexta',           '16:00-20:00', 'Noturna', 1),
(@id_siqueira, 'Vila Industrial',   'Seletiva', 'Quarta',                  '13:00-17:00', '', 1),
(@id_siqueira, 'Parque das Flores', 'Regular',  'Segunda e Quinta',        '07:00-11:00', 'Diurna', 1);

-- =========================================================
-- Pronto. Depois de rodar, confira em coleta.html — o mapa
-- deve mostrar 7 cidades no total (3 reais + 4 novas).
-- =========================================================
