var slideshow = function(tag) {
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?" + 
			"tags=" + tag + "&format=json&jsoncallback=?";
	var displayMessage = function (messageIndex) {
		if (tag !== "")  {
			$.getJSON(url, function (flickrResponse) {
				console.log(messageIndex);
				var $img = $("<img>").attr("src", flickrResponse.items[messageIndex].media.m).hide();
				$("main .photos").empty();
				$("main .photos").append($img);
				$img.fadeIn();
				setTimeout(function () {
					messageIndex = messageIndex + 1;
					displayMessage(messageIndex);
				}, 1000);
				if (messageIndex === 20) {
						messageIndex = -1;
				}
			});
		}
	};
	displayMessage(0);
}

var main = function () {
	"use strict"; 
	var tag = "";
	var $inputLabel = $("<h1>").text("Что хотим посмотреть?"),
		$input = $("<input>").addClass("tag"), 				
		$button = $("<button>").text("Поиск");
	$button.on("click", function () {
		tag = $input.val();
		$input.val("");
		if (tag !== "") {
			slideshow(tag);
		}
	});
	$("main .content").append($inputLabel).append($input).append("<br>").append($button); 
};
$(document).ready(main);