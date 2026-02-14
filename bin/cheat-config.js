// CHLENIX cheat menu configuration
// Здесь описываем все функции чита, их типы, хоткеи и настройки.

(function () {
    window.CHLENIX_CONFIG = {
        // Типы меню и порядок вкладок
        types: [
            { id: "Combat", label: "Combat", icon: "assets/ch/Combat.svg" },
            { id: "Movement", label: "Movement", icon: "assets/ch/Movement.svg" },
            { id: "World", label: "World", icon: "assets/ch/World.svg" },
            { id: "Player", label: "Player", icon: "assets/ch/Player.svg" },
            { id: "Visual", label: "Visual", icon: "assets/ch/Visual.svg" },
            { id: "Other", label: "Other", icon: "assets/ch/Other.svg" },
            { id: "Config", label: "Config", icon: "assets/ch/Config.svg" }
        ],

        // Основные функции чита
        features: [
            {
                id: "noclip1337",
                displayName: "NoClip",
                type: "Movement",
                hotkey: "F1",
                toggle: true,
                settings: [
                    {
                        id: "Speed",
                        label: "Speed",
                        kind: "slider",
                        min: 0.5,
                        max: 10,
                        step: 0.1,
                        "default": 1.0
                    },
                    {
                        id: "SpeedUp",
                        label: "Speed Up",
                        kind: "slider",
                        min: 0.5,
                        max: 10,
                        step: 0.1,
                        "default": 2.0
                    },
                    {
                        id: "SpeedDown",
                        label: "Speed Down",
                        kind: "slider",
                        min: 0.5,
                        max: 10,
                        step: 0.1,
                        "default": 0.5
                    }
                ]
            },
            {
                id: "grenadehack1337",
                displayName: "GrenadeHack",
                type: "Combat",
                hotkey: "F2",
                toggle: true,
                settings: [
                    {
                        id: "Distance",
                        label: "Distance",
                        kind: "slider",
                        min: 10,
                        max: 15000,
                        step: 10,
                        "default": 3000
                    },
                    {
                        id: "Friends",
                        label: "Friends",
                        kind: "bool",
                        "default": false
                    }
                ]
            },
            {
                id: "AimHack1337",
                displayName: "Aim",
                type: "Combat",
                hotkey: "F3",
                toggle: true,
                settings: [
                    {
                        id: "Friends",
                        label: "Friends",
                        kind: "bool",
                        "default": false
                    },
                    {
                        id: "All",
                        label: "All",
                        kind: "bool",
                        "default": false
                    }
                ]
            },
            {
                id: "cheatNotifications1337",
                displayName: "Notifications",
                type: "Other",
                hotkey: "",
                toggle: true,
                settings: [
                    {
                        id: "Duration",
                        label: "Duration (sec)",
                        kind: "slider",
                        min: 0.5,
                        max: 5,
                        step: 0.5,
                        "default": 1.5
                    }
                ]
            },
            {
                id: "cheatArrayList1337",
                displayName: "ArrayList",
                type: "Other",
                hotkey: "",
                toggle: true,
                settings: []
            },
            {
                // Переменная-друг для будущих фич, без переключателя
                id: "Friends1337",
                displayName: "Friends",
                type: "Other",
                hotkey: "",
                toggle: false,
                settings: [
                    {
                        id: "List",
                        label: "Friend IDs (comma / space separated)",
                        kind: "text",
                        "default": ""
                    }
                ]
            }
        ]
    };
})();

