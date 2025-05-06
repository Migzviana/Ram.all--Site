import { Component, EventEmitter, Output, Input, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-extension-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './extension-search.component.html',
  styleUrls: ['./extension-search.component.scss']
})
export class ExtensionSearchComponent implements OnInit, OnDestroy {
  @Input() placeholder: string = "Buscar por número ou usuário";
  @Output() search = new EventEmitter<string>();

  query: string = '';
  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  ngOnInit(): void {
    this.searchSub = this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => this.search.emit(term));
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  onInput(): void {
    this.searchSubject.next(this.query);
  }
}
