import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import type { URL } from "node:url";

function urlDirname(url: string | URL) {
  return dirname(fileURLToPath(url));
}

function urlJoin(url: string | URL, ...str: string[]) {
  return join(urlDirname(url), ...str);
}

export default urlDirname;

export { fileURLToPath as filename, urlJoin as join, urlDirname as dirname };