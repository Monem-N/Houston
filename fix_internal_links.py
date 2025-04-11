#!/usr/bin/env python3
import os
import re
import urllib.parse

def get_all_markdown_files(directory):
    """Get all markdown files in the directory"""
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(os.path.join(root, file))
    return markdown_files

def get_actual_filenames(directory):
    """Get a mapping of lowercase filenames to actual filenames"""
    filename_map = {}
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                filename_map[file.lower()] = file
    return filename_map

def fix_internal_links(file_path, filename_map):
    """Fix internal links in a markdown file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all markdown links
    links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
    changes_made = 0
    
    for link_text, link_url in links:
        # Only process internal markdown links
        if not link_url.endswith('.md') and '%20' not in link_url:
            continue
        
        # Handle URL-encoded links
        if '%20' in link_url:
            decoded_url = urllib.parse.unquote(link_url)
            if decoded_url.endswith('.md'):
                # Get the filename part
                filename = os.path.basename(decoded_url)
                # Find the correct filename with underscores
                for actual_file in filename_map.values():
                    if actual_file.lower() == filename.lower().replace(' ', '_'):
                        # Replace spaces with underscores in the filename part
                        new_filename = actual_file
                        new_url = os.path.join(os.path.dirname(link_url), new_filename)
                        # Replace the old link with the new one
                        old_link = f'[{link_text}]({link_url})'
                        new_link = f'[{link_text}]({new_filename})'
                        content = content.replace(old_link, new_link)
                        changes_made += 1
                        print(f"  Fixed: {link_url} -> {new_filename}")
        
        # Handle regular links with spaces
        elif ' ' in link_url:
            # Replace spaces with underscores
            new_url = link_url.replace(' ', '_')
            # Replace the old link with the new one
            old_link = f'[{link_text}]({link_url})'
            new_link = f'[{link_text}]({new_url})'
            content = content.replace(old_link, new_link)
            changes_made += 1
            print(f"  Fixed: {link_url} -> {new_url}")
    
    # Write the updated content back to the file
    if changes_made > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Made {changes_made} changes in {file_path}")
    
    return changes_made

def main():
    directory = 'Houston_Guide'
    
    # Get all markdown files
    markdown_files = get_all_markdown_files(directory)
    
    # Get a mapping of lowercase filenames to actual filenames
    filename_map = get_actual_filenames(directory)
    
    # Fix internal links in each file
    total_changes = 0
    for file_path in markdown_files:
        print(f"Processing {file_path}...")
        changes = fix_internal_links(file_path, filename_map)
        total_changes += changes
    
    print(f"\nTotal changes made: {total_changes}")

if __name__ == '__main__':
    main()
