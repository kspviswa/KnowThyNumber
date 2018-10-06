// by Chtiwi Malek on CODICODE.COM

var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#clear-area').mousedown(function (e) {
        clearArea();
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });



    document.addEventListener('touchstart',function(e){ mapTouchEvents(e,'mousedown'); },true);
    document.addEventListener('touchmove',function(e){ mapTouchEvents(e,'mousemove'); },true);
    document.addEventListener('touchend',function(e){ mapTouchEvents(e,'mouseup'); },true);
    document.addEventListener('touchcancel',function(e){ mapTouchEvents(e,'mouseup'); },true);

}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = $('#selColor').val();
        // ctx.lineWidth = $('#selWidth').val();
        ctx.lineWidth = 9;
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
} 

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}