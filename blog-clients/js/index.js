$(document).ready(function () {
  /* ETAPE 1 : */
  /* 1 - Récuperer la liste des articles */

  const api_url = "http://localhost:1337"; // on créer une constante et on met url dedans
  axios
    .get(api_url + "/articles") // à partir de la bilothèque axios
    .then((response) => {
      // Tu lui fais une promesse de lui envoyer un truc
      console.log(response);
      const template = document.getElementById("articleCard").innerHTML; // tu créer une constante qui s'appelle template dans lequel tu prendre l'ID articleCard

      const articlesHtml = response.data.map((article) => {
        /* */
        /* CATEGORIES */
        /* */

        // Dès qu'on veut traiter un tableau, il faut que l'on part d'un tableau et elle va sortir un tableau des valeurs d'un tableau, on créer
        article.categories = article.categories // Article il y a des catgeories
          .map((categorie) => `<a href="#0"> ${categorie.title} </a>`) // Il faut mettre le dollard pour rendre la variable dynamique
          .join(""); // <-- Joindre le tableau pour que ça devienne une chaine de cataractère

        // tu créer une constante qui s'appelle articleHTML dans lequel tu mets un tableau l'ID articleCard
        console.log(article.categories[0].title); // <-- pour tester l'affichage des articles
        console.log(article); // <-- pour tester l'affichage des articles
        return Mustache.render(template, article);
      });

      $(".grid-sizer").after(articlesHtml.join(""));

      start();
    })
    .catch((error) => console.error(error)); // ça c'est pour gerer si il y a un erreur
});
