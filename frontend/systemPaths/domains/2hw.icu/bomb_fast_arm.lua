redstone.setOutput('top', false)

print('Bomb checking to be armed')

while true do
    if ship.getVelocity().y < -14 then
        print('Bomb armed')
        while true do
            if ship.getVelocity().y > -8 then
                redstone.setOutput('top', true)
                exit()
            end
            sleep()
        end
    end
    sleep()
end