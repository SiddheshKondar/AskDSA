import { Component } from '@angular/core';
import { ChatWindowComponent } from './chat-window/chat-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ChatWindowComponent],
  templateUrl: './app.component.html', // This looks for app.component.html
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dsa-chatbot-frontend';
}
