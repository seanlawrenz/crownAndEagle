/*
*							BEGINNING OF CUSTOM JAVASCRIPT
*/

/*
*							GLOBAL VARS
*/

var error = '';
var goingToEvent;
var validateArray = [];
var selectionOrder = [];

/*
*							OBJECTS
*/

/*
*							ACCORDION BUILDING OBJECTS
*/

//Mother Object
function AccordionBuilder(header, message){
	this.header = header;
	this.message = message;
	this.beginningHTML = '<div class="accordion-build"><span class="chevron-arrow-orange"></span> <strong>';
	this.midHTML = '</strong></div><div class="panel"><p>';
	this.endHTML = '</p></div>';
	this.accordionValue = function(){
		return this.beginningHTML + this.header + this.midHTML + this.message + this.endHTML;
	}
}

//DOM build
AccordionBuilder.prototype.buildAccordion =function(div){
	$(div).append(this.accordionValue());
}

/*
*							FORM VAILDATION OBJECTS
*/

//Mother Object
function InputValidation(id,message){
	this.id = id;
	this.message = message;
	this.required = false;
	validateArray.push(this);
}

//Boolean method. Using regex so any question can be asked.
InputValidation.prototype.inputValue = function(){
	//checking if this is in the document 
	if ($(this.id).length){
		//getting the val
		var str = $(this.id).val();
		//checking if it is answered
		if (str !== null){
			//Boolean
			var yes = str.search(/yes/i);
			if (yes >= 0){
				return true
			}else if (yes === -1){
				return false
			}
		} else{
			return false
		}
	}
}

//Removing this from array
InputValidation.prototype.removeFromValidateArray = function(){
	var removeThis = validateArray.indexOf(this);
	validateArray.splice(removeThis, 1);
}

//RegEx for phone numbers
InputValidation.prototype.numberValidation = function(){
	var regEx = new RegExp(/^[+]?([0-9]*[\.\s\-\(\)]|[0-9]+){3,24}$/);
	var value = $(this.id).val();
	if (value != ''){
		var testing = regEx.test(value);
		if (testing === false){
			error += '<li>Phone number must be a valid number</li>';
		}
	}
}

//Types of validations there are
               var RSVPStatus = new InputValidation('' , 'Please indicate if you will attend.'),
                    firstName = new InputValidation('#First_Name', 'Please enter your first name.'),
                     lastName = new InputValidation('#Last_Name', 'Please enter your last name.'),
                 emailAddress = new InputValidation('#Email_Address', 'Please enter your email address.'),
                 mobileNumber = new InputValidation('#Event_Phone', 'Please enter your cell phone number.'),
              breakoutSession = new InputValidation('#Breakout_Session_1', 'Please select a breakout session.'),
       attendingWelcomeDinner = new InputValidation('#Attending_Welcome_Dinner', 'Please indicate whether you will attend dinner.'),
                accommodation = new InputValidation('#Accommodation_Required', 'Please indicate whether you require hotel accommodations.'),
                  checkInDate = new InputValidation('#Check_In_Date', 'Please select a check-in date.'),
                 checkOutDate = new InputValidation('#Check_Out_Date' , 'Please select a check-out date.'),
               travelRequired = new InputValidation('#Travel_Required' ,'Please indicate whether you require travel.'),
              travelAgreement = new InputValidation('#Event_Question_2', 'You must agree to J.P. Morgan\'s event travel and expense policy.'),
  groundTransportationArrival = new InputValidation('#Ground_Transportation_Arrival', 'Please indicate if you require ground transportation upon arrvial.'),
groundTransportationDeparture = new InputValidation('#Ground_Transportation_Departure', 'Please indicate if you require ground transportation upon departure.'),
               digitalConfApp = new InputValidation('#Event_Question_3', 'Please indicate if you will bring your own iPad/Android device to the conference.'),
              additionalGuest = new InputValidation('#Additional_Guests', 'Please indicate if you will bring a guest.'),
                emergencyName = new InputValidation('#Emergency_Name', 'Please give an emergency contact name.'),
               emergencyPhone = new InputValidation('#Emergency_Phone', 'Please give an emergency contact phone number.'),
    emergancyNameRelationship = new InputValidation('', 'Please give your emergency contact\'s relation to you.'),
                  companyName = new InputValidation('#Event_Company_Name', 'Please indicate your company name.'),
                   cityChoice = new InputValidation('#City_Choice', 'Please select a city.'),
                flightBooking = new InputValidation('', 'Please indicate if you require travel.'),
               lineOfBusiness = new InputValidation('', 'Please select your line of business.'),
                    eventCity = new InputValidation('#Event_City', 'Please indicate the city in which you reside.'),
                   eventState = new InputValidation('#Event_Question_8', 'Please indicate the state in which you reside.'),
                  jobFunction = new InputValidation('#Event_Title', 'Please select your job function.'),
                      channel = new InputValidation('', 'Please select your channel.'),
                 eventCountry = new InputValidation('#Event_Country', 'Please select the country in which you reside.'),
                       prefix = new InputValidation('#Event_Question_6', 'Please select your prefix.');

