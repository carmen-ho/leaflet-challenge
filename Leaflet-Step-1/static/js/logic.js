// act 1 - 10, act 2 - 1 logic 4, 

// Your data markers should reflect the magnitude of the earthquake by their size 
//and and depth of the earth quake by color. 

//Earthquakes with higher magnitudes 
//should appear larger and earthquakes with greater depth should appear darker in color.
// HINT the depth of the earth can be found as the third coordinate for each earthquake.


// Include popups that provide additional information about the earthquake 
//when a marker is clicked.


var myMap = L.map("mapid", {
  center: [39.8283,-98.5795],
  zoom: 5
  //layers: [lightmap, earthquake]
});



//Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

  
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
  
//var earthquake = 

d3.json(url, function(response) {
  
  //console.log(response);
  function style(feature) {
    return {
      
      color: "#FFFFFF",
      fillColor: chooseColor(feature.geometry.coordinates[2]),
      fillOpacity: 0.5,
      opacity: 1,
      radius: chooseSize(feature.properties.mag),
      stroke: true,
      weight: 1.5
    };
  }

  function chooseColor(depth) {
    switch (depth) {
    case depth > 90:
      return "#FF0000";
    case depth > 70 :
      return "#FFA500";
    case depth > 50:
      return "#FFD580";
    case depth > 30:
      return "#FFFF00";
    case depth > 10:
      return "#AEF359";
    default:
      return "#90ee90";
    }
  }

  function chooseSize(magnitude) {
    return magnitude * 5;
  }

//L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]),

//var earthquake = 
L.geoJSON(response, {
  pointToLayer: function(feature, latlng) {
    //console.log(feature)
    return L.circleMarker(latlng);
  },

  style: style,
  onEachFeature: function(feature, layer) { 
    layer.bindPopup("Magnitude:" + feature.properties.mag +
    "<br>Depth: " + feature.geometry.coordinates[2]);
}
}).addTo(myMap);



// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",    maxZoom: 18,    id: "light-v10",    accessToken: API_KEY     });

// var baseMaps = {
//   "Light Map": lightmap
// };

// var overlayMaps = {
// Earthquakes: earthquake
// };

// });

  //Set up the legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [-10,10,30,50,70,90];
    var colors = ["#90ee90","#FF0000","#FFFF00","#FFD580","#FFA500","#FF0000"];

    for (var i = 0; i < limits.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + limits[i] + (limits[i + 1] ? "&ndash;" + limits[i + 1] + "<br>" : "+");
    }
    return div;
  };

  legend.addTo(myMap);
  
  // var location = response[i].geometry;
    
  //       if (location) {
  //         L.marker([geometry.coordinates[1], geometry.coordinates[0]]).addTo(myMap);
  //       }
  //     }

// L.control.layers(baseMaps, overlayMaps, {
//   collapsed: false
// }).addTo(myMap);



});









