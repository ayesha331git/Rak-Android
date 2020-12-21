package com.rakcorp;

import java.io.IOException;
import java.io.InputStream;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.res.Resources.NotFoundException;
import android.util.Log;

public class LanguageUtility {

	String locale="";
	public  JSONObject application;
	JSONObject plugins;
	public LanguageUtility(Context  context,String language) {
		 try {
			locale=language;
			application = new JSONObject(loadJSONFromAsset(context));
		} catch (JSONException e) {
			 Log.d(FinacleMobileApp.LOG_TAG,"language util json failed");
		} catch (IOException e) {
			Log.d(FinacleMobileApp.LOG_TAG,"language util json failed");
		}
	}

	public String getProperty(String key ) {
		String []values;
		values= key.split("\\.");
		try {
	        JSONObject plugin= (JSONObject)application.getJSONObject(values[0]);
	        for (int i = 1; i < values.length-1; i++) {
	        	plugin = ( (JSONObject)(plugin.getJSONObject(values[i])));
			}
	    return plugin.getString(values[values.length-1]);
	    } catch (JSONException e) {
	    	 Log.d(FinacleMobileApp.LOG_TAG,"literal not there lang util");
	    }
		return "";
	}
	public  String loadJSONFromAsset(Context context) throws IOException {
        String json = null;
        InputStream is = null;
		try {
			// InputStream is = context.getAssets().open(path+"Literals_"+locale+".json");
			
			try {
				String fileName = "nativecode_literals_" + locale;
				is = context.getResources().openRawResource(context.getResources().getIdentifier(fileName, "raw", context.getPackageName()));
				if (is == null) {
					// Loading the default Language(EN)
					is = context.getResources().openRawResource(context.getResources().getIdentifier("nativecode_literals_en", "raw", context.getPackageName()));
				}
				Log.d(FinacleMobileApp.LOG_TAG, "successfully loaded locale from res.." + fileName);
			} catch (NotFoundException nfe) {
				Log.d(FinacleMobileApp.LOG_TAG, "Failed loading locale. Loading default locale");
				is = context.getResources().openRawResource(context.getResources().getIdentifier("nativecode_literals_en", "raw", context.getPackageName()));
			}
			int size = is.available();
			byte[] buffer = new byte[size];
			is.read(buffer);
			json = new String(buffer, "UTF-8");
		} catch (IOException ex) {
        	 Log.d(FinacleMobileApp.LOG_TAG,"load json lang util failed");
            return null;
        }
		finally{
			if(is != null){
				is.close();
			}
		}
        return json;
    }
}
