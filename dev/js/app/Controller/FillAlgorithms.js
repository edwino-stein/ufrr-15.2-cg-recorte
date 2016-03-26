App.define('Controller.FillAlgorithms', {

    canvas: 'View.Canvas',

    floodFill: function(polygon, color){
        var now = this.getTimeStamp(),
            seed = null, targetColor = null;

        if(polygon.seed instanceof Array){
            for(var i in polygon.seed){
                seed = this.toCanvasPoint(polygon.seed[i].x, polygon.seed[i].y);
                targetColor = this.canvas.getPixelColor(seed);
                this.rFloodFill(seed, color, targetColor, true);
                this.rFloodFill(seed, color, targetColor, false);
            }
        }
        else{
            seed = this.toCanvasPoint(polygon.seed.x, polygon.seed.y);
            targetColor = this.canvas.getPixelColor(seed);
            this.rFloodFill(seed, color, targetColor, true);
            this.rFloodFill(seed, color, targetColor, false);
        }

        return this.getTimeStamp() - now;
    },

    /**
        Flood Fill recursiva
    */
    rFloodFill: function(pixel, color, targetColor, down){

        var p = this.newPoint(pixel.x, pixel.y);
        while (true) {
            if(!targetColor.isEqual(this.canvas.getPixelColor(p))) break;
            this.canvas.activePixel(p, color, false);
            p.x++;
        }

        p = this.newPoint(pixel.x - 1, pixel.y);
        while (true) {
            if(!targetColor.isEqual(this.canvas.getPixelColor(p))) break;
            this.canvas.activePixel(p, color, false);
            p.x--;
        }

        if(down){
            p  = this.newPoint(pixel.x, pixel.y + 1);
            if(!targetColor.isEqual(this.canvas.getPixelColor(p))) return;
            this.rFloodFill(p, color, targetColor, down);
        }
        else{
            p  = this.newPoint(pixel.x, pixel.y - 1);
            if(!targetColor.isEqual(this.canvas.getPixelColor(p))) return;
            this.rFloodFill(p, color, targetColor, down);
        }
    },

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    getTimeStamp: function(){
      return performance.now();
    },

    toCanvasPoint: function(x, y){
        return this.newPoint(Math.round(x), Math.round(y));
    },

    init: function(){
        var me = this;
        me.canvas = me._appRoot_.get(me.canvas);
        this.util = this._appRoot_.get('Util');
    }
});
