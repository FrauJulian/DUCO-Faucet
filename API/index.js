const config = require("./CONFIG/config.json");
const data = require("./CONFIG/data.json");

const express = require("express");
const { JsonDB, Config } = require("node-json-db");
const boyParser = require("body-parser");

const port = config.api.port;

const db = new JsonDB(new Config("./CONFIG/data.json", true, true, '/'));

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

    if (!data.time + userName) {
        db.push("/time/" + userName + "/", 0);
    }

    if (data.time + userName == 0) {
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

                db.push("/time/" + userName + "/", 25);
    
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
    } else {
        res.status(200).json({
            message: "You still have to wait at least " + data.time + userName + "hours!"
        });
    }

})
