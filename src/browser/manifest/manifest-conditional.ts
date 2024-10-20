import type { Manifest } from 'webextension-polyfill';
import { isDev, isFirefox } from './utils';

/**
 * Applies conditional configurations to the manifest based on the environment.
 *
 * This function modifies the manifest to include platform-specific configurations,
 * such as the sidebar action for Firefox, or to add additional permissions in development.
 *
 * @param {Manifest.WebExtensionManifest} config - The base manifest configuration.
 * @returns {Manifest.WebExtensionManifest}
 *   The manifest configuration with conditional properties applied.
 */
export const manifestConditionalConfig = (
  config: Manifest.WebExtensionManifest,
): Manifest.WebExtensionManifest => {
  // Conditionally add side panel configuration for Firefox and Chromium-based browsers
  const withSidePanel = isFirefox
    ? {
        ...config,
        sidebar_action: { default_panel: 'sidepanel/index.html' },
      }
    : {
        ...config,
        side_panel: { default_path: 'sidepanel/index.html' },
      };

  // Conditionally add development-specific configurations
  const withDevConfig = isDev
    ? {
        ...withSidePanel,
        permissions: [...(config.permissions || []), 'webNavigation'],
        content_scripts: undefined,
      }
    : withSidePanel;

  return withDevConfig;
};
