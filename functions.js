var NodeGeocoder = require('node-geocoder');
var request = require('request');

//broken
//var elevationApi = require('google-elevation-api');

var google = require('./google.config')
var geocoder = NodeGeocoder(google.geocode);

function getLocations(addresses) {
    return new Promise((resolve, reject) => {
        var locations = [];
        addresses.forEach(function (address) {
            console.log('about to geocode address', address);
            geocoder.geocode(address, function (err, res) {
                if (err) {
                    reject(err);
                }

                locations.push({ address: address, location: { latitude: res[0].latitude, longitude: res[0].longitude } });

                if (locations.length == addresses.length) {
                    resolve(locations);
                }
            });
        });
    });
}

function getElevations(locations) {
    return new Promise((resolve, reject) => {
        var url = google.elevation.url + "?key=" + google.elevation.apiKey;
        var locationString = "&locations=";
        for (var i = 0; i < locations.length; i++) {
            locationString = locationString + locations[i].location.latitude + ", " + locations[i].location.longitude;
            locationString = (i != locations.length - 1) ? locationString + "|" : locationString;
        }

        request(url + locationString, function (error, response, body) {
            if (body) {
                var resp = JSON.parse(body);
                if (resp.results && resp.results.length > 0) {

                    for (var i = 0; i < resp.results.length; i++) {
                        locations[i].elevation = resp.results[i].elevation;
                    }
                    resolve(locations);
                }
            }
        });
    });
}

module.exports.getElevationForAddresses = (addresses) => {
    return new Promise((resolve, reject) => {

        getLocations(addresses).then(locations => {
            console.log('locations', locations);

            getElevations(locations).then(elevations => {
                    resolve(elevations);
            }, err => {
                reject(err);
            })
        }, err => {
            reject(err);
        });
    });
}

module.exports.bubbleSort = (a) => {
    console.log("\n** BUBBLE SORT DESC **\n");
    //get length of array
    var n = a.length;

    //iterate through array
    for (var i = 0; i < n; i++) {
        //keep track of swaps for this iteration
        var swapCount = 0;

        // iterate the rest of array with i pointer
        for (var j = 0; j < n - 1; j++) {
            // if the current index is less than 1 ahead (desc)
            if (a[j].elevation < a[j + 1].elevation) {
                //swap higher to right side
                swap(j, j + 1, a);
                //note we made swaps
                swapCount++;
            }
        }
        //if no swaps happened, the array is sorted
        if (swapCount == 0) {
            break;
        }
    }
    return a;
}

function swap(firstIndex, secondIndex, a) {
    var temp = a[firstIndex];
    a[firstIndex] = a[secondIndex];
    a[secondIndex] = temp;
}

// broken impl
// function getElevations(locations) {
//     return new Promise((resolve, reject) => {

//         elevationApi({
//             key: google.elevation,
//             locations: locations
//         }, function(err, elevations) {
//             if(err) {
//                 reject(err);
//             }
//             resolve(elevations);
//         });

//     });
// }