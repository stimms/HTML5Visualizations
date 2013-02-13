var Graphing;
(function (Graphing) {
    var BarChart = (function () {
        function BarChart(container, data, width, height) {
            this.container = container;
            this.data = data;
            this.width = width;
            this.height = height;
        }
        BarChart.prototype.render = function () {
            var paper = Raphael(this.container, this.width, this.height);
            var maximumHeight = this.height - 25;
            var columnWidth = (this.width - (5 * this.data.length)) / this.data.length;
            var maximumValue = this.findMaximum(this.data);
            var unitHeight = maximumHeight / maximumValue;
            for(var index = 0; index < this.data.length; index++) {
                var item = this.data[index];
                var rectangle = paper.rect(index * (columnWidth + 5), maximumHeight - (unitHeight * item.value), columnWidth, unitHeight * item.value);
                rectangle.attr("fill", "#b3b3ff");
                rectangle.attr("stroke", "black");
                rectangle.attr("stroke-width", 2);
                paper.text((index * (columnWidth + 5)) + (columnWidth / 2), maximumHeight + 10, item.month);
            }
        };
        BarChart.prototype.findMaximum = function (data) {
            var maximumValue = 0;
            data.forEach(function (item) {
                if(maximumValue < item.value) {
                    maximumValue = item.value;
                }
            });
            return maximumValue;
        };
        return BarChart;
    })();
    Graphing.BarChart = BarChart;    
})(Graphing || (Graphing = {}));
