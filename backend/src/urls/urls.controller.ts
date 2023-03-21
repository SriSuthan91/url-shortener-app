import { Body, Controller, Post } from '@nestjs/common';
import { CreateUrlDto } from './create-url.dto';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
    constructor(private readonly urlsService : UrlsService){}
    
    @Post('')
    async shortenUrl(@Body() original_url: CreateUrlDto) {
    return await this.urlsService.shortenUrl(original_url);
   }

  
}
