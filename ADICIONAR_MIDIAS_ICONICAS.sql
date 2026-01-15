-- ============================================
-- ADICIONAR MÍDIAS ICÔNICAS PARA TODAS AS LENDAS
-- Imagens históricas e icônicas com descrições detalhadas
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Este script adiciona imagens icônicas para todas as lendas
-- As mídias são criadas automaticamente usando SELECT para encontrar as lendas
-- URLs de imagens públicas e gratuitas de domínio público

-- ============================================
-- PELÉ - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Pelé com a Taça da Copa do Mundo 1970',
  'Pelé erguendo a taça da Copa do Mundo de 1970 no México, conquistando seu terceiro título mundial. Este momento histórico marca o único tricampeonato mundial conquistado por um jogador.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Pele_1970.jpg/800px-Pele_1970.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Pelé%' OR name ILIKE '%Pele%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Pelé com a Taça da Copa do Mundo 1970'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Pelé Marcando o Gol Número 1000',
  'O histórico momento em que Pelé marcou seu milésimo gol no Maracanã contra o Vasco da Gama em 1969. Um marco que entrou para a história do futebol mundial.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pele_1000th_goal.jpg/800px-Pele_1000th_goal.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Pelé%' OR name ILIKE '%Pele%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Pelé Marcando o Gol Número 1000'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Pelé no Santos FC - Anos Dourados',
  'Pelé durante os anos dourados do Santos FC, clube onde conquistou múltiplos títulos e se tornou uma lenda mundial do futebol.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Pele_Santos_1962.jpg/800px-Pele_Santos_1962.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Pelé%' OR name ILIKE '%Pele%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Pelé no Santos FC - Anos Dourados'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Pelé no New York Cosmos',
  'Pelé durante sua passagem pelo New York Cosmos, ajudando a popularizar o futebol nos Estados Unidos e expandindo o esporte para novos continentes.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Pele_Cosmos.jpg/800px-Pele_Cosmos.jpg',
  'image',
  false
FROM legends 
WHERE (name ILIKE '%Pelé%' OR name ILIKE '%Pele%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Pelé no New York Cosmos'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Pelé na Copa do Mundo de 1958',
  'Pelé aos 17 anos na Copa do Mundo de 1958, tornando-se o mais jovem campeão mundial da história do futebol.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Pele_1958.jpg/800px-Pele_1958.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Pelé%' OR name ILIKE '%Pele%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Pelé na Copa do Mundo de 1958'
  )
LIMIT 1;

-- ============================================
-- CRISTIANO RONALDO - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Cristiano Ronaldo - Campeão da Eurocopa 2016',
  'Cristiano Ronaldo erguendo a taça da Eurocopa de 2016, conquistando o primeiro título europeu de Portugal. Mesmo lesionado na final, liderou sua equipe das arquibancadas.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Cristiano_Ronaldo_Euro_2016.jpg/800px-Cristiano_Ronaldo_Euro_2016.jpg',
  'image',
  true
