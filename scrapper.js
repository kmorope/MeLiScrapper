const puppeteer = require("puppeteer");
const utils = require("./utils");
const constants = require("./const");
const fs = require("fs");

module.exports = {
  run: async (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        const id = new Date().getTime().toString();
        utils.showMessage("-- Iniciando Web Scrapper --", "yellow");
        utils.showMessage(`Id del análisis:${id}`, "green");
        utils.showMessage(`URL:${url}`, "green");
        utils.showMessage(
          "Esto puede tomar unos minutos según la velocidad de tu conexión",
          "green"
        );
        let itemsInfo = [];
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const navigationPromise = page.waitForNavigation();
        await page.goto(url);

        await page.waitForSelector(
          `${constants.SELECTOR_BASE}${constants.MAIN_PAGES}${constants.LINK}${constants.NAV_LINK}`
        );

        itemsInfo.push(...(await getItemsInfo(page)));

        await page.click(
          `${constants.SELECTOR_BASE}${constants.MAIN_PAGES}${constants.LINK}${constants.NAV_LINK}`
        );

        utils.showMessage("-- Pagina 1 Procesada --", "yellow");

        await navigationPromise;
        await page.waitForSelector(
          `${constants.SELECTOR_BASE}${constants.NEXT_PAGES}${constants.LINK}${constants.NAV_LINK}`
        );
        itemsInfo.push(...(await getItemsInfo(page)));
        await page.click(
          `${constants.SELECTOR_BASE}${constants.NEXT_PAGES}${constants.LINK}${constants.NAV_LINK}`
        );

        utils.showMessage("-- Pagina 2 Procesada --", "yellow");

        await navigationPromise;
        await page.waitForSelector(
          `${constants.SELECTOR_BASE}${constants.NEXT_PAGES}${constants.LINK}`
        );
        itemsInfo.push(...(await getItemsInfo(page)));
        await page.click(
          `${constants.SELECTOR_BASE}${constants.NEXT_PAGES}${constants.LINK}`
        );

        utils.showMessage("-- Pagina 3 Procesada --", "yellow");

        await navigationPromise;
        await page.waitForSelector(
          `${constants.SELECTOR_BASE}${constants.NEXT_PAGES}${constants.LINK}${constants.NAV_LINK}`
        );
        itemsInfo.push(...(await getItemsInfo(page)));
        await page.click(
          `${constants.SELECTOR_BASE}${constants.NEXT_PAGES}${constants.LINK}${constants.NAV_LINK}`
        );

        utils.showMessage("-- Pagina 4 Procesada --", "yellow");

        await navigationPromise;
        itemsInfo.push(...(await getItemsInfo(page)));

        utils.showMessage("-- Pagina 5 Procesada --", "yellow");
        utils.showMessage("-- Web Scrapper finalizado --", "yellow");
        fs.writeFile(
          "items.json",
          JSON.stringify(generateInfo(id, url, itemsInfo)),
          function (err) {
            if (err) {
              console.log(err);
            } else {
              utils.showMessage("-- Archivo Generado --", "white");
            }
          }
        );

        await browser.close();
      } catch (error) {
        return reject(error);
      }
    });
  },
};

const getItemsInfo = async (page) => {
  return await page.$$eval(".ui-search-layout__item", (item) =>
    item.map((p) => {
      return {
        title: p.querySelector(".ui-search-result__content-wrapper > div > a")
          .title,
        url: p.querySelector(".ui-search-result__content-wrapper > div > a")
          .href,
      };
    })
  );
};

const generateInfo = (id, url, itemsInfo) => {
  return {
    id: id,
    url: url,
    data: itemsInfo,
  };
};
