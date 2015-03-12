// JavaScript Document

// JavaScript Document
var pages = [], links=[];
var numLinks = 0;
var numPages = 0;


//var pageshow = document.createEvent("CustomEvent");
//pageshow.initEvent("pageShow", false, true);



document.addEventListener("deviceready", function(){
	//device ready listener
	pages = document.querySelectorAll('[data-role="page"]');	
	numPages = pages.length;
	links = document.querySelectorAll('[data-role="pagelink"]');
	numLinks = links.length;
	for(var i=0;i<numLinks; i++){
		//either add a touch or click listener
     if(detectTouchSupport( )){
       links[i].addEventListener("touchend", handleTouch, false);
     }
		links[i].addEventListener("click", handleNav, false);	
	}
  //add the listener for the back button
  window.addEventListener("popstate", browserBackButton, false);
	loadPage(null);
});

//handle the touchend event
function handleTouch(ev){
  ev.preventDefault();
  ev.stopImmediatePropagation();
  var touch = ev.changedTouches[0];        //this is the first object touched
  var newEvt = document.createEvent("MouseEvent");	
  //old method works across browsers, though it is deprecated.
  newEvt.initMouseEvent("click", true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY);
  ev.currentTarget.dispatchEvent(newEvt);
  //send the touch to the click handler
}

//handle the click event
function handleNav(ev){
	ev.preventDefault();
	var href = ev.target.href;
	var parts = href.split("#");
	loadPage( parts[1] );	
    if (parts[1]=="three"){
    
  three();
}
  return false;
}

//Deal with history API and switching divs
function loadPage( url ){
	if(url == null){
		//home page first call
		pages[0].style.display = 'block';
		history.replaceState(null, null, "#home");	
	}else{
    
    for(var i=0; i < numPages; i++){
      if(pages[i].id == url){
        pages[i].style.display = "block";
        history.pushState(null, null, "#" + url);	
      }else{
        pages[i].style.display = "none";	
      }
    }
    for(var t=0; t < numLinks; t++){
      links[t].className = "";
      if(links[t].href == location.href){
        links[t].className = "activetab";
      }
    }
	}
}

//Need a listener for the popstate event to handle the back button
function browserBackButton(ev){
  url = location.hash;  //hash will include the "#"
  //update the visible div and the active tab
  for(var i=0; i < numPages; i++){
      if(("#" + pages[i].id) == url){
        pages[i].style.display = "block";
      }else{
        pages[i].style.display = "none";	
      }
  }
  for(var t=0; t < numLinks; t++){
    links[t].className = "";
    if(links[t].href == location.href){
      links[t].className = "activetab";
    }
  }
}

//Test for browser support of touch events
function detectTouchSupport( ){
  msGesture = navigator && navigator.msPointerEnabled && navigator.msMaxTouchPoints > 0 && MSGesture;
  var touchSupport = (("ontouchstart" in window) || msGesture || (window.DocumentTouch && document instanceof DocumentTouch));
  return touchSupport;
}



  



function TwoAndThree(ev){
if (ev.currentTarget.id=="two"){
   
 geoFindMe();
}
   


else if (ev.currentTarget.id=="three"){
    
three();
}
}

//get geolocation

function geoFindMe() {
    
  var output = document.getElementById("out");

  if (!navigator.geolocation){
    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
    return;
  }

  function success(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;

    output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

    var img = new Image();
    img.src = 'https://maps.googleapis.com/maps/api/staticmap?center='
	  	+ position.coords.latitude + ',' + position.coords.longitude +
		'&size=400x400&zoom=14&markers=color:red%7Clabel:A%7C'
		+position.coords.latitude+','+position.coords.longitude; 

    output.appendChild(img);
  };

  function error() {
    output.innerHTML = "Unable to retrieve your location";
  };

  output.innerHTML = "<p>Locating…</p>";

  navigator.geolocation.getCurrentPosition(success, error);
}


// get contact
function three(){
  
var options = new ContactFindOptions( );
options.filter = "";  //leaving this empty will find return all contacts
options.multiple = true;  //return multiple results
var filter = ["displayName"];    //an array of fields to compare against the options.filter 
navigator.contacts.find(filter, successFunc, errFunc, options);
}
function successFunc( matches ){
    

   
    var x = Math.floor(Math.random() * matches.length);
    document.getElementById("three out").innerHTML=
   matches[x].displayName+" "+ matches[x].phoneNumbers[0].value;
  
    
}  


function errFunc(){
  alert("wrong");
}