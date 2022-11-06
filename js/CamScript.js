var video = document.createElement("video");
var canvasElement = document.getElementById("canvas");
var canvas = canvasElement.getContext("2d");
var loadingMessage = document.getElementById("loadingMessage");
var outputContainer = document.getElementById("output");
var outputMessage = document.getElementById("outputMessage");
var outputData = document.getElementById("outputData");

function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
}

// Use facingMode: environment to attemt to get the front camera on phones
navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
    video.play();
    requestAnimationFrame(tick);
});

function tick() {
    loadingMessage.innerText = "⌛ Loading video..."
    // video ready
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        outputContainer.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        // draw cam canvas
        canvas.scale(screen.width / canvasElement.width, screen.width / canvasElement.width);
        canvas.filter = 'brightness(40%)';
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        // draw QR canvas
        canvas.filter = 'brightness(100%)';
        canvas.drawImage(video, canvasElement.width * 0.25, canvasElement.height * 0.1, canvasElement.width * 0.5, canvasElement.width * 0.5, canvasElement.width * 0.25, canvasElement.height * 0.1, canvasElement.width * 0.5, canvasElement.width * 0.5);
        canvas.lineWidth = 5;
        canvas.strokeRect(canvasElement.width * 0.25, canvasElement.height * 0.1, canvasElement.width * 0.5, canvasElement.width * 0.5);

        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
        });
        if (code
            && code.location.topLeftCorner.x > (canvasElement.width * 0.25) && code.location.topLeftCorner.y > (canvasElement.height * 0.1)
            && code.location.bottomRightCorner.x < (canvasElement.width) * 0.75 && code.location.bottomRightCorner.y < (canvasElement.height * 0.1 + canvasElement.width * 0.5)
            ) {
            alert("scale: " + screen.width / canvasElement.width);
            drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
            drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
            drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
            drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
            outputMessage.hidden = true;
            outputData.parentElement.hidden = false;
            outputData.innerText = code.data;
        } else {
            outputMessage.hidden = false;
            outputData.parentElement.hidden = true;
        }
    }
    requestAnimationFrame(tick);
}