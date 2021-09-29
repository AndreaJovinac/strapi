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
