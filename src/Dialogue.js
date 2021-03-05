const Time = require("./Time");
// const Style = require("./Style");

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
			this.parseDialogue();
		}

		console.log(this.content);
	}

	parseDialogue() {
		// 
	}
}

module.exports = Dialogue;
