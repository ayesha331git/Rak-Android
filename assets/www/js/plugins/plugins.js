function PDFGenerator(eStatementOnSuccess, eStatementOnFailure,
		base64EncodedString, fileName, locale, MBaaS) {

	// var base64EncodedString =
	// "JVBERi0xLjQKJYCAgIAKMSAwIG9iago8PC9QYWdlcyAyIDAgUiAvVmlld2VyUHJlZmVyZW5jZXMg"+
	// "OCAwIFIgL1R5cGUgL0NhdGFsb2cgPj4KZW5kb2JqCjIgMCBvYmoKPDwvQ291bnQgMSAvTWVkaWFC"+
	// "b3ggWzAgMCA1OTYgODQyIF0gL1R5cGUgL1BhZ2VzIC9SZXNvdXJjZXMgMyAwIFIgL0tpZHMgWzUg"+
	// "MCBSIF0gPj4KZW5kb2JqCjMgMCBvYmoKPDwvRm9udCA3IDAgUiA+PgplbmRvYmoKNCAwIG9iago8"+
	// "PC9GaWx0ZXIgL0ZsYXRlRGVjb2RlIC9MZW5ndGggNjAgPj4Kc3RyZWFtCnic0zdUMDZSCEnjcgrh"+
	// "MlQwAEKwgLm5sZ6FuZGBoUJILpeGR2pOTr5CeH5RToqipkJIFpdrCBcAWMsNBgplbmRzdHJlYW0K"+
	// "ZW5kb2JqCjUgMCBvYmoKPDwvUGFyZW50IDIgMCBSIC9UeXBlIC9QYWdlIC9Db250ZW50cyA0IDAg"+
	// "UiA+PgplbmRvYmoKNiAwIG9iago8PC9CYXNlRm9udCAvQ291cmllci1Cb2xkIC9TdWJ0eXBlIC9U"+
	// "eXBlMSAvRW5jb2RpbmcgL1dpbkFuc2lFbmNvZGluZyAvVHlwZSAvRm9udCA+PgplbmRvYmoKNyAw"+
	// "IG9iago8PC8xIDYgMCBSID4+CmVuZG9iago4IDAgb2JqCjw8L0Rpc3BsYXlEb2NUaXRsZSB0cnVl"+
	// "ID4+CmVuZG9iago5IDAgb2JqCjw8L1N1YmplY3QgKP7/AFMAYQBtAHAAbABlACAAYQBiAG8AdQB0"+
	// "ACAAYQAgAHMAaQBtAHAAbABlACAAJwBoAGUAbABsAG8AIAB3AG8AcgBsAGQAJwAgAHUAcwBpAG4A"+
	// "ZwAgAFAARABGACAAQwBsAG8AdwBuKSAvQ3JlYXRvciAo/v8AbwByAGcALgBwAGQAZgBjAGwAbwB3"+
	// "AG4ALgBzAGEAbQBwAGwAZQBzAC4AYwBsAGkALgBIAGUAbABsAG8AVwBvAHIAbABkAFMAYQBtAHAA"+
	// "bABlKSAvQXV0aG9yICj+/wBTAHQAZQBmAGEAbgBvACAAQwBoAGkAegB6AG8AbABpAG4AaSkgL0Ny"+
	// "ZWF0aW9uRGF0ZSAoRDoyMDExMDMwNTIwMDYxNSswMScwMCcpIC9Qcm9kdWNlciAo/v8AUABEAEYA"+
	// "IABDAGwAbwB3AG4AIABmAG8AcgAgAEoAYQB2AGEAIAAwAC4AMQAuADApIC9UaXRsZSAo/v8AUABE"+
	// "AEYAIABDAGwAbwB3AG4AIAAtACAASABlAGwAbABvACAAdwBvAHIAbABkACAAcwBhAG0AcABsAGUp"+
	// "ID4+CmVuZG9iagp4cmVmCjAgMTAKMDAwMDAwMDAwMCA2NTUzNSBmDQowMDAwMDAwMDE1IDAwMDAw"+
	// "IG4NCjAwMDAwMDAwODggMDAwMDAgbg0KMDAwMDAwMDE4NyAwMDAwMCBuDQowMDAwMDAwMjE5IDAw"+
	// "MDAwIG4NCjAwMDAwMDAzNDkgMDAwMDAgbg0KMDAwMDAwMDQxMSAwMDAwMCBuDQowMDAwMDAwNTEw"+
	// "IDAwMDAwIG4NCjAwMDAwMDA1MzkgMDAwMDAgbg0KMDAwMDAwMDU4MSAwMDAwMCBuDQp0cmFpbGVy"+
	// "Cjw8L1Jvb3QgMSAwIFIgL0luZm8gOSAwIFIgL1NpemUgMTAgPj4Kc3RhcnR4cmVmCjEwMzcKJSVF"+
	// "T0Y=";

	// if (WL.Client.getEnvironment() == WL.Environment.PREVIEW) {
	if (MBaaS.isPreviewEnv()) {
		MBaaS
				.showSimpleDialog(
						"Cordova Plugin",
						"Please run the sample in either a Simulator/Emulator or physical device to see the response from the Cordova plug-in.",
						"OK", function() {
							Logger.debug("Ok button pressed")
						});
	} else {
		cordova.exec(eStatementOnSuccess, eStatementOnFailure,
				"FinacleOpenPDF", "openFile", [ base64EncodedString, fileName,
						locale ]);
	}
}
var Camera = function() {
	this.successCallback = null;
	this.errorCallback = null;
	this.options = null;
};
// Camera.prototype.openCamera = function(successCallback, errorCallback,
// options) {
// cordova.exec(successCallback, errorCallback, "FinacleCameraPlugin",
// "captureImage",
// [ options ]);
// }
Camera.prototype.getPicture = function(successCallback, errorCallback, options) {

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
	
	var params = new Array(successCallback, errorCallback, "FinacleCameraPlugin",
			"captureImage", [ options ]);
	cordovaExec(params);
};

