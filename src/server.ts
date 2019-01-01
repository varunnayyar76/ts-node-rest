import * as dotenv from "dotenv";
import app from './app';

//import * as fs from 'fs';
//import * as https from 'https';

import * as http from 'http';

dotenv.config();

const PORT = process.env.PORT;

// const httpsOptions = {
// 	key: fs.readFileSync('./config/key.pem'),
// 	cert: fs.readFileSync('./config/cert.pem')
// }

http.createServer(app).listen(PORT, () => {
	console.log('Express server listening on port ' + PORT);
})