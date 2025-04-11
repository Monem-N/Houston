#!/usr/bin/env python3
import os
import re

def get_all_markdown_files(directory):
    """Get all markdown files in the directory"""
    markdown_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(os.path.join(root, file))
    return markdown_files

def fix_external_links(file_path):
    """Fix external links in a markdown file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all markdown links
    links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content)
    changes_made = 0
    
    for link_text, link_url in links:
        new_url = None
        
        # Fix Google Maps shortened links
        if 'goo.gl/maps/' in link_url:
            location = link_url.split('goo.gl/maps/')[1]
            if location == 'museum-district-houston':
                new_url = 'https://www.google.com/maps/search/museum+district+houston'
            elif location == 'katy-mills-houston':
                new_url = 'https://www.google.com/maps/place/Katy+Mills/@29.7778953,-95.8157172,17z/'
            elif location == 'hermann-park-houston':
                new_url = 'https://www.google.com/maps/place/Hermann+Park/@29.7209778,-95.3909489,15z/'
            elif location == 'houston-airport':
                new_url = 'https://www.google.com/maps/place/George+Bush+Intercontinental+Airport/@29.9902199,-95.3370506,14z/'
            elif location == 'YQvDJZXH8ZQEfLZS6':
                new_url = 'https://www.google.com/maps/place/George+R.+Brown+Convention+Center/@29.7518374,-95.3604927,17z/'
            elif location == 'wNHRGZ8JkKqJfBJC7':
                new_url = 'https://www.google.com/maps/place/Space+Center+Houston/@29.5519323,-95.0970893,17z/'
            elif location == '5Ld4Ld9Ld9Ld9Ld9A':
                new_url = 'https://www.google.com/maps/place/Crowne+Plaza+Houston+Med+Ctr-Galleria+Area/@29.731392,-95.4236967,17z/'
        
        # Fix METRO trip planner links
        elif 'ridemetro.org/trip-planner' in link_url:
            new_url = 'https://www.ridemetro.org/Pages/TripPlanner.aspx'
        
        # Fix Simon Mall links
        elif 'simon.com/mall/katy-mills' in link_url:
            new_url = 'https://www.simon.com/mall/katy-mills'
            
        # Fix Premium Outlets links
        elif 'premiumoutlets.com/outlet/houston' in link_url:
            new_url = 'https://www.premiumoutlets.com/outlet/houston-premium-outlets'
            
        # Fix TripAdvisor links (these need to be updated to avoid 403 errors)
        elif 'tripadvisor.com/Attraction_Review' in link_url:
            if 'Katy_Mills-Katy_Texas' in link_url:
                new_url = 'https://www.google.com/maps/place/Katy+Mills/@29.7778953,-95.8157172,17z/'
            elif 'Houston_Premium_Outlets-Cypress_Texas' in link_url:
                new_url = 'https://www.google.com/maps/place/Houston+Premium+Outlets/@29.9851799,-95.6764507,17z/'
            elif 'Tanger_Outlets_Houston-Texas_City_Texas' in link_url:
                new_url = 'https://www.google.com/maps/place/Tanger+Outlets+Houston/@29.3795089,-95.0477277,17z/'
            elif 'Houston_Museum_of_Natural_Science-Houston_Texas' in link_url:
                new_url = 'https://www.google.com/maps/place/Houston+Museum+of+Natural+Science/@29.7221803,-95.3897909,17z/'
            elif 'The_Health_Museum-Houston_Texas' in link_url:
                new_url = 'https://www.google.com/maps/place/The+Health+Museum/@29.7213863,-95.3855,17z/'
            elif 'Houston_Zoo-Houston_Texas' in link_url:
                new_url = 'https://www.google.com/maps/place/Houston+Zoo/@29.7147037,-95.3909489,17z/'
            elif 'Hermann_Park-Houston_Texas' in link_url:
                new_url = 'https://www.google.com/maps/place/Hermann+Park/@29.7209778,-95.3909489,15z/'
        
        # Fix Space Center Houston links
        elif 'spacecenter.org/visitor-information/explore-our-center/' in link_url:
            new_url = 'https://spacecenter.org/visitor-info/'
            
        # Fix Houston Zoo map link
        elif 'houstonzoo.org/plan-your-visit/zoo-map/' in link_url:
            new_url = 'https://www.houstonzoo.org/explore/zoo-map/'
            
        # Fix Hermann Park map link
        elif 'hermannpark.org/visit/maps/' in link_url:
            new_url = 'https://www.hermannpark.org/visit/'
            
        # Fix HouMuse map link
        elif 'houmuse.org/visit/map/' in link_url:
            new_url = 'https://houmuse.org/visit/'
            
        # Fix Turkish Airlines links
        elif 'turkishairlines.com/en-int/flights/free-istanbul-tour/' in link_url:
            new_url = 'https://www.turkishairlines.com/en-us/flights/free-istanbul-tour/'
            
        # Fix Health Museum link
        elif 'thehealthmuseum.org/' in link_url:
            new_url = 'https://www.thehealthmuseum.org/visit'
            
        # Fix Kemah Boardwalk link
        elif 'kemahboardwalk.com/' in link_url:
            new_url = 'https://www.kemahboardwalk.com/attractions.asp'
            
        # Fix Downtown Houston links
        elif 'downtownhouston.org/' in link_url:
            new_url = 'https://www.downtownhouston.org/'
            
        # Fix Discovery Green link
        elif 'discoverygreen.com/' in link_url:
            new_url = 'https://www.discoverygreen.com/visit'
            
        # Fix Visit Houston Texas link
        elif 'visithoustontexas.com/things-to-do/neighborhoods/downtown/' in link_url:
            new_url = 'https://www.visithoustontexas.com/things-to-do/neighborhoods/'
        
        # If we have a new URL, replace the old one
        if new_url:
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
    
    # Fix external links in each file
    total_changes = 0
    for file_path in markdown_files:
        print(f"Processing {file_path}...")
        changes = fix_external_links(file_path)
        total_changes += changes
    
    print(f"\nTotal changes made: {total_changes}")

if __name__ == '__main__':
    main()
