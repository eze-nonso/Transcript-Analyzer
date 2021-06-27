import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from 'src/app/core/core.module';

import AnalyzerComponent from './analyzer.component';
import { ROUTES } from './analyzer.routes';

import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [ AnalyzerComponent ],
    imports: [
        CoreModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
    ]
})
export class AnalyzerModule {}
