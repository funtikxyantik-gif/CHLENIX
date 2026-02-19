// CHLENIX runtime bindings to game variables (tdp4.js)
// Здесь привязываем функции из меню к глобальным переменным игры.

(function () {
    function hasWindowVar(name) {
        return Object.prototype.hasOwnProperty.call(window, name);
    }

    function setWindowVar(name, value) {
        window[name] = value;
    }

    window.myCheat = window.myCheat || {};

    // Включение / выключение основных функций
    window.myCheat.setFeature = function (featureId, enabled) {
        switch (featureId) {
            case "noclip1337":
                setWindowVar("noclip1337", !!enabled);
                break;
            case "grenadehack1337":
                setWindowVar("grenadehack1337", !!enabled);
                break;
            case "AimHack1337":
                setWindowVar("Aimhack1337", !!enabled);
                break;
			case "AntiAfk1337":
                setWindowVar("AntiAfk1337", !!enabled);
                break;
            default:
                break;
        }
    };

    // Передача числовых/булевых настроек в глобальные переменные tdpa4.js
    window.myCheat.setOption = function (featureId, optionId, value) {
        switch (featureId) {
            case "noclip1337":
                if (optionId === "Speed") {
                    setWindowVar("noclipSpeed1337", Number(value) || 0);
                } else if (optionId === "SpeedUp") {
                    setWindowVar("noclipSpeedUp1337", Number(value) || 0);
                } else if (optionId === "SpeedDown") {
                    setWindowVar("noclipSpeedDown1337", Number(value) || 0);
                }
                break;

            case "grenadehack1337":
                if (optionId === "Distance") {
                    setWindowVar("grenadeDistance1337", Number(value) || 0);
                } else if (optionId === "Friends") {
                    setWindowVar("grenadeFriends1337", !!value);
                }
                break;

            case "AimHack1337":
                if (optionId === "Friends") {
                    setWindowVar("aimFriends1337", !!value);
                } if (optionId === "All") {
                    setWindowVar("aimAll1337", !!value);
                }
                break;

            case "Friends1337":
                if (optionId === "List") {
                    var raw = String(value || "");
                    var items = raw.split(/[\s,;]+/);
                    var list = [];
                    for (var i = 0; i < items.length; i++) {
                        var token = items[i].trim();
                        if (!token) continue;
                        var n = Number(token);
                        list.push(isNaN(n) ? token : n);
                    }
                    setWindowVar("Friends1337", list);
                }
                break;
            case "Enemy1337":
                if (optionId === "EnemyList") {
                    var raw = String(value || "");
                    var items = raw.split(/[\s,;]+/);
                    var list = [];
                    for (var i = 0; i < items.length; i++) {
                        var token = items[i].trim();
                        if (!token) continue;
                        var n = Number(token);
                        list.push(isNaN(n) ? token : n);
                    }
                    setWindowVar("Enemy1337", list);
                }
                break;
            case "Staff1337":
                if (optionId === "StaffList") {
                    var raw = String(value || "");
                    var items = raw.split(/[\s,;]+/);
                    var list = [];
                    for (var i = 0; i < items.length; i++) {
                        var token = items[i].trim();
                        if (!token) continue;
                        var n = Number(token);
                        list.push(isNaN(n) ? token : n);
                    }
                    setWindowVar("Staff1337", list);
                }
                break;

            default:
                break;
        }
    };
})();

