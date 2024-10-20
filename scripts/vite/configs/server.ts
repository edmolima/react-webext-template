/**
 * Vite server configuration.
 *
 * This configuration defines the settings for the development server, including:
 * - `port`: The port on which the Vite development server will run.
 * - `hmr`: Hot Module Replacement (HMR) settings for live-reloading during development.
 */

const PORT = parseInt(process.env.PORT || '3303', 10);

export const server = {
  /**
   * The port number for the Vite development server.
   */
  port: PORT,

  /**
   * Hot Module Replacement (HMR) settings.
   *
   * - `host`: Specifies the hostname for HMR. In this case, it's set to 'localhost'.
   */
  hmr: {
    host: 'localhost',
  },
};
