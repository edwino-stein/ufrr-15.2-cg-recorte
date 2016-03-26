App.define('Controller.Main', {

    svg: 'View.Svg',
    canvas: 'View.Canvas',
    raster: 'Controller.RasterAlgorithms',
    fill: 'Controller.FillAlgorithms',
    clipping: 'Controller.ClippingAlgorithm',

    $time: '#time',
    fillColor: null,
    borderColor: null,


    render: function(){
        
        var polygon = this.svg.getPolygon(),
            clippedPolygon,
            time = 0;

        this.canvas.clearFrame();

        //Recorta o poligono
        clippedPolygon = this.clipping.sutherlandHodgman(polygon.vertices, this.svg.getViewPort().vertices);
        this.$time.find('.clipping').html((this.clipping.timeStamp).toFixed(3));

        //Rasteriza o poligono e a janela
        time = this.raster.polygon(clippedPolygon, this.borderColor);
        time += this.rasterViewPort();
        this.$time.find('.raster').html((time).toFixed(3));

        //Preenche o poligono
        time = this.fill.floodFill(polygon, this.fillColor);
        this.$time.find('.fill').html((time).toFixed(3));

        //Atualiza o quadro
        this.canvas.update();
    },

    rasterViewPort: function(){
        var viewPort = this.svg.getViewPort();
        return this.raster.polygon(viewPort.vertices, viewPort.stroke);
    },

    ready: function(){
        var me = this;
        $('#panel .polygon').click(function(){
            me.svg.setShape($(this).data('figure'));
            me.render();
        });

        me.fillColor = new me.util.Color(105, 251, 105);
        me.borderColor = new me.util.Color(32, 138, 32);

        me.svg.setShape(0);
        me.render();
    },

    init: function(){
        var me = this;
        me.svg = me._appRoot_.get(me.svg);
        me.canvas = me._appRoot_.get(me.canvas);
        me.raster = me._appRoot_.get(me.raster);
        me.clipping = me._appRoot_.get(me.clipping);
        me.fill = me._appRoot_.get(me.fill);
        me.util = me._appRoot_.get('Util');
        me.$time = $(me.$time);
    }

});
