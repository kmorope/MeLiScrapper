const { prompt, Toggle, NumberPrompt } = require("enquirer");
const chalk = require("chalk");
const utils = require("./utils");
const scrapper = require("./scrapper");
const _ = require("underscore");

module.exports = {
  welcome: async () => {
    console.log(chalk.yellow("Bienvenido al Web Scrapper de MeLi"));

    const searchLink = await prompt({
      type: "input",
      name: "link",
      message: "Empecemos con el link que deseas analizar:",
    });

    if (!_.isUndefined(searchLink.link) && !_.isEmpty(searchLink.link)) {
      if (utils.checkUrl(searchLink.link)) return searchLink.link;
      utils.errorLogger(`"${searchLink.link}" no es una url de Mercado Libre`);
    }
  },
  scrapper: async (link) => {
    console.clear();
    await scrapper.run(link);
  },
  setupResult: () => {
    return new Promise((resolve, reject) => {
      const promptFormat = new Toggle({
        message: "Formato del resultado",
        enabled: "HTML",
        disabled: "JSON",
      });
      const promptNumber = new NumberPrompt({
        name: "number",
        message: "Indice de Similitud (0 a 1, siendo 1 el 100% de similitud)",
        min: 0,
        max: 1,
        minor: 0,
        major: 1,
        initial: 0,
      });

      promptFormat
        .run()
        .then((format) => {
          promptNumber
            .run()
            .then((similarity) => {
              resolve({
                format,
                similarity,
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
