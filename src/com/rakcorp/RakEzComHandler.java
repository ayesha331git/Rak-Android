package com.rakcorp;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.StreamCorruptedException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.LinkedHashMap;

import org.json.JSONException;
import org.json.JSONObject;

import com.ezmcom.sdk.eztoken.EzAccount;
import com.ezmcom.sdk.eztoken.EzTokenSDK;
import com.ezmcom.sdk.eztoken.exception.EzException;
import com.worklight.androidgap.api.WL;
import com.worklight.common.security.WLDeviceAuthManager;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Base64;
import android.util.Log;

import java.util.logging.Level;
import java.util.logging.Logger;

public class RakEzComHandler{

	
	 public static EzAccount ezObj = null;
	 public static EzAccount ezObjCorp = null;
	 
	 private static String refString=null;
	 private static String keyIn=null;
	 private static AssetManager mngr =null;
	 public static RakEzComHandler newObj = null;
	 public static String defaultTokenPinLength = "4";
	 private static final Logger log = Logger.getLogger(Class.class.getName());
	private static String pushId = null;
	 
	 private static final String CORP_BUILD="CORP";
	 private static final String RET_BUILD="RET";

	 static Context rakContext;
		
	 
	 public RakEzComHandler(Context myContext) {
		    mngr = myContext.getAssets();
		    rakContext = myContext;

		 getPushID();
		   
		}
	 
	 public static void throwErrorResponse() {
			
			JSONObject returnJSON = new JSONObject();
			try {
				returnJSON.put("errorReason", "Unable to process your request");
			} catch (JSONException e) {
				log.log(Level.SEVERE, "JSON Exception", e);
			}
			WL.getInstance().sendActionToJS("displayError", returnJSON);
		}
	
	public static JSONObject processActivationQRString(String activationString,String deviceId,String appId, String pinLength,String buildType) throws UnsupportedEncodingException
	{
		
		InputStream inputCert =null;
		
		try {
			  
			inputCert = mngr.open("ezm.cer");
			
			//activation: pass in the base64 encodedstring obtained from scanning a qr code.
			//String data = EzTokenSDK.processActivationString(appId+"."+deviceId,activationString,inputCert);
			String data = EzTokenSDK.processActivationString(appId+"."+getPushID(),activationString,inputCert);
			inputCert.close();
			JSONObject jsonObj=new JSONObject();
			jsonObj.put("encodedResponse", URLEncoder.encode(data,"UTF-8"));
			if(null!=pinLength && !"".equalsIgnoreCase(pinLength))
			{
				FinacleMobileApp.prefs.edit().putString("tokenPinLength"+buildType, pinLength).commit();
			}
			else
			{
				FinacleMobileApp.prefs.edit().putString("tokenPinLength"+buildType, defaultTokenPinLength).commit();
			}
			
			return jsonObj;
			
		} 
		catch (IOException e) {
			inputCert=null;
			log.log(Level.SEVERE, "IO Exception", e);
			throwErrorResponse();
			
		}
		catch (EzException e) {
			inputCert=null;
			log.log(Level.SEVERE, "EZCom Exception", e);
			throwErrorResponse();
			
		} catch (JSONException e) {
			log.log(Level.SEVERE, "JSON Exception", e);
			throwErrorResponse();
		}
		inputCert=null;
		return null;
	}
	
	
	public static JSONObject getActivateTSNMethod(String activationJSONString, String buildType) throws UnsupportedEncodingException, JSONException
	{
		try {
			
			//activation: pass in the base64 encodedstring obtained from scanning a qr code.
			String tsn = EzTokenSDK.getActivationTSN(activationJSONString);
			
			if(buildType.equalsIgnoreCase(RET_BUILD))
			{	
				ezObj=EzTokenSDK.getEzTokenAccount(tsn);
			}
			else
			{	
				ezObjCorp = EzTokenSDK.getEzTokenAccount(tsn);
			}
			
			
			JSONObject jsonObj=new JSONObject();
			jsonObj.put("isEzComAccountCreated", true);
			return jsonObj;
		
							
		} catch (EzException e) {
			log.log(Level.SEVERE, "EZCOM Exception", e);
			throwErrorResponse();
		}
		return null;
	}
	
