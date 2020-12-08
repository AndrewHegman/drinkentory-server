import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./Modules/app.module";
import { version } from "./version";
import * as mongoose from "mongoose";

import * as dotenv from "dotenv";

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(version);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  mongoose.set("debug", process.env.MODE === "development");
  await app.listen(3002);
}
bootstrap();
