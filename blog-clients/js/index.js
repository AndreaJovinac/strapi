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
        // console.log(article.categories[0].title); // <-- pour tester l'affichage des articles

        /* */
        /* DATE */
        /* */

        /* Pour formater des dates : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat*/
        const date = new Date(article.created_at); // créer une constante date et tu crées une nouvelle date et tu le mets
        article.created_at = new Intl.DateTimeFormat("en", {
          // on le met en anglais
          // il faut que ce soit en US
          dateStyle: "medium", // style des date
        }).format(date);

        /* C'est une autre proposition du prof
        const date = new Date(article.creatd_at);
        article.createad_at = new Intl.DateTimeFormat("en", {year: 'numeric', month:'short', day: 'numeric'}).format(date);
        /*

        /* C'est juste pour teste que je puisse bien récuperer la date de mon article */
        /*console.log(
          new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            formatMatcher: "basic",
          }).format(date)
        );*/

        /* */
        /* CONTENT */
        /* */

        /* */
        /* IMAGE */
        /* */
        console.log(article.image.url);

        article.image.url = api_url + article.image.url; // on créer une constrante et colle Api_url à l'image url

        return Mustache.render(template, article);
      });

      $(".grid-sizer").after(articlesHtml.join(""));

      start();
    })
    .catch((error) => console.error(error)); // ça c'est pour gerer si il y a un erreur
});
