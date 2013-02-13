declare var Raphael: any;

module Graphing
{
	export class BarChart{
	
		constructor(public container: string, public data: any[], public width: number, public height: number){	}
		render()
		{
			var paper = Raphael(this.container, this.width, this.height);
			var maximumHeight = this.height - 25;
			var columnWidth = (this.width - (5*this.data.length)) /this.data.length;
			var maximumValue = this.findMaximum(this.data);
			var unitHeight = maximumHeight/maximumValue;
			
			for(var index = 0; index< this.data.length; index++)
			{ 
				var item = this.data[index];
				var rectangle = paper.rect( index * (columnWidth + 5), maximumHeight - (unitHeight * item.value), columnWidth, unitHeight * item.value);
				rectangle.attr("fill", "#b3b3ff");
				rectangle.attr("stroke", "black");
				rectangle.attr("stroke-width", 2);
				paper.text((index * (columnWidth + 5)) + (columnWidth/2), maximumHeight + 10, item.month);
			}
		}
		
		private findMaximum(data)
		{
			var maximumValue = 0;
			
			data.forEach(item=>
			{
				if(maximumValue<item.value)
				{
					maximumValue=item.value;
				}
			});
			return maximumValue;
		}
	}
}