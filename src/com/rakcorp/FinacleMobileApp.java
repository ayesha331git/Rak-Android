package com.rakcorp;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.cordova.CordovaActivity;
import org.apache.cordova.CordovaWebView;
import org.json.JSONException;
import org.json.JSONObject;

import com.ezmcom.sdk.eztoken.EzTokenSDK;
import com.ezmcom.sdk.eztoken.exception.EzException;
import com.worklight.androidgap.api.WL;
import com.worklight.androidgap.api.WLInitWebFrameworkListener;
import com.worklight.androidgap.api.WLInitWebFrameworkResult;
import com.worklight.wlclient.api.WLClient;

import android.annotation.TargetApi;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebSettings;

public class FinacleMobileApp extends CordovaActivity implements WLInitWebFrameworkListener {
	 public static final String LOG_TAG = "com.rakcorp";
	 public static InputStream is = null;
	 public static InputStream isSign = null;
	 public static SharedPreferences prefs = null;
	 public static boolean approvalFlow=false;
	 
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		/* code for restricting capturing screenshots */
		/*if(android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.HONEYCOMB){
			getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
		}*/
		/* end - changes */
		boolean emuChk = false;
		boolean isDebuggable = false;
		approvalFlow=true;
		isDebuggable = (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE));
		//System.out.println("Check::1::"+BuildConfig.DEBUG);
		//System.out.println("Check::2::"+isDebuggable);

		if(isDebuggable || BuildConfig.DEBUG)
			isDebuggable = true;
		//System.out.println("====isDebuggable====="+isDebuggable);
		//System.out.println("====Build.PRODUCT====="+Build.PRODUCT);
		//Fix for ticket #784747
		if("google_sdk".equals(Build.PRODUCT) ||
           "sdk_google_phone_x86".equals(Build.PRODUCT) || "sdk".equals(Build.PRODUCT) ||
           "sdk_x86".equals(Build.PRODUCT) || "vbox86p".equals(Build.PRODUCT) ||
           Build.FINGERPRINT.contains("generic") ||
           Build.MANUFACTURER.contains("Genymotion") || Build.MODEL.contains("Emulator") || Build.MANUFACTURER.equalsIgnoreCase("unknown") ||
           Build.MODEL.contains("Android SDK built for x86") ||
           Build.HARDWARE.equalsIgnoreCase("unknown") || Build.HARDWARE.equalsIgnoreCase("goldfish"))
		{
			emuChk =  true;
        }

//		if(emuChk) {
//			finish();
//		}

		//changes for runtime checksum check-start
		//Below code commented for signed application
		/*if(!isDebuggable){
			boolean validResources = validateResChecksum();
			//System.out.println("validResources is:"+validResources);
			if(!validResources){
				System.out.println("Security Violation - Closing the application");
				//LOG.d(FinacleMobileApp.LOG_TAG,"Security Violation - Closing the application");
				finish();
			}
		} else {
		//	System.out.println("build is in debug mode..");
		}*/
