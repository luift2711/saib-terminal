import os

directory = 'src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.css'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace old weak gold with strong gold
            new_content = content.replace('#c8922a', '#b45309')
            # Also fix hex cases if any
            new_content = new_content.replace('#C8922A', '#b45309')
            # Fix rgba(200,146,42...) which is the rgba equivalent of #c8922a
            # #c8922a in rgb is 200, 146, 42.
            # #b45309 in rgb is 180, 83, 9.
            new_content = new_content.replace('200,146,42', '180,83,9')
            new_content = new_content.replace('200, 146, 42', '180, 83, 9')
            
            if content != new_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)

print('Gold color updated to #b45309')
