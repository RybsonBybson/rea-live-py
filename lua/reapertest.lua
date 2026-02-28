local json = require('dkjson')
local r = reaper

--
function ParentFolder(path)
    if path:sub(-1) == "/" or path:sub(-1) == "\\" then
        return path:match("^(.*)[\\/][^\\/]+[\\/]?$")
    else
        return path:match("^(.*[\\/])")
    end
end

local _, script_path = r.get_action_context()
local dir_path = ParentFolder(script_path)

function setconnection(value)
    
    local communication_path = ParentFolder(dir_path) .. "/communicate.json"
    local file = io.open(communication_path, 'r')
    if not file then return end

    local text = file:read("*a")
    file:close()
    local obj = json.decode(text)
    if not obj then return end

    obj.connection = value;

    file = io.open(communication_path, 'w')
    if not file then return end
    file:write(json.encode(obj))
    file:close()
end


function main()
    r.defer(main)
end




--


setconnection(true)
main()

r.atexit(function ()
    setconnection(false)
end)