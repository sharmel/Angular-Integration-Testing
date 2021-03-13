/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

class ActivatedRouteStub {

    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    private _testParams: {};
    get testParams() { return this._testParams; }
    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

    // private subject = new Subject();

    // push(value) {
    //     this.subject.next(value);
    // }
    
    // get params() {
    //     return this.subject.asObservable();
    // }
    //params: Observable<any>;
}

describe('UserDetailsComponent', () => {
    let component: UserDetailsComponent;
    let fixture: ComponentFixture<UserDetailsComponent>;
    //let mockActivatedRoute;
    beforeEach(async(() => {
       // mockActivatedRoute = new ActivatedRouteStub();
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule.withRoutes([])],
            declarations: [ UserDetailsComponent ],
            
            providers: [
                {provide: ActivatedRoute,
  useValue: {
    params: of({id: 0})
  }}
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Direct user to the users page after saving', () => {
        let router = TestBed.inject(Router);
        let spy = spyOn(router, 'navigate');

        component.save();

        expect(spy).toHaveBeenCalledWith(['users']);
    });

    it('Navigate user to not found page when invalid user id is passed', () => {
        let router = TestBed.inject(Router);
        let spy = spyOn(router, 'navigate');

        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        //let route: ActivatedRoute = TestBed.inject(ActivatedRoute);
        //mockActivatedRoute.testParams = {id: 0};
        //route({id : 0});


        expect(spy).toHaveBeenCalledWith(['not-found']);
    });
});
