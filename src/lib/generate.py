import os
import re
import pdfplumber

def extract_levels_from_pdf(pdf_path):
    LEVEL_REGEX = re.compile(
        r'id \d+\s+title “(.+?)”\s+description (.+?)\s+type (\w+)\s+color (\w+)\s+name “(.+?)”\s+x_position (.+?)\s+y_position (.+?)\s+leetcode_url (.+?)\s+world “(.+?)”\s+world_id (\d+)\s+prerequisites (.*?)\s+requiredBy (.*?)',
        re.DOTALL
    )
    
    levels_by_world = {}
    
    with pdfplumber.open(pdf_path) as pdf:
        text = "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())
    
    if not text:
        print("No text extracted from the PDF!")
        return
    
    prev_world_id = 1
    for match in LEVEL_REGEX.finditer(text):
        # Clean up title, description, and leetcode_url
        title = re.sub(r'\s+', ' ', match[1]).strip()
        description = re.sub(r'\s+', ' ', match[2]).strip()
        leetcode_url = re.sub(r'\s+', '', match[8]).strip()
        
        # Remove the first and last characters (quotes) from description and leetcode_url
        if description.startswith('“') and description.endswith('”'):
            description = description[1:-1]
        
        if leetcode_url.startswith('“') and leetcode_url.endswith('”'):
            leetcode_url = leetcode_url[1:-1]
        
        world_name = match[9]

        
        # Extract everything after the hyphen and discard everything before
        world_name_after_hyphen = world_name.split(" - ", 1)[1] if " - " in world_name else world_name
        world_id_name = world_name_after_hyphen.lower().replace(" ", "_").replace("-", "_")
        world_file_name = world_name_after_hyphen.replace(" ", "_").replace("-", "_") + "_Levels.js"
        
        if world_name not in levels_by_world:
            levels_by_world[world_name] = []
            x_position = 20
            y_position = 20
        elif x_position > 400:
            x_position = 20
            y_position += 100
        else:
            x_position += 100

        level_data = {
            "title": title,
            "description": f'"{description}"',
            "type": match[3],
            "color": match[4],
            "name": match[5],
            "x_position": x_position if match[6] == "TBD" else match[6],
            "y_position": y_position if match[7] == "TBD" else match[6],
            "leetcode_url": "null" if leetcode_url == "None" else f'"{leetcode_url}"',
            "prerequisites": [] if match[11] == "None" else re.findall(r'“([^”]*)”', match[11]), 
            "requiredBy": [] if match[12] == "None"  else re.findall(r'“([^”]*)”', match[12]), 
        }
        
        levels_by_world[world_name].append(level_data)
    
    # Ensure output directory exists
    os.makedirs("src/lib/output", exist_ok=True)
    
    # Write separate JS files for each world
    for world_name, levels in levels_by_world.items():
        # Generate the correct world file name
        world_name_after_hyphen = world_name.split(" - ", 1)[1] if " - " in world_name else world_name
        world_file_name = world_name_after_hyphen.replace(" ", "_").replace("-", "_") + "_Levels.js"
        
        file_path = os.path.join("src/lib/output", world_file_name)
        
        with open(file_path, "w") as f:
            #f.write('import { PrismaClient } from "@prisma/client"\n')
            #f.write("const prisma = new PrismaClient();\n")

            header = """
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
const _world = await prisma.world.findFirst({
where: {
        name: " """


            header2 = """"
    }
});

await prisma.level.deleteMany({
    where: {
        world_id: _world.id
    }
});
"""
            header = header[:-1] + world_name_after_hyphen + header2
            f.write(header)
            
            # Assign levels to variables
            level_vars = []
            for level in levels:
                level_name = '_' + level['title'].replace(" ", "_").replace("-", "_").replace("(", "_").replace(")", "").replace("’", "")
                f.write(
                    f"const {level_name} = await prisma.level.create({{\n"
                    f"  data: {{\n"
                    f"      title: \"{level['title']}\",\n"
                    f"      description: {level['description']},\n"
                    f"      type: \"{level['type']}\",\n"
                    f"      color: \"{level['color']}\",\n"
                    f"      name: \"{level['name']}\",\n"
                    f"      x_position: {level['x_position']},\n"
                    f"      y_position: {level['y_position']},\n"
                    f"      leetcode_url: {level['leetcode_url']},\n"
                    f"      world: {{ connect: {{ id: _world.id }} }}\n"
                    f"  }}\n"
                    f"}});\n\n"
                )
                level_vars.append(level_name)
            
            # Handle prerequisites and requiredBy
            for level in levels:
                level_name = '_' + level['title'].replace(" ", "_").replace("-", "_").replace("(", "_").replace(")", "").replace("’", "")
                
                # Handle prerequisites
                if level['prerequisites']:
                    prerequisite_ids = []
                    for prerequisite in level['prerequisites']:
                        prerequisite_name = '_' + prerequisite.replace(" ", "_").replace("-", "_").replace("(", "_").replace(")", "").replace("’", "").replace("\n", "_")
                        prerequisite_ids.append(f'{{ id: {prerequisite_name}.id }}')

                    prerequisite_code = ', '.join(prerequisite_ids)
                    if prerequisite_code != "_":
                        f.write(f'await prisma.level.update({{\n')
                        f.write(f'    where: {{ id: {level_name}.id }},\n')
                        f.write(f'    data: {{\n')
                        f.write(f'        prerequisites: {{ connect: [{prerequisite_code}] }}\n')
                        f.write(f'    }}\n')
                        f.write(f'}});\n')

                # Handle requiredBy
                if level['requiredBy']:
                    required_by_ids = []
                    for required_by in level['requiredBy']:
                        required_by_name = '_' + required_by.replace(" ", "_").replace("-", "_").replace("(", "_").replace(")", "").replace("’", "").replace("\n", "_")
                        required_by_ids.append(f'{{ id: {required_by_name}.id }}')

                    required_by_code = ', '.join(required_by_ids)
                    if required_by_code != "":
                        f.write(f'await prisma.level.update({{\n')
                        f.write(f'    where: {{ id: {level_name}.id }},\n')
                        f.write(f'    data: {{\n')
                        f.write(f'        requiredBy: {{ connect: [{required_by_code}] }}\n')
                        f.write(f'    }}\n')
                        f.write(f'}});\n')
            
            levels_names = ",\n                    ".join([f"{{id: {level}.id}}" for level in level_vars])
            f.write(f'await prisma.world.update({{\n')
            f.write(f'  where: {{\n')
            f.write(f'      id: _world.id,\n')
            f.write(f'  }},\n')
            f.write(f'  data: {{\n')
            f.write(f'      levels: {{\n')
            f.write(f'          connect: [{levels_names}],\n')
            f.write(f'      }},\n')
            f.write(f'  }},\n')
            f.write(f'}});\n')
            
if __name__ == "__main__":
    extract_levels_from_pdf("src/lib/Concept Roadmap Developer Mode.pdf")