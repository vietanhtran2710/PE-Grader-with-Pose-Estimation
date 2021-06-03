import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent} from './home/home.component'
import { PracticeComponent } from './practice/practice.component';
import { ClassComponent } from './class/class.component';
import { TeacherComponent } from './teacher/teacher.component';
import { TestComponent } from './test/test.component';
import { StudentListComponent } from './student-list/student-list.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { ClassListComponent } from './class-list/class-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'practice', component: PracticeComponent},
  { path: 'test', component: TestComponent},
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
    path: 'admin', component: AdminComponent,
  },
  { path: 'admin/studentslist', component: StudentListComponent },
  { path: 'admin/teacherslist', component: TeacherListComponent },
  { path: 'admin/classeslist', component: ClassListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
