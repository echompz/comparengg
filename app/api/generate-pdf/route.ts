
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument, rgb } from 'pdf-lib';
import path from 'path';
import { promises as fsPromises } from 'fs';
import JSZip from 'jszip';
import { Subject } from 'app/gwacalculator/subjects'; // Adjust path as needed

// Define the display style type
type DisplayStyle = "stacked" | "inline";

export async function POST(request: NextRequest) {
  try {
    console.log("API route called");
    
    // Get the form data from the request
    const formData = await request.formData();
    
    const signatureFile = formData.get('signature') as File;
    const idPhotoFile = formData.get('idPhoto') as File;
    const name = formData.get('name') as string;
    const studentNumber = formData.get('studentNumber') as string;
    const studentYear = formData.get('studentYear') as string;
    //const semester = formData.get('semester') as string;
    //const academicYear = formData.get('academicYear') as string;
    const subjectsJson = formData.get('subjects') as string;
    // Get the display style selection
    const displayStyle = formData.get('displayStyle') as DisplayStyle || 'stacked';
    
    if (!signatureFile || !idPhotoFile || !name || !studentNumber || !studentYear || !subjectsJson) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse subjects
    const subjects: Subject[] = JSON.parse(subjectsJson);
    
    if (subjects.length === 0) {
      return NextResponse.json(
        { error: 'No subjects selected' },
        { status: 400 }
      );
    }

    // Convert files to ArrayBuffer
    const signatureBuffer = await signatureFile.arrayBuffer();
    const idPhotoBuffer = await idPhotoFile.arrayBuffer();
    
    // Find the template file
    const templatePath = path.join(process.cwd(), 'public', 'template.pdf');
    console.log("Template path:", templatePath);
    
    try {
      await fsPromises.access(templatePath);
      console.log("Template file exists");
    } catch (err) {
      console.error("Template file doesn't exist:", err);
      return NextResponse.json(
        { error: 'PDF template not found' },
        { status: 500 }
      );
    }
    
    const pdfBytes = await fsPromises.readFile(templatePath);
    
    // Create array to store generated PDFs
    const generatedPdfs: { filename: string, buffer: Buffer }[] = [];
    
    // Process each subject
    for (const subject of subjects) {
      try {
        // Load a fresh copy of the template for each subject
        const pdfDoc = await PDFDocument.load(new Uint8Array(pdfBytes));
        
        // Get the first page
        const pages = pdfDoc.getPages();
        if (pages.length === 0) {
          console.error('PDF has no pages for subject:', subject.code);
          continue;
        }
        
        const page = pages[0];
        const { height } = page.getSize();
        
        // Add date of generation
        const currentDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        // Embed images FIRST - before adding text
        let signatureImage, idPhotoImage;
        
        try {
          signatureImage = await pdfDoc.embedPng(new Uint8Array(signatureBuffer));
        } catch (signatureError) {
          console.error('Error embedding signature as PNG, trying JPG:', signatureError);
          try {
            signatureImage = await pdfDoc.embedJpg(new Uint8Array(signatureBuffer));
          } catch (fallbackError) {
            console.error('Error embedding signature as JPG:', fallbackError);
            continue;
          }
        }
        
        try {
          idPhotoImage = await pdfDoc.embedJpg(new Uint8Array(idPhotoBuffer));
        } catch (idPhotoError) {
          console.error('Error embedding ID photo as JPG, trying PNG:', idPhotoError);
          try {
            idPhotoImage = await pdfDoc.embedPng(new Uint8Array(idPhotoBuffer));
          } catch (fallbackError) {
            console.error('Error embedding ID photo as PNG:', fallbackError);
            continue;
          }
        }
        
        // Get image dimensions
        const signatureDims = signatureImage.size();
        const idPhotoDims = idPhotoImage.size();
        
        // Calculate scaling factors for signature
        const maxSignatureWidth = 100;
        const maxSignatureHeight = 50;
        const signatureScaleFactor = Math.min(
          maxSignatureWidth / signatureDims.width,
          maxSignatureHeight / signatureDims.height
        );
        
        const scaledSignatureWidth = signatureDims.width * signatureScaleFactor;
        const scaledSignatureHeight = signatureDims.height * signatureScaleFactor;
        
        // Calculate scaling factors for ID photo
        const maxIdPhotoWidth = 150;
        const maxIdPhotoHeight = 150;
        const idPhotoScaleFactor = Math.min(
          maxIdPhotoWidth / idPhotoDims.width,
          maxIdPhotoHeight / idPhotoDims.height
        );
        
        const scaledIdPhotoWidth = idPhotoDims.width * idPhotoScaleFactor;
        const scaledIdPhotoHeight = idPhotoDims.height * idPhotoScaleFactor;
        
        // Position images
        const bottomPadding = 10;
        
        // Draw images FIRST to ensure they appear behind the text
        
        // Draw signature in position where name will be drawn over it
        page.drawImage(signatureImage, {
          x: 400,  // Position where name will be drawn
          y: height - 650, // Adjusted position to be behind the name
          width: scaledSignatureWidth,
          height: scaledSignatureHeight,
        });
        
        page.drawImage(signatureImage, {
          x: 20,
          y: bottomPadding + 50,
          width: scaledSignatureWidth,
          height: scaledSignatureHeight,
        });

        // Draw ID photo
        page.drawImage(idPhotoImage, {
          x: 20 + scaledSignatureWidth + 30,
          y: bottomPadding,
          width: scaledIdPhotoWidth,
          height: scaledIdPhotoHeight,
        });
        
        // AFTER drawing images, add text elements so they appear on top
        
        // Handle the subject information display based on the selected style
        if (displayStyle === 'stacked') {
          // Option 1: Stacked Format
          page.drawText(`${subject.code}`, {
            x: 250,
            y: height - 80,
            size: 8,
            color: rgb(0, 0, 0),
          });

          page.drawText(`${subject.name}`, {
            x: 250,
            y: height - 90,
            size: 8,
            color: rgb(0, 0, 0),
          });

          page.drawText(`FEU Tech`, {
            x: 250,
            y: height - 100,
            size: 8,
            color: rgb(0, 0, 0),
          });
        } else {
          // Option 2: Inline Format
          page.drawText(`${subject.code} / FEU Tech`, {
            x: 250,
            y: height - 95,
            size: 12,
            color: rgb(0, 0, 0),
          });
        }

        page.drawText(`${name}`, {
          x: 380,
          y: height - 655,
          size: 12,
          color: rgb(0, 0, 0),
        });
        
        page.drawText(`${studentYear} - BSCpE`, {
          x: 380,
          y: height - 670,
          size: 12,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${studentNumber}`, {
          x: 380,
          y: height - 682,
          size: 12,
          color: rgb(0, 0, 0),
        });

        page.drawText(`${currentDate}`, {
          x: 380,
          y: height - 695,
          size: 12,
          color: rgb(0, 0, 0),
        });
        
        // Save the PDF for this subject
        const modifiedPdfBytes = await pdfDoc.save();
        
        // Save PDF information
        const sanitizedSubjectName = subject.name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '_');
        const filename = `${subject.code}_${sanitizedSubjectName}.pdf`;
        generatedPdfs.push({
          filename,
          buffer: Buffer.from(modifiedPdfBytes)
        });
        
      } catch (subjectError) {
        console.error(`Error processing subject ${subject.code}:`, subjectError);
        // Continue to the next subject
      }
    }

    // If only one subject was selected, return the PDF directly
    if (subjects.length === 1 && generatedPdfs.length === 1) {
      const singlePdf = generatedPdfs[0];
      return new NextResponse(singlePdf.buffer, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename=${singlePdf.filename}`
        }
      });
    }
    
    // Otherwise create a zip file with all PDFs
    const zip = new JSZip();
    
    // Add all generated PDFs to the zip
    for (const pdf of generatedPdfs) {
      zip.file(pdf.filename, new Uint8Array(pdf.buffer));
    }
    
    // Generate the zip file
    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: {
        level: 9
      }
    });
    
    // Return the zip file
    return new NextResponse(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=completed-forms.zip'
      }
    });
    
  } catch (error) {
    console.error('Top level error:', error);
    return NextResponse.json(
      { error: `Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}