function price(){
    //reset de waarde roundWinn
    roundWinn = 0;
    //forloop om in de multidementionale "fruits" te kijken, als er iets gevonden is, is de "ronde" gewonnen

        if(slots[0][0]=== slots[1][0]=== slots[2][0]){
                    winResult.push(slots[0][0]);
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
