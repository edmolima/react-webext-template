import path from 'node:path';

const projectRoot = path.resolve(__dirname, '../../../');
const resolvePath = (...args: string[]) => path.resolve(projectRoot, ...args);

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Base build configuration shared between default and extension builds.
 */
const baseBuildConfig = {
  build: {
    watch: isDev ? {} : undefined,
    outDir: resolvePath('dist'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    terserOptions: {
      mangle: false,
    },
    rollupOptions: {
      input: {
        options: resolvePath('index.html'),
        popup: resolvePath('index.html'),
        sidepanel: resolvePath('index.html'),
      },
      output: {
        entryFileNames: ({ name }: { name: string }) => `${name}/index.js`,
      },
    },
  },
};

/**
 * Generates the build configuration based on the BUILD_EXTENSION environment variable.
 *
 * @returns {Object} Build configuration for Vite.
 */
const buildConfig = () => {
  const cmdIsBuildExtension = process.env.BUILD_EXTENSION === 'true';

  if (cmdIsBuildExtension) {
    // Build configuration for the extension files, merging rollupOptions
    return {
      build: {
        ...baseBuildConfig.build,
        rollupOptions: {
          ...baseBuildConfig.build.rollupOptions,
          input: {
            ...baseBuildConfig.build.rollupOptions.input,
            'content-script': resolvePath(
              'src/browser/content-script/index.tsx',
            ),
            background: resolvePath('src/browser/background/index.ts'),
          },
          output: {
            ...baseBuildConfig.build.rollupOptions.output,
          },
        },
      },
    };
  } else {
    // Default build configuration
    return baseBuildConfig;
  }
};

/**
 * Export the build configuration.
 */

export const build = buildConfig();
