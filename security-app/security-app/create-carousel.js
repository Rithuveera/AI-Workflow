const { PDFDocument, PageSizes } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createCarouselPdf() {
    // 1. Create a new PDF Document
    const pdfDoc = await PDFDocument.create();

    // 2. Define directory and get images
    const assetsDir = path.join(__dirname, 'linkedin-assets');
    const outputDir = __dirname;
    const outputFilename = 'SecValid_AI_Architecture_Carousel.pdf';

    try {
        const files = fs.readdirSync(assetsDir);

        // Explicitly define the order of slides based on their filenames
        const slideOrder = [
            "SecValid AI Architecture Deep Dive.png",
            "Parallel Processing for Maximum Speed.png",
            "Best of Both Worlds.png",
            "Never Fails. If Gemini 2.0 is busy, 1.5 steps in automatically.png",
            "The Result.png"
        ];

        // Check if all files exist
        const missingFiles = slideOrder.filter(file => !files.includes(file));
        if (missingFiles.length > 0) {
            console.error('Missing files in linkedin-assets:', missingFiles);
            console.log('Available files:', files);
            // Fallback: use whatever is there if exact match fails? No, strict is better.
            return;
        }

        console.log('Processing slides in order:', slideOrder);

        // 3. Embed and add each image
        for (const file of slideOrder) {
            const filePath = path.join(assetsDir, file);
            console.log(`Embedding: ${file}`);
            const imageBytes = fs.readFileSync(filePath);

            let image;
            try {
                image = await pdfDoc.embedPng(imageBytes);
            } catch (pngError) {
                console.warn(`Failed to embed ${file} as PNG, trying JPEG...`);
                try {
                    image = await pdfDoc.embedJpg(imageBytes);
                } catch (jpgError) {
                    console.error(`Failed to embed ${file} as PNG or JPEG. Skipping.`);
                    continue;
                }
            }

            const { width, height } = image.scale(1);

            // Create page matching image dimensions
            const page = pdfDoc.addPage([width, height]);

            page.drawImage(image, {
                x: 0,
                y: 0,
                width: width,
                height: height,
            });
        }

        // 4. Save the PDF
        const pdfBytes = await pdfDoc.save();
        fs.writeFileSync(path.join(outputDir, outputFilename), pdfBytes);

        console.log(`✅ Success! Carousel created at: ${path.join(outputDir, outputFilename)}`);

    } catch (err) {
        console.error('Error creating PDF:', err);
    }
}

createCarouselPdf();
