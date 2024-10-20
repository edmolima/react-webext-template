import react from '@vitejs/plugin-react';

import { browserWebExtensionManifest } from '../plugins/browser-webext-manifest';
import { browserWebExtensionAssetsRewrite } from '../plugins/browser-webext-assets-rewrite';
import { Manifest } from 'webextension-polyfill';

/**
 * Defines Vite plugins based on the build target.
 *
 * @param {Manifest.WebExtensionManifest} manifest - The manifest to be used for building the browser extension.
 * @returns {Object} An object containing the plugins array to use for the build.
 */
export const plugins = (manifest: Manifest.WebExtensionManifest) => {
  const cmdIsBuildExtension = process.env.BUILD_EXTENSION === 'true';

  if (cmdIsBuildExtension) {
    return {
      plugins: [
        react(),
        browserWebExtensionAssetsRewrite(),
        browserWebExtensionManifest(manifest),
      ],
    };
  }

  return {
    plugins: [react()],
  };
};
