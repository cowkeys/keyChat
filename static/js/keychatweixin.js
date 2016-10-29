
function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    var iswexin = ua.match(/MicroMessenger/i)=="micromessenger";
    console.log("agent:",ua);
    console.log("iswexin:",iswexin);
    if(!iswexin) {
       window.location.href='/';
    }
}

is_weixin()