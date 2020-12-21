package com.rakcorp;

import java.io.ByteArrayOutputStream;
import java.util.List;

import org.apache.cordova.LOG;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.PixelFormat;
import android.hardware.Camera;
import android.os.Bundle;
import android.util.Base64;
import android.view.LayoutInflater;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;


/**
 * Created by rahulc on 16/02/15.
 */
public class FrontClickFragment extends android.support.v4.app.Fragment implements SurfaceHolder.Callback, Camera.ShutterCallback, Camera.PictureCallback {


   public static Camera mCamera;
    SurfaceView mPreview;
    ImageView mImage;
    CaptureCheckImageActivity mActivity = null;
    boolean isFrontImageVisible=false;
    Button mTakeSnap=null;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.fragment_capture_check_image, container, false);

        mPreview = (SurfaceView) rootView.findViewById(R.id.preview);
        mImage = (ImageView) rootView.findViewById(R.id.image);
        mTakeSnap=(Button)rootView.findViewById(R.id.frontSnap);
//        mConfirmSnap=(Button)rootView.findViewById(R.id.confirmFrontSnap);
//        mConfirmSnap.getBackground().setAlpha(64); 
//        setAlpha(64, mConfirmSnap);
        mImage.setVisibility(View.GONE);
        mPreview.getHolder().addCallback(this);
        mActivity = (CaptureCheckImageActivity) getActivity();
        mPreview.getHolder().setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
        mActivity.mConfirmFrontSnap=(Button)rootView.findViewById(R.id.confirmFrontSnap);
        mActivity.setAlpha(mActivity.DISABLE_CONFIRM_BUTTON, mActivity.mConfirmFrontSnap);
     

//        Button onSnapClick = (Button) rootView.findViewById(R.id.snap);

      try {
    	  if(BackClickFragment.mCamera!=null)
			{
    		  BackClickFragment.mCamera.release();
				
			}
      mCamera = Camera.open();
  } catch (Exception e) {
	  LOG.d(FinacleMobileApp.LOG_TAG,"front click camera open failed.");
  }
     
        return rootView;
    }
    @Override
	public void onStart() {
		// TODO Auto-generated method stub
		super.onStart();
		try {
            mCamera.startPreview();
        } catch (Exception e) {
        	LOG.d(FinacleMobileApp.LOG_TAG,"front click camera startPreview failed.");
        }
		
	}

    @Override
    public void onPause() {
        super.onPause();
        try {
            mCamera.stopPreview();
        } catch (Exception e) {
        	 LOG.d(FinacleMobileApp.LOG_TAG,"front click camera stopPreview failed.");
        }
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        try {
            mCamera.release();
        } catch (Exception e) {
        	 LOG.d(FinacleMobileApp.LOG_TAG,"front click camera release failed.");
        }

    }

    //create a Toast
    public void createToast(String strMessage){
        Toast.makeText(mActivity, strMessage, Toast.LENGTH_LONG);

    }

    //cancel button
    public void onCancel() {
        mImage.setVisibility(View.GONE);
        mImage.setImageResource(0);
  mImage.setImageBitmap(null);
        mImage.destroyDrawingCache();

        isFrontImageVisible=false;
//        mTakeSnap.setVisibility(View.VISIBLE);
//        setAlpha(64, mConfirmSnap);
        mActivity.setAlpha(mActivity.DISABLE_CONFIRM_BUTTON, mActivity.mConfirmFrontSnap);
        
        
//        mTakeSnap.setText("Snap Photo ");
        mTakeSnap.setBackground(mActivity.getResources().getDrawable(R.drawable.capture));

        mActivity.switchCamera(true);
//        mPreview.setVisibility(View.VISIBLE);
    }

    //click snap button
    public void onSnap() {
        mCamera.takePicture(this, null, null, this);

    }

    @Override
    public void onShutter() {
//        Toast.makeText(this, "Click!", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onPictureTaken(byte[] data, Camera camera) {
        //Here, we chose internal storage
//        try {
//            FileOutputStream out = mActivity.openFileOutput("picture.jpg", Activity.MODE_PRIVATE);
//
//            out.write(data);
//            out.flush();
//            out.close();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        camera.stopPreview();
        mCamera.stopPreview();
        mCamera.release();
        isFrontImageVisible=true;
//        mTakeSnap.setVisibility(View.GONE);
//        mTakeSnap.setText("Retake");
        mTakeSnap.setBackground(mActivity.getResources().getDrawable(R.drawable.retake));
//        setAlpha(250, mConfirmSnap);
        mActivity.setAlpha(mActivity.ENABLE_CONFIRM_BUTTON, mActivity.mConfirmFrontSnap);
        mPreview.setVisibility(View.GONE);
        mImage.setVisibility(View.VISIBLE);
        if(ForegroundCameraLauncher.frontImageByteArray!=null)
        	ForegroundCameraLauncher.frontImageByteArray=null;
        
        //start
        Bitmap bmp=null; 
        try {
        BitmapFactory.Options options=new BitmapFactory.Options();// Create object of bitmapfactory's option method for further option use
        options.inPurgeable = true; 
 	options.inSampleSize = 4;
         bmp = BitmapFactory.decodeByteArray(data, 0, data.length,options); 
//        Bitmap bmp = BitmapFactory.decodeByteArray(data, 0, data.length); 
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.JPEG, 30, baos);
        data = baos.toByteArray();
        ForegroundCameraLauncher.frontImageBase64=Base64.encodeToString(data, Base64.DEFAULT);
    	} catch (Exception e) {
			// TODO: handle exception
		}
        //end
        //ForegroundCameraLauncher.frontImageByteArray=data;
        
        mImage.setImageBitmap(bmp);

    }

    @Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
        try {
            Camera.Parameters params = mCamera.getParameters();
            //List<Camera.Size> sizes = params.getSupportedPreviewSizes();
            //Camera.Size selected = sizes.get(sizes.size() - 1);
//            params.setPreviewSize(1600, 1200);
            params.getSupportedPreviewSizes();
            
            //start
            //Camera.Parameters parameters = mCamera.getParameters(); 
            params.setPictureFormat(PixelFormat.JPEG); 
            params.setPictureSize(1600, 1200);
            params.getSupportedPictureFormats();
            params.getSupportedPictureSizes();
            params.setJpegQuality(100); 
            // 100% parameters.setFocusMode(Camera.Parameters.FOCUS_MODE_AUTO);
            //end
            params.setFocusMode("continuous-picture");
//            params.setFocusMode();
            mCamera.setParameters(params);
          


            mCamera.startPreview();
        } catch (Exception e) {
        	 LOG.d(FinacleMobileApp.LOG_TAG,"front click startPreview failed");
        }
    }

//    //set alpha to make the tick image button semi transparent
//    Button setAlpha(int alphaValue,Button button){
//    	
//    	button.getBackground().setAlpha(alphaValue);
//    	return button;
//    	
//    }
    @Override
    public void surfaceCreated(SurfaceHolder holder) {
        try {
            mCamera.setPreviewDisplay(mPreview.getHolder());
        } catch (Exception e) {
        	 LOG.d(FinacleMobileApp.LOG_TAG,"front click camera surfaceCreated failed.");
        }
    }

    @Override
    public void surfaceDestroyed(SurfaceHolder holder) {
//        Log.i("PREVIEW","surfaceDestroyed");
    }
}
