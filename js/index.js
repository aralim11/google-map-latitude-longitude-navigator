function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById('latitude').value = position.coords.latitude;
    document.getElementById('longitude').value = position.coords.longitude;
}

getLocation();

function initMap() {
    var $latitude = document.getElementById('latitude');
    var $longitude = document.getElementById('longitude');
    var latitude = $latitude.value;
    var longitude = $longitude.value;
    var zoom = 13;
    
    var LatLng = new google.maps.LatLng(latitude, longitude);
    
    var mapOptions = {
        zoom: zoom,
        center: LatLng,
        panControl: false,
        zoomControl: false,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }	
    
    var map = new google.maps.Map(document.getElementById('map'),mapOptions);
    
    var marker = new google.maps.Marker({
        position: LatLng,
        map: map,
        title: 'Drag Me!',
        draggable: true
    });
    
    google.maps.event.addListener(marker, 'dragend', function(marker){
        var latLng = marker.latLng;
        $latitude.value = latLng.lat();
        $longitude.value = latLng.lng();
    });	
}

setTimeout(function() {
    initMap();
}, 300);