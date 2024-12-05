import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import OAuth2Client from 'google-auth-library';

const oAuth2Client = new OAuth2Client(
    process.env.VITE_CLIENT_ID,
    process.env.VITE_CLIENT_SECRET,
    'postmessage',
  );

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.post('/auth/google', async (req, res) => {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    console.log(tokens);
    
    res.json(tokens);
  });
  
  app.post('/auth/google/refresh-token', async (req, res) => {
    const user = new UserRefreshClient(
      clientId,
      clientSecret,
      req.body.refreshToken,
    );
    const { credentials } = await user.refreshAccessToken(); // optain new tokens
    res.json(credentials);
  })


  app.listen(3000, () => console.log(`server is running`))