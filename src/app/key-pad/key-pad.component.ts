import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { BUTTON_CATEGORIES_MAP} from '../core/constants/button-config';
import {BUTTON_CATEGORIES} from '../core/enums/enums';
import {MatButton} from '@angular/material/button';
import {DataService} from '../core/services/data.service';
import {first} from 'rxjs';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-key-pad',
  imports: [
    MatButton,
    NgStyle
  ],
  templateUrl: './key-pad.component.html',
  standalone: true,
  styleUrl: './key-pad.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class KeyPadComponent implements OnChanges {

  // Holds the button configuration mapped by categories and IDs
  protected buttonList: Map<BUTTON_CATEGORIES, Map<number, string>> = BUTTON_CATEGORIES_MAP;

  // Array containing all button categories
  protected buttonCategories: BUTTON_CATEGORIES[] = Object.values(BUTTON_CATEGORIES);

  // Input property to specify the current box index, defaults to 0
  @Input() index: number = 0;

  // Stores the key of the button that was last clicked
  clickedButton = 0;

  constructor(private dataService: DataService) {}

  /**
   * Triggered when there are changes to input bindings. Updates the `clickedButton`
   * value based on the data service's `boxValuesSumMap`.
   * @param changes - Tracks the previous and current state of the bound input properties.
   */
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['index'].currentValue); // Logs the current index value
    this.clickedButton = this.dataService.boxValuesSumMap.get(this.index)
      ? this.dataService.boxValuesSumMap.get(this.index)![0] as number
      : 0;
    console.log(this.clickedButton); // Logs the updated clicked button key
  }

  /**
   * Handles actions when a button is clicked. Updates the corresponding box value
   * and moves to the next box in sequence.
   * @param keyButton - Array containing details of the clicked button.
   */
  onButtonClick(keyButton: Array<string | number>): void {
    this.dataService.selectedBoxIndex$
      .pipe(first()) // Ensures the observable completes after the first emission
      .subscribe((index) => {
        if (index !== null) { // Proceeds only if a valid index is selected
          this.dataService.updateBoxValue(index, keyButton); // Updates the selected box's value
          this.dataService.selectBox(index + 1); // Moves to the next box
        }
      });
  }
}
