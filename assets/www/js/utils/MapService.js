// This is a directive for creating the map for locator feature
AppController.directive('finMap', function($rootScope, UIControlsService) {
  return function(scope, element, attrs) {

	  var mapCenter =null;
	  var currPos=null;
	 
	  
			 var loc1 = $rootScope.$eval(attrs.location);
			 if($rootScope.currentLocation.position){
			  var loc =$rootScope.currentLocation.position.coords;
			  loc.id="Current";
	//  var loc=$rootScope.$eval(attrs.location);
/*	  for ( var temp in loc){*/

		  /*   mapCenter = new google.maps.LatLng(parseFloat(loc[temp].latitude), parseFloat(loc[temp].longitude));*/
			 
		      currPos = $rootScope.currentLocation.position.coords;
			 }
	/*  }*/
	
  
   // $rootScope.setMapCenter(loc);

    var mapOptions = {
      center: mapCenter,
      zoom: 12,
    streetViewControl: false,
    streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
    },       
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.RIGHT_TOP
    },
     
    };
    /**
  	 * The method controls google map and click event on it.
  	 * @constructor
  	 * @param {string} controlDiv- html div element
  	 * @param {map} map- google map object
  	 * @param {object} marker-google map marker object.
  	 * @param {factory} directionsService- angular factory instance
  	 * @param {string} directionsDisplay-
  	 * 
  	 */
	 
/*** Directions to be displayed in map application hence Control UI is commented here	**/ 
var CenterControl = function (controlDiv, map, marker, directionsService, directionsDisplay) {

  var self=this;

  // Set CSS for the control border
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#fff';
  controlUI.style.border = '0.1em solid #e21619';
  controlUI.style.borderRadius = '0.3em';
  controlUI.style.cursor = 'pointer';
  controlUI.style.marginRight = '0.5em';
  controlUI.style.marginBottom = '12.5em';
  controlUI.style.height = '4em';
  controlUI.style.width = '4em';
  controlUI.style.textAlign = 'center';
  controlUI.id='mapNavigator';
  controlDiv.appendChild(controlUI);

  // Set CSS for the control interior
  var controlText = document.createElement('div');
  controlText.style.color = '#e21619';
  controlText.style.fontSize = '2em';
  controlText.style.lineHeight = '2.25em';
  controlText.style.paddingLeft = '0.5em';
  controlText.style.paddingRight = '0.5em';
  controlText.style.fontWeight = 'bold';
  controlText.innerHTML = '<span class="app app-locator"> </span>';

  controlUI.appendChild(controlText);

  self.controlUI = controlUI;

  google.maps.event.addDomListener(controlUI, 'click', function(event) {
	  $rootScope.showDirections();
  },false);

  var mapdiv=document.getElementById('map-wrapper1');
  var navDiv=document.getElementById('mapNavigator');
  if(mapdiv){
  // Setup the click event listeners: simply set the map to
  google.maps.event.addDomListener(mapdiv,'click', function() {
	  if(event.target.parentNode.title=="Zoom in" || event.target.parentNode.title=="Zoom out" || navDiv){
		  return;
	  }
	  if($rootScope.currentLocation.position){
    var currPos = $rootScope.currentLocation.position.coords; 
    var start = new google.maps.LatLng(parseFloat(currPos.latitude), parseFloat(currPos.longitude)); 
	  }

    if (_.isUndefined(currPos)) {
      scope.$apply(UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.RAK_COMMON.RAKLOC_SETTING_ON));
      return;       
    }

   // self.controlUI.style.display = 'none';

    scope.$apply($rootScope.loadMapFlag = true);

   

    var request = {
      origin:start,
      destination:mapCenter,
      travelMode: google.maps.TravelMode.DRIVING
    };

    marker.setMap(null);

    directionsService.route(request, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
        // workarround added by Chandan M
        setTimeout(function(){
        	scope.$apply($rootScope.loadMapFlag = false);
        	},500);
      }
    });

  });
  }

}; 

$rootScope.reloadMap = function () {
	google.maps.event.trigger(map, "resize");
};
var directionsService = new google.maps.DirectionsService();


    var map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);

var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

    // $rootScope.WIDTH = $(window).width();
    // $rootScope.HEIGHT = $(window).height();

    var tmpHeight = $(".navbar-fixed-top").css("height");

   /* $("#map-wrapper").css("height", ($(window).height() - parseInt(tmpHeight))+ "px");
    $("#map-wrapper").css("width", $(window).width() + "px"); */

    // $("#map-wrapper").css("top", "0"); 
  /*  $("#map-wrapper").css("height", 200);
    $("#map-wrapper").css("width", 200);*/

