#!/usr/bin/env python3
import os
import re

def fix_guide_local_links(directory):
    """Fix links to Guide_Local_Houston___Manger,_Acheter_.md"""
    old_link = "Guide_Local_Houston___Manger%2C_Acheter_.md"
    new_link = "Guide_Local_Houston___Manger_Acheter.md"
    
    old_link_unencoded = "Guide_Local_Houston___Manger,_Acheter_.md"
    
    for root, _, files in os.walk(directory):
        for file in files:
            if not file.endswith('.md'):
                continue
                
            file_path = os.path.join(root, file)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace encoded link
            if old_link in content:
                content = content.replace(old_link, new_link)
                print(f"Fixed encoded link in {file_path}")
            
            # Replace unencoded link
            if old_link_unencoded in content:
                content = content.replace(old_link_unencoded, new_link)
                print(f"Fixed unencoded link in {file_path}")
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

if __name__ == '__main__':
    fix_guide_local_links('Houston_Guide')
