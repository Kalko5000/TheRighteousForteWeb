/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains class Sin, an extension of the abstract class Func. Used to draw exponencial values.
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */

/** @class */
class TaylorSin extends Func {
  constructor(
		private readonly colorPass: string,
		private readonly scalePass: number,
		private readonly degree: number
	) {
		super(colorPass, scalePass);
	}
	
	/**
   * @desc Abstract method implementation that checks if the function can be evaluated with negative numbers
   * @returns {boolean} Returns true if can only be used with positive numbers
   */
  protected checkOnlyPositive(): boolean {
    return false;
  }

  /**
   * @desc Abstract method implementation that evaluates a function for a given value (returning Y in the process)
   * @param {number} value Value to evaluate the function at
   * @returns {number} Value of Y after evaluating our function
   */
  protected getCoordY(value: number): number {
    let count: number = value;
		let sumNext: boolean = false;
		for (let i: number = 3; i <= this.degree; ++i) {
			if (this.isPrime(i)) {
				if (sumNext) {
					count = count + (Math.pow(value, i) / this.getFactorial(i));
					sumNext = false;
				} else {
					count = count - (Math.pow(value, i) / this.getFactorial(i));
					sumNext = true;
				}
			}
		}
		return count;
  }

	/**
	 * @desc Checks if a value is prime
	 * @param {number} value Value to check
	 * @returns {boolean} True if prime
	 */
	private isPrime(value: number): boolean {
		for(let i: number = 2; i < value; ++i){
			if (value % i === 0) return false
		}
		return true;
	}

	/**
	 * @desc Returns the value of the factorial
	 * @param {number} value Value to get factorial for
	 * @returns {number} Factorial of the given number
	 */
	private getFactorial(value: number): number {
		let fact = 1;
		for (let i = 1; i <= value; ++i) {
			fact = fact * i;
		}
		return fact;
	}
}