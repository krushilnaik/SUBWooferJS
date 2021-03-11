// @ts-nocheck

const { OverrideTag, OverrideTagParameter } = require("./OverrideTag");

class ResampleState {
	constructor( { margin, resolutionX, resolutionY, aspectRatio, yCbCrConverter, convertColors } ) {
		this.margin = margin;
		this.resolutionX = resolutionX;
		this.resolutionY = resolutionY;
		this.aspectRatio = aspectRatio;
		this.yCbCrConverter = yCbCrConverter;
		this.convertColors = convertColors;
	}
}

/**
 * @param {OverrideTagParameter} parameter 
 * @param {ResampleState} state 
 */
function resampleParameter(parameter, state) {
	let resizer = 1.0;
	let shift = 0;

	// if ()
}
