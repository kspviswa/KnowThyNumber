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

    $('#upload-area').mousedown(function (e) {
        uploadArea2();
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
        //alert("mouseup")
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
        //alert("mouseleave")
    });

    document.addEventListener('touchstart',function(e){ mapTouchEvents(e,'mousedown'); },true);
    document.addEventListener('touchmove',function(e){ mapTouchEvents(e,'mousemove'); },true);
    document.addEventListener('touchend',function(e){ mapTouchEvents(e,'mouseup'); },true);
    document.addEventListener('touchcancel',function(e){ mapTouchEvents(e,'mouseup'); },true);

}

function uploadArea() {
    alert('Inside Upload....');
    console.log("Inside Upload....");
    var image = document.getElementById("myCanvas").toDataURL("image/png").replace("image/png", "image/octet-stream");
    var data = new FormData();
    data["file"] = image;
    console.log(data);
    $.ajax({
        url: 'http://localhost:9000/upload/',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, 
        contentType: false,  
        success: function( data , textStatus , jqXHR )
        {                
            if( typeof data.error === 'undefined' ) {                    
                submitForm( event, data ); 
            } else {                    
                alert( 'ERRORS: ' + data.error ); 
            }
        },
        error: function(jqXHR, textStatus, errorThrown) { alert( 'error on upload' ); }
        
    });
}

function uploadArea2() {
    var canvas = document.getElementById("myCanvas")
    canvas.toBlob(
        function (blob) {
            // Do something with the blob object,
            // e.g. creating a multipart form for file uploads:
            var formData = new FormData();
            formData.append('file', blob, "predict.jpg");
            $.ajax({
                url: 'http://localhost:9000/upload/',
                type: 'POST',
                data: formData,
                cache: false,
                dataType: 'html',
                processData: false, 
                contentType: false,  
                success: function( data , textStatus , jqXHR )
                {                
                    if( typeof data.error === 'undefined' ) {                    
                        submitForm( event, data ); 
                    } else {                    
                        alert( 'ERRORS: ' + data.error ); 
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) { alert( 'error on upload2' ); alert(textStatus);}
                
            });
            /* ... */
        },
        'image/jpeg'
    );

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

    //alert("Drawing done....");
    //console.log("Drawing done.....");
    //doUpload();
} 

function clearArea() {
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}