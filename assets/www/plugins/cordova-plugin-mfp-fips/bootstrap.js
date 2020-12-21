cordova.define("cordova-plugin-mfp-fips.fips", function(require, exports, module) {
/*
   Licensed Materials - Property of IBM

   (C) Copyright 2016 IBM Corp.

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

// {platform}/www/plugins/cordova-plugin-mfp-fips/worklight
var WORKLIGHT_DIR = 'plugins/cordova-plugin-mfp-fips/worklight';

//{platform}/www/plugins/cordova-plugin-mfp-fips/worklight/fipshttp.js
var FIPS_PATH = WORKLIGHT_DIR + '/fipshttp.js';

document.addEventListener('mfpjsloaded', function(){

	var injectScript = function(url, onload, onerror) {
	    var script = document.createElement("script");
	    // onload fires even when script fails loads with an error.
	    script.onload = onload;
	    // onerror fires for malformed URLs.
	    script.onerror = onerror;
	    script.src = url;
	    document.head.appendChild(script);
	};

    function bootError(errMsg) {
        throw errMsg;
    }

	var mfpfipsready = function(){
		var wlevent = new Event('mfpfipsready');
		// Dispatch the event.
		document.dispatchEvent(wlevent);
	};
	
	injectScript(findCordovaPath() + FIPS_PATH,mfpfipsready,bootError);

}, false);

function findCordovaPath() {
    var path = null;
    var scripts = document.getElementsByTagName('script');
    var term = '/cordova.js';
    for (var n = scripts.length-1; n>-1; n--) {
        var src = scripts[n].src.replace(/\?.*$/, ''); // Strip any query param (CB-6007).
        if (src.indexOf(term) === (src.length - term.length)) {
            path = src.substring(0, src.length - term.length) + '/';
            break;
        }
    }
    return path;
}

});
