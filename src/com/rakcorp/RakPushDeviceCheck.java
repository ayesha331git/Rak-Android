package com.rakcorp;

import java.security.KeyStore;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;

@TargetApi(23)
public class RakPushDeviceCheck extends CordovaPlugin {
	public static final String TAG = "RakPushDeviceCheck";
	public static String packageName;

	private static final String DIALOG_FRAGMENT_TAG = "FpAuthDialog";
	private static final String ANDROID_KEY_STORE = "AndroidKeyStore";
	public static final String FINGERPRINT_PREF_IV = "aes_iv";
	private static final int PERMISSIONS_REQUEST_FINGERPRINT = 346437;

	public static Context mContext;
	public static Activity mActivity;
	public KeyguardManager mKeyguardManager;
	public static KeyStore mKeyStore;
	public static KeyGenerator mKeyGenerator;
	public static Cipher mCipher;

	public static CallbackContext mCallbackContext;
	public static PluginResult mPluginResult;


	/**
	 * Alias for our key in the Android Key Store
	 */
	private static String mClientId;
	/**
	 * Used to encrypt token
	 */
	private static String mUsername = "";
	private static String mClientSecret;
	private static boolean mCipherModeCrypt;

	/**
	 * Options
	 */
	public static boolean mDisableBackup = false;
	public static int mMaxAttempts = 6;  // one more than the device default to prevent a 2nd callback
	private String mLangCode = "en_US";
	private static boolean mUserAuthRequired = true;
	public static String mDialogTitle;
	public static String mDialogMessage;
	public static String mDialogHint;



	/**
	 * Constructor.
	 */
	public RakPushDeviceCheck() {
	}



	/**
	 * Executes the request and returns PluginResult.
	 *
	 * @param action          The action to execute.
	 * @param args            JSONArry of arguments for the plugin.
	 * @param callbackContext The callback id used when calling back into JavaScript.
	 * @return A PluginResult object with a status and message.
	 */
	public boolean execute(final String action, JSONArray args, CallbackContext callbackContext)
			throws JSONException {
		boolean registered = false;
		String flag = "";
		if(action.equalsIgnoreCase("storeDetails")){
			
			String cifFlag = args.getString(0);
			
			Map<String,String> inputMap = new HashMap<String,String>();

			  String jsonString = FinacleMobileApp.prefs.getString("PUSHCIFID", (new JSONObject()).toString());
		      JSONObject jsonObject = new JSONObject(jsonString);
		      Iterator<String> keysItr = jsonObject.keys();
		      while(keysItr.hasNext()) {
		        String key = keysItr.next();
		        String value = (String) jsonObject.get(key);
		        inputMap.put(key, value);
		      }
			
			inputMap.put(cifFlag.split("#")[0], cifFlag.split("#")[1]);
			
			    jsonObject = new JSONObject(inputMap);
			    jsonString = jsonObject.toString();
			    Editor editor = FinacleMobileApp.prefs.edit();
			    editor.putString("PUSHCIFID", jsonString);
			    editor.commit();
			  
		}

		else if(action.equalsIgnoreCase("retrieveDetails")){
			String cif = args.getString(0).split("#")[0];
			Map<String,String> outputMap = new HashMap<String,String>();
			 String jsonString = FinacleMobileApp.prefs.getString("PUSHCIFID", (new JSONObject()).toString());
		      JSONObject jsonObject = new JSONObject(jsonString);
		      Iterator<String> keysItr = jsonObject.keys();
		      while(keysItr.hasNext()) {
		        String key = keysItr.next();
		        String value = (String) jsonObject.get(key);
		        outputMap.put(key, value);
		      }
			
			if(outputMap.get(cif)!=null){
			   flag = outputMap.get(cif);
			   registered = true;
			}
			PluginResult pluginResult=new PluginResult(PluginResult.Status.OK,registered+"#"+flag);
			callbackContext.sendPluginResult(pluginResult);
		}
		
		


		return true;


	}
}
