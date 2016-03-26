App.define('View.Svg', {

    $domObj: '#svg',

    availableShape: [
        {
            type: 'polygon',
            points: '150,10 150,275 390,275',
            seed: '200,150'
        },
        {
            type: 'polygon',
            points: '110,295 110,355 165,355 165,399 235,399 235,355 290,355 290,295 235,295 235,250 165,250 165,295',
            seed: '200,295'
        },
        {
            type: 'polygon',
            points: '220,120 110,10 0,120 40,250 160,250',
            seed: '130,150'
        },
        {
            type: 'polygon',
            points: '90,0 90,160 150,160 150,65 250,65 250,160 310,160 310,0',
            seed: ['120,110', '280,110']
        },
    ],

    viewPort: {
        type: 'rect',
        x: 75,
        y: 75,
        width: 250,
        height: 250,
        strokeRGB: {red: 255, green: 103, blue: 103},
        fill: 'transparent',
        strokeWidth: '1px',
        stroke: '#FF6767'
    },

    fill: '#00CE9D',
    stroke: '#006D53',
    strokeWidth: '1px',

    shapeSelected: '',
    shapeObj: null,
    viewPortObj: null,

    setShape: function(name){

        if(!this.availableShape.hasOwnProperty(name)) return;
        if(this.shapeObj !== null) this.shapeObj.remove();
        this.shapeSelected = name;

        var shape = this.availableShape[name],
            exclude = ['type', 'seed'];

        this.shapeObj = document.createElementNS('http://www.w3.org/2000/svg', shape.type);

        for(var i in shape){
            if(exclude.indexOf(i) >= 0) continue;
            this.shapeObj.setAttribute(i, shape[i]);
        }

        this.shapeObj.setAttribute('fill', this.fill);
        this.shapeObj.setAttribute('stroke', this.stroke);
        this.shapeObj.setAttribute('stroke-width', this.strokeWidth);

        this.$domObj.find('#shape')[0].appendChild(this.shapeObj);
    },

    getPolygon: function(){

        var polygon = this.availableShape[this.shapeSelected];

        if(typeof(polygon) == 'undefined') return null;

        var points = polygon.points.split(' '),
            vertices = [],
            seeds;

        for(var i in points)
            vertices.push(this.stringToPoint(points[i]));

        if(polygon.seed instanceof Array){
            seeds = [];
            for(var i in polygon.seed)
                seeds.push(this.stringToPoint(polygon.seed[i]));
        }
        else{
            seeds = this.stringToPoint(polygon.seed);
        }

        return {
            type: 'polygon',
            vertices: vertices,
            seed: seeds
        };
    },

    stringToPoint: function(input){
        input = input.split(',');
        var x = parseInt(input[0]),
            y = parseInt(input[1]);

        return this.newPoint(
            !isNaN(x) ? x : 0,
            !isNaN(y) ? y : 0
        );
    },

    getViewPort: function(){
        return {
            type: this.viewPort.type,
            vertices:[
                this.newPoint(this.viewPort.x, this.viewPort.y),
                this.newPoint(this.viewPort.x + this.viewPort.width, this.viewPort.y),
                this.newPoint(this.viewPort.x + this.viewPort.width, this.viewPort.y + this.viewPort.height),
                this.newPoint(this.viewPort.x, this.viewPort.y + this.viewPort.height)
            ],
            seed: null,
            stroke: this.viewPort.strokeRGB
        };
    },

    drawViewPort: function(){
        var exclude = ['type', 'strokeRGB'];

        this.viewPortObj = document.createElementNS('http://www.w3.org/2000/svg', this.viewPort.type);
        for(var i in this.viewPort){
            if(exclude.indexOf(i) >= 0) continue;
            this.viewPortObj.setAttribute(i, this.viewPort[i]);
        }

        this.$domObj[0].appendChild(this.viewPortObj);
    },

    newPoint: function(x, y){
        return new this.util.Point(x, y);
    },

    ready: function(){
        this.drawViewPort();
    },

    init: function(){
        var me = this;
        me.$domObj = $(me.$domObj);
        me.util = me._appRoot_.get('Util');
    }
});
