local sides = {'front', 'right', 'back', 'left'}

while true do
    for i, side in pairs(sides) do
        if redstone.getInput('bottom') == true then redstone.setOutput(side, true)
        end
        sleep()
        redstone.setOutput(sides[(i - 2) % #sides + 1], false)
    end
end