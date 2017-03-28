var subtitles = document.getElementById('subtitles');

for (var i = 0; i < video.textTracks.length; i++){
    video.textTracks[i].mode = 'hidden';
}


//Function createMenuItem which create list item and button

var subtitlesMenuButtons = [];
var createMenuItem = function(id, lang, label) {
    var listItem = document.createElement('li');
    listItem.className = "subtitles_list";
    var button = listItem.appendChild(document.createElement('button'));
    button.setAttribute('id', id);
    button.className = 'subtitles_options';
    if (lang.length > 0) button.setAttribute('lang', lang);
    button.value = label;
    button.setAttribute('data-state', 'inactive');
    button.appendChild(document.createTextNode(label));
    button.addEventListener('click', function(e) {
        //Set all buttons to inactive
        subtitlesMenuButtons.map(function(v, i, a) {
            subtitlesMenuButtons[i].setAttribute('data-state', 'inactive');
        });
        //Find the language to activate
        var lang = this.getAttribute('lang');
        for (var i = 0; i < video.textTracks.length; i++) {
            //For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
            if (video.textTracks[i].language == lang) {
                video.textTracks[i].mode = 'showing';
                this.setAttribute('data-state', 'active');
            }
            else {
                video.textTracks[i].mode = 'hidden';
            }
        }
        subtitlesMenu.style.display = 'none';
    });
    subtitlesMenuButtons.push(button);
    return listItem;
}

subtitles.addEventListener('click', function(e) {
    if (subtitlesMenu) {
        subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
    }
});



//Build the menu that goes with the button of subtitles

var transcript_buttons = document.getElementById("buttons_container");
var subtitlesMenu;
if (video.textTracks) {
    var df = document.createDocumentFragment();
    var subtitlesMenu = df.appendChild(document.createElement('ul'));
    subtitlesMenu.className = 'subtitles-menu';
    subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
    for (var i = 0; i < video.textTracks.length; i++) {
        subtitlesMenu.appendChild(createMenuItem('subtitles-' + video.textTracks[i].language, video.textTracks[i].language, video.textTracks[i].label));
    }
    transcript_buttons.appendChild(subtitlesMenu);
}


window.onload = function(){
    //get video element
    var video = document.getElementsByTagName("video")[0];
    var trans_text = document.getElementById("interactive_text");
    var transcript = document.getElementById("interactive_text_content");
    var speaking = document.getElementById("speaking");
    
    //register events for the clicks on the text 
    var cues = document.getElementsByClassName("cue");
    for (i=0; i<cues.length; i++) {
        cues[i].addEventListener("click", function(evt) {
            var start = parseFloat(this.getAttribute("data-time"));
            video.currentTime = start;
            video.play();
        }, false);
    }
    
    //pause video as you mouse over transcript
    /*transcript.addEventListener("mouseover", function(evt) {
        video.pause();
    }, false);*/
    
}






























