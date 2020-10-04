var pie1;
var pie2;
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
            for (var i=0; i<chart.data.datasets[0].data.length; ++i) {
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

    pie2 = initChart(
        document.getElementById('pie2').getContext('2d'),
        'doughnut',
        ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        [{
            data: [1, 1, 1],
            backgroundColor: [
                'rgba(0, 18, 68, 0.2)',
                'rgba(0, 80, 134, 0.2)',
                'rgba(49, 143, 181, 0.2)',
                'rgba(176, 202, 199, 0.2)',
                'rgba(164, 218, 210, 0.2)',
                'rgba(247, 214, 191, 0.2)'
            ],
            borderColor: [
                'rgba(0, 18, 68, 1)',
                'rgba(0, 80, 134, 1)',
                'rgba(49, 143, 181, 1)',
                'rgba(176, 202, 199, 1)',
                'rgba(164, 218, 210, 1)',
                'rgba(247, 214, 191, 1)'
            ],
            borderWidth: 1
        }],
        chartOptions(false)
    );
    
    line1 = initChart(
        document.getElementById('line1').getContext('2d'),
        'line',
        [0, 1, 3, 4, 5,7,9,11,13,15,17,19,21,23,25],
        [{
            label: 'High Risk',
            data: [1, 1, 1, 1, 1],
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1
        },{
            label: 'Medium Risk',
            data: [2, 2, 2, 2, 2],
            borderColor: 'rgba(255, 255, 0, 1)',
            borderWidth: 1
        },{
            label: 'Safe',
            data: [0, 0, 0, 0, 0],
            borderColor: 'rgba(0, 255, 0, 1)',
            borderWidth: 1
        }
    ],
        chartOptions((chart) => {
            var str = '';
            for (var i=0; i<chart.data.datasets; ++i) {
                str += `
                <li>
                    <span style="
                        background-color: ${chart.data.datasets[i].backgroundColor};
                    ">${chart.data.datasets[i].data[chart.data.datasets[i].data.length - 1]}</span>
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
