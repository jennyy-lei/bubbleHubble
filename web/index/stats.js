var pie1;
var pie2;
var line1;
var line2;

var chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    // cutoutPercentage: 80,
    legend: {
        display: false
    }
}

var pieData = (low, med, hi) => {
    return [{
        data: [low, med, hi],
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

function initChart(ctx, type, labels, datasets) {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        },
        options: chartOptions
    })
}

function initCharts() {
    pie1 = initChart(
        document.getElementById('pie1').getContext('2d'),
        'doughnut',
        ['High Risk', 'Medium Risk', 'Low Risk'],
        pieData(1, 1, 1)
    );

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
        }]
    );
    
    line1 = initChart(
        document.getElementById('line1').getContext('2d'),
        'line',
        ['1','2','3','4'],
        [{
            data: [0],
            backgroundColor: [
                'rgba(255, 0,0,0)',
            ],
            borderColor: [
                'rgba(255,0,0, 1)',
            ],
            borderWidth: 1
        },
        {
            data: [0],
            backgroundColor: [
                'rgba(255, 255,0,0)',
            ],
            borderColor: [
                'rgba(255,255,0, 1)',
            ],
            borderWidth: 1
        },
        {
            data: [0],
            backgroundColor: [
                'rgba(0, 255,0,0)',
            ],
            borderColor: [
                'rgba(0,255,0, 1)',
            ],
            borderWidth: 1
        }]
    );

    line2 = initChart(
        document.getElementById('line2').getContext('2d'),
        'line',
        ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        [{
            data: [0, 0, 0],
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
        }]
    );
}

function updateGraph(graph,dataNew,i){
    graph.data.datasets[i].data = dataNew;
    graph.update(0);
}
