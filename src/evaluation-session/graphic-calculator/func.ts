/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Contains an abstract class Func used to evaluate and draw function values to a canvas
 * @see {@link https://developer.mozilla.org/es/docs/Web/API/Canvas_API/Tutorial}
 */

/** @class */
abstract class Func {
  /** @constructor */
  constructor(
    private readonly color: string,
    private readonly scale: number,
    private readonly lineWidth: number = 2,
    private readonly canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement,
    private context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D,
    private readonly WIDTH: number = canvas.width,
  ) {}

  /**
   * @desc Evaluates itself for the entirity of the Canvas' width
   */
  public evaluate(): void {
    const INCREMENTS: number = 0.2;
    
    // We divide by (2 * scale) in order to have half the value of WIDTH on either side while adjusting to scale
    let previous: Point = { coordX: -this.WIDTH / 2, coordY: 0 };
    for (let i: number = -this.WIDTH / (2 * this.scale); i < this.WIDTH / (2 * this.scale); i += INCREMENTS) {
      previous = this.drawMethod(previous, i);
    }
  }

  /**
   * @desc Abstract method that checks if the function can be evaluated with negative numbers
   * @returns {boolean} Returns true if can only be used with positive numbers
   */
  protected abstract checkOnlyPositive(): boolean;

  /**
   * @desc Abstract method that evaluates a function for a given value (returning Y in the process)
   * @param {number} value Value to evaluate the function at
   * @returns {number} Value of Y after evaluating our function
   */
  protected abstract getCoordY(value: number): number;

  /**
   * @desc Template Method for drawing a step in a functions evaluation, going from the last value to be
   *       evaluated to the next
   * @param {Point} previousCoords The origin point of the new edge we are going to form
   * @param {number} value Value to pass to function to yield new Point values
   * @returns {Point} Coordinates of where the new Point has been drawn (after evaluating the function instance)
   */
  private drawMethod(previousCoords: Point, value: number): Point {
    if (this.checkOnlyPositive() && value < 0) return { coordX: value, coordY: 0 };
    const NEW_VALUE: number = this.getCoordY(value);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = this.lineWidth / this.scale;
    this.context.beginPath();
    this.context.moveTo(previousCoords.coordX, previousCoords.coordY);
    this.context.lineTo(value, NEW_VALUE);
    this.context.closePath();
    this.context.stroke();
    return { coordX: value, coordY: NEW_VALUE };
  }
}