	public static JSONObject setEzAccountPinMethod(String pinStr, String buildType) throws UnsupportedEncodingException, JSONException
	{
		try {
			
			EzAccount ezA = EzTokenSDK.setEzAccountPIN(getLocalEzAccount(buildType), pinStr);
			saveEzObject(ezA,buildType);
			
			JSONObject jsonObj=new JSONObject();
			jsonObj.put("isEzmComAccountSaved", true);
			
			return jsonObj;
			
							
		} catch (EzException e) {
			log.log(Level.SEVERE, "EZCOM Exception", e);
			throwErrorResponse();
		}
		return null;
	}
	
	private  static void saveEzObject(EzAccount ezAccount,String buildType) 
	{
		byte[] accountBytes = null;
		

		try {

			ByteArrayOutputStream baOut = new ByteArrayOutputStream();
			ObjectOutputStream objOut = new ObjectOutputStream(baOut);
			
			if(buildType.equalsIgnoreCase(RET_BUILD))
				 ezObj=ezAccount;
			else
				ezObjCorp = ezAccount;
			
			
           
			objOut.writeObject(ezAccount);
			objOut.flush();
			accountBytes = baOut.toByteArray();
			baOut.close();
			objOut.close();
			String accountBytesAsString = Base64.encodeToString(accountBytes, Base64.DEFAULT);
			FinacleMobileApp.prefs.edit().putString("ezAccount"+buildType, accountBytesAsString).commit();
		
		} catch (IOException e) {
			log.log(Level.SEVERE, "IO Exception", e);
			throwErrorResponse();
		}
		
	}
	
	
	
	
	public static JSONObject clearEzComObject(String buildType)
	{
		boolean isSeedCleared = false;
		
		
	
		if(FinacleMobileApp.prefs.getString("ezAccount"+buildType, "") != ""){
			
			FinacleMobileApp.prefs.edit().remove("ezAccount"+buildType).commit();
			
			if(buildType.equalsIgnoreCase(RET_BUILD))
			{	
				ezObj=null;
			}
			else
			{	
				ezObjCorp = null;
			}
			isSeedCleared = true;
			FinacleMobileApp.prefs.edit().putString("tokenPinLength"+buildType, defaultTokenPinLength).commit();
		}
	
		JSONObject jsonObj=new JSONObject();
		try {
			jsonObj.put("isSeedCleared", isSeedCleared);
		} catch (JSONException e) {
			log.log(Level.SEVERE, "JSON Exception", e);
			throwErrorResponse();
		}
		return jsonObj;
		
		
	}
	
	
	
	public static JSONObject getEzAccountFromDevice(String buildType)
	{
		boolean isEzComAccAvailable = false;
		if(FinacleMobileApp.prefs.getString("ezAccount"+buildType, "") != ""){
			isEzComAccAvailable = true;
		}
		
		JSONObject jsonObj=new JSONObject();
		try {
			jsonObj.put("isEzComAccAvailable", isEzComAccAvailable);
		} catch (JSONException e) {
			log.log(Level.SEVERE, "JSON Exception", e);
			throwErrorResponse();
		}
		return jsonObj;
		
		
	}
	
	
	
	public static JSONObject getEzTokenNumber(String tokenPin,String buildType) throws JSONException
	{
		
		try {
			String token = EzTokenSDK.getOTP(getLocalEzAccount(buildType), tokenPin);
			JSONObject jsonObj=new JSONObject();
			jsonObj.put("generatedToken", token);
			return jsonObj;
			
		} catch (EzException e) {
			log.log(Level.SEVERE, "EZCOM Exception", e);
			throwErrorResponse();
		}
		return null;	
		
	}
	
