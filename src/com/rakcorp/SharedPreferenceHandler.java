package com.rakcorp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class SharedPreferenceHandler extends CordovaPlugin {
	public static final String GET_SHARED_PREFERENCES = "getSharedPreferences";
	public static final String PUT_STRING = "putString";
	public static final String GET_STRING = "getString";
	public static final String PUT_BOOLEAN = "putBoolean";
	public static final String GET_BOOLEAN = "getBoolean";
	public static final String PUT_INT = "putInt";
	public static final String GET_INT = "getInt";
	public static final String PUT_FLOAT = "putFloat";
	public static final String GET_FLOAT = "getFloat";
	public static final String PUT_LONG = "putLong";
	public static final String GET_LONG = "getLong";
	public static final String REMOVE = "remove";
	public static final String CLEAR = "clear";
	public static final String SHARED_PREFERENCES = "SharedPreferences";
	public static String PREF_FILE = "";
	public static final String[] MODE_ARRAY = {"MODE_APPEND", "MODE_PRIVATE"};
	FinacleSharedPreferences SharedPref;

	private static final int INDEX_PREFERENCE_FILE = 0;
	private static final int INDEX_FIRST_KEY = 1;

	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.cordova.setActivityResultCallback(this);

		//create shared Preferences
		//JSONArray: 1st arg is filename
		String prefName = args.getString(INDEX_PREFERENCE_FILE);
		SharedPref = FinacleSharedPreferences.getInstance(this.cordova.getActivity().getApplicationContext(), prefName);

		if(PUT_STRING.equals(action)){
			//to support multiple key-value pairs from JS, before insert key-value, checking for length of args 
			if(args.length()%2 == 0){
				callbackContext.error("Error editing Key");
				return false;
			}else{
				int presentIndex = INDEX_FIRST_KEY;
				try{
					for(int index = INDEX_FIRST_KEY ; index < args.length(); index++){
						presentIndex = index;
						SharedPref.putString(args.getString(index), args.getString(++index));
					}
				}catch (Exception e){
					callbackContext.error("Error editing Key " + args.getString(presentIndex) + " with value " + args.getString(presentIndex+1) + e.getMessage());
					return false;
				}
			}
			callbackContext.success("Added values Successfully");
			return true;		
		}else if(GET_STRING.equals(action)){
			String KeyVal;			
			try{				
				if(SharedPref.contains(args.getString(INDEX_FIRST_KEY))){
					KeyVal = SharedPref.getString(args.getString(INDEX_FIRST_KEY), args.getString(INDEX_FIRST_KEY) + " Doesnt Exist");
					callbackContext.success(KeyVal);
					return true;
				}else{
					callbackContext.error("No data");
					return false;
				}
			}catch (Exception e){
				callbackContext.error("Could Not Retreive " + args.getString(INDEX_FIRST_KEY) + e.getMessage());
				return false;
			}
		}else if(PUT_BOOLEAN.equals(action)){
			if(args.length()%2 == 0){
				callbackContext.error("Error editing Key");
				return false;
			}else{
				int presentIndex = INDEX_FIRST_KEY;
				try{
					for(int index = INDEX_FIRST_KEY ; index < args.length(); index++){
						presentIndex = index;
						SharedPref.putBoolean(args.getString(index), args.getBoolean(++index));
					}
				}catch (Exception e){
					callbackContext.error("Error editing Key " + args.getString(presentIndex) + " with value " + args.getString(presentIndex+1) + e.getMessage());
					return false;
				}
			}
			callbackContext.success("Added values Successfully");
			return true;		
		}else if(GET_BOOLEAN.equals(action)){									
			Boolean KeyVal;
			try{				
				if(SharedPref.contains(args.getString(INDEX_FIRST_KEY))){
					KeyVal = SharedPref.getBoolean(args.getString(INDEX_FIRST_KEY), false);
					if(KeyVal.equals(true)){
						callbackContext.success(1);
					}else{
						callbackContext.success(0);
					}
					return true;
				}else{
					callbackContext.error("No data");
					return false;
				}
			}catch (Exception e){
				callbackContext.error("Could Not Retreive " + args.getString(INDEX_FIRST_KEY) + e.getMessage());
				return false;
			}
		}else if(PUT_INT.equals(action)){

			if(args.length()%2 == 0){
				callbackContext.error("Error editing Key");
				return false;
			}else{
				int presentIndex = INDEX_FIRST_KEY;
				try{
					for(int index = INDEX_FIRST_KEY ; index < args.length(); index++){
						presentIndex = index;
						SharedPref.putInt(args.getString(index), args.getInt(++index));
					}
				}catch (Exception e){
					callbackContext.error("Error editing Key " + args.getString(presentIndex) + " with value " + args.getString(presentIndex+1) + e.getMessage());
					return false;
				}
			}
			callbackContext.success("Added values Successfully");
			return true;		
		}else if(GET_INT.equals(action)){									
			Integer KeyVal;
			try{				
				if(SharedPref.contains(args.getString(INDEX_FIRST_KEY))){
					KeyVal = SharedPref.getInt(args.getString(INDEX_FIRST_KEY), 0);
					callbackContext.success(KeyVal);
					return true;
				}else{
					callbackContext.error("No data");
					return false;
				}
			}catch (Exception e){
				callbackContext.error("Could Not Retreive " + args.getString(INDEX_FIRST_KEY) + e.getMessage());
				return false;
			}
		}else if(PUT_LONG.equals(action)){
			if(args.length()%2 == 0){
				callbackContext.error("Error editing Key");
				return false;
			}else{
				int presentIndex = INDEX_FIRST_KEY;
				try{
					for(int index = INDEX_FIRST_KEY ; index < args.length(); index++){
						presentIndex = index;
						SharedPref.putLong(args.getString(index), args.getLong(++index));
					}
				}catch (Exception e){
					callbackContext.error("Error editing Key " + args.getString(presentIndex) + " with value " + args.getString(presentIndex+1) + e.getMessage());
					return false;
				}
			}
			callbackContext.success("Added values Successfully");
			return true;		
		}else if(GET_LONG.equals(action)){									
			Long KeyVal;
			try{				
				if(SharedPref.contains(args.getString(INDEX_FIRST_KEY))){
					KeyVal = SharedPref.getLong(args.getString(INDEX_FIRST_KEY), 0);
					callbackContext.success(KeyVal.toString());
					return true;
				}else{
					callbackContext.error("No data");
					return false;
				}
			}catch (Exception e){
				callbackContext.error("Could Not Retreive " + args.getString(INDEX_FIRST_KEY) + e.getMessage());
				return false;
			}
		}else if(PUT_FLOAT.equals(action)){
			if(args.length()%2 == 0){
				callbackContext.error("Error editing Key");
				return false;
			}else{
				int presentIndex = INDEX_FIRST_KEY;
				try{
					for(int index = INDEX_FIRST_KEY ; index < args.length(); index++){
						presentIndex = index;
						SharedPref.putFloat(args.getString(index), args.getLong(++index));
					}
				}catch (Exception e){
					callbackContext.error("Error editing Key " + args.getString(presentIndex) + " with value " + args.getString(presentIndex+1) + e.getMessage());
					return false;
				}
			}
			callbackContext.success("Added values Successfully");
			return true;		
		}else if(GET_FLOAT.equals(action)){                  
			Float KeyVal;
			try{        
				if(SharedPref.contains(args.getString(INDEX_FIRST_KEY))){
					KeyVal = SharedPref.getFloat(args.getString(INDEX_FIRST_KEY), 0);
					callbackContext.success(KeyVal.toString());
					return true;
				}else{
					callbackContext.error("No data");
					return false;
				}
			}catch (Exception e){
				callbackContext.error("Could Not Retreive " + args.getString(INDEX_FIRST_KEY) + e.getMessage());
				return false;
			}
		}else if(REMOVE.equals(action)){
			try{
				SharedPref.removeValue(args.getString(INDEX_FIRST_KEY));
			}catch (Exception e){
				callbackContext.error("Error editing Key " + args.getString(INDEX_FIRST_KEY) + " with value " + args.getLong(1) + e.getMessage());
				return false;
			}
			callbackContext.success("Removed Value from Key " + args.getString(INDEX_FIRST_KEY));
			return true;		
		}else if(CLEAR.equals(action)){
			try{				
				SharedPref.clear();
			}catch (Exception e){
				callbackContext.error("Could Not Clear Shared preference File " + e.getMessage());
				return false;
			}
			callbackContext.success("Cleared preference File ");

			return true;
		}else{
			callbackContext.error("Invalid Action");
			return false;
		}
	}

	public static boolean in_array(String[] haystack, String needle) {
		for(int i=0;i<haystack.length;i++) {
			if(haystack[i].equals(needle)) {
				return true;
			}
		}
		return false;
	}
}
