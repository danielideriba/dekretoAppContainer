//Google Maps Functions
function initMap() {
  var myLat = document.getElementById('lat').value;
  var myLng = document.getElementById('lng').value;

  console.log(myLat);

  var myLatlng = new google.maps.LatLng(myLat, myLng);
  var mapOptions = {
    zoom: 15,
    center: myLatlng,
    mapTypeId: 'terrain'
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);

  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: myLatlng
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
