# EcoLaço — Indicadores Ambientais (novo)

Este pacote traz a primeira funcionalidade pendente implementada: **Indicadores
Ambientais**. Abaixo está o que foi feito, como aplicar no seu XAMPP e o que
testar antes da apresentação.

## 1. Aplique a migração do banco (obrigatório)

1. Abra o phpMyAdmin → banco `ecolaco` → aba **SQL**.
2. Cole o conteúdo de `sql/2026_08_27_indicadores_ambientais.sql` e execute.

Isso cria a tabela `indicadores_ambientais`, adiciona o tipo `'indicador'` em
`historico_envios` (com as colunas `referencia_tabela`/`referencia_id`, que
fazem a aprovação do admin refletir automaticamente no indicador) e insere 3
linhas de demonstração (Jacarezinho, Cambará e Cornélio Procópio), já
identificadas como "dado de demonstração" na página pública.

## 2. O que foi implementado

**Página pública** `html/indicadores.html` (link "Indicadores" já está no
menu, no rodapé e no card da home que antes dizia "em desenvolvimento"):

- Números gerais calculados automaticamente a partir do que já existe no
  banco (cidades participantes, bairros mapeados, % de bairros com coleta
  seletiva cadastrada) — não depende de nenhum envio manual.
- Impacto ambiental estimado (CO₂ evitado / árvores equivalentes), calculado
  a partir do volume reciclável enviado pelas prefeituras, com a metodologia
  explicada na própria página (deixei bem claro que é uma estimativa
  simplificada para conscientização, não um inventário oficial).
- Comparativo entre cidades (gráfico de barras) e tabela com volume
  coletado, volume reciclável, população atendida e pontos de coleta ativos
  por cidade.

**Prefeitura** (`prefeitura/dashboard.html`): nova aba "Indicadores" para
enviar período, população atendida, volume coletado, volume reciclável e
pontos ativos. O envio fica "pendente" até a aprovação do admin.

**Admin** (`admin/dashboard_adm.html`): a tela de aprovação de dados já é
genérica — passou a reconhecer o tipo "indicador" (ícone 📊) e, ao aprovar
ou rejeitar, atualiza automaticamente o status na tabela
`indicadores_ambientais` (antes, aprovar só marcava o histórico, sem
refletir no dado em si).

## 3. Bugs que encontrei pelo caminho e já corrigi

- `api/admin/aprovar_dado.php` e `api/admin/aprovar_prefeitura.php` tentavam
  carregar `gerar_notificacao.php`, mas o arquivo real se chama
  `gerar_notificacoes.php` (plural). Isso quebrava a aprovação de qualquer
  dado ou prefeitura com um erro fatal do PHP — corrigido.
- `api/prefeituras/historico_completo.php` (usado pela aba "Histórico" do
  dashboard da prefeitura) estava salvo, por engano, dentro de `api/admin/`.
  Movi para o lugar certo — a aba "Histórico" da prefeitura estava
  retornando 404 até então.
- De brinde, `aprovar_prefeitura.php` tinha uma variável `$nome` usada na
  notificação sem nunca ser definida — agora busca o nome da prefeitura
  antes de montar a mensagem.

## 4. Arquivos novos / alterados

Novos: `sql/2026_08_27_indicadores_ambientais.sql`, `api/indicadores.php`,
`api/prefeituras/enviar_indicadores.php`, `html/indicadores.html`,
`css/indicadores.css`, `js/indicadores.js`.

Alterados: `api/admin/aprovar_dado.php`, `api/admin/aprovar_prefeitura.php`,
`api/admin/listar_dados.php`, `html/index.html`, `html/calendario.html`,
`html/coleta.html`, `html/prefeitura/dashboard.html`,
`js/prefeitura/dashboard.js`.

Movido: `api/admin/historico_completo.php` → `api/prefeituras/historico_completo.php`.

## 5. Como testei

Não havia MySQL disponível no ambiente onde montei isso, então validei em
duas frentes: `php -l` em todos os arquivos PHP tocados (sem erro de
sintaxe) e a lógica de agregação (bairros por cidade / % de coleta
seletiva) rodei contra os dados reais do seu último backup usando SQLite,
antes de portar para o SQL final — os números batem com o que está no seu
dump (ex: só Cornélio Procópio tem bairros marcados como "Seletiva" hoje).
A parte visual (página pública, card da home, menu, formulário da
prefeitura) eu rodei com um servidor local e capturei prints — seguem
anexados. Ainda assim, vale você testar o fluxo completo (prefeitura envia
→ admin aprova → aparece na página pública) no seu XAMPP antes da
apresentação, já que não consegui testar contra o MySQL real.

## 6. Próximo item pendente

O outro item da lista — ranking de reciclagem por bairro com gamificação —
ainda não foi mexido. Me avisa quando quiser que eu comece essa parte.
