const OverrideTag = require("../src/OverrideTag");
const { VariableType, ParameterClass, ParameterOptional } = require("../src/Enumerables");

function loadValidTags() {
	let valids = [], names = [];

	// \alpha&H<aa>&
	names.push("\\alpha")
	valids.push(new OverrideTag("\\alpha"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.ALPHA)

	// \bord<depth>
	names.push("\\bord")
	valids.push(new OverrideTag("\\bord"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \xbord<depth>
	names.push("\\xbord")
	valids.push(new OverrideTag("\\xbord"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \ybord<depth>
	names.push("\\ybord")
	valids.push(new OverrideTag("\\ybord"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \shad<depth>
	names.push("\\shad")
	valids.push(new OverrideTag("\\shad"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \xshad<depth>
	names.push("\\xshad")
	valids.push(new OverrideTag("\\xshad"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \yshad<depth>
	names.push("\\yshad")
	valids.push(new OverrideTag("\\yshad"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \fade(<a1>,<a2>,<a3>,<t1>,<t2>,<t3>,<t4>)
	names.push("\\fade")
	valids.push(new OverrideTag("\\fade"))
	valids[-1].addParameter(VariableType.INT)
	valids[-1].addParameter(VariableType.INT)
	valids[-1].addParameter(VariableType.INT)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START)


	// \move(<x1>,<y1>,<x2>,<y2>)
	names.push("\\move")
	valids.push(new OverrideTag("\\move"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_Y)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_Y)


	// \move(<x1>,<y1>,<x2>,<y2>[,<t1>,<t2>])
	names.push("\\move")
	valids.push(new OverrideTag("\\move"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_Y)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_Y)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START)


	// \clip([<scale>,]<some drawings>)
	names.push("\\clip")
	valids.push(new OverrideTag("\\clip"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_Y)
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_Y)


	// \clip([<scale>,]<some drawings>)
	names.push("\\clip")
	valids.push(new OverrideTag("\\clip"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.NORMAL, ParameterOptional.OPTIONAL_2)
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.DRAWING)



	// \iclip(<x1>,<y1>,<x2>,<y2>)
	names.push("\\iclip")
	valids.push(new OverrideTag("\\iclip"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_Y)
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_Y)


	// \iclip([<scale>,]<some drawings>)
	names.push("\\iclip")
	valids.push(new OverrideTag("\\iclip"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.NORMAL, ParameterOptional.OPTIONAL_2)
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.DRAWING)


	// \fscx<percent>
	names.push("\\fscx")
	valids.push(new OverrideTag("\\fscx"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.RELATIVE_SIZE_X)


	// \fscy<percent>
	names.push("\\fscy")
	valids.push(new OverrideTag("\\fscy"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.RELATIVE_SIZE_Y)


	// \pos(<x>,<y>)
	names.push("\\pos")
	valids.push(new OverrideTag("\\pos"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_POS_Y)

	// \org(<x>,<y>)
	names.push("\\org")
	valids.push(new OverrideTag("\\org"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_X)
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_Y)


	// \pbo<y>
	names.push("\\pbo")
	valids.push(new OverrideTag("\\pbo"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_POS_Y)


	// \fad(<t1>,<t2>)
	names.push("\\fad")
	valids.push(new OverrideTag("\\fad"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_END)


	// \fsp<pixels>
	names.push("\\fsp")
	valids.push(new OverrideTag("\\fsp"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \frx<degrees>
	names.push("\\frx")
	valids.push(new OverrideTag("\\frx"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \fry<degrees>
	names.push("\\fry")
	valids.push(new OverrideTag("\\fry"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \frz<degrees>
	names.push("\\frz")
	valids.push(new OverrideTag("\\frz"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \fr<degrees>
	names.push("\\fr")
	valids.push(new OverrideTag("\\fr"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \fax<factor>
	names.push("\\fax")
	valids.push(new OverrideTag("\\fax"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \fay<factor>
	names.push("\\fay")
	valids.push(new OverrideTag("\\fay"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \1c&H<bbggrr>&
	names.push("\\1c")
	valids.push(new OverrideTag("\\1c"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.COLOR)


	// \2c&H<bbggrr>&
	names.push("\\2c")
	valids.push(new OverrideTag("\\2c"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.COLOR)


	// \3c&H<bbggrr>&
	names.push("\\3c")
	valids.push(new OverrideTag("\\3c"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.COLOR)


	// \4c&H<bbggrr>&
	names.push("\\4c")
	valids.push(new OverrideTag("\\4c"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.COLOR)


	// \1a&H<aa>&
	names.push("\\1a")
	valids.push(new OverrideTag("\\1a"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.ALPHA)


	// \2a&H<aa>&
	names.push("\\2a")
	valids.push(new OverrideTag("\\2a"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.ALPHA)


	// \3a&H<aa>&
	names.push("\\3a")
	valids.push(new OverrideTag("\\3a"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.ALPHA)


	// \4a&H<aa>&
	names.push("\\4a")
	valids.push(new OverrideTag("\\4a"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.ALPHA)

	// \fe<charset>

	names.push("\\fe")
	valids.push(new OverrideTag("\\fe"))
	valids[-1].addParameter(VariableType.TEXT)


	// \ko<duration>
	names.push("\\ko")
	valids.push(new OverrideTag("\\ko"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.KARAOKE)


	// \kf<duration>
	names.push("\\kf")
	valids.push(new OverrideTag("\\kf"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.KARAOKE)


	// \be<strength>
	names.push("\\be")
	valids.push(new OverrideTag("\\be"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.ABSOLUTE_SIZE)


	// \blur<strength>
	names.push("\\blur")
	valids.push(new OverrideTag("\\blur"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \fn<name>
	names.push("\\fn")
	valids.push(new OverrideTag("\\fn"))
	valids[-1].addParameter(VariableType.TEXT)


	// \fs+<size>
	names.push("\\fs+")
	valids.push(new OverrideTag("\\fs+"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \fs-<size>
	names.push("\\fs-")
	valids.push(new OverrideTag("\\fs-"))
	valids[-1].addParameter(VariableType.FLOAT)


	// \fs<size>
	names.push("\\fs")
	valids.push(new OverrideTag("\\fs"))
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.ABSOLUTE_SIZE)


	// \an<alignment>
	names.push("\\an")
	valids.push(new OverrideTag("\\an"))
	valids[-1].addParameter(VariableType.INT)


	// \c&H<bbggrr>&
	names.push("\\c")
	valids.push(new OverrideTag("\\c"))
	valids[-1].addParameter(VariableType.TEXT, ParameterClass.COLOR)


	// \b<0/1/weight>
	names.push("\\b")
	valids.push(new OverrideTag("\\b"))
	valids[-1].addParameter(VariableType.INT)


	// \i<0/1>
	names.push("\\i")
	valids.push(new OverrideTag("\\i"))
	valids[-1].addParameter(VariableType.BOOLEAN)


	// \u<0/1>
	names.push("\\u")
	valids.push(new OverrideTag("\\u"))
	valids[-1].addParameter(VariableType.BOOLEAN)


	// \s<0/1>
	names.push("\\s")
	valids.push(new OverrideTag("\\s"))
	valids[-1].addParameter(VariableType.BOOLEAN)


	// \a<alignment>
	names.push("\\a")
	valids.push(new OverrideTag("\\a"))
	valids[-1].addParameter(VariableType.INT)


	// \k<duration>
	names.push("\\k")
	valids.push(new OverrideTag("\\k"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.KARAOKE)


	// \K<duration>
	names.push("\\K")
	valids.push(new OverrideTag("\\K"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.KARAOKE)


	// \q<0-3>
	names.push("\\q")
	valids.push(new OverrideTag("\\q"))
	valids[-1].addParameter(VariableType.INT)


	// \p<n>
	names.push("\\p")
	valids.push(new OverrideTag("\\p"))
	valids[-1].addParameter(VariableType.INT)


	// \r[<name>]
	names.push("\\r")
	valids.push(new OverrideTag("\\r"))
	valids[-1].addParameter(VariableType.TEXT)


	// \t([<t1>,<t2>,][<accel>,]<style modifiers>)
	names.push("\\t")
	valids.push(new OverrideTag("\\t"))
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START, ParameterOptional.OPTIONAL_3 | ParameterOptional.OPTIONAL_4)
	valids[-1].addParameter(VariableType.INT, ParameterClass.RELATIVE_TIME_START, ParameterOptional.OPTIONAL_3 | ParameterOptional.OPTIONAL_4)
	valids[-1].addParameter(VariableType.FLOAT, ParameterClass.NORMAL, ParameterOptional.OPTIONAL_2 | ParameterOptional.OPTIONAL_4)
	valids[-1].addParameter(VariableType.OVERRIDE, ParameterClass.OVERRIDE)


	/**
	 * @type {Map<string, OverrideTag[]>}
	 */
	var tagMap = new Map();

	for (let i = 0; i < names.length; i++) {
		// if (tagMap.has(names[i])) {
		tagMap.set(names[i], (tagMap.get(names[i]) || []).concat([valids[i]]));
		// } else {
		// 	tagMap.set(names[i], [valids[i]]);
		// }
	}
}

module.exports = loadValidTags;
