const Npk = require('../Models/Npk');

exports.saveNpkValues = async (req, res) => {
  const { nitrogen, phosphorus, potassium, prompt } = req.body;

  if (nitrogen == null || phosphorus == null || potassium == null) {
    return res.status(400).json({ message: 'All NPK values are required' });
  }

  if (typeof nitrogen !== 'number' || typeof phosphorus !== 'number' || typeof potassium !== 'number') {
    return res.status(422).json({ message: 'NPK values must be numbers' });
  }

  try {
    const npk = new Npk({ nitrogen, phosphorus, potassium, prompt });
    await npk.save();
    return res.status(201).json({ message: 'NPK values saved successfully', data: npk });

  } catch (error) {
    console.error('Error saving NPK values:', error);
    return res.status(500).json({ message: 'Error processing request', error: error.message });
  }
};

exports.getNpkValues = async (req, res) => {
  try {
    const npk = await Npk.findOne().sort({ _id: -1 }); 
    if (!npk) {
        return res.status(404).json({ message: 'No NPK values found' });
    }
    return res.status(200).json(npk);
} catch (error) {
    console.error('Error retrieving NPK values:', error);
    return res.status(500).json({ message: 'Error retrieving NPK values', error: error.message });
}
}