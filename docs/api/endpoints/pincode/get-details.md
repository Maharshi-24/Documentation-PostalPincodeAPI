# GET Pincode Details

Retrieve detailed information about a specific pincode, including all post offices associated with that pincode.

## Endpoint

```http
GET /api/v1/pincode/:code
```

## Parameters

| Parameter | Type   | Location | Required | Description     |
| --------- | ------ | -------- | -------- | --------------- |
| `code`    | string | Path     | Yes      | 6-digit pincode |

## Request Examples

### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/pincode/110001
```

### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/pincode/110001")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/pincode/110001')
data = response.json()
print(data)
```

## Success Response

**Status Code**: `200 OK`

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

## Error Responses

### Invalid Pincode Format

**Status Code**: `400 Bad Request`

```json
{
  "message": "The pincode you entered is invalid. It must be a 6-digit number.",
  "data": null
}
```

**Causes**:

- Pincode is not exactly 6 digits
- Pincode contains non-numeric characters
- Pincode is empty or null

**Solution**:

```javascript
function isValidPincode(pincode) {
  return /^\d{6}$/.test(pincode);
}

if (isValidPincode(userInput)) {
  // Make API call
} else {
  console.error("Invalid pincode format");
}
```

### Pincode Not Found

**Status Code**: `404 Not Found`

```json
{
  "message": "We couldn't find any details for the pincode you entered.",
  "data": null,
  "latency": "0.23ms"
}
```

**Causes**:

- Pincode doesn't exist in the database
- Pincode is not a valid Indian postal code

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

### Rate Limit Exceeded

**Status Code**: `429 Too Many Requests`

```json
{
  "message": "Too many requests, please try again later.",
  "data": null
}
```

**Causes**:

- More than 100 requests made within 15 minutes

**Solution**: Implement exponential backoff

```javascript
async function fetchWithRetry(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url);

    if (response.status === 429) {
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

### Service Unavailable

**Status Code**: `503 Service Unavailable`

```json
{
  "message": "System error. We will fix it soon!",
  "data": null
}
```

**Causes**:

- Server is starting up
- Data is being loaded
- System maintenance

**Solution**: Retry after a delay

```javascript
async function waitForService(url, maxAttempts = 5) {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(url);

    if (response.status !== 503) {
      return response;
    }

    const delay = (i + 1) * 5000;
    console.log(`Service unavailable. Retrying in ${delay / 1000}s...`);
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  throw new Error("Service unavailable after multiple attempts");
}
```

### Internal Server Error

**Status Code**: `500 Internal Server Error`

```json
{
  "message": "Internal Server Error",
  "data": null
}
```

**Causes**:

- Unexpected server-side error

**Solution**: Retry the request

```javascript
async function fetchWithErrorHandling(url, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url);

      if (response.status === 500 && i < maxRetries - 1) {
        console.log(`Server error. Retrying... (${i + 1}/${maxRetries})`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      return response;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
}
```

## Best Practices

1. **Validate Input**: Always validate pincode format before making API calls
2. **Cache Results**: Pincode data rarely changes, cache for at least 1 hour
3. **Handle Errors**: Implement proper error handling for all status codes
4. **Rate Limiting**: Respect the 100 requests per 15 minutes limit
5. **Retry Logic**: Implement exponential backoff for transient errors

## Related Endpoints

- [Pincode Lookup](lookup.md) - Alternative lookup endpoint
- [Batch Lookup](batch-lookup.md) - Get details for multiple pincodes
- [Validate Pincode](validate.md) - Check if pincode exists
