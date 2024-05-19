import { join } from "~/lib/path.js";
import { Argv } from "~/types.js";

export const handle = async (argv: Argv) => {
  argv.output = join(__dirname, argv.output);
  console.log(argv);
};
