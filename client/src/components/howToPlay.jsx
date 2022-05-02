export default function HowToPlay() {
    return (
        <div class='htp'>
            <h1>How to Play</h1>
            <h2>Meet Alexa.</h2>
            <p>
                Hedge fund Alexa is who you will be playing the game with. Alexa
                knows the correct answer the whole time and isn't afraid to take 
                advantage of bad markets you make for her profit. However, once
                you make a "fair market", she'll transact with you to help you 
                become "neutral," thus, ending the game. But that's a little
                confusing ...
            </p>
            <h2>What is a "fair market?"</h2>
            <p>
                For the purposes of our game, a fair market is a market where your
                buy (bid) price is within ten percent lower than the answer (theoretical)
                and your sell (ask) price is within then percent above the answer.
            </p>
            <h2>What is being "neutral?"</h2>
            <p>
                When you buy, Alexa sells to you at your bid price and your position 
                increases by one. When you sell, Alexa buys from you at your ask price
                and your position decreases by one. For most market makers, your goal is
                to stay as neutral as possible, meaning your position is zero. That way,
                you are not taking on much risk and just making profit off the difference
                in your buy and sell prices. But how exactly do you do this?
            </p>
            <h2>The technique: Bid-ask skew.</h2>
            <p>
                Two classic ways to make money are (1) buy low and sell high and (2) sell
                high and buy low. Say I'm making a market around Michael Jordan's height
                in inches. Alexa knows that the correct answer is 78 in., and say I think 
                the answer is 68 in. (I must really not be in to basketball.) I want to 
                make my market wide to start off because I am not too confident in my guess.
                So I make my bid 62 and my ask 74. Alexa is going to buy from me at 74 because
                that's cheaper than the real value 78. Now, my position is -1 because I sold.
                I want to get back to neutral position, so I'm going to skew my ask to a price
                that should be very unattractive, and shift my bid up just a little bit to make
                that price more attractive. So my new bid-ask spread is 64-84. Alexa likes that
                market because it's fair, so now help me get back to neutral and end the game.
                If your original spread overshoots the answer, then everything is vice-versa.
                Good luck!
            </p>
        </div>  
    );
}