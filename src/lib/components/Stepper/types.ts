import type { EventDispatcher } from 'svelte';

export interface StepperState {
  current: number;
  total: number;
}

export type StepperButton = 'submit' | 'reset' | 'button';
export type StepperEvent = {
  next: { step: number };
  back: { step: number };
  complete: { step: number };
};
export type StepperEventDispatcher = EventDispatcher<StepperEvent>;
