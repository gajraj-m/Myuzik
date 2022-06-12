const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 5,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 8
    },
    profilePic: {
      type: String,
      default: ""
    },
    coverPic: {
      type: String,
      default: ""
    },
    followers: {
      type: Array,
      default: []
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    bio: {
      type: String,
      min: 10,
      max: 100
    },
    location: {
      type: String,
      max: 50
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);