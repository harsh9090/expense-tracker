import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { authGuard } from './guards/auth.guard';
import { IncomeComponent } from './components/income/income.component';
import { BudgetComponent } from './components/budgets/budgets.component';
import { ReportsComponent } from './components/reports/reports.component';
import { registerComponent } from './components/auth/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'register', component: registerComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'expenses', component: ExpensesComponent, canActivate: [authGuard] }, // ✅ Expenses Page
    { path: 'income', component: IncomeComponent, canActivate: [authGuard] }, 
    { path: 'budgets', component: BudgetComponent, canActivate: [authGuard] },
    { path: 'reports', component:ReportsComponent, canActivate: [authGuard] },
    { path: 'logout', component: LogoutComponent },

    { path: '**', redirectTo: '/login' },
];
