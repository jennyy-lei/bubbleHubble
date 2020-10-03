
function listenToVideo() {
    document.getElementById("video").addEventListener("timeupdate", function() {
        console.log(this.currentTime);

        var currTime = Math.floor((this.currentTime+1)/5)*5;
        console.log(currTime);
        var safe = testVidData[currTime / 5]["safe"];
        var low = testVidData[currTime / 5]["low"];
        var high = testVidData[currTime / 5]["high"];
         
        console.log(testVidData[currTime / 5]["safe"]);
        updateGraph(pie1, [safe, low, high]);
        updateGraph(line1,[1,2,3,4,5,6]);
    })
}

const testVidData = [
    {
        "timestamp": 0,
        "safe": 1,
        "low": 2,
        "high": 3
    },
    {
        "timestamp": 5,
        "safe": 4,
        "low": 7,
        "high": 11
    },
    {
        "timestamp": 10,
        "safe": 3,
        "low": 9,
        "high": 2
    }
]