# Buscar Informações Históricas das Lendas

Este documento contém instruções para buscar e adicionar informações históricas completas sobre as lendas do futebol.

## Fontes Recomendadas

### 1. Wikipedia
- Buscar por: `[Nome da Lenda]` + `career` + `trophies`
- Exemplo: "Pelé career trophies achievements"
- Copiar informações sobre:
  - Troféus conquistados
  - Marcos da carreira
  - Estatísticas importantes
  - Transferências importantes

### 2. YouTube
- Buscar por: `[Nome da Lenda]` + `highlights`
- Buscar por: `[Nome da Lenda]` + `documentary`
- Buscar por: `[Nome da Lenda]` + `best goals`
- Copiar IDs dos vídeos (ex: `dQw4w9WgXcQ`)

### 3. Transfermarkt
- URL: `https://www.transfermarkt.com/[nome-lenda]/profil/spieler/[id]`
- Informações sobre:
  - Transferências
  - Estatísticas por clube
  - Troféus por clube
  - Valores de transferência

### 4. FIFA.com / UEFA.com
- Informações sobre:
  - Copas do Mundo
  - Champions League
  - Outros torneios internacionais

## Estrutura de Dados

### Troféus (Tabela: `trophies`)
```json
{
  "name": "Copa do Mundo FIFA",
  "competition": "Copa do Mundo",
  "year": 1970,
  "season": "1970",
  "description": "Campeão da Copa do Mundo no México",
  "category": "national",
  "is_major": true
}
```

### Vídeos YouTube (Tabela: `youtube_videos`)
```json
{
  "title": "Pelé - Melhores Momentos",
  "youtube_id": "dQw4w9WgXcQ",
  "category": "highlights",
  "is_featured": true
}
```

### Marcos da Carreira (Tabela: `career_milestones`)
```json
{
  "title": "Début Profissional",
  "description": "Primeiro jogo profissional pelo Santos FC",
  "date": "1956-09-07",
  "milestone_type": "debut",
  "importance": "high",
  "club_name": "Santos FC"
}
```

## Exemplos de Dados para Lendas Famosas

### Pelé
**Troféus:**
- Copa do Mundo FIFA (1958, 1962, 1970)
- Copa Libertadores (1962, 1963)
- Campeonato Brasileiro (1961, 1962, 1963, 1964, 1965, 1968)
- Taça Brasil (1961, 1962, 1963, 1964, 1965)
- Bola de Ouro (1970)

**Vídeos YouTube:**
- Highlights: Buscar "Pelé best goals highlights"
- Documentários: Buscar "Pelé documentary"
- Gols Marcantes: Buscar "Pelé 1000th goal"

**Marcos:**
- 1956: Début profissional pelo Santos
- 1958: Primeira Copa do Mundo (17 anos)
- 1969: Gol número 1000
- 1977: Aposentadoria

### Cristiano Ronaldo
**Troféus:**
- Champions League (2008, 2014, 2016, 2017, 2018)
- Eurocopa (2016)
- Liga dos Campeões da UEFA (múltiplas)
- Ballon d'Or (2008, 2013, 2014, 2016, 2017)

**Vídeos YouTube:**
- Buscar "Cristiano Ronaldo best goals"
- Buscar "Cristiano Ronaldo skills"
- Buscar "Cristiano Ronaldo documentary"

### Lionel Messi
**Troféus:**
- Copa do Mundo FIFA (2022)
- Champions League (2006, 2009, 2011, 2015)
- Ballon d'Or (2009, 2010, 2011, 2012, 2015, 2019, 2021)
- La Liga (múltiplas)

**Vídeos YouTube:**
- Buscar "Messi best goals"
- Buscar "Messi skills compilation"
- Buscar "Messi World Cup 2022"

## Script SQL para Inserir Dados

```sql
-- Exemplo: Inserir troféu
INSERT INTO trophies (legend_id, name, competition, year, category, is_major, description)
VALUES (
  (SELECT id FROM legends WHERE name = 'Pelé' LIMIT 1),
  'Copa do Mundo FIFA',
  'Copa do Mundo',
  1970,
  'national',
  true,
  'Campeão da Copa do Mundo no México'
);

-- Exemplo: Inserir vídeo YouTube
INSERT INTO youtube_videos (legend_id, title, youtube_id, category, is_featured)
VALUES (
  (SELECT id FROM legends WHERE name = 'Pelé' LIMIT 1),
  'Pelé - Melhores Momentos',
  'dQw4w9WgXcQ',
  'highlights',
  true
);

-- Exemplo: Inserir marco da carreira
INSERT INTO career_milestones (legend_id, title, description, date, milestone_type, importance, club_name)
VALUES (
  (SELECT id FROM legends WHERE name = 'Pelé' LIMIT 1),
  'Début Profissional',
  'Primeiro jogo profissional pelo Santos FC',
  '1956-09-07',
  'debut',
  'high',
  'Santos FC'
);
```

## Processo Recomendado

1. **Identificar a Lenda**: Buscar no banco de dados pelo nome
2. **Coletar Informações**: Usar as fontes acima para coletar dados
3. **Estruturar Dados**: Organizar em formato JSON conforme exemplos
4. **Inserir no Banco**: Usar SQL ou interface admin para inserir
5. **Adicionar Imagens**: Fazer upload de imagens dos troféus para o Storage
6. **Adicionar Vídeos**: Copiar IDs do YouTube e inserir na tabela

## Ferramentas Úteis

- **Google Images**: Para encontrar imagens de troféus
- **YouTube Data API**: Para obter informações automáticas dos vídeos
- **Wikipedia API**: Para buscar informações estruturadas
- **Supabase Admin**: Para inserir dados via interface

## Notas Importantes

- Sempre verificar a precisão das informações
- Usar fontes confiáveis (Wikipedia, sites oficiais)
- Adicionar descrições detalhadas
- Marcar troféus principais com `is_major = true`
- Adicionar vídeos destacados com `is_featured = true`
- Organizar marcos cronologicamente

