package com.rakcorp;

import org.apache.cordova.LOG;


import com.rakcorp.ForegroundCameraLauncher;

import android.app.ActionBar;
import android.app.AlertDialog;
import android.app.FragmentTransaction;
import android.os.Bundle;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.View;
import android.view.Window;
import android.widget.Button;


/**
 * Created by rahulc on 16/02/15.
 */
public class CaptureCheckImageActivity extends FragmentActivity {

    /**
     * The {@link android.support.v4.view.PagerAdapter} that will provide
     * fragments for each of the sections. We use a
     * {@link FragmentPagerAdapter} derivative, which will keep every
     * loaded fragment in memory. If this becomes too memory intensive, it
     * may be best to switch to a
     * {@link android.support.v13.app.FragmentStatePagerAdapter}.
     */
    SectionsPagerAdapter mSectionsPagerAdapter;
    public static final int DISABLE_CONFIRM_BUTTON = 64;
    public static final int ENABLE_CONFIRM_BUTTON = 250;

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    ViewPager mViewPager;
FrontClickFragment frontClickFragment=null;

    BackClickFragment backClickFragment=null;
    Button buttonFrontCam;
    Button buttonBackCam;
    Button mConfirmBackSnap=null;
    Button mConfirmFrontSnap=null;
    boolean frontButtonClicked=false;
    boolean backButtonClicked=false;
 

//    private ActionBar actionBar;
    // Tab titles
    private String[] tabs = { "Front View", "Back View"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        getWindow().requestFeature(Window.FEATURE_ACTION_BAR_OVERLAY);
        getWindow().requestFeature(Window.FEATURE_ACTION_BAR);
        getActionBar().hide();
        LanguageUtility languageUtility = new LanguageUtility(this,ForegroundCameraLauncher.locale);
        setContentView(R.layout.activity_capture_check_image);
     
//        actionBar = getActionBar();

//        actionBar.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
//        actionBar.setStackedBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));
//        actionBar.setBackgroundDrawable(new ColorDrawable(Color.parseColor("#330000ff")));
//        actionBar.setStackedBackgroundDrawable(new ColorDrawable(Color.parseColor("#550000ff")));

        // Create the adapter that will return a fragment for each of the three
        // primary sections of the activity.
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.pager);
        mViewPager.setAdapter(mSectionsPagerAdapter);
//        actionBar = getActionBar();
        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager());

        mViewPager.setAdapter(mSectionsPagerAdapter);
//        actionBar.setHomeButtonEnabled(false);
//        actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);
     buttonFrontCam=(Button)findViewById(R.id.buttonFrontView);
     buttonBackCam=(Button)findViewById(R.id.buttonBackView);

     buttonFrontCam.setText(languageUtility.getProperty("APP.PLUGIN_ALL.FRONT_SIDE"));
     buttonBackCam.setText(languageUtility.getProperty("APP.PLUGIN_ALL.BACK_SIDE"));
     
//     buttonFrontCam.setOnClickListener(new View.OnClickListener() {
//         public void onClick(View v) {
//             // Perform action on click   
//if(!frontButtonClicked){
//	backButtonClicked=false;
//	  mViewPager.setCurrentItem(0);
//	
//}
//         }
//     });
    
//     buttonFrontCam.setOnClickListener(new View.OnClickListener() {
//         public void onClick(View v) {
//             // Perform action on click   
//        	 if(!backButtonClicked){
//        		 frontButtonClicked=true;
//        		  mViewPager.setCurrentItem(1);
//        		 
//        	 }
//         }
//     });

        // Adding Tabs
//        for (String tab_name : tabs) {
//        	if(tabs.equals("Front View"))
//            actionBar.addTab(actionBar.newTab().setText(tab_name)
//            		.setIcon(this.getResources().getDrawable(R.drawable.front2))
//                    .setTabListener(this));
//        	else
//        		  actionBar.addTab(actionBar.newTab().setText(tab_name)
//        				  .setIcon(this.getResources().getDrawable(R.drawable.back2))
//                          .setTabListener(this));	
//            
//        }

        /**
         * on swiping the viewpager make respective tab selected
         * */
        mViewPager.setOnPageChangeListener(new ViewPager.OnPageChangeListener() {

            @Override
            public void onPageSelected(int position) {
                // on changing the page
                // make respected tab selected
//                actionBar.setSelectedNavigationItem(position);

            	
            	
                if(position==0 ){

                	changesOnFrontTabClicked();
            		if(!frontClickFragment.isFrontImageVisible)
                   switchCamera(true);

                }
                
                else 
                	
                	if(position==1){
               	
                		changesOnBackTabClicked();
            		if(!backClickFragment.isBackImageVisible)
                   switchCamera(false);
                }

            }

            @Override
            public void onPageScrolled(int arg0, float arg1, int arg2) {
            }

            @Override
            public void onPageScrollStateChanged(int arg0) {
            }
        });

    }
    @Override
    protected void onDestroy() {
    	// TODO Auto-generated method stub
    	super.onDestroy();
    	this.finish();
    }
