window.onload = function() {
	$(".win_form" ).widgettabs({});
	$(".HorizontalChart").drawHorizontalChart([
      { title: "Tokyo", value: 10, color: "#60c9cc" },
      { title: "San Francisco", value: 40, color: "#5eb568" },
      { title: "New York", value: 30, color: "#fdb368" },
      { title: "London", value: 20, color: "#ff6550" }
  ]);
}

$.widget( "custom.widgettabs", {
	options: {
		color: 'red'
	},
	_create: function() {
		var self = this,
			element = self.element,
			opts = self.options;

			$('.list_container li').each(function(indx, element){
				$(element).css('background', $(element).attr('color'));
				$(element).find('.bg_separator').css('background', $(element).attr('color'));
			});

			$('.list_icons').on('click', 'li.toogle', function(){
				element.toggleClass('open');
			});

			$('.list_container').on('click', 'li', function(){
				var curr_li = $(this);
				var indx_curr_li = $(this).index();
				switch ($(this).attr('class')) {
					case 'messages':
						$('.messages_container').removeClass('active');
						$('.messages_container').eq(0).addClass('active');
						break;
					case 'users':
						$('.messages_container').removeClass('active');
						$('.messages_container').eq(1).addClass('active');
						break;
					case 'info':
						$('.messages_container').removeClass('active');
						$('.messages_container').eq(2).addClass('active');
						break;
					default:
						console.log('Неизвесная вкладка');
				}
				$(this).parent().css('background', $(this).attr('color'));
				$('.list_container li').removeClass('active');
				$(this).addClass('active');
				curr_li.insertBefore($('.list_container li').eq(0));
				var first_li = $('.list_container li').eq(1);
				first_li.insertAfter($('.list_container li').eq(indx_curr_li));
			});
	},
		refresh: function(){
		var self = this,
		element = self.element,
		opts = self.options;
	}
});
