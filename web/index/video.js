
function listenToVideo() {
    document.getElementById("video").addEventListener("timeupdate", function() {
        console.log(this.currentTime);

        var currTime = Math.floor((this.currentTime+1)/5)*5;;
        console.log(currTime);

        console.log(testVidData[currTime/5]);
        // do something with current time (in seconds)
    })
}