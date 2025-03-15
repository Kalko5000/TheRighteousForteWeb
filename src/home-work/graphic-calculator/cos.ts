/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains class Cos, an extension of the abstract class Func. Used to draw exponencial values.
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */

/** @class */
class Cos extends Func {
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
    return Math.cos(value);
  }
}