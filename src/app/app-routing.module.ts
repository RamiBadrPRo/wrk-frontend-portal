import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FrontComponent } from './front/front.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
    { path: '', component: FrontComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [

    ] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);