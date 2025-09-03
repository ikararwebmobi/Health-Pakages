
/*
 CIRCLE COUNTER
--------------------------------------------*/

function createCircleChart(title, percent, color, size, stroke) {
  let svg = `<svg class="mkc_circle-chart" viewbox="0 0 36 36" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <path class="mkc_circle-bg" stroke="#DADCE0" stroke-width="${stroke * 0.5}" fill="none" d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"/>
      <path class="mkc_circle" stroke="${color}" stroke-width="${stroke}" stroke-dasharray="${percent},100" stroke-linecap="round" fill="none"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831" />
    <text class="mkc_sub_info" x="50%" y="40%" alignment-baseline="central" text-anchor="middle" font-size="3.75" fill="#697483" >${title}</text>
      <text class="mkc_info" x="50%" y="65%" alignment-baseline="central" text-anchor="middle" font-size="8">${percent}%</text>

  </svg>`;
  return svg;
}

let charts = document.getElementsByClassName('mkCharts');

for(let i=0;i<charts.length;i++) {
  let chart = charts[i];
  let percent = chart.dataset.percent;
  let title = chart.dataset.title;
  let color = ('color' in chart.dataset) ? chart.dataset.color : "#2CD34F";
  let size = ('size' in chart.dataset) ? chart.dataset.size : "100";
  let stroke = ('stroke' in chart.dataset) ? chart.dataset.stroke : "1";
  charts[i].innerHTML = createCircleChart(title, percent, color, size, stroke);
}
/* SCROLL TOP
--------------------------------------------*/
$("#scroll").click(function () {
	$("html, body").animate({ scrollTop: 0 }, 800);
	return false;
});

(function ($) {
	"use strict";

	$(document).ready(function () {
		"use strict";

		var progressPath = document.querySelector(".progress-wrap path");
		if (progressPath) {
			var pathLength = progressPath.getTotalLength();
			progressPath.style.transition = progressPath.style.WebkitTransition = "none";
			progressPath.style.strokeDasharray = pathLength + " " + pathLength;
			progressPath.style.strokeDashoffset = pathLength;
			progressPath.getBoundingClientRect();
			progressPath.style.transition = progressPath.style.WebkitTransition =
				"stroke-dashoffset 10ms linear";
			var updateProgress = function () {
				var scroll = $(window).scrollTop();
				var height = $(document).height() - $(window).height();
				var progress = pathLength - (scroll * pathLength) / height;
				progressPath.style.strokeDashoffset = progress;
			};
			updateProgress();
			$(window).scroll(updateProgress);
			var offset = 50;
			var duration = 550;
			jQuery(window).on("scroll", function () {
				if (jQuery(this).scrollTop() > offset) {
					jQuery(".progress-wrap").addClass("active-progress");
				} else {
					jQuery(".progress-wrap").removeClass("active-progress");
				}
			});
			jQuery(".progress-wrap").on("click", function (event) {
				event.preventDefault();
				jQuery("html, body").animate({ scrollTop: 0 }, duration);
				return false;
			});
		}
	});
})(jQuery);

