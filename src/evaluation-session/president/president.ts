/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Thomas Edward Bradley
 * @since Mar 19, 2024
 * @description President class
 * @see {@link https://docs.google.com/document/d/1FnHlzIkOP9_FgVFMJm6xwj67qia5ntuuVsoSn_XjgqI/edit?pli=1}
 * @example tsc president.ts
 */

/** @class */
export class President {
	private static instance: President;
	/** @constructor */
	private constructor (private readonly name: string = 'Biden') {}
	
	/**
	 * @desc Static method used for creating a single class object, will return this if already made
	 * @returns {President} Global instance of object
	 */
	public static getPresident(): President {
		if (President.instance === null) {
			President.instance = new President();
		}
		return President.instance;
	}

	/**
	 * @desc Returns the name of the current president
	 * @returns {string} Name of the current president
	 */
	public getName(): string {
		return President.instance.name;
	}
}