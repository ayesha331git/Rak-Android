package com.rakcorp;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.util.Base64;

public class FinaclePDFFileOpener extends CordovaPlugin{
	String strFileName="";
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		 UserPermissionUtility marshMallowPermission = new UserPermissionUtility(
					this.cordova.getActivity());
			if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
				if (!marshMallowPermission.checkPermissionForExternalStorage()) {
					return false;
				}
			}
		
		PluginResult.Status status = PluginResult.Status.OK;
		String result = "";

		try {
			if (action.equals("openFile")) {
				strFileName=args.getString(1);
				File file=  saveAsPDF(args.getString(0));
				
				if(!file.equals(null)){
					openFile(file);
				}
			}
			
			else {
				status = PluginResult.Status.INVALID_ACTION;
			}

			return true;
			//	            } catch (JSONException e) {
			//	                return false;
		}
		catch (Exception e) {
			status = PluginResult.Status.ERROR;
			return false;
			
		}

	}

	//save Pdf to the downloads folder
	private File saveAsPDF(String data) throws IOException{
		OutputStream op = null;
		try {
		byte[] bytes = Base64.decode(data, Base64.DEFAULT);
//		String url = Environment.getExternalStorageDirectory().getAbsolutePath();
		File dir=new File(Environment.getExternalStorageDirectory(),"/Download");
		
		File file = new File(dir,strFileName);

		
			op = new FileOutputStream(file);
			op.write(bytes);
			op.flush();
			return file;

		} catch (Exception e) {
			 LOG.d(FinacleMobileApp.LOG_TAG,"pdf output failed");

		}
		finally{
			if(op != null){
				op.close();
			}
		}
		return null;

	}
	//open file in pdf reader
	private void openFile(File file) throws IOException {
		// Create URI
		//	    	File file = new File(Environment.getExternalStorageDirectory().getAbsolutePath()+"/mydemo.pdf");
//			        Uri uri = Uri.parse(url);

		
		// Check what kind of file you are trying to open, by comparing the url with extensions.
		// When the if condition is matched, plugin sets the correct intent (mime) type,
		// so Android knew what application to use to open the file


//		if(url.contains(".pdf")) {
		try {
			Intent intent = null;
				Intent target = new Intent(Intent.ACTION_VIEW);
				target.setDataAndType(Uri.fromFile(file),"application/pdf");
				target.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);

				intent = Intent.createChooser(target, "Open File");
				this.cordova.getActivity().startActivity(intent);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			 LOG.d(FinacleMobileApp.LOG_TAG,"pdf activity failed");
		}
			// PDF file
			//	            intent = new Intent(Intent.ACTION_VIEW);
			//	            intent.setDataAndType(uri, "application/pdf");
//		}

		//if you want you can also define the intent type for any other file

		//additionally use else clause below, to manage other unknown extensions
		//in this case, Android will show all applications installed on the device
		//so you can choose which application to use


		
	}
}
