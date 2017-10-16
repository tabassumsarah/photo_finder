import { Component, OnInit } from '@angular/core';
import { SearchResult } from './search-result.model';

@Component({
  selector: 'app-flickr-api-search',
  templateUrl: 'src/flickr-api-search.component.html'
})
export class FlickrApiSearchComponent implements OnInit {
  results: SearchResult[];
  loading: boolean;

  constructor() { }
  ngOnInit() { }

  updateResults(results: SearchResult[]): void {
    this.results = results;
  }
}
