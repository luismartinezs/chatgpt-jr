const express = require('express');
const path = require('path');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();

let messages = []

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/chat', async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
    });
    const chatbotResponse = completion.data?.choices[0]?.text
    messages.push({
      type: 'user',
      text: prompt
    });
    messages.push({
      type: 'chatbot',
      text: chatbotResponse
    });

    res.render('index', { messages });

  } catch (error) {
    console.log(error);
    res.status(500).send('Error getting response from OpenAI API');
  }
});


app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
