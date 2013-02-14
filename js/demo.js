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
            graph.selectAll(".bar").data(this.data).enter().append("rect").attr("width", xScale.rangeBand()).style("fill", "steelblue").attr("x", function (d) {
                return xScale(d.month);
            }).attr("y", this.barHeight).on("mouseover", function (d) {
                var colourScale = d3.scale.category10();
                var bar = d3.select(this);
                var runningTotal = parseFloat(bar.attr("y"));
                graph.selectAll(".weekBar").data(d.weeks).enter().append("rect").attr("class", "weekBar").attr("width", xScale.rangeBand()).attr("x", bar.attr("x")).attr("y", function (b) {
                    var barHeight = yScale(d.value * b / 100);
                    runningTotal += barHeight;
                    return runningTotal - barHeight;
                }).attr("height", function (b) {
                    return yScale(d.value * b / 100);
                }).style("fill", function (x, y) {
                    return colourScale(y);
                });
                graph.append("rect").attr("width", xScale.rangeBand()).attr("height", bar.attr("height")).attr("x", bar.attr("x")).attr("y", bar.attr("y")).style("opacity", ".01").attr("class", "mouseOverCover").on("mouseout", function (d, i) {
                    graph.selectAll(".weekBar").remove();
                    graph.selectAll(".mouseOverCover").remove();
                });
            }).transition().duration(750).attr("height", function (d) {
                return yScale(d.value);
            }).attr("y", function (d) {
                return _this.barHeight - yScale(d.value);
            });
        };
        return BarChart;
    })();
    Graphing.BarChart = BarChart;    
})(Graphing || (Graphing = {}));
