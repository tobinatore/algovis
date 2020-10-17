/** @module SieveOfEratosthenes */

/**
 * Function which runs the visualization of the
 * sieve of Eratosthenes.
 * @param {number} n - The number up to which primes should be found
 */
async function runSieve(n) {
  await resetRects();
  await highlightCode(1, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
  let num = 2;
  let marked = new Set();
  await highlightCode(2, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
  while (num * num <= n) {
    $("#nodes").html(
      "Marking multiples of " + num + " starting at " + num + "²."
    );
    await markNums(num, n, marked);
    await highlightCode(7, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
    for (let i = num + 1; i < n; i++) {
      await highlightCode(8, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
      if (!marked.has(i)) {
        await highlightCode(9, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
        num = i;
        await highlightCode(10, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
        break;
      }
    }
  }
  $("#nodes").html(
    num +
      "² is " +
      num * num +
      " which is bigger than " +
      n +
      ". The unmarked numbers are prime."
  );
}

/**
 * Marks all multiples of num starting from num² as not prime.
 * @param {number} num - The nummber from which the function starts
 * @param {number} max - The max. number which needs to be checked
 * @param {Set<number>} marked - A set of all marked numbers
 */
async function markNums(num, max, marked) {
  await highlightCode(3, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
  let add = num * num;
  await highlightCode(4, 100);
  marked.add(add);
  $("#nodes").html(
    "Marking multiples of " +
      num +
      " starting at " +
      num +
      "². (Current: " +
      add +
      ")"
  );
  await animateMarked(add);
  while (add <= max) {
    $("#nodes").html(
      "Marking multiples of " +
        num +
        " starting at " +
        num +
        "². (Current: " +
        add +
        ")"
    );
    await highlightCode(5, 100);
    await animateMarked(add);
    await highlightCode(6, DELAY * 2 > 1000 ? DELAY : DELAY * 2);
    add += num;
    marked.add(add);
  }
}

/**
 * Function which returns all numbers not in the "marked" set.
 * -> These are the prime numbers up to n.
 * @param {Set<number>} marked - A set of all marked numbers
 * @param {number} n - The number up to which we wanted to find the prime numbers
 * @returns {String} - All prime numbers up to "n", comma separated
 */
function getPrimes(marked, n) {
  let primes = [];
  for (let i = 2; i <= n; i++) {
    if (!marked.has(i)) {
      primes.push(i);
    }
  }
  return primes.join(", ");
}

/**
 * Colors the rects of marked numbers black.
 * @param {number} id - Number of the rect which should be colored
 */
async function animateMarked(id) {
  return new Promise((resolve) => {
    d3.select("#rect" + id)
      .transition()
      .duration(DELAY)
      .attr("fill", "#000");

    setTimeout(() => {
      resolve();
    }, DELAY);
  });
}

/**
 * Sets the fill of all rects to none.
 */
async function resetRects() {
  d3.selectAll("rect").attr("fill", "none");
}
