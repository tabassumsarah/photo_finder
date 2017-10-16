import {
  FlickrApiSearchService,
} from './flickr-api-search.service';

export const flickrApiSearchInjectables: Array<any> = [
  {provide: FlickrApiSearchService, useClass: FlickrApiSearchService}
];
