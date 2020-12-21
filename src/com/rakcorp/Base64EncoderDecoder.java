package com.rakcorp;

/**
 * Base64 is a way of encoding 8-bit characters using only ASCII printable
 * characters sometimes called UUENCODE
 * The spec is described in RFC 2045.  Base64 is a scheme where
 * 3 bytes are concatenated, then split to form 4 groups of 6-bits each; and
 * each 6-bits gets translated to an encoded printable ASCII character, via a
 * table lookup.  An encoded string is therefore longer than the original by
 * about 1/3.  The "=" character is used to pad the end.  Base64 is used,
 * among other things, to encode the user:password string in an
 * Authorization: header for HTTP.  Don't confuse Base64 with
 * x-www-form-urlencoded which is handled by
 * Java.net.URLEncoder.encode/decode
 * If you wanted to encode a giant file, you could do it in large chunks that
 * are even multiples of 3 bytes, except for the last chunk, and append the outputs.
 * @author : NISHCHALS
 * @version: 1.3
 * @since  : BankAway 5.0
 */
public class Base64EncoderDecoder {

	public static final String logName = "Base64EncoderDecoder";
	/**
	 * letter of the alphabet used to encode binary values 0..63
	 */
	static final char[] valueToChar = new char[64];
	/**
	 * binary value encoded by a given letter of the alphabet 0..63
	 */
	static final int[] charToValue = new int[256];
	/**
	 * Marker value for chars we just ignore, e.g. \n \r high ascii
	 */
	static final int IGNORE = -1;
	/**
	 * Marker for = trailing pad
	 */
	static final int PAD = -2;

	static {
		// build translate valueToChar table only once.
		// 0..25 -> 'A'..'Z'
		for (int i = 0; i <= 25; i++)
			valueToChar[i] = (char) ('A' + i);

		// 26..51 -> 'a'..'z'
		for (int i = 0; i <= 25; i++)
			valueToChar[i + 26] = (char) ('a' + i);

		// 52..61 -> '0'..'9'
		for (int i = 0; i <= 9; i++)
			valueToChar[i + 52] = (char) ('0' + i);

		valueToChar[62] = '+';
		valueToChar[63] = '/';

		// build translate charToValue table only once.
		for (int i = 0; i < 256; i++) {
			charToValue[i] = IGNORE; // default is to ignore
		}

		for (int i = 0; i < 64; i++) {
			charToValue[valueToChar[i]] = i;
		}

		charToValue['='] = PAD;
	}

	/**
	 * Base64EncoderDecoder has a blank constructor .
	 */
	public Base64EncoderDecoder() {
		super();
	}
	/**
	 * This method decode a well-formed complete Base64 string back into an array of bytes.
	 * It must have an even multiple of 4 data characters (not counting \n),
	 * padded out with = as needed.
	 * @param String String to de decoded
	 * @returns byte array
	 * @exception FatalException If some internal problem occurs
	 */
	public static byte[] decode(String s){
		s.trim();
		// estimate worst case size of output array, no embedded newlines.
		byte[] b = new byte[(s.length() / 4) * 3];

		// tracks where we are in a cycle of 4 input chars.
		int cycle = 0;

		// where we combine 4 groups of 6 bits and take apart as 3 groups of 8.
		int combined = 0;

		// how many bytes we have prepared.
		int j = 0;

		// will be an even multiple of 4 chars, plus some embedded
		int len = s.length();
		int dummies = 0;
		for (int i = 0; i < len; i++) {
			int c = s.charAt(i);
			int value = (c <= 255) ? charToValue[c] : IGNORE;

			// there are two magic values PAD (=) and IGNORE.
			switch (value) {
				case IGNORE :
					// e.g. \n, just ignore it.
					break;

				case PAD :
					value = 0;
					dummies++;
					// fallthrough
				default :
					/* regular value character */
					switch (cycle) {
						case 0 :
							combined = value;
							cycle = 1;
							break;

						case 1 :
							combined <<= 6;
							combined |= value;
							cycle = 2;
							break;

						case 2 :
							combined <<= 6;
							combined |= value;
							cycle = 3;
							break;

						case 3 :
							combined <<= 6;
							combined |= value;

							// we have just completed a cycle of 4 chars.
							// the four 6-bit values are in combined in big-endian order
							// peel them off 8 bits at a time working lsb to msb
							// to get our original 3 8-bit bytes back

							b[j + 2] = (byte) combined;
							combined >>>= 8;
							b[j + 1] = (byte) combined;
							combined >>>= 8;
							b[j] = (byte) combined;
							j += 3;
							cycle = 0;
							break;
						default :
							break;
					} // End switch ( cycle )
					break;
			} // End switch ( value )
		} // end for

		if (cycle != 0) {
			//throw new FatalException(null,"Internal Error. Input to decode not an even multiple of 4 characters; pad with =.");
		}

		j -= dummies;
		if (b.length != j) {
			byte[] b2 = new byte[j];
			System.arraycopy(b, 0, b2, 0, j);
			b = b2;
		}
		return b;

	}// end decode
	/**
	 * This method encode an array of bytes into a  well-formed complete Base64 string .
	 * @param byte array to be converted to String
	 * @returns String String after encryption
	 * @exception FatalException If some internal problem occurs
	 */

