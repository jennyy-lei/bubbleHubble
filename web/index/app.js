window.onload = () => {
    // resize line chart
    console.log(`${document.getElementById('line1-legend').clientWidth}px`);
    resizeLineChart()

    metricItemEvent();
    initCharts();

    if(document.getElementById('camera').complete) {
        callApi();
    }
}

window.onresize = () => {
    resizeLineChart();
    line1.update(0);
}

function resizeLineChart() {
    document.getElementsByClassName('linechart')[0].style.width = `${document.getElementById('metrics-content').clientWidth - document.getElementById('line1-legend').clientWidth - 100}px`;
}

function metricItemEvent() {
    let navItems = document.getElementById('metrics-list').children;
    let metricTabs = document.getElementsByClassName('metric');

    for (let i = 0; i < navItems.length; ++i) {
        navItems[i].onclick = function() {
            for (let e = 0; e < navItems.length; ++e) {
                navItems[e].classList.remove("selected");
                metricTabs[e].classList.remove("selected");
            }

            navItems[i].classList.add("selected");
            metricTabs[i].classList.add("selected");
        }
    }
}