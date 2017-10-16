//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FlickrApiSearchComponent } from './flickr-api-search.component';
import { SearchResultComponent } from './search-result.component';
import { SearchBoxComponent } from './search-box.component';
import { flickrApiSearchInjectables } from './flickr-api-search.injectables';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Ng2CompleterModule,CompleterService, CompleterData } from 'ng2-completer';

@Component({
  selector: 'my-app',
  template: `
  <div class="container">
    <app-flickr-api-search></app-flickr-api-search>
  </div>
  `,
})
export class App {
}

@NgModule({
   declarations: [ App,
    FlickrApiSearchComponent,
    SearchResultComponent,
    SearchBoxComponent ],
    
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2CompleterModule
    ]
    
  providers: [flickrApiSearchInjectables],
  bootstrap: [ App ]
})

export class AppModule {
  
  }
}