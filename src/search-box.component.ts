import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switch';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Ng2CompleterModule,CompleterService, CompleterData } from 'ng2-completer';

import { FlickrApiSearchService } from './flickr-api-search.service';
import { SearchResult } from './search-result.model';

@Component({
  selector: 'app-search-box',
  template:
` <div class="searchbox"><ng2-completer [(ngModel)]="searchStr" [clearUnselected]="true" placeholder="Search" [dataService]="dataService" [minSearchLength]="2">
            </ng2-completer><div>`
})
export class SearchBoxComponent implements OnInit {
  
  private searchStr: string;
  private dataService: CompleterData;
  
  private searchData = [
    { tag: 'cat' },
    { tag: 'dog' },
    { tag: 'kitten'},
    { tag: 'sky' },
    { tag: 'blue'},
    { tag: 'tree'},
    { tag: 'sydney'}
  ];
  
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private flickr: FlickrApiSearchService,
              private el: ElementRef,private completerService: CompleterService) {
                   
    let timedRes = Observable.from([this.searchData]).delay(2000);
    this.dataService = completerService.local(timedRes, 'tag', 'tag');
          
  }

  ngOnInit(): void {
  
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) 
      .filter((text: string) => text.length > 1) 
      .debounceTime(350)                        
      .do(() => this.loading.next(true))        
      .map((query: string) => this.flickr.search(query))
      .switch()
      .subscribe(
        (results: SearchResult[]) => { 
          this.loading.next(false);
          this.results.next(results);
        },
        (err: any) => { 
          console.log(err);
          this.loading.next(false);
        },
        () => { 
          this.loading.next(false);
        }
      );
  }
}
