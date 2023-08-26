import { Configuration, OpenAIApi } from "openai";



const configuration = new Configuration({
apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


class OpenAi {

    async fetchQuotes() {
        

        try {
            const response = await openai.createCompletion({
              engine: 'text-davinci-003',
              prompt: "generate buddha quotes",
              max_tokens: 50, // Adjust as per your desired quote length
              n: 1, // Number of quotes to generate
              temperature: 0.7, // Controls the randomness of the generated quotes
            });
        
            const quote = response.data.choices[0].text.trim();
            console.log('Generated Quote:', quote);
          } catch (error) {
            console.error('Error:', error);
          }

    }
    


}





export default new OpenAi;