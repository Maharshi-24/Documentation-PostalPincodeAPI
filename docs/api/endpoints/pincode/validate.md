# GET Validate Pincode

Check if a pincode exists in the database without retrieving full details.

## Endpoint

```http
GET /api/v1/validate/:code
```

## Parameters

| Parameter | Type   | Location | Required | Description         |
| --------- | ------ | -------- | -------- | ------------------- |
| `code`    | string | Path     | Yes      | Pincode to validate |

## Request Examples

### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/validate/110001
```

### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/validate/110001")
  .then((response) => response.json())
  .then((data) => console.log(data.data.valid ? "Valid" : "Invalid"))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/validate/110001')
data = response.json()
print("Valid" if data['data']['valid'] else "Invalid")
```

## Success Response

**Status Code**: `200 OK`

### Valid Pincode

```json
{
  "message": "ok",
  "data": {
    "valid": true
  }
}
```

### Invalid Pincode

```json
{
  "message": "ok",
  "data": {
    "valid": false
  }
}
```

## Error Responses

### Rate Limit Exceeded

**Status Code**: `429 Too Many Requests`

```json
{
  "message": "Too many requests, please try again later.",
  "data": null
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

### Internal Server Error

**Status Code**: `500 Internal Server Error`

```json
{
  "message": "Internal Server Error",
  "data": null
}
```

## Use Cases

### Form Validation

```javascript
async function validatePincodeInput(pincode) {
  if (!/^\d{6}$/.test(pincode)) {
    return { valid: false, message: "Invalid format" };
  }

  const response = await fetch(`${API_BASE}/validate/${pincode}`);
  const data = await response.json();

  return {
    valid: data.data.valid,
    message: data.data.valid ? "Valid pincode" : "Pincode not found",
  };
}

// Usage in form
document.getElementById("pincode").addEventListener("blur", async (e) => {
  const result = await validatePincodeInput(e.target.value);
  if (!result.valid) {
    showError(result.message);
  }
});
```

### Bulk Validation

```javascript
async function validateMultiplePincodes(pincodes) {
  const results = {};

  for (const pincode of pincodes) {
    const response = await fetch(`${API_BASE}/validate/${pincode}`);
    const data = await response.json();
    results[pincode] = data.data.valid;

    // Respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return results;
}
```

## Best Practices

1. **Use for Quick Checks**: This endpoint is faster than fetching full details
2. **Client-Side Validation**: Validate format before calling API
3. **Cache Results**: Cache validation results to reduce API calls
4. **Batch Processing**: For multiple pincodes, add delays between requests

## Related Endpoints

- [Get Pincode Details](get-details.md) - Get full pincode information
- [Batch Lookup](batch-lookup.md) - Validate multiple pincodes efficiently
- [Autocomplete](autocomplete.md) - Get pincode suggestions
