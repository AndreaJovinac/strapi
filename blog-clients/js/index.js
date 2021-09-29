$(document).ready(function () {
  // X - Récuperer la liste des articles

  const api_url = "http://localhost:1337";

  axios
    .get(api_url + "/articles")
    .then((response) => {
      const template = document.getElementById("articleCard").innerHTML;

      const articlesHtml = response.data.map((article) => {
        return Mustache.render(template, article);
      });

      $(".grid-sizer").after(articlesHtml.join(""));

      start();
    })
    .catch((error) => console.error(error));

  // X - Générer le HTML à partir du template Mustache

  // injecter le résultat dans la page
});