RSVPStatus.required = true;
RSVPStatus.removeFromValidateArray();

/*
*							FUNCTIONS
*/

//General sortable array
function sortArrayById(toSort, order){
	toSort.sort(function(a,b){
		return order.indexOf(a.id) < order.indexOf(b.id) ? -1 : 1;
	});
}

//Grabbing a part of the URL
//Legacy query, but works fine
function getQueryVariableOfURL(variable){
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++){
		var pair = vars[i].split('=');
		if(pair[0] == variable){
			return pair[1];
		}
	}
}

//General html tag remover
var stripHtml = (function (){
	var div = document.createElement('div');
	return function (html){
		div.innterHTML = html;
		return (div.innerText || div.textContent);
	};
})();

//Navagation

//DOM Controlls

//Call this if you want to call a particular link
function contentDisplay(link){
	$('.content').hide().eq(link).show();
	$('.register-button').show();
	$('#form').hide();
	$('.left-side').show();
	$('.side-info').show();
	//Adding the orange underline
	$('.nav a').removeClass('menu-active');
	$('.nav a').eq(link).addClass('menu-active');
}

//Indexing through the link classes to find the particular link
function menuLink(link){
	var contentID = $('a.links').index(link);
	if(contentID > -1){
		return contentID;
	}
}

//Menu click handler
function menuClick(link){
	var selection = menuLink(link);
	contentDisplay(selection);
}

//Conditional function for DOM show/hide based on user selection
function formConditionals(value, selection){
	var optionVal = value.inputValue();
	if (optionVal === true){
		$(selection).show();
	}else{
		$(selection).hide();
	}
}

//Error builder. Takes over the whole screen.
function errorDivBuilder(message){
	var errorDivStart = '<div class="error-overlay"><div id="error-menu"><span></span><span></span></div><div class="error-message">';
	var errorDivEnd = '</div></div>';
	$('.wrapper').prepend($(errorDivStart + message + errorDivEnd));
	$(document).on('click', '#error-menu', function(){
		$('.error-overlay').hide();
	});
}

//Opening Registration
function openRegistrationForm(){
	$('.content').hide();
	$('.left-side').hide();
	$('.side-info').hide();
	$('#form').show();
	$('.register-button').hide();
	$('.nav a').removeClass('menu-active');
}

//Scroll to anchor hash only if it is a hash
function scroll_if_anchor(href){
	href = typeof(href) == 'string' ? href : $(this).attr('href');
	var fromTop = 154;//Change to adjust to header
	if(href.indexOf('#') == 0){
		var $target = $(href);
		if($target.length){
			$('html, body').animate({
				scrollTop: $target.offset().top - fromTop
			});
			if(history && 'pushState' in history){
				history.pushState({}, document.title, window.location.pathname + href);
				return false;
			}
		}
	}
}

//URL based contentDisplay
function contentOpening(){
	var tab = unescape(getQueryVariableOfURL('tab'));
	if (tab == 'regnow'){
		openRegistrationForm();
	}else if(tab === 'decline'){
		openRegistrationForm();
		$('#RSVP_Status_N').prop('checked', true);
	}else{
		contentDisplay(0);
	}
}

/*
*							SORTABLE UI FOR BREAKOUT SESSIONS
*/

//Get the value of the selections. Var inputs is on the breakout session page
function sortableInputValues(inputs){
	//pushing the input values from the breakout session data page into the array
	var selections = [];
	for (var i = 0; i < inputs.length; i++){
		selections.push($(inputs[i]).val());
	}
	return selections
}

