function initMap() {
  var osaka = {lat: 34.6937400, lng: 135.5021800};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: osaka,
    mapTypeControl: false,
    zoomControl: false,
    streetViewControl: false,
    mapTypeId: 'roadmap'
  });
  var marker = new mapIcons.Marker({
    position: osaka,
    map: map,
    animation: google.maps.Animation.DROP,
    draggable: true,
    icon: {
      path: mapIcons.shapes.MAP_PIN,
      fillColor: 'teal',
      fillOpacity: 1,
      strokeColor: '',
      strokeWeight: 0
    },
    map_icon_label: '<span class="map-icon map-icon-bicycle-store"></span>'
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

    var miUbicacion = new mapIcons.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map,
      icon: {
        path: mapIcons.shapes.MAP_PIN,
        fillColor: 'teal',
        fillOpacity: 1,
        strokeColor: '',
        strokeWeight: 0
      },
      map_icon_label: '<span class="map-icon map-icon-bicycle-store"></span>'
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
        var star = response.routes[0].legs[0].start_location;
        var end = response.routes[0].legs[0].end_location;
        function makeMark(ev) {
          new mapIcons.Marker({
            position: ev,
            animation: google.maps.Animation.DROP,
            map: map,
            icon: {
              path: mapIcons.shapes.MAP_PIN,
              fillColor: 'teal',
              fillOpacity: 1,
              strokeColor: '',
              strokeWeight: 0
            },
            map_icon_label: '<span class="map-icon map-icon-bicycle-store"></span>'
          });
        }
        makeMark(star);
        makeMark(end);
        console.log(star);
      } else {
        window.alert("No encontramos una ruta.");
      }
    });
  }
  directionsDisplay.setMap(map);
  directionsDisplay.setOptions({ suppressMarkers: true });
  var trazarRuta = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);
};



