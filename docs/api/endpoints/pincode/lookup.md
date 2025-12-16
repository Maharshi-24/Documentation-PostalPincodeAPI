# GET Pincode Lookup

Alternative endpoint for pincode lookup with the same functionality as GET /pincode/:code.

## Endpoint

```http
GET /api/v1/pincode/:code/lookup
```

## Parameters

| Parameter | Type   | Location | Required | Description     |
| --------- | ------ | -------- | -------- | --------------- |
| `code`    | string | Path     | Yes      | 6-digit pincode |

## Request Examples

### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/pincode/380001/lookup
```

### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/pincode/380001/lookup")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/pincode/380001/lookup')
data = response.json()
print(data)
```

## Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": {
    "officeName": "Ahmedabad G.P.O.",
    "pincode": "380001",
    "officeType": "Head Office",
    "deliveryStatus": "Delivery",
    "divisionName": "Ahmedabad City",
    "regionName": "Ahmedabad",
    "circleName": "Gujarat",
    "taluk": "Ahmedabad",
    "districtName": "Ahmedabad",
    "stateName": "Gujarat"
  }
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

### Pincode Not Found

**Status Code**: `404 Not Found`

```json
{
  "message": "We couldn't find any details for the pincode you entered.",
  "data": null
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

## Related Endpoints

- [Get Pincode Details](get-details.md) - Main pincode details endpoint
- [Batch Lookup](batch-lookup.md) - Get details for multiple pincodes
- [Validate Pincode](validate.md) - Check if pincode exists
