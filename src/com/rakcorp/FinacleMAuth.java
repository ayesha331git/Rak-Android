package com.rakcorp;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Base64;

import com.infosys.dynaCred.android.exception.OTPClientException;
import com.infosys.dynaCred.android.service.*;
import com.infosys.dynaCred.vo.LicenseVO;

public class FinacleMAuth extends CordovaPlugin{
	
	public static final String ACTION_LIST_ACTIVE = "active"; //1)Activation ---> active
	public static final String ACTION_LIST_LOGIN = "login";//2)Login ---> login 
	public static final String ACTION_LIST_CHANGE_MPIN = "change"; //3)Change Mpin ---> change
	public static final String ACTION_LIST_FORGOT_MPIN = "forgot"; //4)Forgot Mpin ---> forgot 
	public static final String ACTION_LIST_MANAGE = "manage"; //5)Manage Activate Devices ---> manage 
	//    public static final String ACTION_LIST_DEACTIVATE = "deActive";  //6)deActivate ---> deActive 
	public static final String ACTION_LIST_USEREXIST = "userExist"; //6)UserExistCheck ---> userExist 
	public static final String ACTION_LIST_DELETEUSER = "deleteUser"; //6)UserExistCheck ---> userExist 
	
	private IOTPManager iotpManager;
	private PluginResult result;
	private CallbackContext callbackContext;
	
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		
	    iotpManager = new OTPManagerImpl(this.cordova.getActivity().getApplicationContext());
	    this.callbackContext = callbackContext;
		try {
			JSONObject jsonObject=args.getJSONObject(0);
		
			if (action.equals(ACTION_LIST_ACTIVE)) { //WHEN ACTIVATE
				String strSeed=jsonObject.getString("seed");
//				byte[] bytesSeed = Base64.decode(strSeed, Base64.DEFAULT);
				
				mAuthActive( jsonObject.getString("clientID"), jsonObject.getString("userID"), strSeed, 
						jsonObject.getString("userOTP"), jsonObject.getString("userMPIN"));

			}else if (action.equals(ACTION_LIST_LOGIN)){ //WHEN LOGIN
				mAuthLogin(jsonObject.getString("userID"), jsonObject.getString("userMPIN"));
			}
			else if (action.equals(ACTION_LIST_USEREXIST)){ //WHEN USEREXIST
				mAuthExistingUserCheck(jsonObject.getString("userID"));
			}
			else if (action.equals(ACTION_LIST_DELETEUSER)){ //WHEN DELETEUSER
				mAuthDeleteUser(jsonObject.getString("userID"));
			}
			else if (action.equals(ACTION_LIST_CHANGE_MPIN)){ //WHEN change pin
				mAuthChangePIN(jsonObject.getString("userID"),jsonObject.getString("oldPin"),jsonObject.getString("newPin"));
			}
			else {
//				status = PluginResult.Status.INVALID_ACTION;
			}
			return true;
		}
		catch (Exception e) {
//			e.printStackTrace();
			return false;
		}
	}

	//mpin activation or forgot mpin
	void mAuthActive(String strClientID,String strUserID,String seed,String strOTP,String strMPIN ){
		Boolean isTokenSaved=false, isPinChanged=false, activationStatus = false;
		String strCapClientID="";
		byte[] seedInBytes = seed.getBytes();
		LicenseVO licenseVO = new LicenseVO();
		// RECEIVED FROM SERVER - License_ClientId, License_UserId, License_Seed
		licenseVO.setClientId(strClientID);
		licenseVO.setUserId(strUserID.toUpperCase().trim());
		licenseVO.setLicense(seedInBytes);

		try {
			//Checking User Is Activated
			if (iotpManager.isUserAlreadyPresent(strUserID.toUpperCase().trim())) {
				//Updating license
				isTokenSaved = iotpManager.updateLicense(licenseVO);
				System.out.println("license set for existing user");
			} else {
				//Saving new license
				isTokenSaved = iotpManager.saveToken(licenseVO);
				System.out.println("license set for new user");
			}  
		} catch (OTPClientException e) 
		{
			System.out.println("Exception in set license: " + e);
		}

		try {
			// SETTING MPIN: INPUT PARAMETER - License_UserId, smsotp, userEnteredMPIN
			isPinChanged = iotpManager.changePIN(strUserID.toUpperCase().trim(), strOTP, strMPIN);
			//RETRIEVING CLIENT_ID POST MPIN SET
			 strCapClientID = iotpManager.getClientId(strUserID.toUpperCase().trim());
			 System.out.println("clientid post set mpin set is: "+ strCapClientID);
		} catch (OTPClientException e) {
			System.out.println("Exception in set mpin: " + e);
		// MPIN IS NOT SET
		isPinChanged = false;
		}
		if (isPinChanged && isTokenSaved) {
			//ACTIVATION TRUE
			activationStatus = true;
		}else{
			//ACTIVATION FALSE
			activationStatus = false;
		}
		
//		 result = new PluginResult(PluginResult.Status.OK, activationStatus);
//		 result.setKeepCallback(true);
//		 this.callbackContext.sendPluginResult(result);
		
		JSONObject responseJSON = new JSONObject();
		try {
			responseJSON.put("clientID", strCapClientID);
			responseJSON.put("status", true);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			 LOG.d(FinacleMobileApp.LOG_TAG,"finacle auth json error");
		}
		
		this.callbackContext.success(responseJSON);
	}
	
	//mpin login
	void mAuthLogin(String strUserID,String strMPIN){
		
		String strClientId="";
		String strGeneratedOTP="";
		JSONObject responseJSON = new JSONObject();
		
		boolean status = iotpManager.isUserAlreadyPresent(strUserID.toUpperCase().trim());
		
	    if (status){
		try{
			strClientId = iotpManager.getClientId(strUserID.toUpperCase().trim());
			strGeneratedOTP = iotpManager.generateOTP(strUserID.toUpperCase().trim(), strMPIN);
			} catch (OTPClientException e) { 
				strGeneratedOTP="";
			} catch (Exception e) {
				strGeneratedOTP="";
				 LOG.d(FinacleMobileApp.LOG_TAG,"finacle auth client id failed");
				//e.printStackTrace();
			}
		}
	
		try {
			responseJSON.put("clientID", strClientId);
			responseJSON.put("otp", strGeneratedOTP);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
//			e.printStackTrace();
		}
		this.callbackContext.success(responseJSON);
	}
	
	//It will check whether a user exist or not
	void mAuthExistingUserCheck(String strUserID){
			boolean userStatus;
			String strClientId="";
			
			JSONObject responseJSON = new JSONObject();
						
			iotpManager = new OTPManagerImpl(this.cordova.getActivity().getApplicationContext());
			if (iotpManager.isUserAlreadyPresent(strUserID.toUpperCase().trim())){
				userStatus = true;	
				try{
					strClientId = iotpManager.getClientId(strUserID.toUpperCase().trim());
				} catch (Exception e) {
					 LOG.d(FinacleMobileApp.LOG_TAG,"finacle auth iotp failed");
				}
			}else{
				userStatus = false;
			}
			
			try {
				responseJSON.put("clientID", strClientId);
				responseJSON.put("status", userStatus);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
//				e.printStackTrace();
			}
			this.callbackContext.success(responseJSON);
	}
	
	//It will delete a user
	void mAuthDeleteUser(String strUserID){

//			boolean deleteUserStatus = false;;
//			iotpManager = new OTPManagerImpl(this.cordova.getActivity().getApplicationContext());
//			
//			try{
//				if (iotpManager.delete(strUserID.toUpperCase())){
//					deleteUserStatus = true;
//				}
//				else{
//					deleteUserStatus = false;
//				}	
//			}
//			catch(Exception e){
//				
//			}
//			
//			
//			result = new PluginResult(PluginResult.Status.OK, deleteUserStatus);
//			result.setKeepCallback(true);
//			this.callbackContext.sendPluginResult(result);
		}
	
	
	//It will MPIN of a user
		void mAuthChangePIN(String CorpId,String oldPin, String newPIN){
			String CLIENT_ID="";
			String CHANGE_MPIN_DONE="";
			boolean isPinChanged=false;
			try{
			iotpManager = new OTPManagerImpl(this.cordova.getActivity().getApplicationContext());
			// CHANGING MPIN: INPUT PARAMETER - CorpId, Old MPIN, Re-Confirm Change MPIN
			isPinChanged = iotpManager.changePIN(CorpId.toUpperCase(), oldPin,newPIN);
			//RETRIEVING CLIENT_ID POST CHANGE MPIN 
					CLIENT_ID = iotpManager.getClientId(CorpId.toUpperCase().trim());
					} catch (OTPClientException e){					
			// CHANGE MPIN IS NOT SET		
			isPinChanged = false;
			}
					if (isPinChanged) 
					CHANGE_MPIN_DONE = "TRUE";
					else 
					CHANGE_MPIN_DONE = "FALSE";
							// GENERATE LOGIN OTP WITH OLD MPIN 
			String CHANGE_MPIN_OTP = iotpManager.generateOTP(CorpId.toUpperCase().trim(), oldPin);
			JSONObject responseJSON = new JSONObject();
			try {
				responseJSON.put("clientID", CLIENT_ID);
				responseJSON.put("otp", CHANGE_MPIN_OTP);
				responseJSON.put("changeMPINDone", CHANGE_MPIN_DONE);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				 LOG.d(FinacleMobileApp.LOG_TAG,"finacle auth json failed");
			}
			
				this.callbackContext.success(responseJSON);
			}
}

