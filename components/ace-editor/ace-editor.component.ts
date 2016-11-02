import { Component, Input, Output, EventEmitter, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAceEditorOption } from './ace-editor.interface';

declare var ace: any;

@Component({
  selector: 'l-ace-editor',
  template: `<div class="l-editor"></div>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host .l-editor {
      width: 100%;
      height: 100%;
      min-height: 50px;
    }
  `],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LAceEditorComponent),
    multi: true
  }]
})
export class LAceEditorComponent implements ControlValueAccessor {
  @Input()
  set mode(value: string) {
    if (!value) return;
    this._mode = value;
    if (this.editor) {
      this.editor.getSession().setMode(`ace/mode/${value}`);
    }
  }
  get mode(): string {
    return this._mode;
  }
  private _mode: string = "text";

  @Input()
  set options(value: IAceEditorOption) {
    if (!value) return;
    this.setEditor(value);
    this._options = value;
  }
  get options(): IAceEditorOption {
    if (!this._options) {
      this._options = <IAceEditorOption>{};
    }
    return this._options;
  }
  private _options: IAceEditorOption;

  set editorValue(value: string) {
    this._editorValue = value || "";
    this._onChange(value);
  }
  get editorValue(): string {
    return this._editorValue;
  }

  private editor: any;
  private _editorValue: string;
  private _onChange = (_: any) => { };
  private _onTouched = () => { };

  constructor(
    private element: ElementRef) {

  }

  ngOnInit() {
    if (!ace) {
      console.error("No ace found.");
      return;
    }
  }

  ngAfterViewInit() {
    let editorElement = this.element.nativeElement.querySelector(".l-editor");
    this.editor = ace.edit(editorElement);

    this.setEditor(this.options, true);

    this.editor.on("change", (e) => {
      let val = this.editor.getValue();
      this.editorValue = val;
      if (this.options.onChange && typeof this.options.onChange === "function") {
        this.options.onChange(e);
      }
    });

    if (this.options.onChange && typeof this.options.onChange === "function") {
      this.editor.on("change", this.options.onChange);
    }

    if (this.options.onLoaded && typeof this.options.onLoaded === "function") {
      this.options.onLoaded(this.editor);
    }
  }

  writeValue(value: string): void {
    this.editorValue = value || "";
    if (this.editor) {
      this.editor.getSession().setValue(value);
    }    
  }

  registerOnChange(fn: (_: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setEditor(options: IAceEditorOption, first: boolean = false) {
    const _optionKeys: Array<string> = [
      "readonly", "theme", "fontSize", "tabSize", "enableEmmet", "enableSnippets", "showPrintMargin"
    ];
    if (!this.editor) return;
    _optionKeys.forEach((key) => {
      if (options[key] && (options[key] !== this.options[key] || first)) {
        switch (key) {
          case "readonly":
            this.editor.setReadOnly(options.readonly);
            break;
          case "theme":
            this.editor.setTheme(`ace/theme/${options.theme}`);
            break;
          case "fontSize":
            this.editor.setFontSize(options.fontSize);
            break;
          default:
            this.editor.setOption(key, options[key]);
            break;
        }
      }
    });
  }
}