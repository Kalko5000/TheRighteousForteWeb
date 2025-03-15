/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Client program to help make use of Grid and Function to display functions on a Canvas
 * @see {@link https://github.com/ULL-ESIT-PAI-2023-2024/2023-2024_P08_CanvasAPI-2/blob/main/p08_Canvas-GraphingCalculator.md}
 * @example tsc --outFile graphic-calculator.js client.ts
 */

///<reference path='point.ts'/>
///<reference path='grid.ts'/>
///<reference path='func.ts'/>
///<reference path='exp.ts'/>
///<reference path='sin.ts'/>
///<reference path='cos.ts'/>
///<reference path='sqrt.ts'/>
///<reference path='taylorsin.ts'/>

const main = function() {
  const SCALE: number = 40; // Margin of Grid === Scale, so each cell is 1x1 in size. Works well with 20, 40 & 80
  
  let grid: Grid = new Grid(SCALE);
  grid.drawLines();
  grid.alignCenter();
  
  let sin: Func = new Sin('yellow', SCALE);
  sin.evaluate();
  let taylor: TaylorSin = new TaylorSin('blue', SCALE, 7);
  taylor.evaluate();
  

  grid.drawNumbers(); // Done after functions so that grid numbers are displayed above these
}

main();