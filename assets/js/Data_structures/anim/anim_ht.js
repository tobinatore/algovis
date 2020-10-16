/** @module HashTableAnimation */

function labelBuckets(bars, size, barPadding) {
  bars
    .append("text")
    .text("")
    .attr("id", function (d, i) {
      return "text" + i;
    })
    .attr("transform", function (d, i) {
      return "translate(" + (w / size - barPadding) / 2 + ",0)";
    })
    .attr("y", "45")
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .attr("text-anchor", "middle");
  // add the index of each bucket
  bars
    .append("text")
    .text(function (d, i) {
      return "Index " + i;
    })
    .attr("id", function (d, i) {
      return "index-text" + i;
    })
    .attr("transform", function (d, i) {
      return "translate(" + (w / size - barPadding) / 2 + ",0)";
    })
    .attr("y", "75")
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .attr("text-anchor", "middle");
}

function buildBucketsSVG(data, startPos, barPadding, size) {
  var bars = svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("g")
    .attr("id", function (d, i) {
      return "g" + i;
    })
    .attr("transform", function (d, i) {
      return "translate(" + startPos * i + ",0)";
    })
    .attr("width", w / size - barPadding)
    .attr("y", "25");

  // generate representation of the buckets
  bars
    .append("rect")
    .attr("width", w / size - barPadding)
    .attr("height", 30)
    .attr("y", "25")
    .attr("fill", "none")
    .attr("stroke", "#171717")
    .attr("stroke-width", "2px")
    .attr("id", function (d, i) {
      return "rect" + i;
    });

  return bars;
}

/**
 * Initializes a visual representation of the hashtable.
 * @param {number} size -  How many buckets the hashtable has.
 */
async function initializeAnim(size) {
  let data = [];
  let startPos = w / size;
  let barPadding = 7;

  for (let i = 0; i < size; i++) {
    data.push(0);
  }

  var bars = buildBucketsSVG(data, startPos, barPadding, size);

  // add the text component which will display the data stored in the bucket
  labelBuckets(bars, size, barPadding);
}

/**
 * Resets color and stroke width of all rectangles.
 */
async function removeColors() {
  d3.selectAll("rect").attr("stroke", "#171717").attr("stroke-width", "2px");
}

/**
 * Highlights the bucket at index 'key' by setting the stroke color to red
 * and the stroke width to 5px.
 * @param {number} key - The index of the bucket to highlight.
 */
async function highlightBucket(key) {
  d3.select("#rect" + key)
    .transition()
    .duration(300)
    .attr("stroke", "#CC1616")
    .attr("stroke-width", "5px");
}

/**
 * Updates the text inside bucket 'key' to 'data'.
 * @param {number} key - The index of the bucket whose text gets updated.
 * @param {number} data - The data the text will be updated to.
 */
async function updateText(key, data) {
  d3.select("#text" + key).text(data);
}
