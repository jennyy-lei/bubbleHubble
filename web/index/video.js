function callApi() {
    call(update);

    const interval = setInterval(function() {
        call(update);
    }, 3000);

    function call(callback) {
        fetch(`http://52.139.37.93:7777/api`, {cache: 'no-cache'})
        .then(response => {
            return response.json();
        })
        .then(json => {
            callback(json);
        });
    }

    function update(json) {
        console.log(json);

        // var currTime = Math.floor((this.currentTime+1)/5)*5;
        // var currTime = Math.floor(this.currentTime);
        // console.log(data[currTime]);
        var safe = json["safe"];
        var low = json["low"];
        var high = json["high"];
        
        // // console.log(data[currTime]["safe"]);
        updateGraph(pie1, [high, low, safe]);
        // // updateGraph(line1,[1,2,3,4,5,6]);
        // // line1.data.datasets[0].data.push(dataNew[i]);
        // // line1.data.datasets[1].data.push(dataNew[i]);
        // // line1.data.datasets[2].data.push(dataNew[i]);
        // // line1.data.labels
        // // updateGraph(line1, []);

        document.getElementById('pie1-legend').innerHTML = pie1.generateLegend();
        // document.getElementById('line1-legend').innerHTML = line1.generateLegend();
    }
}
