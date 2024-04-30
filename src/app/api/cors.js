import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  // Allow requests from any origin
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

export default async function handler(req, res) {
  // Run the middleware
  await new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  // Rest of your API logic here
  res.json({ message: 'Hello from CORS-enabled API route!' });
}

