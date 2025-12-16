# GET All States

Retrieve a list of all states in India.

## Endpoint

```http
GET /api/v1/states
```

## Request Examples

### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/states
```

### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/states")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/states')
print(response.json())
```

## Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Punjab",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal"
  ],
  "count": 37
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
