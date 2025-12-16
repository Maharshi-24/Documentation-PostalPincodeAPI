# GET Random Pincode

Get a random pincode from the database. Useful for testing or generating sample data.

## Endpoint

```http
GET /api/v1/random
```

## Request Examples

### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/random
```

### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/random")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/random')
print(response.json())
```

## Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": {
    "officeName": "Connaught Place",
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
