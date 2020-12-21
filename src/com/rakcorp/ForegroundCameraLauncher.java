/*
	    Copyright 2013 Bruno Carreira - Lucas Farias - Rafael Luna - Vin�cius Fonseca.

		Licensed under the Apache License, Version 2.0 (the "License");
		you may not use this file except in compliance with the License.
		You may obtain a copy of the License at

		http://www.apache.org/licenses/LICENSE-2.0

		Unless required by applicable law or agreed to in writing, software
		distributed under the License is distributed on an "AS IS" BASIS,
		WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		See the License for the specific language governing permissions and
   		limitations under the License.   			
 */

package com.rakcorp;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.apache.cordova.camera.CameraLauncher;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.rakcorp.ForegroundCameraLauncher;

import android.app.Activity;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;

/**
 * This class launches the camera view, allows the user to take a picture,
 * closes the camera view, and returns the captured image. When the camera view
 * is closed, the screen displayed before the camera view was shown is
 * redisplayed.
 */
public class ForegroundCameraLauncher extends CameraLauncher {

	private static final String LOG_TAG = "ForegroundCameraLauncher";

	private int mQuality;
	private int targetWidth;
	private int targetHeight;

	private Uri imageUri;
	private File photo;

	public String callbackId;
	private int numPics;
	public static byte[] frontImageByteArray=null; 
	public static byte[] backImageByteArray=null; 
	public static String frontImageBase64=null; 
	public static String backImageBase64=null; 
	public static boolean onSuccessReturn=false;

	private static final String _DATA = "_data";
	public static String frontImageText = "";
	public static String backImageText = "";
	public static String locale= "";
	/**
	 * Constructor.
	 */
	public ForegroundCameraLauncher() {
	}

	/**
	 * Executes the request and returns PluginResult.
	 *
	 * @param action        	The action to execute.
	 * @param args          	JSONArry of arguments for the plugin.
	 * @param callbackContext   The callback id used when calling back into JavaScript.
	 * @return              	A PluginResult object with a status and message.
	 */
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

