# Welcome to Indian Postal Pincode API Documentation

Welcome to the comprehensive documentation for the **Indian Postal Pincode API** - a high-performance, serverless-ready REST API for looking up Indian Postal Code (Pincode) information.

## 🚀 Features

- **⚡ Blazing Fast**: In-memory data indexing for sub-millisecond lookups
- **📍 Location Search**: Find nearest post offices using Latitude & Longitude
- **📦 Batch Lookup**: Fetch details for multiple pincodes in a single request
- **🔍 Comprehensive Search**: Search by Pincode, Office Name, District, or State
- **✅ Validation**: Dedicated endpoint to verify if a Pincode exists
- **🤖 Autocomplete**: Smart suggestions with configurable limits
- **☁️ Serverless Ready**: Optimized for deployment on Vercel
- **🔒 Rate Limiting**: Built-in protection against abuse
- **💾 Caching**: Optimized with `Cache-Control` headers for performance

## Quick Start

### Base URL

All API requests should be made to:

```
https://postal-pincode-api.vercel.app/api/v1
```

### Example Request

Get details for a specific pincode:

```bash
curl https://postal-pincode-api.vercel.app/api/v1/pincode/110001
```

### Example Response

```json
{
  "message": "ok",
  "data": [
    {
      "officeName": "Sansad Marg",
      "pincode": "110001",
      "officeType": "Sub Office",
      "deliveryStatus": "Delivery",
      "divisionName": "New Delhi Central",
      "regionName": "Delhi",
      "circleName": "Delhi",
      "taluk": "New Delhi",
      "districtName": "Central Delhi",
      "stateName": "Delhi"
    }
  ],
  "count": 1,
  "latency": "0.45ms"
}
```

## What's Next?

- **[API Overview](api/overview.md)** - Learn about authentication, rate limiting, and response formats
- **[Pincode Operations](api/endpoints/pincode-operations.md)** - Explore pincode lookup, validation, and autocomplete
- **[Location Services](api/endpoints/location-services.md)** - Find nearest post offices and calculate distances
- **[Usage Examples](api/examples.md)** - See real-world implementation examples
- **[Error Handling](api/errors.md)** - Understand error codes and troubleshooting

## Use Cases

This API is perfect for:

- **E-commerce**: Address validation and autocomplete in checkout forms
- **Logistics**: Route planning and delivery area verification
- **Form Validation**: Real-time pincode verification in web applications
- **Data Enrichment**: Enhance customer data with location information
- **Analytics**: Geographic analysis of Indian postal data

## Support

If you encounter any issues or have questions:

- Check the [Error Codes](api/errors.md) documentation
- Review the [Examples](api/examples.md) for common use cases
- Visit the [GitHub repository](https://github.com/yourusername/PostalPincodeAPI) to report issues
