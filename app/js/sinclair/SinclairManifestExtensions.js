MediaPlayer.sinclair.SinclairManifestExtensions = function () {
    "use strict";
    Dash.dependencies.DashManifestExtensions.apply(this, arguments);

    this.getPresentationOffset = function (manifest, periodIndex) {
        var deferred = Q.defer(),
        	req = new XMLHttpRequest(),
        	ENDPOINT = MediaPlayer.sinclair.SinclairConstants.SERVER;

		req.open("GET", ENDPOINT, true);
		req.responseType = "json";

		req.onload = function () {
			var data = req.response,
				f = data.fragment,
				t = new Date(data.time);
			
			// no fragment, so start at the beginning
			if (f === "" || f === null || f === undefined) {
				deferred.resolve(0);
				return;
			}

			f = f.substring(f.lastIndexOf("/")+1);
			f = f.substring(0, f.lastIndexOf("."));

			var adaptations = manifest.Period_asArray[periodIndex].AdaptationSet_asArray,
				wildcards,
				matches,
				template;

			for (var j = 0; j < adaptations.length; j++) {
				// get segment template
				var representation = adaptations[j].Representation_asArray[0];
				
				template = representation.SegmentTemplate;

				// figure out index from fragment url
				var media = template.media.substring(0, template.media.lastIndexOf("."));
				
				var w = /\$[a-zA-Z]*\$/g,
					reg = new RegExp(media.replace(w, "(\\d+)"));
					
				wildcards = media.match(w)
				matches = reg.exec(f);

				if (matches !== null) {
					break;
				}
			}

			var indexIdx,
				idx,
				k;

			for (k = 0; k < wildcards.length; k++) {
				if (wildcards[k] === "$Number$") {
					indexIdx = k;
					break;
				}
			}

			idx = parseInt(matches[k+1]);
			
			if (template.hasOwnProperty("startNumber")) {
				idx -= template.startNumber;
			}

			// figure out time based on index
			var fDuration,
            	fTimescale = 1;

			if (template.hasOwnProperty("timescale")) {
                fTimescale = template.timescale;
            }
            fDuration = template.duration;
            
            var offset = (fDuration / fTimescale) * idx;

            var timeOffset = (new Date().getTime() - t.getTime()) / 1000;
            //offset += timeOffset;
            console.log("OFFSET CALCULATED AT: " + offset);

            deferred.resolve(offset);
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