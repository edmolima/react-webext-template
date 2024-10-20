import path from 'node:path';
import packageJson from '../../../package.json';

/**
 * Default Vite configuration for the project.
 *
 * This configuration includes settings for:
 * - Root path resolution
 * - Alias configuration for module resolution
 * - React plugin for handling React files
 * - Asset path rewrites for build mode
 * - Dependency optimization for certain packages
 */
export const defaultConfig = {
  /**
   * Defines the root of the project.
   */
  root: path.resolve('.'),

  /**
   * Global constants available during the build.
   */
  define: {
    __DEV__: process.env.NODE_ENV !== 'production',
    __NAME__: JSON.stringify(packageJson.name),
  },

  /**
   * Configuration for module resolution aliases.
   * These aliases allow the use of shorthand imports instead of relative paths.
   */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@browser': path.resolve(__dirname, './src/browser'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },

  /**
   * Optimizes certain dependencies by pre-bundling them.
   */
  optimizeDeps: {
    include: ['react', 'webextension-polyfill'],
  },
};
