class MathAlgorithms {
  constructor() {}

  /**
   * Wrapper function for creating a visual representation of the
   * sieve of Eratosthenes.
   * @param {number} n - The number up to which primes should be found
   */
  async sieveOfEratosthenes(n) {
    // -> implementation in modules/sieve_of_eratosthenes.js
    await runSieve(n);
  }

  /**
   * Wrapper function for running a visualization of
   * finding prime factors of n.
   * @param {number} n - Number to factorize
   */
  async primeFactors(n) {
    await findPrimeFactors(n);
  }
}
