import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { DataService } from '../core/services/data.service';
import { KeyPadComponent } from '../key-pad/key-pad.component';
import { ClickableBoxComponent } from '../clickable-box/clickable-box.component';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    KeyPadComponent,
    ClickableBoxComponent,
    MatIcon,
    MatMiniFabButton,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements AfterViewInit {

  constructor(public dataService: DataService, private cdr: ChangeDetectorRef) {}

  /**
   * Retrieves stored box data from `localStorage` and updates the data service.
   */
  ngAfterViewInit(): void {
    // Retrieves box data from localStorage, parsing it into an array
    const storedBoxValues: Array<Array<number | Array<number | string>>> = JSON.parse(localStorage.getItem('boxData')!);

    // Iterates over the stored values and updates the box values in the data service
    storedBoxValues?.forEach((value) => {
      this.dataService.updateBoxValue(value[0] as number, value[1] as Array<number | string>);
      this.cdr.detectChanges(); // Marks the component for change detection
    });
  }

  /**
   * Resets all box values inside the data service and clears the application state.
   * Also clears browser storage (`localStorage`).
   */
  public resetBoxValues(): void {
    // Clears all subjects in the data service (sets them to empty arrays)
    const subjects = Array.from(this.dataService.boxSubjects.values());
    subjects.forEach((subject) => subject.next([]));

    this.dataService.clearSelectedIndex(); // Clears the selected index in the service
    this.dataService.boxValuesSumMap.clear(); // Clears the sum map holding box values
    localStorage.clear(); // Clears all data in localStorage
  }

  /**
   * Calculates the total sum of all stored box values.
   * @returns The total sum as a number.
   */
  public calculateTotalSum(): number {
    return [...this.dataService.boxValuesSumMap.values()].reduce(
      (acc, value) => acc + (value[0] as number),
      0
    );
  }
}
