import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    try {
      // Create a unique identifier for each post (you can use a library like `uuid` for this)
      const postId = generateUniqueId(); // Implement `generateUniqueId` according to your needs

      // Define the path where the JSON file will be stored
      const filePath = path.join(process.cwd(), 'src/content/posts', `${postId}.json`);

      // Create the JSON file with post data
      await fs.writeFile(filePath, JSON.stringify({ title, content }));

      res.status(200).json({ success: true, postId });
    } catch (error) {
      console.error('Error saving post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
