# Hierarchical Data

This section covers endpoints for browsing postal data hierarchically by states, districts, offices, and postal circles.

## Get All States

Retrieve a list of all states in India.

### Endpoint

```
GET /states
```

### Example Requests

#### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/states
```

#### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/states")
  .then((response) => response.json())
  .then((data) => {
    console.log(`Total states: ${data.count}`);
    console.log("States:", data.data);
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/states')
data = response.json()
print(f"Total states: {data['count']}")
print('States:', data['data'])
```

### Success Response

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
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ],
  "count": 37
}
```

---

## Get Districts by State

Retrieve all districts within a specific state.

### Endpoint

```
GET /districts/:state
```

### Parameters

| Parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| `state`   | string | Yes      | State name (path parameter) |

### Example Requests

#### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/districts/Gujarat"
```

#### JavaScript (fetch)

```javascript
const stateName = "Gujarat";

fetch(
  `https://postal-pincode-api.vercel.app/api/v1/districts/${encodeURIComponent(
    stateName
  )}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(`Districts in ${stateName}: ${data.count}`);
    console.log(data.data);
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

state_name = 'Gujarat'

response = requests.get(
    f'https://postal-pincode-api.vercel.app/api/v1/districts/{state_name}'
)
data = response.json()
print(f"Districts in {state_name}: {data['count']}")
print(data['data'])
```

### Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhoomi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad"
  ],
  "count": 33
}
```

---

## Get Offices by District

Retrieve all post offices within a specific district.

### Endpoint

```
GET /offices/:district
```

### Parameters

| Parameter  | Type   | Required | Description                    |
| ---------- | ------ | -------- | ------------------------------ |
| `district` | string | Yes      | District name (path parameter) |

### Example Requests

#### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/offices/Ahmedabad"
```

#### JavaScript (fetch)

```javascript
const districtName = "Ahmedabad";

fetch(
  `https://postal-pincode-api.vercel.app/api/v1/offices/${encodeURIComponent(
    districtName
  )}`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(`Offices in ${districtName}: ${data.count}`);
    data.data.forEach((office) => {
      console.log(`${office.officeName} - ${office.pincode}`);
    });
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

district_name = 'Ahmedabad'

response = requests.get(
    f'https://postal-pincode-api.vercel.app/api/v1/offices/{district_name}'
)
data = response.json()
print(f"Offices in {district_name}: {data['count']}")

for office in data['data']:
    print(f"{office['officeName']} - {office['pincode']}")
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
      "officeType": "Head Office",
      "deliveryStatus": "Delivery",
      "divisionName": "Ahmedabad City",
      "regionName": "Ahmedabad",
      "circleName": "Gujarat",
      "taluk": "Ahmedabad",
      "districtName": "Ahmedabad",
      "stateName": "Gujarat"
    },
    {
      "officeName": "Ellis Bridge",
      "pincode": "380006",
      "officeType": "Sub Office",
      "deliveryStatus": "Delivery",
      "divisionName": "Ahmedabad City",
      "regionName": "Ahmedabad",
      "circleName": "Gujarat",
      "taluk": "Ahmedabad",
      "districtName": "Ahmedabad",
      "stateName": "Gujarat"
    }
  ],
  "count": 2
}
```

---

## Get All Postal Circles

Retrieve a list of all postal circles in India.

### Endpoint

```
GET /circles
```

### Example Requests

#### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/circles
```

#### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/circles")
  .then((response) => response.json())
  .then((data) => {
    console.log(`Total circles: ${data.count}`);
    console.log("Circles:", data.data);
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/circles')
data = response.json()
print(f"Total circles: {data['count']}")
print('Circles:', data['data'])
```

### Success Response

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
    "Dadra and Nagar Haveli",
    "Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ],
  "count": 35
}
```

---

## Use Cases

### 1. Cascading Dropdowns

Create a hierarchical location selector:

```javascript
class LocationSelector {
  constructor() {
    this.baseUrl = "https://postal-pincode-api.vercel.app/api/v1";
  }

  async loadStates() {
    const response = await fetch(`${this.baseUrl}/states`);
    const data = await response.json();
    return data.data;
  }

  async loadDistricts(state) {
    const response = await fetch(
      `${this.baseUrl}/districts/${encodeURIComponent(state)}`
    );
    const data = await response.json();
    return data.data;
  }

  async loadOffices(district) {
    const response = await fetch(
      `${this.baseUrl}/offices/${encodeURIComponent(district)}`
    );
    const data = await response.json();
    return data.data;
  }
}

// Usage
const selector = new LocationSelector();

// Load states
const states = await selector.loadStates();
console.log("Available states:", states);

// User selects "Gujarat"
const districts = await selector.loadDistricts("Gujarat");
console.log("Districts in Gujarat:", districts);

// User selects "Ahmedabad"
const offices = await selector.loadOffices("Ahmedabad");
console.log("Offices in Ahmedabad:", offices);
```

### 2. Location Hierarchy Browser

Build a hierarchical data browser:

```python
class PostalDataBrowser:
    def __init__(self):
        self.base_url = 'https://postal-pincode-api.vercel.app/api/v1'

    def get_states(self):
        response = requests.get(f'{self.base_url}/states')
        return response.json()['data']

    def get_districts(self, state):
        response = requests.get(f'{self.base_url}/districts/{state}')
        return response.json()['data']

    def get_offices(self, district):
        response = requests.get(f'{self.base_url}/offices/{district}')
        return response.json()['data']

    def browse_hierarchy(self):
        # Get all states
        states = self.get_states()
        print(f"Total states: {len(states)}\n")

        # Browse first state as example
        state = states[0]
        print(f"State: {state}")

        # Get districts in state
        districts = self.get_districts(state)
        print(f"  Districts: {len(districts)}")

        # Get offices in first district
        if districts:
            district = districts[0]
            print(f"  District: {district}")

            offices = self.get_offices(district)
            print(f"    Offices: {len(offices)}")

            # Show first few offices
            for office in offices[:3]:
                print(f"      - {office['officeName']} ({office['pincode']})")

# Usage
browser = PostalDataBrowser()
browser.browse_hierarchy()
```

### 3. Data Aggregation

Aggregate statistics by state:

```javascript
async function getStateStatistics(stateName) {
  const baseUrl = "https://postal-pincode-api.vercel.app/api/v1";

  // Get districts
  const districtsResponse = await fetch(
    `${baseUrl}/districts/${encodeURIComponent(stateName)}`
  );
  const districtsData = await districtsResponse.json();
  const districts = districtsData.data;

  // Get office count for each district
  const districtStats = await Promise.all(
    districts.map(async (district) => {
      const officesResponse = await fetch(
        `${baseUrl}/offices/${encodeURIComponent(district)}`
      );
      const officesData = await officesResponse.json();

      return {
        district: district,
        officeCount: officesData.count,
      };
    })
  );

  // Calculate totals
  const totalOffices = districtStats.reduce(
    (sum, stat) => sum + stat.officeCount,
    0
  );

  return {
    state: stateName,
    districtCount: districts.length,
    totalOffices: totalOffices,
    districtStats: districtStats,
  };
}

// Usage
getStateStatistics("Gujarat").then((stats) => {
  console.log(`State: ${stats.state}`);
  console.log(`Districts: ${stats.districtCount}`);
  console.log(`Total Offices: ${stats.totalOffices}`);
  console.log("\nTop 5 districts by office count:");

  stats.districtStats
    .sort((a, b) => b.officeCount - a.officeCount)
    .slice(0, 5)
    .forEach((stat) => {
      console.log(`  ${stat.district}: ${stat.officeCount} offices`);
    });
});
```

### 4. Location Validation

Validate state-district combinations:

```python
def validate_location(state, district):
    """
    Validate if a district exists in a state
    """
    response = requests.get(
        f'https://postal-pincode-api.vercel.app/api/v1/districts/{state}'
    )

    if response.status_code != 200:
        return False, f"State '{state}' not found"

    data = response.json()
    districts = data['data']

    if district in districts:
        return True, f"'{district}' is a valid district in '{state}'"
    else:
        return False, f"'{district}' is not a district in '{state}'"

# Usage
valid, message = validate_location('Gujarat', 'Ahmedabad')
print(message)  # 'Ahmedabad' is a valid district in 'Gujarat'

valid, message = validate_location('Gujarat', 'Mumbai')
print(message)  # 'Mumbai' is not a district in 'Gujarat'
```

## Best Practices

1. **Cache Hierarchical Data**: States and districts rarely change, so cache them for extended periods.

2. **URL Encoding**: Always encode state/district names in URLs to handle spaces and special characters.

3. **Progressive Loading**: Load data progressively (states → districts → offices) rather than all at once.

4. **Error Handling**: Handle cases where state/district names might not exist.

5. **Normalize Names**: Be consistent with capitalization and spacing in state/district names.

## Integration Patterns

### React Component Example

```javascript
import React, { useState, useEffect } from "react";

function LocationSelector() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const baseUrl = "https://postal-pincode-api.vercel.app/api/v1";

  // Load states on mount
  useEffect(() => {
    fetch(`${baseUrl}/states`)
      .then((r) => r.json())
      .then((data) => setStates(data.data));
  }, []);

  // Load districts when state changes
  useEffect(() => {
    if (selectedState) {
      fetch(`${baseUrl}/districts/${encodeURIComponent(selectedState)}`)
        .then((r) => r.json())
        .then((data) => setDistricts(data.data));
    } else {
      setDistricts([]);
    }
  }, [selectedState]);

  return (
    <div>
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!selectedState}
      >
        <option value="">Select District</option>
        {districts.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## Next Steps

- Explore [Search](search.md) for text-based queries
- Check [Pincode Operations](pincode-operations.md) for detailed pincode info
- See [Usage Examples](../examples.md) for complete implementations
