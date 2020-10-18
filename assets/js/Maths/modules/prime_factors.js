/** @module PrimeFactors */

/**
 * Finds prime decompisition of a given number.
 * @param {number} n - The number which the prime decomposition should be found for
 */
async function findPrimeFactors(n) {
  let primes = [];
  let top = { name: n, parent: null, children: [] };
  let root = top;
  let orig = n;
  let data = undefined;
  [n, top] = await checkTwo(n, top, data, root, primes);
  explain(n + " mod 2 ≠ 0 --> check mod 3 next");
  await timeout(DELAY);
  let i = 0;
  await highlightCode(4, 200);
  [i, n, top] = await checkOtherNumbers(n, top, root, data, primes);
  explain(i + " > √" + n + "( = " + Math.sqrt(n) + " )");
  await timeout(DELAY * 1.2);
  await highlightCode(8, 200);
  await checkLastNum(n, top, primes, orig);

  data = root;
  console.log(data);
  clearAll();
  await buildTree(data);
}

/**
 * Checks if the last found number is a prime.
 * @param {number} n - The number to check
 * @param {Object} top - The parent node of the current tree node
 * @param {number[]} primes - List of primes found so far
 * @param {number} orig - The number for which to find the prime decomposition
 */
async function checkLastNum(n, top, primes, orig) {
  if (n > 2) {
    explain(n + " > 2 --> has to be prime");
    await highlightCode(9);
    await timeout(DELAY);
    top.children.push({ name: String(n), parent: top });
    primes.push(n);
    explain("Prime factors of " + orig + " are: " + primes);
  } else {
    explain(n + " < 2 --> is not prime");
    await timeout(DELAY);
    top.parent.children.splice(1, 1);
    explain("Prime factors of " + orig + " are: " + primes);
  }
}

/**
 * Checks if and how often 2 is a prime factor of the number
 * @param {number} n - The number to check
 * @param {Object} top - The parent node of the current tree node
 * @param {Object} data - The tree
 * @param {Object} root -The root node of the tree
 * @param {number[]} primes - List of all prime factors found so far
 */
async function checkTwo(n, top, data, root, primes) {
  await highlightCode(1, 200);
  while (n % 2 == 0) {
    await highlightCode(2, 200);
    explain(
      n + " mod 2 = 0 --> divide " + n + " by 2 and add 2 as a prime factor"
    );
    top.children.push(
      { name: "2", parent: top, children: [] },
      { name: String(n / 2), parent: top, children: [] }
    );
    n /= 2;
    primes.push(2);
    top = top.children[1];
    data = root;
    clearAll();
    await highlightCode(3);
    buildTree(data);
    await timeout(DELAY);
  }
  return [n, top];
}

/**
 * Checks which other numbers are prime factors of n.
 * @param {number} n - The number to check
 * @param {Object} top - The parent node of the current tree node
 * @param {Object} root -The root node of the tree
 * @param {Object} data - The tree
 * @param {number[]} primes - List of all prime factors found so far
 */
async function checkOtherNumbers(n, top, root, data, primes) {
  for (var i = 3; i < Math.sqrt(n); i += 2) {
    await highlightCode(5);
    while (n % i == 0) {
      explain(
        n +
          " mod " +
          i +
          " = 0 -> divide " +
          n +
          " by " +
          i +
          " and add " +
          i +
          " as a prime factor"
      );
      await highlightCode(6, 200);
      top.children.push(
        { name: String(i), parent: top, children: [] },
        { name: String(n / i), parent: top, children: [] }
      );
      top = top.children[1];
      n /= i;
      primes.push(i);
      data = root;
      clearAll();
      await highlightCode(7);
      buildTree(data);
      await timeout(DELAY);
    }
    explain(n + " mod " + i + " ≠ 0 --> check " + (i + 2) + " next");
    await timeout(DELAY / 50);
  }
  return [i, n, top];
}

/**
 * Updates the explanation of the current step.
 * @param {String} explanation - The new explanation
 */
function explain(explanation) {
  $("#nodes").html(explanation);
}

/**
 * Builds the visual representation of the tree
 * @param {Object} data - Data from which to build the tree
 */
async function buildTree(data) {
  var treeData = data;

  // set the dimensions and margins of the diagram
  var margin = { top: 40, right: 90, bottom: 50, left: 90 },
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom;

  // declares a tree layout and assigns the size
  var treemap = d3.tree().size([width, height]);

  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(treeData);

  // maps the node data to the tree layout
  nodes = treemap(nodes);

  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // adds the links between the nodes
  var link = makeLinks(g, nodes);

  // adds each node as a group
  var node = getNodes(g, nodes);

  // adds the text to the node
  addText(node);
  await timeout(2000);
}

/**
 * Creates the lines between tree nodes
 * @param {Object} g - The SVG-group the tree resides in
 * @param {Object[]} nodes - Hierarchy of the tree nodes
 */
function makeLinks(g, nodes) {
  return g
    .selectAll(".link")
    .data(nodes.descendants().slice(1))
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("d", function (d) {
      return (
        "M" + d.x + "," + (d.y - 5) + "L" + d.parent.x + "," + (d.parent.y + 35)
      );
    })
    .attr("fill", "none")
    .attr("stroke", "black");
}

/**
 * Builds and adds the tree nodes.
 * @param {Object} g - The SVG-group the tree resides in
 * @param {Object[]} nodes - Hierarchy of the tree nodes
 */
function getNodes(g, nodes) {
  return g
    .selectAll(".node")
    .data(nodes.descendants())
    .enter()
    .append("g")
    .attr("class", function (d) {
      return "node" + (d.children ? " node--internal" : " node--leaf");
    })
    .attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
}

/**
 * Adds the text to each tree node.
 * @param {Object[]} node - List of all nodes
 */
function addText(node) {
  node
    .append("text")
    .attr("dy", ".35em")
    .attr("y", function (d) {
      return d.children ? 20 : 20;
    })
    .style("text-anchor", "middle")
    .attr("font-size", "24px")
    .attr("font-weight", function (d) {
      return d.children ? "" : "bold";
    })
    .text(function (d) {
      return d.data.name;
    });
}
