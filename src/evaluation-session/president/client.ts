/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description Client program to help make use of President class
 * @see {@link https://docs.google.com/document/d/1FnHlzIkOP9_FgVFMJm6xwj67qia5ntuuVsoSn_XjgqI/edit?pli=1}
 * @example npx tsx client.ts
 */

import { President } from './president.js';

const main = function (): void {
  const president: President = President.getPresident();
  console.log(president.getName());
  const anotherPresident: President = President.getPresident();
  console.log(anotherPresident.getName());
  // You can't do this:
  // const oneMorePresident = new President('Trump');
}

main();