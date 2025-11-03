#!/usr/bin/env node

/**
 * Generates image list by scanning the images/ directory and injects it into index.html
 * Run this script after adding images to automatically update the image list
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = 'images';
const HTML_FILE = 'index.html';
const PLACEHOLDER = '/*IMAGES_PLACEHOLDER*/';
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];

function isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return IMAGE_EXTENSIONS.includes(ext);
}

function generateImagesList() {
    const imagesPath = path.join(process.cwd(), IMAGES_DIR);
    const htmlPath = path.join(process.cwd(), HTML_FILE);
    
    if (!fs.existsSync(imagesPath)) {
        console.error(`Error: ${IMAGES_DIR} directory does not exist`);
        process.exit(1);
    }

    if (!fs.existsSync(htmlPath)) {
        console.error(`Error: ${HTML_FILE} does not exist`);
        process.exit(1);
    }

    // Scan images directory
    const files = fs.readdirSync(imagesPath);
    const imageFiles = files
        .filter(file => {
            const filePath = path.join(imagesPath, file);
            return fs.statSync(filePath).isFile() && isImageFile(file);
        })
        .sort(); // Sort alphabetically for consistent ordering

    if (imageFiles.length === 0) {
        console.warn(`Warning: No image files found in ${IMAGES_DIR}/ directory`);
        console.warn(`Supported formats: ${IMAGE_EXTENSIONS.join(', ')}`);
    } else {
        console.log(`Found ${imageFiles.length} image(s):`);
        imageFiles.forEach(file => console.log(`  - ${file}`));
    }

    // Read HTML file
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    // Generate JavaScript array string
    const imageArrayString = imageFiles
        .map(file => `            '${file.replace(/'/g, "\\'")}'`)
        .join(',\n');

    // Replace placeholder or existing array content
    const replacement = imageArrayString || '';
    let updated = false;
    
    if (htmlContent.includes(PLACEHOLDER)) {
        // Replace placeholder
        htmlContent = htmlContent.replace(PLACEHOLDER, replacement);
        updated = true;
    } else {
        // Try to find and replace existing array content
        // Match: const imageFiles = [ ... existing content ... ];
        // This regex handles multiline arrays with the 's' flag (dotall)
        const arrayRegex = /(const\s+imageFiles\s*=\s*\[)[\s\S]*?(\];)/;
        const match = htmlContent.match(arrayRegex);
        
        if (match) {
            // Replace the entire array declaration, preserving proper indentation
            htmlContent = htmlContent.replace(
                arrayRegex,
                `$1\n${replacement}\n        $2`
            );
            updated = true;
        }
    }
    
    if (updated) {
        fs.writeFileSync(htmlPath, htmlContent, 'utf8');
        console.log(`\n✓ Updated ${HTML_FILE} with image list`);
    } else {
        console.error(`Error: Could not find placeholder ${PLACEHOLDER} or imageFiles array in ${HTML_FILE}`);
        console.error('Make sure index.html contains: const imageFiles = [/*IMAGES_PLACEHOLDER*/];');
        process.exit(1);
    }
}

generateImagesList();
