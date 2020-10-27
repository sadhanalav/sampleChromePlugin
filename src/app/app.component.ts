import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-chrome-extension';
  color: string;

  constructor() { }

  public colorize() {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'document.body.style.backgroundColor = "' + this.color + '";' }
      );
    });
  }

  public updateColor(color: string) {
    chrome.storage.sync.set({ color });
  }

  ngOnInit(): void {
    chrome.storage.sync.get('color', ({ color }) => {
      this.color = color;
    });
  }
}