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
MediaPlayer.di.Context = function () {
    "use strict";

    return {
        system : undefined,
        setup : function () {
            this.system.autoMapOutlets = true;

            this.system.mapSingleton('debug', MediaPlayer.utils.Debug);
            this.system.mapSingleton('capabilities', MediaPlayer.utils.Capabilities);

            this.system.mapSingleton('videoModel', MediaPlayer.models.VideoModel);
            this.system.mapSingleton('manifestModel', MediaPlayer.models.ManifestModel);
            this.system.mapSingleton('metricsModel', MediaPlayer.models.MetricsModel);

            this.system.mapSingleton('mediaSourceExt', MediaPlayer.dependencies.MediaSourceExtensions);
            this.system.mapSingleton('sourceBufferExt', MediaPlayer.dependencies.SourceBufferExtensions);
            this.system.mapSingleton('bufferExt', MediaPlayer.dependencies.BufferExtensions);
            this.system.mapSingleton('abrController', MediaPlayer.dependencies.AbrController);
            this.system.mapSingleton('errHandler', MediaPlayer.dependencies.ErrorHandler);

            this.system.mapClass('metrics', MediaPlayer.models.MetricsList);
            this.system.mapClass('downloadRatioRule', MediaPlayer.rules.DownloadRatioRule);
            this.system.mapClass('insufficientBufferRule', MediaPlayer.rules.InsufficientBufferRule);
            this.system.mapClass('limitSwitchesRule', MediaPlayer.rules.LimitSwitchesRule);
            this.system.mapClass('abrRulesCollection', MediaPlayer.rules.BaseRulesCollection);

            this.system.mapClass('bufferController', MediaPlayer.dependencies.BufferController);
            this.system.mapClass('manifestLoader', MediaPlayer.dependencies.ManifestLoader);
            this.system.mapClass('manifestUpdater', MediaPlayer.dependencies.ManifestUpdater);
            this.system.mapClass('fragmentController', MediaPlayer.dependencies.FragmentController);
            this.system.mapClass('fragmentLoader', MediaPlayer.dependencies.FragmentLoader);
            this.system.mapClass('stream', MediaPlayer.dependencies.Stream);
        }
    };
};