import { Component, computed, signal } from '@angular/core';

// A small counter: something for the unit and end-to-end tests to click.
@Component({
  selector: 'app-counter',
  template: `
    <section class="counter">
      <p>Count: <output data-testid="count">{{ count() }}</output></p>
      @if (even()) {
        <p data-testid="parity">even</p>
      } @else {
        <p data-testid="parity">odd</p>
      }
      <button type="button" (click)="increment()">Increment</button>
      <button type="button" (click)="reset()" [disabled]="count() === 0">Reset</button>
    </section>
  `,
})
export class Counter {
  protected readonly count = signal(0);
  protected readonly even = computed(() => this.count() % 2 === 0);

  increment(): void {
    this.count.update((value) => value + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
