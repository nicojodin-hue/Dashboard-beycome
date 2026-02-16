# Instructions de déploiement sur GitHub Pages

## Étape 1 : Activer GitHub Pages

1. Allez sur : https://github.com/nicojodin-hue/Dashboard-beycome/settings/pages
2. Dans **"Build and deployment"** :
   - Source : Sélectionnez **"GitHub Actions"**
3. Cliquez sur **"Save"**

## Étape 2 : Créer le workflow GitHub Actions

1. Allez sur : https://github.com/nicojodin-hue/Dashboard-beycome/new/main
2. Dans le champ "Name your file...", tapez : `.github/workflows/deploy.yml`
3. Collez ce contenu :

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

4. Cliquez sur **"Commit changes..."**
5. Cliquez sur **"Commit changes"** dans la popup

## Étape 3 : Vérifier le déploiement

1. Allez sur : https://github.com/nicojodin-hue/Dashboard-beycome/actions
2. Attendez que le workflow se termine (environ 1-2 minutes)
3. Une fois terminé avec ✅, votre site sera disponible sur :
   **https://nicojodin-hue.github.io/Dashboard-beycome/**

## Alternative : Déploiement local puis push

Si vous préférez construire localement :

```bash
cd /Users/nicoj/Desktop/beycome-mockup
npm run build
git add dist -f
git commit -m "Add built files"
git push origin main
```

Puis configurez Pages pour utiliser la branche `main` et le dossier `/dist`.
