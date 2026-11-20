# PLANIT AI

PLANIT AI est un projet YouCode réalisé en HTML, Tailwind CSS et JavaScript natif. La version actuelle permet de charger un plan de développement en mode démo et de suivre ses tâches dans un tableau Kanban.

## Lancer le projet

1. Clonez le dépôt et ouvrez le dossier dans VS Code.
2. Avec l’extension Live Server, faites un clic droit sur `index.html`, puis choisissez **Open with Live Server**.
3. Dans le Dashboard, cliquez sur **Paramètres IA**, puis sur **Mode démo**.

Le mode démo utilise `fetch` pour lire le fichier JSON local. Ouvrez le site via Live Server pour que le navigateur puisse charger ce fichier.

## Tester la démo

- Le tableau affiche les tâches dans les colonnes **To Do**, **In Progress** et **Done**.
- Cliquez sur une tâche pour modifier son titre, sa description ou son statut. Pour la passer à **Done**, terminez d’abord ses tâches préalables.
- La suppression d’une tâche demande une confirmation et retire son identifiant des dépendances des autres tâches.
- Le Dashboard affiche l’avancement du projet démo et permet de le rouvrir ou de le supprimer.

Le projet démo et ses modifications sont enregistrés dans le `localStorage` du navigateur. La génération par IA et l’enregistrement de la clé API restent à implémenter.

## Fichiers principaux

| Fichier | Rôle |
| --- | --- |
| `index.html` | Dashboard et progression du projet démo |
| `new-project.html` | Formulaire de création de projet |
| `project.html` | Tableau Kanban et modale de tâche |
| `js/ui.js` | Affichage, interactions et sauvegarde de la démo |
| `data/sample-plan.json` | Données du plan de démonstration |
