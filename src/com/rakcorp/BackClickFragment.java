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


public class BackClickFragment extends android.support.v4.app.Fragment
        implements SurfaceHolder.Callback, Camera.ShutterCallback, Camera.PictureCallback{


	ImageView mImage;
	public static Camera mCamera;
	SurfaceView mPreview;
	boolean isBackImageVisible = false;
	CaptureCheckImageActivity mActivity = null;
	Button mTakeSnap = null;

	@Override
	public View onCreateView(LayoutInflater inflater, ViewGroup container,
			Bundle savedInstanceState) {

        View rootView = inflater.inflate(R.layout.fragment_capture_check_back, container, false);
		mPreview = (SurfaceView) rootView.findViewById(R.id.preview);
		mImage = (ImageView) rootView.findViewById(R.id.backImage);
		mTakeSnap = (Button) rootView.findViewById(R.id.backSnap);

		mImage.setVisibility(View.GONE);
		mPreview.getHolder().addCallback(this);
		mActivity = (CaptureCheckImageActivity) getActivity();
		mPreview.getHolder().setType(SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);
       mActivity.mConfirmBackSnap=(Button)rootView.findViewById(R.id.confirmBackSnap);

       mActivity.setAlpha(mActivity.DISABLE_CONFIRM_BUTTON, mActivity.mConfirmBackSnap);


		try {
			if(FrontClickFragment.mCamera!=null)
			{
				FrontClickFragment.mCamera.release();
				
			}
			mCamera = Camera.open();
		} catch (Exception e) {
			mCamera.release();
			LOG.d(FinacleMobileApp.LOG_TAG, "camera not opened");
		}
		mPreview.setVisibility(View.INVISIBLE);
		// onSnapClick.setOnClickListener(new View.OnClickListener() {
		// @Override
		// public void onClick(View view) {
		// mCamera.takePicture(this, null, null, this);
		// }
		// });
		return rootView;
	}

	public void createPreview() {

	}

	@Override
	public void onStart() {
		// TODO Auto-generated method stub
		super.onStart();
		try {
			mCamera.startPreview();
		} catch (Exception e) {
			LOG.d(FinacleMobileApp.LOG_TAG, "camera start preview failed");
		}

	}

	@Override
	public void onPause() {
		super.onPause();

		try {
			mCamera.stopPreview();
		} catch (Exception e) {
			LOG.d(FinacleMobileApp.LOG_TAG, "camera stop preview failed");
		}
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		try {
			mCamera.release();
		} catch (Exception e) {
			LOG.d(FinacleMobileApp.LOG_TAG, "camera release failed");
		}
	}

	// cancel button
	public void onCancel() {
		mImage.setVisibility(View.GONE);
		mImage.setImageResource(0);
		mImage.setImageBitmap(null);
		mImage.destroyDrawingCache();
		isBackImageVisible = false;
		// mTakeSnap.setVisibility(View.VISIBLE);
		// setAlpha(64, mConfirmSnap);
        mActivity.setAlpha(mActivity.DISABLE_CONFIRM_BUTTON, mActivity.mConfirmBackSnap);

        mTakeSnap.setBackground(mActivity.getResources().getDrawable(R.drawable.capture));
		mActivity.switchCamera(false);
		mPreview.setVisibility(View.VISIBLE);

	}

	public void onSnap() {
		mCamera.takePicture(this, null, null, this);

	}

	@Override
	public void onShutter() {
		// Toast.makeText(this, "Click!", Toast.LENGTH_SHORT).show();
	}

	@Override
	public void onPictureTaken(byte[] data, Camera camera) {

		mCamera.stopPreview();
		mCamera.release();
		isBackImageVisible = true;
		mPreview.setVisibility(View.GONE);
        mTakeSnap.setBackground(mActivity.getResources().getDrawable(R.drawable.retake));

        mActivity.setAlpha(mActivity.ENABLE_CONFIRM_BUTTON, mActivity.mConfirmBackSnap);
		mImage.setVisibility(View.VISIBLE);
        if(ForegroundCameraLauncher.backImageByteArray!=null){
        	ForegroundCameraLauncher.backImageByteArray=null;
        }
		Bitmap bmp = null;
		try {
			// start
			BitmapFactory.Options options = new BitmapFactory.Options();// Create object of bitmapfactory's option method for further option use
			options.inPurgeable = true;
			options.inSampleSize = 4;
			bmp = BitmapFactory.decodeByteArray(data, 0, data.length, options);
			ByteArrayOutputStream baos = new ByteArrayOutputStream();
			bmp.compress(Bitmap.CompressFormat.JPEG, 30, baos);
			data = baos.toByteArray();
			ForegroundCameraLauncher.backImageBase64=Base64.encodeToString(data, Base64.DEFAULT);
		} catch (Exception e) {
			// TODO: handle exception
		}

		// end

		// ForegroundCameraLauncher.backImageByteArray=data;
		mImage.setImageBitmap(bmp);
	}

	@Override
    public void surfaceChanged(SurfaceHolder holder, int format, int width, int height) {
		try {
            Camera.Parameters params = mCamera.getParameters();

            params.getSupportedPreviewSizes();
            

            params.setPictureFormat(PixelFormat.JPEG); 

            params.getSupportedPictureFormats();
            params.getSupportedPictureSizes();

            params.setFocusMode("continuous-picture");
            mCamera.setParameters(params);


            mCamera.startPreview();
        } catch (Exception e) {
			LOG.d(FinacleMobileApp.LOG_TAG, "camera surfaceChanged failed");
		}
	}

	// //set alpha to make the tick image button semi transparent
	// Button setAlpha(int alphaValue,Button button){
	//
	// button.getBackground().setAlpha(alphaValue);
	// return button;
	//
	// }
	@Override
	public void surfaceCreated(SurfaceHolder holder) {
		try {
			mCamera.setPreviewDisplay(mPreview.getHolder());
		} catch (Exception e) {
			LOG.d(FinacleMobileApp.LOG_TAG, "camera surfaceCreated failed");
		}
	}

	@Override
	public void surfaceDestroyed(SurfaceHolder holder) {
		// Log.i("PREVIEW","surfaceDestroyed");
	}

	// create a Toast
	public void createToast(String strMessage) {
		Toast.makeText(mActivity, strMessage, Toast.LENGTH_LONG);

	}

}
