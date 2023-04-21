var mapimg;

var clat = 0;
var clon = 0;

var lat = 12.9716;
var lon = 77.5946;
//12.9716° N, 77.5946° E
var zoom = 1;

var airtrack;
var data;

function preload () {
  mapimg = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1025x512?access_token=pk.eyJ1IjoicGFsbGF2aWtpcmFnaSIsImEiOiJjbGdhY3JiZnYwMTZ0M2dvaXFkaTlwY2pmIn0.VFEl_ysBHyIv2OsY4n9rRg")

  
  airtrack = loadJSON("https://airlabs.co/api/v9/flights?api_key=dd282f02-6fdd-4a51-ac84-d76ce94a7e85", gotData);

 // airtrack = loadStrings("https://airlabs.co/api/v9/flights?_view=array&_fields=hex,flag,lat,lng,dir,alt&api_key=dd282f02-6fdd-4a51-ac84-d76ce94a7e85");
}

function gotData(data){
 airtrack = data;
  //print(data);
  //speed = data;
  
}

function mercX(lon){
  lon = radians(lon);
  var a = (256/PI) * pow(2, zoom);
  var b = lon + PI;
  return a*b;
}

function mercY(lat){
  lat = radians(lat);
  var a = (256/PI) * pow(2, zoom);
  var b = tan(PI/4 + lat/2);
  var c = PI - log(b);
  return a*c;
}

function setup(){
  createCanvas(1025, 512);
  translate(width/2, height/2)
  imageMode(CENTER)
  image(mapimg,0,0);
  
   var cx = mercX(clon);
  var cy = mercY(clat);
  
  for (i=0;i<airtrack.response.length;i++){
 
    var lat = airtrack.response[i].lat;
    var lon = airtrack.response[i].lng;
    var alt = airtrack.response[i].alt;
    var stats = airtrack.response[i].status;
 
     
     
     console.log("The status" + stats);
     // console.log("The long"+airtrack.response[i].lng)
  
    var d = map(alt,0,12000,0,10);
    //larger radius - higher altitude
    //smaller radius - lower altitude
    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;
 
   switch (stats) {

  case "landed":
       //green- landed
    fill(0, 255, 0, 255);
    break;
  case "scheduled":
       //blue-scheduled
    fill(0, 0, 255, 255);
    break;
 case "en-route":
       //red-enroute
    strokeWeight(0.2);
    fill(255, 0, 0, 20);
    break;
  
}
    
  
    //strokeWeight(0.5);
   // noStroke();
    ellipse(x,y,d,d);
 
    }
  
 
  
}
function draw(){
  
 // if (speed){
  //  ellipse (100,100,speed.response.)
  //}
  
    
    
    //if (airtrack.response[i].status["scheduled"]){
      
   
    
  //  if (airtrack.response[i].status["landed"]){
      
    
   
  
  
}
