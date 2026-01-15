-- ============================================
-- ADICIONAR HISTÓRIAS INSPIRADORAS PARA TODAS AS LENDAS
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Este script adiciona histórias inspiradoras para todas as lendas ativas no banco
-- As histórias são criadas automaticamente usando SELECT para encontrar as lendas

-- ============================================
-- PELÉ - Histórias Inspiradoras
-- ============================================
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

-- ============================================
-- CRISTIANO RONALDO - Histórias Inspiradoras
-- ============================================
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'De Madeira para o Mundo',
  'Cristiano Ronaldo nasceu na pequena ilha da Madeira, Portugal, em uma família humilde. Sua jornada do Funchal para se tornar um dos maiores jogadores da história é uma história de determinação incansável. Aos 12 anos, deixou sua família para se juntar ao Sporting CP em Lisboa, enfrentando saudades e dificuldades que moldaram seu caráter e sua mentalidade vencedora.',
  true,
  ARRAY['madeira', 'superação', 'determinação', 'origens'],
  'Equipe Futebol Legends'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Disciplina que Constrói Lendas',
  'Cristiano Ronaldo é conhecido por sua disciplina extrema e dedicação ao treinamento. Ele transformou seu corpo através de anos de trabalho árduo, dieta rigorosa e treinamento constante. Sua mentalidade de nunca desistir e sempre buscar melhorar inspirou milhões de atletas ao redor do mundo. Ronaldo prova que o talento natural precisa ser combinado com trabalho duro para alcançar a grandeza.',
  true,
  ARRAY['disciplina', 'treinamento', 'mentalidade', 'dedicação'],
  'Equipe Futebol Legends'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'Campeão da Eurocopa 2016',
  'Mesmo sendo substituído por lesão na final da Eurocopa de 2016, Cristiano Ronaldo não desistiu. Das arquibancadas, ele liderou e motivou seus companheiros, que conquistaram o primeiro título europeu de Portugal. Este momento mostra que um verdadeiro líder inspira mesmo quando não está em campo, e que o sucesso de uma equipe é mais importante que o individual.',
  true,
  ARRAY['eurocopa', 'liderança', 'portugal', '2016'],
  'Equipe Futebol Legends'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Maior Artilheiro da História',
  'Cristiano Ronaldo se tornou o maior artilheiro da história do futebol, superando recordes que pareciam intocáveis. Sua capacidade de se adaptar e evoluir ao longo dos anos, jogando em diferentes ligas e competições, mostra sua versatilidade e determinação. Cada gol marca não apenas um número, mas anos de dedicação e paixão pelo esporte.',
  true,
  ARRAY['artilheiro', 'recordes', 'história', 'evolução'],
  'Equipe Futebol Legends'
