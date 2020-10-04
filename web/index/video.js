function callApi() {
    call(update);

    const interval = setInterval(function() {
        call(update);
    }, 2000);

    function call(callback) {
        fetch(`http://52.139.37.93:7777/api`, {cache: 'no-cache'})
        .then(response => {
            return response.json();
        })
        .then(json => {
            callback(json);
        })
        .catch(e => {
            console.log(e);
        });
    }

    function update(json) {
        console.log(json);

        var safe = json["safe"];
        var low = json["low"];
        var high = json["high"];
        
        if (!high && !low && !safe)
            updateGraph(pie1, [high, low, safe, 1e-11],0);
        else
            updateGraph(pie1, [high, low, safe],0);
            

        console.log(safe, low, high)
        var temp = line1.data.datasets[0].data
        temp = temp.slice(1,temp.length)
        temp.push(high)
        updateGraph(line1,temp,0);

        var temp2 = line1.data.datasets[1].data
        console.log(temp2)
        temp2 = temp2.slice(1,temp2.length)
        temp2.push(low)
        updateGraph(line1,temp2,1); 

        var temp3 = line1.data.datasets[2].data
        temp3 = temp3.slice(1,temp3.length)
        temp3.push(safe)
        updateGraph(line1,temp3,2);

        newLabels = line1.data.labels;  
        for (i = 0;i<newLabels.length;i++){
            newLabels[i]+=2; 
        }
        line1.data.labels = newLabels


        document.getElementById('pie1-legend').innerHTML = pie1.generateLegend();
        document.getElementById('line1-legend').innerHTML = line1.generateLegend();
    }
}