//		if(!emuChk) {
			try {

				EzTokenSDK.init(getApplicationContext());
				RakEzComHandler.newObj = new RakEzComHandler(getApplicationContext());
				AssetManager assets = getAssets();
				is = assets.open("ezm.cer");

				prefs = getSharedPreferences("appPrefs", MODE_PRIVATE);


			} catch (EzException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			//System.out.println("====emuChk====="+emuChk);
			// Code end for Emulator and debugging check
			/**
			 * Please uncomment the below if condition for an production build to disable android debugging and running production build on emulator.
			 * Also add android:debuggable="false" in android manifest for the application tag.
			 * Ex : <application android:debuggable="false" android:label="@string/app_name" android:icon="@drawable/icon" android:windowSoftInputMode="stateVisible|adjustResize|adjustPan">
			 */
			//if(!emuChk && !isDebuggable)
			{
			WL.createInstance(this);

			WL.getInstance().showSplashScreen(this);


	/*
			String isEzComAccFound = "NO";
			if(FinacleMobileApp.prefs.getString("ezAccount", "") != ""){
				isEzComAccFound = "YES";
			}
			String tokenPinLength = FinacleMobileApp.prefs.getString("tokenPinLength", "");
			if(null==tokenPinLength || "".equalsIgnoreCase(tokenPinLength)){
				tokenPinLength = "6";
			}

			JSONObject returnJSON = new JSONObject();
			try {
				returnJSON.put("isEzComAccFound", isEzComAccFound);
				returnJSON.put("tokenPinLength", tokenPinLength);
			} catch (JSONException e) {
				e.printStackTrace();
			}
			WL.getInstance().sendActionToJS("iconChangeEZComObjectCheck", returnJSON);

			*/

			/**
			 * Code for certificate pinning
			 */
			/* Enable the below code for certificate pinning. certificate should be placed in assets folder*/

			// WLClient.getInstance().pinTrustedCertificatePublicKey("cert.cer");

			WL.getInstance().initializeWebFramework(getApplicationContext(), this);
			onNewIntent(getIntent());
			}
//		}
//		else{
//			setContentView(R.layout.activity_jb);
//		}
	}
	@Override
	protected void onNewIntent(Intent intent) {
		// TODO Auto-generated method stub
		if (intent.getExtras() != null&&intent.getExtras().getString("data")!=null) {
			System.out.println("lancun value "
					+ intent.getExtras().getString("data"));
			try {
				JSONObject data = new JSONObject(intent.getExtras().getString("data"));
				data.put("isClicked", "true");
				data.put("wasTapped", "true");


                intent.putExtra("data",data.toString());
				WL.getInstance().sendActionToJS("pushData", data);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		super.onNewIntent(intent);
	}
	
	private boolean validateResChecksum(){
		ResourceCValidator validator = new ResourceCValidator();
		return validator.propertiesFileSecurityCheck(getApplicationContext());
	}

/*
	@Override
	public void init() {
		// TODO Auto-generated method stub
		CordovaWebView webView = new KeypadHandler(FinacleMobileApp.this);
		CordovaWebViewClient webViewClient;
		if (android.os.Build.VERSION.SDK_INT < android.os.Build.VERSION_CODES.HONEYCOMB) {
			webViewClient = new CordovaWebViewClient(this, webView);
		} else {
			webViewClient = new IceCreamCordovaWebViewClient(this, webView);
		}
		this.init(webView, webViewClient, new CordovaChromeClient(this, webView));
	}
*/
	/* MFP 8.0 migration commentd code end */
	/**
	 * The IBM MobileFirst Platform calls this method after its initialization is complete and web resources are ready to be used.
	 */
 	public void onInitWebFrameworkComplete(WLInitWebFrameworkResult result){
		if (result.getStatusCode() == WLInitWebFrameworkResult.SUCCESS) {
			super.loadUrl(WL.getInstance().getMainHtmlFilePath());
		} else {
			handleWebFrameworkInitFailure(result);
		}
		WL.getInstance().addActionReceiver(new ActionReceiver(this));
		checkPermissions();//permission check for marshmallow 
	}
	
	//permission check for marshmallow - Change starts
	@TargetApi(23)
	private void checkPermissions() {
		List<String> permissionsList = new ArrayList<String>();
		List<String> permissionsListNotGranted = new ArrayList<String>();
		permissionsList.add("android.permission.READ_CONTACTS");

		permissionsList.add("android.permission.CAMERA");
	/*	permissionsList.add("android.permission.CALL_PHONE");*/
		permissionsList.add("android.permission.ACCESS_FINE_LOCATION");

		permissionsList.add("android.permission.READ_EXTERNAL_STORAGE");
		permissionsList.add("android.permission.WRITE_EXTERNAL_STORAGE");
		permissionsList.add("android.permission.READ_PHONE_STATE");

		if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
			int count = 0;
			for (int i = 0; i < permissionsList.size(); i++)
			{
				if (!(WLClient.getInstance().getContext()
						.checkSelfPermission(permissionsList.get(i)) == PackageManager.PERMISSION_GRANTED)) {
					permissionsListNotGranted.add(permissionsList.get(i));
					count++;
				}
			}

			String[] permmissions = new String[permissionsListNotGranted.size()];
			for (int i = 0; i < permissionsListNotGranted.size(); i++) {
				permmissions[i] = permissionsListNotGranted.get(i).toString();
			}
			if (permmissions.length >= 1) {
				requestPermissions(permmissions, 1);
			}
		}
	}
	//permission check for marshmallow - Change ends
	
	private void handleWebFrameworkInitFailure(WLInitWebFrameworkResult result){
		AlertDialog.Builder alertDialogBuilder = new AlertDialog.Builder(this);
		alertDialogBuilder.setNegativeButton(R.string.close, new OnClickListener() {
			@Override
			public void onClick(DialogInterface dialog, int which){
				finish();
			}
		});

		alertDialogBuilder.setTitle(R.string.error);
		alertDialogBuilder.setMessage(result.getMessage());
		alertDialogBuilder.setCancelable(false).create().show();
	}
}
