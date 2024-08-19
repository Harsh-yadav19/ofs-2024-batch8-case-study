import ko = require("knockout");
import * as AccUtils from "../accUtils";
import 'ojs/ojknockout';
import 'ojs/ojtable';
import "oj-c/input-text";
import "ojs/ojknockout";
import "oj-c/input-number";
import "oj-c/button";
import 'oj-c/input-password';

class LoginViewModel {

    username: ko.Observable<string> | ko.Observable<any>;

    password: ko.Observable<string> | ko.Observable<any>;


    constructor() {

        this.username = ko.observable(null);

        this.password = ko.observable(null);

    }

    public input_handler = async () => {
        const row = {
            username: this.username(),
            password: this.password(),

        }
        let url = 'http://localhost:8080/api/customer/logincustomer';

        const req = new Request(url, {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(row),
            method: "POST"
        })

        const response = await fetch(req);

        const addedRow = await response.json();
        const final_data = JSON.stringify(addedRow);
        console.log(addedRow);
        if (addedRow.username === "Invalid") {
            window.alert("Invalid username")
        }
        else if (addedRow.username === "Blocked") {
            window.alert("Customer is Blocked")
        }
        else {
            localStorage.setItem("customer_login", final_data)
            // Data exists, so navigate to a different URL
            window.location.href = "?ojr=dashboard";

        }

    }
}

export = LoginViewModel