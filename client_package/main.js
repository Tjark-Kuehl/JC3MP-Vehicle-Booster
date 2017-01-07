const ui = new WebUIWindow("getKeypresses", "package://vehicle-boost/ui/index.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));

jcmp.ui.AddEvent("boostKey", function() {
    jcmp.events.CallRemote("boost_vehicle");
});

jcmp.AddEvent("boostKey", function () {
    jcmp.events.CallRemote("boost_vehicle");
});