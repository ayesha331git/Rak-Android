package com.FinacleMobileApp;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.DialogInterface.OnClickListener;
import android.hardware.input.InputManager;
import android.os.Bundle;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;

import org.apache.cordova.CordovaActivity;

public class FinacleMobileApp extends CordovaActivity  {
	 public static final String LOG_TAG = "com.Finacle";
	@Override
	public void onCreate(Bundle savedInstanceState){
		super.onCreate(savedInstanceState);
		/* code for restricting capturing screenshots */
		if(android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.HONEYCOMB){
			getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
		}
		/* end - changes */
	}
}
