#!/usr/bin/env python3
"""
Simple script to generate a PDF from Markdown files
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch

def main():
    # Define the order of documents
    document_order = [
        "Introduction et Sommaire.md",
        "Journée 14 avril 2025 Guide Départ – Arrivée à Houston.md",
        "Journées 16 avr 2025- 19 avr 2025.md",
        "Journée 20 avril 2025_Space Center Houston.md",
        "Journée 21 avr 2025 Aventure Shopping à Houston.md",
        "Journée 22 avril 2025 scientifique à Houston_.md",
        "Journée 23 avril 2025 Itinéraire familial à Houston_.md",
        "Transport Local pour le FIRST Championship 2025.md",
        "Guide Gastronomique et Shopping - Houston Authentique.md",
        "Guide Local Houston _ Manger, Acheter_.md",
        "Annexe - Downtown Houston à Explorer.md",
        "Guide Pratique Touristanbul.md",
        "Touristanbul.md",
        "Guide Activités Enfants - Houston pour les 10 ans.md",
        "Annexes - Cartes et Liens Utiles.md"
    ]

    # Create PDF document
    output_file = "Guide_Voyage_Houston_2025_Simple.pdf"
    doc = SimpleDocTemplate(output_file, pagesize=A4,
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=72)

    # Get styles
    styles = getSampleStyleSheet()

    # Initialize elements list
    elements = []

    # Add cover page
    cover_image = "front_page.png"
    if os.path.exists(cover_image):
        img = Image(cover_image, width=7*inch, height=9*inch)
        elements.append(img)
    else:
        elements.append(Paragraph("GUIDE DE VOYAGE", styles['Title']))
        elements.append(Paragraph("HOUSTON", styles['Title']))
        elements.append(Paragraph("FIRST CHAMPIONSHIP 2025", styles['Title']))

    elements.append(PageBreak())

    # Add table of contents
    elements.append(Paragraph("TABLE DES MATIÈRES", styles['Title']))
    elements.append(Spacer(1, 0.2*inch))

    for i, doc_file in enumerate(document_order):
        title = os.path.basename(doc_file).replace('.md', '')
        elements.append(Paragraph(f"{i+1}. {title}", styles['Normal']))
        elements.append(Spacer(1, 0.05*inch))

    elements.append(PageBreak())

    # Process each document
    for doc_file in document_order:
        if not os.path.exists(doc_file):
            print(f"Warning: File {doc_file} not found. Skipping.")
            continue

        # Get file title
        title = os.path.basename(doc_file).replace('.md', '')

        # Add document title
        elements.append(Paragraph(title, styles['Title']))
        elements.append(Spacer(1, 0.1*inch))

        # Read markdown content
        with open(doc_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Very simple markdown to text conversion
        # Split by lines and process
        lines = content.split('\n')
        current_paragraph = ""

        for line in lines:
            # Skip image lines
            if line.startswith('!['):
                continue

            # Headers
            if line.startswith('# '):
                if current_paragraph:
                    elements.append(Paragraph(current_paragraph, styles['Normal']))
                    current_paragraph = ""
                elements.append(Paragraph(line[2:], styles['Heading1']))
            elif line.startswith('## '):
                if current_paragraph:
                    elements.append(Paragraph(current_paragraph, styles['Normal']))
                    current_paragraph = ""
                elements.append(Paragraph(line[3:], styles['Heading2']))
            elif line.startswith('### '):
                if current_paragraph:
                    elements.append(Paragraph(current_paragraph, styles['Normal']))
                    current_paragraph = ""
                elements.append(Paragraph(line[4:], styles['Heading3']))
            # List items
            elif line.startswith('- '):
                if current_paragraph:
                    elements.append(Paragraph(current_paragraph, styles['Normal']))
                    current_paragraph = ""
                elements.append(Paragraph("• " + line[2:], styles['Normal']))
            # Empty line means paragraph break
            elif line.strip() == '':
                if current_paragraph:
                    elements.append(Paragraph(current_paragraph, styles['Normal']))
                    current_paragraph = ""
            # Regular text - append to current paragraph
            else:
                if current_paragraph:
                    current_paragraph += " " + line
                else:
                    current_paragraph = line

        # Add the last paragraph if any
        if current_paragraph:
            elements.append(Paragraph(current_paragraph, styles['Normal']))

        # Add page break after each document
        elements.append(PageBreak())

    # Build PDF
    doc.build(elements)
    print(f"PDF generated: {output_file}")

if __name__ == "__main__":
    main()
