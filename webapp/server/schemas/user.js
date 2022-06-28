/*
 * Licensed Materials - Property of IBM
 *
 * (C) Copyright IBM Corp. 2022 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication, or
 * disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 **/

const mongoose = require("mongoose");
const joi = require("@hapi/joi");

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        min: 3
    },

    hashedToken: {
		type: String,
		required: true,

	},

    tours: {
        type: Array,
        required: true,
        default: []
    },

	created_at: { type: Date, default: Date.now }
});

const userValidationSchema = joi.object({
	hashedToken: joi.string().min(3).required(),
    email: joi.string().email().min(3).required().domain(),
    tours: joi.array().required()
});

const userValidation = (body) => {
	const { error } = userValidationSchema.validate(body);
	return error;
};

module.exports = { user: mongoose.model("user", userSchema), userValidation };
