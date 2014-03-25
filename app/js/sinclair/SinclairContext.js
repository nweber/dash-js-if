MediaPlayer.sinclair.SinclairContext = function () {
    "use strict";

    return {
        system : undefined,
        setup : function () {
            MediaPlayer.sinclair.SinclairContext.prototype.setup.call(this);

            this.system.mapSingleton('manifestExt', MediaPlayer.sinclair.SinclairManifestExtensions);
        }
    };
};

MediaPlayer.sinclair.SinclairContext.prototype = new Dash.di.DashContext();
MediaPlayer.sinclair.SinclairContext.prototype.constructor = MediaPlayer.sinclair.SinclairContext;