	public static EzAccount getLocalEzAccount(String buildType)
	{
		
	if(null==ezObjCorp && buildType.equalsIgnoreCase(CORP_BUILD)){
		String accountBytesAsString = FinacleMobileApp.prefs.getString("ezAccount"+buildType, null);
		byte[] accountBytes = null;
		EzAccount ezAccount = null;
		
		if(accountBytesAsString == null)
		{
			System.out.println("Unable to load EzAccount obj");
		
		}
		else
		{
			accountBytes = Base64.decode(accountBytesAsString, Base64.DEFAULT);
			if(accountBytes == null)
				throwErrorResponse();
			else
			{
					ByteArrayInputStream baIn = new ByteArrayInputStream(accountBytes);
					ObjectInputStream objIn;
					try {
						objIn = new ObjectInputStream(baIn);
						ezAccount = (EzAccount)(objIn.readObject());
						ezObjCorp = ezAccount;
					} catch (StreamCorruptedException e) {
						log.log(Level.SEVERE, "Stream Corrupted Exception", e);
						throwErrorResponse();
					} catch (IOException e) {
						log.log(Level.SEVERE, "IO Exception", e);
						throwErrorResponse();
					} catch (ClassNotFoundException e) {
						log.log(Level.SEVERE, "CLassnot found Exception", e);
						throwErrorResponse();
					}
			}
		}
		}
	else if(null==ezObj && buildType.equalsIgnoreCase(RET_BUILD)){
		String accountBytesAsString = FinacleMobileApp.prefs.getString("ezAccount"+buildType, null);
		byte[] accountBytes = null;
		EzAccount ezAccount = null;
		
		if(accountBytesAsString == null)
		{
			System.out.println("Unable to load EzAccount obj");
		
		}
		else
		{
			accountBytes = Base64.decode(accountBytesAsString, Base64.DEFAULT);
			if(accountBytes == null)
				throwErrorResponse();
			else
			{
					ByteArrayInputStream baIn = new ByteArrayInputStream(accountBytes);
					ObjectInputStream objIn;
					try {
						objIn = new ObjectInputStream(baIn);
						ezAccount = (EzAccount)(objIn.readObject());
						ezObj = ezAccount;
					} catch (StreamCorruptedException e) {
						log.log(Level.SEVERE, "Stream Corrupted Exception", e);
						throwErrorResponse();
					} catch (IOException e) {
						log.log(Level.SEVERE, "IO Exception", e);
						throwErrorResponse();
					} catch (ClassNotFoundException e) {
						log.log(Level.SEVERE, "CLassnot found Exception", e);
						throwErrorResponse();
					}
			}
		}
		}
	
		if(buildType.equalsIgnoreCase(RET_BUILD))
		{	
			return ezObj;
		}
		else
		{	
			return ezObjCorp; 
		}
	
	
		
	}
	
	public static JSONObject getTsnFromLocalEzAccount(String buildType) throws JSONException
	{
		if(null!=getLocalEzAccount(buildType)){
			String tsn = getLocalEzAccount(buildType).getAccountSerialNumber();
			
			JSONObject jsonObj=new JSONObject();
			jsonObj.put("tsnFromEzAccount", tsn);
			return jsonObj;
		
		}
		return null;
			
	}
	
	public static void getEzAccountFromTsn(String tsn,String buildType) throws JSONException
	{
		
			try {
				saveEzObject(EzTokenSDK.getEzTokenAccount(tsn),buildType);
			} catch (EzException e) {
				log.log(Level.SEVERE, "EZCOM Exception", e);
				throwErrorResponse();
			}
			
	}
	
public static JSONObject extractInfoFromPushMessage(String txPush,String buildType) throws JSONException
	{
		boolean status=false;
		if(null!=getLocalEzAccount(buildType)){
			EzAccount ezAccountObj = getLocalEzAccount(buildType);
			String gId;
			try {
				gId = EzTokenSDK.getTransactionPullGid(txPush);
			
			String uId=EzTokenSDK.getTransactionPullUid(txPush);
			
			String objGId=ezAccountObj.getServiceGID();
			String objUId=ezAccountObj.getUID();
			
			if(null!=gId && null !=uId && gId.equalsIgnoreCase(objGId) && uId.equalsIgnoreCase(objUId) ){
				status=true;
			}
			else{
				status=false;
			}
		
			JSONObject jsonObj=new JSONObject();
			jsonObj.put("status", status);
			return jsonObj;
			
			} catch (EzException e) {
				log.log(Level.SEVERE, "EZCOM Exception", e);
				throwErrorResponse();
			}
		}
		return null;
	}
	
