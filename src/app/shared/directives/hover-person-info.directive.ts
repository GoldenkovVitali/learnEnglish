import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHoverPersonInfo]',
})
export default class HoverPersonInfoDirective implements AfterViewInit {
  @Input() description: HTMLElement;

  @Input() photo: HTMLElement;

  heightBlockDescription: number;

  isHover = false;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
    this.renderer2.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
  }

  ngAfterViewInit(): void {
    this.heightBlockDescription = this.description.scrollHeight;
    this.renderer2.setStyle(this.description, 'whiteSpace', 'nowrap');
  }

  @HostListener('mouseenter') onMouseLeave(): void {
    this.renderer2.setStyle(this.description, 'whiteSpace', 'normal');
    this.renderer2.setStyle(this.description, 'height', `${this.heightBlockDescription + 10}px`);
    this.isHover = true;
  }

  @HostListener('mouseleave') onMouseOut(): void {
    this.renderer2.setStyle(this.description, 'height', `20px`);
    this.isHover = false;
    this.renderer2.setStyle(this.photo, 'transform', `translateX(0px) translateY(0px)`);
  }

  @HostListener('transitionend', ['$event'])
  onTransitionEnd(): void {
    if (!this.isHover) this.renderer2.setStyle(this.description, 'whiteSpace', 'nowrap');
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent): void {
    this.renderer2.setStyle(
      this.photo,
      'transform',
      `translateX(${-event.movementX}px) translateY(${-event.movementY}px) scale(1.05)`
    );
  }
}
