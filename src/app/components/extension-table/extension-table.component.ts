import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Extension } from '../../interface/extension';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-extension-table',
  templateUrl: './extension-table.component.html',
  styleUrls: ['./extension-table.component.scss']
})
export class ExtensionTableComponent {
  @Input() extensions: Extension[] = [];
  @Input() showLogoutButton: boolean = true;

  @Output() login = new EventEmitter<string>();
  @Output() logout = new EventEmitter<string>();

  @Input() canLogin!: (extension: Extension) => boolean;
  @Input() canLogout!: (extension: Extension) => boolean;

  handleLogin(extensionNumber: string): void {
    this.login.emit(extensionNumber);
  }

  handleLogout(extensionNumber: string): void {
    this.logout.emit(extensionNumber);
  }
}