	public static String encode(byte[] binInput){
		// Each group or partial group of 3 bytes becomes four chars
		int outputLength = ((binInput.length + 2) / 3) * 4;

		// account for embedded newlines, on all but the very last line
		// Wrapping after 76th char, and inserted CRLF char
		outputLength += ((outputLength - 1) / 76) * 2;

		// must be local for recursion to work.
		StringBuffer sb = new StringBuffer(outputLength);

		// must be local for recursion to work.
		int linePos = 0;

		// first deal with even multiples of 3 bytes.
		int evenLength = (binInput.length / 3) * 3;
		int leftover = binInput.length - evenLength;
		for (int i = 0; i < evenLength; i += 3) {
			linePos += 4;
			if (linePos > 128) {	//Ravi changes
				linePos = 0;
				sb.append("\r\n");
			}

			// get next three bytes in unsigned form lined up,
			// in big-endian order
			int combined = binInput[i + 0] & 0xff;
			combined <<= 8;
			combined |= binInput[i + 1] & 0xff;
			combined <<= 8;
			combined |= binInput[i + 2] & 0xff;

			// break those 24 bits into a 4 groups of 6 bits,
			// working LSB to MSB.
			int c3 = combined & 0x3f;
			combined >>>= 6;
			int c2 = combined & 0x3f;
			combined >>>= 6;
			int c1 = combined & 0x3f;
			combined >>>= 6;
			int c0 = combined & 0x3f;

			// Translate into the equivalent alpha character
			// emitting them in big-endian order.
			sb.append(valueToChar[c0]);
			sb.append(valueToChar[c1]);
			sb.append(valueToChar[c2]);
			sb.append(valueToChar[c3]);
		}

		// deal with leftover bytes
		switch (leftover) {
			case 0 :
			default :
				// nothing to do
				break;

			case 1 :
				linePos += 4;
				if (linePos > 128) {	//Ravi changes
					linePos = 0;
					sb.append("\r\n");
				}

				// Throw away last two chars and replace with ==
				sb.append(encode(new byte[]{binInput[evenLength], 0, 0})
						.substring(0, 2));
				sb.append("==");
				break;

			case 2 :
				linePos += 4;
				if (linePos > 128) {	//Ravi changes
					linePos = 0;
					sb.append("\r\n");
				}

				sb.append(encode(
						new byte[]{binInput[evenLength],
								binInput[evenLength + 1], 0}).substring(0, 3));
				sb.append("=");
				break;

		} // end switch;

		return sb.toString();
	}// end encode
}
