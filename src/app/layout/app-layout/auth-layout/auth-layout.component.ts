import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: [],
})
export class AuthLayoutComponent implements OnInit {
  constructor() {
    console.log("Auth Layout Called");
  }

  ngOnInit(): void {
  }
}
