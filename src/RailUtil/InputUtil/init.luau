-- Input
-- Stephen Leitnick, Logan Hunt
-- October 10, 2021

--[=[
    @class InputUtil

    Originally written by Stephen Leitnick, this module was forked in order to add some extra functionality.

    The Input package provides access to various user input classes.

    - [PreferredInput](/api/PreferredInput)
    - [Mouse](/api/Mouse)
    - [Keyboard](/api/Keyboard)
    - [Touch](/api/Touch)
    - [Gamepad](/api/Gamepad)
    - [Enums](/api/Enums)

    Reference the desired input modules via the Input package to get started:

    ```lua
    local Input = require(Packages.RailUtil).Input
    local PreferredInput = Input.PreferredInput
    local Mouse = Input.Mouse
    local Keyboard = Input.Keyboard
    local Touch = Input.Touch
    local Gamepad = Input.Gamepad
    local InputEnums = Input.Enums
    ```
]=]

return {
    PreferredInput = require(script.PreferredInput),
    Mouse = require(script.Mouse),
    Keyboard = require(script.Keyboard),
    Touch = require(script.Touch),
    Gamepad = require(script.Gamepad),
}