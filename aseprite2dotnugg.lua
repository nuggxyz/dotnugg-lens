print('aseprite2dotnugg')

local function split(inputstr, sep)
    if sep == nil then
            sep = "%s"
    end
    local t={}
    for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
            table.insert(t, str)
    end
    print(t[#t])
    return t
end

local selectedLayer = app.params["layer"]
local pathNames = split(split(app.params["source"], '.')[1], '/')--package.config:sub(1,1))

local sprite = Sprite{ fromFile=app.params["source"] }--app.open(app.params["source"])
local alphabet = { '.','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' }
local usedColors = {}


-- Check constraints
if sprite == nil then
  app.alert("No Sprite...")
  return
end
function colorToInt(color)
   return (color.red << 16) + (color.green << 8) + (color.blue)
 end

function get_pixel_color(img, x, y)
		return Color(app.pixelColor.rgbaR(img:getPixel(x, y)),
			app.pixelColor.rgbaG(img:getPixel(x, y)),
			app.pixelColor.rgbaB(img:getPixel(x, y)),
			app.pixelColor.rgbaA(img:getPixel(x, y)))
end

local function smartInsertColor(color)
    for i=1, #usedColors do
        if usedColors[i].red == color.red and usedColors[i].green == color.green and usedColors[i].blue == color.blue and usedColors[i].alpha == color.alpha then
            return alphabet[i]
        end
    end

    table.insert(usedColors, color)

    return  alphabet[#usedColors]
end

local function getPalette()
    local res = ""

    res = res .. "\tcolors := {\n"

    -- start at two to skip transparent
    for i=2, #usedColors do
        res = res .. "\t\t" .. alphabet[i] .. string.format(" := { zindex: +D, rgba: \"rgba(%i,%i,%i,%.1f)\" }\n", usedColors[i].red, usedColors[i].green, usedColors[i].blue, usedColors[i].alpha/255)
    end

    res = res .. "\t}\n"

	return res
end

local function getData(img, x, y, w, h, palette)
	local res = ""
    local center = math.floor(w / 2)
    res = res .. "\tversions := {\n"
    res = res .. "\t\t0 := {\n"
    res = res .. "\t\t\tanchor := { x: " .. center .. ", y: " .. center .. " }\n"
    res = res .. "\t\t\tdata := {\n"

	for y = 0,h-1 do
      res = res .. "\t\t\t\t"
		for x = 0, w-1 do
            local letter = smartInsertColor(get_pixel_color(img,x, y))
			res = res .. letter
		end
		res = res .. "\n"
	end


   res = res .. "\t\t\t}\n"
   res = res .. "\t\t}\n"
   res = res .. "\t}\n"

	return getPalette() .. res
end

local function exportFrame(frm)
	if frm == nil then
		frm = 1
	end

    local sprite = app.activeSprite

    local layers = {}

    for i, layer in ipairs(sprite.layers) do
        table.insert(layers, layer)
        layer.isVisible = false
    end

    for i, layer in ipairs(layers) do
        if selectedLayer == "_" or selectedLayer == layer.name then
            layer.isVisible = true
            local img = Image(layer.sprite.spec)
            img:drawSprite(sprite, frm)
            usedColors = {}

            local f = io.open(app.params["dest"] .. "/" .. "generated." .. i .. "." .. layer.name:gsub("/", "_")  .. ".item.nugg", "w")
            io.output(f)

            -- io.write("// This is a dotnugg item file:\n")
            -- io.write("// - this file can be place anywhere inside the directory, but it must end with item.nugg\n")
            -- io.write("// - the following are required arguments: @item([feature], [id], [weight])\n")
            -- io.write("//    - [feature]: the feature type of the item. Must be one of the features defined in the collection.nugg file\n")
            -- io.write("//    - [id]: the unique id of the item. Note, the id is unique within the scope of its feature, meaning you can have BACK 1 as well as EYES 1, but not two BACK 1s\n")
            -- io.write("//    - [weight]: the likelihood of this item being selected in favor of others\n")
            -- io.write("//\n")
            -- io.write("// Here is where you define what the item will look like.\n")
            -- io.write("// The colors are mapped to letters, which are used to draw out the image in the 'versions' section.\n")
            -- io.write("// The zindex value, or layer, defines which color will be placed above others. It can be a positive or negative integer, or '+D' which uses the default value for this feature defined in the collection file\n")
            -- io.write("// The versions define the actual image as well as how we should assemble it. There can be more than one version of a specific item.\n")
            -- io.write("// The anchor defines the point that will be used as a reference when merging this item with another\n")

            io.write("@item(CHANGE_ME, CHANGE_ME, .0021) := {\n")
            io.write(getData(img, x, y, sprite.width, sprite.height, sprite.palettes[1]))
            io.write("}\n")

            io.close(f)
            layer.isVisible = false
        end
    end
end

for i = 1,#sprite.frames do
    exportFrame(i)
end
