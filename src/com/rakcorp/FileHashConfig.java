package com.rakcorp;

public class FileHashConfig {
	final static String hcodes[] = {
			"VmoxakkxNFVLTUR2ajlXRQyGpsbQ7Sk7f/WJwOSoE0xZfn8uPZdZXdQiqsTgHd/DXzp4rO4t6dMLiSN9BBKJpLj9ACs8Fx059o3dO1fzeqGw", 
			"ejRsTWpkYjZFNm4xNG5EVg9IWwiqPr+jCxyXoEBAwe/4hehUnuKltoIiuVkPmTNvogiexJCR3EkvYL4gvEsPcMA2/f+gXfABn6Md6GDn+15A", 
			"dkQ0aGdtQUk0bjg1OUpIOAgnKIkVeLFkReY8KKccbai7X5I2BDDMESU2aTrwWHQ+DTK8rexlcP2/wYUSwH0n2bl2UFuiCGdu9dCgkpxtL06w", 
			"bkRIVmNRTXQ4NVdqcEM3awti3FUCNIr42X5zXtzofT3/lewKrf0JR+KPfaU5Do4QuEiRzxVCpDwEAMFgn2hAAUns/M9HwOp3rUb0Z32dFl6Q", 
			"dkxMcmZ4NWc5U1U1bmQxUgdjvBXp6l9T58233OVkIOEeOr+/EUQt/27jGqMfIP451F28fdvHKkxkvDqMD9T8sFyvAd4FZqJDW/3un0ffSePQ" 
	};

	final static int indexPos[] = {0,0,0,0,0};
	final static int[][] fnames = {
			{99,101,114,116,105,102,105,99,97,116,101,46,100,101,114},
			{99,101,114,116,105,102,105,99,97,116,101,46,100,101,114}
	};

	public static int SALTLENGTH = 22;

	public static String formatFileName(String fileNameFetched) {
		//		 actual -  "wlclient.properties" 
		//		 jumbled - //seitreporp.tneilclw

		// Actual - "certificates/cert.der"
		// jumbled - "red.trec/setacifitrec"
		StringBuilder sb = new StringBuilder();
		sb.append(fileNameFetched);
		sb.reverse();
		return sb.toString();
	}
}
