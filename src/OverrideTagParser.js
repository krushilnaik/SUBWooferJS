const { OverrideTag, splitTags } = require('../src/OverrideTag');
const { VariableType } = require("../src/Enumerables");

class OverrideTagParser {
	/**
	 * Helper class to parse OverrideTags for manipulation
	 * @param {Map<string, OverrideTag[]>} tagMap - map of all valid tags for use in an .ass file
	 */
	constructor(tagMap) {
		this.tagMap = tagMap;
		this.validTags = Array.from(tagMap.keys()).sort(
			(a, b) => {
				if (a.length > b.length) {
					return 1;
				} else if (a.length < b.length) {
					return -1;
				} else if (this.tagMap.get(a).length < this.tagMap.get(b).length) {
					return -1;
				} else if (this.tagMap.get(a).length > this.tagMap.get(b).length) {
					return 1;
				}

				return 0;
			}
		);

		this.tagRegex = new RegExp(`(${this.validTags.reverse().join("|")}|\\(|\\))`);
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
			let groups = string.split(this.tagRegex).filter(str => str && str.length !== 0);

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
						if (tags[tags.length - 1].parameters[i].varType === VariableType.OVERRIDE) {
							const subTag = tags[tags.length - 1].parameters[i].value;
							tags[tags.length - 1].parameters[i].value = this.generateTagsFromText(subTag);
						}
					}
				} catch (error) {
					continue;
				}
			}
		}

		return tags;
	}
}

module.exports = { OverrideTagParser, splitTags };
