# GET Offices by District

Retrieve all post offices within a specific district.

## Endpoint

```http
GET /api/v1/offices/:district
```

## Parameters

| Parameter  | Type   | Location | Required | Description   |
| ---------- | ------ | -------- | -------- | ------------- |
| `district` | string | Path     | Yes      | District name |

## Request Examples

### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/offices/Ahmedabad"
```

### JavaScript (fetch)

```javascript
const districtName = "Ahmedabad";

fetch(
  `https://postal-pincode-api.vercel.app/api/v1/offices/${encodeURIComponent(
    districtName
  )}`
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

district_name = 'Ahmedabad'
response = requests.get(
    f'https://postal-pincode-api.vercel.app/api/v1/offices/{district_name}'
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
  "count": 150
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