FROM legends WHERE (name ILIKE '%Cristiano%' AND name ILIKE '%Ronaldo%') OR name ILIKE '%CR7%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- LIONEL MESSI - Histórias Inspiradoras
-- ============================================
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Menino que Superou o Crescimento Hormonal',
  'Aos 11 anos, Messi foi diagnosticado com deficiência de hormônio do crescimento. O tratamento custava mais de mil dólares por mês, e sua família não tinha condições financeiras. O Barcelona ofereceu pagar o tratamento e contratá-lo, mudando completamente sua vida. Esta história mostra como o apoio e a oportunidade certa podem transformar o destino de alguém.',
  true,
  ARRAY['superação', 'barcelona', 'crescimento', 'oportunidade'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Conquista da Copa do Mundo',
  'Após anos de críticas por não ter conquistado um título com a Argentina, Messi finalmente levantou a Copa do Mundo em 2022. Aos 35 anos, ele liderou sua seleção com determinação e classe, provando que nunca é tarde demais para alcançar seus sonhos. Esta conquista coroou uma carreira extraordinária e silenciou todos os críticos.',
  true,
  ARRAY['copa do mundo', 'argentina', '2022', 'conquista'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  '21 Anos no Barcelona',
  'Messi passou 21 anos no Barcelona, desde os 13 anos até os 34. Durante esse tempo, ele se tornou o maior artilheiro da história do clube e conquistou inúmeros títulos. Sua lealdade e dedicação ao clube catalão são exemplos raros no futebol moderno. Messi mostrou que é possível crescer, evoluir e fazer história em um único lugar.',
  true,
  ARRAY['barcelona', 'lealdade', 'história', 'evolução'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Maior de Todos os Tempos',
  'Com 8 Ballons d''Or, Messi detém o recorde absoluto do prêmio. Sua consistência ao longo dos anos, jogando em um nível extraordinário, é algo que poucos atletas conseguiram alcançar. Messi não apenas quebrou recordes, mas redefiniu o que é possível no futebol, inspirando uma nova geração de jogadores.',
  true,
  ARRAY['ballon d''or', 'recordes', 'consistência', 'grandeza'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Messi%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- MARADONA - Histórias Inspiradoras
-- ============================================
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Gol do Século',
  'Na Copa do Mundo de 1986, Maradona marcou o que muitos consideram o "Gol do Século". Em apenas 10 segundos, ele driblou meio time inglês e marcou um gol que entrou para a história. Este gol não foi apenas uma obra de arte técnica, mas um símbolo de determinação e genialidade que inspirou milhões de jogadores ao redor do mundo.',
  true,
  ARRAY['gol do século', 'copa do mundo', '1986', 'genialidade'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Herói de Nápoles',
  'Quando Maradona chegou ao Napoli em 1984, o clube nunca havia conquistado um título da Serie A. Em poucos anos, ele transformou o clube em campeão italiano, conquistando dois títulos e uma Copa da UEFA. Maradona se tornou um herói para os napolitanos, mostrando que um jogador pode transformar não apenas um clube, mas toda uma cidade.',
  true,
  ARRAY['napoli', 'herói', 'transformação', 'serie a'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Mão de Deus',
  'O gol conhecido como "Mão de Deus" na Copa de 1986 se tornou um dos momentos mais icônicos da história do futebol. Embora controverso, este momento mostra a astúcia e a determinação de Maradona em fazer de tudo para ajudar sua seleção. A história nos ensina que às vezes precisamos ser criativos e corajosos para alcançar nossos objetivos.',
  true,
  ARRAY['mão de deus', 'copa do mundo', '1986', 'icônico'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Maradona%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- RONALDO FENÔMENO - Histórias Inspiradoras
-- ============================================
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Superação das Lesões',
  'Ronaldo Fenômeno enfrentou lesões graves que quase encerraram sua carreira. Em 1999, sofreu uma lesão devastadora no joelho direito. Muitos acreditavam que ele nunca mais jogaria no mesmo nível. Mas Ronaldo voltou mais forte, conquistando a Copa do Mundo de 2002 e provando que a determinação e a força mental podem superar qualquer obstáculo físico.',
  true,
  ARRAY['superação', 'lesões', 'determinação', 'volta'],
  'Equipe Futebol Legends'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%') LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Fenômeno da Copa de 2002',
  'Na Copa do Mundo de 2002, Ronaldo marcou 8 gols e foi fundamental para o Brasil conquistar o pentacampeonato mundial. Após anos de dúvidas sobre sua condição física, ele provou que ainda era o melhor do mundo. Sua performance naquela copa é lembrada como uma das maiores demonstrações de determinação e talento na história do futebol.',
  true,
  ARRAY['copa do mundo', '2002', 'artilheiro', 'pentacampeonato'],
  'Equipe Futebol Legends'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%') LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Jovem Prodigio',
  'Ronaldo começou sua carreira profissional aos 16 anos no Cruzeiro, onde rapidamente se destacou. Aos 17, já estava na seleção brasileira campeã mundial. Sua velocidade, técnica e capacidade de finalização o tornaram um dos jogadores mais temidos do mundo ainda muito jovem. Ronaldo mostrou que a idade não é barreira quando você tem talento e determinação.',
  true,
  ARRAY['jovem', 'prodigio', 'cruzeiro', 'talento'],
  'Equipe Futebol Legends'
FROM legends WHERE (name ILIKE '%Ronaldo%' AND name ILIKE '%Fenômeno%') OR (name ILIKE '%Ronaldo%' AND nationality ILIKE '%Brasil%') LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- RONALDINHO - Histórias Inspiradoras
-- ============================================
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Alegria do Futebol',
  'Ronaldinho Gaúcho sempre jogou com um sorriso no rosto, lembrando a todos que o futebol é, acima de tudo, diversão. Sua capacidade de fazer o impossível parecer fácil e sua alegria contagiante inspiraram milhões de fãs ao redor do mundo. Ronaldinho mostrou que você pode ser competitivo e sério, mas nunca perder a alegria de jogar.',
  true,
  ARRAY['alegria', 'diversão', 'inspiração', 'futebol'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Mágico do Barcelona',
  'No Barcelona, Ronaldinho transformou o clube em campeão europeu e mundial. Sua magia dentro de campo e sua capacidade de criar jogadas espetaculares fizeram dele um ídolo eterno dos torcedores catalães. Ronaldinho provou que a criatividade e a técnica podem ser tão importantes quanto a tática e a disciplina.',
  true,
  ARRAY['barcelona', 'magia', 'criatividade', 'campeão'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'Campeão do Mundo aos 22 Anos',
  'Aos 22 anos, Ronaldinho já era campeão mundial com o Brasil na Copa de 2002. Sua juventude e talento bruto o tornaram uma peça fundamental na conquista do pentacampeonato. Ronaldinho mostrou que a idade não importa quando você tem talento, confiança e a oportunidade de brilhar no maior palco do mundo.',
  true,
  ARRAY['copa do mundo', '2002', 'jovem', 'campeão'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Ronaldinho%' OR name ILIKE '%Ronaldinho Gaúcho%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- ZINEDINE ZIDANE - Histórias Inspiradoras
-- ============================================
INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Gol Histórico na Final da Champions',
  'Na final da Champions League de 2002, Zidane marcou um dos gols mais espetaculares da história das finais europeias. Um voleio perfeito com a perna esquerda que entrou no canto do gol. Este gol não apenas deu o título ao Real Madrid, mas se tornou um símbolo da classe e técnica de Zidane. Um momento que será lembrado para sempre.',
  true,
  ARRAY['champions league', '2002', 'gol histórico', 'real madrid'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'Campeão do Mundo em Casa',
  'Em 1998, Zidane liderou a França para conquistar sua primeira Copa do Mundo, jogando em casa. Ele marcou dois gols na final contra o Brasil, tornando-se o herói nacional. Este momento uniu toda a França e mostrou como o esporte pode ser uma força unificadora, transcendendo diferenças culturais e sociais.',
  true,
  ARRAY['copa do mundo', '1998', 'frança', 'herói'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Elegância e Classe',
  'Zidane sempre jogou com uma elegância e classe raras no futebol moderno. Sua técnica refinada, visão de jogo e controle de bola eram uma obra de arte. Ele mostrou que é possível ser competitivo e agressivo, mas sempre mantendo a classe e o respeito pelo esporte e pelos adversários.',
  true,
  ARRAY['elegância', 'classe', 'técnica', 'respeito'],
  'Equipe Futebol Legends'
FROM legends WHERE name ILIKE '%Zidane%' OR name ILIKE '%Zizou%' LIMIT 1
ON CONFLICT DO NOTHING;

-- ============================================
-- HISTÓRIAS GENÉRICAS PARA OUTRAS LENDAS
-- ============================================
-- Estas histórias serão adicionadas para todas as lendas que não foram cobertas acima

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'A Jornada de uma Lenda',
  'Cada grande jogador tem uma história única de superação, dedicação e paixão pelo futebol. Esta lenda dedicou sua vida ao esporte, superando obstáculos e alcançando conquistas extraordinárias. Sua trajetória inspira milhões de pessoas ao redor do mundo a perseguirem seus sonhos com determinação e trabalho duro.',
  true,
  ARRAY['inspiração', 'jornada', 'superação', 'dedicação'],
  'Equipe Futebol Legends'
FROM legends 
WHERE is_active = true 
  AND id NOT IN (
    SELECT DISTINCT legend_id FROM stories WHERE legend_id IS NOT NULL
  )
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'O Legado que Inspira Gerações',
  'O legado desta lenda vai além dos títulos e recordes. Sua paixão pelo jogo, sua dedicação ao treinamento e sua capacidade de inspirar outros jogadores são qualidades que serão lembradas para sempre. Esta lenda mostrou que o verdadeiro sucesso não está apenas em vencer, mas em como você joga o jogo e inspira outros.',
  false,
  ARRAY['legado', 'inspiração', 'gerações', 'paixão'],
  'Equipe Futebol Legends'
FROM legends 
WHERE is_active = true 
  AND id NOT IN (
    SELECT DISTINCT legend_id FROM stories WHERE title = 'O Legado que Inspira Gerações'
  )
ON CONFLICT DO NOTHING;

INSERT INTO stories (legend_id, title, content, is_featured, tags, author_name)
SELECT 
  id,
  'Momentos Épicos que Ficaram na História',
  'Ao longo de sua carreira, esta lenda criou momentos épicos que ficaram gravados na memória dos fãs de futebol. Gols espetaculares, jogadas geniais e atuações memoráveis que mostram por que este jogador é considerado uma lenda do esporte. Cada momento é uma lição de técnica, determinação e paixão pelo jogo.',
  false,
  ARRAY['momentos épicos', 'história', 'memórias', 'grandeza'],
  'Equipe Futebol Legends'
FROM legends 
WHERE is_active = true 
  AND id NOT IN (
    SELECT DISTINCT legend_id FROM stories WHERE title = 'Momentos Épicos que Ficaram na História'
  )
ON CONFLICT DO NOTHING;

-- ============================================
-- NOTA FINAL
-- ============================================
-- Este script adiciona histórias inspiradoras para todas as lendas
-- As histórias específicas são para lendas conhecidas (Pelé, CR7, Messi, etc.)
-- Histórias genéricas são adicionadas para todas as outras lendas ativas
-- Execute este script no Supabase SQL Editor
-- ============================================

