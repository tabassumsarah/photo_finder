import {
  Injectable,
  Inject
} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SearchResult } from './search-result.model';



@Injectable()
export class FlickrApiSearchService {
  key = '0496c54a7ef977fbb49270db390384f4';
  
  constructor(private http: Http) {
    }

    search(query: string): Observable<SearchResult[]> {
      const params: string = [
        `api_key=${this.key}`,
        `tags=${query}`,
        `per_page=5`,
        `format=json`,
        `nojsoncallback=1`
      ].join('&');
      const queryUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&${params}`;
      console.log('url', queryUrl); // uncomment if you want to debug
      return this.http.get(queryUrl)
      .map((response: Response) => {
        return (<any>response.json()).photos.photo.map(item => {
          console.log('raw item', item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id,
            title: item.title,
            thumbnailUrl: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`,
            highResUrl: `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_b.jpg`
          });
        });
      });
    }
  }
