(function($){
  jQuery.fn.drawHorizontalChart = function(data, options){
    options = $.extend({
      width: 100,
      bg: "rgba(0,0,0,0.15)"
    }, options);

    var make = function () {
      $(this).css({"width": options.width + '%', "background": options.bg});
      for (var i = 0, len = data.length; i < len; i++) {
          $(this).append('<div class="elemGD" title="'+data[i].title+'" style="width: ' + data[i].value + '%; background: ' + data[i].color +';"></div>');
      }
    };

    return this.each(make);
  };
})(jQuery);
