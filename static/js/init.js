function metersToMiles(meters){
  return (meters / 1609).toPrecision(3);
}

function metersToFeet(meters){
  return formatNumber(Math.round(meters * 3.2808399));
}

function formatNumber(number) {
  var number = number.toFixed(2) + '';
  var x = number.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

var map = L.map('map',{ zoomControl: false }).setView([21.325, -157.75], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmF0ZWx1em9kIiwiYSI6IjVjZmQ2MWQ3ZWQ4ZjE1ZmQyNGIyMDE2NzYyYjcxYTJmIn0.fvcRGbiWe5B23XmByp05mQ', {
  maxZoom: 100,
  id: 'mapbox.run-bike-hike'
}).addTo(map);

new L.Control.Zoom({ position: 'topright' }).addTo(map);

for (var i = 0; i < files.length; ++i) {
  new L.GPX("static/gpx/" + files[i], {async: true}).on('loaded', function(e) {}).addTo(map).on('click', function(){
    document.getElementById('track-name').innerHTML = this.get_name();
    document.getElementById('track-distance').innerHTML = metersToMiles(this.get_distance()) + " miles";
    document.getElementById('track-elevation-gain').innerHTML = metersToFeet(this.get_elevation_gain()) + " feet";
    document.getElementById('track-elevation-loss').innerHTML = metersToFeet(this.get_elevation_loss()) + " feet";
    console.log(this.get_elevation_data());
  });    
}