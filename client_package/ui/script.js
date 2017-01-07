(function () {
    var keyID = 78;

    //Sets the new keyID
    jcmp.AddEvent("applyBoostKey", (key) => {
        keyID = key;
    }); 

    document.onkeydown = (event) => {
        if (event.keyCode == keyID) {
            jcmp.CallEvent("boostKey");
            console.log(called);
        }
    };

    jcmp.CallEvent("boostScriptReady");
})();