import React, { useEffect, useState } from "react";

export default function Play() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState(0);
    const [bid, setBid] = useState('');
    const [ask, setAsk] = useState('');
    const [quote, setQuote] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [pos, setPos] = useState(0);
    const [congratsMsg, setCongratsMsg] = useState('');
    const [profit, setProfit] = useState(0);

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    useEffect(() => {
        async function fetchQuestion() {
            const response = await fetch(`http://localhost:8080/record/${getRandomInt(0, 2)}`);
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }
            const record = await response.json();
            if (!record) {
                window.alert(`Record with id number not found`);
                return;
            }
            setQuestion(record.question);
            setAnswer(record.answer);
        }
        fetchQuestion();
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        let errorHandled = checkAndFixError();
        if (errorHandled) {
            return;
        }
        makeQuote(); 
    }

    const checkAndFixError = () => {
        if (bid === '' && ask === '') {
            setErrorMsg('Please enter bid and ask values.')
            return true;
        }
        if (bid === '') {
            setErrorMsg('Please enter a bid value.');
            return true;
        }
        if (ask === '') {
            setErrorMsg('Please enter an ask value.')
            return true;
        }
        if (parseInt(bid) >= parseInt(ask)) {
            setErrorMsg('Please make sure your bid is less than your ask.')
            return true;
        }
        return false;
    }

    const makeQuote = () => {
        let bidPrice = parseInt(bid);
        let askPrice = parseInt(ask);
        setErrorMsg(''); 
        // Need to see if answer is even inside interval. 
        if (askPrice <= answer) {
            setQuote(`Alexa bought from you at ${ask}.`);
            setPos(pos - 1);
            setProfit(profit + askPrice);
        } else if (bidPrice >= answer) {
            setQuote(`Alexa sold to you at ${bid}.`);
            setPos(pos + 1);
            setProfit(profit - bidPrice);
        } else {
            // Want player to narrow down spread and neutralize position.
            let goalBidPrice = Math.floor(answer * 0.9);
            let goalAskPrice = Math.ceil(answer * 1.1);
            console.log(goalBidPrice);
            console.log(goalAskPrice);
            if (bidPrice >= goalBidPrice && ask <= goalAskPrice) { 
                if (pos < 0) {
                    setQuote(`Alexa sold to you at ${bid}.`);
                    setPos(pos + 1);
                    setProfit(profit - bidPrice);
                    if (pos + 1 === 0) {
                        setCongratsMsg(`Congratulations! You have created a fair market and neutralized your position. The actual answer is ${answer}.`);
                    }
                } else if (pos > 0) {
                    setQuote(`Alexa bought from you at ${ask}.`);
                    setPos(pos - 1);
                    setProfit(profit + askPrice);
                    if (pos - 1 === 0) {
                        setCongratsMsg(`Congratulations! You have created a fair market and neutralized your position. The actual answer is ${answer}.`);
                    }
                }  
            } else {
                let bidPriceSpread = answer - bidPrice;
                let askPriceSpread = askPrice - answer;
                let percentDiffBidToAsk = (askPriceSpread - bidPriceSpread) / bidPrice;
                if (Math.abs(percentDiffBidToAsk) <= 0.1) {
                    console.log('here');
                    setQuote(`Your bid-ask spread is too big for Alexa, so she currently won't transact.`);
                    return;
                }
                else if (bidPriceSpread < askPriceSpread) {
                    console.log('here');
                    setQuote(`Alexa sold to you at ${bid}.`);
                    setPos(pos + 1);
                    setProfit(profit - bidPrice);
                } else {
                    setQuote(`Alexa bought from you at ${ask}.`);
                    setPos(pos - 1);
                    setProfit(profit + askPrice);
                }
            }
        }
    }

    return (
        <>  
            <div id="form">
            <div>
                <h1>{question}</h1>
                <h2>{congratsMsg}</h2>
                <h3>Profit: {profit}.</h3>
                <h3>{quote}</h3>
                <h4>{errorMsg}</h4>
                <h5>Your position is currently {pos}.</h5>
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='bid'>Bid</label>
                    <input
                        name='bid'
                        pattern='[0-9]*'
                        value={bid}
                        onChange={(e) =>
                            setBid((v) => (e.target.validity.valid ? e.target.value : v))
                        }
                    />
                </div>
                <div>
                    <label htmlFor='ask'>Ask</label>
                    <input
                        name='ask'
                        pattern='[0-9]*'
                        value={ask}
                        onChange={(e) =>
                            setAsk((v) => (e.target.validity.valid ? e.target.value : v))
                        }
                    />
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
            </div>
        </>     
    );
}