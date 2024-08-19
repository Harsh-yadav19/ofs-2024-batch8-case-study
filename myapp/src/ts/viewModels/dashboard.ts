/**
 * @license
 * Copyright (c) 2014, 2024, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
import 'my-component/loader';
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
import "oj-c/progress-circle";
import 'oj-c/avatar';
import 'oj-c/list-item-layout';
import 'oj-c/list-view';
import ArrayDataProvider = require('ojs/ojarraydataprovider');



class DashboardViewModel {





  currentColor: ko.Observable<string>;
  colorOptions: Array<{ value: string; label: string }>;
  firstname: ko.Observable<string> | ko.Observable<any>;
  lastname: ko.Observable<string> | ko.Observable<any>;
  salary: ko.Observable<Number> | ko.Observable<any>;
  passvalue: ko.Observable<string> | ko.Observable<any>;
  datevalue: ko.Observable<string> | ko.Observable<any>;
  activatedButton: ko.Observable<string>;
  ID_user: ko.Observable<Number> | ko.Observable<any>;
  Data_name: ko.Observable<string> | ko.Observable<any>;
  Data_Id: ko.Observable<any>;
  Data_username: ko.Observable<any>;
  Data_email: ko.Observable<any>;
  


  constructor() {
    this.ID_user = ko.observable(null);
    this.Data_name = ko.observable(null);
    this.Data_Id = ko.observable(null);
    this.Data_username = ko.observable(null);
    this.Data_email = ko.observable(null);

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

  
  private readonly data = [
    {
      id: 1,
      name: 'Chris Black',
      title: 'Oracle Cloud Infrastructure GTM Channel Director EMEA',
      image: '../images/hcm/placeholder-male-01.png'
    },
    {
      id: 2,
      name: 'Christine Cooper',
      title: 'Senior Principal Escalation Manager',
      image: '../images/hcm/placeholder-female-01.png'
    },
    {
      id: 3,
      name: 'Chris Benalamore',
      title: 'Area Business Operations Director EMEA & JAPAC',
      image: '../images/hcm/placeholder-male-03.png'
    },
    {
      id: 4,
      name: 'Christopher Johnson',
      title: 'Vice-President HCM Application Development',
      image: '../images/hcm/placeholder-male-04.png'
    },
    {
      id: 5,
      name: 'Samire Christian',
      title: 'Consulting Project Technical Manager',
      image: '../images/hcm/placeholder-male-05.png'
    },
    {
      id: 6,
      name: 'Kurt Marchris',
      title: 'Customer Service Analyst',
      image: '../images/hcm/placeholder-male-06.png'
    },
    {
      id: 7,
      name: 'Zelda Christian Cooperman',
      title: 'Senior Principal Escalation Manager',
      image: '../images/hcm/placeholder-female-02.png'
    }
  ];

  readonly dataProvider = new ArrayDataProvider(this.data! as any[], {
    keyAttributes: 'value'
  });

    

  public buttonAction = (event: Event) => {
    this.activatedButton((event.currentTarget as HTMLElement).id);
    console.log(event);
    return true;
  };

  

  public buttonAction2 = (event: Event) => {
    this.activatedButton((event.currentTarget as HTMLElement).id);
    let btn = document.getElementById("button2");
    btn?.setAttribute("chroming", "danger");

  };

  public input_handler = (event: Event) => {
    let btn = document.getElementById("datashow") as HTMLElement;
    if (btn != null) {
      btn.style.visibility = "visible";
    }
    // btn?.setAttribute("chroming", "danger");
  };

  public getdata = async (e: Event) => {

    let btn = document.getElementById("button_getData") as HTMLElement;
    if (btn != null ) {
      btn.style.visibility = "hidden";
    }
    let url = `https://jsonplaceholder.typicode.com/users/${this.ID_user()}`
    let dataset;
    let jsondata;

    let progerssbarVisibility = document.getElementById("progressCircle") as HTMLElement;
    if (progerssbarVisibility != null) {
      progerssbarVisibility.style.visibility = "visible";
    }

    setTimeout(() => {
      let progerssbarVisibility = document.getElementById("progressCircle") as HTMLElement;
      if (progerssbarVisibility != null) {
        progerssbarVisibility.style.visibility = "hidden";
      }
    },4000)

    setTimeout(async () => {
      dataset = await fetch(url);
      jsondata = await dataset.json();
     
      this.Data_Id(jsondata.id);
      this.Data_name(jsondata.name.split(" ")[0]);
      this.Data_username(jsondata.username);
      this.Data_email(jsondata.email);

      let btn = document.getElementById("button_getData") as HTMLElement;
      if (btn != null && jsondata !== null) {
        btn.style.visibility = "visible";
      }
   
    },4000)

    console.log(jsondata);

   

  }




}

export = DashboardViewModel;
