-- ============================================
-- ADICIONAR CONTEÚDO COMPLETO PARA TODAS AS LENDAS
-- Script completo com troféus, vídeos, marcos, histórias e mídias
-- Execute no Supabase SQL Editor
-- ============================================

-- Este script usa SELECT para encontrar lendas automaticamente
-- Execute primeiro: SELECT id, name FROM legends WHERE is_active = true;

-- ============================================
-- MARADONA - Troféus Completos
-- ============================================

-- Copa do Mundo
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1986, 'national', true, 'Campeão da Copa do Mundo no México - A "Mão de Deus" e o "Gol do Século"'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa do Mundo (Vice)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1990, 'national', true, 'Vice-campeão da Copa do Mundo na Itália'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa do Mundo Sub-20
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo Sub-20', 'Copa do Mundo Sub-20', 1979, 'national', true, 'Campeão da Copa do Mundo Sub-20'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Serie A (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Serie A', 'Serie A', 1987, 'club', true, 'Campeão da Serie A pelo Napoli'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Serie A', 'Serie A', 1990, 'club', true, 'Bicampeão da Serie A pelo Napoli'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa da Itália
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa da Itália', 'Coppa Italia', 1987, 'club', true, 'Campeão da Copa da Itália pelo Napoli'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa da UEFA
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa da UEFA', 'UEFA Cup', 1989, 'club', true, 'Campeão da Copa da UEFA pelo Napoli'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Supercopa da Itália
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Supercopa da Itália', 'Supercoppa Italiana', 1990, 'club', true, 'Campeão da Supercopa da Itália pelo Napoli'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- La Liga
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 1981, 'club', true, 'Campeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa del Rey
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa del Rey', 'Copa del Rey', 1983, 'club', true, 'Campeão da Copa del Rey pelo Barcelona'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa da Liga Espanhola
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa da Liga Espanhola', 'Copa de la Liga', 1983, 'club', true, 'Campeão da Copa da Liga Espanhola pelo Barcelona'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- MARADONA - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Maradona - Gol do Século e Mão de Deus', 'dQw4w9WgXcQ', 'goals', true, 'Os dois gols mais famosos de Maradona na Copa de 1986'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Maradona - Melhores Momentos e Dribles', 'dQw4w9WgXcQ', 'highlights', true, 'Compilação dos melhores momentos e dribles de Maradona'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Maradona - Copa do Mundo 1986 - Todos os Gols', 'dQw4w9WgXcQ', 'goals', true, 'Todos os gols de Maradona na Copa do Mundo de 1986'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- MARADONA - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Début Profissional', 'Primeiro jogo profissional pelo Argentinos Juniors', '1976-10-20', 'debut', 'high', 'Argentinos Juniors', 'Primera División'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Barcelona', 'Transferência recorde para o Barcelona', '1982-06-04', 'transfer', 'high', 'Barcelona', 'La Liga'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Napoli', 'Transferência para o Napoli por 7,6 milhões de dólares', '1984-07-05', 'transfer', 'legendary', 'Napoli', 'Serie A'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Campeão da Copa do Mundo', 'Conquistou a Copa do Mundo no México com a "Mão de Deus" e o "Gol do Século"', '1986-06-29', 'trophy', 'legendary', 'Argentina', 'Copa do Mundo FIFA'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Primeiro Título pelo Napoli', 'Conquistou o primeiro título da Serie A pelo Napoli', '1987-05-10', 'trophy', 'legendary', 'Napoli', 'Serie A'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- RONALDO FENÔMENO - Troféus Completos
-- ============================================

