class Time {
	/**
	 * Create a Time object for manipulating start and stop times of a given subtitle
	 * @param {(string|number)} value string or numeric representation Time object
	 */
	constructor(value) {
		this.timestamp = 0;

		if (typeof value === "number") {
			this.timestamp = value;
		} else if (typeof value == "string") {
			const timeArray = value.split(/[.:]/g).map(num => Number(num));

			const conversionUnits = [60, 60, 100, 1];

			for (const [i, segment] of timeArray.entries()) {
				const weight = conversionUnits.slice(i).reduce((a, b) => a*b);
				this.timestamp += segment * weight;
			}
		}
	}

	/**
	 * Get a human-readable string representation of Time
	 */
	toString() {
		const conversionUnits = [60, 60, 100];
		const seperators = [":", ":", "."];

		let string = "";
		let remainder = this.timestamp;

		for (const [i, sep] of seperators.entries()) {
			const weight = conversionUnits.slice(i).reduce((a, b) => a*b);
			const segment = Math.floor(remainder / weight);

			string += String(segment).padStart(2, "0");
			string += sep;

			remainder %= weight;
		}

		string += String(remainder).padStart(2, "0");

		return string;
	}

	/**
	 * @param {(string|number|Time)} time amount of time to be added
	 */
	add(time) {
		if (typeof time === "number") {
			return new Time(this.timestamp + time);
		}else if (typeof time === "string") {
			return new Time(this.timestamp + (new Time(time)).timestamp);
		}

		return new Time(this.timestamp + time.timestamp);
	}

	/**
	 * @param {(string|number|Time)} time amount of time to be subtracted
	 */
	subtract(time) {
		if (typeof time === "number") {
			return new Time(this.timestamp - time);
		}else if (typeof time === "string") {
			return new Time(this.timestamp - (new Time(time).timestamp));
		}

		return new Time(this.timestamp - time.timestamp);
	}
}

module.exports = Time;
