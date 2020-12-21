//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.rakcorp;

import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build.VERSION;
import android.os.Bundle;
import android.os.Handler;
import android.os.StrictMode;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.messaging.RemoteMessage;
import com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPushIntentService;
import com.ibm.mobilefirstplatform.clientsdk.android.push.api.MFPPushNotificationHandler;
import com.ibm.mobilefirstplatform.clientsdk.android.push.internal.MFPInternalPushMessage;
import com.ibm.mobilefirstplatform.clientsdk.android.push.internal.MFPPushUtils;
import com.worklight.common.Logger;
import com.worklight.jsonstore.api.JSONStoreAddOptions;
import com.worklight.jsonstore.api.JSONStoreCollection;
import com.worklight.jsonstore.api.JSONStoreInitOptions;
import com.worklight.jsonstore.api.WLJSONStore;
import com.worklight.jsonstore.database.SearchFieldType;
import com.worklight.nativeandroid.common.WLUtils;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import com.worklight.androidgap.api.WL;

public class MyIntentService extends MFPPushIntentService {
    private static Random randomObj = new Random();
    private LinkedList<Intent> intentsQueue = new LinkedList();
    int count =0;
    private static Logger logger = Logger.getInstance("com.ibm.mobilefirstplatform.clientsdk.android.push.api");
    private BroadcastReceiver resultReceiver = new BroadcastReceiver() {
        public void onReceive(Context context, Intent intent) {
		count++;
            Log.d("Ravi","MFPPushIntentService: BroadcastReceiver - onReceive");
            Log.d("Ravi","this.getResultCode() is"+this.getResultCode());
            Log.d("Ravi","isAppForeground() is"+isAppForeground());
            System.out.println("==Ravi==this.getResultCode() is"+this.getResultCode());
            System.out.println("==Ravi==isAppForeground() is"+isAppForeground());
            MyIntentService.this.onUnhandled(context, intent);
             /*
            if(this.getResultCode() == 1 || !isAppForeground()) {
                MyIntentService.logger.debug("MFPPushIntentService: App is not running in foreground. Create a notification.");
                Log.d("Ravi","MFPPushIntentService: App is not running in foreground. Create a notification.");
                MyIntentService.this.onUnhandled(context, intent);
            } else if(this.getResultCode() == -1 || isAppForeground()){
                Log.d("Ravi","MFPPushIntentService: this.getResultCode()."+this.getResultCode());
                Log.d("Ravi","MFPPushIntentService: isAppForeground()."+isAppForeground());
                MyIntentService.this.onUnhandled(context, intent);
            }*/
        }
    };

    private JSONObject jsonObj;

    public MyIntentService() {
    }


    private void saveInSharedPreferences(MFPInternalPushMessage message) {
        SharedPreferences sharedPreferences = this.getSharedPreferences("com.ibm.mobile.services.push", 0);
        String msgString = message.toJson().toString();
        int count = sharedPreferences.getInt("NotificationCount", 0);
        ++count;
        MFPPushUtils.storeContentInSharedPreferences(sharedPreferences, "LatestNotificationMsg" + count, msgString);
        MFPPushUtils.storeContentInSharedPreferences(sharedPreferences, "NotificationCount", count);
    }

