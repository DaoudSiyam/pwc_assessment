
// // ACTIVATOR FUNCTION
// function initMap() {
//     map = new OpenLayers.Map("viewDiv");

//     map.addLayer(new OpenLayers.Layer.OSM());

//     var markers = new OpenLayers.Layer.Markers("Markers");
//     map.addLayer(markers);

//     var lonLatcenter = new OpenLayers.LonLat(35.930359,31.963158)
//         .transform(
//             new OpenLayers.Projection("EPSG:4326"),
//             map.getProjectionObject()
//         );
//     var zoom = 8;
//     map.setCenter(lonLatcenter, zoom);

//     console.log("thats my dude")
// }

// initMap();

// Create a map instance
const map = new ol.Map({
    target: 'viewDiv',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([35.930359, 31.963158]),
      zoom: 12,
    }),
  });
  
  // Function to handle geocoding and marker placement
function geocodeAndPlaceMarker(city) {
    const apiKey = 'kfuNYfZnmJtoc9yKFIQbNPZRXhhlKmRdUy92UXUI';
    
    $.ajax({
      method: 'GET',
      url: 'https://api.api-ninjas.com/v1/city?name=' + city,
      headers: { 'X-Api-Key': 'kfuNYfZnmJtoc9yKFIQbNPZRXhhlKmRdUy92UXUI'},
      contentType: 'application/json',
      success: function(data) {
        console.log(data)
          // Retrieve the coordinates from the API response
        const lat = data[0].latitude
        console.log(lat)

        const lon = data[0].longitude
        console.log(lon)
  
        // Create a marker at the retrieved coordinates
        const marker = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
        });
  
        // Create a vector layer to display the marker
        const vectorLayer = new ol.layer.Vector({
          source: new ol.source.Vector({
            features: [marker],
          }),
        });
  
        // Add the vector layer to the map
        map.addLayer(vectorLayer);
  
        // Center the map on the marker
        map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));
        map.getView().setZoom(12);
      },
      error: function ajaxError(jqXHR) {
          console.error('Error: ', jqXHR.responseText);
      }
    });

    
    //  // console.log(city)
    // // Send a request to the Geocoding Ninjas API
    // fetch(`https://geocoding.ninjasapi.com/geocode?city?name=${city}&key=${apiKey}`)
    // .then((response) => response.json())
    // .then((data) => {
    //     // Retrieve the coordinates from the API response
    //     const { lat, lon } = data[0];
  
    //     // Create a marker at the retrieved coordinates
    //     const marker = new ol.Feature({
    //       geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    //     });
  
    //     // Create a vector layer to display the marker
    //     const vectorLayer = new ol.layer.Vector({
    //       source: new ol.source.Vector({
    //         features: [marker],
    //       }),
    //     });
  
    //     // Add the vector layer to the map
    //     map.addLayer(vectorLayer);
  
    //     // Center the map on the marker
    //     map.getView().setCenter(ol.proj.fromLonLat([lon, lat]));
    //     map.getView().setZoom(10);
    // })
    // .catch((error) => {
    //     console.log('Error:', error);
    // });  
}   
  
// Function to handle user input
function handleInput() {
    const cityInput = document.getElementById('city-input').value;
    geocodeAndPlaceMarker(cityInput);
}
  
// Event listener for the submit button
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', handleInput);