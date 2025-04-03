// MAIN JS SCRIPT

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([51.4545, -2.5879], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map); // Base Layer
    
    // Array to store markers
    let markers = [];
    
    // Get DOM elements
    const searchBar = document.querySelector('.search-bar');
    const setLocationBtn = document.querySelector('.location-btn');
    const resetBtn = document.querySelector('.reset-btn');
    
    // Setup CORS Proxy
    const PROXY_URL = "https://api.allorigins.win/get?url=";
    const BRISTOL_API_URL = encodeURIComponent(
      "https://maps2.bristol.gov.uk/server2/rest/services/ext/boundaries/FeatureServer/0/query?where=1%3D1&outFields=NAME,AREA_CODE&outSR=4326&f=json"
    );
    
    // Function to add marker to map
    function addMarker(lat, lng, title = 'Marker') {
        const marker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`<b>${title}</b>`)
            .openPopup();
        markers.push(marker);
        return marker;
    }
    
    // Function to clear all markers
    function clearMarkers() {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];
    }
    
    // Function to search location and add marker
    function searchAndMarkLocation() {
        const location = searchBar.value.trim();
        if (!location) return;
        
        // Using Nominatim for geocoding (OpenStreetMap's search service)
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const firstResult = data[0];
                    const lat = parseFloat(firstResult.lat);
                    const lon = parseFloat(firstResult.lon);
                    
                    clearMarkers(); // Clear previous markers
                    addMarker(lat, lon, firstResult.display_name);
                    map.setView([lat, lon], 14); // Zoom to the location
                } else {
                    alert('Location not found!');
                }
            })
            .catch(error => {
                console.error('Error searching location:', error);
                alert('Error searching for location. Please try again.');
            });
    }
    
    // Event listeners
    setLocationBtn.addEventListener('click', searchAndMarkLocation);
    
    // Allow search on Enter key
    searchBar.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchAndMarkLocation();
        }
    });
    
    resetBtn.addEventListener('click', () => {
        clearMarkers();
        map.setView([51.4545, -2.5879], 12); // Reset to initial view
        searchBar.value = ''; // Clear search bar
    });
    
    // Fetch data with error handling
    fetch(PROXY_URL + BRISTOL_API_URL)
      .then(response => {
        if (!response.ok) throw new Error("API request failed"); // Check if the response is successful
        return response.json(); // Else return an error
      })
      
      // Process the API response
      .then(data => {
        const apiData = JSON.parse(data.contents); // Extract from proxy
        
        // Convert the data
        const geoJson = {
          type: "FeatureCollection",
          features: apiData.features.map(feature => ({
            type: "Feature",
            properties: feature.attributes,
            geometry: {
              type: "Polygon", // Convert the geometry rings to polygon
              coordinates: feature.geometry.rings
            }
          }))
        };
        
        // Adding boundaries to the map
        L.geoJSON(geoJson, {
          style: { color: '#1a73e8', weight: 2 }, // Change the colour
          onEachFeature: (feature, layer) => {
            layer.bindPopup(`<b>${feature.properties.NAME}</b>`); // On click, show a pop up on the screen
          }
        }).addTo(map); // Add the layer to the map
      })

      // Error handling fallback
      .catch(error => {
        console.error("Error:", error); // If fail, log error to the console

        // Fallback to show a red rectangle approximating Bristol boundaries
        const fallbackBounds = [[51.38, -2.72], [51.52, -2.48]];
        L.rectangle(fallbackBounds, {color: "red", weight: 1}).addTo(map)
          .bindPopup("Bristol (approximate boundary)<br>API failed to load") // Display an error message pop up
          .openPopup();
      });
});
