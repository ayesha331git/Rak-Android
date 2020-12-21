package com.rakcorp;

import android.Manifest;

import android.app.Activity;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.widget.Toast;

//to do root check for camera contacts location phone store

public class UserPermissionUtility {
	public static final int RECORD_PERMISSION_REQUEST_CODE = 1;
	public static final int EXTERNAL_STORAGE_PERMISSION_REQUEST_CODE = 2;
	public static final int CAMERA_PERMISSION_REQUEST_CODE = 3;
	public static final int CAMERA_PERMISSION_COUNT = 0;
	Activity activity;

	public UserPermissionUtility(Activity activity) {
		this.activity = activity;

	}
	public boolean checkPermissionForPhone() {
		int result = ContextCompat.checkSelfPermission(activity,
				Manifest.permission.CALL_PHONE);
		if (result == PackageManager.PERMISSION_GRANTED) {
			return true;
		} else {
			/*ActivityCompat.requestPermissions(activity, new String[] {
					Manifest.permission.CALL_PHONE,
					}, 200);*/
			requestPermissionForPhone();
			return false;
		}
	}
	public boolean checkPermissionForContacts() {
		int result = ContextCompat.checkSelfPermission(activity,
				Manifest.permission.READ_CONTACTS);
		if (result == PackageManager.PERMISSION_GRANTED) {
			return true;
		} else {
			ActivityCompat.requestPermissions(activity, new String[] {
					Manifest.permission.READ_CONTACTS,
					}, 200);
			return false;
		}
	}
	public boolean checkPermissionForLocation() {
		int[] permissionResult = new int[3];
		  permissionResult[0] = ContextCompat.checkSelfPermission(activity,
				Manifest.permission.ACCESS_COARSE_LOCATION);
		  permissionResult[1] = ContextCompat.checkSelfPermission(activity,
					Manifest.permission.ACCESS_FINE_LOCATION);
		  permissionResult[2] = ContextCompat.checkSelfPermission(activity,
					Manifest.permission.ACCESS_LOCATION_EXTRA_COMMANDS);
		  if (permissionResult[0] == PackageManager.PERMISSION_GRANTED&&permissionResult[1] == PackageManager.PERMISSION_GRANTED
				  &&permissionResult[2] == PackageManager.PERMISSION_GRANTED) {
				return true;
			} else {
				/*ActivityCompat.requestPermissions(activity, new String[] {
						Manifest.permission.ACCESS_COARSE_LOCATION,
						Manifest.permission.ACCESS_FINE_LOCATION,Manifest.permission.ACCESS_LOCATION_EXTRA_COMMANDS  }, 200);*/
				requestPermissionForLocation();
				return false;
			}
		
	}

	public boolean checkPermissionForExternalStorage() {
		 
		int[] permissionResult = new int[2];
		permissionResult[0]= ContextCompat.checkSelfPermission(activity,
				Manifest.permission.WRITE_EXTERNAL_STORAGE);
		permissionResult[1] = ContextCompat.checkSelfPermission(activity, Manifest.permission.READ_EXTERNAL_STORAGE);
		if (permissionResult[0] == PackageManager.PERMISSION_GRANTED&&permissionResult[1] == PackageManager.PERMISSION_GRANTED) {
			return true;
		} else {
			requestPermissionForStorage();
	/*		ActivityCompat.requestPermissions(activity, new String[] {
					Manifest.permission.WRITE_EXTERNAL_STORAGE,
					Manifest.permission.READ_EXTERNAL_STORAGE }, 200);*/
			return false;
		}
		
	}

	public boolean checkPermissionForCamera() {
		int[] permissionResult = new int[3];
		permissionResult[0] = ContextCompat.checkSelfPermission(activity,
				Manifest.permission.CAMERA);
		permissionResult[1] = ContextCompat.checkSelfPermission(activity,
				Manifest.permission.WRITE_EXTERNAL_STORAGE);
		permissionResult[2] = ContextCompat.checkSelfPermission(activity,
				Manifest.permission.READ_EXTERNAL_STORAGE);
		int count = 0;
		if (permissionResult[0] != PackageManager.PERMISSION_GRANTED
				&& (permissionResult[1] != PackageManager.PERMISSION_GRANTED || permissionResult[2] != PackageManager.PERMISSION_GRANTED)) {
			requestPermissionForCameraAndStorage();
		/*	ActivityCompat.requestPermissions(activity, new String[] {
					Manifest.permission.CAMERA,
					Manifest.permission.WRITE_EXTERNAL_STORAGE,
					Manifest.permission.READ_EXTERNAL_STORAGE }, 200);*/
			return false;
		} else if (permissionResult[0] != PackageManager.PERMISSION_GRANTED) {
			/*ActivityCompat.requestPermissions(activity,
					new String[] { Manifest.permission.CAMERA }, 200);*/
			requestPermissionForCamera();
			return false;
		} else if (permissionResult[1] != PackageManager.PERMISSION_GRANTED) {
			requestPermissionForStorage();
			/*ActivityCompat
					.requestPermissions(
							activity,
							new String[] { Manifest.permission.WRITE_EXTERNAL_STORAGE },
							200);*/
			return false;
		}

		return true;

	}

	 public void requestPermissionForCamera(){
	      
         Toast.makeText(activity, "Camera permission needed. Please allow in App Settings for additional functionality.", Toast.LENGTH_LONG).show();
      } 
	 public void requestPermissionForCameraAndStorage(){
	      
	         Toast.makeText(activity, "Camera and storage permission needed. Please allow in App Settings for additional functionality.", Toast.LENGTH_LONG).show();
	      } 
	 public void requestPermissionForStorage(){
	      
         Toast.makeText(activity, "Storage permission needed. Please allow in App Settings for additional functionality.", Toast.LENGTH_LONG).show();
      }
	 public void requestPermissionForLocation(){
	      
         Toast.makeText(activity, "Location permission needed. Please allow in App Settings for additional functionality.", Toast.LENGTH_LONG).show();
      } 
	 public void requestPermissionForContacts(){
	      
         Toast.makeText(activity, "Contact permission needed. Please allow in App Settings for additional functionality.", Toast.LENGTH_LONG).show();
      }
	 public void requestPermissionForPhone(){
	      
         Toast.makeText(activity, "Phone permission needed. Please allow in App Settings for additional functionality.", Toast.LENGTH_LONG).show();
      }
	  	/*public void requestPermissionForExternalStorage() {

		ActivityCompat.requestPermissions(activity,
				new String[] { Manifest.permission.WRITE_EXTERNAL_STORAGE },
				200);

	}

	public void requestPermissionForCamera() {
		ActivityCompat.requestPermissions(activity,
				new String[] { Manifest.permission.CAMERA },
				CAMERA_PERMISSION_REQUEST_CODE);
	}*/
}