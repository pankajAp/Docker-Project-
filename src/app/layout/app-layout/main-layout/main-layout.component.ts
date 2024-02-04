import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: [],
})
export class MainLayoutComponent implements OnInit {
  constructor() { // private activatedRoute: ActivatedRoute
    console.log("Main Layout Called");
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const userId = urlParams.get('userId');
    // console.log("userId is ", userId);
  }

  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(params => {
    //   const userId = params['userId'];
    //   console.log("Amol ", userId);
    // });
  }
}