		this.callbackContext = callbackContext;
		 UserPermissionUtility marshMallowPermission = new UserPermissionUtility(
					this.cordova.getActivity());
			if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
				if (!marshMallowPermission.checkPermissionForCamera()) {
					return false;
				}
			}
		if (action.equals("captureImage")) {


			try {
				
				JSONObject jsonObject=((JSONObject)((JSONArray)args.getJSONArray(0)).getJSONObject(0));
				frontImageText=jsonObject.getString("frontSideText");
				backImageText=jsonObject.getString("backSideText");
				
				locale =jsonObject.getString("locale");
				this.takePicture();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				 LOG.d(FinacleMobileApp.LOG_TAG,"fore ground json failed");
				//e.printStackTrace();
			}

			PluginResult r = new PluginResult(PluginResult.Status.OK);
			r.setKeepCallback(true);
			callbackContext.sendPluginResult(r);
			return true;
		}
		return false;
	}
	//    try {
	//		final String responseText = "Hello " + args.getString(0);
	//		cordova.getThreadPool().execute(new Runnable() {
	//			public void run() {	        	
	//				callbackContext.success(responseText); // Thread-safe.
	//			}
	//		});
	//	} catch (JSONException e){
	//		callbackContext.error("Failed to parse parameters");
	//	}
	// --------------------------------------------------------------------------
	// LOCAL METHODS
	// --------------------------------------------------------------------------

	/**
	 * Take a picture with the camera. When an image is captured or the camera
	 * view is cancelled, the result is returned in
	 * CordovaActivity.onActivityResult, which forwards the result to
	 * this.onActivityResult.
	 * 
	 * The image can either be returned as a base64 string or a URI that points
	 * to the file. To display base64 string in an img tag, set the source to:
	 * img.src="data:image/jpeg;base64,"+result; or to display URI in an img tag
	 * img.src=result;
	 * 
	 */    
	public void takePicture() {
		// Save the number of images currently on disk for later
		//		this.numPics = queryImgDB().getCount();

		Intent intent = new Intent(this.cordova.getActivity().getApplicationContext(), CaptureCheckImageActivity.class);
		//		this.photo = createCaptureFile();
		//		this.imageUri = Uri.fromFile(photo);
		//		intent.putExtra(MediaStore.EXTRA_OUTPUT, this.imageUri);


		this.cordova.startActivityForResult((CordovaPlugin) this, intent, 1);
	}

	/**
	 * Create a file in the applications temporary directory based upon the
	 * supplied encoding.
	 * 
	 * @return a File object pointing to the temporary picture
	 */
	//	private File createCaptureFile() {
	//		File photo = new File(getTempDirectoryPath(this.cordova.getActivity().getApplicationContext()), "Pic.jpg");
	//		return photo;
	//	}

	/**
	 * Called when the camera view exits.
	 * 
	 * @param requestCode
	 *            The request code originally supplied to
	 *            startActivityForResult(), allowing you to identify who this
	 *            result came from.
	 * @param resultCode
	 *            The integer result code returned by the child activity through
	 *            its setResult().
	 * @param intent
	 *            An Intent, which can return result data to the caller (various
	 *            data can be attached to Intent "extras").
	 */
	public void onActivityResult(int requestCode, int resultCode, Intent intent) {

		// If image available
		if (resultCode == Activity.RESULT_OK) {
			try {
				
				//String encBase64FrontImage=Base64.encodeToString(ForegroundCameraLauncher.frontImageByteArray, Base64.DEFAULT);
				//String encBase64BackImage=Base64.encodeToString(ForegroundCameraLauncher.backImageByteArray, Base64.DEFAULT);
				JSONObject encBase64Image=new JSONObject();

				try {
					encBase64Image.put("message", "success");
					//encBase64Image.put("frontImage", encBase64FrontImage);
					//encBase64Image.put("backImage", encBase64BackImage);
					
					encBase64Image.put("frontImage", ForegroundCameraLauncher.frontImageBase64);
					encBase64Image.put("backImage", ForegroundCameraLauncher.backImageBase64);

				} catch (JSONException e) {
					// TODO Auto-generated catch block
					 LOG.d(FinacleMobileApp.LOG_TAG,"foreground json iamge data failed");
				}


				this.callbackContext.success(encBase64Image);

				//				bitmap.recycle();
				//				bitmap = null;
				//				System.gc();

				//				checkForDuplicateImage();
			} catch (Exception e) {
				 LOG.d(FinacleMobileApp.LOG_TAG,"Error capturing image.");
				this.failPicture("Error capturing image.");
			}
		}

		// If cancelled
		else if (resultCode == Activity.RESULT_CANCELED) {
			//			byte[] byteImge={};
			//			String str=new String(ForegroundCameraLauncher.backImageByteArray);
			
			if(onSuccessReturn){
				//String encBase64FrontImage=Base64.encodeToString(ForegroundCameraLauncher.frontImageByteArray, Base64.DEFAULT);
				//String encBase64BackImage=Base64.encodeToString(ForegroundCameraLauncher.backImageByteArray, Base64.DEFAULT);
				JSONObject encBase64Image=new JSONObject();

				try {
					encBase64Image.put("message", "success");
					//encBase64Image.put("frontImage", encBase64FrontImage);
					//encBase64Image.put("backImage", encBase64BackImage);
					
					encBase64Image.put("frontImage", ForegroundCameraLauncher.frontImageBase64);
					encBase64Image.put("backImage", ForegroundCameraLauncher.backImageBase64);

			} catch (JSONException e) {
				// TODO Auto-generated catch block
				 LOG.d(FinacleMobileApp.LOG_TAG,"success json exception.");
			}

			onSuccessReturn=false;
			this.callbackContext.success(encBase64Image);
			}else
					this.failPicture("Camera cancelled.");
		}

		// If something else
		else {
			this.failPicture("Did not complete!");
		}
	}

	
}
