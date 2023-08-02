import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch/dist/elasticsearch.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    ElasticsearchModule.register({
      node: 'http://localhost:9200',
    })
  ],
})
export class ConfigModule {}
