/** A single node of a doubly linked list. Contains data
 * and a reference to the next node.
 */
class ListNode {
  /**
   * Creates a new node containing the given data.
   * The next node is set to undefined and gets updated
   * by the DoublyLinkedList class.
   * @param {number} data - The data stored by this node.
   */
  constructor(data) {
    this.data = data;
    this.next = undefined;
    this.prev = undefined;
  }
}

const head = Symbol("head");
const tail = Symbol("tail");
/** An implementation of the doubly linked list datastructure */
class DoublyLinkedList {
  constructor() {
    this[head] = null;
    this[tail] = null;
    this.length = 0;
  }

  /**
   * A function for inserting a node at a given index.
   * @param {number} data - The data the new node contains.
   * @param {number} pos - The index at which the node should be inserted.
   */
  async insert(data, pos) {
    await resetColors();
    const node = new ListNode(data);
    let coords = [pos * 150 + 50, 50];
    if (this[head] == undefined) {
      // the node is the first node of the newly created linked list
      // -> update head, tail and length
      this[head] = node;
      this[tail] = node;
      await newNode(coords, data, pos);
      this.length++;
    } else {
      await highlightCode(1, 200);

      // there's at least one node in the linked list
      switch (pos) {
        // insert the new node at the specified position
        case 0:
          await this.newHead(node, data);
          this.length++;
          break;
        case this.length:
          await this.newTail(node, coords, data, pos);
          this.length++;
          break;
        default:
          await this.newMiddleNode(pos, data, node);
          this.length++;
          break;
      }
    }
  }

  /**
   * Creates a new node at a specified positon in the list
   * @param {number} pos - The position where the new node should be created
   * @param {number} data - The data contained in the node
   * @param {Object} node - The node object
   */
  async newMiddleNode(pos, data, node) {
    await highlightCode(10, 200);

    // new node is inserted somewhere in the list
    await highlightCode(11, 200);
    let current = this[head];
    await highlightCode(12, 200);
    let index = 0;
    await highlightCode(13, 200);
    if (pos < this.length / 2) {
      [index, current] = await this.getNodeFromLeft(index, current, pos);
      node.next = current.next;
      node.prev = current;
      current.next.prev = node;
      current.next = node;
    } else {
      [index, current] = await this.getNodeFromRight(index, current, pos);
      node.next = current;
      node.prev = current.prev;
      current.prev.next = node;
      current.prev = node;
    }
    await highlight(index, "#CC1616", false);
    await newMidNode(pos, data);
    await highlightCode(23, 200);

    await highlightCode(24, 200);

    await highlightCode(25, 200);
  }

  /**
   * Loops through the list starting from the left
   * until it hits the target index.
   * @param {number} index - Starting point
   * @param {Object} current - Currently evaluated node
   * @param {number} pos - The target index.
   * @returns  - The index and found node
   */
  async getNodeFromLeft(index, current, pos) {
    await highlightCode(14, 200);
    await highlight(index, "#CC1616", false);
    [index, current] = await getIndexAndCurrent(index, pos - 1, current);
    return [index, current];
  }

  /**
   * Loops through the list starting from the right
   * until it hits the target index.
   * @param {number} index - Starting point
   * @param {Object} current - Currently evaluated node
   * @param {number} pos - The target index.
   * @returns - The index and found node
   */
  async getNodeFromRight(index, current, pos) {
    await highlightCode(17, 200);
    await highlightCode(18, 200);
    current = this[tail];
    await highlightCode(19, 200);
    index = this.length - 1;

    await highlightCode(20, 200);
    while (index != pos) {
      await highlightCode(21);
      current = current.prev;
      await highlight(index, "#CC1616", false);
      await highlightCode(22, 200);
      index--;
    }
    return [index, current];
  }

  /**
   * Creates a new tail node in the doubly linked list.
   * @param {Object} node - The node
   * @param {number[]} coords - Coordinates where the new node will be drawn
   * @param {number} data - Data the node contains
   * @param {number} pos - The index of the node
   */
  async newTail(node, coords, data, pos) {
    await highlightCode(6, 200);

    await highlightCode(7, 200);

    //new node is the new tail
    this[tail].next = node;
    node.prev = this[tail];
    this[tail] = node;
    coords = [pos * 150 + 50, 50];
    await highlightCode(8, 0);
    await newNode(coords, data, pos);
    await highlightCode(9, 0);
    await newArrow(
      { x: (pos - 1) * 150 + 50, y: 50 },
      { x: pos * 150 + 50, y: 50 },
      true
    );
  }

  /**
   * Creates a new head node in the doubly linked list
   * @param {Object} node - The node object
   * @param {number} data - Data the node will contain
   */
  async newHead(node, data) {
    await highlightCode(2, 200);

    await highlightCode(3, 200);

    // new node is the new head
    node.next = this[head];
    await highlightCode(4, 200);

    this[head].prev = node;
    await highlightCode(5, 200);

    this[head] = node;

    await animateNewHead(data);
  }

