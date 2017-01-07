"use strict";

jcmp.events.AddRemoteCallable("boost_vehicle", (player, toggle) => {
    console.log(toggle);
    if (typeof player.vehicle !== "undefined") {
        console.log("Vehicle != undefined");
        if (toggle) {
            player.vehicle.linearVelocity = new Vector3f(player.vehicle.linearVelocity.x * 10, player.vehicle.linearVelocity.y, player.vehicle.linearVelocity.z * 10);
        }
    }
});

jcmp.events.AddRemoteCallable("doAction", (player, msg) => {
    console.log(msg);
});