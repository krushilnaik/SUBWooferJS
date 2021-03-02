class Color {
	constructor(...args) {
		this.red = 0;
		this.blue = 0;
		this.green = 0;
		this.alpha = 0;

		if (args.length === 1) {
			this.initFromString(args[0]);
		} else if (args.length === 3 || args.length === 4) {
			this.initFromChannels(...args);
		}
	}


	/**
	 * @param  {number[]} channels numeric RGB(A) values, respectively
	 */
	initFromChannels(...channels) {
		this.red = channels[0];
		this.blue = channels[1];
		this.green = channels[2];
		this.alpha = channels.length === 4 ? channels[3] : 255;
	}

	/**
	 * 
	 * @param {string} rawText hex representation of color
	 */
	initFromString(rawText) {
		
	}
}
