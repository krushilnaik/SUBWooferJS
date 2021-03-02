class OverrideTag {

	/**
	 * 
	 * @param {string} rawText a single tag (with potential sub-tag parameters)
	 * @param {OverrideTag[]} overloadings list of possible "function calls" for a tag if there's more than one
	 */
	constructor(rawText, overloadings=[]) {
		this.name = overloadings !== [] ? overloadings[0].name : rawText;

		this.parameters = [];
		this.parenthetical = false;
		this.commaSeperated = false;
		this.isValid = false;
	}
}

module.exports = OverrideTag;
