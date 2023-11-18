import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageLayoutComponent implements OnInit {
  pageTitle: string;
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.pageTitle = this.titleService.getTitle().split('|')[1];
  }
}
