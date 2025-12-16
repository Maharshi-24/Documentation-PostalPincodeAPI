# Error Codes and Troubleshooting

This page provides comprehensive information about error handling, HTTP status codes, and common issues you might encounter when using the Indian Postal Pincode API.

## Error Response Format

All error responses follow a consistent JSON structure:

```json
{
  "message": "Human-readable error description",
  "data": null
}
```

Additional metadata may be included depending on the error type.

---

## HTTP Status Codes

### 200 OK

**Description**: Request completed successfully.

**Example**:

```json
{
  "message": "ok",
  "data": [...],
  "count": 5
}
```

**Action**: No action needed. Process the response data.

---

### 400 Bad Request

**Description**: The request contains invalid parameters or malformed data.

#### Common Causes

##### Invalid Pincode Format

```json
{
  "message": "The pincode you entered is invalid. It must be a 6-digit number.",
  "data": null
}
```

**Cause**: Pincode is not exactly 6 digits or contains non-numeric characters.

**Solution**:

```javascript
// Validate pincode before sending
function isValidPincode(pincode) {
  return /^\d{6}$/.test(pincode);
}

if (isValidPincode(userInput)) {
  // Make API call
} else {
  console.error("Invalid pincode format");
}
```

##### Missing Required Parameters

```json
{
  "message": "Please provide both latitude and longitude to find nearby post offices.",
  "data": null
}
```

**Cause**: Required query parameters are missing.

**Solution**:

```javascript
// Ensure all required parameters are provided
const params = new URLSearchParams({
  lat: latitude, // Required
  long: longitude, // Required
});

if (!latitude || !longitude) {
  throw new Error("Latitude and longitude are required");
}
```

##### Limit Exceeded

```json
{
  "message": "You can request up to 100 suggestions at a time.",
  "data": null
}
```

**Cause**: Requested limit exceeds maximum allowed value.

**Solution**:

```javascript
// Enforce maximum limits
const limit = Math.min(userLimit, 100);
```

##### Invalid Batch Request

```json
{
  "message": "Please provide a list of pincodes. You can search up to 100 pincodes at a time.",
  "data": null
}
```

**Cause**: Batch request body is invalid or contains more than 100 pincodes.

**Solution**:

```javascript
// Validate batch request
function validateBatchRequest(pincodes) {
  if (!Array.isArray(pincodes)) {
    throw new Error("Pincodes must be an array");
  }
  if (pincodes.length === 0) {
    throw new Error("Pincodes array cannot be empty");
  }
  if (pincodes.length > 100) {
    throw new Error("Maximum 100 pincodes per batch");
  }
  return true;
}
```

##### Invalid Coordinates

```json
{
  "message": "The coordinates you entered are invalid.",
  "data": null
}
```

**Cause**: Latitude or longitude values are not valid numbers.

**Solution**:

```javascript
function validateCoordinates(lat, long) {
  const latitude = parseFloat(lat);
  const longitude = parseFloat(long);

  if (isNaN(latitude) || isNaN(longitude)) {
    throw new Error("Invalid coordinates");
  }

  if (latitude < -90 || latitude > 90) {
    throw new Error("Latitude must be between -90 and 90");
  }

  if (longitude < -180 || longitude > 180) {
    throw new Error("Longitude must be between -180 and 180");
  }

  return { latitude, longitude };
}
```

##### Radius Too Large

```json
{
  "message": "The search radius cannot be more than 50km.",
  "data": null
}
```

**Cause**: Search radius exceeds maximum allowed value.

**Solution**:

```javascript
const radius = Math.min(userRadius, 50);
```

##### Search Parameters Missing

```json
{
  "message": "Please provide a search query or apply at least one filter (office, district, state).",
  "data": null
}
```

**Cause**: No search parameters provided to `/search` endpoint.

**Solution**:

```javascript
// Ensure at least one search parameter
const params = new URLSearchParams();

if (query) params.append("q", query);
if (state) params.append("state", state);
if (district) params.append("district", district);

if (params.toString() === "") {
  throw new Error("At least one search parameter is required");
}
```

---

### 401 Unauthorized

**Description**: Invalid or missing API key (when authentication is enforced).

**Example**:

```json
{
  "status": "error",
  "message": "Invalid API Key"
}
```

**Cause**: API key is missing, invalid, or expired.

**Solution**:

```javascript
// Include API key in request
const headers = {
  "x-api-key": "YOUR_API_KEY",
};

fetch(url, { headers }).then((response) => {
  if (response.status === 401) {
    console.error("Invalid API key");
  }
});
```

**Alternative**: Use query parameter

```javascript
const url = `${baseUrl}/pincode/110001?api_key=YOUR_API_KEY`;
```

---

### 404 Not Found

