// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  apiSidebar: [
    'api/overview',
    {
      type: 'category',
      label: 'Pincode Operations',
      items: [
        'api/endpoints/pincode/get-details',
        'api/endpoints/pincode/lookup',
        'api/endpoints/pincode/batch-lookup',
        'api/endpoints/pincode/validate',
        'api/endpoints/pincode/autocomplete',
      ],
    },
    {
      type: 'category',
      label: 'Location Services',
      items: [
        'api/endpoints/location/nearest',
        'api/endpoints/location/reverse-geocoding',
        'api/endpoints/location/distance',
      ],
    },
    {
      type: 'category',
      label: 'Search',
      items: [
        'api/endpoints/search/general-search',
        'api/endpoints/search/random',
      ],
    },
    {
      type: 'category',
      label: 'Hierarchical Data',
      items: [
        'api/endpoints/hierarchical/states',
        'api/endpoints/hierarchical/districts',
        'api/endpoints/hierarchical/offices',
        'api/endpoints/hierarchical/circles',
      ],
    },
    'api/examples',
    'api/errors',
  ],
};

export default sidebars;
