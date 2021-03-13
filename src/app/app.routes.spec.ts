import { routes } from "./app.routes";
import { UsersComponent } from "./users/users.component";

describe('routes', () => {

    it('contain a route for /users', () => {

        expect(routes).toContain({ path: 'users', component: UsersComponent});

    });
});
