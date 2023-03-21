import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from 'src/entity/url.entity';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';

@Module({
    imports: [TypeOrmModule.forFeature([Url])],
    controllers:[UrlsController],
    providers:[UrlsService],
    exports: [TypeOrmModule]
})
export class UrlsModule {}