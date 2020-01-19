// Plot Width
var width = parseInt(d3.select("#scatter").style("width"));

// Plot Height
var height = width - width / 3.9;

// Plot Margins
var margin = 20;

// Area for Axis Labels
var labelArea = 110;

// Padding for Left & Bottom Axes
var tPadBot = 40;
var tPadLeft = 40;

// SVG Container Variable
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "chart");

// Variable for Circle Radius
var Radius;

// Function to Define Cirle Radius
function getRadius() {
  if (width <= 530) {
    Radius = 5;
  }
  else {
    Radius = 10;
  }
}

//  Function to Define Circle Radius
getRadius();

// CSV Data
d3.csv("https://raw.githubusercontent.com/mjknj18/Demographic-Health-Risk-Analysis/master/assets/data/data.csv").then(function(data) {
  visualize(data);
});

// Define Function for Plot Generation
function visualize(theData) {

  // Define Variables for Chosen X & Y Axes
  var curX = "poverty";
  var curY = "healthcare";

  // Define Blank Variables for Axis Min & Max Values
  var xMin;
  var xMax;
  var yMin;
  var yMax;

  // Set X Axis Min & Max
  function xMinMax() {
    xMin = d3.min(theData, function(d) {
    return parseFloat(d[curX]) * 0.90})

    xMax = d3.max(theData, function(d) {
    return parseFloat(d[curX]) * 1.10})}

  // Set Y Axis Min & Max
  function yMinMax() {
    yMin = d3.min(theData, function(d) {
    return parseFloat(d[curY]) * 0.90})

    yMax = d3.max(theData, function(d) {
    return parseFloat(d[curY]) * 1.10})}

  // Set Axis Min & Max Values
  xMinMax();
  yMinMax();

  // X Axis Range
  var xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([margin + labelArea, width - margin]);

  // Y Axis Range
  var yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([height - margin - labelArea, margin]);

  // Define Variables for Axes & Apply Axis Range Variables
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // Set Axis Tick Count
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

  // Set Axis Tick Count
  tickCount();

  // Append X Axis to SVG Container
  svg
    .append("g")
    .call(xAxis)
    .attr("class", "xAxis")
    .attr("transform", "translate(0," + (height - margin - labelArea) + ")");

  // Append Y Axis to SVG Container
  svg
    .append("g")
    .call(yAxis)
    .attr("class", "yAxis")
    .attr("transform", "translate(" + (margin + labelArea) + ", 0)");

    // Define Variable for All Circle Objects
    var circles = svg.selectAll("g circles").data(theData).enter();

    // Create Cirlce for Each Data Point
    circles
        .append("circle")
        .attr("cx", function(d) {return xScale(d[curX])})
        .attr("cy", function(d) {return yScale(d[curY])})
        .attr("r", Radius)
        .attr("class", function(d) {return "stateCircle " + d.abbr})

    // State Abbreviations
    circles
        .append("text")
        .attr("x", function(d) {return xScale(d[curX]) - Radius/2 - 2.5})
        .attr("y",  function(d) {return yScale(d[curY]) + Radius/2 - 1})
        .text(function(d) {return d.abbr})
        .attr("font-size", "10px")

    // X Axis Label
    svg
        .append("text")
        .attr("x", width / 2)
        .attr("y",  height - labelArea + 15)
        .text("In Poverty (%)")
        .attr("font-size", "15px")

    // Y Axis Label 
    svg
        .append("text")
        .attr("x", height / 2 * -1)
        .attr("y",  labelArea - 15)
        .text("Lacks Healthcare (%)")
        .attr("font-size", "15px")
        .attr("transform", "translate(0,0) rotate(-90)")
}
    // @sedrakurdi