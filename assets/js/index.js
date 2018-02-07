function initMap() {
  var osaka = {lat: 34.6937400, lng: 135.5021800};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: osaka,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false
  });
  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    position: osaka,
    map: map
  });
  function buscar() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  document.getElementById("encuentrame").addEventListener("click", buscar);
  var latitud,longitud;
  var funcionExito = function(posicion) {
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map
    });
    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
    }
  var funcionError = function(error) {
    alert("Tenemos un problema con encontrar tu ubicación");
  }
  //autocompletado
  var origen = (document.getElementById("inputOrigen"));
  var destino = document.getElementById("inputDestino");
  new google.maps.places.Autocomplete(origen);
  new google.maps.places.Autocomplete(destino);

  //trazar ruta
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
    directionsService.route({
      origin: origen.value,
      destination: destino.value,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if(status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert("No encontramos una ruta.");
      }
    });
  }
  directionsDisplay.setMap(map);
  var trazarRuta = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);

};



