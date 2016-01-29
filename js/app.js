$("#interessen").hide();

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");

$overlay.append($image);
$overlay.append($caption);
$("#interessen").prepend($overlay);

function showInteressenLi() {
	$("#interessen").find("li").show();
}

$("#clickme").click(function(event) {
	event.preventDefault();
	$("#interessen").slideToggle();
	showInteressenLi();
	$overlay.hide();
});

$("#interessen").find("li").children("img").click(function(event) {
	event.preventDefault();
		
	var imageLocation = $(this).attr("src");
    $image.attr("src", imageLocation);
  
    var captionText = $(this).attr("alt");
    $caption.text(captionText);
    console.log($caption);
    $overlay.show();
    $("#interessen").children("li").hide();
});

$overlay.click(function(){
    $overlay.hide();
    showInteressenLi();
});