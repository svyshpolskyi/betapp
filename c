warning: LF will be replaced by CRLF in package-lock.json.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in package.json.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in src/app/header/header.component.html.
The file will have its original line endings in your working directory.
warning: LF will be replaced by CRLF in src/app/header/header.component.ts.
The file will have its original line endings in your working directory.
[1mdiff --git a/package-lock.json b/package-lock.json[m
[1mindex c754e96..dad55af 100644[m
[1m--- a/package-lock.json[m
[1m+++ b/package-lock.json[m
[36m@@ -6912,6 +6912,12 @@[m
       "resolved": "https://registry.npmjs.org/preserve/-/preserve-0.2.0.tgz",[m
       "integrity": "sha1-gV7R9uvGWSb4ZbMQwHE7yzMVzks="[m
     },[m
[32m+[m[32m    "prettier": {[m
[32m+[m[32m      "version": "1.15.2",[m
[32m+[m[32m      "resolved": "https://registry.npmjs.org/prettier/-/prettier-1.15.2.tgz",[m
[32m+[m[32m      "integrity": "sha512-YgPLFFA0CdKL4Eg2IHtUSjzj/BWgszDHiNQAe0VAIBse34148whfdzLagRL+QiKS+YfK5ftB6X4v/MBw8yCoug==",[m
[32m+[m[32m      "dev": true[m
[32m+[m[32m    },[m
     "process": {[m
       "version": "0.11.10",[m
       "resolved": "https://registry.npmjs.org/process/-/process-0.11.10.tgz",[m
[1mdiff --git a/package.json b/package.json[m
[1mindex 9f814b1..1d93814 100644[m
[1m--- a/package.json[m
[1m+++ b/package.json[m
[36m@@ -3,12 +3,13 @@[m
   "version": "0.0.0",[m
   "scripts": {[m
     "ng": "ng",[m
[32m+[m[32m    "prestart": "ng build --aot --prod",[m
     "start": "node server.js",[m
     "build": "ng build",[m
     "test": "ng test",[m
     "lint": "ng lint",[m
     "e2e": "ng e2e",[m
[31m-    "postinstall": "ng build --aot --prod"[m
[32m+[m[32m    "dev": "ng serve"[m
   },[m
   "private": true,[m
   "dependencies": {[m
[36m@@ -49,6 +50,7 @@[m
     "karma-coverage-istanbul-reporter": "2.0.1",[m
     "karma-jasmine": "1.1.2",[m
     "karma-jasmine-html-reporter": "0.2.2",[m
[32m+[m[32m    "prettier": "1.15.2",[m
     "protractor": "5.4.0",[m
     "ts-node": "7.0.0",[m
     "tslint": "5.11.0",[m
[1mdiff --git a/src/app/header/header.component.html b/src/app/header/header.component.html[m
[1mindex 96ed497..8aa0c60 100644[m
[1m--- a/src/app/header/header.component.html[m
[1m+++ b/src/app/header/header.component.html[m
[36m@@ -1,27 +1,32 @@[m
 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">[m
   <a class="navbar-brand" href="#">[m
[31m-    <img src="https://www.freeiconspng.com/uploads/football-png-12.png" width="50" class="d-inline-block align-top" alt="">[m
[32m+[m[32m    <img[m
[32m+[m[32m      src="https://www.freeiconspng.com/uploads/football-png-12.png"[m
[32m+[m[32m      width="50"[m
[32m+[m[32m      class="d-inline-block align-top"[m
[32m+[m[32m      alt=""[m
[32m+[m[32m    />[m
   </a>[m
[31m-  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">[m
[32m+[m[32m  <button[m
[32m+[m[32m    class="navbar-toggler"[m
[32m+[m[32m    type="button"[m
[32m+[m[32m    data-toggle="collapse"[m
[32m+[m[32m    data-target="#navbarSupportedContent"[m
[32m+[m[32m    aria-controls="navbarSupportedContent"[m
[32m+[m[32m    aria-expanded="false"[m
[32m+[m[32m    aria-label="Toggle navigation"[m
[32m+[m[32m  >[m
     <span class="navbar-toggler-icon"></span>[m
   </button>[m
 [m
   <div class="collapse navbar-collapse" id="navbarSupportedContent">[m
     <ul class="navbar-nav mr-auto">[m
[31m-      <li class="nav-item active">[m
[31m-        <a class="nav-link" href="#">Home</a>[m
[31m-      </li>[m
[31m-      <li class="nav-item">[m
[31m-        <a class="nav-link" href="#">Personal room</a>[m
[31m-      </li>[m
[31m-      <li class="nav-item">[m
[31m-        <a class="nav-link" href="#">Admin panel</a>[m
[31m-      </li>[m
[32m+[m[32m      <li class="nav-item active"><a class="nav-link" href="#">Home</a></li>[m
[32m+[m[32m      <li class="nav-item"><a class="nav-link" href="#">Personal room</a></li>[m
[32m+[m[32m      <li class="nav-item"><a class="nav-link" href="#">Admin panel</a></li>[m
     </ul>[m
     <ul class="navbar-nav">[m
[31m-      <li class="nav-item">[m
[31m-        <a class="nav-link" href="#">Log In/Sign Up</a>[m
[31m-      </li>[m
[32m+[m[32m      <li class="nav-item"><a class="nav-link" href="#">Log In/Sign Up</a></li>[m
     </ul>[m
   </div>[m
 </nav>[m
[1mdiff --git a/src/app/header/header.component.ts b/src/app/header/header.component.ts[m
[1mindex 819d341..4041f5f 100644[m
[1m--- a/src/app/header/header.component.ts[m
[1m+++ b/src/app/header/header.component.ts[m
[36m@@ -1,15 +1,12 @@[m
[31m-import { Component, OnInit } from '@angular/core';[m
[32m+[m[32mimport { Component, OnInit } from "@angular/core";[m
 [m
 @Component({[m
[31m-  selector: 'app-header',[m
[31m-  templateUrl: './header.component.html',[m
[31m-  styleUrls: ['./header.component.sass'][m
[32m+[m[32m  selector: "app-header",[m
[32m+[m[32m  templateUrl: "./header.component.html",[m
[32m+[m[32m  styleUrls: ["./header.component.sass"][m
 })[m
 export class HeaderComponent implements OnInit {[m
[32m+[m[32m  constructor() {}[m
 [m
[31m-  constructor() { }[m
[31m-[m
[31m-  ngOnInit() {[m
[31m-  }[m
[31m-[m
[32m+[m[32m  ngOnInit() {}[m
 }[m
