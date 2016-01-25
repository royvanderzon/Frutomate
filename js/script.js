/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

var fruits = ["apple","pineapple","banana","raspberry","jslogo"]; //namen van de Fruits in een array.
var finalFruits = [[],[],[]]; //slots omgezet naar "fruits" namen.
var slots = [[ 1, 3, 0 ],[ 2, 4, 1 ],[ 3, 0, 2 ]]; //kolommen van links naar rechts (eerste rij is van links naar rechts, die daarna komt daaronder van links naar rechts, enz.)
var i, ii, iii; //indexen
var leftHold = 1; //hold linker rij (0 is uit, 1 is aan)
var middelHold = 1; //hold middelste rij (0 is uit, 1 is aan)
var rightHold = 1; //hold rechter rij (0 is uit, 1 is aan)
var winResult = []; //result gewonnen product (bijv. appel is 0, pineapple is 1, enz.)
var winResultFruit; //vormt het laatste element uit winResult om in een "fruit".
var roundWinn = 0; //iets gewonnen in een ronde, 0 is niks, 1 is minimaal één ding.
var holdQuit = 0; //zodat de "slots" weer gaan lopen nadat hij 1 beurt op hold is geweest
var betFactor = 2; //het aantal keer waardoor je je coins wilt verdubbelen
var bet = 1; //geld dat je inzet
var coinsOld = 100; //oude coins
var coinsNew = 100; //nieuwe coins
var winResultNumber = 5; //om de verdubbelfactor aan te geven. Hierdoor weet de code welke prijs je krijgt (5 is geen prijs)
var dubbelFactor = 0; //de dubbel factor die je krijgt (automatic)
var holdCounterL = 0; //hold counter left, na een beurt mag je niet meer op hold
var holdCounterM = 0; //hold counter middel, na een beurt mag je niet meer op hold
var holdCounterR = 0; //hold counter rigth, na een beurt mag je niet meer op hold
var slotIconsBoven = document.querySelector('#slotBoven');
var slotIconsMiddel = document.querySelector('#slotMiddel');
var slotIconsOnder = document.querySelector('#slotOnder');
var directorys = ["fruits","android"]; //verschillende img directory's waar je uit kan kiezen (VOOR UITBREIDING, staandaart is "fruits")
var imgBefore = '<img alt="fruit" src="./images/' + directorys[0] + "/"; //img pad voor fruits
var imgAfter = '.png"/>'; //img pad voor fruits
var hendel = document.querySelector('.lever'); //start button
var holds = document.querySelectorAll('.hold'); //hold buttons
var resultPrint = document.querySelector('.result'); //result print
var counter =0; //counter om te zien hoeveel "spins" het duurde voordat er 3x javascript getrokken werd
var countForWinnSwitch = 0;

slotIconsBoven.innerHTML = imgBefore + '0' + imgAfter + imgBefore + '1' + imgAfter + imgBefore + '2' + imgAfter;
slotIconsMiddel.innerHTML = imgBefore+ '3' + imgAfter + imgBefore + '4' + imgAfter + imgBefore + '0' + imgAfter;
slotIconsOnder.innerHTML = imgBefore + '1' + imgAfter + imgBefore + '2' + imgAfter + imgBefore + '3' + imgAfter;

//functie om één random getal tussen de 0 en 4 te genereren en vervolgens op te slaan in slots (de arrayNumber parameter word meegegeven vanuit functie "spinFruitsResult", met de parameter "ii")
function randomRowNumber(arrayNumber){
    var firstRandom;
            firstRandom = Math.floor(Math.random() * (fruits.length * 3));
            switch(firstRandom){
                    case 0: slots[arrayNumber].push(0);
                            break;
                    case 1: slots[arrayNumber].push(0);
                            break;
                    case 2: slots[arrayNumber].push(0);
                            break;
                    case 3: slots[arrayNumber].push(0);
                            break;
                    case 4: slots[arrayNumber].push(0); //apple = 33% kans
                            break;
                    case 5: slots[arrayNumber].push(1);
                            break;
                    case 6: slots[arrayNumber].push(1);
                            break;
                    case 7: slots[arrayNumber].push(1);
                            break;
                    case 8: slots[arrayNumber].push(1); //pineapple = 26,67% kans
                            break;
                    case 9: slots[arrayNumber].push(2);
                            break;
                    case 10: slots[arrayNumber].push(2);
                            break;
                    case 11: slots[arrayNumber].push(2); //banana = 20% kans
                            break;
                    case 12: slots[arrayNumber].push(3);
                            break;
                    case 13: slots[arrayNumber].push(3); //raspberry = 13.33% kans
                            break;
                    case 14: slots[arrayNumber].push(4); // jslogo = 6.67% kans
                            break;
    }
}

