let selectedMetric = 0;

window.onload = () => {
    metricItemEvent();

    initCharts();

    listenToVideo();
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