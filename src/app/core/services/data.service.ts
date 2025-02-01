import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  // BehaviorSubject to manage the selected box index.
  private _selectedBoxIndex = new BehaviorSubject<number | null>(null);

  // Observable to expose the selected box index as a stream.
  public selectedBoxIndex$ = this._selectedBoxIndex.asObservable();

  // Map to store subjects for each box, managing box-specific updates.
  private _boxSubjects = new Map<number, Subject<Array<string | number>>>();

  // Map to store values and sums for each box.
  private _boxSums = new Map<number, Array<string | number>>();

  // List of boxes.
  private _boxList = Array(10);

  /**
   * Getter for the list of boxes.
   * @returns Array<Object> representing the list of boxes.
   */
  get boxes(): Array<Object> {
    return this._boxList;
  }

  /**
   * Getter for the map containing box values and sums.
   * @returns Map of box indices to their respective values and sums.
   */
  get boxValuesSumMap(): Map<number, Array<number | string>> {
    return this._boxSums;
  }

  /**
   * Getter for the map containing subjects for boxes.
   * @returns Map of box indices to their respective update subjects.
   */
  get boxSubjects(): Map<number, Subject<Array<string | number>>> {
    return this._boxSubjects;
  }

  /**
   * Getter for the current selected box index.
   * @returns The index of the currently selected box, or null if none is selected.
   */
  get selectedBoxIndex(): number | null {
    return this._selectedBoxIndex.value;
  }

  constructor() {}

  /**
   * Updates the selected box index.
   * Emits the new index through the `_selectedBoxIndex` BehaviorSubject if the index is valid.
   * @param index - Index of the box to be selected.
   */
  public selectBox(index: number): void {
    if (index < this._boxList.length) {
      this._selectedBoxIndex.next(index);
    }
  }

  /**
   * Clears the currently selected box index by setting it to `null`.
   */
  clearSelectedIndex(): void {
    this._selectedBoxIndex.next(null);
  }

  /**
   * Retrieves the subject associated with a specific box index.
   * If the subject doesn't exist, a new one is created and stored in `_boxSubjects`.
   * @param index - Index of the box whose subject is to be retrieved or created.
   * @returns The subject tied to the specified box index.
   */
  public getBoxSubject(index: number): Subject<Array<string | number>> {
    if (!this._boxSubjects.has(index)) {
      this._boxSubjects.set(index, new Subject<Array<string | number>>());
    }
    return this._boxSubjects.get(index)!;
  }

  /**
   * Updates the value of the specified box and stores it in `_boxSums`.
   * Persists the updated map of box values to `localStorage`.
   * @param index - Index of the box to update.
   * @param value - Array of values to be assigned to the box (e.g., [key, value]).
   */
  public updateBoxValue(index: number, value: (string | number)[]): void {
    // Gets the subject for the specified box and emits the new value.
    const boxSubject = this.getBoxSubject(index);
    boxSubject.next(value);


    // Updates `_boxSums` and persists the data if the key (first array element) is a number.
    if (typeof value[0] === 'number') {
      this._boxSums.set(index, value); // Updates the `_boxSums` map for the corresponding box index.

      // Serializes the `_boxSums` map and stores it in `localStorage`.
      const entriesStringyfied = JSON.stringify(Array.from(this._boxSums.entries()));
      localStorage.setItem('boxData', entriesStringyfied);
    }
  }
}
