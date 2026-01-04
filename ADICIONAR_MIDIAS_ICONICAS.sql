-- ============================================
-- ADICIONAR MÍDIAS ICÔNICAS PARA TODAS AS LENDAS
-- Imagens históricas e icônicas com descrições detalhadas
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Este script adiciona imagens icônicas para todas as lendas
-- As mídias são criadas automaticamente usando SELECT para encontrar as lendas

-- ============================================
-- PELÉ - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Pelé com a Taça da Copa do Mundo 1970',
  'Pelé erguendo a taça da Copa do Mundo de 1970 no México, conquistando seu terceiro título mundial. Este momento histórico marca o único tricampeonato mundial conquistado por um jogador.',
  'https://example.com/pele-copa-1970.jpg', -- Substitua por URL real
  'image',
  true,
  1970
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Pelé com a Taça da Copa do Mundo 1970'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Pelé Marcando o Gol Número 1000',
  'O histórico momento em que Pelé marcou seu milésimo gol no Maracanã contra o Vasco da Gama em 1969. Um marco que entrou para a história do futebol mundial.',
  'https://example.com/pele-gol-1000.jpg', -- Substitua por URL real
  'image',
  true,
  1969
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Pelé Marcando o Gol Número 1000'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Pelé no Santos FC - Anos Dourados',
  'Pelé durante os anos dourados do Santos FC, clube onde conquistou múltiplos títulos e se tornou uma lenda mundial do futebol.',
  'https://example.com/pele-santos.jpg', -- Substitua por URL real
  'image',
  true,
  1962
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Pelé no Santos FC - Anos Dourados'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Pelé no New York Cosmos',
  'Pelé durante sua passagem pelo New York Cosmos, ajudando a popularizar o futebol nos Estados Unidos e expandindo o esporte para novos continentes.',
  'https://example.com/pele-cosmos.jpg', -- Substitua por URL real
  'image',
  false,
  1975
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Pelé no New York Cosmos'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Pelé na Copa do Mundo de 1958',
  'Pelé aos 17 anos na Copa do Mundo de 1958, tornando-se o mais jovem campeão mundial da história do futebol.',
  'https://example.com/pele-1958.jpg', -- Substitua por URL real
  'image',
  true,
  1958
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Pelé na Copa do Mundo de 1958'
);

-- ============================================
-- CRISTIANO RONALDO - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Cristiano Ronaldo - Campeão da Eurocopa 2016',
  'Cristiano Ronaldo erguendo a taça da Eurocopa de 2016, conquistando o primeiro título europeu de Portugal. Mesmo lesionado na final, liderou sua equipe das arquibancadas.',
  'https://example.com/cr7-eurocopa-2016.jpg', -- Substitua por URL real
  'image',
  true,
  2016
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Cristiano Ronaldo - Campeão da Eurocopa 2016'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'CR7 - Gol Bicicleta na Juventus',
  'Um dos gols mais espetaculares de Cristiano Ronaldo: uma bicicleta perfeita na Champions League pela Juventus, demonstrando sua técnica e atleticismo excepcionais.',
  'https://example.com/cr7-bicicleta.jpg', -- Substitua por URL real
  'image',
  true,
  2018
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'CR7 - Gol Bicicleta na Juventus'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Cristiano Ronaldo - Real Madrid',
  'Cristiano Ronaldo durante sua época de ouro no Real Madrid, onde conquistou 4 Champions League e se tornou o maior artilheiro da história do clube.',
  'https://example.com/cr7-real-madrid.jpg', -- Substitua por URL real
  'image',
  true,
  2014
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Cristiano Ronaldo - Real Madrid'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'CR7 - Manchester United - Primeira Passagem',
  'Cristiano Ronaldo durante sua primeira passagem pelo Manchester United, onde se tornou uma estrela mundial e conquistou sua primeira Champions League.',
  'https://example.com/cr7-manchester.jpg', -- Substitua por URL real
  'image',
  false,
  2008
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'CR7 - Manchester United - Primeira Passagem'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Cristiano Ronaldo - Gol Número 700',
  'O momento histórico em que Cristiano Ronaldo marcou seu 700º gol na carreira, entrando para um seleto grupo de jogadores que alcançaram essa marca impressionante.',
  'https://example.com/cr7-gol-700.jpg', -- Substitua por URL real
  'image',
  true,
  2019
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Cristiano Ronaldo - Gol Número 700'
);

