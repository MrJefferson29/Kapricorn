const express = require('express');
const router = express.Router();

const { saveNpkValues, getNpkValues } = require('../Controllers/Npk');
const { createRequest, createPrompt2 } = require("../Controllers/Prompt2");
const Prompt = require('../Controllers/Prompt');

// Route to save NPK values
router.post('/npk', saveNpkValues);

//Route to get NPK
router.get('/getNPK', getNpkValues)

// Route to process prompt and update NPK
router.post('/prompt/:id', Prompt);

// Route to create a new request
router.post("/create-request", createRequest);

// Route to generate and save AI response based on the request and NPK data
router.post("/create-prompt/:id", createPrompt2);

module.exports = router;
