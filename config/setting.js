const fs = require("fs");
const chalk = require("chalk");

global.sessionName = "Birthday-Wishes";
global.autobio = true;
global.owner = ['6285742632270']; //Example 6285742632270
global.grilfriend = ['']; //Example 6285742632270
global.timezone = ''; //Example Asia/Jakarta
global.brithdaydatetime = ''; //Example 2023-10-24 16:26

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});