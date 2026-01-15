-- Parte 1: Histórias do Pelé
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Menino que Conquistou o Mundo',
  'Aos 17 anos, Pelé se tornou o jogador mais jovem a conquistar uma Copa do Mundo. Nascido em Três Corações, Minas Gerais, ele superou a pobreza e se tornou o maior jogador de todos os tempos. Sua história inspira milhões de crianças ao redor do mundo a acreditarem que os sonhos podem se tornar realidade. Pelé mostrou que com determinação, talento e trabalho duro, qualquer barreira pode ser superada.',
  true,
  ARRAY['inspiração', 'superação', 'história', 'copa do mundo'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Gol Número 1000',
  'Em 19 de novembro de 1969, Pelé marcou seu milésimo gol no Maracanã. O estádio estava lotado e o mundo parou para assistir esse momento histórico. O gol foi marcado de pênalti contra o Vasco da Gama, e Pelé se tornou o primeiro jogador a alcançar essa marca impressionante. Este momento simboliza não apenas um recorde, mas a dedicação de uma vida inteira ao futebol.',
  true,
  ARRAY['histórico', 'recordes', 'gols', 'maracanã'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Tricampeonato Mundial',
  'Em 1970, Pelé conquistou seu terceiro título mundial no México, tornando-se o único jogador da história a conquistar três Copas do Mundo. A seleção brasileira de 1970 é considerada por muitos como a melhor de todos os tempos, e Pelé foi o coração dessa equipe lendária. Sua liderança dentro e fora de campo inspirou toda uma geração de jogadores.',
  true,
  ARRAY['copa do mundo', 'tricampeonato', 'méxico 1970', 'liderança'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Popularização do Futebol nos EUA',
  'Quando Pelé assinou com o New York Cosmos em 1975, ele não apenas mudou de clube, mas ajudou a popularizar o futebol nos Estados Unidos. Sua presença transformou o esporte em um fenômeno cultural, atraindo multidões e inspirando uma nova geração de jogadores americanos. Pelé mostrou que o futebol pode unir culturas e transcender fronteiras.',
  true,
  ARRAY['new york cosmos', 'popularização', 'estados unidos', 'cultura'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
ON CONFLICT DO NOTHING;

