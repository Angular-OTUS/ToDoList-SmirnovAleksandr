import {
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
  Renderer2,
  HostListener,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appShowTooltip]',
})
export class ShowTooltip {
  @Input('appShowTooltip') tooltipText = '';
  private elementRef = inject(ElementRef);
  private viewContainerRef = inject(ViewContainerRef);
  private renderer = inject(Renderer2);

  private tooltipElement: HTMLElement | null = null;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.showTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    if (this.tooltipElement) {
      return;
    }
    this.tooltipElement = this.renderer.createElement('div');
    this.renderer.addClass(this.tooltipElement, 'tooltip');
    this.renderer.setStyle(this.tooltipElement, 'position', 'absolute');
    this.renderer.setStyle(this.tooltipElement, 'z-index', '1000');

    if (this.tooltipText) {
      const text = this.renderer.createText(this.tooltipText);
      this.renderer.appendChild(this.tooltipElement, text);
    } else {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
      return;
    }
    this.renderer.appendChild(document.body, this.tooltipElement);
    this.positionTooltip();
  }

  private hideTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
      this.viewContainerRef.clear();
    }
  }

  private positionTooltip(): void {
    if (!this.tooltipElement) return;

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const top = hostRect.top + scrollY - tooltipRect.height - 15;
    const left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
  }
}
