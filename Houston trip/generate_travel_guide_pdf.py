#!/usr/bin/env python3
"""
Script pour générer un PDF complet du guide de voyage Houston
Inclut une page de couverture avec front_page.png et tous les documents et annexes
"""

import os
import sys
from fpdf import FPDF
import markdown
from bs4 import BeautifulSoup
import re
import requests
from PIL import Image
from io import BytesIO

class TravelGuidePDF(FPDF):
    def __init__(self):
        super().__init__()
        self.WIDTH = 210
        self.HEIGHT = 297
        
    def header(self):
        # Custom header for pages after the cover
        if self.page_no() > 1:
            self.set_font('Arial', 'B', 10)
            self.cell(0, 10, 'Guide de Voyage Houston - FIRST Championship 2025', 0, 0, 'C')
            self.ln(5)
            
    def footer(self):
        # Custom footer for pages after the cover
        if self.page_no() > 1:
            self.set_y(-15)
            self.set_font('Arial', 'I', 8)
            self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
            
    def add_cover(self, cover_image):
        """Add cover page with image"""
        self.add_page()
        
        # Check if image exists
        if not os.path.exists(cover_image):
            print(f"Warning: Cover image {cover_image} not found. Creating text cover instead.")
            self.set_font('Arial', 'B', 24)
            self.cell(0, 40, '', 0, 1)
            self.cell(0, 20, 'GUIDE DE VOYAGE', 0, 1, 'C')
            self.cell(0, 20, 'HOUSTON', 0, 1, 'C')
            self.cell(0, 20, 'FIRST CHAMPIONSHIP 2025', 0, 1, 'C')
            return
            
        # Get image dimensions
        try:
            img = Image.open(cover_image)
            img_width, img_height = img.size
            
            # Calculate scaling to fit page while maintaining aspect ratio
            width_ratio = self.WIDTH / img_width
            height_ratio = self.HEIGHT / img_height
            ratio = min(width_ratio, height_ratio)
            
            new_width = img_width * ratio
            new_height = img_height * ratio
            
            # Center image on page
            x = (self.WIDTH - new_width) / 2
            y = (self.HEIGHT - new_height) / 2
            
            self.image(cover_image, x=x, y=y, w=new_width, h=new_height)
        except Exception as e:
            print(f"Error adding cover image: {e}")
            self.set_font('Arial', 'B', 24)
            self.cell(0, 40, '', 0, 1)
            self.cell(0, 20, 'GUIDE DE VOYAGE', 0, 1, 'C')
            self.cell(0, 20, 'HOUSTON', 0, 1, 'C')
            self.cell(0, 20, 'FIRST CHAMPIONSHIP 2025', 0, 1, 'C')
            
    def add_toc(self, toc_entries):
        """Add table of contents"""
        self.add_page()
        self.set_font('Arial', 'B', 16)
        self.cell(0, 20, 'TABLE DES MATIÈRES', 0, 1, 'C')
        self.ln(10)
        
        self.set_font('Arial', '', 12)
        for title, page in toc_entries:
            dots = '.' * (60 - len(title) - len(str(page)))
            self.cell(0, 10, f"{title} {dots} {page}", 0, 1)
            
    def add_markdown_file(self, md_file, toc_entries):
        """Convert markdown file to PDF and add to document"""
        if not os.path.exists(md_file):
            print(f"Warning: File {md_file} not found. Skipping.")
            return toc_entries
            
        # Get file title for TOC
        file_title = os.path.basename(md_file).replace('.md', '')
        
        # Store current page for TOC
        start_page = self.page_no() + 1
        
        # Read markdown content
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()
            
        # Convert markdown to HTML
        html = markdown.markdown(md_content)
        soup = BeautifulSoup(html, 'html.parser')
        
        # Start a new page
        self.add_page()
        
        # Process headings
        for heading in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']):
            level = int(heading.name[1])
            
            if level == 1:
                self.set_font('Arial', 'B', 18)
                self.ln(5)
                self.multi_cell(0, 10, heading.text)
                self.ln(5)
            elif level == 2:
                self.set_font('Arial', 'B', 16)
                self.ln(5)
                self.multi_cell(0, 10, heading.text)
                self.ln(5)
            elif level == 3:
                self.set_font('Arial', 'B', 14)
                self.multi_cell(0, 10, heading.text)
                self.ln(3)
            else:
                self.set_font('Arial', 'B', 12)
                self.multi_cell(0, 10, heading.text)
                self.ln(2)
                
            # Remove the heading from soup to avoid processing it again
            heading.extract()
        
        # Process paragraphs and lists
        for element in soup.find_all(['p', 'ul', 'ol']):
            if element.name == 'p':
                self.set_font('Arial', '', 11)
                self.multi_cell(0, 6, element.text)
                self.ln(3)
            elif element.name in ['ul', 'ol']:
                self.set_font('Arial', '', 11)
                for li in element.find_all('li'):
                    self.multi_cell(0, 6, f"• {li.text}")
                self.ln(3)
                
        # Add to TOC
        toc_entries.append((file_title, start_page))
        return toc_entries

def download_image(url, save_path):
    """Download image from URL and save locally"""
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        img.save(save_path)
        return True
    except Exception as e:
        print(f"Error downloading image: {e}")
        return False

def main():
    # Define the order of documents
    document_order = [
        "Introduction et Sommaire.md",
        "Plan de Voyage Houston - Résumé Exécutif.md",
        "Journées 14-15 et 23-24 avril 2025 - Guide Arrivée et Départ.md",
        "Journées 16-19 avril 2025 - Guide FIRST Championship Détaillé Final.md",
        "Journée 20 avril 2025 - Guide Space Center & Kemah Détaillé.md",
        "Journée 21 avril 2025 - Guide Shopping Détaillé Final.md",
        "Journée 22 avril 2025 - Guide Museum District Détaillé.md",
        "Journée 23 avril 2025 - Guide Hermann Park et Zoo Détaillé.md",
        "Guide Gastronomique et Shopping - Houston Authentique.md",
        "Guide Local Houston _ Manger, Acheter_.md",
        "Annexe - Downtown Houston à Explorer.md",
        "Guide Pratique Touristanbul.md",
        "Touristanbul.md",
        "Annexes - Cartes et Liens Utiles.md"
    ]
    
    # Create PDF
    pdf = TravelGuidePDF()
    
    # Add cover page
    cover_image = "front_page.png"
    pdf.add_cover(cover_image)
    
    # Initialize TOC entries
    toc_entries = []
    
    # Process each document
    for doc in document_order:
        toc_entries = pdf.add_markdown_file(doc, toc_entries)
    
    # Insert TOC after cover page
    current_page = pdf.page_no()
    pdf.pages[1] = pdf.pages[current_page]
    pdf.pages[current_page] = None
    
    # Create new TOC page
    toc_pdf = TravelGuidePDF()
    toc_pdf.add_toc(toc_entries)
    pdf.pages[2] = toc_pdf.pages[1]
    
    # Output PDF
    output_file = "Guide_Voyage_Houston_2025.pdf"
    pdf.output(output_file)
    print(f"PDF generated: {output_file}")

if __name__ == "__main__":
    main()
