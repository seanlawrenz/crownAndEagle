<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta charset="utf-8">
	<title>Crown And Eagle</title>
	<link rel="stylesheet" type="text/css" href="css/styles.css">
	<link href="https://fonts.googleapis.com/css?family=Cantarell:400|Roboto" rel="stylesheet">
	<?php require 'emailHandler.php';?>
</head>
<body>
	<div class="wrapper">
		<div class="nav">
			<div id="hamburger-menu">
				<span></span>
				<span></span>
				<span></span>
			</div>
			<ul>
				<li><a href="#home">Home</a></li>
				<li><a href="#aboutus">About Us</a></li>
				<li><a href="#appraisals">Appraisals</a></li>
				<li><a href="#contact">Contact Us</a></li>
			</ul>
		</div>
		<div class="hero" id="home">
			<h1>Crown &amp; Eagle</h1>
			<p>Central Ohio's Coin And Stamp Dealer</p>
		</div>
		<div class="CTA container">
			<h1>We like shiny things too!</h1>
			<p class="info">Serving Clintonville since 1984</p>
			<p>Crown and Eagle specializes in unique and rare materials. We specialize in appraising. Our staff has over 50 years experience with precious metals, exotic stamps, and coins.</p>
			<div class="secondary">
				<div>
					<img src="img/pin.png"><h2>Location</h2>
					<a href="http://maps.google.com/maps?q=5303+North+High+St,+Columbus,+OH+43214">5303 North High St
					</br>
					Columbus, OH 43214</a>
				</div>
				<div>
					<img src="img/agenda.png"><h2>Hours</h2>
					<p>Open Monday to Wednesday 10-5pm</br>
						Friday and Saturday 10-5pm</br>
						Closed Thursdays and Sundays</p>
				</div>
				<div>
					<img src="img/technology.png"><h2>Phone</h2>
					<a href="tel:1614362042">614-436-2042</a>
					<br>

				</div>
			</div>
		</div>
		<div class="container" id="aboutus">
			<h1>About Us</h1>
			<p class="info">We share your passion. Advice is freely given.</p>
			<p>
				Crown and Eagle was founded in 1984 primarily as a coin and stamp collection shop. In June of 2012, new management took over and expanded into a precious metals. Our current staff has over 60 plus years combined of numismatic experience. We also provide written insurance and estate appraisals. 
			</p>
			<p>
				Many of the collectibles have been auctions around the world. Collectibles have been regularly published in trade magazines. 
			</p>
			<p>
				Our showroom features collectible coins, coin collector supplies, paper money, stamps and other collectible items in a safe, secure environment.
			</p>
		</div>
		<div class="container" id="appraisals">
			<h1>Appraisals</h1>
			<p class="info">Crown and Eagle offers appraisals for you collection</p>
			<p>Coin Pricing Coin enthusiasts use four different terms when referring to coin values. </p>
			<p>
				The Catalog Price is an inflated price published on web sites and in coin magazines and coin books. People who know about coins rarely pay the catalog price. Next there is the retail price. This is the price that collectors usually pay for coins they purchase from coin dealers, from eBay and other auction houses, and from other collectors. Finally, there is the wholesale bid. This is the amount coin dealers are willing to pay for coins they buy from collectors and from the general public. When someone asks "What is my coin worth?" they usually mean "What can I sell this coin for?" i.e., they are asking for wholesale bid. Face value is the value shown on the coin itself. 
			</p>
			<p>
				Rules of thumb. For most collectible coins, wholesale bid runs about one-half of catalog and retail runs between bid and catalog. For special coins, such as those with rare dates, in excellent condition, or with unusual appeal, bid values can approach catalog value. Problem coins with scratches, spots, stains, or having been cleaned or mounted in jewelry, are worth far less than coins without problems. Usually problem coins carry no numismatic value at all. 
			</p>
			<p>
				How do I know what condition my coin is? The appraisal will determine the condition and will also determine where your coin price is.
			</p>
		</div>
		<div class="container" id="contact">
				<h1>Contact Us</h1>

				<?php echo $result;?> 
				
				<form method="post">
					<div class="form">
						<label for="email">Email:</label>
                    	<input type="email" name="email" placeholder="Enter your email"
                    	value="<?php echo $email;?>">
					</div>
					<div class="form">
						<label for="comment">Comments:</label>
                    	<textarea name="comment"rows="5" placeholder="Leave your comments"><?php echo $comment;?></textarea>
					</div>
					<div class="form">
						<input type="submit" class="btn" name="submit" value="Submit">
					</div>
				</form>

				<p>&#169;<?php echo date(Y)?> Crown and Eagle</p>

		</div>
	</div>
</body>
	<script type="text/javascript" src="js/app.min.js"></script>
</html>
