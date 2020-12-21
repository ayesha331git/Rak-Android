package com.rakcorp;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.location.Location;
import android.location.LocationManager;
import android.location.LocationListener;
import android.os.Build;
import android.os.Bundle;

public class Utils extends CordovaPlugin {

    private CallbackContext callbackContext;
	private Location lastlocation;
	private Context context;
	private boolean mOneTimeLocationListenerActive = false;
	private static final long MIN_DISTANCE_CHANGE_FOR_UPDATES = 10;
	private static final long MIN_TIME_BW_UPDATES = 1000;
	private LocationManager locationManager;
	
	private static final int maxCheckCount = 10;
	private int checkCount = 0;

	@Override
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		 this.callbackContext = callbackContext;
		 UserPermissionUtility marshMallowPermission = new UserPermissionUtility(
					this.cordova.getActivity());
			if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
				if (!marshMallowPermission.checkPermissionForLocation()) {
					return false;
				}
			}
		boolean gps_enabled=false;
		if (action.equals("isGpsEnabled")){
			context=this.cordova.getActivity().getApplicationContext();
			gps_enabled=getStatus(context);

			if(gps_enabled){
				//create the json object and return
				if(lastlocation!=null){
					JSONObject result = new JSONObject();
					result.put("latitude", lastlocation.getLatitude());
					result.put("longitude", lastlocation.getLongitude());
					result.put("accuracy", lastlocation.getAccuracy());
				this.callbackContext.success(result);
				}else{
					final String str= Boolean.toString(gps_enabled); //.toString();
					this.callbackContext.success(str);
				}
			}else{
			final String str= Boolean.toString(gps_enabled); //.toString();
			this.callbackContext.success(str);
			}
			return true;

	    }
		else{
		return false;
	    }
	}

	public boolean getStatus(Context context) {
	    boolean network_enabled = false;
		boolean gps_enabled=false;
	    locationManager = (LocationManager) 
	        context.getSystemService(Context.LOCATION_SERVICE);
	    network_enabled = locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER);
	    gps_enabled = locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
	    
	    if(checkCount < maxCheckCount){
	    	checkCount++;

	    	if(network_enabled && lastlocation == null){
	    		String locationProvider = LocationManager.NETWORK_PROVIDER;
	    		locationManager.requestLocationUpdates(
	    				LocationManager.NETWORK_PROVIDER,
	    				MIN_TIME_BW_UPDATES,
	    				MIN_DISTANCE_CHANGE_FOR_UPDATES, mOneTimeLocationListener);

	    		lastlocation = locationManager.getLastKnownLocation(locationProvider);


	    		if(lastlocation != null){
	    			mOneTimeLocationListenerActive = true;
	    			disableOneTimeLocationListener();
	    		}else{
	    			System.out.println("NETWORK_PROVIDER lastlocation is NULL - getStatus() calling again");
	    			getStatus(context);
	    		}
	    	}

	    	if(gps_enabled && lastlocation == null){
	    		String locationProvider = LocationManager.GPS_PROVIDER;
	    		locationManager.requestLocationUpdates(
	    				LocationManager.GPS_PROVIDER,
	    				MIN_TIME_BW_UPDATES,
	    				MIN_DISTANCE_CHANGE_FOR_UPDATES, mOneTimeLocationListener);

	    		lastlocation = locationManager.getLastKnownLocation(locationProvider);


	    		if(lastlocation != null){
	    			mOneTimeLocationListenerActive = true;
	    			disableOneTimeLocationListener();
	    		}else{
	    			System.out.println("GPS_PROVIDER lastlocation is NULL - getStatus() calling again");
	    			getStatus(context);
	    		}
	    	}
	    }
	    return network_enabled || gps_enabled;
	}
	
    private void disableOneTimeLocationListener() { 
    	if (mOneTimeLocationListenerActive) { 
    		locationManager.removeUpdates(mOneTimeLocationListener); 
    	}
    } 
	
	private LocationListener mOneTimeLocationListener = new LocationListener() { 
        @Override 
        public void onLocationChanged(Location location) { 
			System.out.println("onLocationChanged:");
			lastlocation = location;
        	disableOneTimeLocationListener();
        } 
 
        @Override 
        public void onStatusChanged(String s, int i, Bundle bundle) { 
        } 
 
        @Override 
        public void onProviderEnabled(String s) { 
        } 
 
        @Override 
        public void onProviderDisabled(String s) { 
        } 
    }; 
}


//package com.FinacleMobileApp;
//import org.apache.cordova.CallbackContext;
//import org.apache.cordova.CordovaPlugin;
//import org.json.JSONArray;
//import org.json.JSONException;
//
//import android.content.Context;
//import android.location.Location;
//import android.location.LocationManager;
//
//public class Utils extends CordovaPlugin {
//
//private CallbackContext callbackContext;
//	@Override
//	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
//		 this.callbackContext = callbackContext;
//		boolean gps_enabled=false;
//		if (action.equals("isGpsEnabled")){
//			Context context=this.cordova.getActivity().getApplicationContext();
//			gps_enabled=getStatus(context);
//
//			final String str= Boolean.toString(gps_enabled); //.toString();
//			this.callbackContext.success(str);
//			return true;
//
//	    }else{
//		return false;
//	    }
//	}
//
//	public static boolean getStatus(Context context) {
//		boolean gps_enabled=false;
//	    LocationManager locationManager = (LocationManager)
//	        context.getSystemService(Context.LOCATION_SERVICE);
//	    gps_enabled = (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)&& locationManager.isProviderEnabled(LocationManager.NETWORK_PROVIDER));
//	    return gps_enabled;
//	}
//}
