$(document).ready(function () {
  //Enable Tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Wizard Tabs
  const $tabs = $(".nav-tabs li");
  const totalSteps = $tabs.length;

  function updateProgress() {
    const currentIndex = $tabs.index($(".nav-tabs .active").closest("li")) + 1;
    const percentage = Math.round((currentIndex / totalSteps) * 100);

    // Update circle (stroke-dasharray expects: filled%, remaining%)
    $(".mkc_circle").attr("stroke-dasharray", percentage + ",100");

    // Update percentage text
    $(".mkc_info").text(percentage + "%");
  }

  // Next Button
  $(".next").click(function () {
    const nextTabLinkEl = $(".nav-tabs .active")
      .closest("li")
      .next("li")
      .find("a")[0];
    if (nextTabLinkEl) {
      const nextTab = new bootstrap.Tab(nextTabLinkEl);
      nextTab.show();
      updateProgress();
    }
  });

  // Previous Button
  $(".previous").click(function () {
    const prevTabLinkEl = $(".nav-tabs .active")
      .closest("li")
      .prev("li")
      .find("a")[0];
    if (prevTabLinkEl) {
      const prevTab = new bootstrap.Tab(prevTabLinkEl);
      prevTab.show();
      updateProgress();
    }
  });

  // Initialize progress on load
  updateProgress();
});
