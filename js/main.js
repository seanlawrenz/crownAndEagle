function openMenu(){
	$('.nav li').toggleClass('menu-open');
	$('#hamburger-menu').toggleClass('menu-open');
}




					//DOCUMENT READY

$(function(){
	$(".container").css("min-height",$(window).height());


	
});//end of doc ready

$('#hamburger-menu').click(function(){
	openMenu();
});

$('.nav a').click(function(){
	openMenu();
	var hash = this.hash;
	$('html, body').animate({scrollTop: $(hash).offset().top}, 700, function() {
 	   	window.location.hash = hash;
 	});
});







