/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/

var lever = document.querySelector('.hendel');

function flipLever(){
    lever.classList.add('flip');
    setTimeout(function (){ lever.classList.remove('lever');}, 100);
    setTimeout(function (){ lever.classList.remove('flip');}, 1000);
    lever.classList.add('lever');
}

lever.addEventListener('click', flipLever);
