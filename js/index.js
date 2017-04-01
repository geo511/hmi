/* TOP NAVBAR */

/* Toggle between adding and removing the responsvie class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*Animate the hamburguer Icon */
var el = document.getElementById('nav-icon1');

el.addEventListener('click', function(){
        this.classList.toggle('open');
});


/* Set the width of the side navigation to 250px */
function openNav() {
    var navbar = document.getElementById("mySidenav");
    if (navbar.style.width === '90px'){
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("mySidenav_background").style.width="0%";
        //document.getElementById("main").style.marginLeft = "0";
    } else {
        document.getElementById("mySidenav").style.width = "90px";
        document.getElementById("mySidenav_background").style.width = "100%";
        //document.getElementById("main").style.marginLeft = "90px";
         
    }
};

function closeNav() {
    var el = this.el;
    openNav();
    el.classList.toggle('open');
}


/**********************/
/* TRANSCRIPT DYNAMIC */
/**********************/

/ Pointers /

var transcriptIcon = document.getElementById("transcript_icon");

transcriptIcon.addEventListener('click', function() {
  document.getElementById("transcript_section").classList.toggle('transcript_close');
});

/************************/
/* MATERIAL_BOX DYNAMIC */
/************************/

var material_buton = document.getElementById("materials");

material_buton.addEventListener('click', function() {
    var material_box_content =document.getElementById("material_content");
    var material_box_inner = document.getElementById("material_content_inner");
    material_box_content.classList.toggle('material_open');
    material_box_inner.classList.toggle('content_inner_open');
    
});


/*********************
/***  FORUM MODAL ***/
/********************/

//Get the modal
var modal = document.getElementById('myModal');

//Get the button that opens the modal
var btn = document.getElementById("question");

//Get the cancel div for closing the window
var cancel = document.getElementById("cancel_button");

//Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//Get the submit button
var submit = document.getElementById("submit_button");

//When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

//When the useer clicks on the cancel text, close the window
cancel.onclick = function() {
    modal.style.display = "none";
}

//When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

submit.onclick = function() {
    modal.style.display = "none";
}

//When the user clicks anywhere outside ot the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

/*************************
* LESSONS COLLAPSIBLE MENU
**************************/

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function() {
        /* Toggle between adding and removing the "active" class, to highlight the button that controls the panel */
        this.classList.toggle("active");
        
        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }
}

/*************************
* LESSONS MENU HIDE/UNHIDE
**************************/

// OPEN AND CLOSE SIDENAV //

/* Set the width of the side navigation to 250px */
function openSideNav() {
    var navbar = document.getElementById("LessonSidenav");
    if (navbar.style.width === '22.5%'){
        document.getElementById("LessonSidenav").style.width = "0%";
        document.getElementById("collapsible_bg").style.width = "0%";
        
    } else {
        //console.log("hello_open")
        document.getElementById("LessonSidenav").style.width = "22.5%";
        document.getElementById("collapsible_bg").style.width = "100%";
        
    }
};

// Touching the background close the sidenav

var lesson_bg = document.getElementById('collapsible_bg');

lesson_bg.addEventListener('click', function(){
    document.getElementById("LessonSidenav").style.width = "0%";
    document.getElementById("collapsible_bg").style.width = "0%";
});

/***************************
*   DYNAMIC VIDEO LOADER   *
/**************************/
var actualVideo = 'prayer';

function loadVideo(event) {
    var video = document.getElementById("video");
    var mp4 = document.getElementById('mp4');
    var id = window.event.target.id;
    var parentId = window.event.target.parentElement.id;
    var innerText = window.event.target.innerHTML;
    var breadcrumb = document.getElementById("breadcrumb");
    var time = video.duration;
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var total_duration = document.getElementById("total_duration");
    var progressBar = document.getElementById("progressBar");
    var trackSpanish = document.getElementById("track_spanish");
    var trackEnglish = document.getElementById("track_english");
    actualVideo = id;
        
    mp4.src = "video/" + id + ".mp4";
        
        
    trackEnglish.removeAttribute("src");
    trackSpanish.removeAttribute("src");
    
    trackEnglish.src = "transcripts/vtt/" + id + ".vtt";
    trackSpanish.src = "transcripts/vtt/Sp" + id + ".vtt";
    
        
    video.load();
    $("#interactive_text_content").load('transcripts/'+ id + '.html');
    
                
    video.play();
    
    breadcrumb.innerHTML = parentId + " / " + innerText;
    progressBar.value = 0;
}

