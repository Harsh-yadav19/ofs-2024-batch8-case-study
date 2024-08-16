/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import * as AccUtils from "../accUtils";
import * as ko from "knockout";
import "oj-c/input-text";
import "ojs/ojknockout";
import "oj-c/input-number";
import 'oj-c/form-layout';
import 'oj-c/input-password';
import "ojs/ojdatetimepicker";
import "oj-c/radioset";
import "oj-c/button";



class DashboardViewModel {
  currentColor: ko.Observable<string>;
  colorOptions: Array<{ value: string; label: string }>;
  firstname: ko.Observable<string> | ko.Observable<any>;
  lastname: ko.Observable<string> | ko.Observable<any>;
  salary: ko.Observable<Number> | ko.Observable<any>;
  passvalue: ko.Observable<string> | ko.Observable<any>;
  datevalue: ko.Observable<string> | ko.Observable<any>;
  activatedButton: ko.Observable<string>;

  constructor() {
    this.currentColor = ko.observable("red");
    this.colorOptions = [
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
      { value: "red", label: "Red" },
      { value: "lime", label: "Lime" },
      { value: "aqua", label: "Aqua" },
    ];
    this.activatedButton = ko.observable("(None activated yet)");
  

    this.firstname = ko.observable(null);
    this.lastname = ko.observable(null);
    this.salary = ko.observable(null);
    this.passvalue = ko.observable(null);
    this.datevalue = ko.observable(null);
  }

  public buttonAction = (event: Event) => {
    this.activatedButton((event.currentTarget as HTMLElement).id);
    console.log(event);
    return true;
  };

  public buttonAction2 = (event: Event) => {
    this.activatedButton((event.currentTarget as HTMLElement).id);
    console.log(event);
    return true;
  };

}

export = DashboardViewModel;
