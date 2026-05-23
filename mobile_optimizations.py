import os

directory = 'src'

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.jsx', '.js', '.css')):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Thay thế hover: thành active: md:hover: cho một số component
            content = content.replace('hover:bg-', 'active:bg- md:hover:bg-')
            content = content.replace('hover:text-', 'active:text- md:hover:text-')
            content = content.replace('hover:shadow-', 'active:shadow- md:hover:shadow-')
            content = content.replace('hover:scale-', 'active:scale- md:hover:scale-')
            content = content.replace('hover:border-', 'active:border- md:hover:border-')
            
            # Xóa các lỗi duplicate (phòng trường hợp đã có active: hoặc md:hover:)
            content = content.replace('active:bg- md:active:bg-', 'active:bg-')
            
            with open(path, 'w', encoding='utf-8') as f:
                f.write(content)

print('Done mobile optimizations')
