/** A single node of a linked list. Contains data
 * and a reference to the next node.
 */
class ListNode {
  /**
   * Creates a new node containing the given data.
   * The next node is set to undefined and gets updated
   * by the LinkedList class.
   * @param {number} data - The data stored by this node.
   */
  constructor(data) {
    this.data = data;
    this.next = undefined;
  }
}

const head = Symbol("head");
const tail = Symbol("tail");
/** An implementation of the linked list datastructure */
class LinkedList {
  constructor() {
    this[head] = null;

    // keeping track of the tail allows
    // the linked list to append elements
    // in O(1) time instead of O(n)
    this[tail] = null;
    this.length = 0;
  }

  /**
   * A function for inserting a node at a given index.
   * @param {number} data - The data the new node contains.
   * @param {number} pos - The index at which the node should be inserted.
   */
  async insert(data, pos) {
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
      // there's at least one node in the linked list
      switch (pos) {
        // insert the new node at the specified position
        case 0:
          // new node is the new head
          node.next = this[head];
          this[head] = node;
          await animateNewHead(data);
          this.length++;
          break;
        case this.length:
          //new node is the new tail
          this[tail].next = node;
          this[tail] = node;
          coords = [pos * 150 + 50, 50];
          await newNode(coords, data, pos);
          await newArrow(
            { x: (pos - 1) * 150 + 50, y: 50 },
            { x: pos * 150 + 50, y: 50 },
            pos - 1
          );
          this.length++;
          break;
        default:
          // new node is inserted somewhere in the list
          let current = this[head];
          let index = 0;

          while (index != pos - 1) {
            current = current.next;
            await highlightArrow(index);
            index++;
          }
          await highlightArrow(index);
          await newMidNode(pos, data);

          node.next = current.next;
          current.next = node;
          this.length++;
          await timeout(1500);
          await resetColors();
          break;
      }
    }
  }

  search(node) {}

  remove(pos) {}
}