    private void onUnhandled(Context context, Intent intent) {
        String action = intent.getAction();
        Log.d("Ravi", "onMessageReceived - onUnhandled - action:"+action);
        Log.d("Ravi", "onMessageReceived - onUnhandled - GCM_MESSAGE:"+GCM_MESSAGE);
        
        if((MFPPushUtils.getIntentPrefix(context) + GCM_MESSAGE).equals(action)) {
            MFPInternalPushMessage message = (MFPInternalPushMessage)intent.getParcelableExtra(GCM_EXTRA_MESSAGE);
            int notificationId = randomObj.nextInt();
            message.setNotificationId(notificationId);
            this.saveInSharedPreferences(message);
            intent = new Intent(MFPPushUtils.getIntentPrefix(context) + IBM_PUSH_NOTIFICATION);
            intent.putExtra("message", message);
            //Ravi changes for push
            //if(isAppForeground()){
				//TOL-893624 - Changing the Activity need to open when click on notification in Notification bar of device
                //intent.setClass(context, FinacleMobileApp.class);
            intent.setClass(context, MFPPushNotificationHandler.class);
//                intent.setAction("android.intent.action.MAIN");
//                intent.addCategory("android.intent.category.LAUNCHER");
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP );
                //intent.setAction( "app" ) ; //when app is in foreground, dont launch the app.
                Log.d("Ravi", "onMessageReceived - dont launch app");
            //}
            //else{
            //    Log.d("Ravi", "onMessageReceived - Launch app:");
            //    intent.setClass(context, MFPPushNotificationHandler.class); 
            //}
            //Ravi changes for push  
            
            //intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP );
            //intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP );
            Log.d("Ravi", "onMessageReceived - onUnhandled - Flags set:");
            intent.putExtra("notificationId", message.getNotificationId());
            this.generateNotification(notificationId, context, this.getNotificationTitle(context), this.getNotificationIcon(), message, intent);

            // Commented for RAK. COde is handled via generateNotificationMethod
            //writeToJSONStore();
        }
    }

    private void writeToJSONStore(){
        try {
            jsonObj.put("isClicked","true");
            JSONStoreCollection pushCollection = new JSONStoreCollection("push");
            pushCollection.setSearchField("userId", SearchFieldType.STRING);
            pushCollection.setSearchField("type", SearchFieldType.INTEGER);
            JSONStoreInitOptions initOptions = new JSONStoreInitOptions();
            // To get userid and password dynamically based on app and device uniwue details combination - start
            DeviceDataFinder ddf = new DeviceDataFinder();
            String[] userDets = ddf.getDeviceData(getApplicationContext());
            // initOptions.setMarkDirty(true);
            initOptions.setUsername(userDets[0]);
            // Optional password, default no password.
            initOptions.setPassword(userDets[1]);
            // To get userid and password dynamically based on app and device unique details combination - end

            //Fix for TOL : 893620
            if (!jsonObj.has("message")) {
                System.out.println("==Ravi==no message. Hence Notification will not be saved.");
                return;
            }

            if (!jsonObj.has("userId")) {
                jsonObj.put("userId", "__ALL__");
                Log.d("Ravi - Push Unhandled","use id added");
            }
            //Ravi changes for Push
            JSONArray readFlag = new JSONArray();
            jsonObj.put("readFlag",readFlag);

            JSONArray deleteFlag = new JSONArray();
            jsonObj.put("deleteFlag",deleteFlag);

            String pattern = "dd/MMM/yyyy";
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            String notificationCreatedOn = simpleDateFormat.format(new Date());
            jsonObj.put("createdOn",notificationCreatedOn);
            System.out.println("==Ravi==createdOn"+notificationCreatedOn);

            if (!jsonObj.has("expiresOn")) {
                Calendar c = Calendar.getInstance();
                c.setTime(simpleDateFormat.parse(notificationCreatedOn));
                c.add(Calendar.DAY_OF_MONTH, 7); 
                String notificationExpiresOn = simpleDateFormat.format(c.getTime()); 
                jsonObj.put("expiresOn",notificationExpiresOn);
                System.out.println("==Ravi==expiresOn"+notificationExpiresOn);
            }
            ////Ravi changes for Push - end changes
            List<JSONStoreCollection> collections = new LinkedList<JSONStoreCollection>();
            collections.add(pushCollection);
            WLJSONStore.getInstance(getApplicationContext())
                    .openCollections(collections, initOptions);
            // handle success

            JSONStoreCollection peopleCollection = WLJSONStore
                    .getInstance(getApplicationContext())
                    .getCollectionByName("push");

            JSONStoreAddOptions options = new JSONStoreAddOptions();
            options.setMarkDirty(true);

            pushCollection.addData(jsonObj, options);
            Log.d("Ravi - Push Unhandled","Data Saved");
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    private void setPushUnreadCount(){
        try{
                    
        }catch(Exception e){
            e.printStackTrace();
        }
    }
    private String getNotificationTitle(Context context) {
        int notificationTitle = -1;

        try {
            notificationTitle = MFPPushUtils.getResourceId(this.getApplicationContext(), "string", "push_notification_title");
            return context.getString(notificationTitle);
        } catch (Exception var7) {
            if(notificationTitle == -1) {
                ApplicationInfo appInfo = null;
                PackageManager packManager = context.getPackageManager();

                try {
                    appInfo = packManager.getApplicationInfo(context.getPackageName(), 0);
                } catch (Exception var6) {
                    logger.warn("MFPPushIntentService:getNotificationTitle() - Notification will not have a title because application name is not available.");
                }

                if(appInfo != null) {
                    return (String)packManager.getApplicationLabel(appInfo);
                }
            }

            return "";
        }
    }

    private int getNotificationIcon() {
        int notificationIcon;
        try {
            notificationIcon = MFPPushUtils.getResourceId(this.getApplicationContext(), "drawable", "push_notification_icon");
        } catch (Exception var3) {
            notificationIcon = 17301514;
        }

        return notificationIcon;
    }

    private Object getStyleBasedOnPayload(Context context, MFPInternalPushMessage message){
        // title to be shown
        String alert = message.getAlert();

        // message to be shown
        String payload_message = getValue("message");

        // to render image based notification
        String image = getValue("image");

        // to display the notification in the respective centres
        String loginFlag=getValue("loginrequired");
        String contents=getValue("content");

        // to render image based notification
        if (image != "") {
            // if image is present in app
            if (!image.contains("www")) {
                int resID = getResources().getIdentifier(image, "drawable", getPackageName());
                Bitmap bitmap_image = BitmapFactory.decodeResource(context.getResources(), resID);
                if(VERSION.SDK_INT >= 26) {
                    Notification.BigPictureStyle notificationStyle = new Notification.BigPictureStyle().bigPicture(bitmap_image).setSummaryText(payload_message);
                    return notificationStyle;
                }else {
                    NotificationCompat.BigPictureStyle notificationStyle = new NotificationCompat.BigPictureStyle()
                            .bigPicture(bitmap_image).setSummaryText(payload_message);

                    return notificationStyle;
                }
            } else {
                if(VERSION.SDK_INT >= 26) {
                    Notification.BigPictureStyle notificationStyle = new Notification.BigPictureStyle().bigPicture(getBitmapFromURL(image));
                    return notificationStyle;
                }else {
                    NotificationCompat.BigPictureStyle notificationStyle = new NotificationCompat.BigPictureStyle()
                            .bigPicture(getBitmapFromURL(image));

                    return notificationStyle;
                }
            }
        }
        // for normal notification
        else {
            if(loginFlag.equalsIgnoreCase("false"))
            {
                if(VERSION.SDK_INT >= 26) {
                    Notification.BigTextStyle notificationStyle = new  Notification.BigTextStyle().setBigContentTitle(alert).setSummaryText(contents).bigText(payload_message);
                    return notificationStyle;
                }else {
                    NotificationCompat.BigTextStyle notificationStyle = new  NotificationCompat.BigTextStyle().setBigContentTitle(alert).setSummaryText(contents).bigText(payload_message);

                    return notificationStyle;
                }
            }
        }
        return null;
    }

    private Object getActionBasedOnPayload(Context context, Intent intent, MFPInternalPushMessage message){
        Bundle bundle = new Bundle();
        bundle.putString("data", jsonObj.toString());
        bundle.putString("notificationId", Integer.toString(message.getNotificationId()));

        // to show buttons
        String button = getValue("buttonName");

        // respective actions on the buttons
        String actions = getValue("actions");

        // splitting button array
        String[] diffButtons = button.split("\\|");

        // spitting actions for the respective buttons
        String[] diffActions = actions.split("\\|");

        Intent[] buttonIntent = new Intent[diffActions.length];
        // specifing the button actions
        if (!button.equalsIgnoreCase("")) {
            if (button.contains("|")) {

                for (int i = 0; i < diffButtons.length; i++) {
                    buttonIntent[i] = buttonIntent(context, intent, diffActions[i], getValue(diffActions[i]), message);
                    buttonIntent[i].putExtras(bundle);

                    PendingIntent buttonPendingIntent = PendingIntent.getService(context, 0, buttonIntent[i],PendingIntent.FLAG_ONE_SHOT);                    
                    if(VERSION.SDK_INT >= 26) {
                        Notification.Action notification_action = new Notification.Action(0, diffButtons[i], buttonPendingIntent);
                        return notification_action;
                    }else{
                        NotificationCompat.Action notification_action = new NotificationCompat.Action(0, diffButtons[i], buttonPendingIntent);
                        return notification_action;
                    }
                }
            }
            else {
                Intent singleButtonIntent=buttonIntent(context, intent, actions, getValue(actions), message);

                PendingIntent buttonPendingIntents = PendingIntent
                        .getService(context, 0, singleButtonIntent,
                                PendingIntent.FLAG_ONE_SHOT);
                System.out.println("adding new button");
                if(VERSION.SDK_INT >= 26) {
                    Notification.Action notification_action = new Notification.Action(0, button, buttonPendingIntents);
                    return notification_action;
                }else{
                    NotificationCompat.Action notification_action = new NotificationCompat.Action(0, button, buttonPendingIntents);
                    return notification_action;
                }
            }
        }
        return null;
    }

    private void generateNotification(int notificationId, Context context, String title, int icon, MFPInternalPushMessage message, Intent intent) {
        NotificationManager notificationManager = null;

        long when = System.currentTimeMillis();

        String payload = message.getPayload();
        try {
            jsonObj = new JSONObject(payload);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        // to open application or broswer
        String target_type = getValue("targettype");

        // if browser the link and if app the service
        String target = getValue("target");

        // for tag absed notification
        String tags = getValue("tags");

        // RAK Changes
        Bundle bundle = new Bundle();
        String notificationType=getValue("NOTIFICATIONTYPE");
        if(!jsonObj.isNull("NOTIFICATIONTYPE") && notificationType.length()>1){
            invoke2FAFlow();
        }
        else{
           writeToJSONStore();

        }
        bundle.putString("data", jsonObj.toString());
        bundle.putString("notificationId", Integer.toString(count));
        // RAK Changes
        // specifying the action for simple intentsdat
        if (target_type.equalsIgnoreCase("LINK")) {
            intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(target));
        }

        else {
            intent = new Intent(context, FinacleMobileApp.class);
            intent.putExtras(bundle);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                    | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        }

        if(VERSION.SDK_INT >= 26) {
            notificationManager = (NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE);
            String id = context.getPackageName();
            NotificationChannel mChannel = new NotificationChannel(id, "mfp_notification_channel", NotificationManager.IMPORTANCE_LOW);
            mChannel.enableLights(true);
            notificationManager.createNotificationChannel(mChannel);
            Notification.Builder notification_builder =
                    new Notification.Builder(this, id);

            // Added for RAK
            if(!jsonObj.isNull("NOTIFICATIONTYPE") && notificationType.length()>1) {
                notification_builder.setContentTitle("RAKToken").setContentText(message.getAlert()).setAutoCancel(true)
                        .setSmallIcon(R.drawable.push).setContentIntent(PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_CANCEL_CURRENT))
                        .setAutoCancel(true);
            }
            else {

                notification_builder.setContentIntent(PendingIntent.getActivity(context, notificationId, intent, PendingIntent.FLAG_CANCEL_CURRENT))
                        .setSmallIcon(R.drawable.push)
                        .setTicker(message.getAlert())
                       /* .setWhen(when)*/
                        .setAutoCancel(true)
                        .setContentTitle(title)
                        .setContentText(message.getAlert())
                        .setPriority(message.getPriority())
                        .setVisibility(message.getVisibility());
            }
            Notification.Style notificationStyle= (Notification.Style) getStyleBasedOnPayload(context, message);
            if( notificationStyle != null){
                notification_builder.setStyle(notificationStyle);
            }

            Notification.Action action = (Notification.Action) getActionBasedOnPayload(context, intent, message);
            if(action != null){
                notification_builder.addAction(action);
            }
            notification_builder.setNumber(PushUtilityInterface.badgeCount);
            notificationManager.notify(notificationId, notification_builder.build());
        } else {
            NotificationCompat.BigTextStyle notificationStyle = new NotificationCompat.BigTextStyle();
            notificationStyle.setBigContentTitle(title);
            notificationStyle.bigText(message.getAlert());

            NotificationCompat.Builder builder = (new NotificationCompat.Builder(this)).setContentIntent(PendingIntent.getActivity(context, notificationId, intent, PendingIntent.FLAG_CANCEL_CURRENT)).setSmallIcon(R.drawable.push).setTicker(message.getAlert()).setWhen(when).setAutoCancel(true).setContentTitle(title).setContentText(message.getAlert()).setPriority(message.getPriority()).setVisibility(message.getVisibility()).setStyle(notificationStyle);
            Uri soundUri = this.getNotificationSoundUri(context, message.getSound());
            if(soundUri != null) {
                builder.setSound(soundUri);
            }

            if(message.getVisibility() == 0 && message.getRedact() != null) {
                NotificationCompat.Builder mBuilder = (new NotificationCompat.Builder(this)).setSmallIcon(icon).setTicker(message.getAlert()).setWhen(when).setContentTitle(title).setContentText(message.getRedact());
                builder.setPublicVersion(mBuilder.build());
            }

            if(message.getCategory() != null) {
                builder.setCategory(message.getCategory().toLowerCase());
            }

            if(!message.getBridge()) {
                builder.setLocalOnly(true);
            }

            NotificationCompat.Style style= (NotificationCompat.Style) getStyleBasedOnPayload(context, message);
            if( style != null){
                builder.setStyle(style);
            }

            NotificationCompat.Action action = (NotificationCompat.Action)getActionBasedOnPayload(context, intent, message);
            if(action != null){
                builder.addAction(action);
            }

            notificationManager = (NotificationManager)context.getSystemService(Context.NOTIFICATION_SERVICE);
            builder.setNumber(PushUtilityInterface.badgeCount);
            notificationManager.notify(notificationId, builder.build());
        }
    }

    private Intent buttonIntent(Context mcContext, Intent intent,
                                String diffActions, String value, MFPInternalPushMessage message) {

        if (diffActions.equalsIgnoreCase("CALL")) {
            Intent callIntent = new Intent(mcContext,
                    NotificationActionService.class).setAction("CALL");

            callIntent.putExtra("value", value);
            callIntent.putExtra("notificationId", Integer.toString(message.getNotificationId()));
            System.out.println("call event" + value);
            return callIntent;
        } else if (diffActions.equalsIgnoreCase("LINK")) {
            Intent callIntent = new Intent(mcContext,
                    NotificationActionService.class).setAction("LINK");


            callIntent.putExtra("value", value);
            callIntent.putExtra("notificationId", Integer.toString(message.getNotificationId()));
            System.out.println("link");
            return callIntent;
        } else if (diffActions.equalsIgnoreCase("CANCEL")) {
            Intent callIntent = new Intent(mcContext,
                    NotificationActionService.class).setAction("CANCEL");

            callIntent.putExtra("notificationId", Integer.toString(message.getNotificationId()));
            System.out.println("link");
            return callIntent;
        } else {
            System.out.println("dummy");
            Intent dummyIntent = new Intent(mcContext,
                    NotificationActionService.class).setAction("APP");
            dummyIntent.putExtra("notificationId", Integer.toString(message.getNotificationId()));

            dummyIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                    | Intent.FLAG_ACTIVITY_SINGLE_TOP);
            return dummyIntent;
        }
    }

    private String getValue(String key) {
        if (jsonObj.has(key)) {
            try {
                return jsonObj.getString(key);
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        return "";
    }

    public Bitmap getBitmapFromURL(String strURL) {
        try {
            if (VERSION.SDK_INT > 9)
            {
                StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
                StrictMode.setThreadPolicy(policy);
            }

            URL url = new URL(strURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    private Uri getNotificationSoundUri(Context context, String sound) {
        Uri uri = null;
        if(sound == null) {
            uri = RingtoneManager.getDefaultUri(2);
        } else if(!sound.trim().isEmpty()) {
            String soundResourceString = sound;

            try {
                if(soundResourceString.contains(".")) {
                    soundResourceString = soundResourceString.substring(0, soundResourceString.indexOf("."));
                }

                int resourceId = WLUtils.getResourceId(context, "raw", soundResourceString);
                if(resourceId == -1) {
                    Log.d("Ravi","Push notification sound will not be used because sound file name \"" + soundResourceString + "\" was not found. Add \"" + soundResourceString + "\" to res/raw folder.");
                }

                uri = Uri.parse("android.resource://" + context.getPackageName() + "/" + resourceId);
            } catch (Exception var6) {
                Log.d("Ravi","Push notification sound will not be used because sound file name \"" + sound + "\" was not found. Add \"" + sound + "\" to res/raw folder.");
            }
        }

        return uri;
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        String from = message.getFrom();
        Map<String, String> data = message.getData();
        JSONObject dataPayload = new JSONObject(data);

        try {
       /*     if(!jsonObj.isNull("NOTIFICATIONTYPE") && notificationType.length()>1){*/
               String payLoadStr = (String) dataPayload.get("payload");
               JSONObject payLoad = new JSONObject(payLoadStr);
               if(!payLoad.isNull("NOTIFICATIONTYPE") && payLoad.get("NOTIFICATIONTYPE")!=null && ((String) payLoad.get("NOTIFICATIONTYPE")).length() > 1 ){
                   payLoad.put("action", "pushData");
                   payLoad.put("isClicked","true");
               }
               else {
                   payLoad.put("action", "pushJSONWriter");
                   payLoad.put("isClicked","true");
               }

               dataPayload.put("payload",payLoad);

//     /*       dataPayload.put();*/
        } catch (JSONException e) {
            e.printStackTrace();
        }
        Log.d("Mahesh","MFPPushIntentService:onMessageReceived() - New notification received. Payload is: " + dataPayload.toString());
        String action = (String)data.get("action");
        if(action != null && action.equals("com.ibm.mobilefirstplatform.clientsdk.android.push.DISMISS_NOTIFICATION")) {
            Log.d("Ravi","MFPPushIntentService : Received a dismissal message from the GCM server");
            this.dismissNotification(((String)data.get("nid")).toString());
        } else {
            Intent intent = new Intent(MFPPushUtils.getIntentPrefix(this.getApplicationContext()) + ".C2DM_MESSAGE");
            intent.putExtra(GCM_EXTRA_MESSAGE, new MFPInternalPushMessage(dataPayload));
            if(!isAppForeground()) {
                Log.d("Ravi","MFPPushIntentService:onMessageReceived() - App is not on foreground. Queue the intent for later re-sending when app is on foreground");
                this.intentsQueue.add(intent);
            }

            this.getApplicationContext().sendOrderedBroadcast(intent, (String)null, resultReceiver, (Handler)null, 1, (String)null, (Bundle)null);
        }

    }

    protected void dismissNotification(String nid) {
        SharedPreferences sharedPreferences = this.getApplicationContext().getSharedPreferences("com.ibm.mobile.services.push", 0);
        int countOfStoredMessages = sharedPreferences.getInt("NotificationCount", 0);
        if(countOfStoredMessages > 0) {
            for(int index = 1; index <= countOfStoredMessages; ++index) {
                String key = "LatestNotificationMsg" + index;

                try {
                    String msg = sharedPreferences.getString(key, (String)null);
                    if(msg != null) {
                        JSONObject messageObject = new JSONObject(msg);
                        if(messageObject != null && !messageObject.isNull("nid")) {
                            String id = messageObject.getString("nid");
                            if(id != null && id.equals(nid)) {
                                MFPPushUtils.removeContentFromSharedPreferences(sharedPreferences, key);
                                MFPPushUtils.storeContentInSharedPreferences(sharedPreferences, "NotificationCount", countOfStoredMessages - 1);
                                NotificationManager mNotificationManager = (NotificationManager)this.getSystemService(Context.NOTIFICATION_SERVICE);
                                mNotificationManager.cancel(messageObject.getInt("notificationId"));
                            }
                        }
                    }
                } catch (JSONException var10) {
                    Log.d("Ravi","MFPPushIntentService: dismissNotification() - Failed to dismiss notification.");
                }
            }
        }

    }

    public static class NotificationActionService extends IntentService {
        public NotificationActionService() {
            super(NotificationActionService.class.getSimpleName());
        }

        @Override
        protected void onHandleIntent(Intent intent) {
            
            String action = intent.getAction().toString();
            System.out.println("==Ravi==NotificationActionService==onHandleIntent"+action);
            Log.d("Ravi","MFPPushIntentService: NotificationActionService():"+action);
            
            int notificationID = Integer.parseInt(intent.getExtras().getString(
                    "notificationId"));
            NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            manager.cancel(notificationID);
            if (action.equalsIgnoreCase("CALL")) {
                Intent callIntent = new Intent(Intent.ACTION_CALL);
                callIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                callIntent.setData(Uri.parse("tel:"
                        + intent.getExtras().getString("value")));
                try {
                    startActivity(callIntent);
                }catch (SecurityException e){
                    Toast.makeText(getApplicationContext(), "Grant Calling Permission", Toast.LENGTH_LONG).show();
                    e.printStackTrace();
                }catch (Exception e){
                    e.printStackTrace();
                }


            } else if (action.equalsIgnoreCase("LINK")) {
                Intent callIntent = new Intent(Intent.ACTION_VIEW);
                callIntent.setData(Uri.parse( intent.getExtras().getString("value")));

                callIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(callIntent);
                System.out.println("link");

            } else if (action.equalsIgnoreCase("APP")) {
                System.out.println("dummy");
                //Intent dummyIntent = new Intent(getApplicationContext(), MFPPushNotificationHandler.class);
                Intent dummyIntent = new Intent(getApplicationContext(), FinacleMobileApp.class);
                dummyIntent.putExtra("data", intent.getExtras().getString("data"));
                dummyIntent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP
                        |Intent.FLAG_ACTIVITY_NEW_TASK	| Intent.FLAG_ACTIVITY_SINGLE_TOP);
                startActivity(dummyIntent);
                
                // DebugUtils.log("Received notification action: " + action);

            }
        }

    }

    private void invoke2FAFlow(){
        try{
            jsonObj.put("isClicked","true");
            WL.getInstance().sendActionToJS("extractInfoFromPushMsg", jsonObj);
        }
        catch(Exception ex){

        }
    }
}
