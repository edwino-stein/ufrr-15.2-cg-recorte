App.define('Controller.RasterAlgorithms', {

    canvas: 'View.Canvas',

    polygon: function(vertices, color){

        var now = this.getTimeStamp();

        for(var i = 0; i< vertices.length; i++){
            if(i + 1 === vertices.length)
                this.drawLine(vertices[i], vertices[0], color);
            else
                this.drawLine(vertices[i], vertices[i+1], color);
        }

        return this.getTimeStamp() - now;
    },

    /**
        Algoritmo de Bresenham para desenhar linhas
    */
    drawLine: function(start, end, color){

        //Converte para coordenadas inteiras aos seus pixels correspondentes da matriz
        start = this.toCanvasPoint(start.x, start.y);
        end = this.toCanvasPoint(end.x, end.y);

        var octante, dx, dy, p, pixel = this.newPoint(start.x, start.y);

        //Descobre em qual octante a reta pertence
        if(start.x <= end.x){
            dx = end.x - start.x;
            if(start.y <= end.y){
                dy = end.y - start.y;
                octante = (dx >= dy) ? 1 : 2;
            }
            else{
                dy = start.y - end.y;
                octante = (dx >= dy) ? 8 : 7;
            }
        }
        else{
            dx = start.x - end.x;
            if(start.y <= end.y){
                dy = end.y - start.y;
                octante = (dx >= dy) ? 4 : 3;
            }
            else{
                dy = start.y - end.y;
                octante = (dx >= dy) ? 5 : 6;
            }
        }

        switch (octante) {
            case 1:
                p = 2*dy - dx;
                for(pixel.x; pixel.x <= end.x; pixel.x++){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y++;
                    p += 2*(dy - dx);
                }
            break;
            case 2:
                p = 2*dx - dy;
                for(pixel.y; pixel.y <= end.y; pixel.y++){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x++;
                    p += 2*(dx - dy);
                }
            break;
            case 3:
                p = 2*dx - dy;
                for(pixel.y; pixel.y <= end.y; pixel.y++){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x--;
                    p += 2*(dx - dy);
                }
            break;
            case 4:
                p = 2*dy - dx;
                for(pixel.x; pixel.x >= end.x; pixel.x--){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y++;
                    p += 2*(dy - dx);
                }
            break;
            case 5:
                p = 2*dy - dx;
                for(pixel.x; pixel.x >= end.x; pixel.x--){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y--;
                    p += 2*(dy - dx);
                }
            break;
            case 6:
                p = 2*dx - dy;
                for(pixel.y; pixel.y >= end.y; pixel.y--){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x--;
                    p += 2*(dx - dy);
                }
            break;
            case 7:
                p = 2*dx - dy;
                for(pixel.y; pixel.y >= end.y; pixel.y--){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dx;
                        continue;
                    }
                    pixel.x++;
                    p += 2*(dx - dy);
                }
            break;
            case 8:
                p = 2*dy - dx;
                for(pixel.x; pixel.x <= end.x; pixel.x++){
                    this.canvas.activePixel(pixel, color, false);
                    if(p < 0){
                        p += 2*dy;
                        continue;
                    }
                    pixel.y--;
                    p += 2*(dy - dx);
                }
            break;
        }
    },

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    getTimeStamp: function(){
      return performance.now()
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