//Function Used in State Simulation
function loadNewVideo(){
    var video = document.getElementById("video");
    var mp4 = document.getElementById('mp4');
    var currentVideo = actualVideo;
    var breadcrumb = document.getElementById("breadcrumb");
    var time = video.duration;
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    var total_duration = document.getElementById("total_duration");
    var progressBar = document.getElementById("progressBar");
    var trackSpanish = document.getElementById("track_spanish");
    var trackEnglish = document.getElementById("track_english");
    var innerText = 'Presentation & Prayer';
    var parentId = 'Course Start';
    
    switch (currentVideo){
        case 'prayer':
            parentId = "Presentation & Prayer";
            innerText = "Course Start";
            break;
        case 'assigment':
            parentId = "Presentation & Prayer";
            innerText = "Assigment";
            break;
        case 'whyStudy':
            parentId = "Why Study Hebrews";
            innerText = "Why Study Hebrews";
            break;
        case 'whatStudy':
            parentId = "Why Study Hebrews";
            innerText = "What We are going to Study...";
            break;
        case 'author':
            parentId = "Introduction";
            innerText = "Author of the Book";
            break;
        case 'date':
            parentId = "Introduction";
            innerText = "Date of the Book";
            break;
        case 'toWho':
            parentId = "Introduction";
            innerText = "To Whom it was written";
            break;
        case 'purpouse':
            parentId = "Introduction";
            innerText = "Purpose of the Book";
            break;
        case 'root':
            parentId = "Fundamental Aspects";
            innerText = "The Root of Christianity";
            break;
        case 'whatShow':
            parentId = "Fundamental Aspects";
            innerText = "What shows the Author";
            break;
        case 'highPriest':
            parentId = "Fundamental Aspects";
            innerText = "Christ the High Priest";
            break;
        default:
            parentId = "Presentation & Prayer";
            innerText = "Course Start";
            break;
    }
    
    mp4.src = "video/" + currentVideo + ".mp4";
            
    trackEnglish.removeAttribute("src");
    trackSpanish.removeAttribute("src");
    
    trackEnglish.src = "transcripts/vtt/" + currentVideo + ".vtt";
    trackSpanish.src = "transcripts/vtt/Sp" + currentVideo + ".vtt";
    
    progressBar.value = 0;
    video.load();
    $("#interactive_text_content").load('transcripts/'+ currentVideo + '.html');
    
    breadcrumb.innerHTML = parentId + " / " + innerText;
    video.play();
    
}

function loadNextVideo(){
    var video_array = ['prayer','assigment','whyStudy','whatStudy','author','date','toWho','purpouse','root','whatShow','highPriest'];
    var video = document.getElementById("video");
    var mp4 = document.getElementById('mp4');
    var idVideo = video_array.indexOf(actualVideo);
    var nextVideoId = idVideo + 1;
    var nextVideo = video_array[nextVideoId];
    
    actualVideo = nextVideo;
    
    loadNewVideo();
}

function loadPrevVideo(){
    var video_array = ['prayer','assigment','whyStudy','whatStudy','author','date','toWho','purpouse','root','whatShow','highPriest'];
    var video = document.getElementById("video");
    var mp4 = document.getElementById('mp4');
    var idVideo = video_array.indexOf(actualVideo);
    var prevVideoId = idVideo - 1;
    var prevVideo = video_array[prevVideoId];
    
    actualVideo = prevVideo;
    
    loadNewVideo();
}


$("#interactive_text_content").on("click", "div", function( event) {
    var cont = $(this).find('span').first().attr('data-time');
    var start = parseFloat(cont);
    video.currentTime = start;
    video.play(); 
});


var $video = $("#video");

/* Video Loader Gif */

$video.on('loadstart', function (event) {
    $(this).addClass('loading');
});
$video.on('canplay', function (event) {
    $(this).removeClass('loading').fadeIn(1000);
});



$video.on("timeupdate", function(evt){
    if (this.paused || video.ended){
        return;
    }
    
    var current = -1;
    var cues = document.getElementsByClassName("cue");
    var trans_text = $("#interactive_text_content");
    
        
    for (i=0; i<cues.length; i++){
        var cueTime = cues[i].getAttribute("data-time");
        if (/*cues[i].className.indexOf("current") == -1 &&*/
           this.currentTime >= parseFloat(cueTime) &&
           this.currentTime < parseFloat(cueTime)) {
                //trans_text.scrollTop = cues[i].offsetTop - trans_text.offsetTop;
                console.log("hello");
        }
    }
    
});

/***************************
*    CUSTOM VIDEO PLAYER   *
/**************************/

//Hide the default controls
    video.controls = false;

/*Variables
_________________________________________*/

//Video

var $videoContainer = $("#video_container");

//Video Controls
var $videoControls = $("#videoControls");
var $buttonControls = $("#buttonControls");
var $progressBar = $("#progressBar");
var $progress = $("#progress");
var $playButton = $("#play");
var $stopButton = $("#stop");
var $muteButton = $("#mute");
var $volumeSlider = $("#volumeSlider");
var $fullSreenBtn = $("#fullScreen");
var $duration = $("#duration");
var $fastFwd = $("#fastFwd");
var $total_duration = $("#total_duration");

