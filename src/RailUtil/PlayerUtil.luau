--!strict
-- Authors: Logan Hunt [Raildex]
-- February 15, 2023
--[=[
	@class PlayerUtil

	This module contains utility methods that handle players joining and leaving.
	As well as utility functions for character access.

	:::caution Characters Folder
	The module works best when a folder named "Characters" exists within workspace.
	Ideally you create this folder within your project JSON file so that it exists ahead of time.
	:::
]=]

--// Services //--
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

--// Requires //--
local Util = script.Parent
local Janitor = require(Util.Parent.Janitor)
local Promise = require(Util.Parent.Promise)
local TableUtil = require(Util.TblUtil)
local Types = require(Util.RailUtilTypes)

--// Types //--
type Janitor = Janitor.Janitor
type Promise<T> = Types.Promise

type Connection = {
	Destroy: (self: Connection) -> (),
	Disconnect: (self: Connection) -> (),
	IsConnected: (self: Connection) -> boolean,
}

type Character = Model & {
	Humanoid: Humanoid,
	HumanoidRootPart: BasePart,
}

--// Setup Code //--
local isSetupCharacterInitialization = nil
local CHARACTERS_FOLDER_NAME = "Characters"
local CONNECTION_COUNT = if RunService:IsServer() then 0 else 1
local CONTEXT_STR = if RunService:IsServer() then "[SERVER] " else "[CLIENT] "

local WeakTable = { __mode = "kv" }

local function _GetCharactersFolder()
	return workspace:FindFirstChild(CHARACTERS_FOLDER_NAME)
end

local function createCleanerConnection(cleaner: () -> () | Janitor): Connection
	local isConnected = true
	local ConnectionId = CONNECTION_COUNT
	CONNECTION_COUNT += 2

	local function cleanup()
		if not isConnected then return end
		isConnected = false
		if typeof(cleaner) == "function" then
			cleaner()
		else
			cleaner:Destroy()
		end
	end

	return table.freeze({
		Id = ConnectionId,
		Destroy = cleanup,
		Disconnect = cleanup,
		IsConnected = function()
			return isConnected
		end,
	})
end

local function assertFunction(func)
	assert(func, "Missing Function to execute.")
	assert(typeof(func) == "function", "Function must be a function.")
end

local function assertPlayer(player: any?)
	assert(not player or player:IsA("Player"), "Invalid Player.")
end

--------------------------------------------------------------------------------
--// LIBRARY //--
--------------------------------------------------------------------------------

local PlayerUtil = {}

--[=[
	@yields -- this might yield if the characters folder doesnt exist yet

	Returns the characters folder, creating it if it doesn't exist.
	This folder is used to store all characters in the game.
	This folder is created on the server and waited for on the client.
	@return Folder -- The characters folder
]=]
function PlayerUtil.getCharactersFolder(): Folder
	debug.profilebegin(CONTEXT_STR .. "getCharactersFolder")

	local CharactersFolder: Folder = _GetCharactersFolder()
	if not CharactersFolder then
		if RunService:IsServer() then
			debug.profilebegin(CONTEXT_STR .. "createCharactersFolder")

			warn("Failed to find Characters folder! Creating...")
			warn("Please create a folder named 'Characters' in workspace ahead of time.")
			local newFolder = Instance.new("Folder")
			newFolder.Name = CHARACTERS_FOLDER_NAME
			newFolder.Parent = workspace
			CharactersFolder = newFolder

			debug.profileend()
		else
			warn("Failed to find characters folder! Waiting...")
			CharactersFolder = workspace:WaitForChild(CHARACTERS_FOLDER_NAME)
		end
	end

	debug.profileend()

	assert(CharactersFolder, "Characters folder not found! (PlayerUtil.lua)")
	return CharactersFolder
end

function PlayerUtil.promiseCharactersFolder()
	return Promise.new(function(resolve)
		return resolve(PlayerUtil.getCharactersFolder())
	end)
end

--[=[
	Returns a promise that resolves with the character of the specified player once
	their character is within the proper folder.

	@param plr -- The player to get the character of
	@param timeOut? -- The amount of time to wait before rejecting the promise
	@return Promise<Character> -- A promise that resolves when the character is retrieved
]=]
function PlayerUtil.promiseCharacter(plr: Player, timeOut: number?): Promise<Character>
	debug.profilebegin(CONTEXT_STR .. "promiseCharacter")

	if _GetCharactersFolder() == nil then -- don't wait for characters folder if it doesn't exist
		if plr.Character then
			debug.profileend()
			return Promise.resolve(plr.Character)
		else
			local prom = Promise.fromEvent(plr.CharacterAdded)
			if timeOut then prom = prom:timeout(timeOut, "Timed out waiting for character!") end
			debug.profileend()
			return prom
		end
	else
		return PlayerUtil.promiseCharactersFolder():andThen(function(folder)
			debug.profilebegin(CONTEXT_STR .. "promiseCharacter")

			local char = plr.Character
			if char and char:IsDescendantOf(folder) then
				return Promise.resolve(char)
			elseif timeOut and timeOut == 0 then
				return Promise.reject("Character not found")
			end

			local prom = Promise.fromEvent(folder.ChildAdded, function(child)
				debug.profilebegin("ChildAdded->Character")
				return child == plr.Character
			end)
			if timeOut then prom = prom:timeout(timeOut, "Timed out waiting for character!") end

			debug.profileend()
			return prom
		end)
	end