public void switchCamera(boolean isfront){

    if(isfront){
        if (backClickFragment.mCamera != null) {
            try {
                backClickFragment.mCamera.stopPreview();
                backClickFragment.mCamera.release();
            } catch (Exception e) {
            	 LOG.d(FinacleMobileApp.LOG_TAG,"switchCamera isfront failed");
            }
        }
        try {
        	setAlpha(DISABLE_CONFIRM_BUTTON,mConfirmFrontSnap);
        	  backClickFragment. mPreview.setVisibility(View.INVISIBLE);
            frontClickFragment.mCamera = android.hardware.Camera.open();

            frontClickFragment.mCamera.setPreviewDisplay(frontClickFragment.mPreview.getHolder());
            frontClickFragment.mCamera.startPreview();
            frontClickFragment. mPreview.setVisibility(View.VISIBLE);
        } catch (Exception e) {
        	LOG.d(FinacleMobileApp.LOG_TAG,"switchCamera isfront setAlpha failed");
        }
    }else{

        if(frontClickFragment.mCamera!=null){
            try {
                frontClickFragment.mCamera.stopPreview();
                frontClickFragment.mCamera.release();
            } catch (Exception e) {
            	LOG.d(FinacleMobileApp.LOG_TAG,"switchCamera frontClickFragment mCamera failed");
            }
        }
        try {
        	
        	setAlpha(DISABLE_CONFIRM_BUTTON,mConfirmBackSnap);
        	 frontClickFragment. mPreview.setVisibility(View.INVISIBLE);
            backClickFragment.mCamera= android.hardware.Camera.open();

            backClickFragment.mCamera.setPreviewDisplay(backClickFragment.mPreview.getHolder());
            backClickFragment.mCamera.startPreview();
            backClickFragment. mPreview.setVisibility(View.VISIBLE);
        } catch (Exception e) {
        	LOG.d(FinacleMobileApp.LOG_TAG,"switchCamera DISABLE_CONFIRM_BUTTON  failed");
        }
    }

}



    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        public SectionsPagerAdapter(android.support.v4.app.FragmentManager fm) {
            super(fm);
        }


        @Override
        public android.support.v4.app.Fragment getItem(int index) {

            switch (index) {
                case 0:
                    // Top Rated fragment activity
                    frontClickFragment= new FrontClickFragment();
                    return frontClickFragment;
                case 1:
                    // Games fragment activity

                    backClickFragment=new BackClickFragment();
                    return backClickFragment;
                default :
                	break;
            }

            return null;
        }

        @Override
        public int getCount() {
            // get item count - equal to number of tabs
            return 2;
        }
    }

    @Override
    public void onBackPressed() {
//        this.finish();
//        super.onBackPressed();
    }
    
    void changesOnFrontTabClicked(){
    	backButtonClicked=false;
		frontButtonClicked=true;
//		buttonFrontCam.setBackground(CaptureCheckImageActivity.this.getResources().getDrawable(R.drawable.front1));
//		buttonBackCam.setBackground(CaptureCheckImageActivity.this.getResources().getDrawable(R.drawable.back2));
		buttonFrontCam.setBackgroundColor(Color.RED);
		buttonBackCam.setBackgroundColor(Color.WHITE);
		buttonFrontCam.setTextColor(Color.WHITE);
		buttonBackCam.setTextColor(Color.RED);
		 setAlpha(ENABLE_CONFIRM_BUTTON,mConfirmFrontSnap);
    	
    }
    void changesOnBackTabClicked(){
    	backButtonClicked=true;
		frontButtonClicked=false;
//		buttonFrontCam.setBackground(CaptureCheckImageActivity.this.getResources().getDrawable(R.drawable.front2));
//		buttonBackCam.setBackground(CaptureCheckImageActivity.this.getResources().getDrawable(R.drawable.back1));
		buttonFrontCam.setBackgroundColor(Color.WHITE);
		buttonBackCam.setBackgroundColor(Color.RED);
		buttonBackCam.setTextColor(Color.WHITE);
		buttonFrontCam.setTextColor(Color.RED);
		setAlpha(ENABLE_CONFIRM_BUTTON,mConfirmBackSnap);
    }
    //buttons
    
  //On front tab  clicked
    public void onFrontTabClick(View v) {
    	if(!frontButtonClicked){
//    		backButtonClicked=false;
//    		frontButtonClicked=true;
    		  mViewPager.setCurrentItem(0);
//    		  changesOnFrontTabClicked();
    		 
    		
    	}
    }
    //On back tab  clicked
    public void onBackTabClick(View v) {

    	 if(!backButtonClicked){
//    		 frontButtonClicked=false;
//    		 backButtonClicked=true;
    		  mViewPager.setCurrentItem(1);
//    			changesOnBackTabClicked();
    		 
    	 }
    }
     
    
    
