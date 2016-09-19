define(['Class'], function(my){
    
    var AssetManager = my.Class({
        
        constructor: function(placeholderDataUri){
            this._assets = {};
            if (placeholderDataUri) {
                    this._placeholder = new Image();
                    this._placeholder.src = placeholderDataUri;
            }

            this.canvas = document.createElement("canvas");
            this.ctx = this.canvas.getContext("2d");        
            this.canvas.width =  500;
            this.canvas.height =  300;
            this.canvas.id = 'preload';

            this.canvas.style.position = 'absolute';
            this.canvas.style.left = '50%';
            this.canvas.style.marginLeft = -this.canvas.width/2 + "px";

            document.body.style.overflow = 'hidden';
                
            document.body.appendChild(this.canvas);

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
	},

    preload: function(loaded, total){
        var currentProgress = loaded /total * 400;
        if(loaded === 1){
            this.ctx.font = "30px Arial";
            this.ctx.fillStyle = 'black';
            this.ctx.fillText("Ładowanie", 180, 60);
        }
        this.ctx.beginPath();
        this.ctx.rect(50,80,400,30);
        this.ctx.stroke();
        this.ctx.closePath();
        
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(51, 81, currentProgress-1, 28);
        //
        
        this.ctx.clearRect(200,120,500,300)
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(Math.floor(currentProgress/4) + "%", 230, 150);

        if(loaded === total){
            var child = document.getElementById("preload");
            document.body.removeChild(child);
        }
    }
        
    });
    
    return AssetManager;
});



