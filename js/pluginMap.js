(function($){

  var mDown = false;
  var dX, dY;
  var curentdX;
  var curentdY;
  var elementMap, elementMarkers, widthMap, heightMap, widthMapContainer, heightMapContainer, deltaTopX, deltaLeftY;

  jQuery.fn.responsiveBlock = function(options){
    options = $.extend({
      stepMouse: 3,
      stepButtons: 20
    }, options);

    var make = function(){
      element = $(this);

      elementMap = element.children('.imgBlock');
			elementMarkers = element.children('.imgBlock.markers');

			setMarkers(1);

			getParams();

			setCenter(1);

			elementMap.mousedown(function(){
				mDown = true;
			});

			elementMap.mouseup(function(){
				mDown = false;
			});

      elementMap.mouseleave(function(){
        mDown = false;
        // alert(1111);
      });

			element.on('click', '.rilesbtn.right', function(){
				moveLeft(options.stepButtons);
			});

			element.on('click', '.rilesbtn.left', function(){
				moveRight(options.stepButtons);
			});

			element.on('click', '.rilesbtn.top', function(){
				moveTop(options.stepButtons);
			});

			element.on('click', '.rilesbtn.bottom', function(){
				moveBottom(options.stepButtons);
			});

			element.on('click', '.rilesbtn.plus', function(){
				$(this).toggleClass('minus');

				if($(this).hasClass("minus")){
						setCenter(2);
						 setTimeout(function() {
							setMarkers(2);
						  }, 1500);
					}
				else
					{
						setCenter(0.5);
						 setTimeout(function() {
							setMarkers(1);
						 }, 1500);
					}
			});

			elementMap.mousemove(function(e){
				if (mDown){
					dX = e.pageX;
					if(curentdX < dX){
						//console.log('Право');
						moveRight(options.stepMouse);
					}
					if(curentdX > dX){
						//console.log('Лево');
						moveLeft(options.stepMouse);
					}
					curentdX = e.pageX;
					dY = e.pageY;
					if(curentdY < dY){
						//console.log('Низ');
						moveBottom(options.stepMouse);
					}
					if(curentdY > dY){
						//console.log('Верх');
						moveTop(options.stepMouse);
					}
					curentdY = e.pageY;
				}
			});

      //console.log(elementMap);
    };

    return this.each(make);
  };

  var getParams = function(){
    widthMap = elementMap.outerWidth();
    heightMap = elementMap.outerHeight();
    widthMapContainer = elementMap.parent().outerWidth();
    heightMapContainer = elementMap.parent().outerHeight();
    deltaLeftY = widthMap - widthMapContainer;
    deltaTopX = heightMap - heightMapContainer;
    //console.log(widthMap);
  };

  var setCenter = function(zoomValue){
		var topCenter = (elementMap.outerHeight()*zoomValue - element.outerHeight())/2;
		var leftCenter = (elementMap.outerWidth()*zoomValue - element.outerWidth())/2;
		if(zoomValue == 1){
			elementMap.animate({'width': elementMap.outerWidth()*zoomValue+'px', 'height': elementMap.outerHeight()*zoomValue+'px', 'top': -topCenter, 'left': -leftCenter}, 0);
		}
		else{
      elementMap.each(function(indx, elementm){
        if($(elementm).hasClass('markers')){
          $(elementm).animate({'width': elementMap.outerWidth()*zoomValue+'px', 'height': elementMap.outerHeight()*zoomValue+'px', 'top': -topCenter, 'left': -leftCenter}, 0);
        }
        else{
          $(elementm).animate({'width': elementMap.outerWidth()*zoomValue+'px', 'height': elementMap.outerHeight()*zoomValue+'px', 'top': -topCenter, 'left': -leftCenter}, 1500);
        }
      });
      //elementMap.animate({'width': elementMap.outerWidth()*zoomValue+'px', 'height': elementMap.outerHeight()*zoomValue+'px', 'top': -topCenter, 'left': -leftCenter}, 1500);
		}
	}

  var setMarkers = function(zoomValue){
		elementMarkers.children('.marker').each(function(indx, el){
			var dataX = $(el).attr('data-x')*zoomValue;
			var dataY = $(el).attr('data-y')*zoomValue;
			$(el).css({"top": dataX+"px", "left": dataY+"px"});
		});
	}

  var moveLeft = function(step){
		getParams();

		var positionMap = elementMap.position();
		if(positionMap.left > (deltaLeftY-step)*-1){
			elementMap.css('left', positionMap.left -= step);
		}
		else{
			elementMap.css('left', -deltaLeftY);
		}
	}

  var moveRight = function(step){
		getParams();

		var positionMap = elementMap.position();
		if(positionMap.left < 0-step){
			elementMap.css('left', positionMap.left += step);
		}
		else{
			elementMap.css('left', '0px');
		}
	}

  var moveTop = function(step){
    getParams();

    var positionMap = elementMap.position();
    if(positionMap.top > (deltaTopX-step)*-1){
      elementMap.css('top', positionMap.top -= step);
    }
    else{
      elementMap.css('top', -deltaTopX);
    }
  }

  var moveBottom = function(step){
    getParams();

    var positionMap = elementMap.position();
    if(positionMap.top < 0-step){
      elementMap.css('top', positionMap.top += step);
    }
    else{
      elementMap.css('top', '0px');
    }
  }

})(jQuery);
