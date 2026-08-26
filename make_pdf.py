import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Preformatted
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def generate_pdf():
    pdf_filename = "Photogrammetry_Guide.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle('Title', parent=styles['Heading1'], fontSize=16, leading=20, textColor=colors.HexColor('#1A365D'), spaceAfter=10)
    h1_style = ParagraphStyle('H1', parent=styles['Heading2'], fontSize=11, leading=14, textColor=colors.HexColor('#2B6CB0'), spaceBefore=10, spaceAfter=4)
    body_style = ParagraphStyle('Body', parent=styles['BodyText'], fontSize=8.5, leading=11.5, textColor=colors.HexColor('#2D3748'), spaceAfter=4)
    code_style = ParagraphStyle('Code', parent=styles['Code'], fontSize=7.5, leading=9.5, backColor=colors.HexColor('#F7FAFC'), borderPadding=4, spaceAfter=6)

    story = [
        Paragraph("Photogrammetry: Fundamentals, Workflows, and Advanced Processing", title_style),
        
        Paragraph("1. Foundations of Photogrammetry", h1_style),
        Paragraph("Photogrammetry is the science and technology of obtaining reliable physical measurements and 3D surface reconstructions from overlapping 2D photographs. By analyzing geometric properties and perspective displacement across multiple viewpoints, spatial coordinates (X,Y,Z) are calculated.", body_style),
        Paragraph("<b>Aerial Photogrammetry:</b> Airborne platforms (UAVs/manned) capturing near-nadir or oblique angles for terrain, volumetric, and corridor surveys.", body_style),
        Paragraph("<b>Close-Range Photogrammetry:</b> Terrestrial sensors positioned near objects for structural inspection, architectural conservation, and micro-geomorphology.", body_style),
        
        Paragraph("2. Core Geometric & Computer Vision Concepts", h1_style),
        Paragraph("<b>Structure-from-Motion (SfM):</b> Estimates internal/external camera geometry simultaneously using SIFT feature extraction, FLANN/RANSAC feature matching, and non-linear Bundle Adjustment.", body_style),
        Paragraph("<b>Triangulation & Parallax:</b> Intersects visual rays from 2+ camera positions (x<sub>1</sub>=P<sub>1</sub>X, x<sub>2</sub>=P<sub>2</sub>X) to solve 3D points. Greater parallax yields higher depth precision.", body_style),
        
        Paragraph("3. Data Products & Intermediate Deliverables", h1_style),
        Paragraph("• <b>Point Clouds:</b> Sparse (SfM tie points) and Dense (MVS depth mapping).", body_style),
        Paragraph("• <b>3D Meshes & TIN:</b> Surface polygonal models reconstructed via Poisson/Delaunay surface triangulation with texture mapping.", body_style),
        Paragraph("• <b>Orthomosaics:</b> Rectified aerial photos combined into a scale-uniform mosaic dataset.", body_style),
        Paragraph("• <b>DEM/DSM/DTM:</b> Elevation models distinguishing surface canopy/structures (DSM) from bare-earth ground elevation (DTM).", body_style),
        
        Paragraph("4. Georeferencing, Precision & Hardware Alignment", h1_style),
        Paragraph("<b>Ground Control Points (GCPs):</b> Absolute coordinate targets used to eliminate model deformation (bowl effect) and compute horizontal/vertical RMSE checkpoints.", body_style),
        
        Table([
            ["Parameter", "Real-Time Kinematic (RTK)", "Post-Processed Kinematic (PPK)"],
            ["Correction Link", "Real-time radio / NTRIP stream", "Post-flight logged RINEX data"],
            ["Dependency", "Requires active live telemetry", "No telemetry link required in flight"],
            ["Precision", "1–3 cm (subject to signal loss)", "1–2 cm (consistent post-processing)"]
        ], colWidths=[100, 220, 220], style=[
            ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#EDF2F7')),
            ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E2E8F0')),
            ('FONTSIZE', (0,0), (-1,-1), 8),
            ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ]),
        
        Paragraph("5. Agisoft Metashape Workflow", h1_style),
        Paragraph("1. Align Photos (SfM) ➔ 2. Optimize Alignment with GCPs ➔ 3. Build Dense Cloud (MVS) ➔ 4. Build Mesh ➔ 5. Build DEM & Orthomosaic.", body_style),
        
        Paragraph("6. Advanced Domains", h1_style),
        Paragraph("Includes LiDAR integration for dense canopy penetration, Multispectral/Thermal 3D index maps, and Neural Radiance Fields (NeRFs) / 3D Gaussian Splatting.", body_style)
    ]

    doc.build(story)
    print(f"Done! PDF saved locally as '{pdf_filename}'")

if __name__ == "__main__":
    generate_pdf()