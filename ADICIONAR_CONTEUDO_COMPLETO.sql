-- ============================================
-- ADICIONAR CONTEÚDO COMPLETO PARA LENDAS
-- Troféus, Vídeos YouTube e Marcos da Carreira
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- NOTA: Você precisa substituir os IDs das lendas pelos IDs reais do seu banco
-- Execute primeiro: SELECT id, name FROM legends WHERE is_active = true;

-- ============================================
-- PELÉ - Troféus
-- ============================================
-- Primeiro, obtenha o ID do Pelé:
-- SELECT id FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1;

-- Troféus do Pelé
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa do Mundo FIFA',
  'Copa do Mundo',
  1958,
  'national',
  true,
  'Campeão da Copa do Mundo na Suécia - Primeira conquista mundial do Brasil'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa do Mundo FIFA',
  'Copa do Mundo',
  1962,
  'national',
  true,
  'Campeão da Copa do Mundo no Chile'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa do Mundo FIFA',
  'Copa do Mundo',
  1970,
  'national',
  true,
  'Campeão da Copa do Mundo no México - Tricampeonato mundial'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa Libertadores da América',
  'Copa Libertadores',
  1962,
  'club',
  true,
  'Campeão da Copa Libertadores pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa Libertadores da América',
  'Copa Libertadores',
  1963,
  'club',
  true,
  'Bicampeão da Copa Libertadores pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa Intercontinental',
  'Copa Intercontinental',
  1962,
  'club',
  true,
  'Campeão da Copa Intercontinental pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa Intercontinental',
  'Copa Intercontinental',
  1963,
  'club',
  true,
  'Bicampeão da Copa Intercontinental pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1958,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1960,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1961,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1962,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1964,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1965,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1967,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1968,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1969,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Campeonato Paulista',
  'Campeonato Paulista',
  1973,
  'club',
  false,
  'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Taça Brasil',
  'Taça Brasil',
  1961,
  'club',
  true,
  'Campeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Taça Brasil',
  'Taça Brasil',
  1962,
  'club',
  true,
  'Bicampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Taça Brasil',
  'Taça Brasil',
  1963,
  'club',
  true,
  'Tricampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Taça Brasil',
  'Taça Brasil',
  1964,
  'club',
  true,
  'Tetracampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Taça Brasil',
  'Taça Brasil',
  1965,
  'club',
  true,
  'Pentacampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- PELÉ - Vídeos do YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT 
  id,
  'Pelé - Melhores Momentos e Gols',
  'dQw4w9WgXcQ', -- Substitua por ID real do YouTube
  'highlights',
  true,
  'Compilação dos melhores momentos e gols de Pelé'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT 
  id,
  'Pelé - Gol Número 1000',
  'dQw4w9WgXcQ', -- Substitua por ID real
  'goals',
  true,
  'O histórico gol número 1000 de Pelé'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT 
  id,
  'Pelé - Documentário Completo',
  'dQw4w9WgXcQ', -- Substitua por ID real
  'documentary',
  true,
  'Documentário completo sobre a vida e carreira de Pelé'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- PELÉ - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Début Profissional',
  'Primeiro jogo profissional pelo Santos FC contra o Corinthians',
  '1956-09-07',
  'debut',
  'high',
  'Santos FC',
  'Campeonato Paulista'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Primeiro Gol Profissional',
  'Marcou seu primeiro gol profissional aos 15 anos',
  '1956-09-07',
  'goal',
  'high',
  'Santos FC',
  'Campeonato Paulista'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Primeira Copa do Mundo',
  'Campeão da Copa do Mundo na Suécia aos 17 anos - o mais jovem campeão mundial',
  '1958-06-29',
  'trophy',
  'legendary',
  'Brasil',
  'Copa do Mundo FIFA'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Gol Número 1000',
  'Marcou seu milésimo gol no Maracanã contra o Vasco da Gama',
  '1969-11-19',
  'goal',
  'legendary',
  'Santos FC',
  'Campeonato Brasileiro'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Tricampeonato Mundial',
  'Conquistou seu terceiro título mundial no México',
  '1970-06-21',
  'trophy',
  'legendary',
  'Brasil',
  'Copa do Mundo FIFA'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Transferência para o New York Cosmos',
  'Assinou contrato com o New York Cosmos, popularizando o futebol nos EUA',
  '1975-06-10',
  'transfer',
  'high',
  'New York Cosmos',
  'NASL'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Aposentadoria',
  'Jogo de despedida entre Santos e New York Cosmos',
  '1977-10-01',
  'retirement',
  'legendary',
  'Santos FC / New York Cosmos',
  'Amistoso'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- CRISTIANO RONALDO - Troféus