**Description**: The requested resource was not found.

#### Common Causes

##### Pincode Not Found

```json
{
  "message": "We couldn't find any details for the pincode you entered.",
  "data": null,
  "latency": "0.23ms"
}
```

**Cause**: Pincode doesn't exist in the database.

**Solution**:

```javascript
async function getPincodeDetails(pincode) {
  const response = await fetch(`${API_BASE}/pincode/${pincode}`);
  const data = await response.json();

  if (response.status === 404) {
    console.log("Pincode not found");
    return null;
  }

  return data.data;
}
```

##### No Nearby Pincode

```json
{
  "message": "We couldn't find any pincode near the provided location.",
  "data": null
}
```

**Cause**: No pincodes found within search radius of coordinates.

**Solution**:

```javascript
// Try increasing the radius
async function findNearestWithFallback(lat, long) {
  let radius = 10;
  const maxRadius = 50;

  while (radius <= maxRadius) {
    const response = await fetch(
      `${API_BASE}/nearest?lat=${lat}&long=${long}&radius=${radius}`
    );
    const data = await response.json();

    if (response.ok && data.data.length > 0) {
      return data.data;
    }

    radius += 10;
  }

  return null; // No results found
}
```

##### Coordinates Not Available

```json
{
  "message": "We couldn't find coordinates for one or both of the pincodes provided.",
  "data": null
}
```

**Cause**: One or both pincodes don't have latitude/longitude data.

**Solution**:

```javascript
async function calculateDistanceWithValidation(code1, code2) {
  try {
    const response = await fetch(
      `${API_BASE}/distance?code1=${code1}&code2=${code2}`
    );

    if (response.status === 404) {
      console.log("Coordinates not available for one or both pincodes");
      return null;
    }

    const data = await response.json();
    return data.data.distance_km;
  } catch (error) {
    console.error("Error calculating distance:", error);
    return null;
  }
}
```

##### Invalid Endpoint

```json
{
  "message": "The page or resource you are looking for does not exist.",
  "data": null
}
```

**Cause**: Requested endpoint doesn't exist.

**Solution**: Check the endpoint URL and ensure it matches the API documentation.

---

### 429 Too Many Requests

**Description**: Rate limit exceeded.

**Example**:

```json
{
  "message": "Too many requests, please try again later.",
  "data": null
}
```

**Cause**: More than 100 requests made within 15 minutes.

**Solution**: Implement exponential backoff

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url);

    if (response.status === 429) {
      // Exponential backoff: 1s, 2s, 4s
      const delay = Math.pow(2, i) * 1000;
      console.log(`Rate limited. Retrying in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }

    return response;
  }

  throw new Error("Max retries exceeded");
}
```

**Prevention**: Implement request throttling

```javascript
class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }

  async throttle() {
    const now = Date.now();

    // Remove old requests outside the window
    this.requests = this.requests.filter((time) => now - time < this.windowMs);

    if (this.requests.length >= this.maxRequests) {
      // Wait until oldest request expires
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    this.requests.push(Date.now());
  }

  async fetch(url, options) {
    await this.throttle();
    return fetch(url, options);
  }
}

// Usage
const limiter = new RateLimiter(100, 15 * 60 * 1000); // 100 requests per 15 min
const response = await limiter.fetch(url);
```

---

### 500 Internal Server Error

**Description**: Unexpected server error.

**Example**:

```json
{
  "message": "Internal Server Error",
  "data": null
}
```

**Cause**: Server-side error occurred while processing the request.

**Solution**: Retry the request after a short delay

```javascript
async function fetchWithErrorHandling(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (response.status === 500) {
        if (i < maxRetries - 1) {
          console.log(`Server error. Retrying... (${i + 1}/${maxRetries})`);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          continue;
        }
      }

      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}
```

---

### 503 Service Unavailable

**Description**: Service is temporarily unavailable.

**Example**:

```json
{
  "message": "System error. We will fix it soon!",
  "data": null
}
```

**Cause**: Server is starting up, loading data, or under maintenance.

**Solution**: Implement retry logic with longer delays

```javascript
async function waitForService(url, maxAttempts = 5) {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(url);

    if (response.status !== 503) {
      return response;
    }

    const delay = (i + 1) * 5000; // 5s, 10s, 15s, 20s, 25s
    console.log(`Service unavailable. Retrying in ${delay / 1000}s...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error("Service unavailable after multiple attempts");
}
```

---

## Error Handling Best Practices

### Comprehensive Error Handler

```javascript
class APIClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      // Handle different status codes
      switch (response.status) {
        case 200:
          return { success: true, data: data.data, meta: data };

        case 400:
          return {
            success: false,
            error: "Invalid request",
            message: data.message,
          };

        case 401:
          return {
            success: false,
            error: "Unauthorized",
            message: "Invalid API key",
          };

        case 404:
          return {
            success: false,
            error: "Not found",
            message: data.message,
          };

        case 429:
          return {
            success: false,
            error: "Rate limit exceeded",
            message: "Too many requests. Please try again later.",
          };

        case 500:
          return {
            success: false,
            error: "Server error",
            message: "Internal server error. Please try again.",
          };

        case 503:
          return {
            success: false,
            error: "Service unavailable",
            message: "Service is temporarily unavailable.",
          };

        default:
          return {
            success: false,
            error: "Unknown error",
            message: data.message || "An unexpected error occurred",
          };
      }
    } catch (error) {
      return {
        success: false,
        error: "Network error",
        message: error.message,
      };
    }
  }
}

