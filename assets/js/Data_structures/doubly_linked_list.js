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
      await highlightCode(1);
      await timeout(200);
      // there's at least one node in the linked list
      switch (pos) {
        // insert the new node at the specified position
        case 0:
          await highlightCode(2);
          await timeout(200);

          await highlightCode(3);
          await timeout(200);
          // new node is the new head
          node.next = this[head];
          await highlightCode(4);
          await timeout(200);
          this[head].prev = node;
          await highlightCode(5);
          await timeout(200);
          this[head] = node;

          await animateNewHead(data);

          this.length++;
          break;
        case this.length:
          await highlightCode(6);
          await timeout(200);

          await highlightCode(7);
          await timeout(200);
          //new node is the new tail
          this[tail].next = node;
          node.prev = this[tail];
          this[tail] = node;
          coords = [pos * 150 + 50, 50];
          await highlightCode(8);
          await newNode(coords, data, pos);
          await highlightCode(9);
          await newArrow(
            { x: (pos - 1) * 150 + 50, y: 50 },
            { x: pos * 150 + 50, y: 50 },
            pos - 1
          );
          this.length++;
          break;
        default:
          await highlightCode(10);
          await timeout(200);

          // new node is inserted somewhere in the list

          await highlightCode(11);
          await timeout(200);
          let current = this[head];
          await highlightCode(12);
          await timeout(200);
          let index = 0;

          await highlightCode(13);
          await timeout(200);
          if (this.length / pos >= 2) {
            await highlightCode(14);
            await timeout(200);
            while (index != pos - 1) {
              current = current.next;
              await highlightCode(15);
              await highlight(index, "#CC1616", false);
              await highlightCode(16);
              await timeout(200);
              index++;
            }
          } else {
            await highlightCode(17);
            await timeout(200);
            await highlightCode(18);
            await timeout(200);
            current = this[tail];
            await highlightCode(19);
            await timeout(200);
            index = this.length - 1;

            await highlightCode(20);
            await timeout(200);
            while (index != pos) {
              await highlightCode(21);
              current = current.prev;
              await highlight(index, "#CC1616", false);
              await highlightCode(22);
              await timeout(200);
              index--;
            }
          }
          await highlight(index, "#CC1616", false);
          await newMidNode(pos, data);
          await highlightCode(23);
          await timeout(200);
          node.next = current.next;

          await highlightCode(24);
          await timeout(200);
          node.prev = current;

          await highlightCode(25);
          await timeout(200);
          current.next = node;
          this.length++;
          break;
      }
    }
  }

  /**
   * Function to find the index of a node containing a given value in the linked list, if it exists.
   * @param {number} data - The data you're looking for
   * @returns {number} - The index of the node or -1 if it doesn't exist.
   */
  async search(data) {
    await resetColors();
    const NOT_FOUND = -1;

    await highlightCode(1);
    await timeout(200);

    let current = this[head];

    await highlightCode(2);
    await timeout(200);

    let index = 0;

    await highlightCode(3);
    await timeout(200);

    while (current.data != data) {
      await highlightCode(4);

      await highlight(index, "#CC1616", false);
      if (current.next == null) {
        await highlightCode(5);
        await timeout(200);

        return NOT_FOUND;
      }
      await highlightCode(6);
      await timeout(200);

      current = current.next;

      await highlightCode(7);
      await timeout(200);

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
    await highlightCode(1);
    await timeout(200);
    switch (pos) {
      // removing head
      case 0:
        await highlightCode(2);
        await timeout(200);
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
        this.length--;
        break;
      // removing tail
      case this.length - 1:
        await highlightCode(4);
        await timeout(200);

        await highlightCode(5);
        await timeout(200);
        let current = this[tail].prev;

        data_set.delete(this[tail].data);

        await highlightCode(6);
        await timeout(200);
        current.next = undefined;

        await highlightCode(7);
        await timeout(200);
        this[tail] = current;

        //remove arrows
        await removeArrows(this.length - 2);
        // delete tail
        await deleteNode(pos);
        data_nodes.splice(pos, 1);
        this.length--;
        break;
      // removing node somewhere in the list
      default:
        await highlightCode(8);
        await timeout(200);
        await highlightCode(9);
        await timeout(200);
        let curr = this[head];
        await highlightCode(10);
        await timeout(200);
        let i = 0;
        await highlightCode(11);
        await timeout(200);
        if (this.length / pos >= 2) {
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
        } else {
          // going from the back of the list is shorter
          await highlightCode(17);
          await timeout(200);
          await highlightCode(18);
          await timeout(200);
          curr = this[tail];
          await highlightCode(19);
          await timeout(200);
          i = this.length - 1;
          await highlightCode(20);
          await timeout(200);
          while (i - 1 != pos) {
            await highlightCode(21);
            await timeout(200);
            curr = curr.prev;
            await highlight(i, "#CC1616", false);
            await highlightCode(22);
            await timeout(200);
            i--;
          }
          await highlight(i, "#CC1616", false);
          data_set.delete(curr.prev.data);
          await highlightCode(23);
          await timeout(200);
          let prevPrev = curr.prev.prev;
          await highlightCode(24);
          await timeout(200);
          curr.prev = prevPrev;
        }

        data_nodes.splice(pos, 1);
        // removing outgoing arrow from target node
        await removeArrows(pos);

        // calculating coordinates of predecessor
        // and successor of target node
        let start = [(pos - 1) * 150 + 50, 50];
        let end = [(pos + 1) * 150 + 50, 50];
        // rerouting predecessor's arrow to successor
        await rerouteArrow("#path" + (pos - 1), start, end);
        // deleting target nodes
        await deleteNode(pos);
        // moving succeeding nodes & arrows 1 position to the left
        await pullNodes(pos + 1);

        // calculating new end coordinates
        // for previously rerouted arrow
        end = [pos * 150 + 50, 50];

        // smoothly scaling that arrow to new length
        await slideArrow("#path" + (pos - 1), start, end);

        this.length--;
        break;
    }
  }
}
