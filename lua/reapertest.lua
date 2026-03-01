local json = require('dkjson')
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

local _, script_path = r.get_action_context()
local dir_path = ParentFolder(script_path)
local communication_path = ParentFolder(dir_path) .. "/communicate.json"

--


function get_communication()
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

function scantracks()
    local comm = get_communication()
    if not comm then return end
    local tracksAmount = r.CountTracks(0)

    for i = 1, tracksAmount do
        local track = r.GetTrack(0, i - 1)
        local guid = r.GetTrackGUID(track)
        local _, name = r.GetTrackName(track)
        local color = r.GetTrackColor(track)

        local found = false
        for index, value in ipairs(comm.tracks) do
            if value.guid == guid then
                value.name = name
                value.color = color
                found = true
                break
            end
        end

        if not found then
            table.insert(comm.tracks, {
                name = name,
                color = color,
                guid = guid,
                syncing = false
            })
        end
    end


    save_communication(comm)
end

function main()
    local time = r.time_precise()
    if last_time + delay < time then
        scantracks()
        last_time = time
    end

    r.defer(main)
end




--


setconnection(true)
main()

r.atexit(function ()
    setconnection(false)
end)