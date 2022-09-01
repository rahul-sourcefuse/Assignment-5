"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const index_1 = __importDefault(require("./routes/index"));
const app = express();
const cors = require("cors");
app.use(express.json({ limit: "30mb" }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(index_1.default);
app.listen(2900, () => {
    console.log('server is running on 2900');
});
