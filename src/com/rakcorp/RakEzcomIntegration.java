package com.rakcorp;

import java.io.UnsupportedEncodingException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.TargetApi;

@TargetApi(23)
public class RakEzcomIntegration extends CordovaPlugin {
	public static final String TAG = "RakEzcomIntegration";
	 public static String defaultTokenPinLength = "4";
	public static String packageName;
	

	public static CallbackContext mCallbackContext;
	public static PluginResult mPluginResult;
	 private static final Logger log = Logger.getLogger(Class.class.getName());
	







	/**
	 * Constructor.
	 */
	public RakEzcomIntegration() {
	}



	/**
	 * Executes the request and returns PluginResult.
	 *
	 * @param action          The action to execute.
	 * @param args            JSONArry of arguments for the plugin.
	 * @param callbackContext The callback id used when calling back into JavaScript.
	 * @return A PluginResult object with a status and message.
	 */
	
	public void sendResponse(CallbackContext callbackContext,JSONObject message) {
		
		callbackContext.sendPluginResult(new PluginResult(PluginResult.Status.OK, message));
    }
	




	public boolean execute(final String action, JSONArray arguments, CallbackContext callbackContext)
			throws JSONException {
		
		
		

		
		if(action.equalsIgnoreCase("clearEzComObject")){		
			
			
			JSONObject isSeedCleared= null;		
			String buildType = arguments.getString(0);
			isSeedCleared =RakEzComHandler.clearEzComObject(buildType);		
					
			JSONObject message= new JSONObject();		
			message.put("result", isSeedCleared);		
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);		
			callbackContext.sendPluginResult(pluginResult);		
		}		
						
						
		else if(action.equalsIgnoreCase("processActivationString")){
			
			String encodedQRCode = arguments.getString(0);
			String deviceId = arguments.getString(1);
			String appId = arguments.getString(2);
			String pinLength = arguments.getString(3);
			String buildType = arguments.getString(4);
			JSONObject encodedResponse= null;
			
			try {
				encodedResponse = RakEzComHandler.processActivationQRString(encodedQRCode, deviceId, appId, pinLength, buildType);
			} catch (UnsupportedEncodingException e) {

				RakEzComHandler.throwErrorResponse();
				
			}
			
			JSONObject message= new JSONObject();
			message.put("result", encodedResponse);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
			  
		}