//checkt of er in een van de 3 rows, onder elkaar, verticaal 3 "fruits" hetzelfde zijn
function price(){
    //reset de waarde roundWinn
    roundWinn = 0;
    //forloop om in de multidementionale "fruits" te kijken, als er iets gevonden is, is de "ronde" gewonnen
    for(i=0;i<=4;i++){
        if(slots[0][0]===i && slots[1][0]===i && slots[2][0]===i){
                    winResult.push(i);
                    roundWinn = 1;
        }
        if(slots[0][1]===i && slots[1][1]===i && slots[2][1]===i){
                    winResult.push(i);
                    roundWinn = 1;
        }
        if(slots[0][2]===i && slots[1][2]===i && slots[2][2]===i){
                    winResult.push(i);
                    roundWinn = 1;
        }
    }
}

//Veranderd de nummers in de "slots" array in "fruits" en plaatst ze in "finalFruits"
function numbersToFruits(){
    //forloop voor multidem. "fruits" en zet deze om in echte fruits inplaats van nummers
    for(i=0;i<3;i++){
        for(ii=0;ii<3;ii++){
            finalFruits[i][ii]=fruits[slots[i][ii]];
        }
    }
    //laat de totale slots zien
    console.log(finalFruits[0]); //laat de linker slot zien
    console.log(finalFruits[1]); //laat de middelste slot zien
    console.log(finalFruits[2]); //laat de rechter slot zien

    //set roundwinn om bij functie price aan te gezen dat er iets gewonnen is
    if(roundWinn==1){
        winResultFruit = (fruits[winResult[winResult.length-1]]);
        winResultNumber = winResult[winResult.length-1];
    }else{
        winResultNumber = 5;
    }
}

//Systeem om per beurt dat de hold is ingeschakeld een beurt op te tellen. Als hold niet is gebruikt reset de counter zichzelf per slot
function moveCounter(){
    if(leftHold === 0){
        holdCounterL++;
        console.log("holdcounterL is: " + holdCounterL);
    }else{
        holdCounterL = 0;
        console.log("holdcounterL is: " + holdCounterL);
    }

    if(middelHold === 0){
        holdCounterM++;
        console.log("holdcounterM is: " + holdCounterM);
    }else{
        holdCounterM = 0;
        console.log("holdcounterM is: " + holdCounterM);
    }

    if(rightHold === 0){
        holdCounterR++;
        console.log("holdcounterR is: " + holdCounterR);
    }else{
        holdCounterR = 0;
        console.log("holdcounterR is: " + holdCounterR);
    }
}

function hold(){

    //om te tellen hoeveel beurten er hold wordt ingedrukt
    moveCounter();

    //if statement wat die kijkt of je hold "in het algemeen" weer mag gebruiken
    if(holdCounterL === 2 || holdCounterM === 2 || holdCounterR === 2){
        console.log("Je mag nu weer de hold gebruiken!");
    }

    //functies om de hide buttons weer terug te plaatsen nadat ze 1 keer gebruikt zijn
    if(holdCounterL === 2 || holdCounterL === 1){
        setTimeout(function (){ holds[0].classList.remove('hidden');}, 1);
    }
    if(holdCounterM === 2 || holdCounterM === 1){
        setTimeout(function (){ holds[1].classList.remove('hidden');}, 1);
    }
    if(holdCounterR === 2 || holdCounterR === 1){
        setTimeout(function (){ holds[2].classList.remove('hidden');}, 1);
    }

    if( holdCounterL === 2 || holdCounterL === 0){
        slots[0] = [];
        ii = 0;
        for(i=0;i<3;i++){
            randomRowNumber(ii);
        }
        holdQuit = 1;
        if(holdCounterL === 2){
            holdCounterL = 0;
        }
    }

    if( holdCounterM === 2 || holdCounterM === 0){
        slots[1] = [];
        ii = 1;
        for(i=0;i<3;i++){
            randomRowNumber(ii);
        }
        holdQuit = 1;
        if(holdCounterM === 2){
            holdCounterM = 0;
        }
    }

    if( holdCounterR === 2 || holdCounterR === 0){
        slots[2] = [];
        ii = 2;
        for(i=0;i<3;i++){
            randomRowNumber(ii);
        }
        holdQuit = 1;
        if(holdCounterR === 2){
            holdCounterR = 0;
        }
    }
    if(holdCounterL === 1 || holdCounterM === 1 || holdCounterR === 1){
        console.log("Je mag je vorige hold deze beurt niet gebruiken.");
    }

    //ii geeft aan in welke array hij moet komen van "slots"
    //i is voor het aantal keer dat er een random nummer moet worden gemaakt
    //slots[0] = []; is om de array te reseten
    //randomRowNumber is de random number generator
    //als holdQuit 1 is word de array niet opnieuw ge-randomized
    //als holdQuit aan heeft gestaan (vanwege de holdfunctie) wordt hij automatisch weer uitgezet met met holdQuit == 1
    if(leftHold === 1){
        slots[0] = [];
        ii = 0;
        for(i=0;i<3;i++){
            randomRowNumber(ii);
        }
        holdQuit = 1;
    }
    if(middelHold === 1){
        slots[1] = [];
        ii = 1;
        for(i=0;i<3;i++){
            randomRowNumber(ii);
        }
        holdQuit = 1;
    }
    if(rightHold === 1){
        slots[2] = [];
        ii = 2;
        for(i=0;i<3;i++){
            randomRowNumber(ii);
        }
        holdQuit = 1;
    }
    if(holdQuit==1){
        leftHold = 1;
        middelHold = 1;
        rightHold = 1;
    }

    //Geeft aan welke cijfers er worden getrokken

    console.log(slots[0]);
    console.log(slots[1]);
    console.log(slots[2]);

}

