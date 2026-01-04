-- ============================================
-- ADICIONAR TROFÉUS (VERSÃO LIMPA - SEM DUPLICATAS)
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- IMPORTANTE: Este script usa INSERT ... ON CONFLICT DO NOTHING
-- Mas como não há constraint UNIQUE, vamos usar uma abordagem diferente
-- Primeiro remova duplicatas com REMOVER_TROFEUS_DUPLICADOS.sql

-- ============================================
-- PELÉ - Troféus Completos
-- ============================================

-- Copas do Mundo
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1958, 'national', true, 'Campeão da Copa do Mundo na Suécia - Primeira conquista mundial do Brasil aos 17 anos'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Copa do Mundo FIFA' 
    AND t.competition = 'Copa do Mundo' 
    AND t.year = 1958
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1962, 'national', true, 'Campeão da Copa do Mundo no Chile - Bicampeonato mundial'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Copa do Mundo FIFA' 
    AND t.competition = 'Copa do Mundo' 
    AND t.year = 1962
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa do Mundo FIFA', 'Copa do Mundo', 1970, 'national', true, 'Campeão da Copa do Mundo no México - Tricampeonato mundial histórico'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Copa do Mundo FIFA' 
    AND t.competition = 'Copa do Mundo' 
    AND t.year = 1970
);

-- Copa Libertadores
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Libertadores da América', 'Copa Libertadores', 1962, 'club', true, 'Campeão da Copa Libertadores pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Copa Libertadores da América' 
    AND t.competition = 'Copa Libertadores' 
    AND t.year = 1962
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Libertadores da América', 'Copa Libertadores', 1963, 'club', true, 'Bicampeão da Copa Libertadores pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Copa Libertadores da América' 
    AND t.competition = 'Copa Libertadores' 
    AND t.year = 1963
);

-- Copa Intercontinental
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Intercontinental', 'Copa Intercontinental', 1962, 'club', true, 'Campeão da Copa Intercontinental pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Copa Intercontinental' 
    AND t.competition = 'Copa Intercontinental' 
    AND t.year = 1962
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Copa Intercontinental', 'Copa Intercontinental', 1963, 'club', true, 'Bicampeão da Copa Intercontinental pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Copa Intercontinental' 
    AND t.competition = 'Copa Intercontinental' 
    AND t.year = 1963
);

-- Campeonato Paulista (10 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1958, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1958
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1960, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1960
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1961, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1961
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1962, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1962
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1964, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1964
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1965, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1965
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1967, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1967
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1968, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1968
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1969, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1969
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Campeonato Paulista', 'Campeonato Paulista', 1973, 'club', false, 'Campeão Paulista pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Campeonato Paulista' 
    AND t.competition = 'Campeonato Paulista' 
    AND t.year = 1973
);

-- Taça Brasil (5 títulos)
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1961, 'club', true, 'Campeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Taça Brasil' 
    AND t.competition = 'Taça Brasil' 
    AND t.year = 1961
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1962, 'club', true, 'Bicampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Taça Brasil' 
    AND t.competition = 'Taça Brasil' 
    AND t.year = 1962
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1963, 'club', true, 'Tricampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Taça Brasil' 
    AND t.competition = 'Taça Brasil' 
    AND t.year = 1963
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1964, 'club', true, 'Tetracampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Taça Brasil' 
    AND t.competition = 'Taça Brasil' 
    AND t.year = 1964
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'Taça Brasil', 'Taça Brasil', 1965, 'club', true, 'Pentacampeão da Taça Brasil pelo Santos FC'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'Taça Brasil' 
    AND t.competition = 'Taça Brasil' 
    AND t.year = 1965
);

-- NASL Soccer Bowl
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'NASL Soccer Bowl', 'NASL', 1977, 'club', true, 'Campeão da NASL pelo New York Cosmos'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'NASL Soccer Bowl' 
    AND t.competition = 'NASL' 
    AND t.year = 1977
);

-- Prêmios Individuais
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'FIFA Player of the Century', 'FIFA', 2000, 'individual', true, 'Eleito Jogador do Século pela FIFA (compartilhado com Maradona)'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'FIFA Player of the Century' 
    AND t.competition = 'FIFA' 
    AND t.year = 2000
);

INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
SELECT id, 'IOC Athlete of the Century', 'IOC', 1999, 'individual', true, 'Atleta do Século pelo Comitê Olímpico Internacional'
FROM legends WHERE name ILIKE '%Pelé%' OR name ILIKE '%Pele%' LIMIT 1
WHERE NOT EXISTS (
  SELECT 1 FROM trophies t 
  WHERE t.legend_id = legends.id 
    AND t.name = 'IOC Athlete of the Century' 
    AND t.competition = 'IOC' 
    AND t.year = 1999
);

-- ============================================
-- NOTA: Este é apenas um exemplo para Pelé
-- Para adicionar troféus de outras lendas sem duplicatas,
-- use o mesmo padrão: WHERE NOT EXISTS (...)
-- ============================================

