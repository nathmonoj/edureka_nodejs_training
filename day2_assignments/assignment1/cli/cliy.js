import { createUserFile } from '../util/util.js'
import yargs from "yargs";
import { hideBin } from "yargs/helpers"

const argv = yargs(hideBin(process.argv))
  .command('filestore', "Stores the provided text into a new file.", {
    text: {
      description: "The text to be stored in the file",
      alias: "txt",
      type: "string",
      demandOption: true,

    },
    filename: {
      description: "The File Name where the text to be stored(extension not required as all files shall be in txt format)",
      alias: "fn",
      type: "string",
      demandOption: true
    }
  })
  .check((argv, options) => {
    if (argv.text && argv.filename != '') {
      return true
    } else {
      throw new Error("You must provide the value of the arguments in desired format.")
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

async function run() {
  console.log('Arguments', argv)
  if (argv._.includes('filestore')) {
    await createUserFile(argv.text, argv.filename)
  }
  else if (argv._.includes('list')) {
    await listContacts(true);
  }
  else {
    console.log("Invalid command")
  }
}
run();