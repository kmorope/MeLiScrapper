const chalk = require("chalk");
const _ = require("underscore");
const fs = require("fs");

const checkUrl = (url) => {
  const regex = /(https?:\/\/(.+?\.)?mercadolibre\.com(\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\(\)\*\+,;\=]*)?)/g;
  return url.match(regex);
};

const showMessage = (msg, color) => {
  if (!_.isUndefined(color) || !_.isNull(color)) {
    console.log(chalk.keyword(color)(`${msg}`));
  } else {
    console.log(chalk.green(`${msg}`));
  }
};

const errorLogger = (msg) => {
  console.log(chalk.red(`Error: ${msg}`));
};

const createJsonFile = (data) => {
  createFileReport("results", "json", JSON.stringify(data));
};

const createHtmlFile = (data, info) => {
  let rawData = fs.readFileSync("./template.html", "utf8");
  rawData = rawData.toString();
  rawData = rawData.replace("$data", JSON.stringify(data));
  rawData = rawData.replace("$url", info.url);
  rawData = rawData.replace("$products", info.products);
  rawData = rawData.replace("$items", info.items);
  rawData = rawData.replace("$similarity", info.similarity);

  createFileReport("report", "html", rawData);
};

const createFileReport = (title, format, data) => {
  const fileName = `${title}.${format}`;
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      console.log(err);
    } else {
      showMessage(`-- Reporte Generado - ${fileName} --`, "white");
    }
  });
};

module.exports = {
  checkUrl,
  showMessage,
  errorLogger,
  createJsonFile,
  createHtmlFile,
  createFileReport,
};
