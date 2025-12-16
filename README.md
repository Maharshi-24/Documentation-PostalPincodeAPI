# Indian Postal Pincode API Documentation

This repository contains the official documentation for the Indian Postal Pincode API, built with [Docusaurus](https://docusaurus.io/).

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Local Development

Start the development server:

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

The documentation will be available at `http://localhost:3000`.

### Build

Generate static content for production:

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Serve Build Locally

Test the production build locally:

```bash
npm run serve
```

## 📚 Documentation Structure

```
docs/
├── intro.md                              # Getting started
└── api/
    ├── overview.md                       # API overview, auth, rate limits
    ├── endpoints/
    │   ├── pincode-operations.md         # Pincode lookup, validation, autocomplete
    │   ├── location-services.md          # Geographic queries, distance calculation
    │   ├── search.md                     # Search with filters and fuzzy matching
    │   └── hierarchical-data.md          # States, districts, offices, circles
    ├── examples.md                       # Real-world usage examples
    └── errors.md                         # Error codes and troubleshooting
```

## 📝 Documentation Content

### API Overview

- Base URL and endpoints
- Authentication (optional API key)
- Rate limiting (100 requests per 15 minutes)
- Response formats
- Caching headers

### Endpoint Categories

#### Pincode Operations

- Get pincode details
- Pincode lookup
- Batch lookup (up to 100 pincodes)
- Validate pincode
- Autocomplete suggestions

#### Location Services

- Find nearest post offices by coordinates
- Reverse geocoding (coordinates to pincode)
- Calculate distance between pincodes

#### Search

- General search with filters
- Fuzzy matching for typo tolerance
- Pagination support
- Random pincode generation

#### Hierarchical Data

- List all states
- Get districts by state
- Get offices by district
- List postal circles

### Code Examples

All endpoints include code examples in:

- **cURL** - Command-line examples
- **JavaScript** - Using fetch API
- **Python** - Using requests library

### Usage Examples

Complete implementation examples for:

- E-commerce address validation
- Logistics route planning
- Form autocomplete
- Batch processing
- Location-based service finder

### Error Handling

Comprehensive error documentation including:

- All HTTP status codes (200, 400, 401, 404, 429, 500, 503)
- Common error scenarios
- Solutions and best practices
- Debugging tips

## 🛠️ Customization

### Configuration

Edit `docusaurus.config.js` to customize:

- Site title and tagline
- Navigation bar
- Footer links
- Theme colors
- Syntax highlighting

### Sidebar

Modify `sidebars.js` to change the documentation structure and navigation.

### Styling

Custom CSS can be added to `src/css/custom.css`.

## 📦 Deployment

### Vercel (Recommended)

1. Push this repository to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Docusaurus and configure the build

### Other Platforms

The documentation can be deployed to any static hosting service:

- **Netlify**: Connect your Git repository
- **GitHub Pages**: Use the `deploy` script
- **AWS S3**: Upload the `build` folder
- **Firebase Hosting**: Use Firebase CLI

## 🔗 Links

- **API Base URL**: https://postal-pincode-api.vercel.app/api/v1
- **API Repository**: https://github.com/yourusername/PostalPincodeAPI
- **Docusaurus**: https://docusaurus.io/

## 📄 License

This documentation is part of the Indian Postal Pincode API project.

## 🤝 Contributing

To contribute to this documentation:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build locally
5. Submit a pull request

## 📞 Support

For issues or questions:

- Check the [Error Codes](docs/api/errors.md) documentation
- Review the [Examples](docs/api/examples.md)
- Open an issue on GitHub
