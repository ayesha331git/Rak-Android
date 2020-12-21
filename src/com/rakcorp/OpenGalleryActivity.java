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
import android.content.ContentResolver;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.util.Base64;
import android.util.Log;
import android.webkit.MimeTypeMap;
import android.widget.ImageView;
import android.widget.Toast;

public class OpenGalleryActivity extends Activity {
	private final int GALLERY_ACTIVITY_CODE = 200;
	private final int RESULT_CROP = 400;

	ImageView imageView1;

	LanguageUtility languageUtility;
	public static String GalleryImageBase64 = null;
	public static String EncodedString;
	public JSONObject encBase64Image = new JSONObject();
	private Uri contentUri;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		languageUtility = new LanguageUtility(this, ProfilePicGallery.locale);
		setContentView(R.layout.activity_gallery);
		imageView1 = (ImageView) findViewById(R.id.iv_image);

		// Start Activity To Select Image From Gallery
		Intent gallery_Intent = new Intent(getApplicationContext(),GalleryUtil.class);
		gallery_Intent.putExtras(gallery_Intent);
		startActivityForResult(gallery_Intent, GALLERY_ACTIVITY_CODE);
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		super.onActivityResult(requestCode, resultCode, data);
		if (requestCode == GALLERY_ACTIVITY_CODE) {
			if (resultCode == Activity.RESULT_OK && resultCode == Activity.RESULT_OK && data != null) {
				File f = new File(data.getStringExtra("picturePath"));

				if (Build.VERSION.SDK_INT >= 24) {
					contentUri = FileProvider.getUriForFile(this.getApplicationContext(), getPackageName()+".provider" , f);
				} else {
					contentUri = Uri.fromFile(f);
				}

				String extension;
				// perform Crop on the Image Selected from Gallery
				if (contentUri.getScheme().equals(ContentResolver.SCHEME_CONTENT)) {
					// If scheme is a content
					final MimeTypeMap mime = MimeTypeMap.getSingleton();
					extension = mime.getExtensionFromMimeType(getApplicationContext().getContentResolver().getType(contentUri));
				} else {
					// If scheme is a File
					// This will replace white spaces with %20 and also other
					// special characters. This will avoid returning null values
					// on file name with spaces and special characters.
					extension = MimeTypeMap.getFileExtensionFromUrl(contentUri.toString());
				}

				if(ProfilePicGallery.formats.toLowerCase().contains(extension.toLowerCase()))
				{
					try {
						performCrop(contentUri);
					}
					catch(ActivityNotFoundException aNFE){
						Log.d(FinacleMobileApp.LOG_TAG,languageUtility.getProperty("APP.PLUGIN_ALL.Sorry_your_device_doesnt_support_the_crop_action"));
						Toast.makeText(this, languageUtility.getProperty("APP.PLUGIN_ALL.Sorry_your_device_doesnt_support_the_crop_action"), Toast.
								LENGTH_SHORT).show();
					}catch(Exception e){
						e.printStackTrace();
					}
				}
				else
				{
					try {
						encBase64Image.put("errorMessage",languageUtility.getProperty("APP.PLUGIN_ALL.Image_Format_Error"));
					} catch (JSONException e) {
						Log.d(FinacleMobileApp.LOG_TAG,"open gallery json failed");
					}
					ProfilePicGallery.gallery_callbackContext.error(encBase64Image);
					this.finish();
				}
			}
			else
			{
				this.finish();
			}
		}
		else if (requestCode == RESULT_CROP && resultCode == Activity.RESULT_OK && data != null) {
			Bitmap bp = null;
			try {
				bp = BitmapFactory.decodeStream(getContentResolver().openInputStream(contentUri));
			} catch (FileNotFoundException e1) {
				Log.d(FinacleMobileApp.LOG_TAG,"open gallery bitmap decode failed");
			}

			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			try {
				if (ProfilePicGallery.formats.contains("JPEG")||ProfilePicGallery.formats.contains("JPG")) {
					bp.compress(Bitmap.CompressFormat.JPEG, 100, baos);

					encBase64Image.put("content_type", "image/JPG");

				} else if (ProfilePicGallery.formats.contains("PNG")) {
					bp.compress(Bitmap.CompressFormat.PNG, 100, baos);
					encBase64Image.put("content_type", "image/PNG");
				} else {
					ProfilePicGallery.gallery_callbackContext.error(encBase64Image);
				}

				byte[] barr = baos.toByteArray();
				GalleryImageBase64 = Base64.encodeToString(barr, Base64.DEFAULT);
				EncodedString = URLEncoder.encode(GalleryImageBase64, "UTF-8");
				imageView1.setImageBitmap(bp);

				encBase64Image.put("errorMessage", languageUtility.getProperty("APP.PLUGIN_ALL.Camera_Error"));
				if (EncodedString.getBytes().length > Integer.parseInt(ProfilePicGallery.maxSize)) {
					encBase64Image.put("errorMessage",languageUtility.getProperty("APP.PLUGIN_ALL.Image_Size_Greater")+ " " + ProfilePicGallery.maxSize);
					ProfilePicGallery.gallery_callbackContext.error(encBase64Image);
					this.finish();
				} else if (EncodedString.getBytes().length < Integer.parseInt(ProfilePicGallery.minSize)) {
					encBase64Image.put("errorMessage",languageUtility.getProperty("APP.PLUGIN_ALL.Image_Size_Less")+ " " + ProfilePicGallery.minSize);
					ProfilePicGallery.gallery_callbackContext.error(encBase64Image);
					this.finish();
				} else {
					encBase64Image.put("message", "success");
					encBase64Image.put("image", EncodedString);
					ProfilePicGallery.gallery_callbackContext.success(encBase64Image);

					this.finish();
				}
			} catch (Exception e) {
				ProfilePicGallery.gallery_callbackContext.error(encBase64Image);
				this.finish();
				Log.d(FinacleMobileApp.LOG_TAG,"open gallery  error json failed");
			}
		}
		else
		{
			this.finish();
		}
	}

	private void performCrop(Uri picUri) {
		// Start Crop Activity
		Intent cropIntent = new Intent("com.android.camera.action.CROP");
		// indicate image type and Uri
		cropIntent.setDataAndType(picUri, "image/*");
		// set crop properties
		cropIntent.putExtra("outputX", 256);
		cropIntent.putExtra("outputY", 256);
		cropIntent.putExtra("aspectX", 1);
		cropIntent.putExtra("aspectY", 1);
		cropIntent.putExtra("scale", true);
		cropIntent.putExtra("noFaceDetection", true);
		cropIntent.putExtra("return-data", false);
		cropIntent.putExtra(MediaStore.EXTRA_OUTPUT, picUri);

		List<ResolveInfo> resInfoList = getPackageManager().queryIntentActivities(cropIntent, PackageManager.MATCH_DEFAULT_ONLY);
		Log.d("cropCapturedImage- packageName", "packageNames:"+resInfoList.size());
		for (ResolveInfo resolveInfo : resInfoList) {
			String packageName = resolveInfo.activityInfo.packageName;
			Log.d("cropCapturedImage- packageName", "packageName:"+packageName);
			grantUriPermission(packageName, picUri, Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_READ_URI_PERMISSION);
		}

		// start the activity - we handle returning in onActivityResult
		startActivityForResult(cropIntent, RESULT_CROP);
	}

}