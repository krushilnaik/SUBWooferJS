const Color = require("./Color");

class Style {
	/**
	 * @param {string} line 
	 */
	constructor(line) {
		if (line.length === 0) return;

		const parts = line.split(/: |,/g);
		
		this.name = parts[0];
		this.fontName = parts[1];
		this.fontSize = Number(parts[2]);
		this.primaryColor = new Color(parts[3]);
		this.secondaryColor = new Color(parts[4]);
		this.outlineColor = new Color(parts[5]);
		this.backColor = new Color(parts[6]);
		this.bold = Number(parts[7]);
		this.italic = Number(parts[8]);
		this.underline = Number(parts[9]);
		this.strikeout = Number(parts[10]);
		this.scaleX = Number(parts[11]);
		this.scaleY = Number(parts[12]);
		this.spacing = Number(parts[13]);
		this.angle = Number(parts[14]);
		this.borderStyle = Number(parts[15]);
		this.outline = Number(parts[16]);
		this.shadow = Number(parts[17]);
		this.alignment = Number(parts[18]);
		this.marginLeft = Number(parts[19]);
		this.marginRight = Number(parts[20]);
		this.marginVertical = Number(parts[21]);
		this.encoding = Number(parts[22]);
	}
}

module.exports = Style;
