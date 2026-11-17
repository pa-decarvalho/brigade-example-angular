import { TestBed } from '@angular/core/testing';
import { Counter } from './counter';

describe('Counter', () => {
  async function render() {
    const fixture = TestBed.createComponent(Counter);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const text = (id: string) => element.querySelector(`[data-testid="${id}"]`)?.textContent;
    const button = (name: string) =>
      [...element.querySelectorAll('button')].find((b) => b.textContent === name)!;
    return { fixture, text, button };
  }

  it('starts at 0, even, with Reset disabled', async () => {
    const { text, button } = await render();
    expect(text('count')).toBe('0');
    expect(text('parity')).toBe('even');
    expect(button('Reset').disabled).toBe(true);
  });

  it('counts and resets', async () => {
    const { fixture, text, button } = await render();
    button('Increment').click();
    button('Increment').click();
    button('Increment').click();
    await fixture.whenStable();
    expect(text('count')).toBe('3');
    expect(text('parity')).toBe('odd');
    button('Reset').click();
    await fixture.whenStable();
    expect(text('count')).toBe('0');
  });
});