//On front check cancel clicked
    public void onFrontCancelClick(View v) {
//        frontClickFragment.onCancel();
//        mViewPager.setCurrentItem(1);
//        finish();
    	 this.finish();
    }
    //on front check  snap clicked
    public void onFrontSnapClick(View v) {
        if(frontClickFragment.isFrontImageVisible){
            frontClickFragment.onCancel();
        }else{
            frontClickFragment.onSnap();
        }

    }

    //on front check  confirm clicked
    public void onFrontConfirmClicked(View v) {
//        actionBar.getTabAt(0).setText(""+actionBar.getTabAt(0).getText());
//if(frontClickFragment.isFrontImageVisible){
//	if(backClickFragment.isBackImageVisible)
//		
//	else
//    mViewPager.setCurrentItem(1);
//}else{
//    frontClickFragment.createToast("Please take a Picture before confirming or you can skip");
//}
    	if(backClickFragment.isBackImageVisible && frontClickFragment.isFrontImageVisible){
//          mViewPager.setCurrentItem(0);
//      	Intent intent = getParentActivityIntent();
////          intent.putExtra("name", etName.getText().toString());
//          setResult(RESULT_OK, intent);
      	ForegroundCameraLauncher.onSuccessReturn=true;
      this.finish();
          
      }else if(!backClickFragment.isBackImageVisible && frontClickFragment.isFrontImageVisible){
//      		createDialog("MRDC","Please capture front image.");
      		  mViewPager.setCurrentItem(1);
      	}

    }
//on back check cancel clicked
    public void onBackCancelClick(View v) {
//        backClickFragment.onCancel();
    	 this.finish();

    }
    //on back check snap clicked
    public void onBackSnapClick(View v) {
        if(backClickFragment.isBackImageVisible){
            backClickFragment.onCancel();
        }else{
            backClickFragment.onSnap();
        }


    }
    //on Back check  confirm clicked
    public void onBackConfirmClicked(View v) {
        //        actionBar.getTabAt(1).setText(""+actionBar.getTabAt(1).getText());
        if(backClickFragment.isBackImageVisible && frontClickFragment.isFrontImageVisible){
//            mViewPager.setCurrentItem(0);
//        	Intent intent = getParentActivityIntent();
////            intent.putExtra("name", etName.getText().toString());
//            setResult(RESULT_OK, intent);
        	ForegroundCameraLauncher.onSuccessReturn=true;
        this.finish();
            
        }else if(backClickFragment.isBackImageVisible && !frontClickFragment.isFrontImageVisible){
//        		createDialog("MRDC","Please capture front image.");
        		  mViewPager.setCurrentItem(0);
        	}
        

    }
    
    public void createDialog(String strTitle,String strMessage){
    	AlertDialog.Builder alertDialog = new AlertDialog.Builder(CaptureCheckImageActivity.this);     
    	// Setting Dialog Title       
    	alertDialog.setTitle(strTitle);       
    	// Setting Dialog Message       
    	alertDialog.setMessage(strMessage);    
    	   
    	// Setting Positive "Yes" Button        
//    	alertDialog.setPositiveButton("YES", new DialogInterface.OnClickListener() {          
//    		public void onClick(DialogInterface dialog,int which) {            
//    			// Write your code here to invoke YES event           
//    			Toast.makeText(getApplicationContext(), "You clicked on YES", Toast.LENGTH_SHORT).show();            }        });     
    	// Setting Negative "NO" Button       
    	alertDialog.setNegativeButton("Ok", new DialogInterface.OnClickListener() {       
    		public void onClick(DialogInterface dialog, int which) {        
    			// Write your code here to invoke NO event          
//    			Toast.makeText(getApplicationContext(), "You clicked on NO", Toast.LENGTH_SHORT).show();        
    			dialog.cancel();           
    			}        });         // Showing Alert Message    
    	alertDialog.show();
    		}
    	
    	
    
    
  //set alpha to make the tick image button semi transparent
    Button setAlpha(int alphaValue,Button button){
    	
    	button.getBackground().setAlpha(alphaValue);
    	return button;
    	
    }
}