  /**
   * Function to find the index of a node containing a given value in the linked list, if it exists.
   * @param {number} data - The data you're looking for
   * @returns {number} - The index of the node or -1 if it doesn't exist.
   */
  async search(data) {
    await resetColors();
    const NOT_FOUND = -1;

    await highlightCode(1, 200);
    let current = this[head];

    await highlightCode(2, 200);
    let index = 0;

    await highlightCode(3, 200);
    while (current.data != data) {
      await highlightCode(4);
      await highlight(index, "#CC1616", false);
      if (current.next == null) {
        await highlightCode(5, 200);
        return NOT_FOUND;
      }
      await highlightCode(6, 200);
      current = current.next;

      await highlightCode(7, 200);
      index++;
    }

    await highlightCode(8);
    await highlight(index, "#0DC1D9", true);

    return index;
  }

  /**
   * Function for removing an element from the list.
   * @param {number} pos - The index of the element that should be removed.
   */
  async remove(pos) {
    await resetColors();
    await highlightCode(1, 200);

    switch (pos) {
      // removing head
      case 0:
        await this.deleteHead();
        this.length--;
        break;
      // removing tail
      case this.length - 1:
        await this.deleteTail(pos);
        this.length--;
        break;
      // removing node somewhere in the list
      default:
        await this.deleteMidNode(pos);
        this.length--;
        break;
    }
  }

  /**
   * Deletes the head node of the list.
   */
  async deleteHead() {
    let pos = 0;
    await highlightCode(2, 200);
    data_set.delete(this[head].data);
    await highlightCode(3);
    this[head] = this[head].next;
    // delete outgoing arrow
    await removeArrows(pos);
    // delete head
    await deleteNode(pos);
    // move all nodes 1 place to the left
    await pullNodes(pos + 1);

    data_nodes.splice(pos, 1);
  }

  /**
   * Deletes the tail node of the list.
   * @param {number} pos - The index of the tail
   */
  async deleteTail(pos) {
    await highlightCode(4, 200);
    await highlightCode(5, 200);
    let current = this[tail].prev;
    data_set.delete(this[tail].data);

    await highlightCode(6, 200);
    current.next = undefined;

    await highlightCode(7, 200);
    this[tail] = current;

    //remove arrows
    await removeArrows(this.length - 2);
    // delete tail
    await deleteNode(pos);
    data_nodes.splice(pos, 1);
  }

  /**
   * Deletes a node from a given position in the list.
   * @param {number} pos - The index of the node which is to be deleted
   */
  async deleteMidNode(pos) {
    await highlightCode(8, 200);
    await highlightCode(9, 200);
    let curr = this[head];
    await highlightCode(10, 200);
    let i = 0;
    await highlightCode(11, 200);
    if (this.length / 2 > pos) {
      await this.deleteFromRight(curr, pos, i);
    } else {
      await this.deleteFromLeft(curr, pos, i);
    }

    await remakeArrows(pos);
  }

  /**
   * Loop through the list from the right end, to find
   * the node which should be deleted. Then delete it.
   * @param {Object} curr - The currently evaluated list node
   * @param {number} pos - Index of the target node
   * @param {number} i - Current index
   */
  async deleteFromRight(curr, pos, i) {
    // looping through the list until preceding node is found
    await highlightCode(12);
    await timeout(200);
    while (i + 1 != pos) {
      await highlightCode(13);
      curr = curr.next;
      await highlight(i, "#CC1616", false);
      await highlightCode(14);
      await timeout(200);
      i++;
    }
    // highlighting predecessor
    await highlight(i, "#CC1616", false);
    data_set.delete(curr.next.data);
    await highlightCode(15);
    await timeout(200);
    let nextNext = curr.next.next;
    await highlightCode(16);
    await timeout(200);
    curr.next = nextNext;
    nextNext.prev = curr;
  }

  /**
   * Loop through the list from the left end, to find
   * the node which should be deleted. Then delete it.
   * @param {Object} curr - The currently evaluated list node
   * @param {number} pos - Index of the target node
   * @param {number} i - Current index
   */
  async deleteFromLeft(curr, pos, i) {
    // going from the back of the list is shorter
    await highlightCode(17, 200);

    await highlightCode(18, 200);
    curr = this[tail];
    await highlightCode(19, 200);
    i = this.length - 1;
    await highlightCode(20, 200);
    while (i - 1 != pos) {
      await highlightCode(21, 200);
      curr = curr.prev;
      await highlight(i, "#CC1616", false);
      await highlightCode(22, 200);
      i--;
    }
    await highlight(i, "#CC1616", false);
    data_set.delete(curr.prev.data);
    await highlightCode(23, 200);
    let prevPrev = curr.prev.prev;
    await highlightCode(24, 200);
    curr.prev = prevPrev;
    prevPrev.next = curr;
  }
}