//Video Icons
var $iconPlay = $("#play_button");
var $iconPause = $("#pause");
var $mute_icon = $("#mute_icon");
var $unmute_icon = $("#unmute_icon");


/*VIDEO PLAYER
_________________________________________*/


//Toggles play/pause for the video
function playVideo() {
    if($video[0].paused) {
        $video[0].play();
        //$buttonControls.hide();
        $iconPause.css("opacity", "1");
        $iconPlay.css("opacity", "0");
        $videoControls.css("margin-top", "5%");
    } else {
        $video[0].pause();
        $iconPause.css("opacity", "0");
        $iconPlay.css("opacity", "1");
    }
}


//Mutes the video
function muteVideo() {
    if ($video[0].muted === false) {
        $video[0].muted = true;
        $unmute_icon.css("opacity", "1");
        $mute_icon.css("opacity", "0");
    } else {
        $video[0].muted = false;
        $unmute_icon.css("opacity", "0");
        $mute_icon.css("opacity", "1");
    }
}

//Changes video playback rate
function changeSpeed() {
    if($video[0].playbackRate === 1) {
        $video[0].playbackRate = 1.25;
        $fastFwd.text("1.25 Speed");
    } else if ($video[0].playbackRate === 1.25) {
        $video[0].playbackRate = 1;
        $fastFwd.text("1x Speed");
    }
}


//Full screen function
function launchFullscreen() {
    if($video[0].requestFullscreen) {
        $video[0].requestFullscreen();
    } else if($video[0].mozRequestFullScreen) {
        $video[0].mozRequestFullScreen();
    } else if ($video[0].webkitRequestFullscreen){
        $video[0].webkitRequestFullscreen();
    } else if($video[0].msRequestFullscreen) {
        $video[0].msRequestFullscreen();
    }
}

//Play/pause on video click
$video.click(function() {
    playVideo();
});

//Play/pause on spacebar
$("body").on("keydown", function(e) {
    if(e.keyCode === 32) {
        e.preventDefault();
        playVideo();
    }
});

//Mute/sound on m key
$("body").on("keydown", function(e) {
    if(e.keyCode === 77) {
        e.preventDefault();
        muteVideo();
    }
});

//Video duration timer
$video.on("timeupdate", function() {
    var $videoTime = $video[0].currentTime;
    var $totalTime = $video[0].duration;
    var total_minutes = Math.floor($totalTime / 60);
    var total_seconds = Math.floor($totalTime - total_minutes * 60);
    var current_minutes = Math.floor($videoTime / 60);
    var current_seconds = Math.floor($videoTime - current_minutes * 60);
    
    if (total_seconds <= 9) total_seconds = "0" + total_seconds;
    var totalDuration = "0" + total_minutes + ":" + total_seconds;
    
    if (current_seconds <= 9) current_seconds = "0" + current_seconds;
    var currentTime = "0" + current_minutes + ":" + current_seconds;
    
    $duration.html(currentTime + " / " + totalDuration);
    
});

/* VIDEO CONTROLS
------------------------------------------------------- */

//Hide button controls when video is playing
$videoContainer.on("mouseleave", function() {
    if($video[0].paused === false){
        //$buttonControls.hide();
        $videoControls.css("margin-top", "5%");
    }
});

//Show button controls on hover
$videoContainer.on("mouseover", function(){
    //$buttonControls.show();
    $videoControls.css("margin-top", "0");
});

//Progress Bar
$progressBar[0].addEventListener("change", function(){
    var time = $video[0].duration * ($progressBar[0].value / 100);
    $video[0].currentTime = time;
});

//Update progress bar as video plays
$video[0].addEventListener("timeupdate", function(){
    var value = (100/ $video[0].duration) * $video[0].currentTime;
    $progress.css("width", value+"%");
});

//Play/pause on button click
$playButton.click(function() {
    playVideo();
});

//Stop on button click
$stopButton.click(function() {
    $video[0].pause();
    $video[0].currentTime = 0;
    $progressBar[0].value = 0;
});


//1.25x speed with right arrow
$("body").on("keydown", function(e){
    if(e.keyCode === 39) {
        e.preventDefault();
        changeSpeed();
    }
});

//Normal Speed
$("body").on("keydown", function(e) {
    if(e.keyCode === 37) {
        e.preventDefault();
        changeSpeed();
    }
});

//Fast Forward Button
$fastFwd.click(function() {
    changeSpeed();
});

//Mute video on button click
$muteButton.click(function() {
    muteVideo();
});

//Volume slider
$volumeSlider.on("change", function(){
    $video[0].volume = $volumeSlider[0].value;
});

//FullScreen Button
$fullSreenBtn.click(function(){
    launchFullscreen();
});












