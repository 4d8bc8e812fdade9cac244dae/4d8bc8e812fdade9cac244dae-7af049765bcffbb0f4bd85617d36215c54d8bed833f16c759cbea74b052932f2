redstone.setOutput('top', false)

print('Bomb checking to be armed')

while true do
    if ship.getVelocity().y < -20 then
        print('Bomb armed')
        while true do
            if ship.getVelocity().y > -10 then
                redstone.setOutput('top', true)
                exit()
            end
            sleep()
        end
    end
    sleep()
end