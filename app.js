import dotenv from 'dotenv';
dotenv.config({path : 'config.env'});
import fetchImage from './utils/imagesData/fetchImage.js';
import generateName from './utils/generateName.js';
import putTextOnPhoto from './utils/putTextOnPhoto.js';
import putHindiTextOnPhoto from './utils/putHindiTextOnPhoto.js';
import OpenAi from './utils/openAi.js';
import currentDate from './utils/createDate.js';
import ShivaImageUrl from './utils/imagesData/shivaImagesData.js';
import MotivationImageUrl from './utils/imagesData/motivationImagesData.js';


















const quotes = [
    { quote: "जो बुद्धिमानी से जिए हैं उन्हें मृत्यु का भी भय नहीं होना चाहिए." },
    { quote: "पहुँचने से अधिक ज़रूरी ठीक से यात्रा करना है. " },
    { quote: "हजारों खोखले शब्दों से अच्छा वह एक शब्द है जो शांति लाये." },
];




function handleData(error, data, query, height, width) {
    if (error) {
      console.error('Error:', data);
      return;
    } else {     
      
      const len = Math.min(10, data.hits.length);
      // console.log(len);
      if(len < 10){
        console.log("Please Change Query - There are only " + len + " photos");
        return;
      }
      const time = currentDate();

        for(let i = 0; i < len; i++){
          const text = quotes[i].quote;
          const photoPath = data.hits[i].largeImageURL;
          const fileName = generateName();
          const outputPath = (`E:/Instagram/Lord Shiva/${time}/${fileName}.jpg`);

          putTextOnPhoto(photoPath, text, outputPath, height, width);
        }
    }
}

function useManualUrl(height, width, urls, folderName, lang){
  const time = currentDate();

  for(let i = 0; i < 3; i++){
    const text = quotes[i].quote;
    // console.log(text);
    const photoPath = urls[i];
    // console.log(photoPath);
    const fileName = generateName();
    const outputPath = (`E:/Instagram/${folderName}/${time}/${fileName}.jpg`);

    if(lang == 'english'){
      putTextOnPhoto(photoPath, text, outputPath, height, width);
    }else{
      putHindiTextOnPhoto(photoPath, text, outputPath, height, width);
    }
  }
}

(() => {
    try {
        const height = 1000;
        const width = 800;
        const lang = "hindi";

        useManualUrl(height, width, ShivaImageUrl.urls18, "Lord Shiva", "hindi"); // shiva 
        // useManualUrl(height, width, MotivationImageUrl.urls1, "Motivation", "hindi"); // motivation 

        // todo: api key is expired - and function is not completed of fetching quote. please create it 
        // OpenAi.fetchQuotes();
    } catch (error) {
        console.log("app.js", error);
    }

})();

