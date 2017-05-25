/*
*							BEGINNING OF CUSTOM JAVASCRIPT
*/

/*
*							GLOBAL VARS
*/

var error = '';
var goingToEvent;
var validateArray = [];

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
	//conditional statement for column stack
	if($('.split-column').length){
		this.beginningHTML = '<div class="accordion-container"><div class="accordion-build"><span class="chevron-arrow-orange"></span> <strong>';
		this.endHTML = '</p></div></div>';
	}
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

//Prototypes
InputValidation.prototype = {
	inputValue: function(){
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
	},
	removeFromValidateArray:function(){
		var removeThis = validateArray.indexOf(this);
		validateArray.splice(removeThis, 1);
	},
	numberValidation: function(){
		var regEx = new RegExp(/^[+]?([0-9]*[\.\s\-\(\)]|[0-9]+){3,24}$/);
		var value = $(this.id).val();
		if (value != ''){
			var testing = regEx.test(value);
			if (testing === false){
				error += '<li>Phone number must be a valid number</li>';
			}
		}
	},
	emailValidation: function(){
		var regEx = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
		var value = $(this.id).val();
		if (value != ''){
			var testing = regEx.test(value);
			if (testing === false){
				error += '<li>Email addres must be valid</li>';
			}
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
*							BREAKOUT SESSION EVENTS
*/


//Mother Breakouts Object
var Breakouts = function Breakouts(breakouts, inputs){
	this.breakouts = breakouts;
	this.inputs = inputs;
	this.selectionOrder = [];
	this.accordionDiv = '.breakout-accordion';
}

//Prototype Functions Breakouts
Breakouts.prototype = {
	//Boolean of if this is a returning user or not
	returningUser: function(){
		var endOfInputs = this.inputs.length - 1;
		if($(this.inputs[endOfInputs]).val() != ''){
			//Emptying the selection order
			this.selectionOrder = [];
			//Pushing the selections into the selection order array
			for(var i = 0; i < this.inputs.length; i++){
				this.selectionOrder.push($(this.inputs[i]).val());
			}
			return true
		}else{
			return false
		}
	},
	//Function for removing answers
	emptyInputs: function(){
		for(var i = 0; i < this.inputs.length; i++){
			$(this.inputs[i]).val('');
		}
	}
}

/*
*							SORTABLE UI
*/

//Child Object for Sorting
var SortBreakouts = function SortBreakouts(breakouts, inputs){
	Breakouts.call(this,breakouts,inputs);
	this.div = '#sortable';
}

//HTML markup
//Insuring the inheritance with Breakouts For EL5 based broswers
SortBreakouts.prototype = Object.create(Breakouts.prototype,{
	HTML:{
		value:function(header,id){
			return '<li class="ui-state-default" id="' + id +'"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>' + header + '</li>';		
		}
	},
	//Get the value of the selections and pushes it into the selectionOrder. 
	sortableInputValues:{
		value:function(){
			//refreshing the selection order
			this.selectionOrder = [];
			for (var i = 0; i < this.inputs.length; i++){
				this.selectionOrder.push($(this.inputs[i]).val());
			}
		}
	},
	finalValues:{
		value:function(){
			var inputs = this.inputs,
			div = this.div,
			selections = this.sortableInputValues()
			selectionOrder = this.selectionOrder;
			if(selections[0] == ''){
				selectionOrder = $(div).sortable('toArray');
				for(var i = 0; i < inputs.length; i++){
					$(inputs[i]).val(selectionOrder[i]);
				}
			}
		}
	}
});

//sorting Initalization
function sortInit(breakouts,newInputs,newDiv,newAccordionDiv){
	var buildSort = function(){
		//Adding accordions
		if($(this.accordionDiv).length){
			breakoutAccordions.call(this);
		}
		//Checking if this is a returning user
		if(this.returningUser() === true){
			this.sortableInputValues();
			sortArrayById(this.breakouts,this.selectionOrder);
		}
		//Adding to DOM
		breakoutBuilder.call(this);
	}
	if(breakouts === undefined){
		var sortBreakout = new SortBreakouts(breakoutSessions,inputs);
	}else{
		//Multiple breakouts
		var sortBreakout = new SortBreakouts(breakouts,newInputs);
		if(newDiv !== undefined){
			sortBreakout.div = newDiv;
		}
		if(newAccordionDiv !== undefined){
			sortBreakout.accordionDiv = newAccordionDiv;
		}
	}
	buildSort.call(sortBreakout);
	//jquery UI initalizing
	$(sortBreakout.div).sortable({
		placeholder: 'ui-state-active',
		//pushing the values into the inputs
		stop: function(event,ui){
			sortBreakout.selectionOrder = $(sortBreakout.div).sortable('toArray');
			for(var i = 0; i < sortBreakout.inputs.length; i++){
				$(sortBreakout.inputs[i]).val(sortBreakout.selectionOrder[i]);
			}
		}
	});
	return sortBreakout;
}
/*
*							SELECTABLE UI
*/

//Child Object for selecting
var SelectBreakouts = function SelectBreakouts(breakouts,inputs){
	Breakouts.call(this, breakouts,inputs);
	this.div = '#selectable';
	this.message = '';
}

//HTML markup
//Insuring the inheritance with Breakouts For EL5 based broswers
SelectBreakouts.prototype = Object.create(Breakouts.prototype,{
	HTML:{
		value:function(header, id){
			if(this.returningUser() === true){
				//Updating the 'checked' if returning user had checked it
				var index = this.selectionOrder.indexOf(id);
				if(index >= 0){
					//It's been checked
					this.beginningHTML = '<input type="checkbox" checked name="';
				}else{
					//It hasn't been checked
					this.beginningHTML = '<input type="checkbox" name="';
				}
			}else{
				//Starting fresh
				this.beginningHTML = '<input type="checkbox" name="';
			}
			//Returning the final string
			return this.beginningHTML + id + '" id="' + id + '"><label for="' + id + '">' + header + '</label>';
		}
	},
	finalValues:{
		value:function(){
			//Emptying the inputs
			this.emptyInputs();
			//Emptying out the selection order
 			this.selectionOrder = [];
 			//Grabbing the selections
	 		this.breakouts.forEach(function(breakout){
				if($('input[name="' + breakout.id + '"]').is(':checked') === true){
					this.selectionOrder.push(breakout.id);
				}
			},this);
			//Pushing the selected answers
			for (var i=0; i < this.selectionOrder.length; i++){
				$(this.inputs[i]).val(this.selectionOrder[i]);
			}
			//Making sure at least the min amount of breakouts sessions are selected
			var endOfInputs = this.inputs.length - 1;
			if($(this.inputs[endOfInputs]).val() == ''){
				//Adding to the global variable error
				error += '<li>' + this.message + '</li>';
			}
		}	
	}
});

//selection Initalizing
function selectInit(limit, breakouts, newInputs, newDiv, newAccordionDiv){
	//clouser function
	var buildSelect = function(){
		//editing the message to be dynamic
		this.message = 'Please select at least ' +  limit + ' sessions';
		//Building Accordions
		if ($(this.accordionDiv).length){
			breakoutAccordions.call(selectBreakout);
		}
		//Adding to DOM
		breakoutBuilder.call(this);
		//Limiting the amount of checkboxes to check
		$(this.div + ' input').on('change', function(e){
			if($(this).siblings(':checked').length >= limit){
				this.checked = false;
			}
		});
	}
	if(breakouts == undefined){
		//Single breakouts
		var selectBreakout = new SelectBreakouts(breakoutSessions, inputs);
		//highjacking Input validation breakoutSession to call on form submit
		breakoutSession = selectBreakout
		breakoutSession.breakoutUI = 'select'
	}else{
		//multiple breakouts
		var selectBreakout = new SelectBreakouts(breakouts,newInputs);
		if(newDiv !== undefined){
			selectBreakout.div = newDiv;
		}
		if(newAccordionDiv !== undefined){
			selectBreakout.accordionDiv = newAccordionDiv;
		}
	}
	//Calling the clouser
	buildSelect.call(selectBreakout);
	return selectBreakout
}

//Making Accordion Boxes
function breakoutAccordions(){
	this.breakouts.forEach(function(breakout){
		var breakoutAccordion = new AccordionBuilder(breakout.header,breakout.message);
		breakoutAccordion.buildAccordion(this.accordionDiv);
	},this);
}

//HTML builder
function breakoutBuilder(){
	this.breakouts.forEach(function(breakout){
		$(this.div).append(this.HTML(breakout.header,breakout.id));
	},this);
}

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
	$('div[class^="side-info').show();
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
	if($('.registration').length){
		//For menu based sites
		$('.content').hide();
		$('.left-side').hide();
		$('div[class^="side-info').hide();
		$('#form').show();
		$('.register-button').hide();
		$('.nav a').removeClass('menu-active');	
	}else if($('.registration-slide')){
		//For accordion based sites
		$('#form').show();
		$('html, body').animate({scrollTop: $('#form').offset().top},700);
	}
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
	if ((tab == 'regnow') || (tab == 'register')){
		openRegistrationForm();
	}else if(tab === 'decline'){
		openRegistrationForm();
		$('#RSVP_Status_N').prop('checked', true);
	}else{
		contentDisplay(0);
	}
}

//Dynamically split into columns
function columnSpliter(){
	var numCols = 2, //Can be changed to 3 or 4 columns
	container = $('.split-column'),//location on document. Must be added to HTML
    //location on document. Must be added to HTML
	listItem = $('.accordion-container'),
	listClass = 'sub-column',
	perCentWidth = Math.floor((10/numCols) * 10);

	container.each(function(){
		var itemsPerCol = [],
		items = $(this).find(listItem),
		minItemsPerCol = Math.floor(items.length / numCols),
		difference = items.length - (minItemsPerCol * numCols);
		//Doing Math to shuffle the correct amount of per Column
		for(var i = 0; i < numCols; i++){
			if(i < difference){
				itemsPerCol[i] = minItemsPerCol + 1;
			}else{
				itemsPerCol[i] = minItemsPerCol;
			}
		}
		//Builds a div and populates it with the accordion divs
		for(var i = 0; i < numCols; i++){
			$(this).append($('<div></div>').addClass(listClass));
			for(var j = 0; j < itemsPerCol[i]; j++){
				var pointer = 0;
				for(var k = 0; k < i; k++){
					pointer += itemsPerCol[k];
				}
				$(this).find('.' + listClass).last().append(items[j + pointer]);
			}
		}

		//Some CSS fixes
		
	});
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
	openRegistrationForm()
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

		if(goingToEvent === true){
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

			//Phone number validation for it to be a number
			if(mobileNumber.required === true){
				mobileNumber.numberValidation();
			}

			//Breakout UI final Values
			if(breakoutSession.breakoutUI === 'select'){
				breakoutSession.finalValues();
			}

			//PROCESSING LOOP
		
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
		}//END OF GOING TO EVENT
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
*							WINDOW LOADED FUNCTIONS
*/	

$(window).on('load', function(){
	//Calculating the height of class main
	$('.main').css({'padding-top': ($('.header').height() + 25)});
});


/*
*							DYNAMIC CREATED ITEMS EVENTS
*/


//For Dynamiclly created accordions
$(document).on('click', '.accordion-build', function(){
	$(this).next().slideToggle(750);
	$(this).children().toggleClass('show')
});