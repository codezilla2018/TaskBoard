import { NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import { AppHeaderComponent } from './app-header/app-header';

@NgModule({
    declarations:[AppHeaderComponent],
    imports:[IonicModule],
    exports:[AppHeaderComponent]
})

export class ComponentsModule {

}