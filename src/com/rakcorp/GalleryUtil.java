package com.rakcorp;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Random;

import android.os.Environment;
import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Log;
import android.widget.Toast;

public class GalleryUtil extends Activity{
	
	private final static int RESULT_SELECT_IMAGE = 100;
    public static final int MEDIA_TYPE_IMAGE = 1;
    private static final String TAG = "GalleryUtil";

    String mCurrentPhotoPath;
    File photoFile = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        try{

        	/*
        	Intent i = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
            i.putExtra(Intent.EXTRA_LOCAL_ONLY, true); // this is the flag that does the trick
            startActivityForResult(i, RESULT_SELECT_IMAGE); 
        	*/       
        	
        	//Pick Image From Gallery
        	Intent intent = new Intent(Intent.ACTION_PICK);
        	intent.setType("image/*"); // Show only images, no videos or anything else
        	intent.setAction(Intent.ACTION_GET_CONTENT);
        	// intent.putExtra(Intent.EXTRA_LOCAL_ONLY, true); //If you want only images local to device 
        	// Always show the chooser (if there are multiple options available)
        	startActivityForResult(Intent.createChooser(intent, "Select Picture"), RESULT_SELECT_IMAGE);
        }catch(Exception e){
        	 Log.d(FinacleMobileApp.LOG_TAG,"gallery util json failed");
        	 e.printStackTrace();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch(requestCode){
        case RESULT_SELECT_IMAGE:

        	if (resultCode == Activity.RESULT_OK && data != null && data.getData() != null) {
        		Cursor cursor = null;
        		try{
        			
        			/*
        			Uri selectedImage = data.getData();
        			String[] filePathColumn = {MediaStore.Images.Media.DATA };
        			cursor = getContentResolver().query(selectedImage, filePathColumn, null, null, null);
        			System.out.println("ISSUE-PHOTOS:cursor:"+cursor.toString());
        			cursor.moveToFirst();
        			int columnIndex = cursor.getColumnIndex(filePathColumn[0]);
        			System.out.println("ISSUE-PHOTOS:filePathColumn[0]:"+filePathColumn[0]);
        			String picturePath = cursor.getString(columnIndex);
        			Log.e("ISSUE-PHOTOS:GalleryUtil-","ISSUE-PHOTOS:picturePath:"+picturePath);

        			// Start Image Cropping issue : TOL#730904    JV babu
        			BitmapFactory.Options options = new BitmapFactory.Options();
        			options.inPreferredConfig = Bitmap.Config.ARGB_8888;
        			Bitmap bitmap = BitmapFactory.decodeFile(picturePath, options);
					*/
					Uri selectedImage = data.getData();
        			//System.out.println("ISSUE-PHOTOS:selectedImage:"+selectedImage);
                    InputStream imageStream = null;
                    try {
                        imageStream = getContentResolver().openInputStream(selectedImage);
                    } catch (FileNotFoundException e) {
                        e.printStackTrace();
                    }catch(Exception ex){
                    	ex.printStackTrace();
                    }
                    Bitmap bitmap = BitmapFactory.decodeStream(imageStream);
                    if(bitmap != null){
                    	String savedImagePatch = SaveImage(bitmap);
                    	System.out.println("ISSUE-PHOTOS:savedImagePatch:"+savedImagePatch);
                    	//Stop Image Cropping issue** : TOL#730904    JV babu

                    	//return Image Path to the Main Activity
                    	Intent returnFromGalleryIntent = new Intent();
                    	returnFromGalleryIntent.putExtra("picturePath",savedImagePatch); // TOL#730904    JV babu
                    	setResult(RESULT_OK,returnFromGalleryIntent);     
                    	finish();
                    }else{
                    	Toast.makeText(GalleryUtil.this, "You cannot use this image as Profile pic", Toast.LENGTH_SHORT).show();
                    	Log.d(FinacleMobileApp.LOG_TAG,"ISSUE-PHOTOS:Bitmap is NULL");
            			Intent returnFromGalleryIntent = new Intent();
            			setResult(RESULT_CANCELED, returnFromGalleryIntent);     
            			finish();   
                    }
        		}catch(Exception e){
        			Log.d(FinacleMobileApp.LOG_TAG,"ISSUE-PHOTOS:galery util resutt ok failed");
        			Intent returnFromGalleryIntent = new Intent();
        			setResult(RESULT_CANCELED, returnFromGalleryIntent);     
        			finish();   
        		}
        		finally{
        			if(cursor != null){
        				cursor.close();
        			}
        		}
        	}else{
        		Log.i(TAG,"RESULT_CANCELED");     
                Intent returnFromGalleryIntent = new Intent();
                setResult(RESULT_CANCELED, returnFromGalleryIntent);     
                finish();
            }
            break;
			default:
				break;
        }
    }

    /*Start**Image Cropping issue** : TOL#730904 JV babu*/
    private String SaveImage(Bitmap finalBitmap) {
    	
        String root = Environment.getExternalStorageDirectory().toString();
        File myDir = new File(root + "/Pictures");
        myDir.mkdirs();
        Random generator = new Random();
        int n = 1000000;
        n = generator.nextInt(n);
        String fname = "IMG_"+ n +".jpg";
        File file = new File (myDir, fname);
        if (file.exists ()) file.delete ();
        try {
            FileOutputStream out = new FileOutputStream(file);
            finalBitmap.compress(Bitmap.CompressFormat.JPEG, 90, out);

            out.flush();
            out.close();
      
        } catch (Exception e) {
            e.printStackTrace();
        }
        return Environment.getExternalStorageDirectory()+File.separator +"Pictures"+File.separator+fname;
    }
/*Stop**Image Cropping issue** : TOL#730904    JV babu*/
}
