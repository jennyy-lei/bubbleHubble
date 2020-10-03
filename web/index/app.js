let selectedMetric = 0;

window.onload = () => {
    loadStat();
    metricItemEvent();
}

function metricItemEvent() {
    let items = document.getElementById('metrics-list').children;

    for (let i = 0; i < items.length; ++i) {
        items[i].onclick = function() {
            for (let e = 0; e < items.length; ++e) items[e].classList.remove("selected");

            items[i].classList.add("selected");

            if (i == 0 || i == 1) {
                loadStat(i + 1);
            } else {
                loadLog();
            }
        }
    }
}

function loadStat(type = 1) {
    document.getElementById('metrics-content').innerHTML = `
    <div class="chart-wrapper">
        <div class="chart">
            <canvas id="chart1" width="100" height="50"></canvas>
        </div>
        <div>
            <p class="chart-title">Chart 1</p>
            <p>Legend...</p>
        </div>
    </div>

    <div class="chart-wrapper">
        <div class="chart">
            <canvas id="chart2" width="100" height="50"></canvas>
        </div>
        <div>
            <p class="chart-title">Chart 2</p>
            <p>Legend...</p>
        </div>
    </div>`;

    if (type == 1)
        loadStat1();
    else if (type == 2)
        loadStat2();
}

function loadLog() {
    document.getElementById('metrics-content').innerHTML = `
    <div id="log-wrapper">
        <p>Logs</p>
        <p>...</p>
    </div>
    `
}