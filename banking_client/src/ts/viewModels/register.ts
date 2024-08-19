import ko = require("knockout");
import * as AccUtils from "../accUtils";
import 'ojs/ojknockout';
import 'ojs/ojtable';
import "oj-c/input-text";
import "ojs/ojknockout";
import "oj-c/input-number";
import "oj-c/button";
import "oj-c/form-layout"


class RegisterViewModel {
    firstname: ko.Observable<string> | ko.Observable<any>;
    lastname: ko.Observable<string> | ko.Observable<any>;
    username: ko.Observable<string> | ko.Observable<any>;
    address: ko.Observable<string> | ko.Observable<any>;
    city: ko.Observable<string> | ko.Observable<any>;
    state: ko.Observable<string> | ko.Observable<any>;
    pin_code: ko.Observable<number> | ko.Observable<any>;
    phone: ko.Observable<number> | ko.Observable<any>;
    password: ko.Observable<string> | ko.Observable<any>;
    email: ko.Observable<string> | ko.Observable<any>;

    constructor() {
        this.firstname = ko.observable(null);
        this.lastname = ko.observable(null);
        this.username = ko.observable(null);
        this.address = ko.observable(null);
        this.city = ko.observable(null);
        this.state = ko.observable(null);
        this.pin_code = ko.observable(null);
        this.phone = ko.observable(null);
        this.password = ko.observable(null);
        this.email = ko.observable(null);
    }


    public input_handler = async () => {
        const row = {
            first_name : this.firstname(),
            last_name : this.lastname(),
            username : this.username(),
            address_1 : this.address(),
          
            city :  this.city(),
            state : this.state(),
            pin_code :  this.pin_code(),
            phone_number :  this.phone(),
            password  : this.password(),
            email :  this.email(),
            Status: "Pending",
            no_of_attempts: 0
        }
        let url = 'http://localhost:8080/api/customer/addcustomer';

        const req = new Request(url, {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(row),
            method: "POST"
        })

        const response = await fetch(req);
        const addedRow = await response.json();
        console.log(addedRow);

    }

}



export = RegisterViewModel