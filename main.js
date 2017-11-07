const ADDRESSES = require('./ADDRESSES.const')
var func = require('./functions');

// Generate our results
func.getElevationForAddresses(ADDRESSES).then(geoResults => {
    console.log("Results");
    console.log(geoResults)
    
// Sort results descending order by elevation
   var sorted = func.bubbleSort(geoResults);
   console.log(sorted);

   console.log("DONE! :)");
}, err => {
    console.log('Error!', err);
});
