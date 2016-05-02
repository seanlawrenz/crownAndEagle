<?php
	$result="";
	$email="";
	$comment="";
	$tz = 'America/New_York';

	date_default_timezone_set($tz);

	if ($_SERVER['REQUEST_METHOD']== 'POST'){
	//looking for empty email, validing and populating the var $email
		if(empty($_POST['email'])){
			$error='<br>Please enter your email';
		}else{
			$email=($_POST['email']);
	// Remove all illegal characters from email
			$email = filter_var($email, FILTER_SANITIZE_EMAIL);
	// Validate e-mail
				if (filter_var($email, FILTER_VALIDATE_EMAIL) === false) {						
	   			 	$error='<br>Please enter a valid email';				    		
				}//end of validate email							
		}//end of email check
	//checking the comment fields and populating the var $comment
		if(empty($_POST['comment'])){
			
	        $error.='<br>Please enter some comments';
			
		}else{
		
	        $comment = htmlentities ( trim ( $_POST[ 'comment'] ) , ENT_NOQUOTES );
		}//end of if empty comment
	//printing the alert for empty fields and sending of email
		if($error){
			$result='<div class="alert-danger"><strong>There were the following errors:</strong>
			'.$error.'</div>';
		}else{
			$headers = 'From: crownandeagle@crownandeagle.com' . " " .
			'Reply-To: crownandeagle@crownandeagle.com' . " " .
			'X-Mailer: PHP/' . phpversion();
	//subject
			$subject="Comment from Crown and Eagle Customer";
	//email creator
				if(mail("slaw3223@yahoo.com",$subject,"Email of commenter: ".$email."
	Comment :".$comment,$headers)){
					$result='<div class="alert-success">Thank you! We will get back to you soon!</div>';
				}else{
					$result='<div class="alert-danger">Well, something did not happen. And it is not your fault. Try again later</div>';
				}//end of email creator
		}//end of if error and email send
	}//end of post statement
?>