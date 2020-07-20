var PieChart=function(dataset, focus, id)
{
	// margin and radius
	var margin = {top:20, right:20, bottom:20, left:20}
	width = d3.select("#d3draw").node().getBoundingClientRect().width,
	height = d3.select("#d3draw	").node().getBoundingClientRect().height/1.3,
	radius = Math.min(width, height)/2;

	// arc generator
	var arc = d3.svg.arc()
	.outerRadius(radius -10)
	.innerRadius(radius/2);

	// label arc generator
	var labelArc = d3.svg.arc()
	.outerRadius(radius - 50)
	.innerRadius(radius - 50);

	// pie generator
	var pie = d3.layout.pie()
	.sort(null)
	.value(function(d){
		if (focus == "time")
		{
			return d.time
		}
		else if (focus == "numbers")
		{
			return d.numbers
		}
	})

	// setting colors
	var color = d3.scale.category10();

	// define svg
	var svg = d3.select("#"+id)
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + width/2 + "," + height/2 +")")
	.attr("class",id);

	// draw the final pie
	var path=svg.selectAll('path')
	.data(pie(dataset))
	.enter()
	.append('path')
	.attr({
		d:arc,
		fill:function(d,i){
			return color(d.data.language);
		}
	});

	// transform pie at the beginning
	path.transition()
	.duration(3000)
	.attrTween('d', function(d) {
		var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
		return function(t) {
			return arc(interpolate(t));
		};
	});

	var restOfTheData=function(){
		var text=svg.selectAll('text')
		.data(pie(dataset))
		.enter()
		.append("text")
		.transition()
		.duration(200)
		.attr("transform", function (d) {
			return "translate(" + arc.centroid(d) + ")";
		})
		.attr("dy", ".4em")
		.attr("text-anchor", "middle")
		.text(function(d){
			if (focus == "time")
			{
				return d.data.time;
			}
			else if (focus == "numbers")
			{
				return d.data.numbers
			}
		})
		.style({
			fill:'#fff',
			'font-size':'18px'
		});

		var legendRectSize=20;
		var legendSpacing=10;
		var legendHeight=legendRectSize+legendSpacing;


		var legend=svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr({
			class:'legend',
			transform:function(d,i){
    		//Just a calculation for x & y position
    		return 'translate(250,' + ((i*legendHeight)-165) + ')';
    	}
    });
		legend.append('rect')
		.attr({
			width:legendRectSize,
			height:legendRectSize,
			rx:20,
			ry:20
		})
		.style({
			fill:color,
			stroke:color
		});

		legend.append('text')
		.attr({
			x:30,
			y:15
		})
		.text(function(d){
			return d;
		}).style({
			fill: '#423b38',
			'font-size':'22px'
		});
		var title = ""
		if (focus == "time")
		{
			title = "Months Spent"
		}
		else if (focus == "numbers")
		{

			var title = "Number of Projects"
		}

		svg.append("text")
		.attr("x", -5)             
		.attr("y", -5)
		.attr("text-anchor", "middle")  
		.style("font-size", "22px") 
		.style("fill", "#423b38")  
		.text(title);
	};
	restOfTheData();
}

var programming_time =[
{"language":"Python", "time":25},
{"language":"C#", "time":3.5},
{"language":"Javascript","time":12.5},
{"language":"HTML5", "time":7},
{"language":"PHP","time":4},
{"language":"LateX", "time":3},
{"language":"PostgreSQL","time":2},
{"language":"MongoDB","time":1},
{"language":"CSS","time":6.5},
{"language":"R","time":9}]

PieChart(programming_time,"time");

var projects_number =[
{"language":"Python","numbers":5},
{"language":"C#","numbers":3},
{"language":"Javascript","numbers":5},
{"language":"HTML5","numbers":7},
{"language":"PHP","numbers":2},
{"language":"LateX","numbers":4},
{"language":"PostgreSQL","numbers":1},
{"language":"MongoDB","numbers":1},
{"language":"CSS","numbers":4},
{"language":"R","numbers":5}]


//PieChart(projects_number,"numbers")

//PieChart(programming_time,"time")

window.onload = PieChart(programming_time,"time","timepiechart");
window.onload = PieChart(projects_number,"numbers","numberspiechart");