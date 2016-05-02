$(function(){
	$(".container").css("min-height",$(window).height());

	//nav toggle
	$('#icon').click(function(){
		$('.nav ul').first().toggleClass( "responsive");
	});// end nav toggle

	$('.nav ul li a').on('click', function(a){
		a.preventDefault();
		var hash = this.hash;
		if(hash !== '#toggle'){
			$('.nav li a').removeClass('current');
			$(this).addClass('current');
			$('.nav ul').first().removeClass( "responsive");
		
			$('html, body').animate({scrollTop: $(hash).offset().top}, 700, function() {
	   			window.location.hash = hash;
	 		});
		}
	});

});//end of doc ready



