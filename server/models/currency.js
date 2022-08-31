import mongoose from "mongoose";



const currencySchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    name: String,
    symbol: String,
    flag: String,
    minorUnitValue: Number,
    countries: [String],
    exchangeRates: [{
        date: Date,
        value: mongoose.Types.Decimal128
    }]
})

const Currency = mongoose.model('Currency', currencySchema)
export default Currency