const ui = new WebUIWindow("getKeypresses", "package://boost/ui/index.html", new Vector2(jcmp.viewportSize.x, jcmp.viewportSize.y));

jcmp.ui.AddEvent("boostKey", toggle => {
    jcmp.events.CallRemote("boost_vehicle", toggle);
});

jcmp.AddEvent("boostKey", toggle => {
    jcmp.events.CallRemote("boost_vehicle", toggle);
});