rednet.open('back')

while true do
    local event, key = os.pullEvent()

    if (event == 'key') or (event == 'key_up') then
        rednet.broadcast(event .. '_' .. key, 'ptcu')
    end
end