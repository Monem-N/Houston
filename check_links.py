import os
import re
import requests
from requests.exceptions import RequestException
from urllib.parse import urlparse
import logging
from datetime import datetime

# ANSI color codes for terminal output [[1]][[3]][[5]]
GREEN = '\033[92m'
RED = '\033[91m'
YELLOW = '\033[93m'
RESET = '\033[0m'

def extract_links(markdown_file):
    """Extract non-image markdown links using regex [[9]][[10]]"""
    with open(markdown_file, 'r', encoding='utf-8') as f:
        content = f.read()
    return re.findall(r'(?<!!)\[.*?\]\((.*?)\)', content)

def check_url_status(url):
    """Check URL with proper HTTP handling"""
    try:
        response = requests.head(url, timeout=5, allow_redirects=True)
        return response.status_code // 100 == 2, response.status_code
    except RequestException as e:
        return False, str(e)

def resolve_local_link(file_path, link):
    """Resolve local links with fragment handling"""
    base_link = link.split('#')[0].split('?')[0]
    return os.path.normpath(os.path.join(os.path.dirname(file_path), base_link))

def configure_logging(log_file):
    """Setup logging with timestamps and formatting [[7]][[8]]"""
    logging.basicConfig(
        filename=log_file,
        level=logging.INFO,
        format='%(asctime)s | %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S'
    )

def main():
    directory = 'Houston_Guide'
    log_file = 'link_check_results.log'
    configure_logging(log_file)
    
    for root, _, files in os.walk(directory):
        for file in files:
            if not file.endswith('.md'):
                continue
                
            file_path = os.path.join(root, file)
            separator = '=' * 60
            
            # Log file headers [[3]]
            logging.info(separator)
            logging.info(f"Processing: {file_path}")
            logging.info(separator)
            
            # Terminal progress message
            print(f"\n{YELLOW}{separator}{RESET}")
            print(f"{YELLOW}Processing: {file_path}{RESET}")
            print(f"{YELLOW}{separator}{RESET}")
            
            links = extract_links(file_path)
            if not links:
                continue
                
            for link in links:
                if link.startswith(('http', 'https')):
                    valid, details = check_url_status(link)
                    status = f"{'OK' if valid else 'Broken':<8}"
                    log_msg = f"{status} {link}"
                    term_msg = f"{GREEN if valid else RED}{status}{RESET} {link}"
                    
                    if not valid:
                        log_msg += f" -> Status {details}"
                        term_msg += f" {RED}->{RESET} Status {details}"
                        
                else:
                    abs_path = resolve_local_link(file_path, link)
                    valid = os.path.exists(abs_path)
                    status = f"{'OK' if valid else 'Broken':<8}"
                    log_msg = f"{status} {link}"
                    term_msg = f"{GREEN if valid else RED}{status}{RESET} {link}"
                    
                    if not valid:
                        log_msg += f" -> Not found at {abs_path}"
                        term_msg += f" {RED}->{RESET} Not found at {abs_path}"
                
                # Write to log and terminal
                logging.info(log_msg)
                print(term_msg)

if __name__ == '__main__':
    main()