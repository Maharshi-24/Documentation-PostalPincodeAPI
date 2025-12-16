# Usage Examples

This page provides real-world implementation examples for common use cases of the Indian Postal Pincode API.

## E-commerce Address Validation

Validate and autocomplete addresses during checkout.

### HTML Form

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Address Form</title>
  </head>
  <body>
    <form id="addressForm">
      <div>
        <label for="pincode">Pincode:</label>
        <input type="text" id="pincode" maxlength="6" required />
        <span id="pincodeStatus"></span>
      </div>

      <div>
        <label for="state">State:</label>
        <input type="text" id="state" readonly />
      </div>

      <div>
        <label for="district">District:</label>
        <input type="text" id="district" readonly />
      </div>

      <div>
        <label for="office">Post Office:</label>
        <select id="office"></select>
      </div>

      <button type="submit">Submit</button>
    </form>

    <script src="address-validation.js"></script>
  </body>
</html>
```

### JavaScript Implementation

```javascript
// address-validation.js
const API_BASE = "https://postal-pincode-api.vercel.app/api/v1";

const pincodeInput = document.getElementById("pincode");
const stateInput = document.getElementById("state");
const districtInput = document.getElementById("district");
const officeSelect = document.getElementById("office");
const statusSpan = document.getElementById("pincodeStatus");

let debounceTimer;

pincodeInput.addEventListener("input", (e) => {
  const pincode = e.target.value;

  // Clear previous timeout
  clearTimeout(debounceTimer);

  // Reset fields
  stateInput.value = "";
  districtInput.value = "";
  officeSelect.innerHTML = "";
  statusSpan.textContent = "";

  // Only validate if 6 digits
  if (pincode.length === 6) {
    debounceTimer = setTimeout(() => validatePincode(pincode), 500);
  }
});

async function validatePincode(pincode) {
  try {
    statusSpan.textContent = "🔍 Validating...";
    statusSpan.style.color = "blue";

    const response = await fetch(`${API_BASE}/pincode/${pincode}`);
    const data = await response.json();

    if (response.ok && data.data.length > 0) {
      // Valid pincode
      statusSpan.textContent = "✓ Valid";
      statusSpan.style.color = "green";

      // Populate fields
      const firstOffice = data.data[0];
      stateInput.value = firstOffice.stateName;
      districtInput.value = firstOffice.districtName;

      // Populate office dropdown
      data.data.forEach((office) => {
        const option = document.createElement("option");
        option.value = office.officeName;
        option.textContent = `${office.officeName} (${office.officeType})`;
        officeSelect.appendChild(option);
      });
    } else {
      // Invalid pincode
      statusSpan.textContent = "✗ Invalid pincode";
      statusSpan.style.color = "red";
    }
  } catch (error) {
    statusSpan.textContent = "⚠ Error validating";
    statusSpan.style.color = "orange";
    console.error("Validation error:", error);
  }
}

document.getElementById("addressForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    pincode: pincodeInput.value,
    state: stateInput.value,
    district: districtInput.value,
    office: officeSelect.value,
  };

  console.log("Form submitted:", formData);
  alert("Address validated and submitted!");
});
```

---

## Logistics Route Planning

Calculate distances and plan delivery routes.

### Python Implementation

```python
import requests
from typing import List, Dict

