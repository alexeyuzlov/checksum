import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[confirm]'
})
export class ConfirmDirective {
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('click')
  public click() {
    if (confirm('Are you sure?')) {
      this.confirm.emit();
    }
  }
}
