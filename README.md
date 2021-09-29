# strapi
Projet Strapi blog

Etape de la configuration de strapi 

1. Mettre les dossiers sur Github
    1. Créer un dossier
2. Installer strapi avec le npx !!! Surtout parce que ça marche pas l’autre  en mettant le nom du dossier blog-admin
3. Créer un compte super administrator strapi
4. Intégrer le template du prof dans Typerite qui faut télécharger et intégrer dans le dossier strapi et renommer blog-client
5. Créer des contenus : content types builder
    1. Créer la structure d’un article (Ne pas oublier de sauvegarder)
    2. Créer une catégorie ! (Ne pas oublier de sauvegarder)
6. Définir les roles des utilisateurs et les permissions 
7. Télécharger postman 
    1. Créer une workspace
    2. Ajouter l’URL ex : pour récupérer tous les articles il faut mettre cette URL : http://localhost:1337/articles et cliquer dans « Send » et tous les autres requêtes que l’on souhaite faire
8. Installer live server ou le mettre directement si c’est déjà installer
9. Ouvrir le fichier blog-client, et ouvrer l’index.html copie coupe et intégrer le dans des base script à la fin <script id="articleCard" type="x-tmpl-mustache"> </script> et met la structure de l’article à l’intérieur de celle ci.
10. Ensuite ouvre le fichier index.js  et met y ce code, pour pouvoir récupérer les données de l’API
$(document).ready(function () {
  // X - Récuperer la liste des articles

  const api_url = "http://localhost:1337";
  // on créer une constante et on met url dedans
  axios
    .get(api_url + "/articles") // à partir de la bilothèque axios
    .then((response) => {
      // Tu lui fais une promesse de lui envoyer un truc
      const template = document.getElementById("articleCard").innerHTML; // tu créer une constante qui s'appelle template dans lequel tu prendre l'ID articleCard

      const articlesHtml = response.data.map((article) => {
        // tu créer une constante qui s'appelle articleHTML dans lequel tu mets un tableau l'ID articleCard
        return Mustache.render(template, article);
      });

      $(".grid-sizer").after(articlesHtml.join(""));

      start();
    })
    .catch((error) => console.error(error)); // ça c'est pour gerer si il y a un erreur

  // X - Générer le HTML à partir du template Mustache

  // injecter le résultat dans la page
});
