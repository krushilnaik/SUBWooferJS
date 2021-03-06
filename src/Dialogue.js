const Time = require("./Time");
const { DialogueBlockType } = require("./Enumerables")
const loadValidTags = require("./loadValidTags");
const { OverrideTagParser } = require("./OverrideTagParser");
const { OverrideTag } = require("./OverrideTag");
// const Style = require("./Style");

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
		this.content = groups[10];

		if (!this.isComment) {
			this.parseDialogueBlocks();
		}

		console.log(this.content);
	}

	parseDialogueBlocks() {
		let blocks = [];

		if (this.content.trim().length === 0) {
			return blocks;
		}

		const groups = this.content.trim().split(/(.*?)(\{.*?\})(.*?)/g).filter(str => str.length !== 0);

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
	}
}

module.exports = { Dialogue, DialogueBlock };
