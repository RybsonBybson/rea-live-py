local json = require('dkjson')

local tmp = os.getenv("TMP")
local r = reaper
local delay = 0.5
local last_time = 0

function ParentFolder(path)
    if path:sub(-1) == "/" or path:sub(-1) == "\\" then
        return path:match("^(.*)[\\/][^\\/]+[\\/]?$")
    else
        return path:match("^(.*[\\/])")
    end
end

local function file_exists(path)
  local f = io.open(path, "r")
  if f then
    f:close()
    return true
  end
  return false
end

local _, script_path = r.get_action_context()
local dir_path = ParentFolder(script_path)
local communication_path = tmp .. "/communicate.json"
local resourcePath = ParentFolder(r.GetProjectPath())

--


function get_communication()
    if not file_exists(communication_path) then
        local f = io.open(communication_path, 'w')
        if not f then return end
        f:write(json.encode({connection = false, tracks = {}}))
        f:close()
    end
    local file = io.open(communication_path, 'r')
    if not file then return end

    local text = file:read("*a")
    file:close()
    local obj = json.decode(text)
    if not obj then return end
    return obj
end

function save_communication(obj)
    file = io.open(communication_path, 'w')
    if not file then return end
    file:write(json.encode(obj))
    file:close()
end

function setconnection(value)
    local comm = get_communication()
    comm.connection = value;

    if value == false then
        comm.tracks = {}
    end
    save_communication(comm)
end

function atexit()
    setconnection(false)
    _G['script_running'] = false
end

function scantracks()
    local comm = get_communication()
    if not comm then return end
    if not comm.tracks then comm.tracks = {} end

    local tracksAmount = r.CountTracks(0)
    local existingGuids = {}

    for i = 1, tracksAmount do
        local track = r.GetTrack(0, i - 1)
        local guid = r.GetTrackGUID(track)
        existingGuids[guid] = true

        local hasName, name = r.GetTrackName(track)
        local color = r.GetTrackColor(track)
        local cr, cg, cb = r.ColorFromNative(color)
        local hasColor = color ~= 0
        local _, icon = reaper.GetSetMediaTrackInfo_String(track, "P_ICON", "", false)
        local hasIcon = icon ~= ""

        if hasIcon and not icon:match("^[A-Za-z]:") then
            icon = resourcePath .. '/' .. icon
        end

        local found = false
        for index, value in ipairs(comm.tracks) do
            if value.guid == guid then
                value.name = {hasName = hasName, name = name}
                value.color = {hasColor = hasColor, r = cr, g = cg, b = cb}
                value.icon = {hasIcon = hasIcon, icon = icon}
                found = true
                break
            end
        end

        if not found then
            table.insert(comm.tracks, {
                name = {hasName = hasName, name = name},
                color = {hasColor = hasColor, r = cr, g = cg, b = cb},
                icon = {hasIcon = hasIcon, icon = icon},
                guid = guid,
                syncing = false
            })
        end
    end

    local newTracks = {}
    for _, value in ipairs(comm.tracks) do
        if existingGuids[value.guid] then
            table.insert(newTracks, value)
        end
    end
    comm.tracks = newTracks

    save_communication(comm)
end

function main()
    if not _G["script_running"] then r.ShowMessageBox("elo", "s", 0) return end

    local time = r.time_precise()
    if last_time + delay < time then
        scantracks()
        last_time = time
    end

    r.defer(main)
end




--


if not _G['script_running'] then _G['script_running'] = true
else atexit() end

setconnection(true)
r.ShowMessageBox(_G['script_running'] and "Reaper Connection ON" or "Reaper Connection OFF", "Connection", 0)
main()

r.atexit(atexit)