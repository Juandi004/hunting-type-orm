import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesModule } from './creature/creatures.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Acceder a la URL desde la variable de entorno
      autoLoadEntities: true,
      synchronize: true,
    }),
    CreaturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
