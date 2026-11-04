# Rodada Lucro (app Android)

Controle financeiro para motorista de aplicativo: lançamentos da Uber, 99 e inDrive, despesas, custos fixos, metas, gráficos e jornada com cronômetro. O GPS conta os km mesmo com a tela bloqueada. Os dados ficam salvos no Firebase.

O APK é gerado pelo próprio GitHub, sem precisar de Android Studio.

## Como gerar o APK

1. Crie um repositório novo no GitHub, por exemplo `rodada-lucro`.
2. Envie **todos os arquivos desta pasta**, incluindo as pastas ocultas `.github` e `keys`:
   - Pelo site: **Add file › Upload files**, arraste o conteúdo da pasta e confirme com **Commit changes**.
   - Se a pasta `.github` não subir pelo site, crie o arquivo à mão em **Add file › Create new file**, com o nome `.github/workflows/gerar-apk.yml`, e cole o conteúdo.
3. Abra a aba **Actions**. A compilação **Gerar APK** começa sozinha e leva de 5 a 8 minutos.
4. Quando ficar verde, abra **Releases**, no lado direito da página do repositório, e baixe o **RodadaLucro.apk**.
5. No celular, abra o APK e permita **instalar de fontes desconhecidas**.

Para compilar de novo sem mudar nada, vá em **Actions › Gerar APK › Run workflow**.

## Como atualizar o app

Edite o arquivo `www/index.html`, que é o app inteiro, e faça o commit. Um APK novo sai em **Releases**. Ao instalar por cima, os dados continuam, porque a chave de assinatura em `keys/` é sempre a mesma.

Não apague a pasta `keys/`. Se ela mudar, o Android pede para desinstalar a versão antiga antes de instalar a nova.

## Permissões no primeiro uso

- **Localização**: escolha "Permitir durante o uso do app". Para o GPS seguir contando com a tela apagada, vá em **Configurações › Apps › Rodada Lucro › Permissões › Localização › Permitir o tempo todo**.
- **Notificações**: enquanto o GPS conta em segundo plano, aparece uma notificação fixa "Contando os km rodados". O Android exige essa notificação para usar o GPS em segundo plano.
- **Bateria**: em alguns celulares, como Xiaomi e Samsung, coloque o Rodada Lucro como **Sem restrições** de bateria. Assim o sistema não fecha o GPS no meio da jornada.

## Firebase

O app usa o projeto `chat-bot-5a11a`, com Realtime Database e login por e-mail e senha. O nó `motoristas` precisa estar nas regras do banco, como no arquivo `regras-firebase.json`. Se o login falhar no app, confira se `localhost` está em **Authentication › Settings › Authorized domains**. Ele já vem por padrão.

## O que tem em cada arquivo

| Arquivo | Para que serve |
|---|---|
| `www/index.html` | O app (HTML, CSS e JavaScript) |
| `capacitor.config.json` | Nome do app, ID `br.com.rodadalucro.app` e cores |
| `package.json` | Capacitor 8 e os plugins: GPS em segundo plano, arquivos, compartilhar e botão voltar |
| `scripts/patch-android.js` | Adiciona as permissões de GPS ao projeto Android |
| `assets/` | Ícone e tela de abertura |
| `keys/debug.keystore` | Chave fixa de assinatura do APK |
| `.github/workflows/gerar-apk.yml` | Receita que o GitHub usa para compilar |

Para gerar um APK de produção, por exemplo para a Play Store, é preciso criar uma chave de release própria e guardá-la nos Secrets do GitHub. Isso fica para quando você quiser publicar.
