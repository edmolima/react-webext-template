import fs from 'fs-extra';
import path from 'path';
import { Manifest } from 'webextension-polyfill';

/**
 * Validates the manifest configuration.
 *
 * Ensures that required fields like `name`, `version`, and `manifest_version` are present and valid.
 * Throws an error if validation fails.
 *
 * @param {Manifest.WebExtensionManifest} manifest - The manifest configuration object.
 * @returns {Promise<Manifest.WebExtensionManifest>} A promise that resolves with the validated manifest or rejects with an error.
 */
const validateManifest = async (
  manifest: Manifest.WebExtensionManifest,
): Promise<Manifest.WebExtensionManifest> => {
  if (!manifest.name) {
    throw new Error('Validation failed: "name" is required in the manifest.');
  }

  if (!manifest.version) {
    throw new Error(
      'Validation failed: "version" is required in the manifest.',
    );
  }

  if (!manifest.manifest_version) {
    throw new Error(
      'Validation failed: "manifest_version" is required in the manifest.',
    );
  }

  if (manifest.manifest_version !== 3) {
    throw new Error(
      `Validation failed: Only Manifest Version 3 is supported. Provided version: ${manifest.manifest_version}`,
    );
  }

  console.log('Manifest validated successfully.');
  return manifest;
};

/**
 * Creates the manifest.json file in the specified output directory.
 *
 * @param {string} outputDir - The directory where the manifest.json will be saved.
 * @param {Manifest.WebExtensionManifest} manifest - The manifest configuration object.
 * @returns {Promise<void>} A promise that resolves when the file is successfully created.
 */
const createManifestV3 = async (
  outputDir: string,
  manifest: Manifest.WebExtensionManifest,
): Promise<void> => {
  try {
    const outputPath = path.resolve(outputDir, 'manifest.json');

    const dirPath = path.dirname(outputPath);
    await fs.ensureDir(dirPath);

    await fs.writeJson(outputPath, manifest, { spaces: 2 });
  } catch (error) {
    console.error('Error creating manifest file:', error);
    throw new Error(`Failed to create manifest: ${error}`);
  }
};

/**
 * Vite plugin to generate the manifest.json file after the build process.
 *
 * @param {Manifest.WebExtensionManifest} manifest - The manifest configuration to use.
 * @returns {import('vite').Plugin} A Vite plugin configuration object.
 */
export const browserWebExtensionManifest = (
  manifest: Manifest.WebExtensionManifest,
) => {
  return {
    name: 'browser-webext-manifest',
    enforce: 'post',
    apply: 'build',

    /**
     * Vite build hook that runs after the build has completed.
     */
    async closeBundle() {
      console.log('Starting manifest generation after build...');
      const outputDir = 'dist';
      console.log(`Output directory for manifest: ${outputDir}`);

      try {
        // Validate and create the manifest
        validateManifest(manifest);
        await createManifestV3(outputDir, manifest);
        console.log('Manifest generation completed.');
      } catch (error) {
        console.error('Error during manifest generation:', error);
      }
    },
  };
};
