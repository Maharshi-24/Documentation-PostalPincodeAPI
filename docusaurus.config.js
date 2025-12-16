// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Indian Postal Pincode API",
  tagline: "Fast, reliable, and comprehensive Indian postal code lookup API",
  favicon: "img/favicon.png",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://documentation-postal-pincodes.vercel.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "PostalPincodeAPI",
  projectName: "Documentation-PostalPincodeAPI",

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Docs at the root
          sidebarPath: "./sidebars.js",
          // Remove edit URL since this is API documentation
          editUrl: undefined,
        },
        blog: false, // Disable blog for API documentation
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  clientModules: [
    require.resolve('./src/modules/detectSystemTheme.js'),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        disableSwitch: false,
        // respectPrefersColorScheme removed to avoid tri-state switch
      },
      navbar: {
        title: "Postal Pincode API",
        logo: {
          alt: "Indian Postal Pincode API Logo",
          src: "img/logo.png",
        },
        items: [],
      },
      // Footer removed as requested
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "python", "javascript", "json"],
      },
    }),
};

export default config;
