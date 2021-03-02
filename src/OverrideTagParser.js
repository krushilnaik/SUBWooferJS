const OverrideTag = require('../src/OverrideTag');

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
}

module.exports = OverrideTagParser;
