const ui = new WebUIWindow("getKeypresses", "package://vehicle-boost/ui/index.html", new Vector2(1, 1));

jcmp.ui.AddEvent("boostKey", () => {
    jcmp.events.CallRemote("boost_vehicle");
});

//Sends server request if client script.js ist ready
jcmp.ui.AddEvent("boostScriptReady", () => { jcmp.events.CallRemote("getBoostKey"); });

//Catches server response and applys the key to the client script
jcmp.events.AddRemoteCallable("sendBoostKey", (boostKey) => { jcmp.ui.CallEvent("applyBoostKey", boostKey); });
