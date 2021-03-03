const { ParameterClass: PC, ParameterOptional: PO, VariableType: VT } = require("./Enumerables");

class OverrideTagParameter {
	constructor(_varType, _paramClass, _optionFlag=PO.NOT_OPTIONAL) {
		this.value = [VT.INT, VT.FLOAT].includes(_varType) ? 0 : "";
	}
}

class OverrideTag {
	/**
	 * @param {string} rawText a single tag (with potential sub-tag parameters)
	 * @param {OverrideTag[]} overloadings list of possible "function calls" for a tag if there's more than one
	 */
	constructor(rawText, overloadings=[]) {
		this.name = overloadings !== [] ? overloadings[0].name : rawText;

		/**
		 * @type {OverrideTagParameter[]}
		 */
		this.parameters = [];

		this.parenthetical = false;
		this.commaSeperated = false;
		this.isValid = false;
	}

	/**
	 * 
	 * @param {OverrideTagParameter} param
	 */
	push(param) {
		this.parameters.push(param);
	}

	/**
	 * @param {string} variableType
	 * @param {number} parameterClass
	 * @param {number} parameterOptional 
	 */
	addParameter(variableType, parameterClass=PC.NORMAL, parameterOptional=PO.NOT_OPTIONAL) {
		this.push(new OverrideTagParameter(variableType, parameterClass, parameterOptional));
	}

	getVariableType() {return VT.OVERRIDE;}
}

module.exports = OverrideTag;
