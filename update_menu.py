#!/usr/bin/env python3
"""
Menu Updater for Houston 2025 Travel Guide
This script updates the menu on all HTML pages
"""

import os
import re
from bs4 import BeautifulSoup
import argparse

def read_template(template_path):
    """Read the menu template file"""
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the menu HTML
    menu_match = re.search(r'<!-- Accessibility skip link -->.*?</header>', content, re.DOTALL)
    if not menu_match:
        raise ValueError("Could not find menu HTML in template file")
    
    return menu_match.group(0)

def update_menu(html_file, menu_html, css_link, js_script):
    """Update the menu in an HTML file"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse HTML
    soup = BeautifulSoup(content, 'html.parser')
    
    # Check if menu.css is already included
    css_exists = False
    for link in soup.find_all('link', rel='stylesheet'):
        if 'menu.css' in link.get('href', ''):
            css_exists = True
            break
    
    # Add menu.css if not already included
    if not css_exists and css_link:
        # Find the last CSS link
        last_css = None
        for link in soup.find_all('link', rel='stylesheet'):
            last_css = link
        
        if last_css:
            new_css = soup.new_tag('link')
            new_css['href'] = 'assets/css/menu.css'
            new_css['rel'] = 'stylesheet'
            last_css.insert_after(new_css)
    
    # Check if menu.js is already included
    js_exists = False
    for script in soup.find_all('script'):
        if script.get('src') and 'menu.js' in script['src']:
            js_exists = True
            break
    
    # Add menu.js if not already included
    if not js_exists and js_script:
        # Find the first script tag
        first_script = soup.find('script')
        if first_script:
            new_script = soup.new_tag('script')
            new_script['src'] = 'assets/js/menu.js'
            first_script.insert_before(new_script)
    
    # Replace the existing header with the new menu
    header = soup.find('header')
    if header:
        # Parse the new menu HTML
        new_menu_soup = BeautifulSoup(menu_html, 'html.parser')
        new_header = new_menu_soup.find('header')
        
        # Get the current active page
        current_page = None
        for a in header.find_all('a', class_='active'):
            href = a.get('href')
            if href:
                current_page = href
                break
        
        # Set the active class on the corresponding link in the new menu
        if current_page:
            for a in new_header.find_all('a'):
                if a.get('href') == current_page:
                    a['class'] = a.get('class', []) + ['active']
        
        # Replace the header
        header.replace_with(new_header)
        
        # Also replace the skip link
        skip_link = soup.find('a', class_='skip-link')
        if skip_link:
            new_skip_link = new_menu_soup.find('a', class_='skip-link')
            if new_skip_link:
                skip_link.replace_with(new_skip_link)
    
    # Save the updated HTML
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(str(soup))
    
    return True

def main():
    """Main function"""
    parser = argparse.ArgumentParser(description="Update the menu on all HTML pages")
    parser.add_argument("--template", default="menu-template.html", help="Path to the menu template file")
    parser.add_argument("--html-dir", default=".", help="Directory containing HTML files")
    parser.add_argument("--add-css", action="store_true", help="Add menu.css link if not present")
    parser.add_argument("--add-js", action="store_true", help="Add menu.js script if not present")
    parser.add_argument("--dry-run", action="store_true", help="Don't actually modify files")
    
    args = parser.parse_args()
    
    # Read the menu template
    try:
        menu_html = read_template(args.template)
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
            if update_menu(file_path, menu_html, args.add_css, args.add_js):
                print("✅ Done")
                updated_count += 1
            else:
                print("❌ Failed")
        except Exception as e:
            print(f"❌ Error: {e}")
    
    print(f"\nUpdated {updated_count}/{len(html_files)} HTML files")

if __name__ == "__main__":
    main()