-- ============================================
-- LIONEL MESSI - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Messi - Campeão da Copa do Mundo 2022',
  'Lionel Messi erguendo a taça da Copa do Mundo de 2022 no Catar, conquistando o título que faltava em sua carreira e coroando uma trajetória extraordinária.',
  'https://example.com/messi-copa-2022.jpg', -- Substitua por URL real
  'image',
  true,
  2022
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Messi - Campeão da Copa do Mundo 2022'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Messi - Barcelona - O Maior de Todos',
  'Lionel Messi durante seus anos de glória no Barcelona, onde se tornou o maior artilheiro da história do clube e conquistou inúmeros títulos.',
  'https://example.com/messi-barcelona.jpg', -- Substitua por URL real
  'image',
  true,
  2015
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Messi - Barcelona - O Maior de Todos'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Messi - Gol Contra o Getafe - A Réplica do Gol de Maradona',
  'Um dos gols mais icônicos de Messi: uma réplica quase perfeita do "Gol do Século" de Maradona, driblando meio time do Getafe em 2007.',
  'https://example.com/messi-getafe.jpg', -- Substitua por URL real
  'image',
  true,
  2007
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Messi - Gol Contra o Getafe - A Réplica do Gol de Maradona'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Messi - 8º Ballon d''Or',
  'Lionel Messi recebendo seu oitavo Ballon d''Or, estabelecendo um recorde absoluto e consolidando-se como o maior vencedor individual da história do futebol.',
  'https://example.com/messi-ballon-8.jpg', -- Substitua por URL real
  'image',
  true,
  2023
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Messi - 8º Ballon d''Or'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Messi - Copa América 2021',
  'Messi finalmente conquistando a Copa América em 2021, encerrando uma longa espera por um título com a seleção argentina e abrindo caminho para a conquista mundial.',
  'https://example.com/messi-copa-america.jpg', -- Substitua por URL real
  'image',
  true,
  2021
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Messi - Copa América 2021'
);

-- ============================================
-- MARADONA - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Maradona - O Gol do Século',
  'O momento icônico em que Maradona marcou o "Gol do Século" na Copa do Mundo de 1986, driblando meio time inglês em uma jogada que entrou para a história.',
  'https://example.com/maradona-gol-seculo.jpg', -- Substitua por URL real
  'image',
  true,
  1986
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Maradona - O Gol do Século'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Maradona - Campeão do Mundo 1986',
  'Diego Maradona erguendo a taça da Copa do Mundo de 1986, conquistando o título mundial para a Argentina com performances históricas.',
  'https://example.com/maradona-copa-1986.jpg', -- Substitua por URL real
  'image',
  true,
  1986
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Maradona - Campeão do Mundo 1986'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Maradona - Herói de Nápoles',
  'Maradona durante sua época de ouro no Napoli, onde transformou o clube em campeão italiano e se tornou um ídolo eterno da cidade.',
  'https://example.com/maradona-napoli.jpg', -- Substitua por URL real
  'image',
  true,
  1987
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Maradona - Herói de Nápoles'
);

-- ============================================
-- RONALDO FENÔMENO - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Ronaldo - Campeão da Copa do Mundo 2002',
  'Ronaldo Fenômeno erguendo a taça da Copa do Mundo de 2002, marcando 8 gols e sendo fundamental para o pentacampeonato brasileiro.',
  'https://example.com/ronaldo-copa-2002.jpg', -- Substitua por URL real
  'image',
  true,
  2002
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%') LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Ronaldo - Campeão da Copa do Mundo 2002'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Ronaldo - Real Madrid - O Fenômeno',
  'Ronaldo durante sua passagem pelo Real Madrid, demonstrando toda sua classe e técnica mesmo após superar lesões graves que quase encerraram sua carreira.',
  'https://example.com/ronaldo-real-madrid.jpg', -- Substitua por URL real
  'image',
  true,
  2003
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%') LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Ronaldo - Real Madrid - O Fenômeno'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Ronaldo - Inter de Milão - Antes das Lesões',
  'Ronaldo em sua melhor forma física no Inter de Milão, antes das lesões que mudaram sua carreira mas não sua determinação.',
  'https://example.com/ronaldo-inter.jpg', -- Substitua por URL real
  'image',
  false,
  1998
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%') LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Ronaldo - Inter de Milão - Antes das Lesões'
);

