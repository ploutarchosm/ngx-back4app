export class ThemeDomService {
  private _doc: Document;
  constructor(document: Document) {
    this._doc = document;
  }

  applyApplicationTheme(theme: string) {
    this._doc.body.setAttribute('data-theme', theme);
  }
}

export const ThemeDomFactoryService = (doc: Document) =>
  new ThemeDomService(doc);
