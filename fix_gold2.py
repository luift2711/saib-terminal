import os

directory = 'src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace pale gold backgrounds/borders with the strong amber with appropriate opacities
            new_content = content.replace('bg-[#f5e4c0]', 'bg-[#b45309]/15')
            # For gradients and borders using e2c078
            new_content = new_content.replace('from-[#e2c078]/20', 'from-[#b45309]/15')
            # Change borders from solid pale gold to solid or semi-transparent strong gold
            new_content = new_content.replace('border-[#e2c078]', 'border-[#b45309]/40')
            # Any remaining e2c078 to b45309
            new_content = new_content.replace('#e2c078', '#b45309')
            
            if content != new_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

print('Pale gold upgraded to strong amber variants')