		else if(action.equalsIgnoreCase("processActivatedTsn")){
			
			String dataResponse = arguments.getString(0);
			String buildType = arguments.getString(1);
			
			JSONObject isEzComAccountCreated= null;
		
			
			try {
				isEzComAccountCreated = RakEzComHandler.getActivateTSNMethod(dataResponse,buildType);

			} catch (UnsupportedEncodingException e) {

				RakEzComHandler.throwErrorResponse();
			} catch (JSONException e) {
				log.log(Level.SEVERE, "JSON Exception", e);
				RakEzComHandler.throwErrorResponse();
			}
		   
			JSONObject message= new JSONObject();
			message.put("result", isEzComAccountCreated);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		else if(action.equalsIgnoreCase("checkEzComObject")){
			
			String buildType = arguments.getString(0);
			JSONObject isEzComAccAvailable= null;
		
			isEzComAccAvailable =RakEzComHandler.getEzAccountFromDevice(buildType);
			
			JSONObject message= new JSONObject();
			message.put("result", isEzComAccAvailable);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		else if(action.equalsIgnoreCase("checkImageAndPinLength")){
			
			
			JSONObject isEzComAccAvailable= null;
			String buildType = arguments.getString(0);
		
			isEzComAccAvailable =RakEzComHandler.getEzAccountFromDevice(buildType);
			String pinLength = FinacleMobileApp.prefs.getString("tokenPinLength"+buildType, "");
			String pinLengthRET = FinacleMobileApp.prefs.getString("tokenPinLengthRET", "");
			String pinLengthCORP = FinacleMobileApp.prefs.getString("tokenPinLengthCORP", "");
			if(null==pinLength || "".equalsIgnoreCase(pinLength)){
				pinLength = defaultTokenPinLength;
				pinLengthRET = defaultTokenPinLength;
				pinLengthCORP = defaultTokenPinLength;
			}
			
			isEzComAccAvailable.put("tokenPinLength",pinLength);
			isEzComAccAvailable.put("tokenPinLengthRET",pinLengthRET);
			isEzComAccAvailable.put("tokenPinLengthCORP",pinLengthCORP);
			
			JSONObject message= new JSONObject();
			
			message.put("result", isEzComAccAvailable);
			
		
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		else if(action.equalsIgnoreCase("generateEzComTokenNumber")){
			
			String tokenPin = arguments.getString(0);
			String buildType = arguments.getString(1);
			JSONObject generatedToken= null;
		
			
			try {
				generatedToken = RakEzComHandler.getEzTokenNumber(tokenPin,buildType);

			}catch (JSONException e) {
				log.log(Level.SEVERE, "JSON Exception", e);
				RakEzComHandler.throwErrorResponse();
			}
		   
			JSONObject message= new JSONObject();
			message.put("result", generatedToken);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		else if(action.equalsIgnoreCase("setEzComAccountPin")){
			
			String saveTokenPin = arguments.getString(0);
			String buildType = arguments.getString(1);
			JSONObject isEzmComAccountSaved= null;
		
			
			try {
				isEzmComAccountSaved = RakEzComHandler.setEzAccountPinMethod(saveTokenPin, buildType);

			} catch (UnsupportedEncodingException e) {

				RakEzComHandler.throwErrorResponse();
			} catch (JSONException e) {
				log.log(Level.SEVERE, "JSON Exception", e);
				RakEzComHandler.throwErrorResponse();
			}
		   
			JSONObject message= new JSONObject();
			message.put("result", isEzmComAccountSaved);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		

		
		else if(action.equalsIgnoreCase("fetchTsnFromEzComObject")){
			
			
			JSONObject tsnFromEzAccount= null;
			String buildType = arguments.getString(0);
			
			tsnFromEzAccount =RakEzComHandler.getTsnFromLocalEzAccount(buildType);
			
			JSONObject message= new JSONObject();
			message.put("result", tsnFromEzAccount);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		
		else if(action.equalsIgnoreCase("fetchEzComObjectFromTsn")){
			
			String tsn = arguments.getString(0);
			String buildType = arguments.getString(1);
			
			try {
				 RakEzComHandler.getEzAccountFromTsn(tsn,buildType);

			}  catch (JSONException e) {
				log.log(Level.SEVERE, "JSON Exception", e);
				RakEzComHandler.throwErrorResponse();
			}
		   
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,"");
			callbackContext.sendPluginResult(pluginResult);
		}
		
		else if(action.equalsIgnoreCase("recievedPushInitiate")){
			
			JSONObject contentKey =  arguments.getJSONObject(0);
			String buildType = arguments.getString(1);
			String content = contentKey.getString("content");
			JSONObject status= null;
		
			
			try {
				status = RakEzComHandler.extractInfoFromPushMessage(content,buildType);

			}  catch (JSONException e) {
				log.log(Level.SEVERE, "JSON Exception", e);
				RakEzComHandler.throwErrorResponse();
			}
		   
			JSONObject message= new JSONObject();
			message.put("result", status);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		
		else if(action.equalsIgnoreCase("submitPinForApproval")){
			
			String pin = arguments.getString(0);
			String pushMsg = arguments.getString(1);
			String buildType = arguments.getString(2);
			JSONObject processTxnString= null;
		
			
			processTxnString = RakEzComHandler.submitPinForApproval(pin, pushMsg, buildType);
		   
			JSONObject message= new JSONObject();
			message.put("result", processTxnString);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		
		else if(action.equalsIgnoreCase("SubmitApproval")){
			
			JSONObject argumentData =  arguments.getJSONObject(0);
			String buildType = arguments.getString(1);
			
			String payLoadObject = argumentData.getString("newPayload");
			String txnStatus = argumentData.getString("txnStatus");
			JSONObject signedTxnString= null;
		
			
			signedTxnString = RakEzComHandler.submitApproval(payLoadObject, txnStatus, buildType);
		   
			JSONObject message= new JSONObject();
			message.put("result", signedTxnString);
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,message);
			callbackContext.sendPluginResult(pluginResult);
		}
		
	
		return true;


	}
}
