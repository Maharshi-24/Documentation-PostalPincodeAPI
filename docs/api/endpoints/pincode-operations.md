# Pincode Operations

This section covers all endpoints related to pincode lookup, validation, and autocomplete functionality.

## Get Pincode Details

Retrieve detailed information about a specific pincode, including all post offices associated with that pincode.

### Endpoint

```
GET /pincode/:code
```

### Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `code`    | string | Yes      | 6-digit pincode (path parameter) |

### Example Requests

#### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/pincode/110001
```

#### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/pincode/110001")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/pincode/110001')
data = response.json()
print(data)
```

### Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": [
    {
      "officeName": "Sansad Marg",
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
  ],
  "count": 1,
  "latency": "0.45ms"
}
```

### Error Responses

#### Invalid Pincode Format

**Status Code**: `400 Bad Request`

```json
{
  "message": "The pincode you entered is invalid. It must be a 6-digit number.",
  "data": null
}
```

#### Pincode Not Found

**Status Code**: `404 Not Found`

```json
{
  "message": "We couldn't find any details for the pincode you entered.",
  "data": null,
  "latency": "0.23ms"
}
```

---

## Pincode Lookup

Alternative endpoint for pincode lookup with the same functionality as GET /pincode/:code.

### Endpoint

```
GET /pincode/:code/lookup
```

### Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `code`    | string | Yes      | 6-digit pincode (path parameter) |

### Example Request

```bash
curl https://postal-pincode-api.vercel.app/api/v1/pincode/380001/lookup
```

### Response

Same format as [Get Pincode Details](#get-pincode-details).

---

## Batch Lookup

Fetch details for multiple pincodes in a single request. This is more efficient than making individual requests.

### Endpoint

```
POST /pincode/batch
```

### Request Body

| Field      | Type  | Required | Description                        |
| ---------- | ----- | -------- | ---------------------------------- |
| `pincodes` | array | Yes      | Array of pincode strings (max 100) |

### Example Requests

#### cURL

```bash
curl -X POST https://postal-pincode-api.vercel.app/api/v1/pincode/batch \
  -H "Content-Type: application/json" \
  -d '{
    "pincodes": ["110001", "380001", "400001"]
  }'
```

#### JavaScript (fetch)

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

#### Python (requests)

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

### Success Response

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

### Error Responses

#### Invalid Request

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide a list of pincodes. You can search up to 100 pincodes at a time.",
  "data": null
}
```

---

## Validate Pincode

Check if a pincode exists in the database without retrieving full details.

### Endpoint

```
GET /validate/:code
```

### Parameters

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `code`    | string | Yes      | Pincode to validate (path parameter) |

### Example Requests

#### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/validate/110001
```

#### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/validate/110001")
  .then((response) => response.json())
  .then((data) => console.log(data.data.valid ? "Valid" : "Invalid"))
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/validate/110001')
data = response.json()
print("Valid" if data['data']['valid'] else "Invalid")
```

### Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": {
    "valid": true
  }
}
```

**For invalid pincode:**

```json
{
  "message": "ok",
  "data": {
    "valid": false
  }
}
```

---

## Autocomplete

Get pincode suggestions based on a prefix. Useful for implementing autocomplete features in forms.

### Endpoint

```
GET /autocomplete/:prefix
```

### Parameters

| Parameter | Type   | Required | Description                                       |
| --------- | ------ | -------- | ------------------------------------------------- |
| `prefix`  | string | Yes      | Pincode prefix (path parameter)                   |
| `limit`   | number | No       | Max suggestions to return (default: 10, max: 100) |

### Example Requests

#### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/autocomplete/110?limit=5"
```

#### JavaScript (fetch)

```javascript
const prefix = "110";
const limit = 5;

fetch(
  `https://postal-pincode-api.vercel.app/api/v1/autocomplete/${prefix}?limit=${limit}`
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

prefix = '110'
params = {'limit': 5}

response = requests.get(
    f'https://postal-pincode-api.vercel.app/api/v1/autocomplete/{prefix}',
    params=params
)
data = response.json()
print(data)
```

### Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": ["110001", "110002", "110003", "110004", "110005"],
  "count": 5
}
```

### Error Responses

#### Limit Exceeded

**Status Code**: `400 Bad Request`

```json
{
  "message": "You can request up to 100 suggestions at a time.",
  "data": null
}
```

---

## Best Practices

1. **Use Batch Lookup**: When you need details for multiple pincodes, use the batch endpoint instead of making individual requests.

2. **Implement Autocomplete Wisely**:

   - Debounce user input (wait 300-500ms after typing stops)
   - Only trigger autocomplete after 3+ characters
   - Limit results to 10-15 for better UX

3. **Validate Before Submission**: Use the validate endpoint to check pincodes before form submission.

4. **Cache Results**: Pincode data rarely changes, so cache responses for at least 1 hour.

5. **Handle Errors Gracefully**: Always check the response status and handle errors appropriately.

## Next Steps

- Explore [Location Services](location-services.md) for geographic queries
- Check [Search](search.md) for advanced filtering
- See [Usage Examples](../examples.md) for implementation patterns
