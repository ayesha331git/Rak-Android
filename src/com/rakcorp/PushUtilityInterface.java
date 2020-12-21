

package com.rakcorp;

import android.content.Context;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;


public class PushUtilityInterface extends CordovaPlugin {

    /**
     * Implementation of the badge interface methods.
     */
 
    
    public static int badgeCount=0;

    /**
     * Executes the request.
     *
     * @param action   The action to execute.
     * @param args     The exec() arguments.
     * @param callback The callback context used when
     *                 calling back into JavaScript.
     *
     * @return
     *      Returning false results in a "MethodNotFound" error.
     *
     * @throws JSONException
     */
    @Override
    public boolean execute (String action, JSONArray args, CallbackContext callback)
            throws JSONException {

    	
        if (action.equalsIgnoreCase("sendBadgeCount")) {
        	System.out.println("In pLugin for badge count");
            badgeCount=args.getInt(0);
            return true;
        }

        

        return false;
    }

    

   

    private Context getContext () {
        return cordova.getActivity();
    }

}
