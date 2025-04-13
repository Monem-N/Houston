#!/usr/bin/env python3
"""
Dropdown Menu Updater for Houston 2025 Travel Guide
This script updates the menu on all HTML pages to use the new dropdown menu
"""

import os
import re
from bs4 import BeautifulSoup
import argparse

def read_template(template_path):
    """Read the menu template file"""
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the header HTML
    header_match = re.search(r'<!--=============== HEADER ===============-->.*?</header>', content, re.DOTALL)
    if not header_match:
        raise ValueError("Could not find header HTML in template file")
    
    header_html = header_match.group(0)
    
    # Extract the CSS links
    css_match = re.search(r'<!-- Add these to the head section -->(.*?)<!-- Replace', content, re.DOTALL)
    if not css_match:
        raise ValueError("Could not find CSS links in template file")
    
    css_html = css_match.group(1).strip()
    
    # Extract the script tag
    script_match = re.search(r'<!-- Add this script before the closing body tag -->(.*?)$', content, re.DOTALL)
    if not script_match:
        raise ValueError("Could not find script tag in template file")
    
    script_html = script_match.group(1).strip()
    
    return {
        'header': header_html,
        'css': css_html,
        'script': script_html
    }

def update_menu(html_file, template_parts):
    """Update the menu in an HTML file"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Add CSS links to head if not already present
    head = soup.find('head')
    if head:
        # Check if dropdown-menu.css is already included
        dropdown_css_exists = False
        remix_icons_exists = False
        
        for link in soup.find_all('link', rel='stylesheet'):
            href = link.get('href', '')
            if 'dropdown-menu.css' in href:
                dropdown_css_exists = True
            if 'remixicon' in href:
                remix_icons_exists = True
        
        # Add dropdown-menu.css if not already included
        if not dropdown_css_exists:
            dropdown_css = BeautifulSoup('<link href="assets/css/dropdown-menu.css" rel="stylesheet"/>', 'html.parser')
            head.append(dropdown_css)
        
        # Add remixicon if not already included
        if not remix_icons_exists:
            remix_icons = BeautifulSoup('<link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet"/>', 'html.parser')
            head.append(remix_icons)
    
    # Replace the existing header with the new menu
    header = soup.find('header')
    if header:
        # Parse the new header HTML
        new_header_soup = BeautifulSoup(template_parts['header'], 'html.parser')
        new_header = new_header_soup.find('header')
        
        # Get the current page filename
        current_page = os.path.basename(html_file)
        
        # Set the active class on the corresponding link in the new menu
        if current_page:
            # First, remove all active classes
            for active_link in new_header.select('.active'):
                if 'active' in active_link.get('class', []):
                    active_link['class'].remove('active')
            
            # Then, add active class to the current page link
            for a in new_header.select('a.nav__link, a.dropdown__link, a.dropdown__sublink'):
                if a.get('href') == current_page:
                    a['class'] = a.get('class', []) + ['active']
                    
                    # If it's in a dropdown, also highlight the parent
                    dropdown_item = a.find_parent('li', class_='dropdown__item')
                    if dropdown_item:
                        nav_link = dropdown_item.select_one('.nav__link')
                        if nav_link:
                            nav_link['class'] = nav_link.get('class', []) + ['active']
        
        # Replace the header
        header.replace_with(new_header)
    
    # Add dropdown-menu.js script if not already present
    dropdown_js_exists = False
    for script in soup.find_all('script'):
        if script.get('src') and 'dropdown-menu.js' in script['src']:
            dropdown_js_exists = True
            break
    
    if not dropdown_js_exists:
        # Find the first script tag
        first_script = soup.find('script')
        if first_script:
            new_script = BeautifulSoup('<script src="assets/js/dropdown-menu.js"></script>', 'html.parser')
            first_script.insert_before(new_script.script)
    
    # Save the updated HTML
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Update the menu on all HTML pages to use the new dropdown menu")
    parser.add_argument("--template", default="dropdown-menu-template.html", help="Path to the menu template file")
    parser.add_argument("--html-dir", default=".", help="Directory containing HTML files")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually modify files")
    
    args = parser.parse_args()
    
    # Read the menu template
    try:
        template_parts = read_template(args.template)
        print(f"Read menu template from {args.template}")
    except Exception as e:
        print(f"Error reading template: {e}")
        return
    
    # Find HTML files
    html_files = [f for f in os.listdir(args.html_dir) if f.endswith('.html') and f != args.template]
    print(f"Found {len(html_files)} HTML files to update")
    
    if not html_files:
        print("No HTML files found. Exiting.")
        return
    
    # Update menu on each file
    updated_count = 0
    for html_file in html_files:
        file_path = os.path.join(args.html_dir, html_file)
        print(f"Updating {html_file}...", end=" ")
        
        if args.dry_run:
            print("(dry run)")
            continue
        
        try:
            if update_menu(file_path, template_parts):
                print("✅ Done")
                updated_count += 1
            else:
                print("❌ Failed")
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print(f"\nUpdated {updated_count}/{len(html_files)} HTML files")

if __name__ == "__main__":
    main()
