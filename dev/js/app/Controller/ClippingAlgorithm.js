
App.define('Controller.ClippingAlgorithm', {

    timeStamp:0,

    sutherlandHodgman: function(polygon, viewPort){
        var newPolygon = null;

        this.timeStamp = this.getTimeStamp();

        newPolygon = this.clipTopSide(viewPort[0].y, polygon);
        newPolygon = this.clipRightSide(viewPort[1].x, newPolygon);
        newPolygon = this.clipBottomSide(viewPort[2].y, newPolygon);
        newPolygon = this.clipLeftSide(viewPort[0].x, newPolygon);

        this.timeStamp = this.getTimeStamp() - this.timeStamp;

        return newPolygon;
    },

    clipLeftSide: function(x, polygon){

        var outPolygon = [];

        for(var i = 0; i < polygon.length; i++){

            //Pega cada lado do polígono
            if(i + 1 === polygon.length)
                polygonEdge = [polygon[i], polygon[0]];
            else
                polygonEdge = [polygon[i], polygon[i+1]];

            //caso 1, os dois vertices estão dentro, guarda-os
            if(polygonEdge[0].x >= x && polygonEdge[1].x >= x){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
                continue;
            }

            //caso 2, guarda apenas o primeiro vertice, pois está dentro
            if(polygonEdge[0].x >= x && polygonEdge[1].x < x){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                outPolygon.push(this.newPoint(
                    x, this.getYOfLine(x, polygonEdge[0], polygonEdge[1])
                ));
            }

            //caso 3, nenhum vertice está dentro, não os guarda
            if(polygonEdge[0].x < x && polygonEdge[1].x < x){
                continue;
            }

            //caso 4, guarda apenas o segundo vertice, pois está dentro
            if(polygonEdge[0].x < x && polygonEdge[1].x >= x){

                outPolygon.push(this.newPoint(
                    x, this.getYOfLine(x, polygonEdge[0], polygonEdge[1])
                ));

                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
            }
        }

        return outPolygon;
    },

    clipTopSide: function(y, polygon){

        var outPolygon = [];

        for(var i = 0; i < polygon.length; i++){

            //Pega cada lado do polígono
            if(i + 1 === polygon.length)
                polygonEdge = [polygon[i], polygon[0]];
            else
                polygonEdge = [polygon[i], polygon[i+1]];

            //caso 1, os dois vertices estão dentro, guarda-os
            if(polygonEdge[0].y >= y && polygonEdge[1].y >= y){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
                continue;
            }

            //caso 2, guarda apenas o primeiro vertice, pois está dentro
            if(polygonEdge[0].y >= y && polygonEdge[1].y < y){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                outPolygon.push(this.newPoint(
                    this.getXOfLine(y, polygonEdge[0], polygonEdge[1]), y
                ));
            }

            //caso 3, nenhum vertice está dentro, não os guarda
            if(polygonEdge[0].y < y && polygonEdge[1].y < y){
                continue;
            }

            //caso 4, guarda apenas o segundo vertice, pois está dentro
            if(polygonEdge[0].y < y && polygonEdge[1].y >= y){

                outPolygon.push(this.newPoint(
                    this.getXOfLine(y, polygonEdge[0], polygonEdge[1]), y
                ));

                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
            }
        }

        return outPolygon;
    },

    clipRightSide: function(x, polygon){

        var outPolygon = [];

        for(var i = 0; i < polygon.length; i++){

            //Pega cada lado do polígono
            if(i + 1 === polygon.length)
                polygonEdge = [polygon[i], polygon[0]];
            else
                polygonEdge = [polygon[i], polygon[i+1]];

            //caso 1, os dois vertices estão dentro, guarda-os
            if(polygonEdge[0].x <= x && polygonEdge[1].x <= x){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
                continue;
            }

            //caso 2, guarda apenas o primeiro vertice, pois está dentro
            if(polygonEdge[0].x <= x && polygonEdge[1].x > x){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                outPolygon.push(this.newPoint(
                    x, this.getYOfLine(x, polygonEdge[0], polygonEdge[1])
                ));
            }

            //caso 3, nenhum vertice está dentro, não os guarda
            if(polygonEdge[0].x > x && polygonEdge[1].x > x){
                continue;
            }

            //caso 4, guarda apenas o segundo vertice, pois está dentro
            if(polygonEdge[0].x > x && polygonEdge[1].x <= x){

                outPolygon.push(this.newPoint(
                    x, this.getYOfLine(x, polygonEdge[0], polygonEdge[1])
                ));

                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
            }
        }

        return outPolygon;
    },

    clipBottomSide: function(y, polygon){

        var outPolygon = [];

        for(var i = 0; i < polygon.length; i++){

            //Pega cada lado do polígono
            if(i + 1 === polygon.length)
                polygonEdge = [polygon[i], polygon[0]];
            else
                polygonEdge = [polygon[i], polygon[i+1]];

            //caso 1, os dois vertices estão dentro, guarda-os
            if(polygonEdge[0].y <= y && polygonEdge[1].y <= y){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
                continue;
            }

            //caso 2, guarda apenas o primeiro vertice, pois está dentro
            if(polygonEdge[0].y <= y && polygonEdge[1].y > y){
                if(outPolygon.indexOf(polygonEdge[0]) <= -1) outPolygon.push(polygonEdge[0]);
                outPolygon.push(this.newPoint(
                    this.getXOfLine(y, polygonEdge[0], polygonEdge[1]), y
                ));
            }

            //caso 3, nenhum vertice está dentro, não os guarda
            if(polygonEdge[0].y > y && polygonEdge[1].y > y){
                continue;
            }

            //caso 4, guarda apenas o segundo vertice, pois está dentro
            if(polygonEdge[0].y > y && polygonEdge[1].y <= y){

                outPolygon.push(this.newPoint(
                    this.getXOfLine(y, polygonEdge[0], polygonEdge[1]), y
                ));

                if(outPolygon.indexOf(polygonEdge[1]) <= -1) outPolygon.push(polygonEdge[1]);
            }
        }

        return outPolygon;
    },

    getXOfLine: function(y, point1, point2){
        return (((y - point1.y)*(point2.x - point1.x))/(point2.y - point1.y)) + point1.x;
    },

    getYOfLine: function(x, point1, point2){
        return (((x - point1.x)*(point2.y - point1.y))/(point2.x - point1.x)) + point1.y;
    },

    getTimeStamp: function(){
      return performance.now()
    },

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    init: function(){
        this.util = this._appRoot_.get('Util');
    }

});
