local json = require('dkjson')

--
function ParentFolder(path)
    if path:sub(-1) == "/" or path:sub(-1) == "\\" then
        return path:match("^(.*)[\\/][^\\/]+[\\/]?$")
    else
        return path:match("^(.*[\\/])")
    end
end


local r = reaper

local black = r.ColorToNative(0, 0, 0)
local last_time = 0
local delay = 1.0
local _, script_path = r.get_action_context()
local dir_path = ParentFolder(script_path)
local communication_path = ParentFolder(dir_path) .. "/communicate.json"

local file = io.open(communication_path, 'r')
if file then
    local text = file:read("*a")
    file:close()

    local obj = json.decode(text)
    if obj then
        reaper.ShowConsoleMsg(obj.connection and "True" or "False")
    else
        reaper.ShowConsoleMsg(text)
    end
end

