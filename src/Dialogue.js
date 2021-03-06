const Time = require("./Time");
const { DialogueBlockType } = require("./Enumerables")
const loadValidTags = require("./loadValidTags");
const { OverrideTagParser } = require("./OverrideTagParser");
const { OverrideTag } = require("./OverrideTag");

const parser = new OverrideTagParser(loadValidTags());

class DialogueBlock {
	/**
	 * @param {string} blockType 
	 * @param {string} text 
	 */
	constructor(blockType, text, level=0) {
		this.blockType = blockType;

		switch (this.blockType) {
			case DialogueBlockType.COMMENT:
			case DialogueBlockType.PLAIN:
				this.content = text
				break;
			case DialogueBlockType.OVERRIDE:
				this.content = parser.generateTagsFromText(text);
				break;
			case DialogueBlockType.DRAAWING:
				let regex = /([mnlbspc]{1})[a-z0-9]*(\s{1})(.+)([0-9.]+).*/g;
				this.content = text.split(regex).join("");
				this.scale = level;
		}
	}

	toString() {
		switch (this.blockType) {
			case DialogueBlockType.OVERRIDE:
				if (Array.isArray(this.content)) {
					return `{${this.content.map(tag => tag.toString())}}`;
				}
				break;
			case DialogueBlockType.COMMENT:
				return `{${this.content}}`;
			default:
				return this.content;
		}
	}
}

class Dialogue {
	/**
	 * @param {string} line 
	 */
	constructor(line) {
		let groups = line.trim().split(/: |,/g, 10);
		groups.push(line.slice(groups.join(",").length + 2))

		this.isComment = (groups[0] === "Comment");
		this.layer = groups[1];
		this.startTime = new Time(groups[2]);
		this.endTime = new Time(groups[3]);
		this.style = groups[4];
		this.name = groups[5];
		this.marginLeft = Number(groups[6]);
		this.marginRight = Number(groups[7]);
		this.marginVertical = Number(groups[8]);
		this.effect = groups[9];

		/**
		 * @type {DialogueBlock[]}
		 */
		this.content = [];

		this.parseDialogueBlocks(groups[10]);
	}

	/**
	 * @param {string} content 
	 */
	parseDialogueBlocks(content) {
		if (content.trim().length === 0) return;

		if (this.isComment) {
			this.content = [new DialogueBlock(DialogueBlockType.PLAIN, content)];
			return;
		}

		let blocks = [];

		const groups = content.trim().split(/(.*?)(\{.*?\})(.*?)/g).filter(str => str.length !== 0);

		let drawingLevel = 0;

		for (const group of groups) {
			if (group.startsWith("{")) {
				if (group.includes("\\")) {
					const overrideBlock = new DialogueBlock(DialogueBlockType.OVERRIDE, group.slice(group.indexOf("\\"), -1));

					if (overrideBlock.content instanceof Array && overrideBlock.content[0] instanceof OverrideTag) {
						for (const tag of overrideBlock.content) {
							if (tag.tag === "\\p") {
								drawingLevel = Number(tag.parameters[0].value);
							}
						}
					}

					blocks.push(overrideBlock);
				} else {
					blocks.push(new DialogueBlock(DialogueBlockType.COMMENT, group.slice(1, -1)));
				}
			} else {
				if (drawingLevel === 0) {
					blocks.push(new DialogueBlock(DialogueBlockType.PLAIN, group));
				} else {
					blocks.push(new DialogueBlock(DialogueBlockType.DRAAWING, group, drawingLevel));
				}
			}
		}

		this.content = blocks;
	}

	toString() {
		let string = this.isComment ? "Comment: " : "Dialogue: ";

		string += [
			this.layer, this.startTime.toString(), this.endTime.toString(),
			this.style, this.name, this.marginLeft, this.marginRight, this.marginVertical,
			this.effect, this.content.map(block => block.toString()).join("")
		].join(",");

		return string;
	}
}

module.exports = { Dialogue, DialogueBlock };
