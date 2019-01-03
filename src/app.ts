import * as dotenv from "dotenv";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/appRoutes";
import * as mongoose from "mongoose";

dotenv.config();

class App {

	public app: express.Application;
	public appRoute: Routes = new Routes(); 
	public mongoUrl: string = process.env.NODE_ENV === 'TEST' ? process.env.MONGOURL : process.env.TESTMONGOURL;

	
	constructor() {
		console.log(this.mongoUrl);
		this.app = express();
		this.config();
		this.appRoute.routes(this.app);
		this.mongoSetup();
	}

	private config(): void {
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: false }));
		// serving static files 
		this.app.use(express.static('public'));
	}

	private mongoSetup(): void {
		mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
		mongoose.set('useCreateIndex', true);
	}
}

export default new App().app;