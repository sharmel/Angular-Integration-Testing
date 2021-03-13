/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <p highlight="cyan">First</p>
        <p highlight>Second</p>
    `
})
class DirectiveHostComponent {
}

describe('HighlightDirective', () => {
    let fixture: ComponentFixture<DirectiveHostComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DirectiveHostComponent, HighlightDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DirectiveHostComponent);
        fixture.detectChanges();
    });

    it('Highlight first element with cyan', () => {
        let debugElement = fixture.debugElement.queryAll(By.css('p'))[0];

        expect(debugElement.nativeElement.style.backgroundColor).toBe('cyan');
    });

    it('Highlight second element with default colour', () => {
        let debugElement = fixture.debugElement.queryAll(By.css('p'))[1];

        let directive = debugElement.injector.get(HighlightDirective);

        expect(debugElement.nativeElement.style.backgroundColor).toBe(directive.defaultColor);
    });
});
