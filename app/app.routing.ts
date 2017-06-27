import { NgModule, Type } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { WebViewComponent } from "./web-view.component";

const routes: Routes = [{
    path: "",
    component: WebViewComponent
}];

export const navigatableComponents: Array<Type<any>> = [
    WebViewComponent
];

@NgModule({
    imports: [
        NativeScriptRouterModule.forRoot(routes)
    ],
    exports: [
        NativeScriptRouterModule
    ]
})
export class AppRoutingModule {
}
