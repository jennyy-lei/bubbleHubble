
var pie1;
var pie2;

function loadStat1(safe, low, high) {
    var ctx1 = document.getElementById('chart1').getContext('2d');
    pie1 = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ['Safe', 'Low Risk', 'High Risk'],
            datasets: [{
                data: [safe, low, high],
                backgroundColor: [
                    'rgba(40, 171, 10, 0.2)',
                    'rgba(247, 236, 22, 0.2)',
                    'rgba(179, 16, 16, 0.2)'
                ],
                borderColor: [
                    'rgba(18, 77, 5, 1)',
                    'rgba(245, 212, 0, 1)',
                    'rgba(171, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // cutoutPercentage: 80,
            legend: {
                display: false
            },
        }
    });

    var ctx2 = document.getElementById('chart2').getContext('2d');
    pie2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
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
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // cutoutPercentage: 80,
            legend: {
                display: false
            },
        }
    });
}

var line1
var line2

function loadStat2() {
    var ctx1 = document.getElementById('chart1').getContext('2d');
    line1 = new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                data: [0,0,0,0,0,0],
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
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // cutoutPercentage: 80,
            legend: {
                display: false
            },
        }
    });

    var ctx2 = document.getElementById('chart2').getContext('2d');
    line2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                data: [12, 19, 3, 5, 2, 3],
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
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // cutoutPercentage: 80,
            legend: {
                display: false
            },
        }
    });
}

function updateGraph(graph,dataNew){
    graph.data.datasets[0].data= dataNew;
    graph.update(0);
}
