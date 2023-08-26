import Jimp from 'jimp';

async function putTextOnPhoto(photoPath, text, outputPath, height, width) {
    try {
        // Load the photo using Jimp
        const image = await Jimp.read(photoPath);

        await image.cover(width, height);
  
        // Set up the text properties
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);       

        const tp = {
                text,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
        };

        // Set the background color for the text
        const backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Blue color (ARGB format)


        // Measure the dimensions of the text
        const textWidth = Jimp.measureText(font, text);
        const textHeight = Jimp.measureTextHeight(font, text, width);
        
        const textX = 0;
        const textY = height - textHeight - 100;

        // Create a new image with the background color and text
        const textImage = new Jimp(textWidth, textHeight, backgroundColor);
        textImage.print(font, 10, 0, tp, width-textX-10);
        
        image.composite(textImage, textX, textY);
    
        // Save the modified image
        await image.writeAsync(outputPath);
  
        console.log('Text added to the center of the image successfully!');

    } catch (error) {
        console.error('Error:', error);
    }
}

export default putTextOnPhoto;