# Location Services

This section covers geographic and location-based endpoints for finding post offices by coordinates and calculating distances.

## Find Nearest Post Offices

Find post offices near a specific geographic location using latitude and longitude coordinates.

### Endpoint

```
GET /nearest
```

### Parameters

| Parameter | Type   | Required | Description                                        |
| --------- | ------ | -------- | -------------------------------------------------- |
| `lat`     | float  | Yes      | Latitude coordinate                                |
| `long`    | float  | Yes      | Longitude coordinate                               |
| `radius`  | number | No       | Search radius in kilometers (default: 10, max: 50) |
| `limit`   | number | No       | Maximum results to return (default: 10, max: 100)  |

### Example Requests

#### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/nearest?lat=23.02&long=72.57&radius=5&limit=10"
```

#### JavaScript (fetch)

```javascript
const params = new URLSearchParams({
  lat: 23.02,
  long: 72.57,
  radius: 5,
  limit: 10,
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/nearest?${params}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(`Found ${data.count} post offices within ${data.radius_km}km`);
    console.log(data.data);
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

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
print(f"Found {data['count']} post offices within {data['radius_km']}km")
print(data['data'])
```

### Success Response

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
    },
    {
      "officeName": "Ellis Bridge",
      "pincode": "380006",
      "districtName": "Ahmedabad",
      "stateName": "Gujarat",
      "latitude": 23.0258,
      "longitude": 72.5698,
      "distance": 1.23
    }
  ],
  "count": 2,
  "latency": "2.45ms",
  "radius_km": 5
}
```

**Response Fields:**

- `distance`: Distance from the query point in kilometers
- Results are sorted by distance (nearest first)

### Error Responses

#### Missing Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide both latitude and longitude to find nearby post offices.",
  "data": null
}
```

#### Invalid Coordinates

**Status Code**: `400 Bad Request`

```json
{
  "message": "The coordinates you entered are invalid.",
  "data": null
}
```

#### Radius Too Large

**Status Code**: `400 Bad Request`

```json
{
  "message": "The search radius cannot be more than 50km.",
  "data": null
}
```

#### Limit Exceeded

**Status Code**: `400 Bad Request`

```json
{
  "message": "You can view up to 100 results at a time.",
  "data": null
}
```

---

## Reverse Geocoding

Find the nearest pincode for a given geographic coordinate.

### Endpoint

```
GET /pincode/reverse
```

### Parameters

| Parameter | Type  | Required | Description          |
| --------- | ----- | -------- | -------------------- |
| `lat`     | float | Yes      | Latitude coordinate  |
| `long`    | float | Yes      | Longitude coordinate |

### Example Requests

#### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/pincode/reverse?lat=28.7041&long=77.1025"
```

#### JavaScript (fetch)

```javascript
const params = new URLSearchParams({
  lat: 28.7041,
  long: 77.1025,
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/pincode/reverse?${params}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(`Nearest pincode: ${data.data.pincode}`);
    console.log(`Distance: ${data.data.distance}km`);
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

params = {
    'lat': 28.7041,
    'long': 77.1025
}

response = requests.get(
    'https://postal-pincode-api.vercel.app/api/v1/pincode/reverse',
    params=params
)
data = response.json()
print(f"Nearest pincode: {data['data']['pincode']}")
print(f"Distance: {data['data']['distance']}km")
```

### Success Response

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

### Error Responses

#### Missing Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide both latitude and longitude to find the nearest pincode.",
  "data": null
}
```

#### No Nearby Pincode

**Status Code**: `404 Not Found`

```json
{
  "message": "We couldn't find any pincode near the provided location.",
  "data": null
}
```

---

## Calculate Distance Between Pincodes

Calculate the distance between two pincodes using their geographic coordinates.

### Endpoint

```
GET /distance
```

### Parameters

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| `code1`   | string | Yes      | Origin pincode      |
| `code2`   | string | Yes      | Destination pincode |

### Example Requests

#### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/distance?code1=110001&code2=400001"
```

#### JavaScript (fetch)

```javascript
const params = new URLSearchParams({
  code1: "110001",
  code2: "400001",
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/distance?${params}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(`Distance: ${data.data.distance_km}km`);
    console.log(`From: ${data.data.from.officeName}`);
    console.log(`To: ${data.data.to.officeName}`);
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

params = {
    'code1': '110001',
    'code2': '400001'
}

response = requests.get(
    'https://postal-pincode-api.vercel.app/api/v1/distance',
    params=params
)
data = response.json()
print(f"Distance: {data['data']['distance_km']}km")
print(f"From: {data['data']['from']['officeName']}")
print(f"To: {data['data']['to']['officeName']}")
```

### Success Response

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

### Error Responses

#### Missing Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide both origin (code1) and destination (code2) pincodes to calculate distance.",
  "data": null
}
```

#### Coordinates Not Available

**Status Code**: `404 Not Found`

```json
{
  "message": "We couldn't find coordinates for one or both of the pincodes provided.",
  "data": null
}
```

---

## Use Cases

### 1. Store Locator

Find the nearest post offices to a user's current location:

```javascript
// Get user's location
navigator.geolocation.getCurrentPosition(async (position) => {
  const { latitude, longitude } = position.coords;

  const response = await fetch(
    `https://postal-pincode-api.vercel.app/api/v1/nearest?lat=${latitude}&long=${longitude}&radius=10&limit=5`
  );
  const data = await response.json();

  // Display nearest post offices
  data.data.forEach((office) => {
    console.log(`${office.officeName} - ${office.distance}km away`);
  });
});
```

### 2. Delivery Zone Validation

Check if a location is within your delivery radius:

```javascript
async function isWithinDeliveryZone(userLat, userLong, warehousePincode) {
  // Get warehouse coordinates
  const warehouseResponse = await fetch(
    `https://postal-pincode-api.vercel.app/api/v1/pincode/${warehousePincode}`
  );
  const warehouseData = await warehouseResponse.json();
  const warehouse = warehouseData.data[0];

  // Calculate distance
  const distanceResponse = await fetch(
    `https://postal-pincode-api.vercel.app/api/v1/distance?code1=${warehousePincode}&code2=${userPincode}`
  );
  const distanceData = await distanceResponse.json();

  const maxDeliveryRadius = 50; // km
  return distanceData.data.distance_km <= maxDeliveryRadius;
}
```

### 3. Shipping Cost Calculator

Calculate shipping costs based on distance:

```python
def calculate_shipping_cost(origin_pincode, destination_pincode):
    response = requests.get(
        'https://postal-pincode-api.vercel.app/api/v1/distance',
        params={'code1': origin_pincode, 'code2': destination_pincode}
    )
    data = response.json()

    distance = data['data']['distance_km']

    # Calculate cost: ₹10 base + ₹2 per km
    base_cost = 10
    per_km_cost = 2
    total_cost = base_cost + (distance * per_km_cost)

    return {
        'distance_km': distance,
        'shipping_cost': total_cost,
        'currency': 'INR'
    }
```

## Best Practices

1. **Optimize Radius**: Start with a smaller radius (5-10km) and increase if needed. Larger radii take longer to process.

2. **Limit Results**: Request only the number of results you need. Fewer results = faster response.

3. **Cache Coordinates**: If you frequently query the same pincodes, cache their coordinates locally.

4. **Handle Missing Coordinates**: Not all pincodes have latitude/longitude data. Always check for null values.

5. **User Permissions**: When using browser geolocation, always request user permission first.

## Next Steps

- Explore [Search](search.md) for text-based queries
- Check [Hierarchical Data](hierarchical-data.md) for state/district browsing
- See [Usage Examples](../examples.md) for complete implementations
