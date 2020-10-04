var pie1;
var line1;

var chartOptions = (generateList) => {
    var res = {
        responsive: true,
        maintainAspectRatio: false,
        // cutoutPercentage: 80,
        legend: false
    };
    
    if (generateList) {
        res.legendCallback = function(chart) {
            return `
            <ul class="chart-legend">
            ${generateList(chart)}
            </ul>
            `;
        }
    }
    
    return res;
}

var pieData = (hi, med, low) => {
    return [{
        data: [hi, med, low],
        backgroundColor: [
            'rgba(179, 16, 16, 0.2)',
            'rgba(247, 236, 22, 0.2)',
            'rgba(40, 171, 10, 0.2)'
        ],
        borderColor: [
            'rgba(171, 0, 0, 1)',
            'rgba(245, 212, 0, 1)',
            'rgba(18, 77, 5, 1)'
        ],
        borderWidth: 1
    }];
}

function initChart(ctx, type, labels, datasets, options) {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: options
    })
}

function initCharts() {
    pie1 = initChart(
        document.getElementById('pie1').getContext('2d'),
        'doughnut',
        ['High Risk', 'Medium Risk', 'Low Risk'],
        pieData(3, 2, 1),
        chartOptions((chart) => {
            var str = '';
            for (var i=0; i<3; ++i) {
                str += `
                <li>
                    <span style="
                        background-color: ${chart.data.datasets[0].backgroundColor[i]};
                    ">${chart.data.datasets[0].data[i]}</span>
                    ${chart.data.labels[i] ? chart.data.labels[i] : ''}
                </li>
                `
            }
            return str;
        })
    );
    document.getElementById('pie1-legend').innerHTML = pie1.generateLegend();

    line1 = initChart(
        document.getElementById('line1').getContext('2d'),
        'line',
        [0, 2, 4, 6, 8,10],
        [{
            label: 'High Risk',
            data: [1, 1, 1, 1, 1],
            borderColor: 'rgba(179, 16, 16, 1)',
            backgroundColor:'rgba(0, 0, 0, 0)',
            borderWidth: 1
        },{
            label: 'Medium Risk',
            data: [2, 2, 2, 2, 2],
            borderColor: 'rgba(247, 236, 22, 1)',
            backgroundColor:'rgba(0, 0, 0, 0)',
            borderWidth: 1
        },{
            label: 'Safe',
            data: [0, 0, 0, 0, 0],
            borderColor: 'rgba(40, 171, 10, 1)',
            backgroundColor:'rgba(0, 0, 0, 0)',
            borderWidth: 1
        }
        ],
        chartOptions((chart) => {
            var color = ['rgba(179, 16, 16, 0.2)', 'rgba(247, 236, 22, 0.2)', 'rgba(40, 171, 10, 0.2)'];
            var str = '';
            for (var i=0; i<chart.data.datasets.length; ++i) {
                str += `
                <li>
                    <span style="background-color: ${color[i]};">
                    ${chart.data.datasets[i].data[chart.data.datasets[i].data.length - 1]}</span>
                    ${chart.data.datasets[i].label ? chart.data.datasets[i].label : ''}
                </li>
                `
            }
            return str;
        })
    );
}

function updateGraph(graph, dataNew,i){
    graph.data.datasets[i].data = dataNew;
    graph.update(0);
}
