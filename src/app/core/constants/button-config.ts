import { BUTTON_CATEGORIES } from '../enums/enums';

/**
 * Map defining the first category of buttons.
 * It maps numbers to specific string representations, typically integers.
 */
const FIRST_CATEGORY_MAP = new Map<number, string>([
  [1, '1'],
  [2, '4'],
  [3, '5'],
  [4, '6'],
  [5, '7'],
  [16, '8'],
  [17, '9'],
  [18, '10'],
  [19, '11'],
  [20, '12'],
  [21, '13'],
  [22, '14'],
  [23, '15'],
  [24, '16'],
  [25, '17'],
]);

/**
 * Map defining the second category of buttons.
 * It maps numbers to floating-point or symbolic string representations.
 */
const SECOND_CATEGORY_MAP = new Map<number, string>([
  [6, '16'],
  [7, '4.'],
  [8, '5('],
  [9, '6°'],
  [10, '7+'],
  [26, '8.'],
  [27, '9.'],
  [28, '10.'],
  [29, '11.'],
  [30, '12.'],
  [31, '13.'],
  [32, '14.'],
  [33, '15.'],
  [34, '16.'],
  [35, '17.'],
]);

/**
 * Map defining the third category of buttons.
 * It maps numbers to alphabetic or special string representations.
 */
const THIRD_CATEGORY_MAP = new Map<number, string>([
  [11, 'H'],
  [12, 'D'],
  [13, 'K'],
  [14, 'T'],
  [15, 'P'],
  [36, 'A'],
  [37, 'B'],
  [38, 'C'],
  [39, 'E'],
  [40, 'F'],
  [41, 'G'],
  [42, 'I'],
  [43, 'J'],
  [44, 'L'],
  [45, 'M'],
]);

/**
 * Map associating button categories from the `BUTTON_CATEGORIES` enum to their respective mappings.
 * Each button category corresponds to its specific mapping of numbers to string values.
 */
export const BUTTON_CATEGORIES_MAP = new Map<BUTTON_CATEGORIES, Map<number, string>>([
  [BUTTON_CATEGORIES.NUMBER, FIRST_CATEGORY_MAP], // First category for integers
  [BUTTON_CATEGORIES.SPECIAL, SECOND_CATEGORY_MAP], // Second category for special values
  [BUTTON_CATEGORIES.CHARACTER, THIRD_CATEGORY_MAP], // Third category for alphabetic and special characters
]);
