import os

directory = 'src/components'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            content = content.replace("active ? 'font-medium' : 'font-light'", "active ? 'font-bold' : 'font-medium'")
            content = content.replace('font-light', 'font-medium')
            content = content.replace('font-normal', 'font-medium')
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print('Done')
