var core = new momentum.Core();
var usurname = 'tolgahanuzun';
core.start();
	// I want to run the time update and rendering every second
setInterval(function() {
	core.updateTime();
	core.render();
},1000*30);

	// I only want to fetch and update the weather once every ten minutes
setInterval(function() {
	core.updateWeather();
	core.render();
}, 1000*60*10);



$("#save").click(function(){
var obj = {}; 
var account = document.getElementById('git-account').value+";";   
var surname = document.getElementById('surname').value+";";   
    
chrome.storage.sync.set({'names': account});
chrome.storage.sync.set({'surname': surname});
        
});
      

chrome.storage.sync.get('names',function(val){
    
var xmlHttp = new XMLHttpRequest();
username = val['names'].split(';').reverse()[1];
xmlHttp.open( "GET", 'https://api.github.com/users/'+username+'/received_events', false ); // false for synchronous request
xmlHttp.send( null );

data = JSON.parse(xmlHttp.responseText)
div = document.getElementById("slide-out")

for(i = 0; i < 30; i++){
var type = data[i]['type']
var reponame = data[i]['repo']['name']
var repourl = data[i]['repo']['url']
var actor = data[i]['actor']['url']
var times = new Date(data[i]['created_at'])


// Make a fuzzy time
var delta = Math.round((new Date() - times) / 1000);

var minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7;

var fuzzy;

if (delta < 30) {
    fuzzy = 'just then.';
} else if (delta < minute) {
    fuzzy = delta + ' seconds ago.';
} else if (delta < 2 * minute) {
    fuzzy = 'a minute ago.'
} else if (delta < hour) {
    fuzzy = Math.floor(delta / minute) + ' minutes ago.';
} else if (Math.floor(delta / hour) == 1) {
    fuzzy = '1 hour ago.'
} else if (delta < day) {
    fuzzy = Math.floor(delta / hour) + ' hours ago.';
} else if (delta < day * 2) {
    fuzzy = 'yesterday';
}


if (data[i]['type'] == "WatchEvent"){
    var icons = 'fa fa-star'
    }else if(data[i]['type'] == "CreateEvent"){
    var icons = 'fa fa-book';}
    else{var icons = 'fa fa-scissors';}

div.insertAdjacentHTML('beforeend',
"<li>"+ 
"<a href='https://github.com/"+ data[i]['actor']['login'] +"'>" +
data[i]['actor']['login'] + 
"</a> - <span class='"+ 
icons+
"'></span> "+
" - <a href='https://github.com/"+ data[i]['repo']['name'] +"'>" +
data[i]['repo']['name'] + "</a> -"+"<span>"+ fuzzy +"</span></li>")
}

})
$(".button-collapse").sideNav();

$(document).ready(function(){
$('.modal').modal({
    dismissible: false, // Modal can be dismissed by clicking outside of the modal
    opacity: 0.1, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '2 %', // Starting top style attribute
    endingTop: '2%', // Ending top style attribute
    
    }
  );
});

$("#save").click(function(){
$('.modal').modal('close');
location.reload();
});

$("#close").click(function(){
$('.modal').modal('close');
});