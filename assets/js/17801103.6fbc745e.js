"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[655],{19492:e=>{e.exports=JSON.parse('{"functions":[{"name":"getDebugFlag","desc":"Gets the current state of a debug flag.","params":[{"name":"flagName","desc":"The name of the debug flag.","lua_type":"string"},{"name":"asState","desc":"Whether to return the State object or the current value.","lua_type":"boolean?"}],"returns":[{"desc":"","lua_type":"UsedAs<boolean>\\r\\n"}],"function_type":"static","source":{"line":90,"path":"src/RailUtil/DebugUtil.luau"}},{"name":"toggleDebugFlag","desc":"Toggles the state of a debug flag.","params":[{"name":"flagName","desc":"","lua_type":"string"}],"returns":[{"desc":"The new value of the flag.","lua_type":"boolean"}],"function_type":"static","source":{"line":101,"path":"src/RailUtil/DebugUtil.luau"}},{"name":"setDebugFlag","desc":"Sets the state of a debug flag.","params":[{"name":"flagName","desc":"","lua_type":"string"},{"name":"value","desc":"","lua_type":"boolean"}],"returns":[{"desc":"The new state of the flag.","lua_type":"State<boolean>"}],"function_type":"static","source":{"line":114,"path":"src/RailUtil/DebugUtil.luau"}},{"name":"observeDebugFlag","desc":"Observes the state of a debug flag.","params":[{"name":"flagName","desc":"","lua_type":"string"},{"name":"callback","desc":"","lua_type":"(boolean) -> ()"},{"name":"onlyOnChange","desc":"Whether to call the callback only on changes and not immediately.","lua_type":"boolean?"}],"returns":[{"desc":"The unbind function.","lua_type":"function"}],"function_type":"static","source":{"line":129,"path":"src/RailUtil/DebugUtil.luau"}},{"name":"setup","desc":"Initializes the DebugUtil module.","params":[],"returns":[],"function_type":"static","source":{"line":144,"path":"src/RailUtil/DebugUtil.luau"}}],"properties":[],"types":[],"name":"DebugUtil","desc":"DebugUtil is a collection of functions that help with debugging.\\n\\nLook for the debug controls under ReplicatedStorage.","source":{"line":11,"path":"src/RailUtil/DebugUtil.luau"}}')}}]);