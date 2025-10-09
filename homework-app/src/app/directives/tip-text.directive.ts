/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ComponentRef, Directive, HostListener, inject, Input, OnDestroy, Renderer2, ViewContainerRef } from "@angular/core";
import { TipComponent } from "../components/tip-component/tip-component";

@Directive({
    selector: '[appTipText]',
})
export class TipTextDirective implements OnDestroy {


    ngOnDestroy(): void {
        this.hideTip();
    }

    @Input() public tipText: string;

    private tipOffset: number = 10;
    private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
    private renderer: Renderer2 = inject(Renderer2);
    private tipComponentRef: ComponentRef<TipComponent>

    @HostListener('mouseover', ['$event']) onMouseEnter(event: MouseEvent) {
        if (this.tipComponentRef) {
            this.hideTip();
        }
        if (event.target !== event.currentTarget) return;
        if (this.tipText) {
            this.showTip(event);
        }
    }

    @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
        if (event.target !== event.currentTarget) return;
        // console.log(event);
        if (this.tipComponentRef) {
            this.updateTipPosition(event);
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (event.target !== event.currentTarget) return;
        if (this.tipComponentRef) {
            this.hideTip();
        }
    }


    private showTip(event: MouseEvent) {
        if (this.tipComponentRef) {
            return;
        }

        this.tipComponentRef = this.viewContainerRef.createComponent(TipComponent);
        this.tipComponentRef.instance.text = this.tipText;
         this.renderer.appendChild(document.body, this.tipComponentRef.location.nativeElement);
        this.updateTipPosition(event)
    }

    private hideTip() {
        if (this.tipComponentRef) {
            this.renderer.removeChild(document.body, this.tipComponentRef.location.nativeElement);
            this.tipComponentRef.destroy();
            this.tipComponentRef = null;
        }
    }

    private updateTipPosition(event: MouseEvent) {
        if (!this.tipComponentRef) return;

        const x = event.clientX + this.tipOffset;
        const y = event.clientY + this.tipOffset;

        this.renderer.setStyle(this.tipComponentRef.location.nativeElement, 'left', `${x}px`);
        this.renderer.setStyle(this.tipComponentRef.location.nativeElement, 'top', `${y}px`);
    }


}