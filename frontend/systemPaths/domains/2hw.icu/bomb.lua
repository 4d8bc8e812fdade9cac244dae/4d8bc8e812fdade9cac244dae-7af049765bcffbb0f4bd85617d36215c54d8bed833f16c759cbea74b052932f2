redstone.setOutput('top', false)

while true do
    if ship.getVelocity().y < -20 then
        while true do
            if ship.getVelocity().y > -10 then
                redstone.setOutput('top', true)
            end
            sleep()
        end
    end
    sleep()
end