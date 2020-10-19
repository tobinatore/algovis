/** @module EuclideanGCD */

/**
 * Function for visualizing the Euclidian algorithm
 * for finding the gcd of 2 numbers.
 * @param {number} n - First number
 * @param {number} m - Second number
 */
async function runEuclidean(n, m) {
  let row = 1;
  let a = n;
  let b = m;
  let rem = 0;
  let div = 0;

  await buildFirstRow(n, m);

  if (n % m != 0) {
    while (m != 0) {
      if (row != 1) {
        await transitionRow(row, rem, n);
      }

      rem = n % m;
      div = Math.floor(n / m);
      addText(div, rem, row, m);

      n = m;
      m = rem;
      row++;
    }
    await explain("The GCD of " + a + " and " + b + " is " + n);
    return;
  }
  await explain(n + " mod " + m + " = 0 --> " + m + " is the GCD.");
}

/**
 * Function for building the first row,
 * needed so that transitionRow(...) can
 * clone the SVG elements it needs.
 * @param {number} n - First number
 * @param {number} m - Second number
 */
async function buildFirstRow(n, m) {
  let group = svg.append("g");

  group
    .append("text")
    .text(n + " / ")
    .attr("y", 25)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr(
      "transform",
      "translate(" +
        (w / 2 - (n.toString().length + 2 + m.toString().length) * 11) +
        ",0)"
    );

  group
    .append("text")
    .text(m)
    .attr("y", 25)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr(
      "transform",
      "translate(" + (w / 2 - (m.toString().length + 1) * 11) + ",0)"
    )
    .attr("id", "m1");
}

/**
 * Function for animating the remainder and
 * the divisor sliding into place in the
 * next row.
 * @param {number} row - The number of the row the elements will slide to
 * @param {number} rem - The remainder of the previous row
 * @param {number} n - The divisor of the previous row
 */
async function transitionRow(row, rem, n) {
  await timeout(200);
  return new Promise((resolve) => {
    let mText = clone("#m" + (row - 1));
    let remText = clone("#rem" + Math.round(row - 1));
    mText
      .transition()
      .duration(DELAY)
      .attr("y", 25 * row)
      .attr("id", "n" + row)
      .attr("text-decoration", "none")
      .attr("transform", function () {
        return (
          "translate(" +
          (w / 2 - (n.toString().length + 2 + rem.toString().length) * 11) +
          ",0)"
        );
      });

    remText
      .transition()
      .duration(DELAY)
      .attr("y", 25 * row)
      .attr("id", "m" + row.toString())
      .attr("text-decoration", "")
      .attr("transform", function () {
        return (
          "translate(" + (w / 2 - (rem.toString().length + 1) * 11) + ",0)"
        );
      });

    svg
      .append("text")
      .text("/")
      .attr("y", 25 * row)
      .attr("transform", function () {
        return (
          "translate(" + (w / 2 - (rem.toString().length + 2) * 11) + ",0)"
        );
      })
      .attr("opacity", 0)
      .transition()
      .duration(1)
      .delay(DELAY)
      .attr("opacity", 1);

    setTimeout(() => {
      resolve();
    }, DELAY);
  });
}

/**
 * Adds text elements for the rest of the equation to each row.
 * @param {number} div - The quotient of n / m (integer division)
 * @param {number} rem - The remainder of n / m (integer division)
 * @param {number} row - The row the elements get added to
 * @param {number} m - The divisor used in the current row
 */
function addText(div, rem, row, m) {
  svg
    .append("text")
    .text("=")
    .attr("y", 25 * row)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .attr("transform", function () {
      return "translate(" + w / 2 + ",0)";
    });

  svg
    .append("text")
    .text(div + ", Remainder: ")
    .attr("y", 25 * row)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .attr("transform", function () {
      return "translate(" + (w / 2 + 15) + ",0)";
    });

  svg
    .append("text")
    .text(rem)
    .attr("y", 25 * row)
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("fill", "black")
    .attr("text-decoration", function () {
      return m % rem == 0 ? "underline" : "";
    })
    .attr("transform", function () {
      return "translate(" + (w / 2 + (div.toString().length + 12) * 11) + ",0)";
    })
    .attr("id", "rem" + row);
}

/**
 * Clones an SVG element.
 * @param {String} selector - The id or class of the element to clone
 * @returns {Object} - The d3-selection of the cloned elemnt
 */
function clone(selector) {
  var node = d3.select(selector).node();
  return d3.select(
    node.parentNode.insertBefore(node.cloneNode(true), node.nextSibling)
  );
}

/**
 * Updates the explanation text.
 * @param {String} text - The text to display
 */
async function explain(text) {
  $("#nodes").html(text);
}
