// PASSWORD HIDE AND SHOW
  document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".show-password i");

    toggleIcon.addEventListener("click", function () {
      const isPasswordVisible = passwordInput.type === "text";
      passwordInput.type = isPasswordVisible ? "password" : "text";

      // Toggle icon class (optional, if you want to switch between eye and eye-slash)
      toggleIcon.classList.toggle("ph-eye");
      toggleIcon.classList.toggle("ph-eye-slash");
    });
  });

//   SEARCH HIDE AND SHOW
  document.getElementById("btn-search").addEventListener("click", function () {
  const panel = document.getElementById("search-panel");
  panel.classList.toggle("show");
  //panel.classList.toggle("show");
});

//   SIDEBAR TOGGLE
  document.querySelector(".navbar-toggler").addEventListener("click", function () {
  //const panel = document.getElementById("search-panel");
  this.classList.toggle("open");
  //panel.classList.toggle("show");
});

/*
 CIRCLE COUNTER
--------------------------------------------*/

function createCircleChart(percent, color, size, stroke) {
  let svg = `<svg class="mkc_circle-chart" viewbox="0 0 36 36" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path class="mkc_circle-bg" stroke="#eeeeee" stroke-width="${stroke * 0.5}" fill="none" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"/>
      <path class="mkc_circle" stroke="${color}" stroke-width="${stroke}" stroke-dasharray="${percent},100" stroke-linecap="round" fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831" />
      <text class="mkc_info" x="50%" y="60%" alignment-baseline="central" text-anchor="middle" font-size="8">${percent}%</text>
  </svg>`;
  return svg;
}

let charts = document.getElementsByClassName('mkCharts');

for(let i=0;i<charts.length;i++) {
  let chart = charts[i];
  let percent = chart.dataset.percent;
  let color = ('color' in chart.dataset) ? chart.dataset.color : "#2F4F4F";
  let size = ('size' in chart.dataset) ? chart.dataset.size : "100";
  let stroke = ('stroke' in chart.dataset) ? chart.dataset.stroke : "1";
  charts[i].innerHTML = createCircleChart(percent, color, size, stroke);
}


function createSemiCircleChart(percent, color, size, stroke, title) {
  // percent: 0-100
  const radius = size * 0.4;
  const circumference = Math.PI * radius;
  const progress = circumference * (percent / 100);
  const centerY = size / 2 - 10;
  const startX = size * 0.1;
  const endX = size * 0.9;
  return `
    <svg width="${size}" height="${size/2}" viewBox="0 0 ${size} ${size/2}" xmlns="http://www.w3.org/2000/svg">
      <path class="mkc_circle-bg"
        d="M ${startX} ${centerY}
           A ${radius} ${radius} 0 0 1 ${endX} ${centerY}"
        fill="none"
        stroke="#5C7A8A"
        stroke-width="${stroke}"
        stroke-linecap="round"
      />
      <path class="mkc_circle"
        d="M ${startX} ${centerY}
           A ${radius} ${radius} 0 0 1 ${endX} ${centerY}"
        fill="none"
        stroke="${color}"
        stroke-width="${stroke}"
        stroke-linecap="round"
        stroke-dasharray="${progress},${circumference}"
      />
      <text class="mkc_sub_info" x="50%" y="60%" text-anchor="middle" font-size=3" fill="#212B36" font-weight="bold">${title}</text>
      <text class="mkc_info" x="50%" y="94%" text-anchor="middle" font-size="50" fill="#5C7A8A">${percent}%</text>
    </svg>
  `;
}

document.addEventListener('DOMContentLoaded', function() {
  let charts02 = document.getElementsByClassName('mkCharts-02');
  for(let i=0;i<charts02.length;i++) {
    let chart02 = charts02[i];
    let percent02 = chart02.dataset.percent ? parseInt(chart02.dataset.percent) : 0;
    let color02 = chart02.dataset.color ? chart02.dataset.color : "#8BC53F";
    let size02 = chart02.dataset.size ? parseInt(chart02.dataset.size) : 300;
    let stroke02 = chart02.dataset.stroke ? parseInt(chart02.dataset.stroke) : 20;
    let title02 = chart02.dataset.title ? chart02.dataset.title : "Profile Completion";
    chart02.innerHTML = createSemiCircleChart(percent02, color02, size02, stroke02, title02);
  }
});
//   CARD SELECTION
document.addEventListener('DOMContentLoaded', function() {
  const testCards = document.querySelectorAll('.test-card');
  const selectedInfo = document.getElementById('testNumber');

  function updateSelectedInfo() {
    const selectedCount = document.querySelectorAll('.test-card.card-selected').length;
    if (selectedInfo) {
      selectedInfo.textContent = selectedCount;
    }
  }

  testCards.forEach(function(card) {
    const checkbox = card.querySelector('input[type="checkbox"]');
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
          card.classList.add('card-selected');
        } else {
          card.classList.remove('card-selected');
        }
        updateSelectedInfo();
      });
    }
  });

  updateSelectedInfo();
});

