// Address Initialize
$.address.crawlable(true).state("/").change(function(event) {
	// Default State
	if (event.value == "/") {event.value = "index"}
	// Pre-animation
	$("#content").animate({"top": "+=80", "opacity": "0"}, 300, function() {
		$("#content").css({"top": "-80px"});
		$("#content").empty();
		// Load Event
		$("#content").load(event.value + " div.content",
			// Post-animation
			function() {
				var urlString = event.value;
				$("#content").css({"display": "block"}).animate({"top": "0", "opacity": "1"}, 300);
				document.title = "Louis Kam / " + $(".content h2").text();
				if (event.value == "index") {$("h2.heading-index").airportintro(["You have arrived at the Main Terminal.", "Please observe placards to proceed.", "We wish you a safe and pleasant voyage."]);}
				if (event.value == "/design") {
					$(".project-shelf a").click(function() {
						$.address.value($(this).attr('href'));
						return false;
					});
					$("h3.heading-design").airportintro(["Join us in our duty-free plaza before take-off.", "Make your selection and start shopping."]);
					itemAnimations();
					// Isotope Handler
					$(function(){
						var $container = $("div.project-shelf");
						$container.isotope({
							itemSelector : "div.item"
						});  
						
						var $optionSets = $(".option-set-design"),
							$optionLinks = $optionSets.find("a");
						
						$optionLinks.click(function(){
							var $this = $(this);
							if ( $this.hasClass("selected") ) {
							  return false;
							}
							var $optionSet = $this.parents(".option-set-design");
							$optionSet.find(".selected").removeClass("selected");
							$this.addClass("selected");
					  
							var options = {},
								key = $optionSet.attr("data-option-key"),
								value = $this.attr("data-option-value");

							value = value === "false" ? false : value;
							options[ key ] = value;
							if ( key === "layoutMode" && typeof changeLayoutMode === "function" ) {
							  changeLayoutMode( $this, options )
							} else {
							  $container.isotope( options );
							}
							return false;
						});
					});
				}
				if (event.value == "/music") {
					$("h3.heading-music").airportintro(["Welcome to your in-flight entertainment console.", "Please select a channel, then relax and enjoy."]);
					$.ajax({url: "../js/soundmanager2.js", dataType: "script", success: function() {loadPlayer()} });
					$(function(){
						$("div.sm2-inline-list").isotope({
							itemSelector : "div.ui360-vis",
							animationEngine: "jquery"
						});
					});
				}
				if (event.value == "/dossier") {
					$("h3.heading-dossier").airportintro(["Fly with complete and total peace of mind.", "Get to know your expert in-cabin flight crew."]);
					$(function(){
						var $container = $("div.dossier-box-container");
						$container.isotope({
							itemSelector : "div.dossier-box"
						});  
						
						var $optionSets = $(".option-set-dossier"),
							$optionLinks = $optionSets.find("a");
						
						$optionLinks.click(function(){
							var $this = $(this);
							if ( $this.hasClass("selected") ) {
							  return false;
							}
							var $optionSet = $this.parents(".option-set-dossier");
							$optionSet.find(".selected").removeClass("selected");
							$this.addClass("selected");
					  
							var options = {},
								key = $optionSet.attr("data-option-key"),
								value = $this.attr("data-option-value");

							value = value === "false" ? false : value;
							options[ key ] = value;
							if ( key === "layoutMode" && typeof changeLayoutMode === "function" ) {
							  changeLayoutMode( $this, options )
							} else {
							  $container.isotope( options );
							}
							return false;
						});
					});
				}
				if (event.value == "/contact") {
					$("h3.heading-contact").airportintro(["We hope you enjoyed your time with us.", "Let us know how we did with a message."]);
					$("#contact-form").validate({
						messages: {
							name: "We'd like to know how to address you.",
							email: {
								required: "Please provide a mode of contact.",
								email: "It appears the formatting is not quite correct."
							},
							message: "Is there something you would like to tell us?"
						},
						submitHandler: function() {
							var name = $("input#name").val();
							var email = $("input#email").val();
							var message = $("textarea#message").val();
							var postString = "name="+ name + "&email=" + email + "&subject=Portfolio Contact" + "&message=" + message;  
							$.ajax({  
							  type: "POST",  
							  url: "/contact.php",  
							  data: postString,  
							  success: function() {
							  	$("#contact-form-container").animate({top: "+=80", opacity: 0}, 300, function() {
									$(this).html("<div class='submit-message'></div>");
									$(".submit-message").html("<h3>Your inquiry has been received.</h3>").append("<p>If you have requested a response, you will be hearing from a representative shortly.</p><p>Thank you for flying with us. Your satisfaction is our priority.</p>");
									$(this).css({"top": "-80px"}).animate({top: "0", opacity: 1});
								});
							  }
							});
						}
					});
				}
				if (urlString.match(/^\/design\/\S+$/)) {
					var initHeight, initWidth, initRatio, imgHeight, imgWidth, windowWidth, windowHeight, widthRatio, heightRatio, ratio, backRatio = null;
					
					$(".resize").each(function() {
						$(this).parent().css({"width": "600px", "height": "150px", "overflow": "hidden"}).prepend("<div class='project-loader'><img src='/assets/loader.gif' alt='Loading Image' /></div>");
						$(this).parent().find(".project-image-caption").css("display", "none");
						$(this).css("opacity", 0);
						$(this).load(function() {
							$(this).parent().css({"width": "", "height": "", "overflow": ""});
							$(this).parent().find(".project-image-caption").css("display", "block");
							$(this).parent().find(".project-loader").remove();
							initHeight = $(this, "img")[0].height;
							initWidth = $(this, "img")[0].width;
							initRatio = 600 / initWidth;
							$(this).attr({"width": 600, "height": initHeight * initRatio});
							$(this).css({"width": "600px", "height": Math.floor(initHeight * initRatio)+"px"}).animate({"opacity": 1}, 300);
						});
					});

					$(".project-image").append("<span class='project-resize-icon project-resize-icon-off'> </span>").on("mouseenter", function() {$(this).find(".project-resize-icon").css("display", "block");}).on("mouseleave", function() {$(this).find(".project-resize-icon").css("display", "none")});
					$(".project-image").after("<br />");
					$(".project-image").each(function() {$(this).toggle(
						function() {
							windowWidth = $(window).width() - 410;
							windowHeight = $(window).height() - 180;
							imgHeight = $(this).find("img")[0].height;
							imgWidth = $(this).find("img")[0].width;
							
							widthRatio = windowWidth / imgWidth;
							heightRatio = windowHeight / imgHeight;
							
							if (windowWidth > imgWidth && windowHeight > imgHeight) {
								if (widthRatio >= heightRatio) {
									ratio = heightRatio;
								}
								else if (heightRatio > widthRatio) {
									ratio = widthRatio;
								}
							}
							else {ratio = 1.1;}
							
							$(this).find(".resize").stop(true, false).animate({width: (imgWidth * ratio), height: (imgHeight * ratio)}, 300, function() {
							$(this).parent().find(".project-resize-icon").removeClass("project-resize-icon-off").addClass("project-resize-icon-on");
							});
						},
						function(){
							imgHeight = $(this).find(".resize")[0].height;
							backRatio = ($(this).find(".resize").width()) / (600);
														
							$(this).find(".resize").stop(true, false).animate({width: "600px", height: $(this).find(".resize").attr("height") + "px"}, 300, function() {
							$(this).parent().find(".project-resize-icon").removeClass("project-resize-icon-on").addClass("project-resize-icon-off");
						});
						}
					)
					});
				}
		});
	});
	$("a:not([href^=http])").click(function() {
		$.address.value($(this).attr('href'));
		return false;
	});
});
document.write('<style type="text/css"> #content { display: none; } </style>');

