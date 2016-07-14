define(['Class'], function(my){
    
    var AssetManager = my.Class({
        
        constructor: function(placeholderDataUri){
            this._assets = {};
            if (placeholderDataUri) {
                    this._placeholder = new Image();
                    this._placeholder.src = placeholderDataUri;
            }
        },
        
        load: function(images, onDone, onProgress) {
	    // Kolejka obrazków
	    var queue = [];
	    for (var im in images) {
	        queue.push({
	            key: im,
	            path: images[im]
	        });
	    }

            if (queue.length === 0) {
                onProgress && onProgress(0, 0, null, null, true);
                onDone && onDone();
                return;
            }

            var itemCounter = {
                loaded: 0,
                total: queue.length
            };

            for (var i = 0; i < queue.length; i++) {
                this._loadItem(queue[i], itemCounter, onDone, onProgress);
            }
	},
        
        _loadItem: function(queueItem, itemCounter, onDone, onProgress) {
		var self = this;
		
		if(queueItem.path.slice(-3) === "jpg" || queueItem.path.slice(-3) === "png" || queueItem.path.slice(-4) === "jpeg"
                    || queueItem.path.slice(-3) === "gif" || queueItem.path.slice(-3) === "JPG" || queueItem.path.slice(-3) === "PNG" 
                    || queueItem.path.slice(-3) === "GIF"){
                    var img = new Image();
                    img.onload = function() {
                            self._assets[queueItem.key] = img;
                            self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
                    };

                    img.onerror = function() {
                            self._assets[queueItem.key] = self._placeholder ? self._placeholder : null;
                            self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
                    };
                    img.src = queueItem.path;
		}
		else if(queueItem.path.slice(-3) == "mp3" || queueItem.path.slice(-3) == "ogg" || queueItem.path.slice(-3) == "wav"){
                    // var audio = new Audio();
                    console.log('a')
                    createjs.Sound.registerSound(queueItem.path, queueItem.key, 0);
                    self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
                    // audio.oncanplaythrough = function() {
                    // 	self._assets[queueItem.key] = audio;
                    // 	self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
                    // };

                    // audio.onerror = function() {
                    // 	self._assets[queueItem.key] = self._placeholder ? self._placeholder : null;
                    // 	self._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
                    // };
                    // audio.src = queueItem.path;
		}
		else{
                    console.log("niepoprawne rozszerzenie")
		}
		
	},

	_onItemLoaded: function(queueItem, itemCounter, onDone, onProgress, success) {
            itemCounter.loaded++;
            onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
	    if (itemCounter.loaded == itemCounter.total) {
	        onDone && onDone();
	    }
	},

	get: function(key) {
        return this._assets[key];
	},

	getSrc: function(key) {
        return this._assets[key].src;
	},

	play: function(key) {
        createjs.Sound.play(key);
	},

	stop: function(key) {
        this._assets[key].pause();
     	this._assets[key].currentTime = 0;	
        createjs.Sound.stop(key);
	}
        
    });
    
    return AssetManager;
});



