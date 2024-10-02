import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-shearch-box',
  templateUrl: './shearch-box.component.html',
  styleUrl: './shearch-box.component.css'
})
export class ShearchBoxComponent implements OnInit, OnDestroy {



  private debouncer: Subject<string> = new Subject();
  private debouncerSubscription: Subscription = new Subscription();

  @Input()
  public placeholder: string = '';

  @Input()
  public value: string = '';

  @Output()
  public term: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
    .pipe(debounceTime(300))
    .subscribe((term) => this.term.emit(term));
  }

  ngOnDestroy(): void {
    this.debouncerSubscription.unsubscribe();
    console.log('destroyed');
  }



  public search(term: string): void {
    this.term.emit(term);
  }

  public OnclickPressed(term: string): void {
    this.debouncer.next(term);
  }

}
