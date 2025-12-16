---
slug: /
---

# API Overview

This page provides essential information about using the Indian Postal Pincode API, including authentication, rate limiting, and response formats.

## Base URL

All API endpoints are relative to the base URL:

**[https://postal-pincode-api.vercel.app/api/v1](https://postal-pincode-api.vercel.app/api/v1)**

```
https://postal-pincode-api.vercel.app/api/v1
```

## Authentication

The API supports optional API key authentication. If authentication is enforced by the server, you must provide your API key in one of two ways:

### Option 1: Header (Recommended)

```bash
curl -H "x-api-key: YOUR_API_KEY" \
  https://postal-pincode-api.vercel.app/api/v1/pincode/110001
```

### Option 2: Query Parameter

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/pincode/110001?api_key=YOUR_API_KEY"
```

:::info
Currently, the API may not enforce authentication. Check with the API provider for the current authentication requirements.
:::

## Rate Limiting

To ensure fair usage and system stability, the API implements rate limiting:

- **Limit**: 100 requests per 15 minutes per IP address
- **Window**: 15 minutes (900 seconds)

### Rate Limit Response

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "message": "Too many requests, please try again later.",
  "data": null
}
```

### Best Practices

- Implement exponential backoff when receiving 429 responses
- Cache responses when possible
- Use batch endpoints to reduce request count
- Monitor your request rate

## Response Format

All API responses follow a consistent JSON structure:

### Success Response

```json
{
  "message": "ok",
  "data": {
    /* response data */
  },
  "count": 1,
  "latency": "0.45ms"
}
```

**Fields:**

- `message` (string): Status message, typically "ok" for successful requests
- `data` (object|array|null): The response payload
- `count` (number, optional): Number of items returned (for array responses)
- `latency` (string, optional): Query execution time in milliseconds
- `page` (number, optional): Current page number (for paginated responses)

### Error Response

```json
{
  "message": "Error description",
  "data": null
}
```

**Fields:**

- `message` (string): Human-readable error description
- `data` (null): Always null for error responses

## HTTP Status Codes

The API uses standard HTTP status codes:

| Status Code | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `200`       | Success - Request completed successfully                           |
| `400`       | Bad Request - Invalid parameters or request format                 |
| `401`       | Unauthorized - Invalid or missing API key                          |
| `404`       | Not Found - Resource not found                                     |
| `429`       | Too Many Requests - Rate limit exceeded                            |
| `500`       | Internal Server Error - Server-side error                          |
| `503`       | Service Unavailable - System is loading or temporarily unavailable |

## Caching

Most GET endpoints include cache headers for optimal performance:

```
Cache-Control: public, max-age=3600
```

This means responses can be cached for **1 hour**. Consider implementing client-side caching to:

- Reduce API calls
- Improve application performance
- Stay within rate limits

## Common Headers

### Request Headers

```
Content-Type: application/json
x-api-key: YOUR_API_KEY (if authentication is required)
```

### Response Headers

```
Content-Type: application/json
Cache-Control: public, max-age=3600
```

## Data Format

### Pincode Data Structure

Most endpoints return pincode data in this format:

```json
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
  "stateName": "Delhi",
  "latitude": 28.7041,
  "longitude": 77.1025
}
```

**Field Descriptions:**

- `officeName`: Name of the post office
- `pincode`: 6-digit postal code
- `officeType`: Type of office (e.g., "Sub Office", "Head Office", "Branch Office")
- `deliveryStatus`: Delivery status (e.g., "Delivery", "Non-Delivery")
- `divisionName`: Postal division name
- `regionName`: Postal region name
- `circleName`: Postal circle name
- `taluk`: Taluk/Tehsil name
- `districtName`: District name
- `stateName`: State name
- `latitude`: Geographic latitude (if available)
- `longitude`: Geographic longitude (if available)

## Pagination

Search endpoints support pagination:

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/search?q=Mumbai&page=2&limit=50"
```

**Parameters:**

- `page`: Page number (default: 1)
- `limit`: Results per page (default: 100, max: 100)

**Response includes:**

```json
{
  "message": "ok",
  "data": [...],
  "count": 50,
  "page": 2,
  "latency": "1.23ms"
}
```

## Service Availability

If the system is loading data or temporarily unavailable, you'll receive:

```json
{
  "message": "System error. We will fix it soon!",
  "data": null
}
```

**Status Code**: `503 Service Unavailable`

This typically occurs during:

- Initial server startup
- Data reloading
- System maintenance

## Next Steps

- Explore [Pincode Operations](/api/endpoints/pincode/get-details)
- Learn about [Location Services](/api/endpoints/location/nearest)
- Check out [Usage Examples](examples.md)
