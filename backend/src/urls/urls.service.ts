import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from 'src/entity/url.entity';
import { CreateUrlDto } from './create-url.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
    constructor(
        @InjectRepository(Url)
        private repo: Repository<Url>,
      ) {}
      async shortenUrl(url: CreateUrlDto) {
        const { original_url } = url;

        const urlCode = nanoid(7);
        const baseURL = 'http://localhost:3001';
    
        try {
          //check if the URL has already been shortened
          let url = await this.repo.findOneBy({ original_url });
          //return it if it exists
          if (url) return url.shorten_url;
    
          //if it doesn't exist, shorten it
          const shorten_url = `${baseURL}/${urlCode}`;
    
          //add the new record to the database
          url = this.repo.create({
            urlCode,
            original_url,
            shorten_url,
          });
    
          this.repo.save(url);
          return url.shorten_url;
        } catch (error) {
          console.log(error);
          throw new UnprocessableEntityException('Server Error');
        }
      }

      async redirect(urlCode: string) {
        try {
          const url = await this.repo.findOneBy({ urlCode });
          if (url) return url;
        } catch (error) {
          console.log(error);
          throw new NotFoundException('Resource Not Found');
        }
      }
}
