import { Plugin } from 'vite';
import { dirname, relative } from 'node:path';

/**
 * Vite plugin to rewrite asset paths in HTML files to use relative paths during build.
 *
 * This ensures that asset paths are relative to the HTML file location,
 * which is useful for browser extensions or projects where assets are not hosted from the root.
 *
 * @returns {Plugin} The Vite plugin for rewriting asset paths.
 */
export const browserWebExtensionAssetsRewrite = (): Plugin => ({
  name: 'browser-webext-assets-rewrite',
  enforce: 'post', // Ensures this plugin runs after other transformations
  apply: 'build', // Apply this plugin only during the build phase

  /**
   * Transforms HTML during the build process to ensure asset paths are relative.
   *
   * @param {string} html - The HTML content to transform.
   * @param {Object} context - The context object.
   * @param {string} context.path - The path to the HTML file being transformed.
   * @returns {string} The transformed HTML content with rewritten asset paths.
   */
  transformIndexHtml(
    html: string,
    { path: htmlPath }: { path: string },
  ): string {
    return html.replace(
      /"\/assets\//g,
      `"${relative(dirname(htmlPath), '/assets')}/"`,
    );
  },
});
