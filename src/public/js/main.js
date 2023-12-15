// init Isotope
var $grid = $('.showcase__content').isotope({
    itemSelector: '.showcase__item',
    // layoutMode: 'fitRows'
  });
  // filter functions
  var filterFns = {
    // // show if number is greater than 50
    // numberGreaterThan50: function() {
    //   var number = $(this).find('.number').text();
    //   return parseInt( number, 10 ) > 50;
    // },
    // // show if name ends with -ium
    // ium: function() {
    //   var name = $(this).find('.name').text();
    //   return name.match( /ium$/ );
    // }
  };
  // bind filter button click
  $('.filters-button-group').on( 'click', 'button', function() {
    var filterValue = $( this ).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[ filterValue ] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.filters-button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
    });
  });


  // NAVBAR ACTIVE 
  $(".navbarGaNam .nav-link").on("click", function () {
    $(".navbarGaNam").find(".active").removeClass("active");
    $(this).addClass("active");
  });
  //SHOWCASE ACTIVE
  $(".filters-button-group .button").on("click", function () {
    $(".filters-button-group").find(".active").removeClass("active");
    $(this).addClass("active");

  });
