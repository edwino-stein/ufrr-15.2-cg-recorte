App.define('Controller.FillAlgorithms', {

    canvas: 'View.Canvas',

    floodFill: function(polygon, color){
        var now = this.getTimeStamp(),
            seed = null, targetColor = null;

        if(polygon.seed instanceof Array){
            for(var i in polygon.seed){
                seed = this.toCanvasPoint(polygon.seed[i].x, polygon.seed[i].y);
                targetColor = this.canvas.getPixelColor(seed);
                this.rFloodFill(seed, color, targetColor);
            }
        }
        else{
            seed = this.toCanvasPoint(polygon.seed.x, polygon.seed.y);
            targetColor = this.canvas.getPixelColor(seed);
            this.rFloodFill(seed, color, targetColor);
        }

        return this.getTimeStamp() - now;
    },

    /**
        Flood Fill recursiva
    */
    rFloodFill: function(pixel, color, targetColor){

        if(!targetColor.isEqual(this.canvas.getPixelColor(pixel)))
            return;

        this.canvas.activePixel(pixel, color, false);

        //Pixel da direita
        this.rFloodFill(this.newPoint(pixel.x + 1, pixel.y), color, targetColor);

        //Pixel de cima
        this.rFloodFill(this.newPoint(pixel.x, pixel.y + 1), color, targetColor);

        //Pixel da esquerda
        this.rFloodFill(this.newPoint(pixel.x - 1, pixel.y), color, targetColor);

        //Pixel de baixo
        this.rFloodFill(this.newPoint(pixel.x, pixel.y - 1), color, targetColor);
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
