import { TaskListComponent } from './task-list/task-list.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';

export const router: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],children:[
        {path: '', component: TaskListComponent},
        {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
        {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]}
        
    ] },
  

]
export const routes: ModuleWithProviders = RouterModule.forRoot(router);