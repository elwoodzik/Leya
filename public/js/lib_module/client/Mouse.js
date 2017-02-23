define(['Class'], function (my) {
    var that;

    var Mouse = my.Class({

        constructor: function (game) {
            that = this;
            this.game = game;
            //
            this.click = false;
            this.hover = false;
            this.down = false;
            this.trig = false;
            this.mouseX = null;
            this.mouseY = null;
            this.currentTouches = [];
            this.touchesIntersects = [];
            this.currentTouchesActive = [];
        },

        initialize: function () {
            var that = this;
            window.document.addEventListener("mousemove", function (e) { that.mouseMove(e) }, false);
            window.document.addEventListener("mousedown", function (e) { that.mouseDown(e) }, false);
            window.document.addEventListener("touchstart", function (e) { that.touchStart(e) }, false);
            window.document.addEventListener("touchmove", function (e) { that.touchMove(e) }, false);
            window.document.addEventListener("touchend", function (e) { that.touchEnded(e) }, false);
            window.document.addEventListener("mouseup", function (e) { that.mouseUp(e) }, false);
        },

        findCurrentActiveTouchIndex: function (id) {
            for (var i = 0; i < that.currentTouchesActive.length; i++) {
                if (that.currentTouchesActive[i].id === id) {
                    return i;
                }
            }
            // Touch not found! Return -1.
            return -1;
        },

        findCurrentTouchIndex: function (id) {
            for (var i = 0; i < that.currentTouches.length; i++) {
                if (that.currentTouches[i].id === id) {
                    return i;
                }
            }
            // Touch not found! Return -1.
            return -1;
        },

        mouseMove: function (e) {
            e.preventDefault();
            //
            this.mouseX = e.offsetX / this.game.scale1;
            this.mouseY = e.offsetY / this.game.scale1;
            //
            //this.click = (e.which == 1 && !this.down);
            //this.down = (e.which == 1);
        },

        touchStart: function (e) {
            //
            e.preventDefault();
            var touches = event.changedTouches;
            var touch = e.changedTouches[0];

            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];

                that.currentTouches.push({
                    id: touch.identifier,
                    pageX: touch.pageX,
                    pageY: touch.pageY,
                    interactive: false,
                    obj: null
                });
            }
        },

        touchMove: function (e) {
            // e.preventDefault();
            // //e.preventDefault();
            // //
            // this.mouseX = (e.touches[0].clientX - this.game.canvas.offsetLeft)  / this.game.scale1 ;
            // this.mouseY = e.touches[0].clientY / this.game.scale1 ;
            //
            //this.click = (e.which == 1 && !this.down);
            //this.down = (e.which == 1);
        },

        touchEnded: function (e) {
            var touches = event.changedTouches;

            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];
                var currentTouchActiveIndex = that.findCurrentActiveTouchIndex(touch.identifier);

                if (currentTouchActiveIndex >= 0) {
                    var currentActiveTouch = that.currentTouchesActive[currentTouchActiveIndex];
                    if (currentActiveTouch.obj) {
                        currentActiveTouch.obj.touchActive = false;
                        currentActiveTouch.obj.hovered = false;
                    }

                    that.currentTouchesActive.splice(currentTouchActiveIndex, 1);
                } else {
                    console.log('Touch active was not found!');
                }

                var currentTouchIndex = that.findCurrentTouchIndex(touch.identifier);

                if (currentTouchIndex >= 0) {
                    var currentTouch = that.currentTouches[currentTouchIndex];

                    that.currentTouches.splice(currentTouchIndex, 1);
                } else {
                    console.log('Touch was not found!');
                }



            }

        },

        mouseDown: function (e) {
            e.preventDefault();
            //
            this.click = !this.down;
            this.down = true;
            this.trig = false;

        },

        // touchUp: function(e){
        //     e.preventDefault();
        //     //
        //     this.down = false;
        //     this.click = false;
        //     var touch = e.changedTouches[0];

        //     for(var i=0; i<this.currentTouches.length; i++){

        //         if(this.currentTouches[i].id === touch.identifier){
        //             this.currentTouches.splice(i,1);
        //         }
        //     }
        // },
        mouseUp: function (e) {
            e.preventDefault();
            //
            this.down = false;
            this.click = false;

        },



        intersects: function (obj, static) {
            var t = 2; //tolerance
            var tempMouseY = this.mouseY;
            var tempMouseX = this.mouseX;

            if (!static) {
                tempMouseX = tempMouseX + (this.game.camera.xScroll);
                tempMouseY = tempMouseY + (this.game.camera.yScroll);
            }


            var xIntersect = (tempMouseX + t) >= obj.x && (tempMouseX + t) <= obj.x + obj.currentWidth;
            var yIntersect = (tempMouseY + t) >= obj.y && (tempMouseY - t) <= obj.y + obj.currentHeight;

            return xIntersect && yIntersect;
        },

        touchIntersects: function (obj, static, callback) {
            var t = 2; //tolerance
            if (Array.isArray(obj)) {
                for (var i = 0; i < this.currentTouches.length; i++) {
                    for (var j = 0; j < obj.length; j++) {

                        if (!obj[j].touchActive && !obj[j].hovered) {
                            var tempMouseY = this.currentTouches[i].pageY / this.game.scale1;
                            var tempMouseX = (this.currentTouches[i].pageX - this.game.canvas.offsetLeft) / this.game.scale1;

                            if (!static) {
                                tempMouseX = tempMouseX + (this.game.camera.xScroll);
                                tempMouseY = tempMouseY + (this.game.camera.yScroll);
                            }

                            var xIntersect = (tempMouseX + t) >= obj[j].x && (tempMouseX + t) <= obj[j].x + obj[j].currentWidth;
                            var yIntersect = (tempMouseY + t) >= obj[j].y && (tempMouseY - t) <= obj[j].y + obj[j].currentHeight;

                            this.currentTouches[i].interactive = xIntersect && yIntersect;

                            if (this.currentTouches[i].interactive) {

                                obj[j].touchActive = true;
                                obj[j].hovered = true;

                                this.currentTouchesActive.push({
                                    id: this.currentTouches[i].id,
                                    obj: obj[j]
                                });
                                callback.call(this, obj[j]);
                                //that.currentTouches.splice(i, 1);

                                //return false; 
                            }
                        }
                    }
                }
            } else {
                for (var i = 0; i < this.currentTouches.length; i++) {

                    if (!obj.touchActive && !obj.hovered) {
                        var tempMouseY = this.currentTouches[i].pageY / this.game.scale1;
                        var tempMouseX = (this.currentTouches[i].pageX - this.game.canvas.offsetLeft) / this.game.scale1;

                        if (!static) {
                            tempMouseX = tempMouseX + (this.game.camera.xScroll);
                            tempMouseY = tempMouseY + (this.game.camera.yScroll);
                        }

                        var xIntersect = (tempMouseX + t) >= obj.x && (tempMouseX + t) <= obj.x + obj.currentWidth;
                        var yIntersect = (tempMouseY + t) >= obj.y && (tempMouseY - t) <= obj.y + obj.currentHeight;

                        this.currentTouches[i].interactive = xIntersect && yIntersect;

                        if (this.currentTouches[i].interactive) {

                            obj.touchActive = true;
                            obj.hovered = true;

                            this.currentTouchesActive.push({
                                id: this.currentTouches[i].id,
                                obj: obj
                            });

                            that.currentTouches.splice(i, 1);
                            //return false; 
                        }
                    }
                }
            }
        },

        intersectsSprite: function (obj, static) {

            var t = 2; //tolerance

            var xIntersect = (this.mouseX + t) >= obj.x && (this.mouseX + t) <= obj.x + obj.states[obj.state].fW;
            var yIntersect = (this.mouseY + t) >= obj.y && (this.mouseY - t) <= obj.y + obj.states[obj.state].fH;

            return xIntersect && yIntersect;
        },

        updateHoverStats: function (obj) {
            if (this.intersects(obj)) {
                return true;
            } else {
                obj.hovered = false;
            }
        },

        updateStats: function (obj, static, hold) {

            if (this.intersects(obj, static)) {

                obj.hovered = true;

                //if(this.click){ 
                return true;
                //}
            } else {
                obj.hovered = false;
                return false;
            }

            //
            // if (!this.game.mouse.down) {
            //     this.click = false;
            // }               
        },

        // updateTouchStats: function(obj,static, hold){
        //     var tab = this.touchIntersects(obj, static);

        //     for(var i=0; i<tab.length; i++){
        //         if (tab[i]) {
        //             console.log('ppp')
        //             obj.hovered = true;
        //             this.touchAccepted[i] = true;
        //           return this.touchAccepted[i];
        //         } else {
        //             obj.hovered = false;
        //             this.touchAccepted[i] = false;
        //         }
        //     } 
        //     return this.touchAccepted;
        //     //
        //     // if (!this.game.mouse.down) {
        //     //     this.click = false;
        //     // }               
        // },


        // updateSpriteStats: function(obj){
        //     var wasNotClicked = !this.game.mouse.click;

        //     if (this.intersectsSprite(obj, this.game.mouse)) {
        //         this.hovered = true;
        //         if (this.game.mouse.click) {
        //             this.click = true;
        //         }
        //         if (this.click && wasNotClicked) {
        //             this.click = false;
        //             return true;
        //         }
        //     } else {
        //         this.hovered = false;
        //     }
        //     //
        //     if (!this.game.mouse.down) {
        //         this.click = false;
        //     }               
        // },
        touchtrigger: function (obj, static, callback, hold) {

            if (this.click) {
                //  console.log('aaa')
                if (!this.trig) {

                    this.trig = hold ? true : false;

                    if (Array.isArray(obj)) {

                        for (u = obj.length - 1; u >= 0; u--) {
                            //console.log(obj[u]);
                            if (this.updateTouchStats(obj[u], static, hold)[u]) {
                                callback.call(this, obj[u]);
                            }
                        }
                        this.trig = false;
                        return false
                    }
                    else if (typeof obj === 'object' && obj != null) {
                        var tab = this.updateTouchStats(obj, static, hold);

                        for (i = 0; i < tab.length; i++) {
                            if (tab[i]) {
                                //console.log('azxczxc')
                                callback.call(this, obj);
                            }
                        }
                        this.trig = false;
                        return false
                    }
                    else if (obj === null) {

                        if (typeof callback === 'function') {
                            this.click = false;
                            this.trig = false;
                            this.down = false;
                            callback.call(this);
                        }
                    }
                }
            }
        },

        trigger: function (obj, static, callback, hold) {
            if (this.click) {
                if (!this.trig) {

                    this.trig = hold ? true : false;

                    if (Array.isArray(obj)) {
                        for (u = obj.length - 1; u >= 0; u--) {
                            if (this.updateStats(obj[u], static, hold)) {
                                callback.call(this, obj[u]);
                            }
                        }
                        this.trig = false;
                    }
                    else if (typeof obj === 'object' && obj != null) {
                        if (this.updateStats(obj, static, hold)) {
                            callback.call(this, obj);
                        }
                        this.trig = false;
                    }
                    else if (obj === null) {

                        if (typeof callback === 'function') {
                            this.click = false;
                            this.trig = false;
                            this.down = false;
                            callback.call(this);
                        }
                    }
                }
            }
        },

        onHover: function (obj, callback, hold) {
            //var wasNotClicked = this.click;

            if (Array.isArray(obj)) {
                for (u = 0, uMax = obj.length; u < uMax; u++) {
                    if (this.updateHoverStats(obj[u], hold)) {
                        return callback.call(this, obj[u]);
                    }
                }
            }
            else if (typeof obj === 'object' && obj != null) {
                if (this.updateHoverStats(obj, hold)) {
                    return callback.call(this, obj);
                }
            }
            else if (obj === null) {
                if (typeof callback === 'function') {

                    return callback.call(this);
                }
            }
        }
    })

    return Mouse;
})
