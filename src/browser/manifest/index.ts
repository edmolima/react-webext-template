import { manifest as baseManifest } from './manifest';
import { manifestConditionalConfig } from './manifest-conditional';
import type { Manifest } from 'webextension-polyfill';

/**
 * Combines the base manifest with conditional configurations.
 *
 * This function applies the conditional configuration to the base manifest, producing
 * the final manifest object that can be used in different environments.
 *
 * @returns {Manifest.WebExtensionManifest} The final manifest configuration.
 */
export const getManifest = (): Manifest.WebExtensionManifest => {
  return manifestConditionalConfig(baseManifest);
};

export const manifest = getManifest();
