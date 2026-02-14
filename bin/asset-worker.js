// asset-worker.js - Handles async asset loading for OpenFL (Skins, Lines, Explosions)
// console.log("DEBUG: Asset Worker Started");

self.onmessage = async function(e) {
    var msg = e.data;

    // ========================================================================
    // HANDLER: LOAD WEAPON SKIN (ANIMATED)
    // ========================================================================
    if (msg.type === "loadWeaponSkin") {
        var weaponId = msg.weaponId;
        var skinId = msg.skinId;
        var basePath = msg.basePath; 
        var frames = [];
        
        async function fetchFrame(path) {
            try {
                var resp = await fetch(path);
                if (!resp.ok) return null;
                var blob = await resp.blob();
                return await createImageBitmap(blob);
            } catch (err) { return null; }
        }

        var i = 1;
        var foundAnimated = false;
        var searchPath = (skinId > 0) ? (basePath + "skins/" + skinId + "/") : basePath;
        
        while (i < 100) {
            var bmp = null;
            var p4 = i.toString().padStart(4, '0');
            bmp = await fetchFrame(searchPath + "frame_" + p4 + ".png");
            if (!bmp) bmp = await fetchFrame(searchPath + "Frame_" + p4 + ".png"); 

            if (!bmp) {
                bmp = await fetchFrame(searchPath + "frame_" + i + ".png");
                if (!bmp) bmp = await fetchFrame(searchPath + "Frame_" + i + ".png");
            }

            if (!bmp) {
                 var p2 = i.toString().padStart(2, '0');
                 bmp = await fetchFrame(searchPath + "frame_" + p2 + ".png");
            }

            if (bmp) {
                frames.push(bmp);
                foundAnimated = true;
                i++;
            } else {
                break; 
            }
        }

        if (!foundAnimated) {
            var staticBmp = await fetchFrame(searchPath + "weapon.png");
            if (staticBmp) {
                frames.push(staticBmp);
            } else if (skinId > 0) {
                 var defaultBmp = await fetchFrame(basePath + "weapon.png");
                 if (defaultBmp) frames.push(defaultBmp);
            }
        }
        
        if (frames.length > 0) {
            postMessage({ type: "skinLoaded", weaponId: weaponId, skinId: skinId, images: frames }, frames);
        } else {
            postMessage({ type: "skinError", weaponId: weaponId, skinId: skinId });
        }
    }

    // ========================================================================
    // HANDLER: LOAD WEAPON LINES (BATCH)
    // ========================================================================
    else if (msg.type === "loadWeaponLine") {
        var lines = ["REGULAR", "LASER", "LASER6", "LASER7", "LASER9", "MEDIEVAL"];
        var results = {};
        var transferables = [];

        async function fetchLine(name) {
            try {
                var path = "assets/weaponLines/" + name + ".png";
                var resp = await fetch(path);
                if (resp.ok) {
                    var blob = await resp.blob();
                    return await createImageBitmap(blob);
                }
                return null;
            } catch(e) { return null; }
        }

        var promises = lines.map(async (name) => {
            var bmp = await fetchLine(name);
            if (bmp) {
                results[name] = bmp;
                transferables.push(bmp);
            } else if (name !== "REGULAR") {
                var defBmp = await fetchLine("REGULAR");
                if (defBmp) {
                    results[name] = defBmp;
                    transferables.push(defBmp);
                }
            }
        });

        await Promise.all(promises);

        postMessage({ type: "weaponLinesLoaded", data: results }, transferables);
    }

    // ========================================================================
    // HANDLER: LOAD EXPLOSIONS (BATCH)
    // ========================================================================
    else if (msg.type === "loadExplosions") {
        // EXACT FOLDER NAMES FROM YOUR SCREENSHOT
        var types = [
            "grenade_blow", "thunderbringer_blow", "snowgun_blow", "tesla_blow", 
            "toxic_blow", "D-walt_blow", "kamikaze_blow", "medieval_blow",
            "elemental_blow", "elemental3_blow", "rocket9_blow"
        ];
        
        var results = {};
        var transferables = [];

        var loadSequence = async function(fullType) {
            var frames = [];
            var i = 1;
            
            // D-walt_blow -> D-walt
            var baseName = fullType.replace("_blow", "");
            var folder = "assets/explosions/" + fullType + "/";
            
            while (i < 100) {
                // grenade + Frame + 0001 + .png
                var p4 = i.toString().padStart(4, '0');
                var filename = baseName + "Frame" + p4 + ".png";
                var path = folder + filename;
                
                var bmp = null;
                try {
                    var resp = await fetch(path);
                    if (resp.ok) {
                        var blob = await resp.blob();
                        bmp = await createImageBitmap(blob);
                    } else {
                         // Fallback: try case-insensitive check manually
                         // If "d-waltFrame0001.png"
                         var filenameLower = baseName.toLowerCase() + "Frame" + p4 + ".png";
                         var resp2 = await fetch(folder + filenameLower);
                         if (resp2.ok) {
                             var blob = await resp2.blob();
                             bmp = await createImageBitmap(blob);
                         }
                    }
                } catch(e) {}

                if (bmp) {
                    frames.push(bmp);
                    transferables.push(bmp);
                    i++;
                } else {
                    break;
                }
            }
            
            if (frames.length > 0) {
                // Store using lowercase keys to match GameEngine (e.g. "d-walt")
                results[baseName.toLowerCase()] = frames;
                
                // Also store original baseName if different (e.g. "D-walt")
                if (baseName.toLowerCase() !== baseName) {
                     results[baseName] = frames;
                }
            }
        };

        await Promise.all(types.map(t => loadSequence(t)));

        postMessage({ type: "explosionsLoaded", data: results }, transferables);
    }
};
