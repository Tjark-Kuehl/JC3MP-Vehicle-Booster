"use strict";

jcmp.events.AddRemoteCallable("boost_vehicle", player => {
    if (typeof player.vehicle !== "undefined") {
        player.vehicle.linearVelocity = new Vector3f(player.vehicle.linearVelocity.x * 10, player.vehicle.linearVelocity.y, player.vehicle.linearVelocity.z * 10);
    }
});