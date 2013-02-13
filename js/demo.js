var Graphing;
(function (Graphing) {
    var BarChart = (function () {
        function BarChart(container, data, width, height) {
            this.container = container;
            this.data = data;
            this.width = width;
            this.height = height;
            this.barHeight = height - 25;
        }
        BarChart.prototype.render = function () {
            var _this = this;
            var graph = d3.select(this.container).append("svg").attr("width", this.width).attr("height", this.height);
            var xScale = d3.scale.ordinal().domain(this.data.map(function (d) {
                return d.month;
            })).rangeBands([
                0, 
                this.width
            ], 0.1);
            var yScale = d3.scale.linear().domain([
                0, 
                d3.max(this.data, function (d) {
                    return d.value;
                })
            ]).range([
                0, 
                this.barHeight
            ]);
            var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
            graph.append("g").attr("class", "x axis").attr("transform", "translate(0," + (this.barHeight) + ")").call(xAxis);
            graph.selectAll(".bar").data(this.data).enter().append("rect").attr("x", function (d) {
                return xScale(d.month);
            }).attr("y", function (d) {
                return _this.barHeight - yScale(d.value);
            }).attr("width", xScale.rangeBand()).attr("height", function (d) {
                return yScale(d.value);
            }).style("fill", "steelblue");
        };
        return BarChart;
    })();
    Graphing.BarChart = BarChart;    
})(Graphing || (Graphing = {}));
