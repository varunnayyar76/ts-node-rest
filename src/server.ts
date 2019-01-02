import * as dotenv from "dotenv";
import app from './app';
import * as http from 'http';

dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer(app).listen(PORT, () => {
	console.log('Express server listening on port ' + PORT);
})

export default server; // for test cases