end
PlayerUtil.getCharacter = PlayerUtil.promiseCharacter

--[=[
	Returns the player that owns the specified descendant of a character.
	Returns nil if the descendant is not a descendant of a character.

	@param descendant -- The descendant to get the player of
	@return Player?   -- The player that owns the character
]=]
function PlayerUtil.getPlayerFromCharacterDescendant(descendant: Instance): Player?
	for _, plr: Player in ipairs(Players:GetPlayers()) do
		if plr.Character and descendant:IsDescendantOf(plr.Character) then return plr end
	end
	return nil
end

--[=[
	Returns the character that owns the specified descendant.
	Returns nil if the descendant is not a descendant of a character.

	@param descendant -- The descendant to get the character of
	@return Character? -- The character that owns the descendant
]=]
function PlayerUtil.getCharacterFromDescendant(descendant: Instance): Character?
	debug.profilebegin(CONTEXT_STR .. "getCharacterFromDescendant")

	if not descendant:IsDescendantOf(PlayerUtil.getCharactersFolder()) then return nil end
	for _, char in PlayerUtil.getAllLoadedCharacters() do
		debug.profilebegin(CONTEXT_STR .. "IsDescendantOf")
		if descendant:IsDescendantOf(char) then return char end
		debug.profileend()
	end
	debug.profileend()
	return nil
end

--[=[
	@return {Character} -- A table of all the fully loaded characters
]=]
function PlayerUtil.getAllLoadedCharacters(): { Character }
	debug.profilebegin(CONTEXT_STR .. "getAllLoadedCharacters")

	local characters = {}
	local charFolder = PlayerUtil.getCharactersFolder()
	for _, plr: Player in Players:GetPlayers() do
		local char = plr.Character
		debug.profilebegin(CONTEXT_STR .. "IsDescendantOf")
		if char and char:IsDescendantOf(charFolder) then table.insert(characters, char) end
		debug.profileend()
	end

	debug.profileend()
	return characters :: any
end

--[=[
	Takes a function that will be run for every player in the game as well as any future players
	until the returned connection is disconnected.

	@param func			-- A passed function to be executed for each character, it is given the character as an argument. Also receives a Janitor object that can be used to clean up any connections made.
	@param player	 	-- An optional player to only run the function for their character.
	@return Connection 	-- A connection that can be Disconnected or Destroyed to stop method's activities.
]=]
function PlayerUtil.forEachCharacter(func: (char: Character, janitor: Janitor) -> (), player: Player?): Connection
	debug.profilebegin("forEachCharacter")

	assertFunction(func)
	assertPlayer(player)

	local traceback = debug.traceback()
	local CharacterData: { [Player]: { Character: Character, Janitor: Janitor }? } = setmetatable({}, WeakTable) :: any

	local jani: Janitor = Janitor.new()
	local cleanerConnection = createCleanerConnection(jani)

	local function CheckChar(char: Character)
		debug.profilebegin(CONTEXT_STR .. "CheckChar")

		assert(cleanerConnection:IsConnected(), "Connection already disconnected.")
		assert(char, "Character is nil.")

		debug.profilebegin(CONTEXT_STR .. "GetPlayerFromCharacter")
		local plr = Players:GetPlayerFromCharacter(char)
		debug.profileend()

		assert(plr, "Character does not belong to a player.")

		if CharacterData[plr] then return warn("Already setup Character:", char, traceback) end

		local charJani = Janitor.new()
		charJani:Add(function()
			CharacterData[plr] = nil
		end)

		charJani:Add(task.spawn(func, char, charJani))
		jani:Add(charJani, "Destroy", tostring(plr.UserId) .. "_CharJani")

		debug.profileend()
	end

	local function SetupPlayer(newPlr: Player)
		debug.profilebegin(CONTEXT_STR .. "SetupPlayer")

		local plrId = tostring(newPlr.UserId)

		jani:Add(
			newPlr.CharacterAdded:Connect(function()
				debug.profilebegin(CONTEXT_STR .. "CharacterAdded->promiseCharacter->CheckChar")
				jani:AddPromise(PlayerUtil.promiseCharacter(newPlr, 5):andThen(CheckChar))
				debug.profileend()
			end),
			"Disconnect",
			plrId .. "_CharacterAdded"
		)

		debug.profilebegin(CONTEXT_STR .. "CharacterAdded->promiseCharacter->CheckChar")
		if newPlr.Character then jani:AddPromise(PlayerUtil.promiseCharacter(newPlr, 5):andThen(CheckChar)) end
		debug.profileend()

		jani:Add(
			newPlr.CharacterRemoving:Connect(function()
				jani:Remove(plrId .. "_CharJani")
			end),
			"Disconnect",
			plrId .. "_CharacterRemoving"
		)

		debug.profileend()
	end

	if player then
		SetupPlayer(player)
		jani:Add(PlayerUtil.onPlayerRemoving(player, function()
			cleanerConnection:Destroy()
		end))
	else
		debug.profilebegin(CONTEXT_STR .. "forEachCharacter->forEachPlayer")
		jani:Add(PlayerUtil.forEachPlayer(SetupPlayer))
		debug.profileend()
		jani:Add(Players.PlayerRemoving:Connect(function(plr: Player)
			local plrId = tostring(plr.UserId)
			jani:Remove(plrId .. "_CharacterAdded")
			jani:Remove(plrId .. "_CharacterRemoving")
			jani:Remove(plrId .. "_CharJani")
		end))
	end

	return cleanerConnection
