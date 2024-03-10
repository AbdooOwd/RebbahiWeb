// api/posts.js
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Read the contents of the `posts` directory
      const postsDir = path.join(process.cwd(), 'src/content/posts');
      const postFiles = await fs.readdir(postsDir);

      // Read the content of each post file
      const posts = await Promise.all(
        postFiles.map(async file => {
          const filePath = path.join(postsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          return JSON.parse(content);
        })
      );

      res.status(200).json({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
