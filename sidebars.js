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
        {
          type: 'doc',
          id: 'api/endpoints/pincode/get-details',
          label: 'Get Pincode Details',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/pincode/lookup',
          label: 'Pincode Lookup',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/pincode/batch-lookup',
          label: 'Batch Lookup',
          customProps: {
            method: 'POST'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/pincode/validate',
          label: 'Validate Pincode',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/pincode/autocomplete',
          label: 'Autocomplete',
          customProps: {
            method: 'GET'
          }
        },
      ],
    },
    {
      type: 'category',
      label: 'Location Services',
      items: [
        {
          type: 'doc',
          id: 'api/endpoints/location/nearest',
          label: 'Find Nearest',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/location/reverse-geocoding',
          label: 'Reverse Geocoding',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/location/distance',
          label: 'Calculate Distance',
          customProps: {
            method: 'GET'
          }
        },
      ],
    },
    {
      type: 'category',
      label: 'Search',
      items: [
        {
          type: 'doc',
          id: 'api/endpoints/search/general-search',
          label: 'General Search',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/search/random',
          label: 'Random Pincode',
          customProps: {
            method: 'GET'
          }
        },
      ],
    },
    {
      type: 'category',
      label: 'Hierarchical Data',
      items: [
        {
          type: 'doc',
          id: 'api/endpoints/hierarchical/states',
          label: 'Get All States',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/hierarchical/districts',
          label: 'Get Districts',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/hierarchical/offices',
          label: 'Get Offices',
          customProps: {
            method: 'GET'
          }
        },
        {
          type: 'doc',
          id: 'api/endpoints/hierarchical/circles',
          label: 'Get Circles',
          customProps: {
            method: 'GET'
          }
        },
      ],
    },
    'api/examples',
    'api/errors',
  ],
};

export default sidebars;