-- ============================================
-- RONALDINHO - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Ronaldinho - Barcelona - A Magia',
  'Ronaldinho durante sua época mágica no Barcelona, onde conquistou a Champions League e se tornou um ídolo eterno dos torcedores catalães.',
  'https://example.com/ronaldinho-barcelona.jpg', -- Substitua por URL real
  'image',
  true,
  2006
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Ronaldinho - Barcelona - A Magia'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Ronaldinho - Copa do Mundo 2002',
  'Ronaldinho durante a Copa do Mundo de 2002, onde foi fundamental para o Brasil conquistar o pentacampeonato mundial.',
  'https://example.com/ronaldinho-copa-2002.jpg', -- Substitua por URL real
  'image',
  true,
  2002
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Ronaldinho - Copa do Mundo 2002'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Ronaldinho - O Sorriso do Futebol',
  'Ronaldinho sempre jogou com um sorriso no rosto, lembrando que o futebol é diversão e alegria, mesmo nos momentos mais competitivos.',
  'https://example.com/ronaldinho-sorriso.jpg', -- Substitua por URL real
  'image',
  false,
  2005
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Ronaldinho - O Sorriso do Futebol'
);

-- ============================================
-- ZINEDINE ZIDANE - Mídias Icônicas
-- ============================================
INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Zidane - Gol Histórico na Final da Champions 2002',
  'O momento em que Zidane marcou um dos gols mais espetaculares da história das finais europeias: um voleio perfeito que deu o título ao Real Madrid.',
  'https://example.com/zidane-champions-2002.jpg', -- Substitua por URL real
  'image',
  true,
  2002
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Zidane - Gol Histórico na Final da Champions 2002'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Zidane - Campeão do Mundo 1998',
  'Zidane erguendo a taça da Copa do Mundo de 1998, conquistando o primeiro título mundial da França jogando em casa.',
  'https://example.com/zidane-copa-1998.jpg', -- Substitua por URL real
  'image',
  true,
  1998
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Zidane - Campeão do Mundo 1998'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Zidane - A Elegância em Campo',
  'Zidane sempre jogou com uma elegância e classe raras, demonstrando que técnica e respeito podem coexistir no futebol de alto nível.',
  'https://example.com/zidane-elegance.jpg', -- Substitua por URL real
  'image',
  false,
  2001
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Zidane - A Elegância em Campo'
);

-- ============================================
-- MÍDIAS GENÉRICAS PARA OUTRAS LENDAS
-- ============================================
-- Adiciona mídias genéricas para todas as outras lendas que não foram cobertas acima

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Momento Épico da Carreira',
  'Um dos momentos mais marcantes da carreira desta lenda do futebol, capturando a essência de sua grandeza e impacto no esporte.',
  'https://example.com/legend-moment.jpg', -- Substitua por URL real
  'image',
  true,
  NULL
FROM legends 
WHERE is_active = true 
  AND id NOT IN (
    SELECT DISTINCT legend_id FROM media WHERE legend_id IS NOT NULL
  )
LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Momento Épico da Carreira'
);

INSERT INTO media (legend_id, title, description, url, type, is_featured, year)
SELECT 
  id,
  'Imagem Histórica',
  'Uma imagem histórica que marca um momento importante na trajetória desta lenda do futebol, preservando a memória de sua contribuição ao esporte.',
  'https://example.com/legend-historic.jpg', -- Substitua por URL real
  'image',
  false,
  NULL
FROM legends 
WHERE is_active = true 
  AND id NOT IN (
    SELECT DISTINCT legend_id FROM media WHERE title = 'Imagem Histórica'
  )
LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM media m 
  WHERE m.legend_id = legends.id 
    AND m.title = 'Imagem Histórica'
);

-- ============================================
-- NOTA FINAL
-- ============================================
-- Este script adiciona mídias icônicas para todas as lendas
-- As URLs são placeholders - substitua pelas URLs reais das imagens
-- Você pode fazer upload das imagens no Supabase Storage e usar as URLs públicas
-- Execute este script no Supabase SQL Editor
-- ============================================

