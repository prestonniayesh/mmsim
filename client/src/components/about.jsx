export default function About() {
    return (
        <div class='about'>
            <h1>What's this simulator for?</h1>
            <p>
                Market making involves listing prices you're willing to buy (bid)
                and sell (ask) at. In trading interviews, companies will sometimes
                ask for you to play a market making game with them, where they ask
                you a random question with a numerical answer, and you have to keep
                making a market for the answer until your market is "fair." For the
                purposes of this simulator, "fair" means you are within ten percent
                on both sides. (In the real world, for a security, it's typically 
                about two percent.) Play this simulator to practice the techniques
                for creating a fair market when the theoretical value is initially
                unknown to you!
            </p>
        </div>  
    );
}