import re

files = [
    'src/components/DailyQuiz.jsx',
    'src/components/TradingJournal.jsx',
    'src/components/TradingGym.jsx'
]

replacements = {
    # Layout and Backgrounds
    r'bg-\[\#181A20\]/40': r'bg-[#fff]/80 dark:bg-[#111827]/60',
    r'bg-\[\#181A20\]': r'bg-[#fff] dark:bg-[#111827]',
    r'border-white/5': r'border-[rgba(15,17,23,0.1)] dark:border-[rgba(255,255,255,0.08)]',
    r'border-\[\#2B3139\]': r'border-[rgba(15,17,23,0.1)] dark:border-[#2B3139]',
    r'bg-\[\#0B0E11\]': r'bg-[#faf9f6] dark:bg-[#0B0E11]',
    r'bg-white/10': r'bg-[rgba(15,17,23,0.05)] dark:bg-[rgba(255,255,255,0.05)]',
    r'bg-white/5': r'bg-[rgba(15,17,23,0.02)] dark:bg-[rgba(255,255,255,0.02)]',
    r'bg-black': r'bg-[#faf9f6] dark:bg-[#0B0E11]',

    # Typography
    r'text-white': r'text-[#0f1117] dark:text-white',
    r'text-\[\#EAECEF\]': r'text-[#0f1117] dark:text-[#EAECEF]',
    r'text-\[\#848E9C\]': r'text-[#636878] dark:text-[#848E9C]',
    r'text-\[\#666\]': r'text-[#9ba0ad] dark:text-[#666]',
    
    # Invert Black/White buttons
    r'bg-white\b': r'bg-[#0f1117] dark:bg-white',
    r'text-black\b': r'text-white dark:text-black',
    
    # Accent Colors (FCD535 -> c8922a / 00d084)
    r'text-\[\#FCD535\]': r'text-[#c8922a] dark:text-[#00d084]',
    r'bg-\[\#FCD535\]': r'bg-[#c8922a] dark:bg-[#00d084]',
    r'border-\[\#FCD535\]': r'border-[#c8922a] dark:border-[#00d084]',
    r'hover:bg-\[\#FCD535\]': r'hover:bg-[#c8922a] dark:hover:bg-[#00d084]',
    r'hover:border-\[\#FCD535\]': r'hover:border-[#c8922a] dark:hover:border-[#00d084]',
    r'shadow-\[0_0_15px_rgba\(252,213,53,0\.4\)\]': r'shadow-[0_0_15px_rgba(200,146,42,0.4)] dark:shadow-[0_0_15px_rgba(0,208,132,0.4)]',
    
    # Fix JSX wrapped in strings (syntax errors)
    r"'Xem Kết Quả <ArrowRight size=\{16\} className=\"inline mr-1\"/>'": r'<>Xem Kết Quả <ArrowRight size={16} className="inline mr-1"/></>',
    r"'Câu Tiếp Theo <ArrowRight size=\{16\} className=\"inline mr-1\"/>'": r'<>Câu Tiếp Theo <ArrowRight size={16} className="inline mr-1"/></>',
    r"'<CheckCircle size=\{18\} className=\"inline mr-2\"/> CHÍNH XÁC TỐI ĐA!'": r'<><CheckCircle size={18} className="inline mr-2"/> CHÍNH XÁC TỐI ĐA!</>',
    r"'<XCircle size=\{18\} className=\"inline mr-2\"/> BẠN ĐÃ CHỌN SAI!'": r'<><XCircle size={18} className="inline mr-2"/> BẠN ĐÃ CHỌN SAI!</>',
    r"'<Trophy size=\{18\} className=\"inline mr-1 text-yellow-500\" /> VƯỢT QUA BƯỚC 1'": r'<><Trophy size={18} className="inline mr-1 text-yellow-500" /> VƯỢT QUA BƯỚC 1</>',
    r"'<Skull size=\{24\} className=\"inline mr-1\"/> VI PHẠM LUẬT QUỸ'": r'<><Skull size={24} className="inline mr-1"/> VI PHẠM LUẬT QUỸ</>'
}

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements.items():
        content = re.sub(old, new, content)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Success')
