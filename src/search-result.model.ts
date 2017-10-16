/**
 * Structure for photo object we get from flickr
 */
export class SearchResult {
  id: string;
  title: string;
  thumbnailUrl: string;
  highResUrl: string;

  constructor(obj?: any) {
    this.id              = obj && obj.id             || null;
    this.title           = obj && obj.title          || null;
    this.thumbnailUrl    = obj && obj.thumbnailUrl   || null;
    this.highResUrl      = obj && obj.highResUrl     || null;
  }
}
