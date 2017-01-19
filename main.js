"use strict";

const cfg = require("./config.json");
const epsilon = 0.35;
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
    let v = player.vehicle;
    if (typeof player.vehicle !== "undefined") {
        if(boostSecure) {
            let posV = new Vector3f(Math.cos(v.rotation.y + piOver2), 0, Math.sin(v.rotation.y + piOver2));
            let f = AngleHorizontal(v.linearVelocity) - AngleHorizontal(posV);

            if((f < 0 && f > -epsilon) || (f > 0 && f < epsilon)) {
                BoostVehicle(v);
            }
        }
        else { BoostVehicle(v); }

        if (invincibleVeh) {
            v.health = 10000;
        }
    }
});

//Returns the boost key to the client
jcmp.events.AddRemoteCallable("getBoostKey", (player) => {
    jcmp.events.CallRemote("sendBoostKey", player, boostKey);
});

function BoostVehicle(v) {
    v.linearVelocity = new Vector3f(v.linearVelocity.x * multiply,
                                    boostY ? v.linearVelocity.y * multiply : v.linearVelocity.y,
                                    v.linearVelocity.z * multiply);
}

function AngleHorizontal(vec3) {
    return Math.acos(vec3.x / (Math.sqrt((vec3.x * vec3.x) + (vec3.z * vec3.z))));
}