$("#map-wrapper1").css("height", ($(window).height() - parseInt(tmpHeight))+ "px");
$("#map-wrapper1").css("width", $(window).width() + "px"); 

// $("#map-wrapper").css("top", "0"); 

    $("#map-wrapper").addClass("rakMap");
    

    google.maps.event.trigger(map, "resize");


    
    if(loc1.id){
    	var atmBranches = $rootScope.home.atmBranchDetails;
    	  for (var i = 0; i < atmBranches.length; i++){
    		  if(atmBranches[i].id==loc1.id){
    			  mapCenter = new google.maps.LatLng(parseFloat(loc1.latitude), parseFloat(loc1.longitude));
    			  var atmBranch = atmBranches[i];
		  $rootScope.markerImage = "";
		  var markerImage=$rootScope.home.getIconImage(atmBranch.marker,atmBranch.type_id,loc1.id,atmBranch.id);
		/*  var temp = {
				  path:markerImage,
				  scaledSize:[24,24]		  
		  }*/
		  //var temp = new google.maps.MarkerImage(markerImage);
		  //temp.size= new google.maps.Size(20,20);
		  var marker = new google.maps.Marker({
			    position: {lat:parseFloat(atmBranch.latitude),lng: parseFloat(atmBranch.longitude)},
			    map:map,
			    icon:{
			    	url: markerImage,
			    	size: new google.maps.Size(38,38),
			    	scaledSize: new google.maps.Size(24,24)
			    }
			  });
		 
		  
		  
		 /* marker.style.width='20px';
		  marker.style.height = '20px';
		  marker.style.background='red';
*/
		  
		  
		  if (loc1.id == atmBranch.id){
			 
			  
				 google.maps.event.addListener(marker, 'click', function() {
					    scope.$apply(scope.showMarkerInfo());
				 });
		  }
		  break;
    	  }
    		 
    	  }
	  }
    
    
    else{
    	
    	if(loc){
    		console.log("loc value@@@@@@@@"+loc);
       	 mapCenter = new google.maps.LatLng(parseFloat(loc.latitude), parseFloat(loc.longitude));
       }
    	console.log("inside the else block");
    	var atmBranches = $rootScope.home.atmBranchDetails;
  for (var i = 0; i < atmBranches.length; i++){
	  var atmBranch = atmBranches[i];
	  var markerImage=$rootScope.home.getIconImage(atmBranch.marker,atmBranch.type_id,loc1.id,atmBranch.id);
	/*  var temp = {
			  path:markerImage,
			  scaledSize:[24,24]		  
	  }*/
	  
	 /* var temp = new google.maps.MarkerImage(markerImage);
	  temp.size= new google.maps.Size(35,36);*/
	  var marker = new google.maps.Marker({
		    position: {lat:parseFloat(atmBranch.latitude),lng: parseFloat(atmBranch.longitude)},
		    map:map,
		    icon:{
		    	url: markerImage,
		    	size: new google.maps.Size(38,38),
		    	scaledSize: new google.maps.Size(24,24)
		    }
		  });
	  
	  mapCenter = new google.maps.LatLng(parseFloat(atmBranch.latitude), parseFloat(atmBranch.longitude));
	  console.log("after map center");
	  
	  if (loc1.id == atmBranch.id){
		 
		  $rootScope.markerImage = markerImage;
			 google.maps.event.addListener(marker, 'click', function() {
				    scope.$apply(scope.showMarkerInfo());
			 });
	  }
	  
  }
    }
  if($rootScope.currentLocation.position){
  var marker = new google.maps.Marker({
//	    position: {lat:12.849787,lng: 77.666198},
	  position: {lat:currPos.latitude,lng: currPos.longitude},
	    map:map
	  });
  }
  

  // To add the marker to the map, call setMap();
  marker.setMap(map);

  map.setCenter(mapCenter);

  var centerControlDiv = document.createElement('div');
  CenterControl(centerControlDiv, map, marker, directionsService, directionsDisplay);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);  

  google.maps.event.addListener(map, 'tilesloaded', function() {
	if(!$rootScope.loadMapFlag)
		scope.$apply($rootScope.loadMapFlag = false);
  });
  
  google.maps.event.addListener(map, 'idle', function() {
		
	  });
  };
});

