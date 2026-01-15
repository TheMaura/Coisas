-- ============================================
-- ADICIONAR CONTEÚDO COMPLETO E DETALHADO PARA TODAS AS LENDAS
-- Troféus, Vídeos YouTube, Marcos da Carreira, Histórias e Mídias
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- IMPORTANTE: Este script usa SELECT para encontrar as lendas automaticamente
-- Não é necessário substituir IDs manualmente
-- Execute: SELECT id, name FROM legends WHERE is_active = true; para verificar

-- ============================================
-- PELÉ - Troféus Completos (Todos os Troféus)
-- ============================================

-- Copas do Mundo
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1958, 'national', true, 'Campeão da Copa do Mundo na Suécia - Primeira conquista mundial do Brasil aos 17 anos'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1962, 'national', true, 'Campeão da Copa do Mundo no Chile - Bicampeonato mundial'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1970, 'national', true, 'Campeão da Copa do Mundo no México - Tricampeonato mundial histórico'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa Libertadores
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Libertadores da América', 'Copa Libertadores', 1962, 'club', true, 'Campeão da Copa Libertadores pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Libertadores da América', 'Copa Libertadores', 1963, 'club', true, 'Bicampeão da Copa Libertadores pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa Intercontinental
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Intercontinental', 'Copa Intercontinental', 1962, 'club', true, 'Campeão da Copa Intercontinental pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Intercontinental', 'Copa Intercontinental', 1963, 'club', true, 'Bicampeão da Copa Intercontinental pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Campeonato Paulista (10 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1958, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1960, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1961, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1962, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1964, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1965, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1967, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1968, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1969, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1973, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Taça Brasil (5 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1961, 'club', true, 'Campeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1962, 'club', true, 'Bicampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1963, 'club', true, 'Tricampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1964, 'club', true, 'Tetracampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1965, 'club', true, 'Pentacampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- NASL Soccer Bowl
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'NASL Soccer Bowl', 'NASL', 1977, 'club', true, 'Campeão da NASL pelo New York Cosmos'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Prêmios Individuais
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'FIFA Player of the Century', 'FIFA', 2000, 'individual', true, 'Eleito Jogador do Século pela FIFA (compartilhado com Maradona)'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'IOC Athlete of the Century', 'IOC', 1999, 'individual', true, 'Atleta do Século pelo Comitê Olímpico Internacional'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- PELÉ - Vídeos do YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Pelé - Melhores Momentos e Gols da Carreira', 'kcAAjkUzy1s', 'highlights', true, 'Compilação completa dos melhores momentos e gols de Pelé'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Pelé - Gol Número 1000 - Histórico', 'dQw4w9WgXcQ', 'goals', true, 'O histórico gol número 1000 de Pelé no Maracanã'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Pelé - Copa do Mundo 1970 - Todos os Gols', 'dQw4w9WgXcQ', 'goals', true, 'Todos os gols de Pelé na Copa do Mundo de 1970'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Pelé - Documentário Completo', 'dQw4w9WgXcQ', 'documentary', true, 'Documentário completo sobre a vida e carreira de Pelé'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Pelé - Melhores Dribles e Jogadas', 'dQw4w9WgXcQ', 'skills', true, 'Compilação dos melhores dribles e jogadas de Pelé'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- PELÉ - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Début Profissional', 'Primeiro jogo profissional pelo Santos FC contra o Corinthians aos 15 anos', '1956-09-07', 'debut', 'high', 'Santos FC', 'Campeonato Paulista'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Primeiro Gol Profissional', 'Marcou seu primeiro gol profissional aos 15 anos contra o Corinthians', '1956-09-07', 'goal', 'high', 'Santos FC', 'Campeonato Paulista'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Primeira Copa do Mundo', 'Campeão da Copa do Mundo na Suécia aos 17 anos - o mais jovem campeão mundial da história', '1958-06-29', 'trophy', 'legendary', 'Brasil', 'Copa do Mundo FIFA'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Gol Número 1000', 'Marcou seu milésimo gol no Maracanã contra o Vasco da Gama - marco histórico', '1969-11-19', 'goal', 'legendary', 'Santos FC', 'Campeonato Brasileiro'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Tricampeonato Mundial', 'Conquistou seu terceiro título mundial no México - único jogador a conquistar 3 Copas do Mundo', '1970-06-21', 'trophy', 'legendary', 'Brasil', 'Copa do Mundo FIFA'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para New York Cosmos', 'Assinou contrato com o New York Cosmos, popularizando o futebol nos Estados Unidos', '1975-06-10', 'transfer', 'high', 'New York Cosmos', 'NASL'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Aposentadoria', 'Jogo de despedida entre Santos e New York Cosmos no Giants Stadium', '1977-10-01', 'retirement', 'legendary', 'Santos FC / New York Cosmos', 'Amistoso'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- PELÉ - Histórias Inspiradoras
-- ============================================
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT id, 'O Menino que Conquistou o Mundo', 'Aos 17 anos, Pelé se tornou o jogador mais jovem a conquistar uma Copa do Mundo. Nascido em Três Corações, Minas Gerais, ele superou a pobreza e se tornou o maior jogador de todos os tempos. Sua história inspira milhões de crianças ao redor do mundo a acreditarem que os sonhos podem se tornar realidade.', true, ARRAY['inspiração', 'superação', 'história'], 'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT id, 'O Gol Número 1000', 'Em 19 de novembro de 1969, Pelé marcou seu milésimo gol no Maracanã. O estádio estava lotado e o mundo parou para assistir esse momento histórico. O gol foi marcado de pênalti contra o Vasco da Gama, e Pelé se tornou o primeiro jogador a alcançar essa marca impressionante.', true, ARRAY['histórico', 'recordes', 'gols'], 'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- CRISTIANO RONALDO - Troféus Completos
-- ============================================

-- Champions League (5 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2008, 'club', true, 'Campeão da Champions League pelo Manchester United'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2014, 'club', true, 'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2016, 'club', true, 'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2017, 'club', true, 'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2018, 'club', true, 'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Eurocopa
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Eurocopa', 'Eurocopa', 2016, 'national', true, 'Campeão da Eurocopa pela Seleção Portuguesa'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Nations League
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Nations League', 'UEFA Nations League', 2019, 'national', true, 'Campeão da Nations League pela Seleção Portuguesa'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Ballon d''Or (5 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2008, 'individual', true, 'Primeiro Ballon d''Or'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2013, 'individual', true, 'Segundo Ballon d''Or'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2014, 'individual', true, 'Terceiro Ballon d''Or'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2016, 'individual', true, 'Quarto Ballon d''Or'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2017, 'individual', true, 'Quinto Ballon d''Or'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Premier League (3 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Premier League', 'Premier League', 2007, 'club', true, 'Campeão da Premier League pelo Manchester United'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Premier League', 'Premier League', 2008, 'club', true, 'Bicampeão da Premier League pelo Manchester United'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Premier League', 'Premier League', 2009, 'club', true, 'Tricampeão da Premier League pelo Manchester United'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- La Liga (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2012, 'club', true, 'Campeão da La Liga pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2017, 'club', true, 'Bicampeão da La Liga pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Serie A (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Serie A', 'Serie A', 2019, 'club', true, 'Campeão da Serie A pela Juventus'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Serie A', 'Serie A', 2020, 'club', true, 'Bicampeão da Serie A pela Juventus'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- FA Cup
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'FA Cup', 'FA Cup', 2004, 'club', true, 'Campeão da FA Cup pelo Manchester United'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa do Rei (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2011, 'club', true, 'Campeão da Copa del Rey pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2014, 'club', true, 'Bicampeão da Copa del Rey pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Supercopa da UEFA (3 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Supercopa da UEFA', 'Supercopa da UEFA', 2008, 'club', true, 'Campeão da Supercopa da UEFA pelo Manchester United'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Supercopa da UEFA', 'Supercopa da UEFA', 2014, 'club', true, 'Campeão da Supercopa da UEFA pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Supercopa da UEFA', 'Supercopa da UEFA', 2017, 'club', true, 'Campeão da Supercopa da UEFA pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Mundial de Clubes (4 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Mundial de Clubes', 'Mundial de Clubes', 2008, 'club', true, 'Campeão do Mundial de Clubes pelo Manchester United'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Mundial de Clubes', 'Mundial de Clubes', 2014, 'club', true, 'Campeão do Mundial de Clubes pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Mundial de Clubes', 'Mundial de Clubes', 2016, 'club', true, 'Campeão do Mundial de Clubes pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Mundial de Clubes', 'Mundial de Clubes', 2017, 'club', true, 'Campeão do Mundial de Clubes pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- CRISTIANO RONALDO - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Cristiano Ronaldo - Melhores Gols e Jogadas', 'dQw4w9WgXcQ', 'highlights', true, 'Compilação dos melhores gols e jogadas de Cristiano Ronaldo'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Cristiano Ronaldo - Champions League Highlights', 'dQw4w9WgXcQ', 'highlights', true, 'Melhores momentos na Champions League'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Cristiano Ronaldo - Todos os Gols na Champions League', 'dQw4w9WgXcQ', 'goals', true, 'Todos os gols de CR7 na Champions League'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- CRISTIANO RONALDO - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Début Profissional', 'Primeiro jogo profissional pelo Sporting CP', '2002-08-14', 'debut', 'high', 'Sporting CP', 'Primeira Liga'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Manchester United', 'Assinou contrato com o Manchester United por 12 milhões de libras', '2003-08-12', 'transfer', 'high', 'Manchester United', 'Premier League'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Real Madrid', 'Transferência recorde de 94 milhões de euros para o Real Madrid', '2009-07-01', 'transfer', 'legendary', 'Real Madrid', 'La Liga'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Primeiro Gol na Champions League', 'Marcou seu primeiro gol na Champions League', '2003-10-01', 'goal', 'high', 'Manchester United', 'Champions League'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Campeão da Eurocopa', 'Conquistou a Eurocopa pela primeira vez com Portugal', '2016-07-10', 'trophy', 'legendary', 'Portugal', 'Eurocopa'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Gol Número 700', 'Marcou seu 700º gol na carreira', '2019-10-14', 'goal', 'legendary', 'Portugal', 'Eurocopa Qualifiers'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Juventus', 'Assinou contrato com a Juventus por 100 milhões de euros', '2018-07-10', 'transfer', 'high', 'Juventus', 'Serie A'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Al Nassr', 'Assinou contrato com o Al Nassr da Arábia Saudita', '2023-01-01', 'transfer', 'high', 'Al Nassr', 'Saudi Pro League'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- LIONEL MESSI - Troféus Completos
-- ============================================

-- Copa do Mundo
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 2022, 'national', true, 'Campeão da Copa do Mundo no Catar - Conquista histórica'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Champions League (4 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2006, 'club', true, 'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2009, 'club', true, 'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2011, 'club', true, 'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2015, 'club', true, 'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa América
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa América', 'Copa América', 2021, 'national', true, 'Campeão da Copa América pela Argentina'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Ballon d''Or (8 títulos - recorde)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2009, 'individual', true, 'Primeiro Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2010, 'individual', true, 'Segundo Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2011, 'individual', true, 'Terceiro Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2012, 'individual', true, 'Quarto Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2015, 'individual', true, 'Quinto Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2019, 'individual', true, 'Sexto Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2021, 'individual', true, 'Sétimo Ballon d''Or - Recorde histórico'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2023, 'individual', true, 'Oitavo Ballon d''Or - Recorde absoluto'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- La Liga (10 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2005, 'club', true, 'Primeiro título da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2006, 'club', true, 'Bicampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2009, 'club', true, 'Tricampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2010, 'club', true, 'Tetracampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2011, 'club', true, 'Pentacampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2013, 'club', true, 'Hexacampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2015, 'club', true, 'Heptacampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2016, 'club', true, 'Octacampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2018, 'club', true, 'Nonacampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2019, 'club', true, 'Decacampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa del Rey (7 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2009, 'club', true, 'Campeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2012, 'club', true, 'Bicampeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2015, 'club', true, 'Tricampeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2016, 'club', true, 'Tetracampeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2017, 'club', true, 'Pentacampeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2018, 'club', true, 'Hexacampeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 2021, 'club', true, 'Heptacampeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Mundial de Clubes (3 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Mundial de Clubes', 'Mundial de Clubes', 2009, 'club', true, 'Campeão do Mundial de Clubes pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Mundial de Clubes', 'Mundial de Clubes', 2011, 'club', true, 'Bicampeão do Mundial de Clubes pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Mundial de Clubes', 'Mundial de Clubes', 2015, 'club', true, 'Tricampeão do Mundial de Clubes pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Supercopa da UEFA (3 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Supercopa da UEFA', 'Supercopa da UEFA', 2009, 'club', true, 'Campeão da Supercopa da UEFA pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Supercopa da UEFA', 'Supercopa da UEFA', 2011, 'club', true, 'Bicampeão da Supercopa da UEFA pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Supercopa da UEFA', 'Supercopa da UEFA', 2015, 'club', true, 'Tricampeão da Supercopa da UEFA pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Ligue 1
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ligue 1', 'Ligue 1', 2022, 'club', true, 'Campeão da Ligue 1 pelo Paris Saint-Germain'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ligue 1', 'Ligue 1', 2023, 'club', true, 'Bicampeão da Ligue 1 pelo Paris Saint-Germain'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- MLS Cup
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'MLS Cup', 'MLS Cup', 2023, 'club', true, 'Campeão da MLS Cup pelo Inter Miami'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- LIONEL MESSI - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Lionel Messi - Melhores Gols e Dribles', 'dQw4w9WgXcQ', 'highlights', true, 'Compilação dos melhores gols e dribles de Messi'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Messi - Copa do Mundo 2022 - Todos os Gols', 'dQw4w9WgXcQ', 'goals', true, 'Todos os gols de Messi na Copa do Mundo 2022'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Messi - Champions League Highlights', 'dQw4w9WgXcQ', 'highlights', true, 'Melhores momentos de Messi na Champions League'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- LIONEL MESSI - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Début Profissional', 'Primeiro jogo profissional pelo Barcelona', '2004-10-16', 'debut', 'high', 'Barcelona', 'La Liga'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Primeiro Gol na La Liga', 'Marcou seu primeiro gol na La Liga contra o Albacete', '2005-05-01', 'goal', 'high', 'Barcelona', 'La Liga'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Paris Saint-Germain', 'Assinou contrato com o PSG após 21 anos no Barcelona', '2021-08-10', 'transfer', 'legendary', 'Paris Saint-Germain', 'Ligue 1'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Campeão da Copa do Mundo', 'Conquistou a Copa do Mundo no Catar - Conquista histórica que faltava', '2022-12-18', 'trophy', 'legendary', 'Argentina', 'Copa do Mundo FIFA'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Gol Número 700', 'Marcou seu 700º gol na carreira', '2020-07-01', 'goal', 'legendary', 'Barcelona', 'La Liga'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Inter Miami', 'Assinou contrato com o Inter Miami da MLS', '2023-07-15', 'transfer', 'high', 'Inter Miami', 'MLS'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- NOTA FINAL
-- ============================================
-- Este script adiciona conteúdo completo para Pelé, Cristiano Ronaldo e Messi
-- Para adicionar mais lendas, siga o mesmo padrão
-- Os IDs do YouTube são placeholders - substitua pelos IDs reais dos vídeos
-- Execute este script no Supabase SQL Editor
-- ============================================