// Load Design Functions
function itemAnimations() {
	$(".item-description").each(function() {
		var bottomOffset = $(this).find(".item-excerpt").height() + 15;
		$(this).css("bottom", "-" + bottomOffset + "px");
	});
	$(".item-link").on("mouseenter", function() {
		$(this).find("span").stop().animate({color: jQuery.Color("#ffffff")}, 300);
		$(this).find(".item-description").stop().animate({backgroundColor: jQuery.Color("#44b2ff"), "bottom": "0"}, 300);
	});
	$(".item-link").on("mouseleave", function() {
		var bottomOffset = $(this).find(".item-excerpt").height() + 15;
		$(this).find("span").stop().animate({color: jQuery.Color("#666666")}, 300);
		$(this).find(".item-description").stop().animate({backgroundColor: jQuery.Color("#cccccc"), "bottom": "-"+ bottomOffset +"px"}, 300);
	});	
}

// Load Music Functions
function loadPlayer() {
	$.ajax({
	  url: "../js/360-player.js",
	  dataType: "script",
	  success: function() {initMusic()}
	});
}
function initMusic() {
	function getInternetExplorerVersion()
	{
	  var rv = -1;
	  if (navigator.appName == 'Microsoft Internet Explorer')
	  {
		var ua = navigator.userAgent;
		var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if (re.exec(ua) != null)
		  rv = parseFloat( RegExp.$1 );
	  }
	  return rv;
	}
	function checkVersion()
	{
	  var ver = getInternetExplorerVersion();
	  if ( ver > -1 )
	  {
		  $.ajax({
			  url: "../js/excanvas.js",
			  dataType: "script"
		  });
	  }
	}
	checkVersion();
	soundManager.setup({
	  url: 'js/swf/'
	});
	
	threeSixtyPlayer.config.scaleFont = (navigator.userAgent.match(/msie/i)?false:true);
	threeSixtyPlayer.config.showHMSTime = true;
	
	// Spectrum
	threeSixtyPlayer.config.useWaveformData = false;
	threeSixtyPlayer.config.useEQData = false;
	
	// Enable in SM2
	if (threeSixtyPlayer.config.useWaveformData) {
	  soundManager.flash9Options.useWaveformData = false;
	}
	if (threeSixtyPlayer.config.useEQData) {
	  soundManager.flash9Options.useEQData = false;
	}
	if (threeSixtyPlayer.config.usePeakData) {
	  soundManager.flash9Options.usePeakData = false;
	}
	
	if (threeSixtyPlayer.config.useWaveformData || threeSixtyPlayer.flash9Options.useEQData || threeSixtyPlayer.flash9Options.usePeakData) {
	  soundManager.preferFlash = false;
	}
	if (window.location.href.match(/hifi/i)) {
	  threeSixtyPlayer.config.useFavIcon = false;
	}
	if (window.location.href.match(/html5/i)) {
	  soundManager.useHTML5Audio = true;
	}
}

// Initialize Page
$(document).ready(function(){
	$(".content").height($("#header").height() - 32);
	// Logo Hover
	$("#logo a span").on("mouseenter", function() {$(this).stop().animate({opacity: 1}, 200);});
	$("#logo a span").on("mouseleave", function() {$(this).stop().animate({opacity: 0}, 200);});
	
	// Navigation Hover
	$("#navigation li a").each(function(i) {$(this).css("width", $(this).width()+"px").airport([$(this).attr("class")]);});
	
	$("#navigation li a").on("mouseenter", function() {$(this).stop().animate({backgroundColor: jQuery.Color("#7d7d7d"), color: jQuery.Color("#ffffff")}, 200 );});
	$("#navigation li a").on("mouseleave", function() {$(this).stop().animate({backgroundColor: jQuery.Color("transparent"), color: jQuery.Color("#999999")}, 200 ).airport([$(this).attr("class")]);});
	
});