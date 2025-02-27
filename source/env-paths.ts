import path from "node:path";
import os from "node:os";
import process from "node:process";

const homedir = os.homedir();
const tmpdir = os.tmpdir();
const { env } = process;

/**
 * Standard paths for application directories following XDG Base Directory Specification
 * @see https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
 */
interface EnvPaths {
  /**
   * Directory for data files (XDG_DATA_HOME)
   * User-specific data files should be written here
   */
  data: string;

  /**
   * Directory for configuration files (XDG_CONFIG_HOME)
   * User-specific configuration files should be written here
   */
  config: string;

  /**
   * Directory for non-essential data files (XDG_CACHE_HOME)
   * User-specific non-essential (cached) data should be written here
   */
  cache: string;

  /**
   * Directory for log files (within XDG_STATE_HOME)
   * User-specific log files should be written here
   */
  logs: string;

  /**
   * Directory for state files (XDG_STATE_HOME)
   * User-specific state data should be written here
   * This is similar to cache but preserved between application restarts
   */
  state: string;

  /**
   * Directory for temporary files
   * User-specific temporary files should be written here
   */
  temp: string;
}

const windows = (name: string): EnvPaths => {
  const appData = env.APPDATA ?? path.join(homedir, "AppData", "Roaming");
  const localAppData =
    env.LOCALAPPDATA ?? path.join(homedir, "AppData", "Local");

  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: path.join(localAppData, name, "Data"),
    config: path.join(appData, name, "Config"),
    cache: path.join(localAppData, name, "Cache"),
    logs: path.join(localAppData, name, "Logs"),
    state: path.join(localAppData, name, "state"),
    temp: path.join(tmpdir, name),
  };
};

// https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
const unix = (name: string): EnvPaths => {
  const username = path.basename(homedir);

  return {
    data: path.join(
      env.XDG_DATA_HOME ?? path.join(homedir, ".local", "share"),
      name,
    ),
    config: path.join(
      env.XDG_CONFIG_HOME ?? path.join(homedir, ".config"),
      name,
    ),
    cache: path.join(env.XDG_CACHE_HOME ?? path.join(homedir, ".cache"), name),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    logs: path.join(
      env.XDG_STATE_HOME ?? path.join(homedir, ".local", "state"),
      name,
      "logs",
    ),
    state: path.join(
      env.XDG_STATE_HOME ?? path.join(homedir, ".local", "state"),
      name,
    ),
    temp: path.join(tmpdir, username, name),
  };
};

export function envPaths(name: string): EnvPaths {
  if (process.platform === "win32") {
    return windows(name);
  }

  return unix(name);
}
