import { defaultConfig } from './default';
import { server as serverConfig } from './server';
import { test as testConfig } from './test';
import { build as buildConfig } from './build';

import { plugins as pluginsConfig } from './plugins';

/**
 * Exports the default, server, build, and test configurations.
 *
 * These configurations are modular and can be combined as needed.
 * Each configuration file (`default`, `server`, `build`, `test`) defines specific settings
 * for different parts of the Vite build and serve process.
 *
 * - `defaultConfig`: The default configuration used across all environments.
 * - `serverConfig`: Configuration specific to the Vite development server.
 * - `buildConfig`: Configuration for the build process (such as Rollup options).
 * - `testConfig`: Configuration related to testing (used by testing libraries like Vitest).
 * - `pluginsConfig`: Configuration for Vite plugins.
 */
export { defaultConfig, serverConfig, buildConfig, testConfig, pluginsConfig };
