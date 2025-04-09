import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  selectedTab: number = 1;

  constructor() {}

  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

}
