"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1417],{79754:t=>{t.exports=JSON.parse('{"functions":[{"name":"color","desc":"Returns a function that transforms a string with the given color applied to it.\\n\\n```lua\\nlocal yellow = StringUtil.color(Color3.new(1, 1, 0))\\nlocal amt = yellow(5)\\nlocal txt = `You need to go collect {amt} eggs!`\\nprint(txt) -- \\"You need to go collect <font color=\\"rgb(255,255,0)\\">5</font> eggs!\\"\\n```","params":[{"name":"color","desc":"The color to apply to the text.","lua_type":"Color3"}],"returns":[{"desc":"A function that applies a color to the given text.","lua_type":"(text: string) -> string"}],"function_type":"static","source":{"line":54,"path":"src/RailUtil/StringUtil/init.luau"}},{"name":"stroke","desc":"Returns a function that transforms a string with the given options applied to it.\\n\\n```lua\\nlocal applyStroke = StringUtil.stroke({\\n\\tColor = Color3.new(1, 0, 0),\\n\\tJoins = Enum.LineJoinMode.Round,\\n\\tThickness = 2,\\n\\tTransparency = 0.5,\\n})\\nlocal txt = applyStroke(\\"Hello World!\\")\\n```","params":[{"name":"config","desc":"The stroke data to apply to the text.","lua_type":"StrokeData"}],"returns":[{"desc":"A function that applies a stroke to the given text.","lua_type":"(text: string) -> string"}],"function_type":"static","source":{"line":76,"path":"src/RailUtil/StringUtil/init.luau"}},{"name":"rich","desc":"Returns a function that transforms a string with the given options applied to it.\\n\\n```lua\\nlocal applyRich = StringUtil.rich({\\n\\tColor = Color3.new(1, 0, 0),\\n\\tStroke = {\\n\\t\\tColor = Color3.new(1, 0, 0),\\n\\t\\tJoins = Enum.LineJoinMode.Round,\\n\\t\\tThickness = 2,\\n\\t\\tTransparency = 0.5,\\n\\t},\\n\\tBold = true,\\n\\tItalic = true,\\n\\tUnderline = true,\\n})\\nlocal txt = applyRich(\\"Hello World!\\")\\n```","params":[{"name":"config","desc":"The options to apply to the text.","lua_type":"{\\r\\n\\t\\tColor: Color3?,\\r\\n\\t\\tStroke: StrokeData?,\\r\\n\\t\\tBold: boolean?,\\r\\n\\t\\tItalic: boolean?,\\r\\n\\t\\tUnderline: boolean?,\\r\\n\\t}\\r\\n"}],"returns":[{"desc":"A function that applies a color to the given text.","lua_type":"(text: string) -> string"}],"function_type":"static","source":{"line":110,"path":"src/RailUtil/StringUtil/init.luau"}},{"name":"formatAssetId","desc":"Ensures a given number or string is formatted as an asset id.\\n```lua\\nStringUtil.formatAssetId(123456) -- \\"rbxassetid://123456\\"\\nStringUtil.formatAssetId(\\"123456\\") -- \\"rbxassetid://123456\\"\\nStringUtil.formatAssetId(\\"rbxassetid://123456\\") -- \\"rbxassetid://123456\\"\\n```","params":[{"name":"id","desc":"The asset id to format.","lua_type":"string | number"}],"returns":[{"desc":"The formatted asset id.","lua_type":"string"}],"function_type":"static","source":{"line":152,"path":"src/RailUtil/StringUtil/init.luau"}},{"name":"formatNumberWithCommas","desc":"Formats a number with commas.\\n```lua\\nStringUtil.formatNumberWithCommas(\\"12\\") -- \\"12\\"\\nStringUtil.formatNumberWithCommas(1234) -- \\"1,234\\"\\nStringUtil.formatNumberWithCommas(123456) -- \\"123,456\\"\\nStringUtil.formatNumberWithCommas(\\"1234567\\") -- \\"1,234,567\\"\\nStringUtil.formatNumberWithCommas(12345.6789) -- \\"12,345.6789\\"\\n```","params":[{"name":"num","desc":"","lua_type":"number | string"}],"returns":[{"desc":"","lua_type":"string\\r\\n"}],"function_type":"static","source":{"line":166,"path":"src/RailUtil/StringUtil/init.luau"}},{"name":"truncateNumberWithSuffix","desc":"Truncates a number to its nearest factor of 1000 and replaces the chopped off numbers\\nwith an appropriate suffix to enable easier reading.\\n\\n- MaxDecimals: The maximum number of decimals to show. [Default: 1]\\n- ShowZeroes: Whether to always show zeroes after the decimal point.\\n- AddSpace: Whether to add a space between the number and the suffix\\n\\n```lua\\nStringUtil.truncateNumberWithSuffix(1.234) -- 1.2\\nStringUtil.truncateNumberWithSuffix(123) -- 123\\nStringUtil.truncateNumberWithSuffix(123, {MaxDecimals = 2, ShowZeroes = true}) -- 123.00\\nStringUtil.truncateNumberWithSuffix(1234) -- 1.2K\\n\\nStringUtil.truncateNumberWithSuffix(123456) -- 123.5K\\nStringUtil.truncateNumberWithSuffix(123456, {MaxDecimals = 1}) -- 123.4K\\nStringUtil.truncateNumberWithSuffix(\\"123456\\", {MaxDecimals = 2}) -- 123.45K\\nStringUtil.truncateNumberWithSuffix(123456, {MaxDecimals = 3}) -- 123.456K\\n\\nStringUtil.truncateNumberWithSuffix(123456789) -- 123.4M\\nStringUtil.truncateNumberWithSuffix(1234567890) -- 1.2B\\n```","params":[{"name":"num","desc":"","lua_type":"number | string"},{"name":"config","desc":"","lua_type":"{\\r\\n\\t\\tMaxDecimals: number?,\\r\\n\\t\\tShowZeroes: boolean?,\\r\\n\\t\\tAddSpace: boolean?,\\r\\n\\t}?"}],"returns":[{"desc":"","lua_type":"string\\r\\n"}],"function_type":"static","source":{"line":200,"path":"src/RailUtil/StringUtil/init.luau"}},{"name":"formatTime","desc":"Takes a number, a string defining the type of time given, and an output format and formats it to a pleasing structure ideal for displaying time.\\n\\n\\nExamples:\\n```lua\\nStringUtil.formatTime(3600, \\"s\\", \\"2h:2m:2s\\") -- \\"01:00:00\\"\\nStringUtil.formatTime(125, \\"s\\", \\"2h:2m:2s\\") -- \\"00:02:05\\"\\nStringUtil.formatTime(125, \\"s\\", \\"1h:1m:1s\\") -- \\"0:2:5\\"\\nStringUtil.formatTime(125, \\"s\\", \\"h:m:s\\") -- \\"0:2:5\\"\\nStringUtil.formatTime(125, \\"s\\", \\"2h:2m:2s\\", {HideParentZeroValues = true}) -- \\"02:05\\"\\nStringUtil.formatTime(125, \\"s\\", \\"h:m:s:ds\\") -- \\"0:2:5:0\\"\\nStringUtil.formatTime(125, \\"s\\", \\"h:m:s:ds\\", {HideParentZeroValues = true}) -- \\"2:5:0\\"\\nStringUtil.formatTime(3725, \\"s\\", \\"h:s\\") -- \\"1:125\\"\\nStringUtil.formatTime(1000, \\"ms\\", \\"s\\") -- \\"1\\"\\n```","params":[{"name":"inputTime","desc":"The time to format.","lua_type":"number"},{"name":"inputTimeType","desc":"The type of time that is being given to format. (w, d, h, m, s, ds, cs, ms, \u03bcs, ns)","lua_type":"string?"},{"name":"outputStringFormat","desc":"The format of the output string. Must separated by colons, if you put a number before the timetype it will make sure the number has atleast that length, adding zeroes before it as needed. By default it will be (2h:2m:2s)","lua_type":"string?"},{"name":"config","desc":"","lua_type":"{\\r\\n\\tHideParentZeroValues: boolean?,\\r\\n\\tDelimeter: string?,\\r\\n}?"}],"returns":[{"desc":"The formatted time string.","lua_type":"string"}],"function_type":"static","source":{"line":289,"path":"src/RailUtil/StringUtil/init.luau"}},{"name":"getMaxConsistentTextSize","desc":"Returns the largest possible font size that allows all given text to fit within the specified frame width while\\nmaintaining the same font size.\\n\\n\\n```lua\\nlocal textTable = {\\n\\t\\"Hello World!\\",\\n\\t\\"Egg\\",\\n\\t\\"Goodbye, Galaxy!\\",\\n}\\nlocal absSize = Vector2.new(100, 50)\\n\\nlocal maxSize = StringUtil.getMaxConsistentTextSize(textTable, absSize, Enum.Font.SourceSans)\\n\\nfor _, text in pairs(textTable) do\\n\\tlocal label = Instance.new(\\"TextLabel\\")\\n\\tlabel.Text = text\\n\\tlabel.Font = Enum.Font.SourceSans\\n\\tlabel.TextSize = maxSize\\n\\tlabel.TextWrapped = true\\nend\\n```","params":[{"name":"textTable","desc":"Table with all the text to be iterated through to get a consistent size for frames.","lua_type":"{ [any]: string }"},{"name":"absSize","desc":"The AbsoluteSize property of the container.","lua_type":"Vector2"},{"name":"font","desc":"The font to be used. Needed in order to determine the size of the text.","lua_type":"Enum.Font"},{"name":"config","desc":"Configuration for customization and tweaks to sizing.","lua_type":"{\\r\\n\\t\\tMinFontSize: number?,\\r\\n\\t\\tMaxFontSize: number?,\\r\\n\\t\\tPadding: Vector2?,\\r\\n\\t\\tTextWrapped: boolean?,\\r\\n\\t}?\\r\\n"}],"returns":[{"desc":"The font size to be used.","lua_type":"number"}],"function_type":"static","source":{"line":382,"path":"src/RailUtil/StringUtil/init.luau"}}],"properties":[],"types":[{"name":"StrokeData","desc":"","fields":[{"name":"Color","lua_type":"Color3?","desc":"The color of the stroke."},{"name":"Joins","lua_type":"(\\"miter\\" | \\"round\\" | \\"bevel\\" | Enum.LineJoinMode)?","desc":"The type of joins the stroke has."},{"name":"Thickness","lua_type":"number?","desc":"The thickness of the stroke."},{"name":"Transparency","lua_type":"number?","desc":"The transparency of the stroke."}],"source":{"line":22,"path":"src/RailUtil/StringUtil/init.luau"}}],"name":"StringUtil","desc":"Utility library of useful string functions.","source":{"line":9,"path":"src/RailUtil/StringUtil/init.luau"}}')}}]);