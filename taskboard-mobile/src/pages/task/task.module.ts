import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskPage } from './task';
import {ComponentsModule} from '../../components/components.module';

@NgModule({
  declarations: [
    TaskPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskPage),
    ComponentsModule
  ],
})
export class TaskPageModule {}