-- ============================================
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2008,
  'club',
  true,
  'Campeão da Champions League pelo Manchester United'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2014,
  'club',
  true,
  'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2016,
  'club',
  true,
  'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2017,
  'club',
  true,
  'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2018,
  'club',
  true,
  'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Eurocopa',
  'Eurocopa',
  2016,
  'national',
  true,
  'Campeão da Eurocopa pela Seleção Portuguesa'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Nations League',
  'UEFA Nations League',
  2019,
  'national',
  true,
  'Campeão da Nations League pela Seleção Portuguesa'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2008,
  'individual',
  true,
  'Primeiro Ballon d''Or'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2013,
  'individual',
  true,
  'Segundo Ballon d''Or'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2014,
  'individual',
  true,
  'Terceiro Ballon d''Or'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2016,
  'individual',
  true,
  'Quarto Ballon d''Or'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2017,
  'individual',
  true,
  'Quinto Ballon d''Or'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Premier League',
  'Premier League',
  2007,
  'club',
  true,
  'Campeão da Premier League pelo Manchester United'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Premier League',
  'Premier League',
  2008,
  'club',
  true,
  'Bicampeão da Premier League pelo Manchester United'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'La Liga',
  'La Liga',
  2012,
  'club',
  true,
  'Campeão da La Liga pelo Real Madrid'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'La Liga',
  'La Liga',
  2017,
  'club',
  true,
  'Bicampeão da La Liga pelo Real Madrid'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- CRISTIANO RONALDO - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT 
  id,
  'Cristiano Ronaldo - Melhores Gols e Jogadas',
  'dQw4w9WgXcQ', -- Substitua por ID real
  'highlights',
  true,
  'Compilação dos melhores gols e jogadas de Cristiano Ronaldo'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT 
  id,
  'Cristiano Ronaldo - Champions League Highlights',
  'dQw4w9WgXcQ', -- Substitua por ID real
  'highlights',
  true,
  'Melhores momentos na Champions League'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- CRISTIANO RONALDO - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Début Profissional',
  'Primeiro jogo profissional pelo Sporting CP',
  '2002-08-14',
  'debut',
  'high',
  'Sporting CP',
  'Primeira Liga'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Transferência para Manchester United',
  'Assinou contrato com o Manchester United por 12 milhões de libras',
  '2003-08-12',
  'transfer',
  'high',
  'Manchester United',
  'Premier League'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Transferência para Real Madrid',
  'Transferência recorde de 94 milhões de euros para o Real Madrid',
  '2009-07-01',
  'transfer',
  'legendary',
  'Real Madrid',
  'La Liga'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Primeiro Gol na Champions League',
  'Marcou seu primeiro gol na Champions League',
  '2003-10-01',
  'goal',
  'high',
  'Manchester United',
  'Champions League'
FROM legends WHERE name ILIKE '%Cristiano%' OR name ILIKE '%Ronaldo%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- LIONEL MESSI - Troféus
-- ============================================
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa do Mundo FIFA',
  'Copa do Mundo',
  2022,
  'national',
  true,
  'Campeão da Copa do Mundo no Catar - Conquista histórica'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2006,
  'club',
  true,
  'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2009,
  'club',
  true,
  'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2011,
  'club',
  true,
  'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Champions League',
  'UEFA Champions League',
  2015,
  'club',
  true,
  'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Copa América',
  'Copa América',
  2021,
  'national',
  true,
  'Campeão da Copa América pela Argentina'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2009,
  'individual',
  true,
  'Primeiro Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2010,
  'individual',
  true,
  'Segundo Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2011,
  'individual',
  true,
  'Terceiro Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2012,
  'individual',
  true,
  'Quarto Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2015,
  'individual',
  true,
  'Quinto Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2019,
  'individual',
  true,
  'Sexto Ballon d''Or'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'Ballon d''Or',
  'Ballon d''Or',
  2021,
  'individual',
  true,
  'Sétimo Ballon d''Or - Recorde histórico'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'La Liga',
  'La Liga',
  2005,
  'club',
  true,
  'Primeiro título da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Adicionar mais títulos da La Liga (Messi tem 10 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT 
  id,
  'La Liga',
  'La Liga',
  2006,
  'club',
  true,
  'Bicampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Continuar com mais anos da La Liga: 2009, 2010, 2011, 2013, 2015, 2016, 2018, 2019

-- ============================================
-- LIONEL MESSI - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT 
  id,
  'Lionel Messi - Melhores Gols e Dribles',
  'dQw4w9WgXcQ', -- Substitua por ID real
  'highlights',
  true,
  'Compilação dos melhores gols e dribles de Messi'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT 
  id,
  'Messi - Copa do Mundo 2022 - Todos os Gols',
  'dQw4w9WgXcQ', -- Substitua por ID real
  'goals',
  true,
  'Todos os gols de Messi na Copa do Mundo 2022'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- LIONEL MESSI - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Début Profissional',
  'Primeiro jogo profissional pelo Barcelona',
  '2004-10-16',
  'debut',
  'high',
  'Barcelona',
  'La Liga'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Primeiro Gol na La Liga',
  'Marcou seu primeiro gol na La Liga contra o Albacete',
  '2005-05-01',
  'goal',
  'high',
  'Barcelona',
  'La Liga'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Transferência para Paris Saint-Germain',
  'Assinou contrato com o PSG após 21 anos no Barcelona',
  '2021-08-10',
  'transfer',
  'legendary',
  'Paris Saint-Germain',
  'Ligue 1'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT 
  id,
  'Campeão da Copa do Mundo',
  'Conquistou a Copa do Mundo no Catar - Conquista histórica',
  '2022-12-18',
  'trophy',
  'legendary',
  'Argentina',
  'Copa do Mundo FIFA'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- NOTA: Este é um exemplo inicial
-- Você precisa:
-- 1. Buscar os IDs reais das lendas no seu banco
-- 2. Substituir os IDs do YouTube pelos IDs reais dos vídeos
-- 3. Adicionar mais lendas seguindo o mesmo padrão
-- ============================================

