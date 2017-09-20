// the map 
var map;

var placesOfInterest = {
    tokyo: [
        {
            name: 'Tokyo Skytree',
            coOrdinates: {
                lat: 35.710063,
                lng: 139.8107,
            },
            fid: '4b569977f964a520551628e3'

        },
        {
            name: 'Tokyo DisneyLand',
            coOrdinates: {
                lat: 35.632896,
                lng: 139.880394,
            },
            fid: '4b59ebdaf964a52002a128e3'
        },
        {
            name: 'Tokyo Tower',
            coOrdinates: {
                lat: 35.65857,
                lng: 139.745484,
            },
            fid: '4b56a5e8f964a5208e1728e3'
        },
        {
            name: 'Roppongi',
            coOrdinates: {
                lat: 35.664122,
                lng: 139.729426,
            },
            fid: '4b0587a6f964a520529e22e3'
        },
        {
            name: 'Meiji Shrine',
            coOrdinates: {
                lat: 35.676085,
                lng: 139.700707,
            },
            fid: '4b5bd0a2f964a520c31729e3'
        }
    ]
};

// function that calls the map from its starting point
function initMap() {

    //map that loads at the start co-ordinates mentioned
    map = new google.maps.Map(document.getElementById('map'), {
        center: placesOfInterest.tokyo[0].coOrdinates,
        zoom: 11
    });

    ko.applyBindings(new viewModel());
}

function googlemapserror() {
    var a = confirm("GOOGLE MAPS FAILED TO LOAD. TRY REALOADING THE PAGE");
    if (a===true) {
        window.location.reload(true); 
    } else {
        alert('COME BACK AFTER SOME TIME');
    }
}

function viewModel () {
    var self = this;

    // array for markers of tokyo
    self.markersTokyo = ko.observableArray([]);
    
    // Define the infowindow that opens when a marker is clicked
    var infowindow = new google.maps.InfoWindow();


    function animateMarker() {
        var marker = this;
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
           marker.setAnimation(null);
        }, 1500);
        populateInfoWindow(marker, infowindow);
    }

    // Add markers for all the locations in tokyo
    for (var i=0; i<placesOfInterest.tokyo.length; i++){
        var position = placesOfInterest.tokyo[i].coOrdinates;
        var title = placesOfInterest.tokyo[i].name;
        var fid = placesOfInterest.tokyo[i].fid;
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            map : map,
            id: 1,
            animation: google.maps.Animation.DROP,
            fid: fid,                   // foursquare location id 
            rating: "",                 // found from json
            url: "",                    // found from json 
            photoPrefix: "",
            photoSuffix: ""
        });
        
        // push marker to the markersTokyo array
        self.markersTokyo.push(marker); 

        // create an on click event listner for each marker
        marker.addListener('click', animateMarker);
    }

    this.resetMap = function () {
        // var reset = window.location.href;
        location.reload();
    };

    // function to show all the markers
    this.showMarkers = function() {
        for (var i=0; i<self.markersTokyo().length; i++){
            self.markersTokyo()[i].setMap(map);
        }
    };

    // function to hide all the markers
    this.hideMarkers = function() {
        for (var i=0; i<self.markersTokyo().length; i++){
            self.markersTokyo()[i].setMap(null);
        }
    };

    // hide marker
    this.hideMarker = function(marker) {
        marker.setMap(null);
    };

    // function to focus only the marker selected from list
    this.focusSelected = function(data) {
        for (var i=0; i<self.markersTokyo().length; i++) {
            if(data == self.markersTokyo()[i].title) {
                infowindow.open(map, self.markersTokyo()[i]);
                populateInfoWindow(self.markersTokyo()[i], infowindow);
                self.markersTokyo()[i].setAnimation(google.maps.Animation.DROP);
                map.setCenter(placesOfInterest.tokyo[i].coOrdinates);
                map.setZoom(18);
            }
        }
    };

    // ================================ FILTER ============================ //

    self.filterText = ko.observable('');

    self.locationsList = ko.observableArray();
    for (var a=0; a<self.markersTokyo().length; a++) {
        self.locationsList.push(self.markersTokyo()[a].title);
    }

    this.filterList = ko.computed(function() {
        var filterText = self.filterText().toLowerCase(); // case-insensitive search
        if (!filterText) { // if no user input
            return self.locationsList(); // return the full list
        } else { // if user input
            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
            c = [];
            for (var i=0; i<self.locationsList().length; i++) {
                // console.log(self.locationsList()[i].toLowerCase().indexOf(filterText.toLowerCase()) > -1);
                if (self.locationsList()[i].toLowerCase().indexOf(filterText.toLowerCase()) > -1) {
                    c.push(self.locationsList()[i]);
                }
            }
            return c; // instead return a matching subset of location objects
        }
    });

    this.applyFilter = function () {
        currentFilterText = self.filterText();
        if(currentFilterText === '') {
            self.showMarkers();
        } else {
            for (var i=0; i<self.markersTokyo().length; i++) {
                if (self.markersTokyo()[i].title.toLowerCase().indexOf(currentFilterText.toLowerCase()) > -1 ) {
                    self.markersTokyo()[i].setAnimation(google.maps.Animation.DROP);
                } else {
                    self.markersTokyo()[i].setMap(null);
                }
            }
        }
    };


    // ==================================================================== //

    // function to display info in infoWindow
    function populateInfoWindow(marker, infowindow) {
        // check to see if infowindow is not alredy opened on this marker
        if(infowindow.marker != marker) {
            infowindow.marker = marker;

            // Request Data from foursquareApi
            $.ajax({
                url: 'https://api.foursquare.com/v2/venues/' + marker.fid + '?client_id=E0EL5HYSWI5AZBOEUEC2GJAK2SQYUB0VN1LVBO32F1NI3RZY&client_secret=K13YNXEZYYX42MODPO1YNFFYONNX2KEJ0N0EH4UCTULOE5X1&v=20160614', 
                dataType: 'json',
                success: function (data) {
                    var result = data.response.venue;

                    var bestPhoto = result.hasOwnProperty('bestPhoto') ? result.bestPhoto : '';
                    if (bestPhoto.hasOwnProperty('prefix')) {
                        marker.photoPrefix = bestPhoto.prefix;
                    }

                    if (bestPhoto.hasOwnProperty('suffix')) {
                        marker.photoSuffix = bestPhoto.suffix;
                    }
                    
                    var rating = result.hasOwnProperty('rating') ? result.rating : '';
                    marker.rating = rating;

                    var url = result.hasOwnProperty('shortUrl') ? result.shortUrl : '';
                    marker.url = url;

                    infowindow.setContent('<div><h3>' + marker.title + '</h3></div>' + 
                    '<div id="pic"><img src="' +
                    marker.photoPrefix + '110x110' + marker.photoSuffix +
                    '" alt="Image Location"></div>' +
                    '<div><h5>Ratings: ' + marker.rating + '</h5></div>' + 
                    '<div><a href="' + marker.url + '">Explore on <strong>FOURSQUARE</strong></a></div>' 
                    );
                    map.setCenter(marker.position);
                    map.setZoom(18);
                    infowindow.open(map, marker);
                    // make sure the marker property is cleared after if infowindow is closed
                    infowindow.addListener('closeclick', function() {
                        map.setCenter(placesOfInterest.tokyo[0].coOrdinates);
                        map.setZoom(11);
                        infowindow.close(map, marker);
                    });

                },
                error: function(e) {
                    alert("Foursquare data is unavailable. Please try again later.");
                }
            });
        }
    }
}