// Usage
const client = new APIClient("https://postal-pincode-api.vercel.app/api/v1");

const result = await client.request("/pincode/110001");

if (result.success) {
  console.log("Data:", result.data);
} else {
  console.error("Error:", result.error, "-", result.message);
}
```

### User-Friendly Error Messages

```javascript
function getUserFriendlyError(error) {
  const errorMessages = {
    "Invalid request": "Please check your input and try again.",
    Unauthorized: "Authentication failed. Please check your API key.",
    "Not found": "The requested information could not be found.",
    "Rate limit exceeded":
      "You've made too many requests. Please wait a moment and try again.",
    "Server error":
      "Something went wrong on our end. Please try again in a moment.",
    "Service unavailable":
      "The service is temporarily unavailable. Please try again later.",
    "Network error":
      "Unable to connect. Please check your internet connection.",
  };

  return (
    errorMessages[error] || "An unexpected error occurred. Please try again."
  );
}

// Usage
const result = await client.request("/pincode/110001");

if (!result.success) {
  const userMessage = getUserFriendlyError(result.error);
  alert(userMessage);
}
```

---

## Debugging Tips

### 1. Enable Detailed Logging

```javascript
async function debugRequest(url, options = {}) {
  console.log("Request URL:", url);
  console.log("Request Options:", options);

  const startTime = Date.now();
  const response = await fetch(url, options);
  const endTime = Date.now();

  console.log("Response Status:", response.status);
  console.log("Response Time:", `${endTime - startTime}ms`);

  const data = await response.json();
  console.log("Response Data:", data);

  return { response, data };
}
```

### 2. Validate Input Before Sending

```javascript
function validatePincodeRequest(pincode) {
  const errors = [];

  if (!pincode) {
    errors.push("Pincode is required");
  }

  if (typeof pincode !== "string") {
    errors.push("Pincode must be a string");
  }

  if (!/^\d{6}$/.test(pincode)) {
    errors.push("Pincode must be exactly 6 digits");
  }

  return {
    valid: errors.length === 0,
    errors: errors,
  };
}

// Usage
const validation = validatePincodeRequest(userInput);

if (!validation.valid) {
  console.error("Validation errors:", validation.errors);
  return;
}
```

### 3. Monitor API Health

```javascript
async function checkAPIHealth() {
  try {
    const response = await fetch(
      "https://postal-pincode-api.vercel.app/api/v1/states"
    );

    return {
      healthy: response.status === 200,
      status: response.status,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    return {
      healthy: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    };
  }
}

// Check health periodically
setInterval(async () => {
  const health = await checkAPIHealth();
  console.log("API Health:", health);
}, 60000); // Every minute
```

---

## Common Issues and Solutions

### Issue: CORS Errors in Browser

**Symptom**: Browser console shows CORS policy error

**Solution**: The API supports CORS. Ensure you're making requests from a valid origin. If issues persist, check browser console for specific CORS errors.

### Issue: Slow Response Times

**Symptom**: Requests take longer than expected

**Solutions**:

1. Use batch endpoints instead of multiple individual requests
2. Implement caching for frequently accessed data
3. Reduce search radius for location queries
4. Limit the number of results requested

### Issue: Empty Results

**Symptom**: API returns empty data array

**Solutions**:

1. Verify the pincode/location exists
2. Check spelling of state/district names
3. Try fuzzy search for text queries
4. Increase search radius for location queries

---

## Support

If you continue to experience issues:

1. Check this documentation for solutions
2. Verify your request format matches the examples
3. Test with the provided code snippets
4. Review the [API Overview](overview.md) for rate limits and caching
5. Visit the [GitHub repository](https://github.com/yourusername/PostalPincodeAPI) to report bugs

## Next Steps

- Review [Usage Examples](examples.md) for implementation patterns
- Check [API Overview](overview.md) for rate limiting details
- Explore [Endpoint Documentation](endpoints/pincode-operations.md)
