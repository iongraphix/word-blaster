var APPNAME = 'Word Blaster';
var VERSION = 'v1.0';

var json_data = null;
var chosen_idx = null;
var chosen_obj = null;

var curr_index_word = 0;

function fill_list(data){
	$.each( data, function( key, val ) {
		var idx = key;
		var obj = val;
		$("#my-word-template").tmpl({index: idx, item : obj}).appendTo(".list-container").slideDown();
	});
}
function display(op,ident){
	if(op == 'show'){
		$("#"+ident).addClass( "md-show" );
	}
	else {
		if($("#"+ident).hasClass( "md-show" )){
    		$("#"+ident).removeClass( "md-show" );
    	}
	}
}
function initSlider(){
	console.log("Initializing slider"); 	
}
function switchView(section){
	$("section.top-level").fadeOut();
	$(section).fadeIn(section);
}
function startTimer(){
	curr_index_word = 0;
	$("#word-name").html(chosen_obj.word_list[curr_index_word]);
	
	console.log("current idx: "+curr_index_word);
	console.log(chosen_obj.word_list[curr_index_word]);
	console.dir(chosen_obj.word_list);
	var size = chosen_obj.word_list.length;
	console.log(size);
	$('#time-left').timer({
    duration: chosen_obj.duration+'s',
    callback: function() {
    	curr_index_word++;
    	if(curr_index_word == (size)){
    		$('#time-left').timer('remove');
    		$('#time-left').html('All Done');
    		$('#word-name').html('Well Done!');
    		swal({   title: "Great job!", type: "success",   text: "You have Completed the lesson.",   html: true });
    	}
    	else {
	    	$('#time-left').timer('reset');
	    	$(".play-demo-content").addClass("animated shake");
	    	window.setTimeout(function(){
			$(".play-demo-content").removeClass("animated shake");
			}, 200);

	    	$("#word-name").html(chosen_obj.word_list[curr_index_word]);	
    	}
    	},
    repeat: true
	});
}
function stripAnimate(){
	$(".play-demo-content").removeClass('animated');
}
function setupEventHandlers(){
	console.log("Setting up Event Handlers");
	initSlider();
	$("a.btn-final").click(function(e){
		e.preventDefault();
		console.log("Starting Game");
		display("hide", "get-set");
		$(".play-demo-content").addClass("animated rollIn");
		window.setTimeout(function(){
			$(".play-demo-content").removeClass("animated rollIn");
		}, 700);
		switchView('#word-play');
		document.title = chosen_obj.title;
		// this is where the games starts
		startTimer();

	});
	$("a.btn-back-list").click(function(e){
		e.preventDefault();
		console.log("Back Button CLicked");
		$(".play-demo-content").addClass("animated rollOut");
		window.setTimeout(function(){
			$(".play-demo-content").removeClass("animated rollOut");
			$('#time-left').timer('remove');
			switchView('#word-list');
		}, 100);
		document.title = APPNAME+' - '+VERSION;
		
	});
	$("a.btn-word").click(function(e){
		e.preventDefault();
		console.log("Stubborn Button");
		var parent  = $(this).closest('.section-card');
		var ident  = parent.data("card-no");
		chosen_idx  = ident;
		$("#get-set").data('idx', chosen_idx);
		var obj = json_data[ident];
		chosen_obj = obj;
		$("#secs").html(chosen_obj.duration+"s");
		display("show", "get-set");
	});

	$(".md-overlay").click(function(){
		console.log("Clickity");
		if($(".md-modal").hasClass( "md-show" )){
		    		$(".md-modal").removeClass( "md-show" );
		 }
	});

	$("body").keyup(function(e) { 
    if (e.keyCode == 27) { 
    	if($(".md-modal").hasClass( "md-show" )){
    		$(".md-modal").removeClass( "md-show" );
    		resetAsllModalValues();
    	}
    } 
	});
}
function getJSON(){
		$.getJSON( "data/all.json").success(function(result) {
	    	json_data = result.word_packages;
	    	fill_list(json_data);
	    	setupEventHandlers();
	    	}).error(function(error){console.log(error);});
}
$(document).ready(function(){
		document.title = APPNAME+' - '+VERSION;
		console.log('\r\n%c                     *      .--.\r\n%c                           \/ \/  `\r\n%c          +               | |\r\n%c                 \'         \\ \\__,\r\n%c             *          +   \'--\'  *\r\n%c                 +   \/\\\r\n%c    +              .\'  \'.   *\r\n%c           *      \/======\\      +\r\n%c                 ;:.  _   ;\r\n%c                 |:. (_)  |\r\n%c                 |:.  _   |\r\n%c       +         |:. (_)  |          *\r\n%c                 ;:.      ;\r\n%c               .\' \\:.    \/ `.\r\n%c              \/ .-\'\':._.\'`-. \\\r\n%c              |\/    \/||\\    \\|\r\n%c            _..--\"\"\"````\"\"\"--.._\r\n%c      _.-\'``                    ``\'-._\r\n%c    -\'         %cHello, explorer%c        \'-\r\n%c' +
        '\n       Curious? Ask https://plus.google.com/+DominicDamoah',
        'color:#D0E3F1','color:#D0E3F1','color:#C0DAEC','color:#C0DAEC','color:#B0D1E8','color:#B0D1E8','color:#A1C7E3','color:#A1C7E3','color:#91BEDE','color:#91BEDE','color:#81B5D9','color:#81B5D9','color:#72ABD5','color:#72ABD5','color:#62A2D0','color:#62A2D0','color:#5299CB','color:#5299CB','color:#4390C7','color:#4390C7', 'color:#4390C7', 'color: #000000');
		console.log("Word Blaster v1.0 Launch");
		console.log("Blast Off! ...");
		getJSON();
});