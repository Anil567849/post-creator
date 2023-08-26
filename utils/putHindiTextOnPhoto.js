import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';
import { registerFont, createCanvas } from 'canvas';
import textToImage from 'text-to-image';
  

// Register the Hindi font
const fontPath = path.join('C:/Users/HP/Documents/NodeJs/post-creator/font/', 'TiroDevanagariHindi-Regular.ttf');
registerFont(fontPath, { family: 'Tiro Devanagari Hindi' });



function getTextHeight(context, text, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let heightOfText = 0;
  
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      line = words[i] + ' ';
      heightOfText += lineHeight;
    } else {
      line = testLine;
    }
  }
  return heightOfText;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      context.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}


export default async function putHindiTextOnPhoto(inputImage, hindiText, outputPath, height, width) {

  try {
    // Read Image 
    const image = await Jimp.read(inputImage);
    await image.cover(width, height);

  // Create a new canvas
    let canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    const fontSize = 38;
    const fontColor = '#FFFFFF';
    const fontFamily = 'Tiro Devanagari Hindi';
    context.font = `${fontSize}px ${fontFamily}`;
    

    
    // Set the text background color
    const backgroundColor = 'rgba(0, 0, 0, 0.6)'; // Black color with full opacity
    context.fillStyle = backgroundColor;
    const h = getTextHeight(context, hindiText, width - 30, 65);
    context.fillRect(0, 650, canvas.width, h + 70);

    // Set the text properties
    
    context.fillStyle = fontColor;
    context.textAlign = 'center';

    // Calculate the position to place the text in the center of the canvas
    const x = width/2 + 10;
    let y = 700;

    // Write the Hindi text on the canvas    
    wrapText(context, hindiText, x, y, width - 30, 65);

    const buffer = canvas.toBuffer('image/png');
    const textImage = await Jimp.read(buffer);
    image.composite(textImage, 0, 0);

    image.write(outputPath);
    console.log("success");
      
  } catch (error) {
    console.log("failed",  error);
  }
}