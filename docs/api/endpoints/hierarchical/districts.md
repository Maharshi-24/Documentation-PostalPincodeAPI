# GET Districts by State

Retrieve all districts within a specific state.

## Endpoint

```http
GET /api/v1/districts/:state
```

## Parameters

| Parameter | Type   | Location | Required | Description |
| --------- | ------ | -------- | -------- | ----------- |
| `state`   | string | Path     | Yes      | State name  |

## Request Examples

### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/districts/Gujarat"
```

### JavaScript (fetch)

```javascript
const stateName = "Gujarat";

fetch(
  `https://postal-pincode-api.vercel.app/api/v1/districts/${encodeURIComponent(
    stateName
  )}`
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

state_name = 'Gujarat'
response = requests.get(
    f'https://postal-pincode-api.vercel.app/api/v1/districts/{state_name}'
)
print(response.json())
```

## Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Gandhinagar",
    "Jamnagar",
    "Junagadh",
    "Rajkot",
    "Surat",
    "Vadodara"
  ],
  "count": 33
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
