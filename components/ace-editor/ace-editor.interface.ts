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