class LogisticsPlanner:
    def __init__(self):
        self.base_url = 'https://postal-pincode-api.vercel.app/api/v1'

    def get_pincode_details(self, pincode: str) -> Dict:
        """Get details for a pincode"""
        response = requests.get(f'{self.base_url}/pincode/{pincode}')
        data = response.json()
        return data['data'][0] if data['data'] else None

    def calculate_distance(self, origin: str, destination: str) -> float:
        """Calculate distance between two pincodes"""
        params = {'code1': origin, 'code2': destination}
        response = requests.get(f'{self.base_url}/distance', params=params)
        data = response.json()
        return data['data']['distance_km']

    def find_nearest_warehouse(self, customer_pincode: str,
                               warehouse_pincodes: List[str]) -> Dict:
        """Find the nearest warehouse to a customer"""
        distances = []

        for warehouse in warehouse_pincodes:
            try:
                distance = self.calculate_distance(warehouse, customer_pincode)
                distances.append({
                    'warehouse_pincode': warehouse,
                    'distance_km': distance
                })
            except Exception as e:
                print(f"Error calculating distance to {warehouse}: {e}")

        # Sort by distance
        distances.sort(key=lambda x: x['distance_km'])

        return distances[0] if distances else None

    def optimize_delivery_route(self, origin: str,
                                destinations: List[str]) -> List[Dict]:
        """
        Simple route optimization using nearest neighbor algorithm
        """
        route = []
        current = origin
        remaining = destinations.copy()

        while remaining:
            # Find nearest destination
            nearest = None
            min_distance = float('inf')

            for dest in remaining:
                distance = self.calculate_distance(current, dest)
                if distance < min_distance:
                    min_distance = distance
                    nearest = dest

            # Add to route
            route.append({
                'from': current,
                'to': nearest,
                'distance_km': min_distance
            })

            current = nearest
            remaining.remove(nearest)

        # Calculate total distance
        total_distance = sum(leg['distance_km'] for leg in route)

        return {
            'route': route,
            'total_distance_km': total_distance,
            'stops': len(route)
        }

# Usage Example
planner = LogisticsPlanner()

# Find nearest warehouse
warehouses = ['110001', '380001', '400001']  # Delhi, Ahmedabad, Mumbai
customer = '560001'  # Bangalore

nearest = planner.find_nearest_warehouse(customer, warehouses)
print(f"Nearest warehouse: {nearest['warehouse_pincode']}")
print(f"Distance: {nearest['distance_km']}km")

# Optimize delivery route
origin = '110001'  # Delhi warehouse
deliveries = ['110002', '110003', '110005', '110006']

route = planner.optimize_delivery_route(origin, deliveries)
print(f"\nOptimized route:")
print(f"Total distance: {route['total_distance_km']}km")
print(f"Number of stops: {route['stops']}")

for i, leg in enumerate(route['route'], 1):
    print(f"{i}. {leg['from']} → {leg['to']} ({leg['distance_km']}km)")
```

---

## Form Autocomplete

Implement smart pincode autocomplete in forms.

### React Component

```javascript
import React, { useState, useEffect } from "react";

function PincodeAutocomplete() {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPincode, setSelectedPincode] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://postal-pincode-api.vercel.app/api/v1";

  useEffect(() => {
    if (input.length >= 3) {
      const timer = setTimeout(() => {
        fetchSuggestions(input);
      }, 300);

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

  const selectPincode = async (pincode) => {
    setInput(pincode);
    setSuggestions([]);

    // Fetch full details
    try {
      const response = await fetch(`${API_BASE}/pincode/${pincode}`);
      const data = await response.json();
      setSelectedPincode(data.data[0]);
    } catch (error) {
      console.error("Error fetching pincode details:", error);
    }
  };

  return (
    <div className="pincode-autocomplete">
      <div className="input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter pincode..."
          maxLength="6"
        />
        {loading && <span className="loading">🔍</span>}
      </div>

      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((pincode) => (
            <li key={pincode} onClick={() => selectPincode(pincode)}>
              {pincode}
            </li>
          ))}
        </ul>
      )}

      {selectedPincode && (
        <div className="pincode-details">
          <h3>Selected Location</h3>
          <p>
            <strong>Pincode:</strong> {selectedPincode.pincode}
          </p>
          <p>
            <strong>Office:</strong> {selectedPincode.officeName}
          </p>
          <p>
            <strong>District:</strong> {selectedPincode.districtName}
          </p>
          <p>
            <strong>State:</strong> {selectedPincode.stateName}
          </p>
        </div>
      )}
    </div>
  );
}

