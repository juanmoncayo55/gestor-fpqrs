$(window).on("load", function(){
  $("#btnMenuAction").on("click", () => {
    $(".hide-nav-child").toggle({
      "visibility": "hidden",
      "display": "none"
    })
  })
});