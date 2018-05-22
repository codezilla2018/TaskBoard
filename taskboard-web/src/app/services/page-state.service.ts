import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {

  page:string;

  
  setPage(page:string){
    this.page = page;
  }

  getPage(){
    return this.page;
  }


  constructor() { 
    this.page = "";
  }
}
