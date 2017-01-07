"use strict";

const cfg = require("./config.json");

//>> Init settings
//boostKeyID            = get the key id on http://keycode.info/
//invincibleVehicle     = Makes vehicle nearly invincible
//boostYaxis            = Speed multiply also applys on y axis
//boostMultiply         = x time the speed

let boostKey = typeof cfg.boostKeyID !== "undefined" ? cfg.boostKeyID : 84;
let invincibleVeh = typeof cfg.invincibleVehicle !== "undefined" ? cfg.invincibleVehicle : false;
let boostY = typeof cfg.boostYaxis !== "undefined" ? cfg.boostYaxis : false;
let multiply = typeof cfg.boostMultiply !== "undefined" ? cfg.boostMultiply : 10;

jcmp.events.AddRemoteCallable("boost_vehicle", (player) => {
    let veh = player.vehicle;
    if (typeof player.vehicle !== "undefined") {
        let yVel = boostY ? veh.linearVelocity.y * multiply : veh.linearVelocity.y;
        veh.linearVelocity = new Vector3f(veh.linearVelocity.x * multiply, yVel, veh.linearVelocity.z * multiply);
        if (invincibleVeh) {
            veh.health = 10000;
        }
    }
});

//Returns the boost key to the client
jcmp.events.AddRemoteCallable("getBoostKey", (player) => {
    jcmp.events.CallRemote("sendBoostKey", player, boostKey);
});