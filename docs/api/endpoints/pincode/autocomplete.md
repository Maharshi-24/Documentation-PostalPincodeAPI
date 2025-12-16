# GET Autocomplete

Get pincode suggestions based on a prefix. Useful for implementing autocomplete features in forms.

## Endpoint

```http
GET /api/v1/autocomplete/:prefix
```

## Parameters

| Parameter | Type   | Location | Required | Description                                       |
| --------- | ------ | -------- | -------- | ------------------------------------------------- |
| `prefix`  | string | Path     | Yes      | Pincode prefix                                    |
| `limit`   | number | Query    | No       | Max suggestions to return (default: 10, max: 100) |

## Request Examples

### cURL

```bash
curl "https://postal-pincode-api.vercel.app/api/v1/autocomplete/110?limit=5"
```

### JavaScript (fetch)

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

### Python (requests)

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

## Success Response

**Status Code**: `200 OK`

```json
{
  "message": "ok",
  "data": ["110001", "110002", "110003", "110004", "110005"],
  "count": 5
}
```

## Error Responses

### Limit Exceeded

**Status Code**: `400 Bad Request`

```json
{
  "message": "You can request up to 100 suggestions at a time.",
  "data": null
}
```

**Solution**:

```javascript
const limit = Math.min(userLimit, 100);
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

## Implementation Example

### React Autocomplete Component

```javascript
import React, { useState, useEffect } from "react";

function PincodeAutocomplete() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://postal-pincode-api.vercel.app/api/v1";

  useEffect(() => {
    if (input.length >= 3) {
      const timer = setTimeout(() => {
        fetchSuggestions(input);
      }, 300); // Debounce

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  const fetchSuggestions = async (prefix) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE}/autocomplete/${prefix}?limit=10`
      );
      const data = await response.json();
      setSuggestions(data.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter pincode..."
        maxLength="6"
      />
      {loading && <span>Loading...</span>}
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((pincode) => (
            <li key={pincode} onClick={() => setInput(pincode)}>
              {pincode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Vanilla JavaScript

```javascript
let searchTimeout;

function handlePincodeInput(inputValue) {
  clearTimeout(searchTimeout);

  if (inputValue.length < 3) {
    hideSuggestions();
    return;
  }

  searchTimeout = setTimeout(async () => {
    const response = await fetch(
      `${API_BASE}/autocomplete/${inputValue}?limit=10`
    );
    const data = await response.json();

    displaySuggestions(data.data);
  }, 300);
}

function displaySuggestions(suggestions) {
  const suggestionsList = document.getElementById("suggestions");
  suggestionsList.innerHTML = "";

  suggestions.forEach((pincode) => {
    const li = document.createElement("li");
    li.textContent = pincode;
    li.onclick = () => selectPincode(pincode);
    suggestionsList.appendChild(li);
  });
}
```

## Best Practices

1. **Debouncing**: Wait 300-500ms after user stops typing
2. **Minimum Characters**: Only trigger after 3+ characters
3. **Limit Results**: Request 10-15 suggestions for better UX
4. **Cache Results**: Cache suggestions for common prefixes
5. **Loading State**: Show loading indicator while fetching

## Related Endpoints

- [Get Pincode Details](get-details.md) - Get full details after selection
- [Validate Pincode](validate.md) - Validate selected pincode
- [General Search](../search/general-search.md) - Search with more filters
