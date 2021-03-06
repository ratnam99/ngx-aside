/* tslint:disable:no-unused-variable */

import {
    TestBed,
    ComponentFixture,
    async,
} from '@angular/core/testing';

import { DebugElement } from '@angular/core';

import {
    NgxAsideComponent
} from './aside.component';
import { NgxAsideModule } from './aside.module';
import { By } from '@angular/platform-browser';


describe('Component: Aside', () => {
    let component: NgxAsideComponent;
    let fixture: ComponentFixture<NgxAsideComponent>;
    let debugElement: DebugElement;
    let element: HTMLElement;


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [{
                ngModule: NgxAsideModule
            }]
        });

        fixture = TestBed.createComponent(NgxAsideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });


    it('should create an instance', () => {
        const componentTotest = new NgxAsideComponent(null, null);
        expect(componentTotest).toBeTruthy();
    });


    it('should be able to show a panel', () => {
        component.show();
        fixture.detectChanges();
        fixture.whenStable().then(result => {
            debugElement = fixture.debugElement.query(By.css('aside'));
            expect(debugElement).toBeTruthy();
        });
    });

    it('should be able to hide a panel', () => {


        component.hide();

        fixture.detectChanges();
        fixture.whenStable().then(result => {
            expect(fixture.debugElement.query(By.css('aside'))).toBeFalsy();
        });

    });

    it('should set title of aside', () => {
        const title = 'My Test Title';

        component.title = title;
        component.show();

        fixture.detectChanges();
        debugElement = fixture.debugElement.query(By.css('.aside-title'));
        element = debugElement.nativeElement;

        expect(element.textContent).toContain(title);
    });


    it('should set title of the default cancel button', () => {
        const title = 'My Default Cancel Button';

        component.cancelButtonTitle = title;
        component.show();

        fixture.detectChanges();
        debugElement = fixture.debugElement.query(By.css('.btn-cancel'));
        element = debugElement.nativeElement;

        expect(element.textContent).toContain(title);
    });

    it('should set title of the default submit button', () => {
        const title = 'My Default Submit Button';

        component.submitButtonTitle = title;
        component.show();

        fixture.detectChanges();
        debugElement = fixture.debugElement.query(By.css('.btn-submit'));
        element = debugElement.nativeElement;

        expect(element.textContent).toContain(title);
    });


    it('should hide a panel by pressing escape button', async(() => {
        component.show();
        fixture.detectChanges();

        debugElement = fixture.debugElement;


        const e = new KeyboardEvent('keydown', {
            bubbles: false,
            cancelable: true,
        });

        Object.defineProperty(e, 'which', {'value': 27});
        Object.defineProperty(e, 'keyCode', {'value': 27});
        Object.defineProperty(e, 'key', {'value': 'Escape'});
        Object.defineProperty(e, 'char', {'value': 'Escape'});

        document.dispatchEvent(e);

        fixture.detectChanges();
        fixture.whenStable().then(result => {
            expect(fixture.debugElement.query(By.css('aside'))).toBeNull();
        });

    }));
});

