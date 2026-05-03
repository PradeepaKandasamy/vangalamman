const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const hallDir = path.join(__dirname, 'assets', 'hall');
const kitchenDir = path.join(__dirname, 'assets', 'kitchen');

async function processDirectory(dir, prefix) {
    console.log(`Processing directory: ${dir}`);
    const files = fs.readdirSync(dir).filter(f => !f.startsWith('.'));
    
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.webp'].includes(ext);
    });
    
    imageFiles.sort();
    
    let counter = 1;
    for (const file of imageFiles) {
        const inputPath = path.join(dir, file);
        const numStr = counter.toString().padStart(2, '0');
        const newName = `${prefix}-project-${numStr}.jpg`;
        const outputPath = path.join(dir, newName);
        
        try {
            console.log(`Processing ${file} -> ${newName}`);
            const tempPath = outputPath + '.tmp';
            
            await sharp(inputPath)
                .resize(1200, 800, {
                    fit: sharp.fit.cover,
                    position: sharp.strategy.entropy
                })
                .jpeg({ quality: 85 })
                .toFile(tempPath);
                
            if (file !== newName) {
                fs.unlinkSync(inputPath);
            } else {
                // Wait, if it's the exact same name, we can still unlink the old one
                fs.unlinkSync(inputPath);
            }
            
            fs.renameSync(tempPath, outputPath);
            counter++;
        } catch (e) {
            console.error(`Failed to process ${file}`, e);
        }
    }
}

async function main() {
    if (fs.existsSync(hallDir)) await processDirectory(hallDir, 'hall');
    if (fs.existsSync(kitchenDir)) await processDirectory(kitchenDir, 'kitchen');
    console.log('Optimization complete.');
}

main().catch(console.error);
