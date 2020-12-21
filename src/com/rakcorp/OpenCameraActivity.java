package com.rakcorp;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.net.URLEncoder;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.util.Base64;
import android.util.Log;
import android.view.Window;
import android.widget.ImageView;
import android.widget.Toast;

public class OpenCameraActivity extends Activity {
	final int CAMERA_CAPTURE = 1;
	final int CROP_PIC = 2;

	ImageView iv_profilepic;

	LanguageUtility languageUtility;

	private File newFile;
	private Uri contentUri;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		languageUtility= new LanguageUtility(this,ProfilePicUpdate.locale);
		getWindow().requestFeature(Window.FEATURE_ACTION_BAR);
		getActionBar().hide();
		setContentView(R.layout.activity_camera);

		iv_profilepic = (ImageView) findViewById(R.id.iv_click);


		//         Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
		//         File file = new File(Environment.getExternalStorageDirectory()+File.separator + "img.jpg");
		//         intent.putExtra(MediaStore.EXTRA_OUTPUT, Uri.fromFile(file));
		//         startActivityForResult(intent, 1);

		newFile = new File(Environment.getExternalStorageDirectory()+File.separator + "img.jpg");
		try {
			Intent intent = new Intent("android.media.action.IMAGE_CAPTURE");
			if (Build.VERSION.SDK_INT >= 24) {
				intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
				//intent.setFlags(Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
				contentUri = FileProvider.getUriForFile(this.getApplicationContext(), getPackageName()+".provider" , newFile);
				intent.putExtra(MediaStore.EXTRA_OUTPUT, contentUri);
				Log.d("Camera-contentUri", contentUri.toString());
			} else {
				contentUri = Uri.fromFile(newFile);
				intent.putExtra(MediaStore.EXTRA_OUTPUT, contentUri);
			}
			startActivityForResult(intent, CAMERA_CAPTURE);

		} catch (ActivityNotFoundException anfe) {
			Toast.makeText(this.getApplicationContext(), "No activity found to open this Camera.", Toast.LENGTH_LONG).show();
		}catch(Exception e){
			e.printStackTrace();
		}
	}

	@Override
	public void onBackPressed() {
		super.onBackPressed();
		finish();
	}

	protected void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);

		if(requestCode== CAMERA_CAPTURE && resultCode==RESULT_OK)
		{
			try {
				cropCapturedImage(contentUri);
			}
			catch(ActivityNotFoundException aNFE){
				Toast.makeText(this, languageUtility.getProperty("APP.PLUGIN_ALL.Sorry_your_device_doesnt_support_the_crop_action"), Toast.LENGTH_SHORT).show();
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		else if(requestCode == CROP_PIC &&resultCode==RESULT_OK)
		{
			Bitmap thePic = null;

			JSONObject encBase64Image = new JSONObject();
			try {
				encBase64Image.put("errorMessage", languageUtility.getProperty("APP.PLUGIN_ALL.Camera_Error"));
			} catch (JSONException e1) {
				Log.d(FinacleMobileApp.LOG_TAG,"open camera json failed");
			}
			if(data!=null)
			{
				try {
					thePic = BitmapFactory.decodeStream(getContentResolver().openInputStream(contentUri));
				} catch (FileNotFoundException e1) {
					Log.d(FinacleMobileApp.LOG_TAG,"open camera pic not found ");
				}
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				thePic.compress(Bitmap.CompressFormat.JPEG, 100, baos);
				byte[] barr = baos.toByteArray();

				try
				{
					String CameraImageBase64 = Base64.encodeToString(barr, Base64.DEFAULT);
					String EncodedString = URLEncoder.encode(CameraImageBase64,"UTF-8");
					Log.e("LOOKbase64", "" +  CameraImageBase64.toString());
					Log.e("LOOK","" + EncodedString.toString());
					iv_profilepic.setImageBitmap(thePic);

					if(EncodedString.getBytes().length > Integer.parseInt(ProfilePicUpdate.maxSize))
					{
						encBase64Image.put("errorMessage", languageUtility.getProperty("APP.PLUGIN_ALL.Image_Size_Greater")+" "+ProfilePicUpdate.maxSize);
						ProfilePicUpdate.profile_callbackContext.error(encBase64Image);
					}
					else if(EncodedString.getBytes().length < Integer.parseInt(ProfilePicUpdate.minSize))
					{
						encBase64Image.put("errorMessage", languageUtility.getProperty("APP.PLUGIN_ALL.Image_Size_Less")+" "+ProfilePicUpdate.minSize);
						ProfilePicUpdate.profile_callbackContext.error(encBase64Image);
					}
					else
					{
						encBase64Image.put("message", "success");
						encBase64Image.put("image", EncodedString);
						encBase64Image.put("content_type", "image/JPG");
						ProfilePicUpdate.profile_callbackContext.success(encBase64Image);
					}
				}
				catch(Exception e)
				{
					e.printStackTrace();
					ProfilePicUpdate.profile_callbackContext.error(encBase64Image);
				}
			}
			else
			{
				ProfilePicUpdate.profile_callbackContext.error(encBase64Image);
			}
			this.finish();
		}
		else
		{
			this.finish();
		}
	}

	public void cropCapturedImage(Uri picUri){
		try{
			Log.d("cropCapturedImage", "picUri");
			Log.d("cropCapturedImage", "picUri:"+picUri.toString());
			//call the standard crop action intent
			Intent cropIntent = new Intent("com.android.camera.action.CROP");
			//indicate image type and Uri of image
			cropIntent.setDataAndType(contentUri, "image/*");
			//set crop properties
			cropIntent.putExtra("crop", "true");
			//indicate aspect of desired crop
			cropIntent.putExtra("aspectX", 1);
			cropIntent.putExtra("aspectY", 1);
			//indicate output X and Y
			cropIntent.putExtra("outputX", 256);
			cropIntent.putExtra("outputY", 256);
			//retrieve data on return
			cropIntent.putExtra("return-data", false);
			cropIntent.putExtra(MediaStore.EXTRA_OUTPUT, contentUri);

			List<ResolveInfo> resInfoList = getPackageManager().queryIntentActivities(cropIntent, PackageManager.MATCH_DEFAULT_ONLY);
			Log.d("cropCapturedImage- packageName", "packageNames:"+resInfoList.size());
	        for (ResolveInfo resolveInfo : resInfoList) {
	            String packageName = resolveInfo.activityInfo.packageName;
	            Log.d("cropCapturedImage- packageName", "packageName:"+packageName);
	            grantUriPermission(packageName, picUri, Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
	        }

			//start the activity - we handle returning in onActivityResult
			startActivityForResult(cropIntent, CROP_PIC );
		}
		// respond to users whose devices do not support the crop action
		catch (ActivityNotFoundException anfe) {
			// display an error message
			String errorMessage = languageUtility.getProperty("APP.PLUGIN_ALL.Your_device_doesnt_support_the_crop_action");
			Toast toast = Toast.makeText(this, errorMessage, Toast.LENGTH_SHORT);
			toast.show();
		}catch(Exception e){
			e.printStackTrace();
			Toast.makeText(this, "error :"+e.getMessage(), Toast.LENGTH_SHORT).show();
		}
	}
}
