import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./components/home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./components/about/about.component').then(c => c.AboutComponent),
    },
    {
        path: 'courses',
        loadComponent: () =>
            import('./courses/courses.component').then(c => c.CoursesComponent),
    },
    {
        path: 'admin',
        loadComponent: () =>
            import('./admin/admin.component').then(c => c.AdminComponent),
    },
    
];
