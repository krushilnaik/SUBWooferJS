const { ParameterClass: PC, ParameterOptional: PO, VariableType: VT } = require("./Enumerables");

class OverrideTagParameter {
	/**
	 * @param {string} varType
	 * @param {number} paramClass
	 * @param {number} optionFlag
	 */
	constructor(varType, paramClass, optionFlag=PO.NOT_OPTIONAL) {
		this.varType = varType;
		this.optionFlag = optionFlag;
		this.parameterClass = paramClass;

		/**
		 * @type {string | number | OverrideTag}
		 */
		this.value = [VT.INT, VT.FLOAT, VT.BOOLEAN].includes(varType) ? 0 : "";
	}

	[Symbol.iterator]() {
		if (this.value instanceof OverrideTag) {
			return this.value.parameters.values();
		} else {
			return [this.value].values();
		}
	}

	/**
	 * 
	 * @param {string | number | OverrideTag | OverrideTagParameter} value 
	 */
	setValue(value) {
		if (value instanceof OverrideTagParameter) {
			this.varType = value.varType;
			this.optionFlag = value.optionFlag;
			this.parameterClass = value.parameterClass;
			this.value = value.value;
		} else if (value instanceof OverrideTag) {
			this.value = value;
		} else {
			// if ([VT.INT, VT.FLOAT, VT.BOOLEAN].includes(this.varType)) {
			this.value = Number(value);
			// }
		}
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
		this.length = 0;

		this.parenthetical = false;
		this.commaSeperated = false;
		this.isValid = false;
	}

	[Symbol.iterator]() {
		return this.parameters.values();
	}

	/**
	 * 
	 * @param {OverrideTagParameter} param
	 */
	push(param) {
		this.parameters.push(param);
		this.length++;
	}

	entries() {
		return this.parameters.entries();
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
