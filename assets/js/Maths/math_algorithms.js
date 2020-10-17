class MathAlgorithms {
  constructor() {}

  /**
   * Wrapper function ofr creating a visual representation of the
   * sieve of Eratosthenes.
   * @param {number} n - The number up to which primes should be found
   */
  async sieveOfEratosthenes(n) {
    // -> implementation in modules/sieve_of_eratosthenes.js
    await runSieve(n);
  }
}
