var dataset =[{
  "language":"Python",
  "title":"Big Boss",
  "type": "academic",
  "time": 2
},
{
  "language":"C#",
  "title":"Jr Dev",
  "type": "work",
  "time": 3
},
{
  "language":"R",
  "title":"Jr Dev",
  "type": "personal",
  "time": 1
}]

// margin and radius
var margin = {top:20, right:20, bottom:20, left:20}
width = 500,
height = 500,
radius = Math.min(width, height)/2;

// arc generator
var arc = d3.svg.arc()
.outerRadius(radius -10)
.innerRadius(100);

// label arc generator
var labelArc = d3.svg.arc()
.outerRadius(radius - 50)
.innerRadius(100);

// pie generator
var pie = d3.layout.pie()
.sort(null)
.value(function(d){return d.time});


// setting colors
var color = d3.scale.category10();

// define svg
var svg = d3.select("#piechart")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width/2 + "," + height/2 +")");

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
.duration(1000)
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
    return d.data.time;
  })
  .style({
    fill:'#fff',
    'font-size':'10px'
  });

  var legendRectSize=20;
  var legendSpacing=7;
  var legendHeight=legendRectSize+legendSpacing;


  var legend=svg.selectAll('.legend')
  .data(color.domain())
  .enter()
  .append('g')
  .attr({
    class:'legend',
    transform:function(d,i){
    //Just a calculation for x & y position
    return 'translate(-35,' + ((i*legendHeight)-65) + ')';
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
    fill: 'white',
    'font-size':'14px'
  });
};

restOfTheData();