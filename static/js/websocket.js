var socket;

$(document).ready(function () {
    // Create a socket
    socket = new WebSocket('ws://' + window.location.host + '/ws/join?roomid='+ $('#roomid').text()+'&uname=' + $('#uname').text());
    // Message received on the socket
    socket.onmessage = function (event) {
        var data = JSON.parse(event.data);
        //console.log(data);
        var date  = new Date();
        var time = date.getHours() + ":" + date.getMinutes() + ":"+date.getSeconds();
        switch (data.Type) {
        case 0: // JOIN
            if (data.User == $('#uname').text()) {
                $("#chatbox li").last().after(`<li class="mdl-list__item mdl-list__item--three-line">
    <span class="mdl-list__item-primary-content">
      <span style="color:gray;font-size:70%"> [`+time+`]</span><span style="color:green">You</span>
      <span style="color:green" class="mdl-list__item-text-body">
        joined the chat room.
      </span>
    </span>
  </li>`);
            } else {
                $("#chatbox li").last().after(`<li class="mdl-list__item mdl-list__item--three-line">
    <span class="mdl-list__item-primary-content">
     <span style="color:gray;font-size:70%"> [`+time+`]</span><span style="color:green">`+data.User+`</span>
      <span style="color:green" class="mdl-list__item-text-body">
        joined the chat room.
      </span>
    </span>
  </li>`);
            }
            break;
        case 1: // LEAVE
            $("#chatbox li").last().after(`<li class="mdl-list__item mdl-list__item--three-line">
    <span class="mdl-list__item-primary-content">
      <span style="color:gray;font-size:70%"> [`+time+`]</span><span style="color:red">`+data.User+`</span>
      <span style="color:red" class="mdl-list__item-text-body">
        left the chat room.
      </span>
    </span>
  </li>`);
            break;
        case 2: // MESSAGE
            $("#chatbox li").last().after(`<li class="mdl-list__item mdl-list__item--three-line">
    <span class="mdl-list__item-primary-content">
       <span style="color:gray;font-size:70%"> [`+time+`]</span><span style="color:gray" >`+data.User+`</span>
      <span style="color:black" class="mdl-list__item-text-body">
        `+data.Content+`
      </span>
    </span>
  </li>`);
           
            break;
        }
    };

    // Send messages.
    var postConecnt = function () {
        var uname = $('#uname').text();
        var content = $('#sendbox').val().trim();
        try {
            socket.send(content);
        } catch (error) {
            var date  = new Date();
            var time = date.getHours() + ":" + date.getMinutes() + ":"+date.getSeconds();
            $("#chatbox li").last().after(`<li class="mdl-list__item mdl-list__item--three-line">
    <span class="mdl-list__item-primary-content">
     <span style="color:gray;font-size:70%"> [`+time+`]</span><span style="color:red">You</span>
      <span style="color:red" class="mdl-list__item-text-body">
        sorry,6 mins time out, you have to refresh again.
      </span>
    </span>
  </li>`);
              
        }
        
        $('#sendbox').val("");
        $('#chatbox').animate({
        scrollTop: $('#chatbox').scrollTop()+350
          }, 300);
          //$('#chatbox').scrollTop(250)
          //alert($('#chatbox').scrollTop(300));
        
    }
    var u = navigator.userAgent
    var ismobile =  !!u.match(/AppleWebKit.*Mobile.*/) //是否为移动终端    
    console.log("ismobile:",ismobile);
    $('#sendbtn').click(function () {
        var chattext = $('#sendbox').val().trim();
        if ($('#sendbox').val() != "" && chattext.length <100 ){
            postConecnt();
        }
        if (!ismobile) {
                $( "#sendbox" ).focus();
            }  
    });
    
    document.onkeydown=keyListener;   
    function keyListener(e){    
        if(e.keyCode == 13){ 
            if (!ismobile) {
                $( "#sendbox" ).focus();
            }  
            var chattext = $('#sendbox').val()
            if ($('#sendbox').val() != "" && chattext.length <100 ){
                postConecnt();
            }
            

        }   
    }   
});
