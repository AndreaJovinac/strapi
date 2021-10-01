const { sanitizeEntity } = require("strapi-utils");
const showdown = require("showdown");

("use strict");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map((entity) => {
      const json = sanitizeEntity(entity, { model: strapi.models.article });

      let txt = json.content
        .split("\n")
        .filter((line) => line.indexOf("#") !== 0)
        .filter((line) => line.indexOf("![") !== 0);

      txt = txt.join(" ").split(" ").slice(0, 24).join(" ");

      const converter = new showdown.Converter();

      json.content = converter.makeHtml(txt + "...");

      //const converter = new showdown.Converter();
      //json.content = converter.makeHtml(json.content);

      return json;
    });
  },
};
