$(document).ready(function() {
    SetWashingMachine();
});

function SetWashingMachine(){
    // clear container
    $('.container-washingmachine').empty();

    // get machineInfo and setMachines
    // getMachineInfo();
    // setMachines
    $('.container-washingmachine').append('<div class="container-washingmachine-element">'
    + '<button type="button" class="button-washingmachine">'
    +   '<span class="name-washingmachine">지관 9-1</span>'
    +   '<div class="circular-progress-time"></div>'
    +   '<img src="./assets/washingmachine.png" alt="washingmachine">'
    +   '<span class="time-washingmachine">0분</span>'
    + '</button>'
    + '<button type="button" class="button-washingmachine-reservation" onclick="ReservationButtonClicked()"><img src="./assets/button_reservation.png" alt="button_reservation"></button>'
    + '</div>');

    $('.container-washingmachine').append('<div class="container-washingmachine-element">'
    + '<button type="button" class="button-washingmachine">'
    +   '<span class="name-washingmachine">지관 9-2</span>'
    +   '<div class="circular-progress-time"></div>'
    +   '<img src="./assets/washingmachine.png" alt="washingmachine">'
    +   '<span class="time-washingmachine">0분</span>'
    + '</button>'
    + '<button type="button" class="button-washingmachine-reservation" onclick="ReservationButtonClicked()"><img src="./assets/button_reservation.png" alt="button_reservation"></button>'
    + '</div>');
}

function UseButtonClicked(){
    location.href = 'WashingMachineCamera.html';
}

function ReservationButtonClicked(){
    location.href = 'WashingMachineCamera.html';
}