	public static JSONObject submitPinForApproval(String pin,String pushString, String buildType){
		
		if(null!=getLocalEzAccount(buildType)){
			EzAccount ezAccountObj = getLocalEzAccount(buildType);
			String processString=null;
			JSONObject jsonObj=new JSONObject();
			try {
				refString=EzTokenSDK.getTransactionPullRef(pushString);
				
				InputStream inputCert =null;
			
					  try {
						  inputCert = mngr.open("ezm.cer");
					} catch (IOException e) {
						log.log(Level.SEVERE, "IO Exception", e);
						throwErrorResponse();
					}
				processString=EzTokenSDK.pullTransactionDetails(ezAccountObj,pin,refString,inputCert);
				inputCert.close();
				
				keyIn=pin;
				jsonObj.put("processTxnString", URLEncoder.encode(processString,"UTF-8"));
				return jsonObj;
			
			} catch (EzException e) {
				log.log(Level.SEVERE, "EZCOM Exception", e);
				throwErrorResponse();
			}
			catch(Exception ex){
				log.log(Level.SEVERE, " Exception", ex);
				ex.printStackTrace();
			}
			
			
			
			
			
		}
		return null;
	}
	
	public static JSONObject submitApproval(String data,String txnStatus, String buildType){
		if(null!=getLocalEzAccount(buildType)){
			EzAccount ezAccountObj = getLocalEzAccount(buildType);
			try {
				
				int status = Integer.parseInt(txnStatus);
			
			LinkedHashMap<String, String> txnMap;
			
				txnMap = EzTokenSDK.getTransactionValues(data);
				String pin = keyIn;
				InputStream inputCert =null;
				
				  try {
					  inputCert = mngr.open("ezm.cer");
				} catch (IOException e) {
					log.log(Level.SEVERE, "IO Exception", e);
					throwErrorResponse();
				}	
				
			
			String signedTxnString=EzTokenSDK.signTransaction(ezAccountObj, pin, refString, txnMap, status, inputCert);
			
			
			String tsn = getLocalEzAccount(buildType).getAccountSerialNumber();
			
			if(buildType.equalsIgnoreCase(RET_BUILD))
			{	
				 ezObj=EzTokenSDK.getEzTokenAccount(tsn);
					saveEzObject(ezObj,buildType);
			}
			else
			{	
				 ezObjCorp=EzTokenSDK.getEzTokenAccount(tsn);
					saveEzObject(ezObjCorp,buildType); 
			}
			
           
			
			JSONObject jsonObj=new JSONObject();
			
			try {
				jsonObj.put("signedTxnString", URLEncoder.encode(signedTxnString,"UTF-8"));
			} catch (UnsupportedEncodingException e) {
				log.log(Level.SEVERE, "Unsupported Encoding Exception", e);
				throwErrorResponse();
			}
			
		
		
			return jsonObj;
		
			} catch (EzException e) {
				log.log(Level.SEVERE, "EZCOM Exception", e);
				throwErrorResponse();
			} catch (JSONException e) {
				log.log(Level.SEVERE, "JSON Exception", e);
				throwErrorResponse();
			}
		}
		return null;
	}

	private static String getPushID() {
		try {
			if (pushId == null) {
				pushId = WLDeviceAuthManager.getInstance().getDeviceUUID(rakContext);
			}

			System.out.println("ayesha "+pushId);
			Log.d("PUSH_ID", pushId);
		} catch (Throwable e) {
			Log.d("getPushID error", e.getMessage());
			e.printStackTrace();
		}
		return pushId;
	}
	
}
