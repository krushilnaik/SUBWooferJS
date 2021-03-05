const Time = require("./Time");
const { DialogueBlockType } = require("./Enumerables");
const PropertyHandler = require("./PropertyHandler");

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
				this.parseMode = "META";
			}
		}

		switch (this.parseMode) {
			case "INFO":
				if (line.startsWith(";") || line.startsWith("Collisions:")) return;
				
				const pos = line.indexOf(":");

				if (pos === -1) return;

				let [key, value] = [line.slice(0, pos), line.slice(pos+1).trim()];

				this.target.setScriptInfo(key, value);
		}
	}

	/**
	 * @param {string} filename 
	 */
	readFile(filename) {
		const file = fs.readFileSync(filename).toString().split("\n");

		for (const line of file) {
			this.readLine(line);
		}

		return this.target;
	}
}

class File {
	/**
	 * @param {string} path 
	 */
	constructor(path=null) {
		this.INFO = [];
		this.STYLES = [];
		this.EVENTS = [];
		this.PROPERTIES = [];

		if (path !== null) {
			const reader = new FileReader();
			const temp = reader.readFile(path);
		}
	}

	/**
	 * @param {string} key 
	 * @param {string} value 
	 */
	setScriptInfo(key, value) {
		// TODO
	}
}

module.exports = File;
