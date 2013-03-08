/*
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * author Digital Primates
 * copyright dash-if 2012
 */
MediaPlayer.dependencies.ManifestUpdater = function () {
    "use strict";
    
    var url,
        manifestUpdateTimer,
        manifestMinimumUpdatePeriod,

        handleManifestUpdate = function (e) {
        	var self = this;
        	//TODO: handle when the minimumUpdatePeriod changes...
        	self.manifestLoader.load(self.url).then(
                function (manifest) {
                	self.system.mapValue('manifest', manifest);
                	self.system.notify('manifestUpdated');
                }
        	);
        },
        registerForUpdates = function (url, manifest) {
            var deferred = Q.defer(),
                self = this;

            self.url = url;
            self.manifestExt.getMinimumUpdatePeriod(manifest).then(
                function (minimumUpdatePeriod) {
                	if (minimumUpdatePeriod === null || 
                        minimumUpdatePeriod === undefined ||
                        minimumUpdatePeriod <= 0) {
                		deferred.resolve(false);
                        return;
                	}

                	// convert seconds to milliseconds
                    minimumUpdatePeriod = minimumUpdatePeriod * 1000;
                	manifestUpdateTimer = setInterval(handleManifestUpdate.bind(self), minimumUpdatePeriod);
                	deferred.resolve(true);
                }
            );

        	return deferred.promise;
        },
        deregisterForUpdates = function () {
            if (manifestUpdateTimer === null) {
            	return Q.when(false);
            }

            clearInterval(manifestUpdateTimer);
            manifestUpdateTimer = null;

        	return Q.when(true);
        };

    return {
        system : undefined,
        manifestExt : undefined,
        manifestLoader : undefined,
        registerForUpdates : registerForUpdates,
        deregisterForUpdates : deregisterForUpdates
    }
};

MediaPlayer.dependencies.ManifestUpdater.prototype = {
    constructor: MediaPlayer.dependencies.ManifestUpdater
};