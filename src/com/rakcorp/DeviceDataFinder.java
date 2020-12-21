package com.rakcorp;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.Signature;
import android.provider.Settings;
import android.provider.Settings.Secure;

public class DeviceDataFinder {

	private String jUname = null;
	private String jPswd = null;
	private static DeviceDataFinder dObj= null;
	public DeviceDataFinder(){}
	public static DeviceDataFinder getInstance(){
		if(dObj == null){
			dObj = new DeviceDataFinder();
		}
		return dObj;
	}
	public String[] getDeviceData(Context ctx) {
		try{
			System.out.println("New approach");
			String secure_ID = Settings.Secure.getString(ctx.getContentResolver(), Secure.ANDROID_ID);
			String packStructure = ctx.getPackageName();
			String appName = ctx.getString(R.string.app_name);
			String uName = getJUname(appName, secure_ID, ctx);
			String pwd = getJPswd(packStructure, secure_ID, ctx);
			System.out.println("Modified---> UName is:"+uName);
			System.out.println("Modified---> Password is:"+pwd);
			return new String[]{uName, pwd};
		}catch(Exception e){
			e.printStackTrace();
			return new String[]{"", ""};
		}
	}
	private String getJUname(String str1, String str2, Context ctx){
		if(jUname == null){
			jUname = getSecureKey(ctx, (new StringBuffer().append(str1).reverse().append(str2)).toString()).substring(0, 10);
		}
		return jUname;
	}
	private String getJPswd(String str1, String str2, Context ctx){
		if(jPswd == null){
			jPswd = getSecureKey(ctx, (new StringBuffer().append(str1).reverse().append(str2)).toString());
			int len = jPswd.length();
			jPswd = jPswd.substring(len - 10, len);
		}
		return jPswd;
	}
	private String getSecureKey(Context ctx, String plainText){
		PackageInfo info;
		String hash_key = null;
		try {
			System.out.println("Modified---> 1:"+plainText);
			String packStructure = ctx.getPackageName();
		    info = ctx.getPackageManager().getPackageInfo(packStructure, PackageManager.GET_SIGNATURES);
		    System.out.println("Modified---> 2:");
		    for (Signature signature : info.signatures) {
		    	System.out.println("Modified---> 3");
		        MessageDigest md;
		        md = MessageDigest.getInstance("SHA-256");
		        md.update(signature.toByteArray());
		        hash_key = Base64EncoderDecoder.encode(md.digest(plainText.getBytes("UTF-8")));
		        hash_key = hash_key.replaceAll("[^a-zA-Z0-9]", "");
		        break;
		    }
		    System.out.println("Modified---> 4::"+hash_key);
		} catch (NameNotFoundException e1) {
			e1.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return hash_key;
	}
}
