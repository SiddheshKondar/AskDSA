import { Component, SecurityContext } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent {
  userInput: string = '';
  // Update messages to store SafeHtml
  messages: { text: string, html?: SafeHtml, sender: 'user' | 'bot' }[] = [];
  loading = false;

  constructor(private chatService: ChatService, private sanitizer: DomSanitizer) {}

  async sendMessage() {
    if (!this.userInput.trim()) return;

    const userText = this.userInput;
    this.messages.push({ text: userText, sender: 'user' });
    this.userInput = '';
    this.loading = true;

    this.chatService.askQuestion(userText).subscribe({
      next: (res: any) => {
        console.log("Response received:", res.answer); // Check your console!

        // Parse Markdown
        const rawHtml = marked.parse(res.answer) as string;
        const safeHtml = this.sanitizer.bypassSecurityTrustHtml(rawHtml);

        this.messages.push({
          text: res.answer,
          html: safeHtml,
          sender: 'bot'
        });

        this.loading = false;
      },
      error: (err) => {
        console.error("Error details:", err);
        this.messages.push({ text: 'Error: Could not reach AI.', sender: 'bot' });
        this.loading = false;
      }
    });
  }
}
