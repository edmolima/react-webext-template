import type { Tabs } from 'webextension-polyfill';
import browser from 'webextension-polyfill';

import { onMessage, sendMessage } from 'webext-bridge/background';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
  import('@browser/background/helpers/content-script-HMR');
}

// remove or turn this off if you don't use side panel
const USE_SIDE_PANEL = true;

// to toggle the sidepanel with the action button in chromium:
if (USE_SIDE_PANEL) {
  // @ts-expect-error missing types
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: unknown) => console.error(error));
}

browser.runtime.onInstalled.addListener((): void => {
  console.log('Extension installed');
});

let previousTabId = 0;

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId;
    return;
  }

  let tab: Tabs.Tab;

  try {
    tab = await browser.tabs.get(previousTabId);
    previousTabId = tabId;
  } catch {
    return;
  }

  console.log('previous tab', tab);
  sendMessage(
    'tab-prev',
    { title: tab.title ?? '' },
    { context: 'content-script', tabId },
  );
});

onMessage('get-current-tab', async () => {
  try {
    const tab = await browser.tabs.get(previousTabId);
    return {
      title: tab?.title,
    };
  } catch {
    return {
      title: undefined,
    };
  }
});
