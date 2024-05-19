import { parseArgs } from "~/argv.js";
import { handle } from "~/controller.js";
import { panic } from "~/utils.js";

export const cli = async (args: string[]) => {
  try {
    const argv = await parseArgs(args);
    await handle(argv);
  } catch (e) {
    if (e instanceof Error) {
      panic(e.message);
    }
    panic(e);
  }
};
