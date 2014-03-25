MediaPlayer.sinclair.SinclairManifestExtensions = function () {
    "use strict";
    Dash.dependencies.DashManifestExtensions.apply(this, arguments);

    this.getPresentationOffset = function (manifest, periodIndex) {
        var deferred = Q.defer(),
        	req = new XMLHttpRequest(),
        	ENDPOINT = "http://localhost/~nweber/sinclair/server.json";

		req.open("GET", ENDPOINT, true);
		req.responseType = "json";

		req.onload = function () {
			var data = req.response,
				f = data.fragment,
				fDuration,
            	fTimescale = 1,
				idx = f.substring(f.lastIndexOf("/") + 1, f.lastIndexOf(".")),
				t = new Date(new Date().getTime() - 3000); /// three seconds ago //new Date(data.time);

			var representation = manifest.Period_asArray[periodIndex].AdaptationSet_asArray[1].Representation_asArray[0],
				template = representation.SegmentTemplate;

			if (template.hasOwnProperty("timescale")) {
                fTimescale = template.timescale;
            }
            fDuration = template.duration;

            var offset = (fDuration / fTimescale) * idx,
            	timeOffset = (new Date().getTime() - t.getTime()) / 1000;

			deferred.resolve(offset + timeOffset);
		};

		req.onerror = function () {
			deferred.resolve(0);
		}

		req.send();

		return deferred.promise;
    };
};

MediaPlayer.sinclair.SinclairManifestExtensions.prototype = {
    constructor: MediaPlayer.sinclair.SinclairManifestExtensions
};