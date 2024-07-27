while true do
    local input = redstone.getAnalogInput('top')
    redstone.setAnalogOutput('bottom', 15 - input)
    sleep()
end