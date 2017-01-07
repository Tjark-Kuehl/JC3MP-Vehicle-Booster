(function () {
    document.onkeydown = function (event) {
        if (event.keyCode == 78) {
            jcmp.CallEvent("boostKey", true);
        }
    };
    document.onkeyup = function (event) {
        if (event.keyCode == 78) {
            jcmp.CallEvent("boostKey", false);
        }
    };
})();