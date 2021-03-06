const { ParameterClass: PC, ParameterOptional: PO, VariableType: VT } = require("./Enumerables");

/**
 * @param {string} text 
 * @param {string} delimiter 
 */
function splitTags(text, delimiter=",") {
	/**
	 * @type {string[]}
	 */
	let parameterList = [];

	if (!text || text === "()") {
		return parameterList;
	}

	if (text[0] !== "(") {
		parameterList.push(text);
		return parameterList;
	}

	let level = 0, prev = 1;
	let removeIndex = -1;

	for (let i = 1; i < text.length - 1; i++) {
		const c = text[i];

		if (c === "(") {
			level += 1;
		} else if (c === ")") {
			level -= 1;

			if (level === -1) {
				removeIndex = i;
				level += 1;
			}
		} else if (c === delimiter && level === 0) {
			let temp = text.slice(prev, i);

			if (removeIndex !== -1) {
				temp = text.slice(prev, removeIndex);
				removeIndex = -1;
			}

			prev = i;

			parameterList.push(temp.replace(/^\,+|\,+$/g, ''));
		}
	}

	parameterList.push(text.slice(prev, text.length - 1).replace(/^\,+|\,+$/g, ''));

	if (delimiter === "\\") {
		while (parameterList[0].trim() === "") {
			parameterList = parameterList.slice(1);
		}
	}

	return parameterList;
}

class OverrideTagParameter {
	/**
	 * @param {any} varType 
	 * @param {number} paramClass 
	 * @param {number} optionFlag 
	 */
	constructor(varType, paramClass, optionFlag) {
		this.varType = varType;
		this.paramClass = paramClass;
		this.optionFlag = optionFlag;
		this.value = null;
	}

	/**
	 * @param {string} value 
	 */
	setValue(value) {
		if (this.varType !== VT.OVERRIDE) {
			this.value = this.varType(value);
		} else {
			this.value = value;
		}
	}

	toString() {
		if (Array.isArray(this.value)) {
			return this.value.join("");
		} else {
			return String(this.value);
		}
	}
}

class OverrideTag {
	/**
	 * @param {string} text 
	 * @param {OverrideTag[]} overrides 
	 */
	constructor(text, overrides=[]) {
		/**
		 * @type {OverrideTagParameter[]}
		 */
		this.parameters = [];
		this.length = 0;

		this.commaSeperated = false;
		this.needsParentheses = false;

		if (overrides.length === 0) {
			this.tag = text;
		} else {
			this.tag = overrides[0].tag || "";
			this.parseParameters(text.slice(this.tag.length - 1), overrides);
		}
	}

	[Symbol.iterator]() {
		return this.parameters.values();
	}

	/**
	 * @param {OverrideTagParameter} parameter 
	 */
	push(parameter) {
		this.parameters.push(parameter);
		this.length++;
	}

	/**
	 * 
	 * @param {any} varType 
	 * @param {number} paramClass 
	 * @param {number} optionFlag 
	 */
	addParameter(varType, paramClass=PC.NORMAL, optionFlag=PO.NOT_OPTIONAL) {
		this.push(new OverrideTagParameter(varType, paramClass, optionFlag));
	}

	/**
	 * @param {string} rawText - string containing all the parameters this tag will have
	 * @param {OverrideTag[]} templates - typically only has one template in it, aside from \clip and \iclip
	 */
	parseParameters(rawText, templates) {
		this.parameters = [];

		const groups = splitTags(rawText);
		const numParams = groups.length;

		if (numParams > 1) {
			this.commaSeperated = true;
		}

		const parsFlag = 1 << (numParams - 1);

		let templateNumber = 0;
		
		if (templates.length > 1 && numParams > templates[0].length) {
			templateNumber++;
		}
		
		let i = 0;
		for (const param of templates[templateNumber]) {
			if (this.commaSeperated || param.varType === VT.OVERRIDE) {
				this.needsParentheses = true;
			}

			const { varType, paramClass, optionFlag } = param;
			this.push(new OverrideTagParameter(varType, paramClass, optionFlag));

			if (!(optionFlag & parsFlag) || i >= numParams) {
				continue;
			}

			this.parameters[this.length - 1].setValue(groups[i++]);
		}
	}

	toString() {
		let string = this.tag.replace("\\\\", "\\");

		if (this.needsParentheses) string += "(";
		string += this.parameters.filter(param => param.value !== null).join(this.commaSeperated ? "," : "");
		if (this.needsParentheses) string += ")";

		return string;
	}
}

module.exports = { OverrideTag, splitTags };