//Kijkt wat de prijs is. Hierna word de prijs keer de verdubbelfactor gedaan
function inzetRound(){
    switch(winResultNumber){
            case 0: dubbelFactor = 2;
                    break;
            case 1: dubbelFactor = 4;
                    break;
            case 2: dubbelFactor = 7;
                    break;
            case 3: dubbelFactor = 15;
                    break;
            case 4: dubbelFactor = 150;
                    break;
            case 5: dubbelFactor = 0;
                    break;
    }

    //als er "iets" is gewonnen word het nieuwe bedrag berekend met alle prijzen inc. anders wordt je ingezette bedrag * je inzet factor afgeschreven van je coins
    if(roundWinn == 1){
        coinsNew = coinsOld + (betFactor * bet * dubbelFactor);
        coinsOld = coinsNew;
    }else{
        coinsNew = coinsOld - (betFactor * bet);
        coinsOld = coinsNew;
    }
    //console.log(winResultFruit);
    //console.log(winResult[winResult.length-1]);
    //console.log(winResultNumber);
    //console.log(winResultFruit);
}

//print de goede cijfers in de HTML DOM
function print(){
    slotIconsBoven.innerHTML = imgBefore + slots[0][2] + imgAfter + imgBefore + slots[1][2] + imgAfter + imgBefore + slots[2][2] + imgAfter;
    slotIconsMiddel.innerHTML = imgBefore+ slots[0][1] + imgAfter + imgBefore + slots[1][1] + imgAfter + imgBefore + slots[2][1] + imgAfter;
    slotIconsOnder.innerHTML = imgBefore + slots[0][0] + imgAfter + imgBefore + slots[1][0] + imgAfter + imgBefore + slots[2][0] + imgAfter;
}

//functies om de hold buttons in de HTML DOM te hiden
function holdChekkerLeft(){
    holds[0].classList.add('hidden');
    leftHold = 0;
}
function holdChekkerMiddel(){
    holds[1].classList.add('hidden');
    middelHold = 0;
}
function holdChekkerRight(){
    holds[2].classList.add('hidden');
    rightHold = 0;
}



//SpinFunctie starten, roept verschillende andere functies op
function spinFruitsResult(){

    if(countForWinnSwitch === 0){
    //bet & betFactor
    bet = document.input.bet.value;
    betFactor = document.input.betFactor.value;
    }

    if(coinsNew>= bet * betFactor){
        hold();
        price();
        numbersToFruits();
        inzetRound();
        print();
        console.log("Bet was " + bet + ".");
        console.log("Bet Factor was " + betFactor + ".");
        console.log("Youre total wonn price is times: " + dubbelFactor + ".");
        console.log("You now have " + coinsNew + ".");
        resultPrint.innerHTML ="<p>Your total bet was, " + bet * betFactor + ".</p><p>Your total price was, " + bet * dubbelFactor * betFactor + ". </p><p>You now have " + coinsNew + ".</p>";
    }else{
        //alert("Sorry you don't hvae enough coins..");
        console.log("Sorry you don't have enough coins..");
    }
}

//geeft een delay voordat het "spin" proces in werking wordt gezet
function delayClick(){
    setTimeout(function (){ spinFruitsResult();}, 600);
}

//Event listeners
hendel.addEventListener('click', delayClick);
holds[0].addEventListener('click', holdChekkerLeft);
holds[1].addEventListener('click', holdChekkerMiddel);
holds[2].addEventListener('click', holdChekkerRight);

//ONLY FOR DEBUGGERS AND DEVELOPERS
function countForWinn(){
    countForWinnSwitch = 1;
    winResultFruit = "";
    do{
        betFactor = 0;
        spinFruitsResult();
        counter++;
    }while(winResultFruit != "jslogo");
    console.log(counter);
    countForWinnSwitch = 0;
}





