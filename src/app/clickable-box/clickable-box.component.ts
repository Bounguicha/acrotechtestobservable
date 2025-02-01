import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { DataService } from '../core/services/data.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-clickable-box',
  standalone: true,
  templateUrl: './clickable-box.component.html',
  imports: [NgClass],
  styleUrl: './clickable-box.component.scss',

})
export class ClickableBoxComponent implements OnInit, OnDestroy {

  // Input property specifying the index of the clickable element, default is 0
  @Input() index: number = 0;

  // Holds the selected box index, initially set to null
  selectedIndex: number | null = 0;

  // The value of the clickable element (e.g., text, label)
  public value: string = '';

  // The key associated with the clickable element
  public key: number = 0;

  // Subject used for managing and completing subscriptions during component destruction
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  /**
   * Lifecycle hook triggered when the component is initialized.
   * Subscribes to updates from the data service related to the box's state.
   */
  ngOnInit(): void {
    this.subscribeToBoxUpdates();
  }

  /**
   * Lifecycle hook triggered when the component is destroyed.
   * Ensures all subscriptions are completed to prevent memory leaks.
   */
  ngOnDestroy(): void {
    this.destroy$.next(); // Emits a complete signal to all subscriptions
    this.destroy$.complete(); // Completes the subject
  }

  /**
   * Handles the click event on the clickable element.
   * Updates the selected box index in the data service.
   */
  public onElementClick(): void {
    this.dataService.selectBox(this.index);
  }

  /**
   * Subscribes to the box updates and the selected box index observable from the data service.
   * Updates the `value`, `key`, and `selectedIndex` as new data or changes are emitted.
   */
  private subscribeToBoxUpdates(): void {
    this.dataService
      .getBoxSubject(this.index)
      .pipe(takeUntil(this.destroy$)) // Ensures subscription is auto-unsubscribed when `destroy$` emits
      .subscribe({
        next: (value) => {
          this.value = value[1] as string; // Updates the element's value
          this.key = value[0] as number; // Updates the element's key
        },
        error: (error) => {
          console.error('Error =', error); // Logs errors in subscription
        },
      });

    this.dataService.selectedBoxIndex$.subscribe((index) => {
      this.selectedIndex = index; // Updates the selected index
    });
  }
}
