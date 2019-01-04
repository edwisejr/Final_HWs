
var tableData = data3;
var tbodya = d3.select("tbody");

function buildTable(data) {
  tbodya.html("");
  data.forEach((dataRow) => {
    var rowa = tbodya.append("tr");
    Object.values(dataRow).forEach((val) => {
      var cell = rowa.append("td");
        cell.text(val);
      }
    );
  });
}

function handleClick() {
  d3.event.preventDefault();
  var date = d3.select("#datetime").property("value");
  let filteredData = tableData;
  if (date) {
   filteredData = filteredData.filter(row => row.datetime === date);
  }
  buildTable(filteredData);
}
d3.selectAll("#filter-btn").on("click", handleClick);
 buildTable(tableData);
