$(document).ready(function(){
	
	$(".has-content-identifier").each(function(){
		$(this).append("<span class=\"content-identifier-tag displayinmobile-block\">"+($(this).attr("title"))+"</span>");
	});
	
	$("ol.inc-counter").each(function(){
		var count = $(this).attr('start');
		if (typeof count !== typeof undefined && count !== false) {
			$(this).css("counter-reset", "item "+--count);
			console.log("Why its not working");
		}
	});
	
	$('.scroll-contentTable').on('scroll', function () {
		$(this).prev('.scroll-headerTable').scrollLeft($(this).scrollLeft());
	});
	
	$('.notecontainer').attr('title','Note');
	
	$('.notecontainer').before("<div class=\"divtable disclaimertable\"><div class=\"divrow\"><div class=\"divcell disclaimertext\">Note</div></div>");
	
	if($(".minMaxBlockClick").is(":visible")){
		$(".minMaxBlock").hide();
	}
	
	$(".minMaxBlockClick.displayDefault").each(function(){
		$(this).next().show("fast");
		setActivated($(this));
	});
	
	$(".minMaxBlockClick").click(function(){
		if($(this).next().hasClass("minMaxBlock")){
			if($(this).next().is(":visible")){
				$(this).next().hide("fast");
				setDeactivated($(this));
			}else{
				hideAll();
				$(this).next().show("fast");
				setActivated($(this));
			}
		}
	});
	
	$(window).resize(function() {
		if($(".minMaxBlockClick").is(':visible')){
			hideAll();
		}else{
			$(".minMaxBlock").show();
		}
	});
});

var clickObjActive, clickObjDeactive, angleActive, angleDeactive, activeInt, deactiveInt;

function hideAll(){
	$(".minMaxBlockClick").each(function(){
		if($(this).next(".minMaxBlock").is(':visible')){
			setDeactivated($(this));
			$(this).next(".minMaxBlock").hide("fast");
		}
	});
	
}

function setActivated(clickElement){
	angleActive=180;
	clickObjActive=clickElement;
	clearInterval(activeInt);
	/*activeInt=setInterval("startRotateActive()",10);*/
	$(clickElement).children(".block-status").css({
    	'-webkit-transform' : 'rotate(90deg)',
        '-moz-transform' : 'rotate(90deg)',
        '-ms-transform' : 'rotate(90deg)',
        'transform' : 'rotate(90deg)',
        '-webkit-transition' : 'ease 0.25s',
        'transition' : 'ease 0.25s'});
}

function setDeactivated(clickElement){
	angleDeactive=270;
	clickObjDeactive=clickElement;
	clearInterval(deactiveInt);
	/*deactiveInt=setInterval("startRotateDeactive()",10);*/
	$(clickElement).children(".block-status").css({
	'-webkit-transform' : 'rotate(0deg)',
    '-moz-transform' : 'rotate(0deg)',
    '-ms-transform' : 'rotate(0deg)',
    'transform' : 'rotate(0deg)',
    '-webkit-transition' : 'ease 0.25s',
    'transition' : 'ease 0.25s'});
}


function startRotateActive()
{
	angleActive=angleActive+9;
	$(clickObjActive).children(".block-status").css({
    	'-webkit-transform' : 'rotate('+angleActive+'deg)',
        '-moz-transform' : 'rotate('+angleActive+'deg)',
        '-ms-transform' : 'rotate('+angleActive+'deg)',
        'transform' : 'rotate('+angleActive+'deg)'
	});
	if (angleActive>=270){
		clearInterval(activeInt);
	}
}

function startRotateDeactive()
{
	angleDeactive=angleDeactive-9;
	$(clickObjDeactive).children(".block-status").css({
    	'-webkit-transform' : 'rotate('+angleDeactive+'deg)',
        '-moz-transform' : 'rotate('+angleDeactive+'deg)',
        '-ms-transform' : 'rotate('+angleDeactive+'deg)',
        'transform' : 'rotate('+angleDeactive+'deg)'
	});
	if (angleDeactive<=180){
		clearInterval(deactiveInt);
	}
}

function rotate(angle){
	
}

