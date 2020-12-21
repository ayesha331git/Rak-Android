/**
 * 
 */
package com.rakcorp;

import java.io.InputStream;

import android.content.Context;
import android.content.res.AssetManager;
import android.util.Log;

/**
 * @author Ravi_Rudra
 *
 */
public class ResourceCValidator {

	public boolean propertiesFileSecurityCheck(Context ctx) {
		/*
		 Iterate indexPos & find Non-zero values
		 			- Map with fNames array and fetch value
		 			- Form correct file name from fetched value
		 			- for forming fileName properly, create separate method and constants 
		 			- Fetch hashvalue from hcodes array and keep it for next steps
		 			- Open file from Assets and Hash process.
		 */
		try {
			boolean returnValue = true;
			InputStream is;
			AssetManager am = ctx.getAssets();
			
			int[] indexPos = FileHashConfig.indexPos;
			
			for(int index = 0; index < indexPos.length; index++ ){
				int indexValue = indexPos[index];
				if(indexValue != 0){
					String fileNameFetched = SecurityUtility.getString(FileHashConfig.fnames[indexValue - 1]);	//Ravi changes for filename as ASCII code
					//System.out.println("FileName is:"+fileNameFetched);
					String fileNameOriginal = FileHashConfig.formatFileName(fileNameFetched);
					
					is = am.open(fileNameOriginal);
					byte[] bFile = new byte[(int) is.available()];
					//convert file into array of bytes
					is.read(bFile);
					is.close();

					String hashVal = FileHashConfig.hcodes[index];
					
					String saltString = hashVal.substring(0, FileHashConfig.SALTLENGTH)+"==";
					String hashCode = hashVal.substring(FileHashConfig.SALTLENGTH, hashVal.length());
					
					byte[] salt = Base64EncoderDecoder.decode(saltString); 
					
					URLEncryptor urlEncryptor = new URLEncryptor();
					String hash = urlEncryptor.getHash(bFile,salt);
					//String hashFile = saltString.substring(0, saltString.length()-2)+hash.substring(0, hash.length()-2);

					if(!hashCode.equals(hash.substring(0, hash.length()-2))){
						Log.d(FinacleMobileApp.LOG_TAG,"Security Violation");
						return false;
					}
				}
			}
			return returnValue;
		}catch(Exception e){
			return false;
		}
	}
}
