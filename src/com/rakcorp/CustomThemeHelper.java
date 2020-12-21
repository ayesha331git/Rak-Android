package com.rakcorp;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;

import com.Util.IThemeHelper;
import com.Util.ThemeHelper;

import static android.content.Context.BIND_AUTO_CREATE;


/**
 * Created by mahesh.korukonda on 1/23/2020.
 * TOL-886304, 886307 - Rootcheck + Checksum changes
 * Rooted device check - version3 changes
 * Helper useful to bind the Service
 */

public class CustomThemeHelper {
    private static final String TAG = "";
    public IThemeHelper serviceBinder;
    private boolean bServiceBound;
    private static CustomThemeHelper instance;

    public static CustomThemeHelper getInstance(){
        if(null == instance){
            instance = new CustomThemeHelper();
        }
        return instance;
    }

   private CustomThemeHelper(){}

   public void bindHelper(Context context) {
        Intent intent = new Intent(context,ThemeHelper.class);
        context.getApplicationContext().bindService(intent, mIThemeHelperServiceConnection, BIND_AUTO_CREATE);
    }

    private ServiceConnection mIThemeHelperServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            serviceBinder = IThemeHelper.Stub.asInterface(iBinder);
            bServiceBound = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            bServiceBound = false;
        }
    };
}
