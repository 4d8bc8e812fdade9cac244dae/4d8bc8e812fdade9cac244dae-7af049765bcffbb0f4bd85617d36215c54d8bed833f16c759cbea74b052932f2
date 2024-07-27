local fuel_tanks = {}
local engines = {}

local sides = peripheral.getNames()

for i,v in pairs(sides) do
    local type = peripheral.getType(v)
    if string.find(type, 'dieselgenerators') then
        table.insert(engines, peripheral.wrap(v))
    elseif (type == 'create:fluid_tank') or (type == 'create:creative_fluid_tank') then
        table.insert(fuel_tanks, peripheral.wrap(v))
    end
end

if #fuel_tanks == 0 then
    error('NO FUEL TANK FOUND')
end

if #engines == 0 then
    error('NO ENGINE FOUND')
end

local function transferFluids(a, b)
    for i, a_ in pairs(a) do
        for i, b_ in pairs(b) do
            a_.pushFluid(peripheral.getName(b_))
        end
    end
end


while true do
    transferFluids(fuel_tanks, engines)
    sleep()
end