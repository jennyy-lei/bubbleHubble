window.onload = () => {
    metricItemEvent();
    initCharts();

    if(document.getElementById('camera').complete) {
        callApi();
    }
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

function readJSON(path, callback) { 
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', path, true); 
    xhr.responseType = 'blob'; 
    xhr.onload = function(e) {  
      if (this.status == 200) { 
          console.log(this.response);
      }  
    } 
    xhr.send(); 
}