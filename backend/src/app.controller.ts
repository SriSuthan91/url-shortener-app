import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { UrlsService } from './urls/urls.service';


@Controller()
export class AppController {
  constructor(private readonly urlsService : UrlsService) {}

  @Get(':code')
  async redirect(
    @Res() res,
    @Param('code')
    code: string,
  ) {
    const url = await this.urlsService.redirect(code);
    return res.redirect(url.original_url);
  }
}
