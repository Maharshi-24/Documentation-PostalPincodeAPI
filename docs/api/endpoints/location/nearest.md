# GET Nearest Post Offices

Find post offices near a specific geographic location using latitude and longitude coordinates.

## Endpoint

```http
GET /api/v1/nearest
```

## Parameters

| Parameter | Type   | Location | Required | Description                                |
| --------- | ------ | -------- | -------- | ------------------------------------------ |
| `lat`     | float  | Query    | Yes      | Latitude coordinate                        |
| `long`    | float  | Query    | Yes      | Longitude coordinate                       |
| `radius`  | number | Query    | No       | Search radius in km (default: 10, max: 50) |
| `limit`   | number | Query    | No       | Max results (default: 10, max: 100)        |

## Request Examples

### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/nearest?lat=23.02&long=72.57&radius=5&limit=10"
```

### JavaScript (fetch)

```javascript
const params = new URLSearchParams({
  lat: 23.02,
  long: 72.57,
  radius: 5,
  limit: 10,
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/nearest?${params}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

params = {
    'lat': 23.02,
    'long': 72.57,
    'radius': 5,
    'limit': 10
}

response = requests.get(
    'https://postal-pincode-api.vercel.app/api/v1/nearest',
    params=params
)
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
      "officeName": "Ahmedabad G.P.O.",
      "pincode": "380001",
      "districtName": "Ahmedabad",
      "stateName": "Gujarat",
      "latitude": 23.0225,
      "longitude": 72.5714,
      "distance": 0.52
    }
  ],
  "count": 1,
  "latency": "2.45ms",
  "radius_km": 5
}
```

## Error Responses

### Missing Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide both latitude and longitude to find nearby post offices.",
  "data": null
}
```

### Invalid Coordinates

**Status Code**: `400 Bad Request`

```json
{
  "message": "The coordinates you entered are invalid.",
  "data": null
}
```

### Radius Too Large

**Status Code**: `400 Bad Request`

```json
{
  "message": "The search radius cannot be more than 50km.",
  "data": null
}
```

### Limit Exceeded

**Status Code**: `400 Bad Request`

```json
{
  "message": "You can view up to 100 results at a time.",
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

- [Reverse Geocoding](reverse-geocoding.md) - Get pincode from coordinates
- [Calculate Distance](distance.md) - Distance between pincodes
