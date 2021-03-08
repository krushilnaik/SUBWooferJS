class Color {
	/**
	 * Make a Color object out of '&HBBGGRR[AA]&' or (r, g, b, a)
	 * @param {string[] | any[]} args
	 */
	constructor(...args) {
		this.red = 0;
		this.green = 0;
		this.blue = 0;
		this.alpha = 0;

		if (args.length === 1) {
			this.initFromString(args[0]);
		} else if (args.length === 3 || args.length === 4) {
			this.initFromChannels(...args);
		} else {
			throw new Error("invalid arguments to Color constructor.");
		}
	}


	/**
	 * @param  {...number} channels numeric RGB(A) values, respectively
	 */
	initFromChannels(...channels) {
		if (channels.some(arg => typeof arg !== "number")) {
			throw new Error(`invalid parameters '${[...channels]}' in Color constructor`);
		}

		this.red   = channels[0];
		this.green = channels[1];
		this.blue  = channels[2];
		this.alpha = channels.length === 4 ? channels[3] : 255;
	}

	/**
	 * 
	 * @param {string} rawText hex representation of color
	 */
	initFromString(rawText) {
		if (typeof rawText !== "string") {
			throw new Error(`invalid parameter '${rawText}' in Color constructor`);
		}

		const cleanedText = /[A-F0-9]{8}|[A-F0-9]{6}/g.exec(rawText)[0];

		let channelValues = [];

		for (let i = 0; i < cleanedText.length; i += 2) {
			channelValues.push(parseInt(cleanedText.slice(i, i+2), 16));
		}

		this.initFromChannels(...channelValues.reverse());
	}

	/**
	 * @param {string} mode "style" or "override"
	 */
	toString(mode="style") {
		/**
		 * @param {number} num 
		 * @returns {string} - hex representation of input number
		 */
		const hexify = (num) => num.toString(16).padStart(2, "0");

		if (mode === "style") {
			return `&H${[this.alpha, this.blue, this.green, this.red].map(hexify).join("")}&`;
		} else if (mode === "override") {
			return `&H${[this.blue, this.green, this.red].map(hexify).join("")}&`;
		}

		throw new Error("invalid mode for Color.toString(): must be either 'style' or 'override'");
	}
}

module.exports = Color;
