import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { onMessage } from 'webext-bridge/content-script';
import browser from 'webextension-polyfill';

import { ContentScript } from './ContentScript';

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
const initializeContentScript = () => {
  console.info('[react-webext-template] Hello world from content script');

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[react-webext-template] Navigate from page "${data}"`);
  });

  // mount component to context window
  const container = document.createElement('div');
  const root = document.createElement('div');
  const styleEl = document.createElement('link');
  const shadowDOM =
    container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) ||
    container;
  styleEl.setAttribute('rel', 'stylesheet');
  styleEl.setAttribute(
    'href',
    browser.runtime.getURL('dist/contentScripts/style.css'),
  );
  shadowDOM.appendChild(styleEl);
  shadowDOM.appendChild(root);
  document.body.appendChild(container);

  createRoot(root).render(
    <StrictMode>
      <ContentScript />
    </StrictMode>,
  );
};

/**
 * @description
 * Initialize content script
 */

(() => {
  initializeContentScript();
})();
