
package com.rakcorp;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.json.JSONException;
import org.json.JSONObject;

import com.worklight.androidgap.api.WL;
import com.worklight.androidgap.api.WLActionReceiver;

import android.app.Activity;

public class ActionReceiver implements WLActionReceiver {
	private Activity parentActivity;
	 private static final Logger log = Logger.getLogger(Class.class.getName());

	public ActionReceiver(Activity pActivity) {
		parentActivity = pActivity;
	}

	public void throwErrorResponse() {

		JSONObject returnJSON = new JSONObject();
		try {
			returnJSON.put("errorResponse", "Unable to process your request");
		} catch (JSONException e) {
			log.log(Level.SEVERE, "JSON Exception", e);
			
		}
		WL.getInstance().sendActionToJS("displayError", returnJSON);
	}

	public void onActionReceived(String action, JSONObject data) {

		
		

	}
}