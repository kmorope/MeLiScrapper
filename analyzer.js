const difflib = require("difflib");
const cluster = require("set-clustering");
const utils = require("./utils");
const command = require("./command");
const fs = require("fs");

async function main() {
  await command.setupResult().then(async (config) => {
    console.clear();
    utils.showMessage("-- Iniciando Análisis --", "yellow");
    await runAnalysis(config);
  });
}

main();

const runAnalysis = async (config) => {
  let rawData = fs.readFileSync("./items.json");
  let jsonData = JSON.parse(rawData);
  let items = [];

  jsonData.data.forEach((element) => {
    items.push(element.title);
  });

  const compare = (x, y) => {
    return new difflib.SequenceMatcher(null, x, y).ratio();
  };

  let c = cluster(items, compare);

  let data = c.similarGroups(config.similarity);
  let info = {
    products: data.length,
    items: items.length,
    url: jsonData.url,
    similarity: config.similarity,
  };

  printReview(info);

  if (config.format) {
    utils.createHtmlFile(data, info);
  } else {
    utils.createJsonFile(data);
  }
};

const printReview = (info) => {
  console.clear();
  utils.showMessage("-- Resumen del Reporte --", "yellow");
  utils.showMessage(`Productos Únicos:${info.products}`, "green");
  utils.showMessage(`Items analizados:${info.items}`, "green");
  utils.showMessage(`URL de origen:${info.url}`, "green");
};