function openCamera(successCallback, errorCallback, options) {
	var params = new Array(successCallback, errorCallback, "FinacleCameraPlugin",
			"captureImage", [ options ]);
	
	cordovaExec(params);
	
}

function openContact(successCallback, errorCallback, options) {
	var params = new Array(successCallback, errorCallback, "Contacts", "pickContact",
					[ options ]);
	cordovaExec(params);
}

function shareMessage(successCallback, errorCallback, options) {	
	var params= new Array(successCallback, errorCallback, "SocialMessage",
				"shareOnline", [ options ]);
	cordovaExec(params);
}

function GPSStatusCheck(successCallback, errorCallback, options) {
	var params= new Array(successCallback, errorCallback, "Utils", "isGpsEnabled",
				[ options ]);
	cordovaExec(params);
}
// To call MPIN plugin services
// actions
// 1)Activation ---> active
// 2)Login ---> login
// 3)Change Mpin ---> change
// 4)Forgot Mpin ---> forgot
// 5)Manage Activate Devices ---> manage

function mAuth(successCallback, errorCallback, action, options) {
	var params=new Array(successCallback, errorCallback, "MAuth", action, options);
	cordovaExec(params);
}

function getThemeColor(successCallback, errorCallback, minSize, maxSize) {
	
	/*var params=new Array(successCallback, errorCallback, "getThemeColor",
				"isUnSecure", [ minSize, maxSize ]);
	cordovaExec(params);*/
	
	var params = null;
    if (!(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv())) {
    	params= new Array(successCallback, errorCallback,"getThemeColor","isUnSecure", [ minSize,maxSize]);
	}
	else
	{
		params= new Array(successCallback, errorCallback, "ApplyThemes", "getThemeColor", [ minSize,maxSize] );
	}
    cordovaExec(params);
}
function getThemeColorIOS(successCallback, errorCallback, options) {
	var params = new Array(successCallback, errorCallback, "ApplyThemes", "getThemeColor", [ options ]);
	cordovaExec(params);
}
function openQRCodeScanner(successCallback, errorCallback, options) {
	var params= new Array(successCallback, errorCallback, "BarcodeScanner", "scan", options);
	cordovaExec(params);
}

function openPhotos(successCallback, errorCallback, minSize, maxSize, locale,
		imageFormat) {
	
	var params= new Array(successCallback, errorCallback, "GalleryPhotosPlugin",
				"choosePhoto", [ minSize, maxSize, locale, imageFormat ]);
	cordovaExec(params);
}

function capturePhoto(successCallback, errorCallback, minSize, maxSize, locale) {	
	
	var params= new Array(successCallback, errorCallback, "CameraPhotosPlugin",
				"capturePhoto", [ minSize, maxSize, locale ]);
	cordovaExec(params);
}

function encryptParam(successCallback, errorCallback, options) {
	
	var params= new Array(successCallback, errorCallback, "FinacleParamSensitizer",
				"encrypt", options);
	cordovaExec(params);
}

