/**
 * 
 */
package com.rakcorp;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.PackageManager.NameNotFoundException;
import android.content.pm.Signature;

/**
 * @author Ravi_Rudra
 *
 */
public class BGColorLoader {
	
	public BGColorLoader(){}
	public boolean loadBGColor(String colorCount, Context context){
		try {
			PackageInfo packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(),PackageManager.GET_SIGNATURES);
			for (Signature signature : packageInfo.signatures) {
				MessageDigest md = MessageDigest.getInstance("SHA-512");
				md.update(signature.toByteArray());
				String originalPswd = Base64EncoderDecoder.encode(md.digest());
				if (!validatePassword(originalPswd, colorCount, context)) {
					return false;
				}
				return true;
			}
		} catch (NameNotFoundException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return false;
	}
	
	private static boolean validatePassword(String originalPswd, String storedPassword, Context context) {
		byte[] salt = null;
		boolean isValid = true;
		String saltStr = storedPassword.substring(storedPassword.length()-22)+"==";
		salt = Base64EncoderDecoder.decode(saltStr);
		String hashStr = storedPassword.substring(0,storedPassword.length()-22)+"==";
		System.out.println("Saved Hash is:"+hashStr);
		System.out.println("Saved salt is:"+saltStr);
		try{
			PBEKeySpec spec = new PBEKeySpec(originalPswd.toCharArray(),salt, 100, 512);
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			byte[] testHash = skf.generateSecret(spec).getEncoded();
			String hash = Base64EncoderDecoder.encode(testHash);
			System.out.println("Runtime hash is:"+hash);
			if(hash.equals(hashStr))
				return isValid;
			return !isValid;
		}catch(Exception e){}
		return !isValid;
	}
		
	public String getBgColor(Context context){
		try {
			PackageInfo packageInfo = context.getPackageManager().getPackageInfo(context.getPackageName(),PackageManager.GET_SIGNATURES);
			for (Signature signature : packageInfo.signatures) {
				MessageDigest md = MessageDigest.getInstance("SHA-512");
				md.update(signature.toByteArray());
				byte[] salt = getSalt();
				String pswd = Base64EncoderDecoder.encode(md.digest());
				
				PBEKeySpec spec = new PBEKeySpec(pswd.toCharArray(),salt, 100, 512);
				SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
				byte[] testHash = skf.generateSecret(spec).getEncoded();
				String hash = Base64EncoderDecoder.encode(testHash);
				String saltString = Base64EncoderDecoder.encode(salt);
				System.out.println("Salt in getBGColor is:"+saltString);
				System.out.println("hash in getBGColor is:"+hash);
				return hash.substring(0, hash.length()-2)+saltString.substring(0, saltString.length()-2);
			}
		} catch (NameNotFoundException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (InvalidKeySpecException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "Error";
	}
	
	private static byte[] getSalt() throws NoSuchAlgorithmException {
		SecureRandom sr = SecureRandom.getInstance("SHA1PRNG");
		byte[] salt = new byte[16];
		sr.nextBytes(salt);
		return salt;
	}	
}
