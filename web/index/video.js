
function listenToVideo() {
    document.getElementById("video").addEventListener("timeupdate", function() {
        console.log(this.currentTime);

        var currTime = Math.floor((this.currentTime+1)/5)*5;
        console.log(currTime);
        var safe = testVidData[currTime / 5]["safe"];
        var low = testVidData[currTime / 5]["low"];
        var high = testVidData[currTime / 5]["high"];
         
        console.log(testVidData[currTime / 5]["safe"]);
        updateGraph(pie1, [safe, low, high],0);

        var updatedData1 = line1.data.datasets[0].data
        updatedData1.push(high);
        updateGraph(line1,updatedData1,0)

        var updatedData2 = line1.data.datasets[1].data
        updatedData2.push(low);
        updateGraph(line1,updatedData2,1)

        var updatedData3 = line1.data.datasets[2].data
        updatedData3.push(safe);
        updateGraph(line1,updatedData3,2)
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