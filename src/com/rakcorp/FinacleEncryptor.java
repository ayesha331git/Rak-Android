/**
 *
 */
package com.rakcorp;

import java.net.URLEncoder;
import java.security.SecureRandom;
import java.util.regex.Pattern;
import java.io.UnsupportedEncodingException;

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
public class FinacleEncryptor {

	/**
	 * Method to convert byte array to hex string
	 * @param raw
	 * @return
	 */
	public static String byteArrayToHexString(byte[] raw)
    {
        StringBuilder sb = new StringBuilder(2 + raw.length * 2);
        sb.append("0x");
        for (int i = 0; i < raw.length; i++) {
            sb.append(String.format("%02X", Integer.valueOf(raw[i] & 0xFF)));
        }
        return sb.toString();
    }

	/**
	 * Method to convert hex string to byte array
	 * @param hex
	 * @return
	 */
	public static byte[] hexStringToByteArray(String hex)
    {
        Pattern replace = Pattern.compile("^0x");
        String s = replace.matcher(hex).replaceAll("");
        byte[] b = new byte[s.length() / 2];
        for (int i = 0; i < b.length; i++){
          int index = i * 2;
          int v = Integer.parseInt(s.substring(index, index + 2), 16);
          b[i] = (byte)v;
        }
        return b;
    }

	/**
	 * Method to convert a plain text to cipher text
	 * @param plainText
	 * @return
	 */
	public String encryptPassword(String plainText){
		try {
			System.out.println("Encryption started..");
			SecureRandom r = new SecureRandom();
			byte[] salt = new byte[16];
			r.nextBytes(salt);
			/*for(int i=0;i<salt.length;i++)
				System.out.print(salt[i]+",");*/
			String salt_hex = byteArrayToHexString(salt);
			String hashKey = "4f1cef8d900db702b7759ef360430fd6151362a1";
			SecureRandom r1 = new SecureRandom();
			byte[] ivByte = new byte[16];
			r1.nextBytes(ivByte);
			String ivByte_hex = byteArrayToHexString(ivByte);
			String passPhrase = Long.toString(System.currentTimeMillis());
			//System.out.println("sensitive params SecurityUtility.deviceAESKeySize:"+SecurityUtility.deviceAESKeySize);
			PBEKeySpec spec = new PBEKeySpec(passPhrase.toCharArray(), salt, 1000, SecurityUtility.deviceAESKeySize);
			IvParameterSpec iv = new IvParameterSpec(salt);
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			SecretKey key = skf.generateSecret(spec);
			SecretKeySpec secretSpec = new SecretKeySpec(key.getEncoded(), "AES");	//Ravi changes for Android Fix on OS <4.4
			Cipher cipher = null;
			cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, secretSpec, iv);	//Ravi changes for Android Fix on OS <4.4
			byte cipherByte[] = cipher.doFinal(plainText.getBytes());
			String cipherText = Base64EncoderDecoder.encode(cipherByte);
			System.out.println("Encrypted Text:"+new String(cipherText));
			String finalStr = URLEncoder.encode(cipherText, "UTF-8");
			System.out.println("Final string is::"+finalStr);
			return hashKey+":"+salt_hex+":"+ivByte_hex+":"+cipherText+":"+passPhrase;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * Method to convert a remember user name to cipher text
	 * @param plainText (userName, deviceId, jsonCred)
	 * @return String
	 */
	public String getEncryptedUserName(String userName, String deviceId, String jsonCred) throws Exception {
		Cipher writer;
		byte[] secureValue;
		try {
			IvParameterSpec iv = new IvParameterSpec(deviceId.getBytes());
			String passPhrase = jsonCred;
			PBEKeySpec spec = new PBEKeySpec(passPhrase.toCharArray(), deviceId.getBytes(), 1000, SecurityUtility.deviceAESKeySize);
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			SecretKey key = skf.generateSecret(spec);
			writer = Cipher.getInstance("AES/CBC/PKCS5Padding");
			writer.init(Cipher.ENCRYPT_MODE, key, iv);
			secureValue = writer.doFinal(userName.getBytes("UTF-8")); //convert(writer, userName.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			throw new Exception(e);
		} catch (Exception e) {
			throw new Exception(e);
		}
		String encodedUserName = Base64EncoderDecoder.encode(secureValue);
		return encodedUserName;
	}

	/**
	 * Method to convert a cipher text to remember user name
	 * @param plainText (userName, deviceId, jsonCred)
	 * @return String
	 */
	public String getDecryptedUserName(String encodedUserName, String deviceId, String jsonCred)throws Exception {
		Cipher reader;
		try {
			String passPhrase = jsonCred;
			PBEKeySpec spec = new PBEKeySpec(passPhrase.toCharArray(), deviceId.getBytes(), 1000, SecurityUtility.deviceAESKeySize);
			IvParameterSpec iv = new IvParameterSpec(deviceId.getBytes());
			SecretKeyFactory skf = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");
			SecretKey key = skf.generateSecret(spec);
			reader = Cipher.getInstance("AES/CBC/PKCS5Padding");
			reader.init(Cipher.DECRYPT_MODE, key, iv);
			byte[] securedValue = Base64EncoderDecoder.decode(encodedUserName);
			byte[] plainText = reader.doFinal(securedValue); //convert(reader, securedValue);
			return new String(plainText, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			throw (e);
		} catch (Exception e) {
			throw (e);
		}
	}
}
