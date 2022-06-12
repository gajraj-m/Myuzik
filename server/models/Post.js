const express = require("express");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        max: 500,
        required: true
    },
    img: {
        type: String,
        default: ""
    },
    likes: {
        type: Array,
        default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
