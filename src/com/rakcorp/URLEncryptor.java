/**
 *
 */
package com.rakcorp;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;

/**
 * @author Ravi_Rudra
 *
 */
public class URLEncryptor {


	
	public String encryptURL(final String plainURLData) throws Exception{
		String hashData = getHash(plainURLData);
		String encryptedText = encryptString(plainURLData);
		return encryptedText+":"+hashData;
	}
	
	public String hashURL(final String plainURLData) throws NoSuchAlgorithmException, UnsupportedEncodingException{
		byte[] salt = SecurityUtility.randomString();
		String hash = getHash(plainURLData,salt);
		String saltString = Base64EncoderDecoder.encode(salt);
		return saltString.substring(0, saltString.length()-2)+hash.substring(0, hash.length()-2);
	}
	
	//Hashing code
	public String getHash(String text) throws NoSuchAlgorithmException, UnsupportedEncodingException{
		byte[] salt=SecurityUtility.randomString();

		String saltString = Base64EncoderDecoder.encode(salt);
		String hash = getHash(text,salt);
		String eTime = Base64EncoderDecoder.encode(Long.toString(System.currentTimeMillis()).getBytes());         
		
		return saltString.substring(0, saltString.length()-2)+hash.substring(0, hash.length()-2)+eTime;
	}
	
	public String getHash(String text, byte[] salt) throws NoSuchAlgorithmException, UnsupportedEncodingException{
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			md.update(salt);
			byte[] bytes;

			bytes = md.digest(text.getBytes("UTF-8"));

			String encodedText = Base64EncoderDecoder.encode(bytes);
			
			return encodedText;
		} catch (NoSuchAlgorithmException e) {
			throw e;
		} catch (UnsupportedEncodingException e) {
			throw e;
		}
	}
	
	public String getHash(byte[] textInBytesArray, byte[] salt) throws Exception{
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			md.update(salt);
			byte[] bytes;

			bytes = md.digest(textInBytesArray);

			String encodedText = Base64EncoderDecoder.encode(bytes);

			return encodedText;
		} catch (Exception e) {
			throw e;
		}
	}
	
	public String encryptString(String plainText) throws Exception{
		try {
			//System.out.println("Encryption started..");
			SecureRandom r = new SecureRandom();
			byte[] salt = new byte[16];
			r.nextBytes(salt);

			String salt_hex = SecurityUtility.byteArrayToHexString(salt).substring(2).toLowerCase();
			
			SecureRandom r1 = new SecureRandom();
			byte[] ivByte = new byte[16];
			r1.nextBytes(ivByte);
			String ivByte_hex = SecurityUtility.byteArrayToHexString(ivByte).substring(2).toLowerCase();
			
			String hashKey = "4f1cef";
			
			String passPhrase = new String(SecurityUtility.randomString());
			
			PBEKeySpec spec = new PBEKeySpec(passPhrase.toCharArray(), salt, 1000, SecurityUtility.deviceAESKeySize);
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			SecretKey key = skf.generateSecret(spec);
			SecretKeySpec secretSpec = new SecretKeySpec(key.getEncoded(), "AES");
			IvParameterSpec iv = new IvParameterSpec(ivByte);

			Cipher cipher = null;
			cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretSpec, iv);
			byte cipherByte[] = cipher.doFinal(plainText.getBytes());
			String cipherText = Base64EncoderDecoder.encode(cipherByte);
/*			System.out.println("hashKey:"+hashKey+":"+hashKey.length());
			System.out.println("salt_hex:"+salt_hex+":"+salt_hex.length());
			System.out.println("passPhrase:"+passPhrase+":"+passPhrase.length());
			System.out.println("cipherText:"+cipherText+":"+cipherText.length());
*/			
			return hashKey+salt_hex+ivByte_hex+passPhrase+cipherText;
		} catch (Exception e) {
			throw e;
		}
	}
	
	
}
