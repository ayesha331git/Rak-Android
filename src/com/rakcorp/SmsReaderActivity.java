package com.rakcorp;



import org.json.JSONObject;

import android.app.Activity;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.os.IBinder;
import android.telephony.SmsMessage;
import android.util.Log;
import android.view.Window;
import android.widget.Toast;

public class SmsReaderActivity extends Service{
	BroadcastReceiver smsReceiver;
	public JSONObject smsMessage = new JSONObject();
	
	@Override
	public void onDestroy() {
		// TODO Auto-generated method stub
		 if (smsReceiver != null) {
			   unregisterReceiver(smsReceiver);
			   smsReceiver = null;
			  }
		super.onDestroy();
	}
	@Override
	public void onCreate()
	{
		
		
		 
		IntentFilter smsFilter = new IntentFilter();
		smsFilter.addAction("android.provider.Telephony.SMS_RECEIVED");
		smsReceiver= new BroadcastReceiver() {
			
			@Override
			public void onReceive(Context context, Intent intent) {
				// TODO Auto-generated method stub
			     // Retrieves a map of extended data from the intent.
		        final Bundle bundle = intent.getExtras();
		 
		        try {
		             
		            if (bundle != null) {
		                 
		                final Object[] pdusObj = (Object[]) bundle.get("pdus");
		                 
		                for (int i = 0; i < pdusObj.length; i++) {
		                     
		                    SmsMessage currentMessage = SmsMessage.createFromPdu((byte[]) pdusObj[i]);
		                    String phoneNumber = currentMessage.getDisplayOriginatingAddress();
		                     
		                    String senderNum = phoneNumber;
		                    smsMessage.put("SenderNumber", senderNum);
		                    String message = currentMessage.getDisplayMessageBody();
		                    smsMessage.put("SenderMessage", message);
		                    Log.i("SmsReceiver", "senderNum: "+ senderNum + "; message: " + message);
		                     
		                    SmsReaderPlugin.SmsReadCallbackContext.success(smsMessage);
		                   // Show Alert
		                    int duration = Toast.LENGTH_LONG;
		                    Toast toast = Toast.makeText(context, 
		                                 "senderNum: "+ senderNum + ", message: " + message, duration);
		                    toast.show();
		                  stopSelf();
		                //  mService.unbind();
		                } // end for loop
		              } // bundle is null
		 
		        } catch (Exception e) {
		            Log.e("SmsReceiver", "Exception smsReceiver" +e);
		            SmsReaderPlugin.SmsReadCallbackContext.error(smsMessage);
		        }
			}
		};
		registerReceiver(smsReceiver, smsFilter);
		
	}
	
	
	@Override
	public IBinder onBind(Intent intent) {
		// TODO Auto-generated method stub
		return null;
	}
}