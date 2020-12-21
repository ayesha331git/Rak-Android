/**
 *
 */
package com.rakcorp;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.regex.Pattern;

/**
 * @author Ravi_Rudra
 *
 */
public class SecurityUtility {

	private static final String charData = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	public static final String bg = "TyM7+c/VWDtieljWL5BdST1+JNHZLiw5yPC6W+nYMC96/J0nb4A1dgmsmiH0eayOo2+xkAqMU7g7SeVoIHe7XQzfueOgfrmvLR9TT9MkODMQ";
	public static final int[] pFName = {99,101,114,116,105,102,105,99,97,116,101,46,100,101,114};	//Ravi changes for filename as ASCII code
	private static final int randomStringLen = 16;
	public static int deviceAESKeySize = 256;
	/**
	 * This function returns randomString of 32 bytes
	 * @return
	 */
	public static byte[] randomString(){
		SecureRandom rnd = new SecureRandom();
		StringBuilder sb = new StringBuilder(randomStringLen);
		for( int i = 0; i < randomStringLen; i++ )
			sb.append( charData.charAt( rnd.nextInt(charData.length()) ) );
	   return sb.toString().getBytes();
	}

	/**
	 * This method returns an hexa format string of the byte array
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
	 * This method return byte array of the hexa string
	 * @param hex
	 * @return
	 */
	public static byte[] hexStringToByteArrayJava(String hex)
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

	//Ravi changes for filename as ASCII code - start
	public static String getString(int[] fNameCodes){
		StringBuffer sbFname = new StringBuffer();
		for(int i=0;i<fNameCodes.length;i++){
			sbFname.append((char)fNameCodes[i]);
		}
		return sbFname.toString();
	}
	//Ravi changes for filename as ASCII code - end
}