//Mother Objects
function sortableSelections(breakoutSessions, inputs){
	//DOM controlls
	this.listart = '<li class="ui-state-default" id="';
	this.limid = '"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>';
	this.liclose = '</li>';
	this.uiDiv = '#sortable';
	this.infoDiv = '.breakout-accordion';
	this.breakouts = breakoutSessions;
	this.inputs = inputs;
}

//DOM and UI initialization prototype
sortableSelections.prototype.buildingSortableList = function(){
	var div = this.uiDiv;
	var listart = this.listart;
	var limid = this.limid;
	var liclose = this.liclose;
	var inputs = this.inputs;	
	this.breakouts.forEach(function(breakouts){
		$(div).append(listart + breakouts.id + limid + breakouts.header + liclose);
	});
	//jquery ui initialize
	$(div).sortable({
		placeholder: "ui-state-active",
		//pushing values into the inputs
		stop: function(event, ui){
			selectionOrder = $(div).sortable('toArray');
			for (var i = 0; i <inputs.length; i++){
				$(inputs[i]).val(selectionOrder[i]);
			}
		}
	});
}

//Safeguard for pushing values into inputs
sortableSelections.prototype.finalValues = function(){
	var inputs = this.inputs;
	var div = this.uiDiv;
	var selections = sortableInputValues(inputs);
	if(selections[0] == ''){
		selectionOrder = $(div).sortable('toArray');
		for (var i = 0; i <inputs.length; i++){
			$(inputs[i]).val(selectionOrder[i]);
		}
	}
}

function sortInit(sortable){
	try{
		//Checking if they're multiple sorts
		if(typeof(sortable) === 'undefined'){
			//creating new sortableSelections
			sortable = new sortableSelections(breakoutSessions, inputs);
			sortable.single = true;
		}
	}catch(err){
		return errorDivBuilder(err.message);
	}
	

	//Makes informational accordions for each of the breakouts. To use add a div with a class of breakout-accordion
	//You can use this as many times in the doc as you want.   
	if($('.breakout-accordion').length){
		var breakouts = sortable.breakouts;
		breakouts.forEach(function(breakout){
			//On the breakouts data array, make an attribute of message for the info in the panels of the accordion
			var sortAccordion = new AccordionBuilder(breakout.header, breakout.message);
			sortAccordion.buildAccordion('.breakout-accordion');
		});
	}

	//Grabbing the values in the inputs
	selectionOrder = sortableInputValues(sortable.inputs);
	//Checking if this is a returning user
	if(selectionOrder[0] == ''){
		sortable.buildingSortableList();
	}else{
		//Returning user, Reordering breakouts by selectionOrder
		sortArrayById(sortable.breakouts, selectionOrder);
		//Building the DOM by users selections
		sortable.buildingSortableList();
	}

	//sortable breakout sessions check
	if(sortable.single === true){
		sortable.finalValues();
	}
}

/*
*							SELECTABLE UI FOR BREAKOUT SESSIONS
*/

//Mother Object
function BreakoutInputs(header, id){
	this.header = header;
	this.id = id;
	this.beginningHTML = '<input type="checkbox" name="';
	this.makeCheckbox = function(){
		return this.beginningHTML + this.id + '" id="' + this.id + '"><label for="' + this.id + '">' + this.header + '</label>';
	}
}

BreakoutInputs.prototype.buildCheckbox = function(div){
	$(div).append(this.makeCheckbox());
}

function selectInit(limit){
	var returningUser = false;
	var endOfInputs = inputs.length - 1;
	//Checking initinal State
	if ($(inputs[endOfInputs]).val() != ''){
		//Returning user, emptying the global varaible selectionOrder
		selectionOrder = [];
		//populating the users privious selections
		for (var i = 0; i < inputs.length; i++){
			selectionOrder.push($(inputs[i]).val());
		}
		returningUser = true;
	}
	//Building Content
	breakoutSessions.forEach(function(breakout){
		var header, message, breakoutId, breakoutAccordion, breakoutContent, breakoutSelections;
		//html markup
		header = breakout.header;
		message = breakout.message;
		breakoutId = breakout.id;
		//if you want the info to be on the document as accordions
		if($('.breakout-accordion').length){
			breakoutAccordion = new AccordionBuilder(header, message);
			breakoutAccordion.buildAccordion('.breakout-accordion');
		}
		//If you just the info to be on the document as text
		if ($('#breakout-info').length){
			breakoutContent = new AccordionBuilder(header, message);
			breakoutContent.beginningHTML = '<strong>';
			breakoutContent.midHTML = '</strong><br>';
			breakoutContent.endHTML = '<br><br>';
			breakoutContent.buildAccordion('#breakout-info');
		}
		//Building the checkboxes
		breakoutCheckboxes = new BreakoutInputs(header, breakoutId);
		if(returningUser === true){
			var index = selectionOrder.indexOf(breakoutId);
			if (index >= 0){
				breakoutCheckboxes.beginningHTML = '<input type="checkbox" checked name="';
			}
		}
		console.log(breakoutCheckboxes.header);
		console.log(breakoutCheckboxes.beginningHTML);
		breakoutCheckboxes.buildCheckbox('#selectable');
	});
	//limiting the amount of checkboxes to check
	$('#selectable input').on('change', function(e){
		if($(this).siblings(':checked').length >= limit){
			this.checked = false;
		}
	});
	breakoutSession.selectable = true;
}

