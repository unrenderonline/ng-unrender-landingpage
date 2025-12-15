
import re
import os

file_path = r'c:\DEV\git-repos\public\ng-unrender-landingpage\src\app\lib\controller-d1-OMKPY.js'

try:
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        exit(1)

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        found = False
        for i, line in enumerate(lines):
            if 'require("path")' in line or "require('path')" in line or 'require("fs")' in line or "require('fs')" in line:
                print(f"Found at line {i+1}:")
                # Print a snippet
                print(line[:200])
                found = True
        
        if not found:
            print("Pattern not found.")

except Exception as e:
    print(f"Error: {e}")
