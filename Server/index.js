import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { OAuth2Client } from 'google-auth-library';
import express from 'express';
import cors from 'cors';

dotenv.config();

const CLIENT_ID = process.env.VITE_CLIENT_ID;
const CLIENT_SECRET = process.env.VITE_CLIENT_SECRET;

console.log(CLIENT_ID, CLIENT_SECRET);

const oAuth2Client = new OAuth2Client(
  CLIENT_ID,
  CLIENT_SECRET,
  'postmessage'
);

const app = express();

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/auth/google', async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // Exchange code for tokens
    console.log(tokens);
    res.json(tokens);
  } catch (error) {
    console.error('Error exchanging token:', error);
    res.status(500).json({ error: 'Failed to exchange token' });
  }
});

app.post('/auth/google/refresh-token', async (req, res) => {
  try {
    const user = new OAuth2Client(
      CLIENT_ID,
      CLIENT_SECRET,
      null
    );
    const { credentials } = await user.refreshAccessToken(); // Obtain new tokens
    res.json(credentials);
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});



  app.listen(3000, () => console.log(`server is running on port 3000`))