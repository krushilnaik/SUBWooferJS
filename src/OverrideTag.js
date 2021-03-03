const { ParameterClass: PC, ParameterOptional: PO, VariableType: VT } = require("./Enumerables");
const { splitTags } = require("../src/OverrideTagParser");

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
		this.varType = VT.OVERRIDE;

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

	/**
	 * 
	 * @param {string} text 
	 * @param {OverrideTag[]} templates 
	 */
	parseParameters(text, templates) {
		this.parameters = [];

		let foundParams = splitTags(text);

		if (foundParams.length === 0) {
			return;
		}

		this.commaSeperated = (foundParams.length > 1);

		const optionality = 1 << (foundParams.length - 1);
		const whichTemplate = (foundParams.length === templates[1].length) ? 1 : 0;

		for (const [i, param] of templates[whichTemplate].entries()) {
			this.push(param);

			if (!(param.optionFlag & optionality) || i >= foundParams.length) {
				continue;
			}

			if (this.parameters[this.length - 1].varType === VT.OVERRIDE) {
				this.parenthetical = true;
				this.parameters[this.length - 1].setValue(foundParams[i]);
			} else {
				this.parenthetical = this.commaSeperated;
				this.parameters[this.length - 1].setValue(foundParams[i])
			}
		}
	}

	/**
	 * Makeshift copy constructor
	 */
	copy() {
		let temp = new OverrideTag(this.name);
		temp.parameters = [...this.parameters];

		return temp;
	}
}

module.exports = OverrideTag;
