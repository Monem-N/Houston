#!/usr/bin/env python3
"""
Script simplifié pour générer un PDF du guide de voyage Houston
Utilise reportlab pour une meilleure gestion des styles et des images
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
import markdown
from bs4 import BeautifulSoup
import re

def convert_md_to_html(md_file):
    """Convert markdown file to HTML"""
    if not os.path.exists(md_file):
        print(f"Warning: File {md_file} not found. Skipping.")
        return None, None
        
    # Get file title
    file_title = os.path.basename(md_file).replace('.md', '')
    
    # Read markdown content
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
        
    # Convert markdown to HTML
    html = markdown.markdown(md_content)
    
    return file_title, html

def process_html_content(html_content, styles):
    """Process HTML content and convert to reportlab elements"""
    elements = []
    soup = BeautifulSoup(html_content, 'html.parser')
    
    # Process headings and paragraphs
    for element in soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'ul', 'ol']):
        if element.name.startswith('h'):
            level = int(element.name[1])
            if level == 1:
                elements.append(Spacer(1, 0.2*inch))
                elements.append(Paragraph(element.text, styles['Heading1']))
                elements.append(Spacer(1, 0.1*inch))
            elif level == 2:
                elements.append(Spacer(1, 0.15*inch))
                elements.append(Paragraph(element.text, styles['Heading2']))
                elements.append(Spacer(1, 0.1*inch))
            else:
                elements.append(Spacer(1, 0.1*inch))
                elements.append(Paragraph(element.text, styles['Heading3']))
                elements.append(Spacer(1, 0.05*inch))
        elif element.name == 'p':
            elements.append(Paragraph(element.text, styles['Normal']))
            elements.append(Spacer(1, 0.05*inch))
        elif element.name in ['ul', 'ol']:
            for li in element.find_all('li'):
                bullet_text = f"• {li.text}"
                elements.append(Paragraph(bullet_text, styles['Bullet']))
            elements.append(Spacer(1, 0.05*inch))
    
    return elements

def create_custom_styles():
    """Create custom styles for the document"""
    styles = getSampleStyleSheet()
    
    # Custom heading styles
    styles.add(ParagraphStyle(
        name='Heading1',
        parent=styles['Heading1'],
        fontSize=18,
        textColor=colors.darkblue,
        spaceAfter=12
    ))
    
    styles.add(ParagraphStyle(
        name='Heading2',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.darkblue,
        spaceAfter=10
    ))
    
    styles.add(ParagraphStyle(
        name='Heading3',
        parent=styles['Heading3'],
        fontSize=14,
        textColor=colors.darkblue,
        spaceAfter=8
    ))
    
    # Custom paragraph style
    styles.add(ParagraphStyle(
        name='Normal',
        parent=styles['Normal'],
        fontSize=11,
        leading=14,
        spaceAfter=6
    ))
    
    # Custom bullet style
    styles.add(ParagraphStyle(
        name='Bullet',
        parent=styles['Normal'],
        fontSize=11,
        leading=14,
        leftIndent=20,
        spaceAfter=3
    ))
    
    return styles

def create_toc(doc_titles, styles):
    """Create table of contents"""
    elements = []
    
    elements.append(Paragraph("TABLE DES MATIÈRES", styles['Heading1']))
    elements.append(Spacer(1, 0.2*inch))
    
    for i, title in enumerate(doc_titles):
        elements.append(Paragraph(f"{i+1}. {title}", styles['Normal']))
        elements.append(Spacer(1, 0.05*inch))
    
    elements.append(PageBreak())
    return elements

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
    
    # Create PDF document
    output_file = "Guide_Voyage_Houston_2025_Simple.pdf"
    doc = SimpleDocTemplate(output_file, pagesize=A4, 
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=72)
    
    # Create styles
    styles = create_custom_styles()
    
    # Initialize elements list and document titles
    elements = []
    doc_titles = []
    
    # Add cover page
    cover_image = "front_page.png"
    if os.path.exists(cover_image):
        img = Image(cover_image, width=7*inch, height=9*inch)
        elements.append(img)
    else:
        elements.append(Paragraph("GUIDE DE VOYAGE", styles['Heading1']))
        elements.append(Paragraph("HOUSTON", styles['Heading1']))
        elements.append(Paragraph("FIRST CHAMPIONSHIP 2025", styles['Heading1']))
    
    elements.append(PageBreak())
    
    # Process each document and collect titles
    for doc_file in document_order:
        title, html = convert_md_to_html(doc_file)
        if title and html:
            doc_titles.append(title)
    
    # Add table of contents
    elements.extend(create_toc(doc_titles, styles))
    
    # Process each document
    for doc_file in document_order:
        title, html = convert_md_to_html(doc_file)
        if title and html:
            # Add document title
            elements.append(Paragraph(title, styles['Heading1']))
            elements.append(Spacer(1, 0.1*inch))
            
            # Process content
            doc_elements = process_html_content(html, styles)
            elements.extend(doc_elements)
            
            # Add page break after each document
            elements.append(PageBreak())
    
    # Build PDF
    doc.build(elements)
    print(f"PDF generated: {output_file}")

if __name__ == "__main__":
    main()
