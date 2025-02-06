"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2201],{59658:e=>{e.exports=JSON.parse('{"functions":[{"name":"new","desc":"Constructs a gamepad object.\\n\\nIf no gamepad UserInputType is provided, this object will always wrap\\naround the currently-active gamepad, even if it changes. In most cases\\nwhere input is needed from just the primary gamepad used by the player,\\nleaving the `gamepad` argument blank is preferred.\\n\\nOnly include the `gamepad` argument when it is necessary to hard-lock\\nthe object to a specific gamepad input type.\\n\\n```lua\\n-- In most cases, construct the gamepad as such:\\nlocal gamepad = Gamepad.new()\\n\\n-- If the exact UserInputType gamepad is needed, pass it as such:\\nlocal gamepad = Gamepad.new(Enum.UserInputType.Gamepad1)\\n```","params":[{"name":"gamepad","desc":"","lua_type":"Enum.UserInputType?"}],"returns":[{"desc":"","lua_type":"Gamepad"}],"function_type":"static","source":{"line":232,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"GetThumbstick","desc":"Gets the position of the given thumbstick. The two thumbstick\\nKeyCodes are `Enum.KeyCode.Thumbstick1` and `Enum.KeyCode.Thumbstick2`.\\n\\nIf `deadzoneThreshold` is not included, the `DefaultDeadzone` value is\\nused instead.\\n\\n```lua\\nlocal leftThumbstick = gamepad:GetThumbstick(Enum.KeyCode.Thumbstick1)\\nprint(\\"Left thumbstick position\\", leftThumbstick)\\n```","params":[{"name":"thumbstick","desc":"","lua_type":"Enum.KeyCode"},{"name":"deadzoneThreshold","desc":"","lua_type":"number?"}],"returns":[{"desc":"","lua_type":"Vector2"}],"function_type":"method","source":{"line":349,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"GetTrigger","desc":"Gets the position of the given trigger. The triggers are usually going\\nto be `Enum.KeyCode.ButtonL2` and `Enum.KeyCode.ButtonR2`. These trigger\\nbuttons are analog, and will output a value between the range of [0, 1].\\n\\nIf `deadzoneThreshold` is not included, the `DefaultDeadzone` value is\\nused instead.\\n\\n```lua\\nlocal triggerAmount = gamepad:GetTrigger(Enum.KeyCode.ButtonR2)\\nprint(triggerAmount)\\n```","params":[{"name":"trigger","desc":"","lua_type":"KeyCode"},{"name":"deadzoneThreshold","desc":"","lua_type":"number?"}],"returns":[{"desc":"","lua_type":"number"}],"function_type":"method","source":{"line":371,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"IsButtonDown","desc":"Returns `true` if the given button is down. This includes\\nany button on the gamepad, such as `Enum.KeyCode.ButtonA`,\\n`Enum.KeyCode.ButtonL3`, `Enum.KeyCode.DPadUp`, etc.\\n\\n```lua\\n-- Check if the \'A\' button is down:\\nif gamepad:IsButtonDown(Enum.KeyCode.ButtonA) then\\n\\tprint(\\"ButtonA is down\\")\\nend\\n```","params":[{"name":"gamepadButton","desc":"","lua_type":"KeyCode"}],"returns":[{"desc":"","lua_type":"boolean"}],"function_type":"method","source":{"line":389,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"IsMotorSupported","desc":"Returns `true` if the given motor is supported.\\n\\n```lua\\n-- Pulse the trigger (e.g. shooting a weapon), but fall back to\\n-- the large motor if not supported:\\nlocal motor = Enum.VibrationMotor.Large\\nif gamepad:IsMotorSupported(Enum.VibrationMotor.RightTrigger) then\\n\\tmotor = Enum.VibrationMotor.RightTrigger\\nend\\ngamepad:PulseMotor(motor, 1, 0.1)\\n```","params":[{"name":"motor","desc":"","lua_type":"Enum.VibrationMotor"}],"returns":[{"desc":"","lua_type":"boolean"}],"function_type":"method","source":{"line":408,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"SetMotor","desc":"Sets the gamepad\'s haptic motor to a certain intensity. The\\nintensity value is a number in the range of [0, 1].\\n\\n```lua\\ngamepad:SetMotor(Enum.VibrationMotor.Large, 0.5)\\n```","params":[{"name":"motor","desc":"","lua_type":"Enum.VibrationMotor"},{"name":"intensity","desc":"","lua_type":"number"}],"returns":[{"desc":"","lua_type":"number\\r\\n"}],"function_type":"method","source":{"line":422,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"PulseMotor","desc":"Sets the gamepad\'s haptic motor to a certain intensity for a given\\nperiod of time. The motor will stop vibrating after the given\\n`duration` has elapsed.\\n\\nCalling any motor setter methods (e.g. `SetMotor`, `PulseMotor`,\\n`StopMotor`) _after_ calling this method will override the pulse.\\nFor instance, if `PulseMotor` is called, and then `SetMotor` is\\ncalled right afterwards, `SetMotor` will take precedent.\\n\\n```lua\\n-- Pulse the large motor for 0.2 seconds with an intensity of 90%:\\ngamepad:PulseMotor(Enum.VibrationMotor.Large, 0.9, 0.2)\\n\\n-- Example of PulseMotor being overridden:\\ngamepad:PulseMotor(Enum.VibrationMotor.Large, 1, 3)\\ntask.wait(0.1)\\ngamepad:SetMotor(Enum.VibrationMotor.Large, 0.5)\\n-- Now the pulse won\'t shut off the motor after 3 seconds,\\n-- because SetMotor was called, which cancels the pulse.\\n```","params":[{"name":"motor","desc":"","lua_type":"Enum.VibrationMotor"},{"name":"intensity","desc":"","lua_type":"number"},{"name":"duration","desc":"","lua_type":"number"}],"returns":[],"function_type":"method","source":{"line":454,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"StopMotor","desc":"Stops the given motor. This is equivalent to calling\\n`gamepad:SetMotor(motor, 0)`.\\n\\n```lua\\ngamepad:SetMotor(Enum.VibrationMotor.Large, 1)\\ntask.wait(0.1)\\ngamepad:StopMotor(Enum.VibrationMotor.Large)\\n```","params":[{"name":"motor","desc":"","lua_type":"Enum.VibrationMotor"}],"returns":[],"function_type":"method","source":{"line":476,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"StopMotors","desc":"Stops all motors on the gamepad.\\n\\n```lua\\ngamepad:SetMotor(Enum.VibrationMotor.Large, 1)\\ngamepad:SetMotor(Enum.VibrationMotor.Small, 1)\\ntask.wait(0.1)\\ngamepad:StopMotors()\\n```","params":[],"returns":[],"function_type":"method","source":{"line":490,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"IsConnected","desc":"Returns `true` if the gamepad is currently connected.","params":[],"returns":[{"desc":"","lua_type":"boolean"}],"function_type":"method","source":{"line":502,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"GetUserInputType","desc":"Gets the current gamepad UserInputType that the gamepad object\\nis using. This will be `nil` if there is no connected gamepad.","params":[],"returns":[{"desc":"","lua_type":"Enum.UserInputType?"}],"function_type":"method","source":{"line":511,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"SetAutoSelectGui","desc":"Sets the [`GuiService.AutoSelectGuiEnabled`](https://developer.roblox.com/en-us/api-reference/property/GuiService/AutoSelectGuiEnabled)\\nproperty.\\n\\nThis sets whether or not the Select button on a gamepad will try to auto-select\\na GUI object on screen. This does _not_ turn on/off GUI gamepad navigation,\\nbut just the initial selection using the Select button.\\n\\nFor UX purposes, it usually is preferred to set this to `false` and then\\nmanually set the [`GuiService.SelectedObject`](https://developer.roblox.com/en-us/api-reference/property/GuiService/SelectedObject)\\nproperty within code to set the selected object for gamepads.\\n\\n```lua\\ngamepad:SetAutoSelectGui(false)\\ngame:GetService(\\"GuiService\\").SelectedObject = someGuiObject\\n```","params":[{"name":"enabled","desc":"","lua_type":"boolean"}],"returns":[],"function_type":"method","source":{"line":533,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"IsAutoSelectGuiEnabled","desc":"Returns the [`GuiService.AutoSelectGuiEnabled`](https://developer.roblox.com/en-us/api-reference/property/GuiService/AutoSelectGuiEnabled)\\nproperty.","params":[],"returns":[{"desc":"","lua_type":"boolean"}],"function_type":"method","source":{"line":542,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"Destroy","desc":"Destroys the gamepad object.","params":[],"returns":[],"function_type":"method","source":{"line":549,"path":"src/RailUtil/InputUtil/Gamepad.luau"}}],"properties":[{"name":"ButtonDown","desc":"The ButtonDown signal fires when a gamepad button is pressed\\ndown. The pressed KeyCode is passed to the signal, along with\\nwhether or not the event was processed.\\n\\n```lua\\ngamepad.ButtonDown:Connect(function(button: Enum.KeyCode, processed: boolean)\\n\\tprint(\\"Button down\\", button, processed)\\nend)\\n```","lua_type":"Signal<(button: Enum.KeyCode, processed: boolean)>","readonly":true,"source":{"line":85,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"ButtonUp","desc":"The ButtonUp signal fires when a gamepad button is released.\\nThe released KeyCode is passed to the signal, along with\\nwhether or not the event was processed.\\n\\n```lua\\ngamepad.ButtonUp:Connect(function(button: Enum.KeyCode, processed: boolean)\\n\\tprint(\\"Button up\\", button, processed)\\nend)\\n```","lua_type":"Signal<(button: Enum.KeyCode, processed: boolean)>","readonly":true,"source":{"line":100,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"Connected","desc":"Fires when the gamepad is connected. This will _not_ fire if the\\nactive gamepad is switched. To detect switching to different\\nactive gamepads, use the `GamepadChanged` signal.\\n\\nThere is also a `gamepad:IsConnected()` method.\\n\\n```lua\\ngamepad.Connected:Connect(function()\\n\\tprint(\\"Connected\\")\\nend)\\n```","lua_type":"Signal","readonly":true,"source":{"line":117,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"Disconnected","desc":"Fires when the gamepad is disconnected. This will _not_ fire if the\\nactive gamepad is switched. To detect switching to different\\nactive gamepads, use the `GamepadChanged` signal.\\n\\nThere is also a `gamepad:IsConnected()` method.\\n\\n```lua\\ngamepad.Disconnected:Connect(function()\\n\\tprint(\\"Disconnected\\")\\nend)\\n```","lua_type":"Signal","readonly":true,"source":{"line":134,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"GamepadChanged","desc":"Fires when the active gamepad switches. Internally, the gamepad\\nobject will always wrap around the active gamepad, so nothing\\nneeds to be changed.\\n\\n```lua\\ngamepad.GamepadChanged:Connect(function(newGamepad: Enum.UserInputType)\\n\\tprint(\\"Active gamepad changed to:\\", newGamepad)\\nend)\\n```","lua_type":"Signal<gamepad: Enum.UserInputType>","readonly":true,"source":{"line":149,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"DefaultDeadzone","desc":":::info Default\\nDefaults to `0.05`\\n:::\\n\\nThe default deadzone used for trigger and thumbstick\\nanalog readings. It is usually best to set this to\\na small value, or allow players to set this option\\nthemselves in an in-game settings menu.\\n\\nThe `GetThumbstick` and `GetTrigger` methods also allow\\na deadzone value to be passed in, which overrides this\\nvalue.","lua_type":"number","source":{"line":167,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"SupportsVibration","desc":"Flag to indicate if the currently-active gamepad supports\\nhaptic motor vibration.\\n\\nIt is safe to use the motor methods on the gamepad without\\nchecking this value, but nothing will happen if the motors\\nare not supported.","lua_type":"boolean","readonly":true,"source":{"line":179,"path":"src/RailUtil/InputUtil/Gamepad.luau"}},{"name":"State","desc":"Maps KeyCodes to the matching InputObjects within the gamepad.\\nThese can be used to directly read the current input state of\\na given part of the gamepad. For most cases, the given methods\\nand properties of `Gamepad` should make use of this table quite\\nrare, but it is provided for special use-cases that might occur.\\n\\n:::note Do Not Cache\\nThese state objects will change if the active gamepad changes.\\nBecause a player might switch up gamepads during playtime, it cannot\\nbe assumed that these state objects will always be the same. Thus\\nthey should be accessed directly from this `State` table anytime they\\nneed to be used.\\n:::\\n\\n```lua\\nlocal leftThumbstick = gamepad.State[Enum.KeyCode.Thumbstick1]\\nprint(leftThumbstick.Position)\\n-- It would be better to use gamepad:GetThumbstick(Enum.KeyCode.Thumbstick1),\\n-- but this is just an example of direct state access.\\n```","lua_type":"GamepadState","readonly":true,"source":{"line":205,"path":"src/RailUtil/InputUtil/Gamepad.luau"}}],"types":[{"name":"GamepadState","desc":"","lua_type":"{[Enum.KeyCode]: InputObject}","source":{"line":210,"path":"src/RailUtil/InputUtil/Gamepad.luau"}}],"name":"Gamepad","desc":"The Gamepad class is part of the Input package.\\n\\n```lua\\nlocal Gamepad = require(packages.Input).Gamepad\\n\\nlocal gamepad = Gamepad.new()\\n```","realm":["Client"],"source":{"line":68,"path":"src/RailUtil/InputUtil/Gamepad.luau"}}')}}]);