(function () {
    document.onkeydown = function (event) {
        if (event.keyCode == 78) {
            jcmp.CallEvent("boostKey");
        }
    };
})();