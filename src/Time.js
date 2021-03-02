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

			let sampleValue = "0:00:11.69";

			let sections = sampleValue.split(/[.:]/);
			sections[sections.length - 1] = sections[sections.length - 1].padEnd(2, "0");

			let units = [60, 60, 100, 1];
			let factor = units.reduce((a, b) => a*b);

			for (const [i, num] of sections.entries()) {
				let temp = Number(num);
				this.timestamp += (temp * factor);
				factor /= units[i];
			}
		}
	}
}
