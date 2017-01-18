"use strict";

const cfg = require("./config.json");
const epsilon = 0.35;
const nepsilon = -epsilon;
const piOver2 = Math.PI * 0.5;

//>> Init settings
//boostKeyID            = get the key id on http://keycode.info/
//invincibleVehicle     = Makes vehicle nearly invincible
//boostYaxis            = Speed multiply also applys on y axis
//boostMultiply         = x time the speed
//boostSecure           = checks if the vehicle faces forward

const boostKey = typeof cfg.boostKeyID !== "undefined" ? cfg.boostKeyID : 78;
const invincibleVeh = typeof cfg.invincibleVehicle !== "undefined" ? cfg.invincibleVehicle : false;
const boostY = typeof cfg.boostYaxis !== "undefined" ? cfg.boostYaxis : false;
const multiply = typeof cfg.boostMultiply !== "undefined" ? cfg.boostMultiply : 4;
const boostSecure = typeof cfg.boostSecure !== "undefined" ? cfg.boostSecure : true;

jcmp.events.AddRemoteCallable("boost_vehicle", (player) => {
    let veh = player.vehicle;
    if (typeof player.vehicle !== "undefined") {
        if(boostSecure) {
            let f = AngleHorizontal(veh.linearVelocity)
                  - AngleHorizontal(new Vector3f(Math.cos(veh.rotation.y + piOver2),
                                                 0,
                                                 Math.sin(veh.rotation.y + piOver2)));

            if((f < 0 && f > nepsilon) || (f > 0 && f < epsilon)) {
                veh.linearVelocity = new Vector3f(veh.linearVelocity.x * multiply,
                                                  boostY ? veh.linearVelocity.y * multiply : veh.linearVelocity.y,
                                                  veh.linearVelocity.z * multiply);
            }
        }
        else {
            veh.linearVelocity = new Vector3f(veh.linearVelocity.x * multiply,
                                                 boostY ? veh.linearVelocity.y * multiply : veh.linearVelocity.y,
                                                 veh.linearVelocity.z * multiply);
        }

        if (invincibleVeh) {
            veh.health = 10000;
        }
    }
});

//Returns the boost key to the client
jcmp.events.AddRemoteCallable("getBoostKey", (player) => {
    jcmp.events.CallRemote("sendBoostKey", player, boostKey);
});

const xAxis = new Vector3f(1, 0, 0);
const xAxisl = Math.sqrt((xAxis.x * xAxis.x) + (xAxis.z * xAxis.z));
function AngleHorizontal(vec3) {
    return Math.acos(((vec3.x * xAxis.x) + (vec3.z * xAxis.z)) /
                     (Math.sqrt((vec3.x * vec3.x) + (vec3.z * vec3.z)) * xAxisl));
}
