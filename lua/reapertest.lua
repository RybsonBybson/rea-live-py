
--


local r = reaper

local black = r.ColorToNative(0, 0, 0)
local last_time = 0
local delay = 1.0

function Add_Nigga()
    local now = r.time_precise()
    if now - last_time >= delay then
        local trackIndex = r.CountTracks(0)
        r.InsertTrackAtIndex(trackIndex, true)
        local track = r.GetTrack(0, trackIndex)
        local iconPath = "C:\\Users\\user\\Documents\\GitHub\\rea-live-py\\lua\\blackguy.jpg"

        r.GetSetMediaTrackInfo_String(track, "P_NAME", "NIGGER", true)
        r.GetSetMediaTrackInfo_String(track, "P_ICON", iconPath, true)
        r.SetTrackColor(track, black)

        r.TrackList_AdjustWindows(false)
        r.UpdateArrange()
        last_time = now
    end

    r.defer(Add_Nigga)

end

--

Add_Nigga()

--
