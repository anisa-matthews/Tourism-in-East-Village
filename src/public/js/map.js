const xhr = new XMLHttpRequest();
xhr.open('GET', '/:slug');

function initMap(la, lon) {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: la, lng: lon},
    zoom: 8
  });
}

xhr.addEventListener('load', function() {
  const response = xhr.responseText;
  console.log(response);
  initMap('-34.397','150.644');
});