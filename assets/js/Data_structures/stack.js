/**
 * Class simulating a stack using the inbuilt js arrays.
 */
class Stack {
  #stack;

  /**
   * Initializung the stack as empty array
   * and setting the size to 0.
   */
  constructor() {
    this.#stack = [];
    this.size = 0;
  }

  /**
   * Function for adding data to the stack.
   * @param {number} data - The data that gets added to the stack.
   */
  async push(data) {
    this.#stack.push(data);
    let coords = [w / 2 - 160, h - 100 - this.size * 50 - this.size * 10 - 100];
    await newStackElement(coords, data);
    await slideIntoPositionStack(this.size);
    await timeout(100);
    this.size++;
  }

  /**
   * Function for returning the next element on the stack
   * without removing it.
   * @returns {number} - The top element
   */
  async peek() {
    await peekStack();
    return this.#stack[this.size - 1];
  }

  /**
   * Function for returning the next element on the stack
   * and deleting it from the stack.
   * @returns {number} - The top element.
   */
  async pop() {
    if (this.size > 0) {
      await deleteStackNode();
      this.size--;
      return this.#stack.pop();
    }
  }
}
