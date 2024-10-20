import fs from 'fs-extra';

import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../../../package.json';

import { isDev, port, isFirefox, readFile } from './utils';

// Read package.json to get metadata (name, version, description)
export const pkg = fs.readJSONSync(
  readFile('../../../package.json'),
) as typeof PkgType;

/**
 * Defines the base manifest configuration for a WebExtension.
 *
 * The manifest configuration includes metadata from package.json and specifies
 * browser-specific properties such as action, background, permissions, content scripts, and more.
 *
 * @type {Manifest.WebExtensionManifest}
 */
export const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  action: {
    default_popup: './popup/index.html',
    default_icon: './assets/icon-512.png',
  },
  options_ui: {
    page: './options/index.html',
    open_in_tab: true,
  },
  background: isFirefox
    ? {
        scripts: ['./background/index.js'],
        type: 'module',
      }
    : {
        service_worker: './background/index.js',
      },
  icons: {
    16: './assets/icon-16.png',
    48: './assets/icon-48.png',
    128: './assets/icon-128.png',
  },
  permissions: ['tabs', 'storage', 'activeTab', 'sidePanel'],
  host_permissions: ['*://*/*'],
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['./content-script/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['./content-script/style.css'],
      matches: ['<all_urls>'],
    },
  ],
  content_security_policy: {
    extension_pages: isDev
      ? // this is required on dev for Vite script to load
        `script-src 'self' http://localhost:${port}; object-src 'self'`
      : "script-src 'self'; object-src 'self'",
  },
};
