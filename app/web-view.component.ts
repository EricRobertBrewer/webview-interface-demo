import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { WebView, LoadEventData } from 'ui/web-view';
import { WebViewInterface } from 'nativescript-webview-interface';

@Component({
  templateUrl: "web-view.component.html",
})
export class WebViewComponent implements AfterViewInit, OnDestroy {
  @ViewChild('webView') webView: ElementRef;

  selectedLanguage: string;

  lstLanguages: string[] = ['English', 'Sanskrit', 'French'];

  private oLangWebViewInterface: WebViewInterface;

  constructor(
      private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngAfterViewInit() {
    this.setupWebViewInterface();
  }

  ngOnDestroy() {
    // cleaning up references/listeners.
    this.oLangWebViewInterface.destroy();
    this.oLangWebViewInterface = null;
  }

  /**
   * Adds language to webView dropdown.
   */
  addLanguage(language: string) {
    this.oLangWebViewInterface.callJSFunction('addNewLanguage', [language]);
  }

  /**
   * Fetches currently selected language of dropdown in webView.
   */
  getSelectedLanguage() {
    this.oLangWebViewInterface.callJSFunction('getSelectedLanguage', null, (oSelectedLang) => {
      alert(`Selected Language is ${oSelectedLang.text}`);
    });
  }

  /**
   * Fetches currently selected language of dropdown in webview.
   * The result will come after 2s. This function is written to show the support of deferred result.
   */
  getSelectedLanguageDeferred() {
    this.oLangWebViewInterface.callJSFunction('getSelectedLanguageDeferred', null, (oSelectedLang) => {
      alert(`Deferred Selected Language is ${oSelectedLang.text}`);
    });
  }

  /**
   * Initializes webViewInterface for communication between webview and android/ios.
   */
  private setupWebViewInterface() {
    let webView: WebView = this.webView.nativeElement;

    this.oLangWebViewInterface = new WebViewInterface(webView, '~/www/index.html');

    // loading languages in dropdown, on load of webView.
    webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
      if (!args.error) {
        this.loadLanguagesInWebView();
      }
    });

    this.listenLangWebViewEvents();
  }

  /**
   * Sends initial list of languages to webView, once it is loaded.
   */
  private loadLanguagesInWebView() {
    this.oLangWebViewInterface.emit('loadLanguages', this.lstLanguages);
  }

  /**
   * Handles any event/command emitted by language webview.
   */
  private listenLangWebViewEvents() {
    // handles language selectionChange event.
    this.oLangWebViewInterface.on('languageSelection', (selectedLanguage) => {
      this.selectedLanguage = selectedLanguage;
      this.changeDetectorRef.detectChanges();
    });
  }
}
