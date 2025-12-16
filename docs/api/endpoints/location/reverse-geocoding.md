# GET Reverse Geocoding

Find the nearest pincode for given geographic coordinates.

## Endpoint

```http
GET /api/v1/pincode/reverse
```

## Parameters

| Parameter | Type  | Location | Required | Description          |
| --------- | ----- | -------- | -------- | -------------------- |
| `lat`     | float | Query    | Yes      | Latitude coordinate  |
| `long`    | float | Query    | Yes      | Longitude coordinate |

## Request Examples

### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/pincode/reverse?lat=28.7041&long=77.1025"
```

### JavaScript (fetch)

```javascript
const params = new URLSearchParams({
  lat: 28.7041,
  long: 77.1025,
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/pincode/reverse?${params}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

params = {'lat': 28.7041, 'long': 77.1025}
response = requests.get(
    'https://postal-pincode-api.vercel.app/api/v1/pincode/reverse',
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
    "officeName": "Sansad Marg",
    "pincode": "110001",
    "districtName": "Central Delhi",
    "stateName": "Delhi",
    "latitude": 28.7041,
    "longitude": 77.1025,
    "distance": 0.15
  }
}
```

## Error Responses

### Missing Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide both latitude and longitude to find the nearest pincode.",
  "data": null
}
```

### No Nearby Pincode

**Status Code**: `404 Not Found`

```json
{
  "message": "We couldn't find any pincode near the provided location.",
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
