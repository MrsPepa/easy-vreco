function initMap() {
  var osaka = {lat: 34.6937400, lng: 135.5021800};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 6,
    center: osaka
  });
  var marker = new google.maps.Marker({
    position: osaka,
    map: map
  });
  
};


  function buscar() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  };

document.getElementById("encuentrame").addEventListener("click", buscar);
var latitud,longitud;
  function funcionExito() {
    var funcionExito = function(posicion) {
      latitud = posicion.coords.latitude;
      longitud = posicion.coords.longitude;
    }
    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      map: map,
    });
    map.setZoom(18);
    map.setCenter({lat:latitud, lng:longitud});
  };

  function funcionError() {
    var funcionError = function(error) {
      alert("Tenemos un problema con encontrar tu ubicación");
    }
  }
