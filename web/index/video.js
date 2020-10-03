function listenToVideo() {
    document.getElementById("video").addEventListener("timeupdate", function() {
        console.log(this.currentTime);

        // do something with current time (in seconds)
    })
}