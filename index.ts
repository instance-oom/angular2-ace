import { LAceEditorComponent } from './components';

export * from './components';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LAceEditorComponent],
  exports: [LAceEditorComponent]
})
export class LAceEditorModule { }