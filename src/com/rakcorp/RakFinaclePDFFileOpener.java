package com.rakcorp;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.net.Uri;
import android.os.Environment;
import android.util.Base64;

public class RakFinaclePDFFileOpener extends CordovaPlugin{
	String strFileName="";
	String path= "www/default/";
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {

		PluginResult.Status status = PluginResult.Status.OK;
		String result = "";

		try {
			if (action.equals("openFile")) {
				strFileName=args.getString(1);
				
				InputStream is = RakFinaclePDFFileOpener.this.cordova.getActivity().getApplicationContext().getAssets().open(path+strFileName);

	            int size = is.available();

	            byte[] buffer = new byte[size];

	            is.read(buffer);

	            is.close();
				
				File file=  saveAsPDF(buffer);
				
				if(!file.equals(null))
				openFile(file);
			}
			
			else {
				status = PluginResult.Status.INVALID_ACTION;
			}

			return true;
		
		}
		catch (Exception e) {
			status = PluginResult.Status.ERROR;
			return false;
			
		}

	}

	//save Pdf to the downloads folder
	private File saveAsPDF(byte[] data){
		try {
		//byte[] bytes = Base64.decode(data, Base64.DEFAULT);
		File dir=new File(Environment.getExternalStorageDirectory(),"/Download");
		
		File file = new File(dir,strFileName);

		OutputStream op;
		
			op = new FileOutputStream(file);
			op.write(data);
			op.flush();
			op.close();
			return file;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;

	}
	//open file in pdf reader
	private void openFile(File file) throws IOException {

		try {
			Intent intent = null;
				Intent target = new Intent(Intent.ACTION_VIEW);
				target.setDataAndType(Uri.fromFile(file),"application/pdf");
				target.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);

				intent = Intent.createChooser(target, "Open File");
				this.cordova.getActivity().startActivity(intent);
		} catch (Exception e) {
			e.printStackTrace();
		}
			
	}
}
