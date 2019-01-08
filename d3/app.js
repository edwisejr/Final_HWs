var width = parseInt(d3.select("#scatter").style("width"));
var height = width - width /5;
var margin = 20;
var labelArea = 60;
var bottomp = 0;
var leftp = 0;

var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

var circRadius;
function crGet() {
  if (width <= 530) {
    circRadius = 5;
  }
  else {
    circRadius = 10;
  }
}
crGet();

svg.append("g").attr("class", "xText");
var xText = d3.select(".xText");

   xText.attr(
    "transform",
    "translate(" +
      ((width - labelArea) / 2 + labelArea) +
      ", " +
      (height - margin - bottomp) +
      ")"
  );

xText
  .append("text")
  .attr("y", -26)
  .attr("data-name", "poverty")
  .attr("data-axis", "x")
  .attr("class", "x")
  .text("In Poverty (%)");

var leftTextX = margin + leftp;
var leftTextY = (height + labelArea) / 2 - labelArea;

svg.append("g").attr("class", "yText");

var yText = d3.select(".yText");

  yText.attr(
    "transform",
    "translate(" + leftTextX + ", " + leftTextY + ")rotate(-90)"
  );

yText
  .append("text")
  .attr("y", 26)
  .attr("data-name", "obesity")
  .attr("data-axis", "y")
  .attr("class", "y axis label")
  .text("Obese (%)");


d3.csv("assets/data/data.csv").then(function(data) {
  visualize(data);
});

function visualize(data) {

  var X = "poverty";
  var Y = "obesity";
  
  var xMin;
  var xMax;
  var yMin;
  var yMax;


  function xMinMax() {

    xMin = d3.min(data, function(d) {
      return parseFloat(d[X]) * 0.90;
    });

 
    xMax = d3.max(data, function(d) {
      return parseFloat(d[X]) * 1.10;
    });
  }

  function yMinMax() {
   
    yMin = d3.min(data, function(d) {
      return parseFloat(d[Y]) * 0.90;
    });

    yMax = d3.max(data, function(d) {
      return parseFloat(d[Y]) * 1.10;
    });
  }


  xMinMax();
  yMinMax();

  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
  
    .range([height - margin - labelArea, margin]);

 
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  function tickCount() {
    if (width <= 500) {
      xAxis.ticks(5);
      yAxis.ticks(5);
    }
    else {
      xAxis.ticks(10);
      yAxis.ticks(10);
    }
  }
  tickCount();
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");
    var theCircles = svg.selectAll("g theCircles").data(data).enter();

    theCircles
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d[X]);
      })
      .attr("cy", function(d) {
        return yScale(d[Y]);
      })
      .attr("r", circRadius)
      .attr("class", function(d) {
        return "stateCircle " + d.abbr;
      })
}
