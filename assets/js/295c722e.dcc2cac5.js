"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[401],{28001:e=>{e.exports=JSON.parse('{"functions":[{"name":"isState","desc":"Checks if the arg is a Fusion StateObject.","params":[{"name":"arg","desc":"","lua_type":"any"}],"returns":[{"desc":"","lua_type":"boolean"}],"function_type":"static","source":{"line":59,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"removeTask","desc":"Removes a task from a scope by its taskId.\\n\\n\\n```lua\\nlocal s = scoped(Fusion, FusionUtil)\\n\\nlocal id = \\"Greeting\\"\\nlocal task = s:addTask(function() print(\\"Hello, World!\\") end, nil, id)\\n\\ns:removeTask(id) -- Hello, World!\\n```","params":[{"name":"scope","desc":"The scope to remove the task from","lua_type":"Scope<any>"},{"name":"taskId","desc":"The taskId of the task to remove","lua_type":"any"},{"name":"dontCleanup","desc":"Whether or not to run the cleanup function on the task","lua_type":"boolean?"}],"returns":[{"desc":"The task that was removed","lua_type":"Task?"}],"function_type":"static","source":{"line":172,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"addTask","desc":"Adds a task to a scope. If a taskId is provided, it will remove any existing task with that taskId.\\n\\n\\n```lua\\nlocal s = scoped(Fusion, FusionUtil)\\n\\nlocal id = \\"Greeting\\"\\nlocal task = s:addTask(function() print(\\"Hello, World!\\") end, nil, id)\\n\\nFusion.doCleanup(s) -- Hello, World!\\n```","params":[{"name":"scope","desc":"The scope to add the task to","lua_type":"Scope<any>"},{"name":"task","desc":"The task to add","lua_type":"Task & T"},{"name":"methodName","desc":"The method to call when the task is removed","lua_type":"any?"},{"name":"taskId","desc":"The taskId of the task","lua_type":"any?"}],"returns":[{"desc":"The task that was added","lua_type":"Task"}],"function_type":"static","source":{"line":206,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"getTask","desc":"Gets a task from a scope by its taskId.\\n\\n\\n```lua\\nlocal s = scoped(Fusion, FusionUtil)\\n\\nlocal id = \\"Greeting\\"\\nlocal task = s:addTask(function() print(\\"Hello, World!\\") end, nil, id)\\n\\nlocal foundTask = s:getTask(id)\\nfoundTask() -- Hello, World!\\n```","params":[{"name":"scope","desc":"The scope to search for the task","lua_type":"Scope<any>"},{"name":"taskId","desc":"The taskId of the task to find","lua_type":"any"}],"returns":[{"desc":"The task if found, nil otherwise","lua_type":"Task?"}],"function_type":"static","source":{"line":240,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"ensureIsState","desc":"Ensures a passed data is a StateObject. If it is not, it will be converted to one.","params":[{"name":"scope","desc":"The scope in which to create the new state object","lua_type":"Scope<any>"},{"name":"data","desc":"The potential state object","lua_type":"UsedAs<T>?"},{"name":"defaultValue","desc":"The default value to use if the data is nil","lua_type":"T?"},{"name":"datatype","desc":"The type or types of the data expected in the state","lua_type":"(string | { string })?"}],"returns":[{"desc":"The existing or newly created state object","lua_type":"StateObject<T>"}],"function_type":"static","source":{"line":268,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"syncValues","desc":"Syncronizes a StateObject to a Value. The Value will be set to the StateObject\'s value any time it changes.\\n\\n\\n```lua\\nlocal s = scoped(Fusion, FusionUtil)\\n\\nlocal a = s:Value(123)\\nlocal b = s:Value(0)\\nlocal disconnect = s:syncValues(a, b)\\n\\nprint( peek(b) ) -- 123\\na:set(456)\\nprint( peek(b) ) -- 456\\n\\ndisconnect()\\n```","params":[{"name":"scope","desc":"","lua_type":"Scope<any>"},{"name":"stateToWatch","desc":"The state to watch for changes","lua_type":"State<any>"},{"name":"valueToSet","desc":"The value to set when the state changes","lua_type":"Value<any, any>"}],"returns":[{"desc":"A function that will disconnect the observer","lua_type":"() -> ()"}],"function_type":"static","source":{"line":326,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"formatAssetId","desc":"Takes an AssetId and formats it to a valid string.\\n\\n\\n```lua\\nlocal s = scoped(Fusion, FusionUtil)\\n\\nlocal assetId = s:formatAssetId(\\"rbxefsefawsetid://1234567890\\")\\nprint( peek(assetId) ) -- \\"rbxassetid://1234567890\\"\\n```\\n```lua\\nlocal assetId = s:formatAssetId(1234567890)\\nprint( peek(assetId) ) -- \\"rbxassetid://1234567890\\"\\n```","params":[{"name":"scope","desc":"","lua_type":"Scope<any>"},{"name":"id","desc":"The AssetId to ensure","lua_type":"UsedAs<string | number>"},{"name":"default","desc":"The default AssetId to use if the id is nil","lua_type":"(string | number)?"}],"returns":[{"desc":"The State<string> that is synced with the AssetId","lua_type":"CanBeState<string>"}],"function_type":"static","source":{"line":354,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"ratio","desc":"Generates a computed that calculates the ratio of two numbers as a State<number>.\\n\\n\\n```lua\\nlocal s = scoped(Fusion, FusionUtil)\\n\\nlocal numerator = s:Value(100)\\nlocal denominator = s:Value(200)\\n\\nlocal ratio = s:ratio(numerator, denominator)\\nprint( peek(ratio) ) -- 0.5\\n```","params":[{"name":"scope","desc":"The scope to create the State in","lua_type":"Scope<any>"},{"name":"numerator","desc":"The numerator of the ratio","lua_type":"UsedAs<number>"},{"name":"denominator","desc":"The denominator of the ratio","lua_type":"UsedAs<number>"},{"name":"mutator","desc":"An optional State to scale by or a function to mutate the ratio","lua_type":"(UsedAs<T> | (ratio: number, use: Use) -> T)?\\r\\n"}],"returns":[{"desc":"The ratio (Potentially mutated)","lua_type":"State<T>"}],"function_type":"static","source":{"line":389,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"lerpNumber","desc":"Lerps between two number states. If no use function is given then it returns a state\\n\\n\\n```lua\\nlocal a = Value(10)\\nlocal b = Value(20)\\nlocal alpha = Value(0.5)\\nlocal z = FusionUtil.lerpNumber(a, b, alpha)\\nprint( peek(z) ) -- 15\\n```","params":[{"name":"scope","desc":"","lua_type":"Scope<any>"},{"name":"n1","desc":"The first number state","lua_type":"UsedAs<number>"},{"name":"n2","desc":"The second number state","lua_type":"UsedAs<number>"},{"name":"alpha","desc":"The alpha state","lua_type":"UsedAs<number>"},{"name":"_use","desc":"An optional function to use to get the values of the states","lua_type":"((any) -> (any))?"}],"returns":[{"desc":"The resultant lerped number state/value","lua_type":"UsedAs<number>"}],"function_type":"static","source":{"line":431,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"eq","desc":"A simple equality function that returns true if the two states are equal.\\n\\n\\n```lua\\nlocal s = scoped(Fusion, FusionUtil)\\n\\nlocal a = s:Value(10)\\nlocal b = s:Value(10)\\nlocal c = s:eq(a, b)\\nprint( peek(c) ) -- true\\na:set(20)\\nprint( peek(c) ) -- false\\n```","params":[{"name":"scope","desc":"","lua_type":"Scope<any>"},{"name":"stateToCheck1","desc":"The first potential state to check","lua_type":"UsedAs<any>"},{"name":"stateToCheck2","desc":"The second potential state to check","lua_type":"UsedAs<any>"}],"returns":[{"desc":"A state resolving to the equality of the two given arguments","lua_type":"State<boolean>"}],"function_type":"static","source":{"line":462,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"observeState","desc":"Calls the provided callback immediately with the initial state and then again anytime the state updates.","params":[{"name":"scope","desc":"","lua_type":"Scope<any>"},{"name":"fusionState","desc":"The state object to observe","lua_type":"UsedAs<T>"},{"name":"callback","desc":"The callback to call when the fusionState is updated","lua_type":"(stateValue: T) -> ()"}],"returns":[{"desc":"A function that will disconnect the observer","lua_type":"() -> ()"}],"function_type":"static","source":{"line":478,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}}],"properties":[{"name":"scopeless","desc":"A table of convenience functions for creating Fusion objects.\\nThese functions do not require the use of a scope, they by default use the FusionUtil scope.\\nThese are meant to be used in places where you want to create persistent Fusion objects without needing to pass a scope.\\n\\n```lua\\nlocal Value = FusionUtil.scopeless.Value\\n\\nlocal a = Value(10)\\n```","lua_type":"table","source":{"line":78,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}},{"name":"scope","desc":"The global scope for FusionUtil.","lua_type":"Scope<Fusion, FusionUtil>","source":{"line":500,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}}],"types":[],"name":"[0.3.0] FusionUtil","desc":"A collection of utility functions for Fusion 0.3.0.\\n\\n:::warning Multithreading\\nDO NOT ACCESS THIS IN MULTIPLE VMs (Parallel Luau). Studio freaks out when\\nfusion is loaded in multiple VMs for some unknown reason.\\n:::","source":{"line":14,"path":"src/RailUtil/FusionUtil/FusionUtil_v0_3_0.luau"}}')}}]);