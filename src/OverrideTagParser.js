const OverrideTag = require('../src/OverrideTag');
const { VariableType } = require("../src/Enumerables");

/**
 * 
 * @param {string} text 
 * @param {string} delimiter 
 */
function splitTags(text, delimiter) {
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

			parameterList.push(/,*(.*),*/g.exec(temp)[0]);
		}
	}

	parameterList.push(/,*(.*),*/g.exec(text.slice(prev))[0]);

	if (delimiter === "\\") {
		while (parameterList[0].trim() === "") {
			parameterList = parameterList.slice(1);
		}
	}

	return parameterList;
}

class OverrideTagParser {
	/**
	 * Helper class to parse OverrideTags for manipulation
	 * @param {Map<string, OverrideTag[]>} tagMap - map of all valid tags for use in an .ass file
	 */
	constructor(tagMap) {
		this.tagMap = tagMap;
		this.validTags = Array.from(tagMap.keys()).sort(
			(a, b) => {
				if (this.tagMap.get(a).length < this.tagMap.get(b).length) {
					return -1;
				} else if (this.tagMap.get(a).length > this.tagMap.get(b).length) {
					return 1;
				}

				return 0;
			}
		);

		this.tagRegex = new RegExp(`(${this.validTags.join("|")}|\\(|\\))`).compile();
	}


	/**
	 * Parse override tags in a string into OverrideTag and OverrideTagParameter objects
	 * @param {string} text string of OverrideTags to parse
	 */
	generateTagsFromText(text) {
		/**
		 * @type {OverrideTag[]}
		 */
		let tags = [];

		const strings = splitTags(`(${text})`, "\\");

		for (const string of strings) {
			let groups = string.split(this.tagRegex).filter(str => str.length !== 0);

			const tagName = groups[0].replace("\\", "\\\\");
			let isValidTag = true;

			if (!this.validTags.includes(tagName)) {
				isValidTag = false;
			}

			if (isValidTag) {
				const overrides = this.tagMap.get(tagName);

				try {
					tags.push(new OverrideTag(string, overrides));

					for (let i = 0; i < tags[tags.length - 1].parameters.length; i++) {
						if (tags[tags.length - 1].parameters[i] === VariableType.OVERRIDE) {
							// 
						}
					}
				} catch (error) {
					continue;
				}
			}
		}
	}
}

module.exports = OverrideTagParser;