//Final Values. Working off of the InputValidation object not BreakoutInputs
breakoutSession.selectFinalValues = function(){
	selectionOrder = [];
	breakoutSessions.forEach(function(breakout){
		if($('input[name="' + breakout.id + '"]').is(':checked') === true){
			selectionOrder.push(breakout.id);
		}
	});
	for (var i = 0; i < selectionOrder.length; i++){
		$(inputs[i]).val(selectionOrder[i]);
	}
}

/*
*							CLICK OR CHANGE EVENTS
*/

//nav events
$('#hamburger-menu').click(function(){
	//Toggling the mobile view and adding animation on hamburger
	$('.nav ul li').toggleClass('active');
	$('#hamburger-menu').toggleClass('menu-open');
});

//Menu click
$('.links').click(function(e){
	e.preventDefault();
	//displaying the correct screen
	menuClick(this);
	//showing/hiding the menu
	$('.nav ul li').toggleClass('active');
	$('#hamburger-menu').toggleClass('menu-open');
});

//Accordion event
var acc = $('.accordion');
for (var a = 0; a < acc.length; a++){
	acc[a].onclick = function(){
		$(this).next().slideToggle(750);
		$(this).children().toggleClass('show');
	}
}

//Registration button click on menu based sites
$('.registration').click(function(){
	openRegistrationForm();
});

//Registration button click on accordion or other non content based events
$('.registration-slide').click(function(){
	$('#form').show();
	$('html, body').animate({scrollTop: $('#form').offset().top},700);
});

//Conditional to show form based on RSVP status
$('input[type = "radio"][name="RSVP_Status"]').change(function(){
	goingToEvent = $('#RSVP_Status_Y').prop('checked');
	if(goingToEvent === true){
		$('#RSVP-check').show();
		//The class bounceInUp is animation.
		$('#RSVP-check').addClass('bounceInUp');
	}else{
		$('#RSVP-check').hide();
		$('#RSVP-check').removeClass('bounceInUp');
		$('#error').remove();
		$('input[type="submit"]').show();
	}
});

//Accommodation Conditional
$(accommodation.id).change(function(){
  formConditionals(accommodation, '#accommodation-check');
});

//Travel Conditional 
$(travelRequired.id).change(function(){
  formConditionals(travelRequired, '#travel-check');
});

//Flight Booking handling
$(flightBooking.id).change(function(){
  formConditionals(flightBooking, '#flight-check');
  flightBooking.booked();
});

flightBooking.booked = function(){
	setRequiredFormInputs();
	if(flightBooking.required === true){
		if(flightBooking.inputValue() !== true){
			errorDivBuilder('<h1>If you have not booked your travel, </h1><br><p>we kindly ask you to close out of this registration and book your air before completing your registration</p>');
		}
	}
}

/*
*							FORMVALIDATION
*/

