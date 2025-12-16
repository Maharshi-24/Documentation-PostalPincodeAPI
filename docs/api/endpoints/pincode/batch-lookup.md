# POST Batch Lookup

Fetch details for multiple pincodes in a single request. More efficient than making individual requests.

## Endpoint

```http
POST /api/v1/pincode/batch
```

## Request Body

| Field      | Type  | Required | Description                        |
| ---------- | ----- | -------- | ---------------------------------- |
| `pincodes` | array | Yes      | Array of pincode strings (max 100) |

## Request Examples

### cURL

```bash
curl -X POST https://postal-pincode-api.vercel.app/api/v1/pincode/batch \
  -H "Content-Type: application/json" \
  -d '{
    "pincodes": ["110001", "380001", "400001"]
  }'
```

### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/pincode/batch", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    pincodes: ["110001", "380001", "400001"],
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

payload = {
    "pincodes": ["110001", "380001", "400001"]
}

response = requests.post(
    'https://postal-pincode-api.vercel.app/api/v1/pincode/batch',
    json=payload
)
data = response.json()
print(data)
```

## Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": {
    "110001": [
      {
        "officeName": "Sansad Marg",
        "pincode": "110001",
        "districtName": "Central Delhi",
        "stateName": "Delhi"
      }
    ],
    "380001": [
      {
        "officeName": "Ahmedabad G.P.O.",
        "pincode": "380001",
        "districtName": "Ahmedabad",
        "stateName": "Gujarat"
      }
    ],
    "400001": [
      {
        "officeName": "Mumbai G.P.O.",
        "pincode": "400001",
        "districtName": "Mumbai",
        "stateName": "Maharashtra"
      }
    ]
  },
  "count": 3
}
```

## Error Responses

### Invalid Request Body

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide a list of pincodes. You can search up to 100 pincodes at a time.",
  "data": null
}
```

**Causes**:

- `pincodes` field is missing
- `pincodes` is not an array
- Array is empty
- Array contains more than 100 pincodes

**Solution**:

```javascript
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

## Best Practices

1. **Batch Size**: Keep batches under 100 pincodes
2. **Chunking**: For large datasets, split into multiple batches
3. **Error Handling**: Handle individual pincode failures gracefully
4. **Rate Limiting**: Respect the 100 requests per 15 minutes limit
5. **Caching**: Cache batch results to reduce API calls

## Example: Processing Large Datasets

```javascript
async function batchProcessPincodes(pincodes) {
  // Split into chunks of 100
  const chunks = [];
  for (let i = 0; i < pincodes.length; i += 100) {
    chunks.push(pincodes.slice(i, i + 100));
  }

  const results = [];

  for (const chunk of chunks) {
    try {
      const response = await fetch(`${API_BASE}/pincode/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincodes: chunk }),
      });

      const data = await response.json();
      results.push(data.data);

      // Respect rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error("Batch processing error:", error);
    }
  }

  return Object.assign({}, ...results);
}
```

## Related Endpoints

- [Get Pincode Details](get-details.md) - Single pincode lookup
- [Pincode Lookup](lookup.md) - Alternative lookup endpoint
- [Validate Pincode](validate.md) - Check if pincode exists
