/*
 * Copyright (c) 2013-2016 by appPlant UG. All rights reserved.
 *
 * @APPPLANT_LICENSE_HEADER_START@
 *
 * This file contains Original Code and/or Modifications of Original Code
 * as defined in and that are subject to the Apache License
 * Version 2.0 (the 'License'). You may not use this file except in
 * compliance with the License. Please obtain a copy of the License at
 * http://opensource.org/licenses/Apache-2.0/ and read it before using this
 * file.
 *
 * The Original Code and all software distributed under the License are
 * distributed on an 'AS IS' basis, WITHOUT WARRANTY OF ANY KIND, EITHER
 * EXPRESS OR IMPLIED, AND APPLE HEREBY DISCLAIMS ALL SUCH WARRANTIES,
 * INCLUDING WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
 * Please see the License for the specific language governing rights and
 * limitations under the License.
 *
 * @APPPLANT_LICENSE_HEADER_END@
 */

package com.rakcorp;

import android.content.Context;
import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;


public class Badge extends CordovaPlugin {

    /**
     * Implementation of the badge interface methods.
     */
    private final BadgeImpl badgeImpl = new BadgeImpl();

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
       System.out.println("Badge plugin Action"+action);
        if (action.equalsIgnoreCase("clearBadge")) {
            clearBadge(callback);
            return true;
        }

        if (action.equalsIgnoreCase("getBadge")) {
            getBadge(callback);
            return true;
        }

        if (action.equalsIgnoreCase("hasPermission")) {
            hasPermission(callback);
            return true;
        }

        if (action.equalsIgnoreCase("registerPermission")) {
            hasPermission(callback);
            return true;
        }

        if (action.equalsIgnoreCase("setBadge")) {
            setBadge(args, callback);
            return true;
        }
        
        if(action.equalsIgnoreCase("backClicked")){
        	System.out.println("Inside Back clicked event of badge");
        	backClicked(callback);
        	return true;
        }

        return false;
    }

    /**
     * Clears the badge of the app icon.
     *
     * @param callback
     *      The function to be exec as the callback
     */
    private void clearBadge (final CallbackContext callback) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                badgeImpl.clearBadge(getContext());
                badgeImpl.getBadge(callback, getContext());
            }
        });
    }

    /**
     * Retrieves the badge of the app icon.
     *
     * @param callback
     *      The function to be exec as the callback
     */
    
    
    private void backClicked(final CallbackContext callback){
    	try{
    		Intent intent=new Intent();
    		intent.setAction(Intent.ACTION_MAIN);
    		intent.addCategory(Intent.CATEGORY_HOME);
    		intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    		this.cordova.startActivityForResult((CordovaPlugin) this, intent, 0);
    	}
    	catch(Exception ex){
    		System.out.println("Exception while click of back");
    	}
    }
    
    
    protected void getBadge (final CallbackContext callback) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                badgeImpl.getBadge(callback, getContext());
            }
        });
    }

    /**
     * Informs if the app has the permission to show badges.
     *
     * @param callback
     *      The function to be exec as the callback
     */
    private void hasPermission (final CallbackContext callback) {
        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                badgeImpl.hasPermission(callback);
            }
        });
    }

    /**
     * Sets the badge of the app icon.
     *
     * @param args
     *      The new badge number
     * @param callback
     *      The function to be exec as the callback
     */
    private void setBadge (final JSONArray args,
                           final CallbackContext callback) {

        cordova.getThreadPool().execute(new Runnable() {
            @Override
            public void run() {
                badgeImpl.clearBadge(getContext());
                badgeImpl.setBadge(args, getContext());
                badgeImpl.getBadge(callback, getContext());
            }
        });
    }

    /**
     * Returns the context of the activity.
     */
    private Context getContext () {
        return cordova.getActivity();
    }

}
