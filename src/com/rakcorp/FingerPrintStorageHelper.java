package com.rakcorp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class FingerPrintStorageHelper extends CordovaPlugin {

	@Override
    public boolean execute (String action, JSONArray args, CallbackContext callback)
            throws JSONException {
       System.out.println("Badge plugin Action"+action);
        if (action.equalsIgnoreCase("storeDetails")) {
        	storeDetails(args,callback);
            return true;
        }

        if (action.equalsIgnoreCase("deleteDetails")) {
        	deleteDetails(args,callback);
            return true;
        }

        if (action.equalsIgnoreCase("retrieveDetails")) {
        	retrieveDetails(args,callback);
            return true;
        }

        if(action.equalsIgnoreCase("retrieveStatus")){
        	retrieveStatus(args, callback);
        	return true;

        }

        return false;
	}


	private boolean storeDetails(JSONArray args,CallbackContext callBack){

		try {

			FingerprintAuth.setStringPreference(FingerprintAuth.mContext, "Imprint", "IdEnrolled",args.getString(0));
			FingerprintAuth.setStringPreference(FingerprintAuth.mContext, "Imprint", "CodeEnrolled",args.getString(1));
			FingerprintAuth.setStringPreference(FingerprintAuth.mContext, "Imprint", "token",args.getString(2));
			FingerprintAuth.setStringPreference(FingerprintAuth.mContext, "Imprint", "isTouchIDActivation",args.getString(3));
			FingerprintAuth.setStringPreference(FingerprintAuth.mContext, "Imprint", "registeredCIFID",args.getString(4));

		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}

    private boolean deleteDetails(JSONArray args,CallbackContext callBack){

		return true;
	}

    private boolean retrieveDetails(JSONArray args,CallbackContext callBack){

    	String status = FingerprintAuth.getStringPreference(FingerprintAuth.mContext, "Imprint", "isTouchIDActivation");
    	if(null!=status && status.length() > 0){
    		String id = FingerprintAuth.getStringPreference(FingerprintAuth.mContext, "Imprint", "IdEnrolled");
    		String code = FingerprintAuth.getStringPreference(FingerprintAuth.mContext, "Imprint", "CodeEnrolled");
    		String token = FingerprintAuth.getStringPreference(FingerprintAuth.mContext, "Imprint", "token");
    		String cifId = FingerprintAuth.getStringPreference(FingerprintAuth.mContext, "Imprint", "registeredCIFID");
    		JSONObject obj=new JSONObject();
    		try {
				obj.put("id", id);
			    obj.put("code", code);
			    obj.put("token", token);
			    obj.put("registeredCIFID", cifId);
    		PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,obj);
    		callBack.sendPluginResult(pluginResult);
    		} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
    	}

		return true;
	}

    private boolean retrieveStatus(JSONArray args,CallbackContext callBack){
    	String status = FingerprintAuth.getStringPreference(FingerprintAuth.mContext, "Imprint", "isTouchIDActivation");
    	boolean enrollStatus=null!=status && status.length()>0  ? true :false;
    	PluginResult result=new PluginResult(PluginResult.Status.OK,enrollStatus);
    	callBack.sendPluginResult(result);
    	return true;
    }


}
