const VariableType = {
	INT: "int",
	FLOAT: "float",
	TEXT: "text",
	BOOLEAN: "boolean",
	OVERRIDE: "override"
};

const EntryType = {
	INFO: 0,
	STYLE: 1,
	FONT: 2,
	GRAPHIC: 3,
	DIALOGUE: 4,
	EXTRADATA: 5,
};

const ParameterClass = {
	NORMAL: 0,
	ABSOLUTE_SIZE: 1,
	ABSOLUTE_POS_X: 2,
	ABSOLUTE_POS_Y: 3,
	RELATIVE_SIZE_X: 4,
	RELATIVE_SIZE_Y: 5,
	RELATIVE_TIME_START: 6,
	RELATIVE_TIME_END: 7,
	KARAOKE: 8,
	DRAWING: 9,
	ALPHA: 10,
	COLOR: 11,
	OVERRIDE: 12
};


const ParameterOptional = {
	NOT_OPTIONAL: 0xFF,
	OPTIONAL_1: 0x01,
	OPTIONAL_2: 0x02,
	OPTIONAL_3: 0x04,
	OPTIONAL_4: 0x08,
	OPTIONAL_5: 0x10,
	OPTIONAL_6: 0x20,
	OPTIONAL_7: 0x40
};

const DialogueBlockType = {
	PLAIN: "plain",
	COMMENT: "comment",
	DRAAWING: "drawing",
	OVERRIDE: "override"
};


module.exports = {
	VariableType,
	EntryType,
	ParameterClass,
	ParameterOptional,
	DialogueBlockType
};
