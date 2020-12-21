package com.rakcorp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.os.Build;
import android.provider.ContactsContract;
import android.provider.ContactsContract.CommonDataKinds.Phone;
import android.util.Log;

public class FinacleFetchContact extends CordovaPlugin {
	static ArrayList<ContactNumber> contactNumberList=new ArrayList<ContactNumber>();
	Map<String,String> contactMap=new HashMap<>();
	static String contactName="";
	static String contactID="";
private CallbackContext callbackContext;

    private JSONArray executeArgs;

    public static final String ACTION_LIST_CONTACTS = "pickContact";
    public static final String ACTION_SHARE= "shareOnline";

    private static final String LOG_TAG = "Contact Phone Numbers";
    private static int REQUEST_SELECT_CONTACT = 1;
    private static int REQUEST_SELECT_NUMBER = 2;
    private static int HAVE_PHONE_NUMBER=3;
    private static int NO_PHONE_NUMBER=4;

    public FinacleFetchContact() {}

    /**
     * Executes the request and returns PluginResult.
     *
     * @param action            The action to execute.
     * @param args              JSONArray of arguments for the plugin.
     * @param callbackContext   The callback context used when calling back into JavaScript.
     * @return                  True if the action was valid, false otherwise.
     */
    public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {

        this.callbackContext = callbackContext;
        this.executeArgs = args;
        contactNumberList=new ArrayList<ContactNumber>();
        contactName="";
        contactID="";
		 UserPermissionUtility marshMallowPermission = new UserPermissionUtility(
					this.cordova.getActivity());
			if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
				if (!marshMallowPermission.checkPermissionForContacts()) {
					return false;
				}
			}
        if (ACTION_LIST_CONTACTS.equals(action)) {

        	openContactsList();
            return true;
        }
        else if (ACTION_SHARE.equals(action)) {
        	String message=args.getString(0);
        	shareOnline(message);
            return true;
        }

        return false;
    }

 void shareOnline(String message){
	 Intent sendIntent = new Intent();
	 sendIntent.setAction(Intent.ACTION_SEND);
	 sendIntent.putExtra(Intent.EXTRA_TEXT, message);
	 sendIntent.setType("text/plain");
	 ((Activity) this.cordova).startActivity(sendIntent);
	 
	 
    	
    }

void openContactsList(){

		Intent intent= new Intent(Intent.ACTION_PICK,ContactsContract.Contacts.CONTENT_URI);
		this.cordova.startActivityForResult((CordovaPlugin) this, intent, REQUEST_SELECT_CONTACT);


	}

@Override
	public void onActivityResult(int requestCode, int resultCode, Intent intent) {
		// TODO Auto-generated method stub
		super.onActivityResult(requestCode, resultCode, intent);
		//this is the result from default contact app of android
		if(requestCode==REQUEST_SELECT_CONTACT){
		if (resultCode == Activity.RESULT_OK) {
			try{
			Uri contactData=intent.getData();
			int status=getContact(contactData);
			if(status==HAVE_PHONE_NUMBER){
                cordova.setActivityResultCallback(this); //FS# 795601 
				Intent contactIntent= new Intent(this.cordova.getActivity().getApplicationContext(),ContactActivity.class);
			     this.cordova.getActivity().startActivityForResult( contactIntent, REQUEST_SELECT_NUMBER);
			}else{
				//send a contact that doesnt have a phone number
				this.callbackContext.success(getJSON("","",NO_PHONE_NUMBER));
			}
//			this.callbackContext.success(contactJSON);
			}	 catch (Exception e) {

				this.callbackContext.error("");
			}
		}
		}
		// this is the result from the custom activiy for selecting a number
		if(requestCode==REQUEST_SELECT_NUMBER){
			if (resultCode == Activity.RESULT_OK) {
				try{
			String number=intent.getStringExtra("number");
			String numberType=intent.getStringExtra("numberType");
			this.callbackContext.success(getJSON(number,numberType,HAVE_PHONE_NUMBER));
				}	 catch (Exception e) {

					this.callbackContext.error("");
				}
			}
		}
	}

private JSONObject getJSON(String number,String numberType,int status) throws JSONException{
	  JSONObject contactJSON = new JSONObject();
    JSONArray phoneJSON = new JSONArray();

	contactJSON.put("id", contactID);
	JSONObject nameJSON = new JSONObject();
	nameJSON.put("givenName", contactName);
	nameJSON.put("formatted", contactName);
	contactJSON.put("name", nameJSON);

	if(status==HAVE_PHONE_NUMBER){
	JSONObject phoneChildJSON = new JSONObject();
	phoneChildJSON.put("value", number);
	phoneChildJSON.put("type", numberType);
	 phoneJSON.put(phoneChildJSON);
	 clearStaticData();
	}
contactJSON.put("phoneNumbers", phoneJSON);
//	contactJSON.put("message", "yes");

	return contactJSON;





}

private int getContact(Uri contactData){
	ContentResolver cr = this.cordova.getActivity().getContentResolver();
	Cursor cursor = cr.query(contactData, null,
			 ContactsContract.Contacts.HAS_PHONE_NUMBER + " = 1", null, null);
	  JSONObject contactJSON = new JSONObject();
//      JSONArray phoneJSON = new JSONArray();
	if (cursor.moveToFirst()) {
	     contactID =
	        cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts._ID));

	    contactName = cursor.getString(cursor.getColumnIndex(ContactsContract.Contacts.DISPLAY_NAME));

	    //
	    //  Get all phone numbers.
	    //
	    Cursor phones = cr.query(Phone.CONTENT_URI, null,
	        Phone.CONTACT_ID + " = " + contactID, null, null);
	    contactNumberList=new ArrayList<ContactNumber>();
	    while (phones.moveToNext()) {

	        String number = phones.getString(phones.getColumnIndex(Phone.NUMBER));
	        String numberType = getPhoneTypeLabel(phones.getInt(phones.getColumnIndex(Phone.TYPE)));
	        contactMap.put(number, numberType);
	    }
	    
	    for (String temp:contactMap.keySet()) {
	    	contactNumberList.add(new ContactNumber(temp, contactMap.get(temp)));
			
		}
	    contactMap.clear();
//	    	Intent intent= new Intent(this.cordova.getActivity().getApplicationContext(),ContactActivity.class);
//		     this.cordova.getActivity().startActivityForResult( intent, REQUEST_SELECT_NUMBER);
	    phones.close();
	    cursor.close();
	    return HAVE_PHONE_NUMBER;
	}
	else
	{
		return NO_PHONE_NUMBER;
	}


}

/**
 * Retrieve the type of the phone number based on the type code
 * @param type the code of the type
 * @return a string in caps representing the type of phone number
 */
private String getPhoneTypeLabel(int type) {
    String label = "OTHER";
    if (type == Phone.TYPE_HOME)
        label = "HOME";
    else if (type == Phone.TYPE_MOBILE)
        label = "MOBILE";
    else if (type == Phone.TYPE_WORK)
        label = "WORK";

    return label;
}
//clearing the static data
public void clearStaticData(){
	contactNumberList=new ArrayList<ContactNumber>();
    contactName="";
    contactID="";
}

}



class ContactNumber{
	String number;
	String numberType;

	public ContactNumber(String number,String numberType) {
		// TODO Auto-generated constructor stub
		this.number=number;
		this.numberType=numberType;
	}




}
