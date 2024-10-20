/**
 * Vite test configuration.
 *
 * This configuration defines settings for the test environment, including:
 * - `globals`: Indicates whether global variables should be available in the test environment.
 * - `environment`: Specifies the testing environment, which is set to 'jsdom' for browser-like testing.
 */
export const test = {
  /**
   * Enables global variables in the test environment.
   *
   * Setting this to `true` allows global variables like `describe`, `it`, and `expect`
   * to be available in the test environment without needing explicit imports.
   */
  globals: true,

  /**
   * Specifies the environment to be used for testing.
   *
   * The `jsdom` environment simulates a browser-like environment, making it suitable
   * for testing components or features that depend on DOM APIs.
   */
  environment: 'jsdom',
};
