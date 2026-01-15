-- ============================================
-- REMOVER TROFÉUS DUPLICADOS
-- Execute este SQL no Supabase SQL Editor
-- ============================================

-- Este script remove troféus duplicados mantendo apenas um registro único
-- Um troféu é considerado duplicado se tiver o mesmo legend_id, name, competition e year

-- ============================================
-- MÉTODO 1: Remover duplicatas mantendo o registro mais antigo
-- ============================================

DELETE FROM trophies
WHERE id IN (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (
             PARTITION BY legend_id, name, competition, year 
             ORDER BY created_at ASC
           ) as rn
    FROM trophies
  ) t
  WHERE t.rn > 1
);

-- ============================================
-- MÉTODO 2: Verificar quantos troféus duplicados existem (antes de remover)
-- ============================================
-- Execute este SELECT primeiro para ver quantos duplicados você tem:

-- SELECT 
--   legend_id,
--   name,
--   competition,
--   year,
--   COUNT(*) as quantidade
-- FROM trophies
-- GROUP BY legend_id, name, competition, year
-- HAVING COUNT(*) > 1
-- ORDER BY quantidade DESC;

-- ============================================
-- MÉTODO 3: Remover todos os troféus e recriar (CUIDADO!)
-- ============================================
-- Use apenas se quiser começar do zero:

-- DELETE FROM trophies;

-- Depois execute o script ADICIONAR_CONTEUDO_COMPLETO_EXPANDIDO.sql novamente

-- ============================================
-- MÉTODO 4: Remover duplicatas por lenda específica
-- ============================================
-- Se quiser remover apenas de uma lenda específica:

-- DELETE FROM trophies
-- WHERE id IN (
--   SELECT id
--   FROM (
--     SELECT id,
--            ROW_NUMBER() OVER (
--              PARTITION BY legend_id, name, competition, year 
--              ORDER BY created_at ASC
--            ) as rn
--     FROM trophies
--     WHERE legend_id = (SELECT id FROM legends WHERE name ILIKE '%Pelé%' LIMIT 1)
--   ) t
--   WHERE t.rn > 1
-- );

-- ============================================
-- VERIFICAÇÃO FINAL
-- ============================================
-- Execute este SELECT após remover duplicatas para verificar:

-- SELECT 
--   legend_id,
--   name,
--   competition,
--   year,
--   COUNT(*) as quantidade
-- FROM trophies
-- GROUP BY legend_id, name, competition, year
-- HAVING COUNT(*) > 1;

-- Se não retornar nenhuma linha, significa que não há mais duplicatas!

