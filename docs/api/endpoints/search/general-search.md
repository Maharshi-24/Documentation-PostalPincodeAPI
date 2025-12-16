# GET General Search

Search for post offices and pincodes using various filters and search queries.

## Endpoint

```http
GET /api/v1/search
```

## Parameters

| Parameter  | Type    | Location | Required | Description                               |
| ---------- | ------- | -------- | -------- | ----------------------------------------- |
| `q`        | string  | Query    | No\*     | General search query                      |
| `office`   | string  | Query    | No\*     | Filter by office name                     |
| `district` | string  | Query    | No\*     | Filter by district name                   |
| `state`    | string  | Query    | No\*     | Filter by state name                      |
| `fuzzy`    | boolean | Query    | No       | Enable fuzzy matching (default: false)    |
| `page`     | number  | Query    | No       | Page number (default: 1)                  |
| `limit`    | number  | Query    | No       | Results per page (default: 100, max: 100) |

\*At least one of `q`, `office`, `district`, or `state` is required.

## Request Examples

### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/search?q=Ahmedabad&limit=20"
```

### JavaScript (fetch)

```javascript
const params = new URLSearchParams({
  q: "Ahmedabad",
  fuzzy: "true",
  page: 1,
  limit: 20,
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/search?${params}`)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

params = {
    'q': 'Ahmedabad',
    'fuzzy': 'true',
    'page': 1,
    'limit': 20
}

response = requests.get(
    'https://postal-pincode-api.vercel.app/api/v1/search',
    params=params
)
print(response.json())
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
      "officeType": "Head Office",
      "deliveryStatus": "Delivery",
      "divisionName": "Ahmedabad City",
      "regionName": "Ahmedabad",
      "circleName": "Gujarat",
      "taluk": "Ahmedabad",
      "districtName": "Ahmedabad",
      "stateName": "Gujarat"
    }
  ],
  "count": 1,
  "page": 1,
  "latency": "3.45ms"
}
```

## Error Responses

### No Search Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide a search query or apply at least one filter (office, district, state).",
  "data": null
}
```

### Limit Exceeded

**Status Code**: `400 Bad Request`

```json
{
  "message": "You can view up to 100 results per page.",
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
