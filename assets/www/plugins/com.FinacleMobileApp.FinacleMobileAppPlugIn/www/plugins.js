cordova.define("com.FinacleMobileApp.FinacleMobileAppPlugIn.FinacleMobileAppPlugIn", function(require, exports, module) {


/* JavaScript content from js/plugins/plugins.js in folder common */
function PDFGenerator(eStatementOnSuccess,eStatementOnFailure,base64EncodedString,fileName){
	
//	var base64EncodedString = "JVBERi0xLjQKJYCAgIAKMSAwIG9iago8PC9QYWdlcyAyIDAgUiAvVmlld2VyUHJlZmVyZW5jZXMg"+
//"OCAwIFIgL1R5cGUgL0NhdGFsb2cgPj4KZW5kb2JqCjIgMCBvYmoKPDwvQ291bnQgMSAvTWVkaWFC"+
//"b3ggWzAgMCA1OTYgODQyIF0gL1R5cGUgL1BhZ2VzIC9SZXNvdXJjZXMgMyAwIFIgL0tpZHMgWzUg"+
//"MCBSIF0gPj4KZW5kb2JqCjMgMCBvYmoKPDwvRm9udCA3IDAgUiA+PgplbmRvYmoKNCAwIG9iago8"+
//"PC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9MZW5ndGggNjAgPj4Kc3RyZWFtCnic0zdUMDZSCEnjcgrh"+
//"MlQwAEKwgLm5sZ6FuZGBoUJILpeGR2pOTr5CeH5RToqipkJIFpdrCBcAWMsNBgplbmRzdHJlYW0K"+
//"ZW5kb2JqCjUgMCBvYmoKPDwvUGFyZW50IDIgMCBSIC9UeXBlIC9QYWdlIC9Db250ZW50cyA0IDAg"+
//"UiA+PgplbmRvYmoKNiAwIG9iago8PC9CYXNlRm9udCAvQ291cmllci1Cb2xkIC9TdWJ0eXBlIC9U"+
//"eXBlMSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvVHlwZSAvRm9udCA+PgplbmRvYmoKNyAw"+
//"IG9iago8PC8xIDYgMCBSID4+CmVuZG9iago4IDAgb2JqCjw8L0Rpc3BsYXlEb2NUaXRsZSB0cnVl"+
//"ID4+CmVuZG9iago5IDAgb2JqCjw8L1N1YmplY3QgKP7/AFMAYQBtAHAAbABlACAAYQBiAG8AdQB0"+
//"ACAAYQAgAHMAaQBtAHAAbABlACAAJwBoAGUAbABsAG8AIAB3AG8AcgBsAGQAJwAgAHUAcwBpAG4A"+
//"ZwAgAFAARABGACAAQwBsAG8AdwBuKSAvQ3JlYXRvciAo/v8AbwByAGcALgBwAGQAZgBjAGwAbwB3"+
//"AG4ALgBzAGEAbQBwAGwAZQBzAC4AYwBsAGkALgBIAGUAbABsAG8AVwBvAHIAbABkAFMAYQBtAHAA"+
//"bABlKSAvQXV0aG9yICj+/wBTAHQAZQBmAGEAbgBvACAAQwBoAGkAegB6AG8AbABpAG4AaSkgL0Ny"+
//"ZWF0aW9uRGF0ZSAoRDoyMDExMDMwNTIwMDYxNSswMScwMCcpIC9Qcm9kdWNlciAo/v8AUABEAEYA"+
//"IABDAGwAbwB3AG4AIABmAG8AcgAgAEoAYQB2AGEAIAAwAC4AMQAuADApIC9UaXRsZSAo/v8AUABE"+
//"AEYAIABDAGwAbwB3AG4AIAAtACAASABlAGwAbABvACAAdwBvAHIAbABkACAAcwBhAG0AcABsAGUp"+
//"ID4+CmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDE1IDAwMDAw"+
//"IG4NCjAwMDAwMDAwODggMDAwMDAgbg0KMDAwMDAwMDE4NyAwMDAwMCBuDQowMDAwMDAwMjE5IDAw"+
//"MDAwIG4NCjAwMDAwMDAzNDkgMDAwMDAgbg0KMDAwMDAwMDQxMSAwMDAwMCBuDQowMDAwMDAwNTEw"+
//"IDAwMDAwIG4NCjAwMDAwMDA1MzkgMDAwMDAgbg0KMDAwMDAwMDU4MSAwMDAwMCBuDQp0cmFpbGVy"+
//"Cjw8L1Jvb3QgMSAwIFIgL0luZm8gOSAwIFIgL1NpemUgMTAgPj4Kc3RhcnR4cmVmCjEwMzcKJSVF"+
//"T0Y=";
	
	/*if (WL.Client.getEnvironment() == WL.Environment.PREVIEW) {
		WL.SimpleDialog.show(
			"Cordova Plugin", "Please run the sample in either a Simulator/Emulator or physical device to see the response from the Cordova plug-in.", 
			[{text: "OK", handler: function() {WL.Logger.debug("Ok button pressed");}
			}]
		);
	} else*/
		cordova.exec(eStatementOnSuccess, eStatementOnFailure, "FinacleOpenPDF", "openFile",[base64EncodedString,fileName]);	
}
var Camera = function() {
	this.successCallback = null;
	this.errorCallback = null;
	this.options = null;
};
//Camera.prototype.openCamera = function(successCallback, errorCallback,
//		options) {
//	cordova.exec(successCallback, errorCallback, "FinacleCameraPlugin", "captureImage",
//			[ options ]);
//}
Camera.prototype.getPicture = function(successCallback, errorCallback,
		options) {

	// successCallback required
	if (typeof successCallback !== "function") {
		console.log("Camera Error: successCallback is not a function");
		return;
	}

	// errorCallback optional
	if (errorCallback && (typeof errorCallback !== "function")) {
		console.log("Camera Error: errorCallback is not a function");
		return;
	}

	if (options === null || typeof options === "undefined") {
		options = {};
	}

	cordova.exec(successCallback, errorCallback, "FinacleCameraPlugin", "captureImage",
			[ options ]);
	};

function openCamera(successCallback, errorCallback,options){
	cordova.exec(successCallback, errorCallback, "FinacleCameraPlugin", "captureImage",
			[ options ]);
	
}

function openContact(successCallback, errorCallback,options){
	cordova.exec(successCallback, errorCallback, "Contacts", "pickContact",
			[ options ]);
}

function shareMessage(successCallback, errorCallback,options){
	cordova.exec(successCallback, errorCallback, "SocialMessage", "shareOnline",
			[ options ]);
}
function getUuid(successCallback, errorCallback, options){
	cordova.exec(successCallback, errorCallback, "Device", "getDeviceInfo",
			[ options ]);
}
function GPSStatusCheck(successCallback,errorCallback,options){
    cordova.exec(successCallback, errorCallback, "Utils", "isGpsEnabled",[options]);
}
//To call MPIN plugin services
//actions
//1)Activation ---> active 
//2)Login ---> login 
//3)Change Mpin ---> change 
//4)Forgot Mpin ---> forgot 
//5)Manage Activate Devices ---> manage 
 
function mAuth(successCallback, errorCallback,action,options){
	cordova.exec(successCallback, errorCallback, "MAuth", action,options);
}

function openQRCodeScanner(successCallback, errorCallback,options){
	cordova.exec(successCallback, errorCallback, "BarcodeScanner", "scan", []);
}
function openPhotos(successCallback, errorCallback,minSize,maxSize){
    alert("In PLugin.js "+minSize+" "+maxSize);
    cordova.exec(successCallback, errorCallback,"GalleryPhotosPlugin","choosePhoto",[ minSize,maxSize ]);   
}

function capturePhoto(successCallback, errorCallback, minSize, maxSize){
    alert("In PLugin.js "+minSize+" "+maxSize);
    cordova.exec(successCallback, errorCallback,"CameraPhotosPlugin","capturePhoto",[ minSize,maxSize ]);
    
}




});
