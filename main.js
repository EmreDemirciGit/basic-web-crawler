const { crawlPage } = require("./crawl.js");
process.argv;
async function main() {
  if (process.argv.length !== 3) {
    console.log("expected one website as argument");
    process.exit(1);
  }

  crawlPage(process.argv[2]);
}

main();
