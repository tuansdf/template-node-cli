import { Command } from "commander";
import * as process from "node:process";
import { z, ZodType } from "zod";
import { Argv } from "~/types.js";

const program = new Command();
program.name("tnc").description("A node cli");
program
  .requiredOption("-u, --url <url>", "URL to download the content")
  .option("-s, --site <site>", "Name of the site (can be extracted implicitly from the URL)")
  .option("-i, --input <input>", "Input file")
  .option("-o, --output <output>", "Output file");

const argvSchema = z.object({
  url: z
    .string({
      required_error: "URL is required",
      invalid_type_error: "URL is invalid",
    })
    .url("URL is invalid"),
  site: z.enum(["abc.com", "xyz.com"], {
    invalid_type_error: "Invalid site, should be abc.com/xyz.com",
    required_error: "Site is required",
  }),
  input: z
    .string({
      required_error: "Input is required",
      invalid_type_error: "Input is invalid",
    })
    .min(1, "Input is required"),
  output: z
    .string({
      required_error: "Output is required",
      invalid_type_error: "Output is invalid",
    })
    .min(1, "Output is required"),
}) satisfies ZodType<Argv>;

const check = async (argv: unknown) => {
  const validateRs = await argvSchema.safeParseAsync(argv);
  if (!validateRs.success) {
    // console.error(validateRs.error.message);
    validateRs.error.errors.forEach((item) => {
      console.error("Error: " + item.message);
    });
    console.log();
    program.help();
    process.exit(1);
  }
  return validateRs.data;
};

export const parseArgs = async (args: string[]): Promise<Argv> => {
  const opts = program.parse(args).opts();
  return check(opts);
};
