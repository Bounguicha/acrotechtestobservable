import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgClass } from '@angular/common';
import { DataService } from '../core/services/data.service';
import {merge, Subject, takeUntil} from 'rxjs';

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
   * Subscribes to updates from the data service related to a specific box
   * and the currently selected box index. Merges these updates into a single stream
   * and handles them accordingly.
   */

  private subscribeToBoxUpdates(): void {
    const boxUpdates$ = this.dataService
      .getBoxSubject(this.index)
      .pipe(takeUntil(this.destroy$));

    const selectedIndexUpdates$ = this.dataService.selectedBoxIndex$.pipe(
      takeUntil(this.destroy$)
    );

    merge(boxUpdates$, selectedIndexUpdates$).subscribe({
      next: (update) => {
        if (Array.isArray(update)) {
          this.handleBoxValueUpdate(update); // Update key-value pair
        } else {
          this.selectedIndex = update as number; // Update selected index
        }
      },
      error: (err) => console.error('Error =', err),
    });
  }

  /**
   * Updates the key and value properties based on the incoming box values
   * @param boxValue - Array containing key-value pair (number, string)
   */
  private handleBoxValueUpdate(boxValue: Array<string | number>): void {
    this.value = boxValue[1] as string;
    this.key = boxValue[0] as number;
  }
}