//Main form validation
$('#mainForm').submit(function(e){
	try{
		var devError = '';
		goingToEvent = $('#RSVP_Status_Y').prop('checked');
		if((goingToEvent === true) || ($('#RSVP_Status_N').prop('checked') === true)){
			RSVPStatus.required = false;
		}
		//makeing sure that user has picked an RSVP
		if(RSVPStatus.required === true){
			error += '<li>' + RSVPStatus.message + '</li>';
		}
		//Including the developer's decoration of what is required and id changes
		setRequiredFormInputs();

		//						FORM CONDITIONALS

		//Hotel accommodation
		if(accommodation.required === true){
			if(accommodation.inputValue()){
				checkInDate.required = true;
				checkOutDate.required = true;
				accommodation.required = false;
			}else if(accommodation.inputValue() === false){
				checkInDate.required = false;
				checkOutDate.required = false;
			}
		}

		//Travel accommodation
		if(travelRequired.required === true){
			if(travelRequired.inputValue() === true){
				groundTransportationArrival.required = true;
				groundTransportationDeparture.required = true;
				travelRequired.required = false;
			}else if(travelRequired.inputValue() === false){
				groundTransportationArrival.required = false;
				groundTransportationDeparture.required = false;
			}
		}

		//						SPECIAL LOOKUPS OR EXCEPTIONS

		//travel agreement
		if($(travelAgreement.id).length){
			if(travelRequired.inputValue() === true){
				if(travelAgreement.inputValue() !== true){
					error += '<li>' + travelAgreement.message + '</li>';
					travelAgreement.removeFromValidateArray();
				}
			}
		}

		//flight Check
		if($(flightBooking.id).length){
			flightBooking.booked();
		}

		//selectable breakout session check
		if(breakoutSession.selectable === true){
			breakoutSession.selectFinalValues();
		}

		//Phone number validation for it to be a number
		if(mobileNumber.required === true){
			mobileNumber.numberValidation();
		}

		//PROCESSING LOOP
		if(goingToEvent === true){
			for (var i = 0; i < validateArray.length; i++){
				if(validateArray[i].required === true){
					//This is a check to see if ids are set correctly
					if($(validateArray[i].id).length == 0){
						devError += validateArray[i].id + i + '<br>';
					}else{
						//Iteration through the array
						if(($(validateArray[i].id).val() == '') || ($(validateArray[i].id).val() === null)){
							error += '<li>' + validateArray[i].message + '</li>';
						}else{
							validateArray[i].required = false;
						}
					}
				}
			}
		}

		//Dev Check
		if(devError != ''){
			e.preventDefault();
			errorDivBuilder('<h1>The following ids do not exist.</h1><p>' + devError + '<br>Please double check the ids of the form and the ids of the setRequiredFormInputs function </p>');
			devError = '';
		}

		//Submit Check
		if(error == ''){
			$('#error').remove();
		}else{
			e.preventDefault();
			$('#error').remove();
			$('#form').prepend('<div id="error"><ul>' + error + '</ul></div>');
			$('html, body').animate({
				scrollTop: $('#form').offset().top - 200
			}, 700);
			error = '';
		}
	}catch(err){
		e.preventDefault();
		errorDivBuilder(err.message);
	}
});


/*
*							DOCUMENT READY
*/

$(function(){
	//Calculating the height of class main
	$('.main').css({'padding-top': ($('.header').height() + 25)});

	//Starting out the document with the welcome screen unless it is requested to registration by URL
	contentOpening();
	//Populating the RSVP status
	goingToEvent = $('#RSVP_Status_Y').prop('checked');
	
	//Datepicker Init
	$('.datepicker').datepicker();
	//date formating
	$.datepicker.formatDate('mm/dd/yy');

	//Conditionals for form
	if(goingToEvent === true){
		$('#RSVP-check').show();
	}else{
		$('#RSVP-check').hide();
	}
	if(accommodation.inputValue() === true){
		$('#accommodation-check').show();
	}
	//conditionals for travel
		if(travelRequired.inputValue() == true ){
		$('#travel-check').show();
	}
	//conditonal for flight booking
	if(flightBooking.inputValue() !== true){
		$('#flight-check').hide();
	}
});

/*
*							DYNAMIC CREATED ITEMS EVENTS
*/


//For Dynamiclly created accordions
$(document).on('click', '.accordion-build', function(){
	$(this).next().slideToggle(750);
	$(this).children().toggleClass('show')
});



// function openMenu(){
// 	$('.nav li').toggleClass('menu-open');
// 	$('#hamburger-menu').toggleClass('menu-open');
// }




// 					//DOCUMENT READY

// $(function(){
// 	$(".container").css("min-height",$(window).height());


	
// });//end of doc ready

// $('#hamburger-menu').click(function(){
// 	openMenu();
// });

// $('.nav a').click(function(){
// 	openMenu();
// 	var hash = this.hash;
// 	$('html, body').animate({scrollTop: $(hash).offset().top}, 700, function() {
//  	   	window.location.hash = hash;
//  	});
// });







