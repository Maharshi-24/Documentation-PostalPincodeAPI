# GET Calculate Distance

Calculate the distance between two pincodes using their geographic coordinates.

## Endpoint

```http
GET /api/v1/distance
```

## Parameters

| Parameter | Type   | Location | Required | Description         |
| --------- | ------ | -------- | -------- | ------------------- |
| `code1`   | string | Query    | Yes      | Origin pincode      |
| `code2`   | string | Query    | Yes      | Destination pincode |

## Request Examples

### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/distance?code1=110001&code2=400001"
```

### JavaScript (fetch)

```javascript
const params = new URLSearchParams({
  code1: "110001",
  code2: "400001",
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/distance?${params}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

params = {'code1': '110001', 'code2': '400001'}
response = requests.get(
    'https://postal-pincode-api.vercel.app/api/v1/distance',
    params=params
)
print(response.json())
```

## Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": {
    "from": {
      "pincode": "110001",
      "officeName": "Sansad Marg",
      "latitude": 28.7041,
      "longitude": 77.1025
    },
    "to": {
      "pincode": "400001",
      "officeName": "Mumbai G.P.O.",
      "latitude": 18.9388,
      "longitude": 72.8354
    },
    "distance_km": 1138.42
  }
}
```

## Error Responses

### Missing Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide both origin (code1) and destination (code2) pincodes to calculate distance.",
  "data": null
}
```

### Coordinates Not Available

**Status Code**: `404 Not Found`

```json
{
  "message": "We couldn't find coordinates for one or both of the pincodes provided.",
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
