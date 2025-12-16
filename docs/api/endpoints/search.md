# Search

This section covers search functionality including general search with filters, fuzzy matching, and random pincode generation.

## General Search

Search for post offices and pincodes using various filters and search queries.

### Endpoint

```
GET /search
```

### Parameters

| Parameter  | Type    | Required | Description                               |
| ---------- | ------- | -------- | ----------------------------------------- |
| `q`        | string  | No\*     | General search query                      |
| `office`   | string  | No\*     | Filter by office name                     |
| `district` | string  | No\*     | Filter by district name                   |
| `state`    | string  | No\*     | Filter by state name                      |
| `fuzzy`    | boolean | No       | Enable fuzzy matching (default: false)    |
| `page`     | number  | No       | Page number (default: 1)                  |
| `limit`    | number  | No       | Results per page (default: 100, max: 100) |

\*At least one of `q`, `office`, `district`, or `state` is required.

### Example Requests

#### Search by Query

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/search?q=Ahmedabad&limit=20"
```

#### Search by State

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/search?state=Gujarat&page=1&limit=50"
```

#### Search by District

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/search?district=Mumbai&limit=30"
```

#### Search by Office Name

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/search?office=GPO&limit=25"
```

#### Fuzzy Search

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/search?q=Mumbay&fuzzy=true&limit=10"
```

### Code Examples

#### JavaScript (fetch)

```javascript
// Simple search
const searchQuery = "Ahmedabad";
const params = new URLSearchParams({
  q: searchQuery,
  limit: 20,
});

fetch(`https://postal-pincode-api.vercel.app/api/v1/search?${params}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(`Found ${data.count} results in ${data.latency}`);
    data.data.forEach((office) => {
      console.log(`${office.officeName} - ${office.pincode}`);
    });
  })
  .catch((error) => console.error("Error:", error));

// Fuzzy search with pagination
async function searchWithFuzzy(query, page = 1) {
  const params = new URLSearchParams({
    q: query,
    fuzzy: "true",
    page: page,
    limit: 50,
  });

  const response = await fetch(
    `https://postal-pincode-api.vercel.app/api/v1/search?${params}`
  );
  return await response.json();
}

// Usage
searchWithFuzzy("Mumbay", 1).then((data) => console.log(data));
```

#### Python (requests)

```python
import requests

# Simple search
params = {
    'q': 'Ahmedabad',
    'limit': 20
}

response = requests.get(
    'https://postal-pincode-api.vercel.app/api/v1/search',
    params=params
)
data = response.json()
print(f"Found {data['count']} results in {data['latency']}")

for office in data['data']:
    print(f"{office['officeName']} - {office['pincode']}")

# Fuzzy search with filters
def search_with_filters(state=None, district=None, fuzzy=False, page=1, limit=50):
    params = {
        'fuzzy': str(fuzzy).lower(),
        'page': page,
        'limit': limit
    }

    if state:
        params['state'] = state
    if district:
        params['district'] = district

    response = requests.get(
        'https://postal-pincode-api.vercel.app/api/v1/search',
        params=params
    )
    return response.json()

# Usage
results = search_with_filters(state='Gujarat', district='Ahmedabad', limit=30)
print(results)
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
  "count": 2,
  "page": 1,
  "latency": "3.45ms"
}
```

### Error Responses

#### No Search Parameters

**Status Code**: `400 Bad Request`

```json
{
  "message": "Please provide a search query or apply at least one filter (office, district, state).",
  "data": null
}
```

#### Limit Exceeded

**Status Code**: `400 Bad Request`

```json
{
  "message": "You can view up to 100 results per page.",
  "data": null
}
```

---

## Random Pincode

Get a random pincode from the database. Useful for testing or generating sample data.

### Endpoint

```
GET /random
```

### Example Requests

#### cURL

```bash
curl https://postal-pincode-api.vercel.app/api/v1/random
```

#### JavaScript (fetch)

```javascript
fetch("https://postal-pincode-api.vercel.app/api/v1/random")
  .then((response) => response.json())
  .then((data) => {
    console.log("Random pincode:", data.data.pincode);
    console.log("Office:", data.data.officeName);
  })
  .catch((error) => console.error("Error:", error));
```

#### Python (requests)

```python
import requests

response = requests.get('https://postal-pincode-api.vercel.app/api/v1/random')
data = response.json()
print(f"Random pincode: {data['data']['pincode']}")
print(f"Office: {data['data']['officeName']}")
```

### Success Response

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

---

## Search Features

### Fuzzy Matching

Fuzzy search helps find results even when the search query contains typos or spelling variations.

**Examples:**

- "Mumbay" → finds "Mumbai"
- "Delli" → finds "Delhi"
- "Bangalor" → finds "Bangalore"

**Usage:**

```javascript
// Without fuzzy matching - may return no results
fetch("https://postal-pincode-api.vercel.app/api/v1/search?q=Mumbay")
  .then((r) => r.json())
  .then((d) => console.log(d.count)); // Might be 0

