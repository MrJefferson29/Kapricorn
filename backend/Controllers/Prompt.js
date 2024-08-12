const Npk = require("../Models/Npk");
const asyncErrorWrapper = require("express-async-handler");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error(
    "API key is not defined. Please set it in your environment variables."
  );
  process.exit(1); 
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const Prompt = asyncErrorWrapper(async (req, res, next) => {
  const { id } = req.params;

  try {
    const npk = await Npk.findById(id);

    if (!npk) {
      return res.status(404).json({ message: "NPK data not found" });
    }

    const prompt = `Provide a list of crop names that will do well with the NPK values of ${npk.nitrogen}:${npk.phosphorus}:${npk.potassium}, as well as it's numeric percentage chance of success, without any additional information.`;

    try {
      const result = await model.generateContent(prompt);

      if (
        !result ||
        !result.response ||
        !result.response.candidates ||
        !result.response.candidates[0].content.parts[0].text
      ) {
        console.error(
          "Unexpected response format:",
          JSON.stringify(result, null, 2)
        );
        return res
          .status(502)
          .json({ message: "Invalid response from AI model", details: result });
      }

      const responseText = result.response.candidates[0].content.parts[0].text;
      console.log("Extracted response text:", responseText);

      const crops = responseText
        .split("\n")
        .map((crop) => crop.trim())
        .filter((crop) => crop);
      console.log("Parsed crop names:", crops);

      npk.response = {
        crops: crops.join(", "), 
        aiResponse: responseText, 
      };

      console.log("Document before saving:", npk);

      const updatedNpk = await npk.save();
      console.log("Document saved successfully:", updatedNpk);

      res.json({ crops: crops.join(", "), aiResponse: responseText });
    } catch (error) {
      if (
        error.message.includes(
          "Gemini API free tier is not available in your country"
        )
      ) {
        return res
          .status(403)
          .json({
            message:
              "Gemini API free tier is not available in your country. Please enable billing on your project in Google AI Studio.",
          });
      } else {
        console.error("Error generating content:", error);
        return res
          .status(500)
          .json({
            message: "Error generating content",
            details: error.message,
          });
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ message: "Error processing request", details: error.message });
  }
});

module.exports = Prompt;