function encryptURL(successCallback, errorCallback, options,MBaaS){
	var params = null;
	
	if (MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()) {
		params = new Array(successCallback, errorCallback, "URLEncryptor", "encryptionURL", options);
	}
	else {
		params = new Array(successCallback, errorCallback, "FinacleParamSensitizer", "urlEncrypt", options);
	}
	cordovaExec(params);
}
function getHashForURL(successCallback, errorCallback, options,MBaaS){
	var params = null;
	if (MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()) {
		params = new Array(successCallback, errorCallback, "URLEncryptor", "hashURL", options);
	}
	else {
		params = new Array(successCallback, errorCallback, "FinacleParamSensitizer", "hashURL", options);
	}
	cordovaExec(params);
}

function getJSONCreds(successCallback, errorCallback, minSize, maxSize){
	console.log("in getJSONCreds plpugins.js==");
//	cordova.exec(successCallback, errorCallback, "JSONCredInitializer", "getCreds", [minSize, maxSize]);
	params = new Array(successCallback, errorCallback, "JSONCredInitializer", "getCreds", [minSize, maxSize]);
	cordovaExec(params);
}

//Runtime checksum
function getBGColor(successCallback, errorCallback, minSize, maxSize, MBaaS){
	var params = new Array(successCallback, errorCallback, "BGColorUpdater", "file", [minSize, maxSize]);
    	cordovaExec(params);
}

function isAndroid() {
    return navigator.userAgent.indexOf("Android") > 0;
}

function isiOS() {
    return ( navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf("iPad") > 0 || navigator.userAgent.indexOf("iPod") > 0);
}

function keyStorage(successCallback, errorCallback, prefsType, options, MBaaS){
	var params = null;
    if (MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()) {
        params = new Array(successCallback, errorCallback, "FinStore", "saveJsonData", options);
    }
    else {
        params = new Array(successCallback, errorCallback, "SharedPreferenceHandler", prefsType, options);
    }
    cordovaExec(params);
}

function checkAndroidTouchSupport(successCallback, errorCallback, options,MBaaS) {

	if (MBaaS.isAndroidEnv())
	{
		var params= new Array(successCallback, errorCallback, "FingerPrintSupport", "checkAndroidTouchSupport", options);
		cordovaExec(params);
	}

}
function validateAndroidTouch(successCallback, errorCallback, options,MBaaS) {

	if (MBaaS.isAndroidEnv())
	{
		var params= new Array(successCallback, errorCallback, "FingerprintInvocation", "validateAndroidTouch", options);
		cordovaExec(params);
	}

}

function cordovaExec(params){
	try {
	  cordova.exec(params[0], params[1], params[2],	params[3], params[4]);
	} catch (e) {
		customDialog(e);
	}
}

function customDialog(msg){	//Custom dialog
	$('body').append('<div id="customOverlay" style="position:fixed;opacity: .48;z-index: 79;transition:opacity 450ms;right:0;top:0;bottom:0;left:0;background-color: rgba(33,33,33,1.0);"></div>');
	$('body').append('<div id="customDialog" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 80;overflow: hidden;display: -webkit-flex;display:-ms-flexbox;display: flex;-webkit-justify-content: center;-ms-flex-pack: center;justify-content: center;-webkit-align-items: center;	-ms-flex-align: center;align-items: center;"> <div style="opacity: 1;transition: all .4s cubic-bezier(.25, .8, .25, 1); transform: translate(0, 0) scale(1);transition-delay: 2s;min-width: 240px;max-width: 80%;max-height: 80%;position: relative;overflow: auto;box-shadow: 0 7px 8px -4px rgba(0, 0, 0, .2), 0 13px 19px 2px rgba(0, 0, 0, .14), 0 5px 24px 4px rgba(0, 0, 0, .12);display: -ms-flexbox;display: flex;-webkit-flex-direction: column;-ms-flex-direction: column;flex-direction: column;border-radius: 4px;background-color: rgb(255,255,255); -webkit-flex: 1;-ms-flex: 1;flex: 1;box-sizing: border-box;"><div style="padding:20px;font-size: 14px;font-weight: 500;letter-spacing: .010em;line-height: 24px">'+msg+'</div><button type="button" style="border:0;background:transparent;text-align:right;padding:20px;text-transform: uppercase; font-weight: 500;font-size: 14px;color:#FF9800;cursor:pointer" onclick="onDialogOk()">OK</button></div></div>');    
}

function onDialogOk(){ // Remove from DOM
  $("#customOverlay").remove();
  $("#customDialog").remove();
 }
 
 
 
 
function clearBadge(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "Badge", "clearBadge", [options]);
}

