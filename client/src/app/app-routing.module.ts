import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home/home.component'
import { PracticeComponent } from './practice/practice.component';
import { ClassComponent } from './class/class.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'practice', component: PracticeComponent},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'class/:id', component: ClassComponent
  },
  {
    path: 'teacher/:username', component: TeacherComponent
  },
  {
    path: 'admin', component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
