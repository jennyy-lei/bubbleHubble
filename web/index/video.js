function callApi() {
    console.log("calling api!");

    const interval = setInterval(function() {
        call();
    }, 3000);

    clearInterval(interval);

    function call() {
        fetch("http://52.139.37.93:7777/api")
        .then(response => {
        //     return response.json();
        // })
        // .then(json => {
            console.log(response);
        });

        document.getElementById("camera").addEventListener("timeupdate", function() {
            console.log(this.currentTime);

            // var currTime = Math.floor((this.currentTime+1)/5)*5;
            // var currTime = Math.floor(this.currentTime);
            // console.log(data[currTime]);
            // var safe = data[currTime]["safe"];
            // var low = data[currTime]["low"];
            // var high = data[currTime]["high"];
            
            // // console.log(data[currTime]["safe"]);
            // updateGraph(pie1, [[high, low, safe]]);
            // // updateGraph(line1,[1,2,3,4,5,6]);
            // // line1.data.datasets[0].data.push(dataNew[i]);
            // // line1.data.datasets[1].data.push(dataNew[i]);
            // // line1.data.datasets[2].data.push(dataNew[i]);
            // // line1.data.labels
            // // updateGraph(line1, []);

            // document.getElementById('pie1-legend').innerHTML = pie1.generateLegend();
            // document.getElementById('line1-legend').innerHTML = line1.generateLegend();
        });
    }
}