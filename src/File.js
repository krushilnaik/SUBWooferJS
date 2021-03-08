const { Dialogue } = require("./Dialogue");
const PropertyHandler = require("./PropertyHandler");
const Style = require("./Style");

const fs = require("fs");

class FileReader {
	constructor() {
		this.target = new File();
		this.propertyHandler = new PropertyHandler();

		this.target.PROPERTIES = this.propertyHandler.getDefaults();

		this.parseMode = "INFO";
	}

	/**
	 * @param {string} data 
	 */
	readLine(data) {
		const line = data.trim();
		if (line.startsWith("[") && line.endsWith("]")) {
			if (line.toLowerCase().includes("[v4+ styles]")) {
				this.parseMode = "STYLE";
			} else if (line.toLowerCase().includes("[events]")) {
				this.parseMode = "EVENTS";
			} else if (line.toLowerCase().includes("[aegisub project garbage]")) {
				this.parseMode = "METADATA";
			}

			return;
		}

		switch (this.parseMode) {
			case "INFO":
				if (line.startsWith(";") || line.startsWith("Collisions:")) return;

				const pos = line.indexOf(":");

				if (pos === -1) return;

				this.target.setScriptInfo(line.slice(0, pos), line.slice(pos+1).trim());
			case "STYLE":
				if (!data.startsWith("Style: ")) return;

				this.target.STYLES.push(new Style(data.slice(7)));
				break;
			case "EVENTS":
				if (!data.startsWith("Comment: ") || !data.startsWith("Dialogue: ")) {
					return;
				}

				this.target.EVENTS.push(new Dialogue(data));
			default:
				break;
		}
	}

	/**
	 * @param {string} filename 
	 */
	readFile(filename) {
		const file = fs.readFileSync(filename).toString().split("\n");

		for (const line of file) {
			if (line.trim().length === 0) continue;
			this.readLine(line);
		}

		return this.target;
	}
}

class FileWriter {
	/**
	 * @param {string} filename 
	 * @param {File} fileObject
	 */
	constructor(filename, fileObject) {
		fs.writeFileSync(filename, "");

		this.file = fs.createWriteStream(filename, "a");
		this.target = fileObject;
	}

	/**
	 * @param {string} line 
	 */
	writeSingleLine(line) {
		this.file.write(line + "\n");
	}

	writeFile() {
		this.writeSingleLine("[Script Info]");
		this.writeMultipleLines(
			Object.entries(this.target.INFO).map(
				info => info.join(": ")
			)
		);

		this.writeSingleLine("");

		this.writeSingleLine("[V4+ Styles]");
		this.writeSingleLine("Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding");
		this.writeMultipleLines(this.target.STYLES.map(style => style.toString()));

		this.writeSingleLine("");

		this.writeSingleLine("[Events]");
		this.writeSingleLine("Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text");
		this.writeMultipleLines(this.target.EVENTS.map(event => event.toString()));
	}

	/**
	 * @param {string[]} lines 
	 */
	writeMultipleLines(lines) {
		for (const line in lines) {
			this.writeSingleLine(line);
		}
	}

	close() {
		this.file.close();
	}
}

class File {
	/**
	 * @param {string} path 
	 */
	constructor(path=null) {
		/**
		 * @typedef {object} Info
		 * @property {string} ScriptType
		 * @property {number} WrapStyle
		 * @property {string} ScaledBorderAndShadow
		 * @property {number} PlayResX
		 * @property {number} PlayResY
		 * @property {string} YCbCrMatrix
		 */

		/**
		 * @type {Info}
		 */
		this.INFO = {
			ScriptType: "v4.00+",
			WrapStyle: 0,
			ScaledBorderAndShadow: "yes",
			PlayResX: 1920,
			PlayResY: 1080,
			YCbCrMatrix: "None"
		};

		/**
		 * @type {Style[]}
		 */
		this.STYLES = [];

		/**
		 * @type {Dialogue[]}
		 */
		this.EVENTS = [];

		if (path !== null) {
			const reader = new FileReader();
			const temp = reader.readFile(path);

			this.INFO = temp.INFO;
			this.STYLES = temp.STYLES;
			this.PROPERTIES = temp.PROPERTIES;
			this.EVENTS = temp.EVENTS;
		}
	}

	/**
	 * @param {string} key 
	 * @param {string} value 
	 */
	setScriptInfo(key, value) {
		if (Object.keys(this.INFO).includes(key)) {
			switch (key) {
				case "WrapStyle":
				case "PlayResX":
				case "PlayResY":
					this.INFO[key] = Number(value);
					break;
				default:
					this.INFO[key] = value;
			}
		}
	}

	/**
	 * @param {string} filename 
	 */
	writeFile(filename) {
		const writer = new FileWriter(filename, this);
		writer.writeFile();
		writer.close();
	}
}

module.exports = { File, FileReader, FileWriter };
