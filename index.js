const command = require("./command");

async function main() {
  let searchLink = await command.welcome();
  await command.scrapper(searchLink);
}

main();
