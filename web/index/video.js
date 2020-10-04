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
        updateGraph(pie1, [high, low, safe],0);
        // // line1.data.datasets[0].data.push(dataNew[i]);
        // // line1.data.datasets[1].data.push(dataNew[i]);
        // // line1.data.datasets[2].data.push(dataNew[i]);
        // // line1.data.labels
        console.log(high, low, safe)
        var temp = line1.data.datasets[0].data
        temp.push(high)
        updateGraph(line1,temp,0);

        var temp2 = line1.data.datasets[1].data
        temp.push(low)
        updateGraph(line1,temp2,1);

        var temp3 = line1.data.datasets[2].data
        temp.push(safe)
        updateGraph(line1,temp3,2);

        // // updateGraph(line1, []);

        document.getElementById('pie1-legend').innerHTML = pie1.generateLegend();
        // document.getElementById('line1-legend').innerHTML = line1.generateLegend();
    }
}
