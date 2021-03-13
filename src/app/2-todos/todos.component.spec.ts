import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { HttpClientModule } from '@angular/common/http';
import { from, Observable } from 'rxjs';

describe('TodosComponent', () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            declarations: [ TodosComponent ],
            providers: [ TodoService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
        //fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('load todos from the server', () => {
        let service = TestBed.inject(TodoService);
        spyOn(service, 'getTodos').and.returnValue(from([ [1,2,3] ]));
        
        fixture.detectChanges();

        expect(component.todos.length).toBe(3);
    });

    xit('load todos from the server using Promise with asynchronous operation', async(() => {
        let service = TestBed.inject(TodoService);
        spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1,2,3]));
        
        fixture.detectChanges();

        fixture.whenStable().then( () => {
            //fixture.detectChanges();
            expect(component.todos.length).toBe(3);
        });
    }));

    xit('load todos from the server using Promise with asynchronous operation', fakeAsync(() => {
        let service = TestBed.inject(TodoService);
        spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([1,2,3]));
        fixture.detectChanges();

        tick();
        //fixture.detectChanges();
        expect(component.todos.length).toBe(3);
    }));
});
