const asyncErrorWrapper = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const Prompt2 = require('../Models/Prompt2');
const Joi = require('joi');
const winston = require('winston');

dotenv.config({ path: "./.env" });

const apiKey = process.env.API_KEY;

if (!apiKey) {
  winston.error("API key is not defined. Please set it in your environment variables.");
  process.exit(1); 
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const requestSchema = Joi.object({
  request: Joi.string().required()
});

const createRequest = asyncErrorWrapper(async (req, res) => {
  const { error, value } = requestSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Invalid request data", details: error.details });
  }

  try {
    const newRequest = await Prompt2.create(value);
    console.log(newRequest)
    res.status(201).json(newRequest);
  } catch (error) {
    winston.error("Error creating request:", error);
    res.status(500).json({ message: "Error creating request", details: error.message });
  }
});

const createPrompt2 = asyncErrorWrapper(async (req, res) => {
  const { id } = req.params;

  try {
    const prompt2 = await Prompt2.findById(id);
    if (!prompt2) {
      return res.status(404).json({ message: "Prompt2 request not found" });
    }

    const prompt = `Your name is Roger and you are an agricultural AI, designed to help farmers yield more productive output and answer only agriculture-related questions. ${prompt2.request}`;

    try {
      const result = await model.generateContent(prompt);

      if (!result?.response?.candidates?.[0]?.content?.parts?.[0]?.text) {
        winston.error("Unexpected response format:", JSON.stringify(result, null, 2));
        return res.status(502).json({ message: "Invalid response from AI model", details: result });
      }

      const responseText = result.response.candidates[0].content.parts[0].text;
      prompt2.response = responseText;
      const updatedPrompt2 = await prompt2.save();
      console.log(updatedPrompt2)

      res.json({ request: prompt2.request, response: responseText });
    } catch (error) {
      if (error.message.includes("Gemini API free tier is not available in your country")) {
        return res.status(403).json({
          message: "Gemini API free tier is not available in your country. Please enable billing on your project in Google AI Studio.",
        });
      } else {
        winston.error("Error generating content:", error);
        return res.status(500).json({ message: "Error generating content", details: error.message });
      }
    }
  } catch (error) {
    winston.error("Error processing request:", error);
    res.status(500).json({ message: "Error processing request", details: error.message });
  }
});

module.exports = { createRequest, createPrompt2 };
