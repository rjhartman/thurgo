import fs from "fs";
import path from "path";
import type { ThurgoCommand } from "../types";

const commands: ThurgoCommand[] = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file !== path.basename(__filename) &&
      (file.endsWith("js") || file.endsWith("ts"))
  )
  .map((file) => require(path.join(__dirname, file)).default);

export default commands;
