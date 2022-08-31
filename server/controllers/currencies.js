import Currency from '../models/currency.js';
import fetch from "node-fetch";
import { info } from '../constants/currencyInfo.js'

export const getCurrenciesFirstTime = async (req, res) => {
    let exRates = []
    let codes = []
    let date
    try {
        await fetch('https://api.exchangerate.host/latest')
            .then((response) => response.json())
            .then((data) => {
                exRates = Object.values(data.rates);
                codes = Object.keys(data.rates);
                date = data.date
            });


        for (let i = 0; i < codes.length; i++) {
            saveOrUpdateCurrency(date, codes[i], exRates[i])
        }
        res.send('OK')
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

const saveOrUpdateCurrency = async (date, code, exRate) => {
    let currency = await Currency.findOne({ code: code })
    if (!currency) {
        currency = createNewCurrency(code)
        //console.log(currency);
    }
    else if (currency.exchangeRates[currency.exchangeRates.length - 1].date.toString() == (new Date(date)).toString()) {
        console.log(`${code} rates are already up to date`);
        return
    }
    currency.exchangeRates.push({ date: date, value: exRate })
    currency.save(function (err, data) {
        if (err) {
            console.log(error);
        }
        else {
            //console.log(currency);
        }
    });
}

const createNewCurrency = (code) => {
    let currency = new Currency({ code })
    for (let i = 0; i < info.length; i++) {
        if (info[i].code == code) {
            currency.name = info[i].name
            currency.symbol = info[i].symbol
            console.log(`${code} created`);
            return currency
        }
    }
    console.log(`For ${code} no currency-info found`);
    return currency

}