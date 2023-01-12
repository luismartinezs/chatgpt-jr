const express = require('express');
const openai = require('openai');
require('dotenv').config();

openai.apiKey = process.env.API_KEY;

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/chat', (req, res) => {
    const prompt = req.body.prompt;
    openai.completions.create({
        prompt: prompt,
        model: "text-davinci-002",
        max_tokens: 2048,
        temperature: 0.5
    }, (error, response) => {
        if (error) {
            console.log(error);
        } else {
            const chatbotResponse = response.choices[0].text;
            res.render('index', { prompt: prompt, response: chatbotResponse });
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
