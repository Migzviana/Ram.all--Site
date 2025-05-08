import { Component, OnInit } from '@angular/core';
import { Extension } from '../../interface/extension';
import { ExtensionService } from '../../services/extension.service';
import { ExtensionSearchComponent } from '../../components/extension-search/extension-search.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ExtensionTableComponent } from '../../components/extension-table/extension-table.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-extension-page',
  standalone: true,
  imports: [ExtensionSearchComponent, CommonModule, SidebarComponent, ExtensionTableComponent, FormsModule],
  templateUrl: './main-extension-page.component.html',
  styleUrls: ['./main-extension-page.component.scss'],
})
export class MainExtensionPageComponent implements OnInit {
  extensions: Extension[] = [];
  filteredExtensions: Extension[] = [];
  availableExtensions: Extension[] = [];
  filteredAvailableExtensions: Extension[] = [];

  currentUserEmail: string | null = null;

  filteredRangeExtensions: Extension[] = [];
  rangeStart = 0;
  rangeEnd = 0;

  currentView: 'all' | 'available' | 'range' = 'all';

  constructor(
    private extensionService: ExtensionService,
    private toastService: ToastrService,
    private router: Router 
  ) {}

  setView(view: 'all' | 'available' | 'range') {
    this.currentView = view;
  }

  ngOnInit(): void {
    this.loadAll();
    this.loadAvailable();
  }

  loadAll(): void {
    this.extensionService.getAllExtensions().subscribe({
      next: (data) => {
        this.extensions = data;
        this.filteredExtensions = [...data];
        this.filteredRangeExtensions = [...data];
      },
      error: () => this.toastService.error('Erro ao carregar todos os ramais.')
    });
  }

  loadAvailable(): void {
    this.extensionService.getAvailableExtensions().subscribe({
      next: (data) => {
        this.availableExtensions = data;
        this.filteredAvailableExtensions = [...data];
      },
      error: () => this.toastService.error('Erro ao carregar disponíveis.')
    });
  }

  

  applyRange(): void {
    if (this.rangeStart && this.rangeEnd && this.rangeStart <= this.rangeEnd) {
      this.filteredRangeExtensions = this.extensions.filter(ext => {
        const num = parseInt(ext.extensionNumber, 10);
        return num >= this.rangeStart && num <= this.rangeEnd;
      });
    } else {
      this.toastService.warning('Intervalo inválido.');
      this.filteredRangeExtensions = [];
    }
  }

  onSearch(term: string): void {
    const lower = term.toLowerCase().trim();
    switch (this.currentView) {
      case 'all':
        this.filteredExtensions = this.extensions.filter(ext =>
          ext.extensionNumber.includes(lower) ||
          (ext.loggedUser && ext.loggedUser.toLowerCase().includes(lower))
        );
        break;
      case 'available':
        this.filteredAvailableExtensions = this.availableExtensions.filter(ext =>
          ext.extensionNumber.includes(lower)
        );
        break;
      case 'range':
        this.filteredRangeExtensions = this.extensions.filter(ext =>
          ext.extensionNumber.includes(lower) ||
          (ext.loggedUser && ext.loggedUser.toLowerCase().includes(lower))
        );
        break;
    }
  }

  handleLogin(extensionNumber: string): void {
    this.extensionService.loginExtension(extensionNumber).subscribe({
      next: () => {
        sessionStorage.setItem('user-extension', extensionNumber);
        this.toastService.success(' Login realizado com sucesso!');
        this.ngOnInit();
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Erro ao logar';
        this.toastService.error(errorMessage);
      },
    });
  }


  handleLogout(extensionNumber: string): void {
    this.extensionService.logoutExtension(extensionNumber).subscribe({
      next: () => {
        sessionStorage.removeItem('user-extension');
        this.toastService.success('Logout realizado com sucesso');
        this.ngOnInit();
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Erro ao deslogar';
        this.toastService.error(errorMessage);
      },
    });
  }


  logout(): void {
    const extensionNumber = sessionStorage.getItem('user-extension');
  
    if (extensionNumber) {
      this.extensionService.logoutExtension(extensionNumber).subscribe({
        next: () => {
          sessionStorage.clear();
          this.toastService.warning('Saindo do sistema...');
          this.router.navigate(['/login']);
        },
      });
    } else {
      sessionStorage.clear();
      this.toastService.warning('Saindo do sistema...');
      this.router.navigate(['/login']);
    }
  } 

  canLogin = (ext: Extension) => !ext.loggedUser;

  canLogout = (ext: Extension) => {
    const email = sessionStorage.getItem('user-email');
    return !!ext.user && ext.user.email === email;
  };
}