-- Copa do Mundo (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1994, 'national', true, 'Campeão da Copa do Mundo nos EUA (não jogou a final)'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 2002, 'national', true, 'Campeão da Copa do Mundo na Coreia/Japão - Artilheiro com 8 gols'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa América (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa América', 'Copa América', 1997, 'national', true, 'Campeão da Copa América pela Seleção Brasileira'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa América', 'Copa América', 1999, 'national', true, 'Bicampeão da Copa América pela Seleção Brasileira'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Champions League
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2003, 'club', true, 'Campeão da Champions League pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

-- La Liga
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2003, 'club', true, 'Campeão da La Liga pelo Real Madrid'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa da UEFA
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa da UEFA', 'UEFA Cup', 1998, 'club', true, 'Campeão da Copa da UEFA pelo Inter de Milão'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Ballon d''Or (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 1997, 'individual', true, 'Primeiro Ballon d''Or'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2002, 'individual', true, 'Segundo Ballon d''Or'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- RONALDO FENÔMENO - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Ronaldo Fenômeno - Melhores Gols e Dribles', 'dQw4w9WgXcQ', 'highlights', true, 'Compilação dos melhores gols e dribles de Ronaldo Fenômeno'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Ronaldo - Copa do Mundo 2002 - Todos os Gols', 'dQw4w9WgXcQ', 'goals', true, 'Todos os 8 gols de Ronaldo na Copa do Mundo de 2002'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- RONALDO FENÔMENO - Marcos da Carreira
-- ============================================
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Début Profissional', 'Primeiro jogo profissional pelo Cruzeiro', '1993-05-25', 'debut', 'high', 'Cruzeiro', 'Campeonato Brasileiro'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para PSV', 'Transferência para o PSV Eindhoven', '1994-08-01', 'transfer', 'high', 'PSV Eindhoven', 'Eredivisie'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Barcelona', 'Transferência para o Barcelona por 19,5 milhões de dólares', '1996-08-01', 'transfer', 'high', 'Barcelona', 'La Liga'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Inter de Milão', 'Transferência para o Inter de Milão por 27 milhões de dólares', '1997-07-01', 'transfer', 'high', 'Inter de Milão', 'Serie A'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Lesão Grave no Joelho', 'Sofreu lesão grave no joelho direito que quase encerrou sua carreira', '1999-11-21', 'injury', 'high', 'Inter de Milão', 'Serie A'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Transferência para Real Madrid', 'Transferência para o Real Madrid por 45 milhões de euros', '2002-08-31', 'transfer', 'legendary', 'Real Madrid', 'La Liga'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name, competition_name)
SELECT id, 'Campeão da Copa do Mundo 2002', 'Conquistou a Copa do Mundo na Coreia/Japão como artilheiro com 8 gols', '2002-06-30', 'trophy', 'legendary', 'Brasil', 'Copa do Mundo FIFA'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- RONALDINHO - Troféus Completos
-- ============================================

-- Copa do Mundo
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 2002, 'national', true, 'Campeão da Copa do Mundo na Coreia/Japão'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa América
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa América', 'Copa América', 1999, 'national', true, 'Campeão da Copa América pela Seleção Brasileira'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Champions League
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2006, 'club', true, 'Campeão da Champions League pelo Barcelona'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

-- La Liga (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2005, 'club', true, 'Campeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2006, 'club', true, 'Bicampeão da La Liga pelo Barcelona'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Copa Libertadores
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Libertadores', 'Copa Libertadores', 2013, 'club', true, 'Campeão da Copa Libertadores pelo Atlético Mineiro'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Ballon d''Or
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 2005, 'individual', true, 'Ballon d''Or'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- RONALDINHO - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Ronaldinho - Melhores Dribles e Jogadas', 'dQw4w9WgXcQ', 'skills', true, 'Compilação dos melhores dribles e jogadas de Ronaldinho'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Ronaldinho - Gols Impossíveis', 'dQw4w9WgXcQ', 'goals', true, 'Compilação dos gols mais incríveis de Ronaldinho'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- ZINEDINE ZIDANE - Troféus Completos
-- ============================================

-- Copa do Mundo
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1998, 'national', true, 'Campeão da Copa do Mundo na França - Marcou 2 gols na final'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Eurocopa
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Eurocopa', 'Eurocopa', 2000, 'national', true, 'Campeão da Eurocopa pela França'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Champions League
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Champions League', 'UEFA Champions League', 2002, 'club', true, 'Campeão da Champions League pelo Real Madrid - Gol histórico na final'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

-- La Liga (1 título)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'La Liga', 'La Liga', 2003, 'club', true, 'Campeão da La Liga pelo Real Madrid'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Serie A (2 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Serie A', 'Serie A', 1997, 'club', true, 'Campeão da Serie A pela Juventus'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Serie A', 'Serie A', 1998, 'club', true, 'Bicampeão da Serie A pela Juventus'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Ballon d''Or
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Ballon d''Or', 'Ballon d''Or', 1998, 'individual', true, 'Ballon d''Or'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- ZINEDINE ZIDANE - Vídeos YouTube
-- ============================================
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Zidane - Gol Histórico na Final da Champions 2002', 'dQw4w9WgXcQ', 'goals', true, 'O gol histórico de Zidane na final da Champions League de 2002'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured, description)
SELECT id, 'Zidane - Melhores Momentos e Jogadas', 'dQw4w9WgXcQ', 'highlights', true, 'Compilação dos melhores momentos e jogadas de Zidane'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT (youtube_id) DO NOTHING;

-- ============================================
-- NOTA FINAL
-- ============================================
-- Este script adiciona conteúdo para:
-- - Pelé (já no arquivo anterior)
-- - Cristiano Ronaldo (já no arquivo anterior)
-- - Messi (já no arquivo anterior)
-- - Maradona
-- - Ronaldo Fenômeno
-- - Ronaldinho
-- - Zinedine Zidane
--
-- Para adicionar mais lendas, siga o mesmo padrão
-- Os IDs do YouTube são placeholders - substitua pelos IDs reais
-- Execute ambos os scripts SQL no Supabase SQL Editor
-- ============================================

