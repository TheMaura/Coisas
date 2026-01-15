# 📸 Sistema de Upload de Imagens Implementado

## ✅ Funcionalidade Implementada

Agora você pode **adicionar imagens diretamente do dispositivo** no painel admin, sem precisar colar URLs!

## 🎯 Como Funciona

### No Painel Admin

1. **Criar/Editar Lenda**:
   - Ao invés de campo de texto para URL
   - Agora há um **botão "Selecionar Imagem"**
   - Toque no botão → Escolha foto da galeria
   - Upload automático para Supabase Storage
   - Preview da imagem selecionada
   - Botão para remover imagem

### Componentes Criados

- ✅ `ImagePickerButton` - Componente reutilizável para seleção de imagens
- ✅ `utils/imageUpload.ts` - Funções de upload para Supabase Storage

## 📋 Configuração Necessária

### 1. Criar Bucket no Supabase Storage

**IMPORTANTE**: Você precisa criar o bucket `media` no Supabase:

1. Acesse: https://supabase.com/dashboard
2. Vá para **Storage**
3. Clique em **New bucket**
4. Nome: `media`
5. Marque como **Public bucket**
6. Clique em **Create bucket**

Veja `CONFIGURAR_STORAGE.md` para instruções detalhadas.

### 2. Permissões do App

As permissões já foram adicionadas ao `app.json`:
- ✅ Acesso à galeria
- ✅ Acesso à câmera (opcional)

## 🚀 Funcionalidades

### Upload de Imagem Única
- Selecionar imagem da galeria
- Upload automático para Supabase Storage
- Preview antes de salvar
- Remover imagem selecionada

### Características
- ✅ Interface moderna e intuitiva
- ✅ Preview da imagem selecionada
- ✅ Indicador de upload
- ✅ Tratamento de erros
- ✅ Validação de permissões

## 📱 Uso

### Criar Nova Lenda
1. Vá para **Admin** → **Nova Lenda**
2. Toque em **"Selecionar Imagem"**
3. Escolha uma foto da galeria
4. Aguarde o upload (indicador de loading)
5. A imagem aparecerá como preview
6. Preencha os outros campos
7. Salve a lenda

### Editar Lenda Existente
1. Vá para **Admin** → Selecione uma lenda → **Editar**
2. Se já houver imagem, verá o preview
3. Toque na imagem para trocar
4. Ou toque no X para remover
5. Salve as alterações

## 🔧 Arquivos Modificados

- ✅ `app/admin/create.tsx` - Tela de criar com upload
- ✅ `app/admin/edit/[id].tsx` - Tela de editar com upload
- ✅ `components/ImagePickerButton.tsx` - Componente de seleção
- ✅ `utils/imageUpload.ts` - Funções de upload
- ✅ `app.json` - Permissões adicionadas

## ⚠️ Importante

**Antes de usar**, certifique-se de:
1. ✅ Criar o bucket `media` no Supabase Storage
2. ✅ Marcar o bucket como público
3. ✅ Testar as permissões no dispositivo

## 🎨 Design

O componente `ImagePickerButton` possui:
- Design moderno com gradiente
- Preview da imagem selecionada
- Botão de remover
- Indicador de upload
- Animações suaves

## 📝 Próximos Passos

Após configurar o Storage:
1. Teste o upload de imagens
2. Verifique se as imagens aparecem corretamente
3. Teste em diferentes dispositivos
4. Adicione mais lendas com imagens reais!

