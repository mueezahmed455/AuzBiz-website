import os, sys, re

extensions = ('.ts', '.tsx', '.js', '.jsx')
dirs_to_skip = {'.git', 'node_modules', '.next'}

replacements = [
    (re.compile(r'254 C1, DHA II Rehbar, Lahore, Pakistan\.'), 'DHA RAHBAR, Lahore, Pakistan.'),
    (re.compile(r'254 C1, DHA II Rehbar, Lahore, Pakistan'), 'DHA RAHBAR, Lahore, Pakistan'),
    (re.compile(r'254 C1, DHA II Rehbar, Lahore'), 'DHA RAHBAR, Lahore'),
    (re.compile(r'254 C1 DHA II Rehbar\.'), 'DHA RAHBAR, Lahore.'),
    (re.compile(r'254 C1 DHA II Rehbar'), 'DHA RAHBAR, Lahore'),
    (re.compile(r'254\+C1\+DHA\+II\+Rehbar\+Lahore\+Pakistan'), 'DHA+RAHBAR+Lahore+Pakistan'),
]

for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in dirs_to_skip]
    for f in files:
        if f.endswith(extensions) and not f.endswith('.min.js'):
            path = os.path.join(root, f)
            try:
                with open(path, 'r', encoding='utf-8') as fh:
                    content = fh.read()
                modified = False
                for pattern, replacement in replacements:
                    new_content, count = pattern.subn(replacement, content)
                    if count > 0:
                        content = new_content
                        modified = True
                if modified:
                    with open(path, 'w', encoding='utf-8') as fh:
                        fh.write(content)
            except Exception as e:
                sys.stderr.write(f"Error processing {path}: {e}\n")