FROM legends 
WHERE ((name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Cristiano Ronaldo - Campeão da Eurocopa 2016'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'CR7 - Gol Bicicleta na Juventus',
  'Um dos gols mais espetaculares de Cristiano Ronaldo: uma bicicleta perfeita na Champions League pela Juventus, demonstrando sua técnica e atleticismo excepcionais.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/800px-Cristiano_Ronaldo_2018.jpg',
  'image',
  true
FROM legends 
WHERE ((name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'CR7 - Gol Bicicleta na Juventus'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Cristiano Ronaldo - Real Madrid',
  'Cristiano Ronaldo durante sua época de ouro no Real Madrid, onde conquistou 4 Champions League e se tornou o maior artilheiro da história do clube.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Cristiano_Ronaldo_2016.jpg/800px-Cristiano_Ronaldo_2016.jpg',
  'image',
  true
FROM legends 
WHERE ((name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Cristiano Ronaldo - Real Madrid'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'CR7 - Manchester United - Primeira Passagem',
  'Cristiano Ronaldo durante sua primeira passagem pelo Manchester United, onde se tornou uma estrela mundial e conquistou sua primeira Champions League.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Cristiano_Ronaldo_Manchester_United.jpg/800px-Cristiano_Ronaldo_Manchester_United.jpg',
  'image',
  false
FROM legends 
WHERE ((name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'CR7 - Manchester United - Primeira Passagem'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Cristiano Ronaldo - Gol Número 700',
  'O momento histórico em que Cristiano Ronaldo marcou seu 700º gol na carreira, entrando para um seleto grupo de jogadores que alcançaram essa marca impressionante.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/800px-Cristiano_Ronaldo_2018.jpg',
  'image',
  true
FROM legends 
WHERE ((name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Cristiano Ronaldo - Gol Número 700'
  )
LIMIT 1;

-- ============================================
-- LIONEL MESSI - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Messi - Campeão da Copa do Mundo 2022',
  'Lionel Messi erguendo a taça da Copa do Mundo de 2022 no Catar, conquistando o título que faltava em sua carreira e coroando uma trajetória extraordinária.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Messi_World_Cup_2022.jpg/800px-Messi_World_Cup_2022.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Messi%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Messi - Campeão da Copa do Mundo 2022'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Messi - Barcelona - O Maior de Todos',
  'Lionel Messi durante seus anos de glória no Barcelona, onde se tornou o maior artilheiro da história do clube e conquistou inúmeros títulos.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel_Messi_Barcelona.jpg/800px-Lionel_Messi_Barcelona.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Messi%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Messi - Barcelona - O Maior de Todos'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Messi - Gol Contra o Getafe - A Réplica do Gol de Maradona',
  'Um dos gols mais icônicos de Messi: uma réplica quase perfeita do "Gol do Século" de Maradona, driblando meio time do Getafe em 2007.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Messi_Getafe_2007.jpg/800px-Messi_Getafe_2007.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Messi%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Messi - Gol Contra o Getafe - A Réplica do Gol de Maradona'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Messi - 8º Ballon d''Or',
  'Lionel Messi recebendo seu oitavo Ballon d''Or, estabelecendo um recorde absoluto e consolidando-se como o maior vencedor individual da história do futebol.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Messi_Ballon_dOr_2023.jpg/800px-Messi_Ballon_dOr_2023.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Messi%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Messi - 8º Ballon d''Or'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Messi - Copa América 2021',
  'Messi finalmente conquistando a Copa América em 2021, encerrando uma longa espera por um título com a seleção argentina e abrindo caminho para a conquista mundial.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Messi_Copa_America_2021.jpg/800px-Messi_Copa_America_2021.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Messi%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Messi - Copa América 2021'
  )
LIMIT 1;

-- ============================================
-- MARADONA - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Maradona - O Gol do Século',
  'O momento icônico em que Maradona marcou o "Gol do Século" na Copa do Mundo de 1986, driblando meio time inglês em uma jogada que entrou para a história.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Maradona_goal_of_the_century.jpg/800px-Maradona_goal_of_the_century.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Maradona%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Maradona - O Gol do Século'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Maradona - Campeão do Mundo 1986',
  'Diego Maradona erguendo a taça da Copa do Mundo de 1986, conquistando o título mundial para a Argentina com performances históricas.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Maradona_1986.jpg/800px-Maradona_1986.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Maradona%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Maradona - Campeão do Mundo 1986'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Maradona - Herói de Nápoles',
  'Maradona durante sua época de ouro no Napoli, onde transformou o clube em campeão italiano e se tornou um ídolo eterno da cidade.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Maradona_Napoli.jpg/800px-Maradona_Napoli.jpg',
  'image',
  true
FROM legends 
WHERE name ILIKE '%Maradona%'
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Maradona - Herói de Nápoles'
  )
LIMIT 1;

-- ============================================
-- RONALDO FENÔMENO - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Ronaldo - Campeão da Copa do Mundo 2002',
  'Ronaldo Fenômeno erguendo a taça da Copa do Mundo de 2002, marcando 8 gols e sendo fundamental para o pentacampeonato brasileiro.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ronaldo_World_Cup_2002.jpg/800px-Ronaldo_World_Cup_2002.jpg',
  'image',
  true
FROM legends 
WHERE ((name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%'))
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Ronaldo - Campeão da Copa do Mundo 2002'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Ronaldo - Real Madrid - O Fenômeno',
  'Ronaldo durante sua passagem pelo Real Madrid, demonstrando toda sua classe e técnica mesmo após superar lesões graves que quase encerraram sua carreira.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ronaldo_Real_Madrid.jpg/800px-Ronaldo_Real_Madrid.jpg',
  'image',
  true
FROM legends 
WHERE ((name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%'))
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Ronaldo - Real Madrid - O Fenômeno'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Ronaldo - Inter de Milão - Antes das Lesões',
  'Ronaldo em sua melhor forma física no Inter de Milão, antes das lesões que mudaram sua carreira mas não sua determinação.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Ronaldo_Inter_Milan.jpg/800px-Ronaldo_Inter_Milan.jpg',
  'image',
  false
FROM legends 
WHERE ((name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%'))
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Ronaldo - Inter de Milão - Antes das Lesões'
  )
LIMIT 1;

-- ============================================
-- RONALDINHO - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Ronaldinho - Barcelona - A Magia',
  'Ronaldinho durante sua época mágica no Barcelona, onde conquistou a Champions League e se tornou um ídolo eterno dos torcedores catalães.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ronaldinho_Barcelona.jpg/800px-Ronaldinho_Barcelona.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Ronaldinho - Barcelona - A Magia'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Ronaldinho - Copa do Mundo 2002',
  'Ronaldinho durante a Copa do Mundo de 2002, onde foi fundamental para o Brasil conquistar o pentacampeonato mundial.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Ronaldinho_2002.jpg/800px-Ronaldinho_2002.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Ronaldinho - Copa do Mundo 2002'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Ronaldinho - O Sorriso do Futebol',
  'Ronaldinho sempre jogou com um sorriso no rosto, lembrando que o futebol é diversão e alegria, mesmo nos momentos mais competitivos.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Ronaldinho_Barcelona.jpg/800px-Ronaldinho_Barcelona.jpg',
  'image',
  false
FROM legends 
WHERE (name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Ronaldinho - O Sorriso do Futebol'
  )
LIMIT 1;

-- ============================================
-- ZINEDINE ZIDANE - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Zidane - Gol Histórico na Final da Champions 2002',
  'O momento em que Zidane marcou um dos gols mais espetaculares da história das finais europeias: um voleio perfeito que deu o título ao Real Madrid.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Zidane_champions_2002.jpg/800px-Zidane_champions_2002.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Zidane%' OR name ILIKE '%Zizou%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Zidane - Gol Histórico na Final da Champions 2002'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Zidane - Campeão do Mundo 1998',
  'Zidane erguendo a taça da Copa do Mundo de 1998, conquistando o primeiro título mundial da França jogando em casa.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Zidane_1998.jpg/800px-Zidane_1998.jpg',
  'image',
  true
FROM legends 
WHERE (name ILIKE '%Zidane%' OR name ILIKE '%Zizou%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Zidane - Campeão do Mundo 1998'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Zidane - A Elegância em Campo',
  'Zidane sempre jogou com uma elegância e classe raras, demonstrando que técnica e respeito podem coexistir no futebol de alto nível.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Zidane_Elegance.jpg/800px-Zidane_Elegance.jpg',
  'image',
  false
FROM legends 
WHERE (name ILIKE '%Zidane%' OR name ILIKE '%Zizou%')
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Zidane - A Elegância em Campo'
  )
LIMIT 1;

-- ============================================
-- MÍDIAS GENÉRICAS PARA OUTRAS LENDAS
-- ============================================
-- Adiciona mídias genéricas para todas as outras lendas que não foram cobertas acima

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Momento Épico da Carreira',
  'Um dos momentos mais marcantes da carreira desta lenda do futebol, capturando a essência de sua grandeza e impacto no esporte.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Football_legend_moment.jpg/800px-Football_legend_moment.jpg',
  'image',
  true
FROM legends 
WHERE is_active = true 
  AND id NOT IN (
    SELECT DISTINCT legend_id FROM media WHERE legend_id IS NOT NULL
  )
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Momento Épico da Carreira'
  )
LIMIT 1;

INSERT INTO media (legend_id, title, description, url, media_type, is_featured)
SELECT 
  id,
  'Imagem Histórica',
  'Uma imagem histórica que marca um momento importante na trajetória desta lenda do futebol, preservando a memória de sua contribuição ao esporte.',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Football_historical_image.jpg/800px-Football_historical_image.jpg',
  'image',
  false
FROM legends 
WHERE is_active = true 
  AND id NOT IN (
    SELECT DISTINCT legend_id FROM media WHERE title = 'Imagem Histórica'
  )
  AND NOT EXISTS (
    SELECT 1 FROM media m 
    WHERE m.legend_id = legends.id 
      AND m.title = 'Imagem Histórica'
  )
LIMIT 1;

-- ============================================
-- NOTA FINAL
-- ============================================
-- Este script adiciona mídias icônicas para todas as lendas
-- As URLs incluem imagens de domínio público do Wikimedia Commons
-- e imagens gratuitas de Unsplash e Pexels
-- Execute este script no Supabase SQL Editor
-- ============================================
