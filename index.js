const config = require("./CONFIG/config.json");

const express = require("express");
const boyParser = require("body-parser");

const port = config.api.port;

const ACCuserName = config.wallet.username;
const ACCpassword = config.wallet.password;
const TransactionMemo = config.wallet.TransactionMemo;

const app = express();

app.use(boyParser.json());

app.listen(port, () => {
    console.log("API is running on port " + port + "!");
})

app.get("/getDuco/:userName", async (req, res) => {
    const { userName } = req.params;

    const DecimalPrecision = 100;
    const AMOUNT = Math.floor(Math.random() * (3 * DecimalPrecision - 1 * DecimalPrecision) + 1 * DecimalPrecision) / (1 * DecimalPrecision);

    const sendDuco = await fetch(
        "http://server.duinocoin.com/transaction/?username=" + ACCuserName + "&password=" + ACCpassword + "&recipient=" + userName + "&amount=" + AMOUNT + "&memo=" + TransactionMemo
    );
    
    if(sendDuco.ok) {
        const sendDucoResponse = await sendDuco.json(); 

        if (sendDucoResponse.success == true) {

            res.status(200).json({
                message: sendDucoResponse.result,
            });

            console.log(sendDucoResponse.result);

        } else {

            res.status(200).json({
                message: "Something went wrong! 1)"
            });

            console.log(sendDucoResponse);

        }

    } else {

        res.status(200).json({
            message: "Something went wrong! 2)"
        });

    }
})