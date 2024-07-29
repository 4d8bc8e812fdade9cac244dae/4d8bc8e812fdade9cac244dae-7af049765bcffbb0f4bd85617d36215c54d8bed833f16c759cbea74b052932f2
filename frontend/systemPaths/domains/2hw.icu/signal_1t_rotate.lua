local sides = {'front', 'right', 'back', 'left'}

while true do
    for i, side in pairs(sides) do
        redstone.setOutput(side, true)
        sleep()
        redstone.setOutput(sides[(i - 2) % #sides + 1], false)
    end
end