// bootstrap-datepicker.directive.ts
import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appBootstrapDatepicker]'
})
export class BootstrapDatepickerDirective implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Initialize the Bootstrap datepicker
    this.el.nativeElement.datepicker();
  }
}