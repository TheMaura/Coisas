// Utilitários para imagens de jogadores
// URLs de imagens públicas de jogadores famosos

export const getPlayerImageUrl = (playerName: string): string => {
  const imageMap: { [key: string]: string } = {
    'Pelé': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pel%C3%A9_1960.jpg/800px-Pel%C3%A9_1960.jpg',
    'Cristiano Ronaldo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Cristiano_Ronaldo_2018.jpg/800px-Cristiano_Ronaldo_2018.jpg',
    'Lionel Messi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/800px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg',
    'Neymar': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg/800px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg',
    'Ronaldinho': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ronaldinho_Ga%C3%BAcho.jpg/800px-Ronaldinho_Ga%C3%BAcho.jpg',
    'Ronaldo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2011.jpg/800px-Ronaldo_Lu%C3%ADs_Naz%C3%A1rio_de_Lima_2011.jpg',
    'Zinedine Zidane': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Zinedine_Zidane_by_Tasnim_01.jpg/800px-Zinedine_Zidane_by_Tasnim_01.jpg',
    'Diego Maradona': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Diego_Maradona.jpg/800px-Diego_Maradona.jpg',
    'Kylian Mbappé': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kylian_Mbapp%C3%A9_Training_2018.jpg/800px-Kylian_Mbapp%C3%A9_Training_2018.jpg',
  };

  // Buscar por nome parcial também
  const normalizedName = playerName.toLowerCase();
  for (const [key, url] of Object.entries(imageMap)) {
    if (normalizedName.includes(key.toLowerCase()) || key.toLowerCase().includes(normalizedName)) {
      return url;
    }
  }

  // Imagem padrão se não encontrar
  return 'https://via.placeholder.com/400x400/1E2338/FFFFFF?text=' + encodeURIComponent(playerName.charAt(0));
};

