declare var d3: any;

module Graphing
{
  export class BarChart{
		barHeight:number;
		constructor(public container: string, public data: any[], public width: number, public height: number){
			this.barHeight = height - 25;
		}
			
		render()
		{
			var graph = d3.select(this.container).append("svg")
					.attr("width", this.width)
					.attr("height", this.height);
			
			var xScale = d3.scale.ordinal()
					.domain(this.data.map(d=>{return d.month}))
					.rangeBands([0,this.width], .1);
			
			var yScale = d3.scale.linear()
					.domain([0,d3.max(this.data, d=>{return d.value})])
					.range([0,this.barHeight]);
					
			var xAxis = d3.svg.axis().scale(xScale).orient("bottom");			
			
			graph.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (this.barHeight) + ")")
				.call(xAxis);
				
			graph.selectAll(".bar")
				.data(this.data)
				.enter()
					.append("rect")
						.attr("width", xScale.rangeBand())
						.style("fill", "steelblue")
						.attr("x", d=> xScale(d.month))
						.attr("y", this.barHeight)
						.transition()
						.duration(750)
						.attr("height", d => yScale(d.value))
						.attr("y", d => this.barHeight - yScale(d.value));
			
			}
		
	}
}