function getBadge(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "Badge", "getBadge", [options]);
}

function setBadge(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "Badge", "setBadge", [options]);
}

function isBackClicked(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "Badge", "backClicked", [options]);
}

function setCount(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "PushUtilityInterface", "sendBadgeCount", [options]);
}

function RakPDFGenerator(successCallBack,errorCallBack,base64EncodedString,fileName,locale){
	
	if (WL.Client.getEnvironment() == WL.Environment.PREVIEW) {
		WL.SimpleDialog.show(
			"Cordova Plugin", "Please run the sample in either a Simulator/Emulator or physical device to see the response from the Cordova plug-in.", 
			[{text: "OK", handler: function() {WL.Logger.debug("Ok button pressed");}
			}]
		);
	} else {
		cordova.exec(successCallBack, errorCallBack, "RakFinacleOpenPDF", "openFile",[base64EncodedString,fileName,locale ]);	
	}
}

function storeDetails(successCallBack,errorCallBack,cifId){
    console.log("store details plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakPushDeviceCheck", "storeDetails", [cifId]);
}

function retrieveDetails(successCallBack,errorCallBack,cifId){
    console.log("retrieveDetails plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakPushDeviceCheck", "retrieveDetails", [cifId]);
}


function processActivationString(successCallBack,errorCallBack,encodedQRCodeImg, deviceId, appId, pinLength,buildType){
    console.log("processActivationString plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "processActivationString", [encodedQRCodeImg, deviceId, appId, pinLength,buildType]);
}

function processActivatedTsn(successCallBack,errorCallBack,data,buildType){
    console.log("processActivatedTsn plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "processActivatedTsn", [data,buildType]);
}

function checkEzComObject(successCallBack,errorCallBack,option,buildType){
    console.log("checkEzComObject plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "checkEzComObject",[option,buildType]);
}

function checkImageAndPinLength(successCallBack,errorCallBack,option,buildType){
    console.log("checkEzComObject plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "checkImageAndPinLength",[option,buildType]);
}




function generateEzComTokenNumber(successCallBack,errorCallBack,tokenPin,buildType){
    console.log("generateEzComTokenNumber plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "generateEzComTokenNumber", [tokenPin,buildType]);
}

function clearEzComObject(successCallBack,errorCallBack,options,buildType){
    console.log("clearEzComObject plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "clearEzComObject",[options,buildType]);
}

function setEzComAccountPin(successCallBack,errorCallBack,tokenPin,buildType){
    console.log("setEzComAccountPin plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "setEzComAccountPin", [tokenPin,buildType]);
}

function fetchTsnFromEzComObject(successCallBack,errorCallBack,options,buildType){
    console.log("fetchTsnFromEzComObject plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "fetchTsnFromEzComObject",[options,buildType]);
}

function fetchEzComObjectFromTsn(successCallBack,errorCallBack,data,buildType){
    console.log("fetchEzComObjectFromTsn plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "fetchEzComObjectFromTsn", [data,buildType]);
}

function recievedPushInitiate(successCallBack,errorCallBack,dataContent,buildType){
    console.log("recievedPushInitiate plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "recievedPushInitiate", [dataContent,buildType]);
}

function submitPinForApproval(successCallBack,errorCallBack,pin, pushMsg,buildType){
    console.log("submitPinForApproval plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "submitPinForApproval", [pin,pushMsg,buildType]);
}

function SubmitApproval(successCallBack,errorCallBack,data,buildType){
    console.log("SubmitApproval plugin js");
    cordova.exec(successCallBack, errorCallBack, "RakEzcomIntegration", "SubmitApproval", [data,buildType]);
}


function dochkApp(successCallBack,errorCallBack,data){
    
    console.log("dochkApp details plugin js");
    
    cordova.exec(successCallBack, errorCallBack, "RakAppTypeCheck", "dochkApp", []);
    
}

function FPstoreDetails(successCallBack,errorCallBack,id,code,token,activationflag,cifId){
	console.log("store details plugin js");
	cordova.exec(successCallBack, errorCallBack, "FingerPrintStorageHelper", "storeDetails", [id,code,token,activationflag,cifId]);
}


function deleteDetails(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "FingerPrintStorageHelper", "deleteDetails", [options]);
}


function FPretrieveDetails(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "FingerPrintStorageHelper", "retrieveDetails", [options]);
}

function FPretrieveStatus(successCallBack,errorCallBack,options){
	cordova.exec(successCallBack, errorCallBack, "FingerPrintStorageHelper", "retrieveStatus", [options]);
}

