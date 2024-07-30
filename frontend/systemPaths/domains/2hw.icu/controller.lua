rednet.open('back')

while true do
    rednet.broadcast(os.pullEvent(), 'ptcu')
end