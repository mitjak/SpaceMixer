(function ($) {
	
    $(document).ready(function () {
        
        var edit = null;
        var ElementID = 1;
        var position = 0;
        
        $('#add-room').click(function() {
        	
        	// edit
        	if ( $(this).hasClass('edit') ) {
        		
        		edit.css('background-color', $('.sp-preview-inner').css('background-color') );
        		edit.find('.title').html( $('input.input').val() );
        		$('#add-room').html('Add Room').removeClass('edit');
       			$('.holder').removeClass('edit');

        	} else {
                
                var positionX = 50 + position + "%";
                /*var positionY = 800 + position + "px";*/
        
	        	var text = $('input.input').val();
        
	       		var new_elm = $('.mashup .box').clone().css({
                        'background-color' : $('.sp-preview-inner').css('background-color'),
                        'left' :  positionX,
                        /*'top' :  positionY,*/
                    }).resizable({ 
		            handles: 'all',
		            snap: true,
                    grid: [ 5, 5 ],
		            resize: function(e, ui) { size() }
		        }).draggable({
					snap: true,
                    grid: [ 5, 5 ]
				});
	        	
                new_elm.find('.title').html(text);
	        	new_elm.appendTo('.container');
                
                /* add class to find with scroll */
	        	new_elm.attr('id', ElementID);
                
	        	size();
                /*scroll to box*/
                scrollTo(ElementID);
                ElementID += 1;
                position += 3;
        	}
        	
        	return false;
		});
        
        
		/*
		 * Add Furniture element
		 */
        $('#add-furniture').click(function() {

                var positionX = 50 + position + "%";

	       		var new_elm = $('.furniture .f-element').clone().css({
                        'background-color' : $('.sp-preview-inner').css('background-image'),
                        'left' :  positionX,
                    }).resizable({ 
		            handles: 'all',
		            snap: true,
                    grid: [ 5, 5 ],
		            resize: function(e, ui) { size() }
		        }).draggable({
					snap: false,
                    grid: [ 5, 5 ]
				});
	        	
	        	new_elm.appendTo('.container');
                
                /* add class to find with scroll */
	        	new_elm.attr('id', ElementID);
                
	        	size();
                
                /*scroll to box*/
                scrollTo(ElementID);
                
                ElementID += 1;
                
                return false;
		});
        
        $('.box a.edit').live('click', function (el) {
        	
        	edit = $(this).closest('div');
        	$('input.input').val( $(this).closest('div').find('.title').html() );
        	$('.color-box').css('background-color', $(this).closest('div').css('background-color') );
        	$('#add-room').html('OK').addClass('edit');
        	$('.holder').addClass('edit');
        	
        	return false;
        });
        
        $('.box a.delete').live("click", function () {
        	
        	$(this).closest('.box').remove();
            size();
			return false;
        });
        
        $('.f-element a.delete').live('click', function () {
        	$(this).closest('.f-element').remove();
			return false;
        })
        
        $('input.scale').change(function() { size(); });

        /*
         * Calculate floor size
         */
        function size () {
        	
        	var scale = parseFloat( $('input.scale').val() );
        	var totalm2 = 0;
        	$('.table').html('');
        	
        	$('.container .box').each(function(key, val) {
        		var w = $(val).width() / 100 * scale;
        		var h = $(val).height() / 100 * scale;
        		
				var m2 = w*h;
        		totalm2 = totalm2 + m2;
        		m2 = m2.toFixed(2);
        		w = w.toFixed(2);
        		h = h.toFixed(2);
        		
        		$(val).find('.m2').html(m2 + ' m<sup>2</sup>');
        		$(val).find('.width').html(w + ' m');
        		$(val).find('.height').html(h + ' m');
        		
        		$('.table').append('<li>'+$(val).find('.title').html()+': '+w+'x'+h+'m ('+(m2)+'m<sup>2</sup>)</li>');
        	});
        	
        	totalm2 = totalm2.toFixed(2);
        	
        	$('.size span').html(' '+(totalm2)+' m<sup>2</sup>');
            
        	$('.container .f-element').each(function(key, val) {
        		var w = $(val).width() / 100 * scale;
        		var h = $(val).height() / 100 * scale;
        		
        		w = w.toFixed(2);
        		h = h.toFixed(2);
        		
        		$(val).find('.width').html(w + ' m');
        		$(val).find('.height').html(h + ' m');
          	});         
        	
        }
        
        /*
         * Scroll to newly added element
         */
        function scrollTo (ElementID) {
            var RoomElement = $("#" + ElementID);
            dwidth = $(document).width() / 2;
            dheight = $(document).height() / 4;
            $('html,body').animate({
                scrollTop: RoomElement.offset().top - 200,
                scrollLeft: RoomElement.offset().left - dheight
            },'slow');
        }
        
        /*
         * Misc functions
         */
        $('.toggle-table').click(function () {
		    var marginL = $('.details').css("margin-left");
		    if ( marginL > "-500px") {
		        margin = "-500px";
		    } else {
		        margin = "0"
		    }
		    $('.details').animate({marginLeft: margin}, 500 );                
		});
		
        $("input[name='tat']").click( function() {
		    if ( $('#checkbox').prop('checked') ){
		        $('.title').css('display','none');
		    }
		});

		 $("input[name='text']").on('click', function(){
	        $('.title').toggleClass('visible');
		 }); 
 
		 $("input[name='area']").on('click', function(){
		 	$('.width').toggleClass('visible');
	        $('.height').toggleClass('visible');
	        $('.m2').toggleClass('visible');
		 }); 
        
    });
    
})(jQuery);    

 
