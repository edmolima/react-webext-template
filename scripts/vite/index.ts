import {
  defaultConfig,
  pluginsConfig,
  serverConfig,
  buildConfig,
  testConfig,
} from './configs';

import { manifest } from '../../src/browser/manifest';

const PORT = parseInt(process.env.PORT || '3303', 10);

/**
 * Generates the Vite configuration based on the provided command (either 'serve' or 'build').
 *
 * This function merges several configuration objects (default, server, test, and build)
 * with a base URL that depends on the command type. If the command is 'serve', it uses a local URL with the port;
 * for other commands, it defaults to the '/dist/' path.
 *
 * @param command - The Vite command being run (either 'serve' or 'build').
 * @returns The complete Vite configuration object.
 */

const viteConfig = (command: string): Record<string, unknown> => ({
  base: command === 'serve' ? `http://localhost:${PORT}/` : '/dist/',
  ...defaultConfig,
  ...serverConfig,
  ...pluginsConfig(manifest),
  ...testConfig,
  ...buildConfig,
});

export default viteConfig;
