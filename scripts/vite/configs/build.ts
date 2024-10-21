import path from 'node:path';

const isDev = process.env.NODE_ENV !== 'production';

const projectRoot = path.resolve(__dirname, '../../../');
const resolvePath = (...args: string[]) => path.resolve(projectRoot, ...args);

const buildTarget = process.env.BUILD_TARGET;

const isFirefox = process.env.EXTENSION === 'firefox';

import packageJson from '../../../package.json';

enum BuildTarget {
  Background = 'background',
  ContentScript = 'content-script',
  Sidebar = 'sidebar',
  Options = 'options',
  Popup = 'popup',
}

const defaultConfig = {
  build: {
    watch: isDev ? {} : undefined,
    outDir: resolvePath('dist'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    terserOptions: {
      mangle: false,
    },
  },
};

const backgroundConfig = {
  build: {
    ...defaultConfig.build,
    lib: {
      entry: resolvePath(projectRoot, 'src/browser/background/index.ts'),
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'background/index.mjs',
        extend: true,
      },
    },
  },
};

const contentScriptConfig = {
  build: {
    ...defaultConfig.build,
    lib: {
      entry: resolvePath(projectRoot, 'src/browser/content-script/index.tsx'),
      name: packageJson.name,
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        entryFileNames: 'content-script/index.mjs',
        extend: true,
      },
    },
  },
};

const optionsConfig = {
  build: {
    ...defaultConfig.build,
    rollupOptions: {
      input: {
        options: resolvePath(projectRoot, 'src/browser/options/index.tsx'),
      },
      output: {
        entryFileNames: 'options/index.mjs',
        extend: true,
      },
    },
  },
};

const popupConfig = {
  build: {
    ...defaultConfig.build,
    rollupOptions: {
      input: {
        popup: resolvePath(projectRoot, 'src/browser/popup/index.tsx'),
      },
      output: {
        entryFileNames: 'popup/index.mjs',
        extend: true,
      },
    },
  },
};

const sidebarConfig = {
  build: {
    ...defaultConfig.build,
    rollupOptions: {
      input: {
        sidepanel: resolvePath(projectRoot, 'src/browser/sidebar/index.tsx'),
      },
      output: {
        entryFileNames: isFirefox ? 'sidebar/index.mjs' : 'sidepanel/index.mjs',
        extend: true,
      },
    },
  },
};

const buildConfig = () => {
  switch (buildTarget) {
    case BuildTarget.Background:
      return backgroundConfig;

    case BuildTarget.ContentScript:
      return contentScriptConfig;

    case BuildTarget.Options:
      return optionsConfig;

    case BuildTarget.Popup:
      return popupConfig;

    case BuildTarget.Sidebar:
      return sidebarConfig;

    default:
      return defaultConfig;
  }
};

export const build = buildConfig();
