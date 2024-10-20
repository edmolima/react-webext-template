import { defineConfig } from 'vite';

import { viteConfig } from './scripts';

/**
 * Builds and returns the Vite configuration based on the provided command.
 *
 * This function wraps the Vite configuration function and passes the command to it,
 * returning the full configuration object.
 *
 * @param command - The Vite command being run (either 'serve' or 'build').
 * @returns The Vite configuration object.
 */

const buildViteConfig = (command: string): Record<string, unknown> => ({
  ...viteConfig(command),
});

/**
 * Defines the Vite configuration using the command provided during the Vite build or serve process.
 *
 * @param command - The Vite command ('serve' or 'build').
 * @returns The fully defined Vite configuration.
 */
export default defineConfig(({ command }) => buildViteConfig(command));
