# CLER — Checklist antes do Web Summit

## 1. Imagens — ação obrigatória antes da publicação

As 10 imagens que antes vinham de servidores do Framer/Unsplash foram referenciadas como URLs **locais** em `src/`. **Não foi possível baixar os arquivos originais no ambiente de edição (sem acesso aos servidores de origem).** A lista das URLs originais está em `scripts/sync-remote-assets.mjs`.

Em uma máquina com conexão estável à internet:

```bash
npm install
npm run assets:sync
npm run assets:check
npm run build
```

O comando `assets:sync` baixa os originais uma única vez para `public/assets` e gera arquivos WebP responsivos (480/960/largura maior). **Faça commit dos arquivos WebP gerados**. A partir disso, o navegador não faz nenhuma requisição ao Framer/Unsplash; o build não precisa mais buscar as imagens. O `prebuild` impede a publicação se faltarem imagens. Se o download falhar por remoção do conteúdo de origem, solicite ao cliente os arquivos originais e substitua os correspondentes em `public/assets`.

As fotos da trajetória já estão locais em WebP. Os dados do app não foram modificados. As imagens locais convertidas economizam tráfego e são carregadas conforme necessário. Não reintroduza imagens `data:image/...;base64` em TSX ou CSS.

**Relatório:** `public/assets/relatorio-cler.png` continua sendo o original de 210×287. Ele é exibido em até 210px, sem upscale. Para provar a qualidade do produto em telas de alta densidade, solicite exportação real em 2x/3x (ideal ≥ 630×861 px) e substitua o arquivo. Um upscale artificial não melhora a nitidez dos detalhes.

## 2. Fontes

A aplicação utiliza `next/font/google` para Inter/Poppins. **O Next baixa as fontes no build** e distribui os arquivos localmente pelo domínio do site. Durante a visita, não há consultas a `fonts.googleapis.com` nem `fonts.gstatic.com`. Requer internet apenas na primeira compilação ou cache de build.

## 3. Analytics / GDPR

Crie uma propriedade GA4 e configure `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` no ambiente do deploy. Sem a variável, não há analytics e o banner de consentimento analítico não é exibido.

Quando configurado:
- Analytics só é carregado **após aceitação explícita** de métricas; recusa não ativa o script.
- Há um botão de alteração da escolha no rodapé. O consentimento é recordado por até 180 dias.
- Os eventos enviados são `page_view`, `pwa_click` e `contact_draft_opened` (o último **não** significa e-mail enviado).
- Apenas parâmetros UTM pré-definidos são enviados, sem nome, e-mail, mensagem, dados de saúde ou URL arbitrária.
- Ao retirar consentimento, a página é recarregada sem analytics e os cookies `_ga` do site são eliminados quando possível.
- A escolha de tema/idioma é uma preferência funcional separada do consentimento analítico.

Link sugerido para QR do estande:

`https://cler.app/?utm_source=websummit&utm_medium=qr&utm_campaign=lisboa_2026&utm_content=estande`

Links diferentes para materiais e equipe devem mudar **apenas** `utm_content`, como `cartao`, `banner`, `folheto`. Compare campanhas no relatório GA4 após as visitas aceitas.

O formulário exige uma manifestação de ciência sobre a privacidade antes de criar o rascunho do e-mail; **não envia automaticamente**. O aviso pode ser aberto no mesmo modal da Política de Privacidade. Não armazene dados sensíveis no formulário da landing.

**Revisão jurídica pendente:** a Política de Privacidade original é centrada na LGPD e data de 2025. Antes de promover o serviço na UE, o responsável pelo tratamento deve validar (com jurídico/DPO caso exista) bases legais sob GDPR, armazenamento/retenção, transferências internacionais, direitos e canais para titulares, serviços/operadores e eventuais deveres de representante na UE. A existência do formulário com checkbox não equivale por si só à conformidade com GDPR. O contato genérico divulgado (`contatocler.app@gmail.com`) foi usado no lugar do marcador `[inserir e-mail de contato/DPO]`, **sem declarar que esse endereço pertence a um DPO**.

## 4. Verificações finais

- Testar navegação no iOS/Android em rede celular limitada, Chrome e Safari.
- Testar com cache limpo / imagem desativada; validar imagens e conteúdo acessível.
- Testar rejeição e aceitação da coleta no painel Network; sem requisição ao Google Analytics antes de aceitar.
- Testar UTMs via link do QR no dispositivo real. A ausência de eventos antes do consentimento é intencional.
- Medir Lighthouse mobile: LCP, CLS, INP e bytes transferidos; usar cache CDN e HTTP/2/3 no Vercel.
- Substituir o print do relatório por exportação de alta definição do produto.
