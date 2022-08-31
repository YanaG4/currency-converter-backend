import express from "express";
const app = express()
import mongoose from 'mongoose';
import { getCurrenciesFirstTime } from "./controllers/currencies.js";

const DATABASE_URL = 'mongodb://0.0.0.0:27017/data'
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('/currencies', getCurrenciesFirstTime)

app.listen(5000, () => { console.log('Server running on port 5000') })