export default PincodeAutocomplete;
```

### CSS Styling

```css
.pincode-autocomplete {
  position: relative;
  width: 300px;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.input-wrapper input:focus {
  outline: none;
  border-color: #4caf50;
}

.loading {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.suggestions li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.suggestions li:hover {
  background-color: #f5f5f5;
}

.pincode-details {
  margin-top: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.pincode-details h3 {
  margin-top: 0;
  color: #333;
}

.pincode-details p {
  margin: 8px 0;
  color: #666;
}
```

---

## Batch Processing

Process multiple pincodes efficiently.

### Node.js Script

```javascript
const fetch = require("node-fetch");
const fs = require("fs");

const API_BASE = "https://postal-pincode-api.vercel.app/api/v1";

async function batchProcessPincodes(pincodes) {
  // Split into chunks of 100 (API limit)
  const chunks = [];
  for (let i = 0; i < pincodes.length; i += 100) {
    chunks.push(pincodes.slice(i, i + 100));
  }

  const results = [];

  for (const chunk of chunks) {
    try {
      const response = await fetch(`${API_BASE}/pincode/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pincodes: chunk }),
      });

      const data = await response.json();
      results.push(data.data);

      // Respect rate limits
      await sleep(1000);
    } catch (error) {
      console.error("Batch processing error:", error);
    }
  }

  return Object.assign({}, ...results);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function exportToCSV(pincodes, filename) {
  const data = await batchProcessPincodes(pincodes);

  // Convert to CSV
  const rows = [];
  rows.push("Pincode,Office Name,District,State,Office Type");

  for (const [pincode, offices] of Object.entries(data)) {
    if (offices && offices.length > 0) {
      offices.forEach((office) => {
        rows.push(
          [
            pincode,
            office.officeName,
            office.districtName,
            office.stateName,
            office.officeType,
          ].join(",")
        );
      });
    }
  }

  fs.writeFileSync(filename, rows.join("\n"));
  console.log(`Exported ${rows.length - 1} records to ${filename}`);
}

// Usage
const pincodes = [
  "110001",
  "110002",
  "110003",
  "380001",
  "380002",
  "400001",
  "400002",
  "560001",
  "560002",
  "600001",
];

exportToCSV(pincodes, "pincodes.csv")
  .then(() => console.log("Export complete"))
  .catch((error) => console.error("Export failed:", error));
```

---

## Location-Based Service Finder

Find services near a user's location.

### JavaScript Implementation

```javascript
class ServiceFinder {
  constructor() {
    this.apiBase = "https://postal-pincode-api.vercel.app/api/v1";
  }

  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          });
        },
        (error) => reject(error)
      );
    });
  }

  async findNearbyPostOffices(radius = 10, limit = 10) {
    try {
      // Get user location
      const location = await this.getUserLocation();

      // Find nearby post offices
      const params = new URLSearchParams({
        lat: location.lat,
        long: location.long,
        radius: radius,
        limit: limit,
      });

      const response = await fetch(`${this.apiBase}/nearest?${params}`);
      const data = await response.json();

      return data.data.map((office) => ({
        name: office.officeName,
        pincode: office.pincode,
        distance: office.distance,
        address: `${office.districtName}, ${office.stateName}`,
      }));
    } catch (error) {
      console.error("Error finding services:", error);
      throw error;
    }
  }

  async displayNearbyServices() {
    try {
      const services = await this.findNearbyPostOffices(15, 5);

      console.log("📍 Nearby Post Offices:");
      services.forEach((service, index) => {
        console.log(`\n${index + 1}. ${service.name}`);
        console.log(`   Pincode: ${service.pincode}`);
        console.log(`   Distance: ${service.distance.toFixed(2)}km`);
        console.log(`   Address: ${service.address}`);
      });

      return services;
    } catch (error) {
      console.error("Failed to display services:", error);
    }
  }
}

// Usage
const finder = new ServiceFinder();
finder.displayNearbyServices();
```

---

## Best Practices Summary

1. **Debounce User Input**: Wait 300-500ms after user stops typing before making API calls
2. **Cache Results**: Store frequently accessed data locally
3. **Handle Errors Gracefully**: Always provide user-friendly error messages
4. **Respect Rate Limits**: Implement delays between batch requests
5. **Validate Input**: Check pincode format before making API calls
6. **Use Batch Endpoints**: Process multiple pincodes in single requests
7. **Progressive Enhancement**: Load data progressively (states → districts → offices)
8. **Optimize Performance**: Only fetch data when needed

## Next Steps

- Review [Error Handling](errors.md) for comprehensive error management
- Check [API Overview](overview.md) for rate limiting and caching strategies
- Explore specific [Endpoint Documentation](endpoints/pincode-operations.md)