end

--[=[
	Takes a function that will be run for every player in the game as well as any future players
	until the returned connection is disconnected.

	@param func			-- A passed function to be executed for each player, it is given the player as an argument.
	@return Connection  -- A connection that can be Disconnected or Destroyed to stop method's activities.
]=]
function PlayerUtil.forEachPlayer(func: (player: Player, janitor: Janitor) -> ()): Connection
	debug.profilebegin(CONTEXT_STR .. "forEachPlayer")
	assertFunction(func)

	local SetupPlayersList: { Player } = setmetatable({}, WeakTable) :: any
	local jani: Janitor = Janitor.new()
	local cleanerConnection = createCleanerConnection(jani)

	local function CheckPlayer(player: Player)
		debug.profilebegin(CONTEXT_STR .. "CheckPlayer")
		if table.find(SetupPlayersList, player) then return end
		table.insert(SetupPlayersList, player)
		local plrJani = jani:Add(Janitor.new(), nil, player)
		plrJani:Add(task.spawn(func, player, plrJani))
		debug.profileend()
	end

	debug.profilebegin(CONTEXT_STR .. "forEachPlayer->CheckPlayer")
	jani:Add(Players.PlayerAdded:Connect(CheckPlayer))
	debug.profileend()

	jani:Add(Players.PlayerRemoving:Connect(function(player: Player)
		jani:Remove(player)
		TableUtil.SwapRemoveFirstValue(SetupPlayersList, player)
	end))

	for _, player: Player in ipairs(Players:GetPlayers()) do
		CheckPlayer(player)
	end

	debug.profileend()
	return cleanerConnection
end

--[=[
	Takes a function that will be run for a specified player when they leave.

	@param fn -- The function to be run when the player disconnects.
	@return Connection -- A connection that can be Disconnected or Destroyed to stop method's activities.
]=]
function PlayerUtil.onPlayerRemoving<T...>(player: Player, fn: (T...) -> (), ...: T...): Connection
	assertFunction(fn)
	assertPlayer(player)

	local jani: Janitor = Janitor.new()
	local cleanerConnection = createCleanerConnection(jani)
	local args = { select(1, ...) }

	jani:Add(Players.PlayerRemoving:Connect(function(removedPlayer: Player)
		if player == removedPlayer then
			cleanerConnection:Destroy()
			fn(table.unpack(args))
		end
	end))

	return cleanerConnection
end

--[=[
	Sets up code to auto parent characters to the Characters folder when they spawn.
	Optionally, a function can be passed to run immediately prior to when a character is added to the folder.
]=]
function PlayerUtil.setupCharacterInitialization(fn: ((plr: Player) -> (char: Character) -> ()?)?): any
	assertFunction(fn)
	if isSetupCharacterInitialization then
		error(
			"Character initialization already setup. Calling this function multiple times is not supported.\nOriginal call: "
				.. tostring(isSetupCharacterInitialization)
				.. "\n\nCurrent call: "
		)
	end
	isSetupCharacterInitialization = debug.traceback()

	return PlayerUtil.forEachPlayer(function(plr: Player)
		local onCharAddedFn = if fn then fn(plr) else nil
		assertFunction(onCharAddedFn)

		local function onCharAdded(char: Model?)
			if not char then return end
			local charactersFolder = PlayerUtil.getCharactersFolder()

			-- repeatedly try to parent the character to the characters folder. Roblox is super finnicky about this so we need to keep trying.
			while char.Parent ~= charactersFolder do
				char.Parent = charactersFolder
				task.wait()
			end

			if onCharAddedFn then onCharAddedFn(char :: any) end

			char.Parent = charactersFolder
		end

		plr.CharacterAdded:Connect(onCharAdded)
		onCharAdded(plr.Character)
	end)
end

return table.freeze(PlayerUtil)
