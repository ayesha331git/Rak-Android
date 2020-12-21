package com.rakcorp;

import java.util.ArrayList;
import java.util.List;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.widget.AdapterView;
import android.widget.AdapterView.OnItemClickListener;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;

public class ContactActivity extends Activity {
	public ListView contactListView=null;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		 getWindow().requestFeature(Window.FEATURE_ACTION_BAR);
	        getActionBar().hide();
		setContentView(R.layout.activity_contact);
		TextView nameTextView=(TextView) findViewById(R.id.textView_name);
		 contactListView=(ListView)findViewById(R.id.listView_phoneNum);
		nameTextView.setText(FinacleFetchContact.contactName);
		ContactListAdapter adapter= new ContactListAdapter(this, 0, FinacleFetchContact.contactNumberList);
	contactListView.setAdapter(adapter);
	contactListView.setOnItemClickListener(new OnItemClickListener() {
@Override
		public void onItemClick(AdapterView<?> parent, View view, int position,
				long id) {
			// TODO Auto-generated method stub
	String number=((TextView) view.findViewById(R.id.textView_number)).getText().toString();
	String numberType=((TextView) view.findViewById(R.id.textView_type)).getText().toString();

	 onNumberClicked(number,numberType);
			
		}
	});
	}
	
	private void onNumberClicked(String number,String numberType){
		
		Intent output = new Intent();
		output.putExtra("number", number);
		output.putExtra("numberType", numberType);
		setResult(RESULT_OK, output);
		finish();
		
	}
	@Override
	public void onBackPressed() {
		// TODO Auto-generated method stub
//		super.onBackPressed();
	}

//	@Override
//	public boolean onCreateOptionsMenu(Menu menu) {
//		// Inflate the menu; this adds items to the action bar if it is present.
//		getMenuInflater().inflate(R.menu.contact, menu);
//		return true;
//	}
//
//	@Override
//	public boolean onOptionsItemSelected(MenuItem item) {
//		// Handle action bar item clicks here. The action bar will
//		// automatically handle clicks on the Home/Up button, so long
//		// as you specify a parent activity in AndroidManifest.xml.
//		int id = item.getItemId();
//		if (id == R.id.action_settings) {
//			return true;
//		}
//		return super.onOptionsItemSelected(item);
//	}
}

//adapter for the phone list

class ContactListAdapter extends ArrayAdapter<ContactNumber> {
	Context context=null;
	List<ContactNumber> list= new ArrayList<ContactNumber>();
	
	public ContactListAdapter(Context context, int resource,
			List<ContactNumber> list) {
		super(context, resource, list);
		// TODO Auto-generated constructor stub
		this.context=context;
		this.list=list;
		
	}
	
	@Override
	  public View getView(int position, View convertView, ViewGroup parent) {
	    LayoutInflater inflater = (LayoutInflater) context
	        .getSystemService(Context.LAYOUT_INFLATER_SERVICE);
	    View rowView = inflater.inflate(R.layout.contact_number_view, parent, false);
	    TextView number = (TextView) rowView.findViewById(R.id.textView_number);
	    TextView numberType = (TextView) rowView.findViewById(R.id.textView_type);
	    number.setText(list.get(position).number);
	    numberType.setText(list.get(position).numberType);


	    return rowView;
	  }

}