// With fuzzy matching - finds similar matches
fetch("https://postal-pincode-api.vercel.app/api/v1/search?q=Mumbay&fuzzy=true")
  .then((r) => r.json())
  .then((d) => console.log(d.count)); // Will find Mumbai results
```

### Pagination

For large result sets, use pagination to retrieve results in chunks:

```javascript
async function getAllResults(query) {
  let allResults = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const params = new URLSearchParams({
      q: query,
      page: page,
      limit: 100,
    });

    const response = await fetch(
      `https://postal-pincode-api.vercel.app/api/v1/search?${params}`
    );
    const data = await response.json();

    allResults = allResults.concat(data.data);

    // If we got fewer results than the limit, we've reached the end
    hasMore = data.count === 100;
    page++;
  }

  return allResults;
}

// Usage
getAllResults("Maharashtra").then((results) => {
  console.log(`Total results: ${results.length}`);
});
```

### Combined Filters

You can combine multiple filters for precise searches:

```python
def search_post_offices(state, district, office_type_keyword):
    params = {
        'state': state,
        'district': district,
        'office': office_type_keyword,
        'limit': 100
    }

    response = requests.get(
        'https://postal-pincode-api.vercel.app/api/v1/search',
        params=params
    )
    return response.json()

# Find all GPOs in Mumbai, Maharashtra
results = search_post_offices('Maharashtra', 'Mumbai', 'GPO')
```

---

## Use Cases

### 1. Location Autocomplete

Implement a location search autocomplete:

```javascript
let searchTimeout;

function handleLocationInput(inputValue) {
  // Debounce to avoid too many requests
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(async () => {
    if (inputValue.length < 3) return;

    const params = new URLSearchParams({
      q: inputValue,
      fuzzy: "true",
      limit: 10,
    });

    const response = await fetch(
      `https://postal-pincode-api.vercel.app/api/v1/search?${params}`
    );
    const data = await response.json();

    // Display suggestions
    displaySuggestions(data.data);
  }, 300);
}

function displaySuggestions(results) {
  const suggestions = results.map((office) => ({
    label: `${office.officeName}, ${office.districtName} - ${office.pincode}`,
    value: office.pincode,
  }));

  // Render suggestions in UI
  console.log(suggestions);
}
```

### 2. State-District Cascade

Create cascading dropdowns for state and district selection:

```javascript
async function loadDistricts(stateName) {
  const params = new URLSearchParams({
    state: stateName,
    limit: 100,
  });

  const response = await fetch(
    `https://postal-pincode-api.vercel.app/api/v1/search?${params}`
  );
  const data = await response.json();

  // Extract unique districts
  const districts = [...new Set(data.data.map((item) => item.districtName))];
  return districts.sort();
}

// Usage
loadDistricts("Gujarat").then((districts) => {
  console.log("Districts in Gujarat:", districts);
});
```

### 3. Data Export

Export all post offices for a specific region:

```python
import csv

def export_state_data(state_name, filename):
    all_data = []
    page = 1

    while True:
        params = {
            'state': state_name,
            'page': page,
            'limit': 100
        }

        response = requests.get(
            'https://postal-pincode-api.vercel.app/api/v1/search',
            params=params
        )
        data = response.json()

        if data['count'] == 0:
            break

        all_data.extend(data['data'])

        if data['count'] < 100:
            break

        page += 1

    # Write to CSV
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['officeName', 'pincode', 'districtName', 'stateName']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for office in all_data:
            writer.writerow({k: office.get(k, '') for k in fieldnames})

    print(f"Exported {len(all_data)} records to {filename}")

# Usage
export_state_data('Gujarat', 'gujarat_pincodes.csv')
```

## Best Practices

1. **Use Specific Filters**: Narrow your search with state/district filters for faster results.

2. **Enable Fuzzy Search**: When accepting user input, enable fuzzy matching to handle typos.

3. **Implement Debouncing**: Wait 300-500ms after user stops typing before searching.

4. **Paginate Large Results**: Don't try to load thousands of results at once.

5. **Cache Common Searches**: Cache frequently searched terms to reduce API calls.

6. **Combine with Other Endpoints**: Use search to find pincodes, then use specific endpoints for detailed info.

## Next Steps

- Explore [Hierarchical Data](hierarchical-data.md) for browsing by state/district
- Check [Pincode Operations](pincode-operations.md) for detailed pincode info
- See [Usage Examples](../examples.md) for complete implementations
