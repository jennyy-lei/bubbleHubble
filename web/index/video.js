
function listenToVideo() {
    document.getElementById("video").addEventListener("timeupdate", function() {
        console.log(this.currentTime);

        var currTime = Math.floor((this.currentTime+1)/5)*5;
        updateGraph(line1,[1,2,3,4,5,6,7])
    })
}