# angular2-ace
angular2 components for ace editor

# Required
```html
<script src="//cdn.bootcss.com/ace/1.2.5/ace.js"></script>
```

# Usage
```typescript
import { LAceEditorModule } from 'angular2-ace';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LAceEditorModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Template
```html
<l-aceEditor [mode]="mode" [options]="aceOption" [(ngModel)]="editValue"></l-aceEditor>
```

## Typescript
```typescript
export class AppComponent {

  private aceOption: any;
  private mode: string = "text";
  private value: string = "hello";

  constructor() {

  }

  ngOnInit() {
    this.aceOption = {
      readonly: false,
      theme: 'twilight',
      onLoaded: (editor) => {
        editor.$blockScrolling = Infinity
        editor.setOptions({
          minLines: 15,
          maxLines: 25
        })
      },
      onChange: (e) => {

      }
    }
  }
}
```

## Options Define 
```typescript
export interface IAceEditorOption {
  readonly: boolean;
  theme: string;
  fontSize: number;  
  tabSize: number;
  enableEmmet: boolean;
  enableSnippets: boolean;
  showPrintMargin: boolean;
  onLoaded: Function;
  onChange: Function;
}
```