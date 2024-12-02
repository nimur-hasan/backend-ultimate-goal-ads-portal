import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SecuritySchemeType } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';


async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MSC Backend')
    .setDescription('The backend API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http' as SecuritySchemeType,
      description: 'JWT Token',
      scheme: 'bearer',
      name: 'Authorization',
      bearerFormat: 'JWT',
    })
    .build();

  // app.enableCors({
  //   origin: ['https://msc-frontend.vercel.app', 'http://localhost:3000'],
  //   methods: 'GET, HEAD, PUT, POST, DELETE, OPTIONS, PATCH',
  //   credentials: true,
  //   allowedHeaders:
  //     'Origin, X-Requested-With, Content-Type, Accept, Authentication, Access-control-allow-credentials, Access-control-allow-headers, Access-control-allow-methods, Access-control-allow-origin, User-Agent, Referer, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Cache-Control, Pragma',
  // });

  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    customSiteTitle: 'MSC Backend',
    // customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
    customJs: [
      'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-bundle.js',
      'https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui-standalone-preset.js',
    ],
    customCssUrl: ['https://unpkg.com/swagger-ui-dist@5.11.0/swagger-ui.css'],
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5002);
}
bootstrap();
