import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content } = req.body;
    try {
      // Panggil API Luminai
      const luminaiResponse = await axios.get(
        `https://api.siputzx.my.id/api/ai/luminai?content=${encodeURIComponent(content)}`
      );
      // Panggil API ChatGPT3
      const chatgptResponse = await axios.get(
        `https://api.siputzx.my.id/api/ai/gpt3?prompt=kamu%20adalah%20ai%20yang%20ceria&content=${encodeURIComponent(content)}`
      );
      
      res.status(200).json({
        luminai: luminaiResponse.data,
        chatgpt3: chatgptResponse.data,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing request' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
