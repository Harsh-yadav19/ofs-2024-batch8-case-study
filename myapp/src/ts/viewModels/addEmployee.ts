import * as ko from "knockout";
import * as AccUtils from "../accUtils";
import 'ojs/ojknockout';
import 'ojs/ojtable';
import "oj-c/input-text";
import "ojs/ojknockout";
import "oj-c/input-number";
import "oj-c/button";


import MutableArrayDataProvider = require('ojs/ojmutablearraydataprovider');

import { RESTDataProvider } from 'ojs/ojrestdataprovider';
import { option } from "@oracle/oraclejet/ojlogger";
import { ojTable } from "ojs/ojtable";

type D = { "id": number, "name": string, "username": string }
type K = D["id"]

class AddEmployeeViewModel {
    id: ko.Observable<number> | ko.Observable<any>
    name: ko.Observable<string> | ko.Observable<any>
    salary: ko.Observable<number> | ko.Observable<any>
    dataprovider: RESTDataProvider<K, D>
    keyAttributes: ko.Observable<string>
    isupdate: ko.Observable<boolean>

    constructor() {
        this.id = ko.observable(null)
        this.isupdate = ko.observable(false);
        this.name = ko.observable(null);
        this.salary = ko.observable(null);

        this.keyAttributes = ko.observable("id");

        this.dataprovider = new RESTDataProvider({
            keyAttributes: this.keyAttributes(),
            url: 'http://localhost:8080/employees',
            transforms: {
                fetchFirst: {
                    request: async (options) => {
                        const url = new URL(options.url);
                        return new Request(url.href)
                    },
                    response: async ({ body }) => {
                        let data = body.result
                        return { data }
                    }
                }
            }
        })
    }

    public input_handler = async () => {
        const row = {
            name: this.name(),
            salary: this.salary()
        }
        let url = 'http://localhost:8080/employees/add';

        const req = new Request(url, {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(row),
            method: "POST"
        })

        const response = await fetch(req);
        const addedRow = await response.json();

        const addedRowIndex = addedRow.index;
        // console.log("addedRowIndex - ",[addedRowIndex]);
        const addedRowKey = addedRow[this.keyAttributes()];
        // console.log("addedRowKey - ",addedRowKey);
        const addedRowMetaData = { key: addedRowKey };
        // console.log("addedRowMetaData - ", addedRowMetaData);
        this.dataprovider.mutate({
            add: {
                data: [addedRow],
                indexes: [addedRowIndex],
                keys: new Set([addedRowKey]),
                metadata: [addedRowMetaData],
            },
        });
        this.name("");
        this.salary(null);
    }

    public delete_handler = async (e: Event) => {
        const target = e.target as HTMLElement | null;

        if (target != null) {
            const id = target.getAttribute('data-row-info');

            let url = `http://localhost:8080/employees/delete/${id}`;

            const req = new Request(url, {
                headers: new Headers({
                    "Content-type": "application/json; charset=UTF-8",
                }),
                method: "Delete"
            })
            this.dataprovider.refresh()
            const response = await fetch(req);
            const deletedRow = await response.json();

            const deletedRowIndex = deletedRow.index;
            // console.log("addedRowIndex - ",[deletedRowIndex]);
            const deletedRowKey = deletedRow[this.keyAttributes()];
            // console.log("addedRowKey - ",deletedRowKey);
            const deletedRowMetaData = { key: deletedRowKey };
            // console.log("addedRowMetaData - ", deletedRowMetaData);

            this.dataprovider.mutate({
              remove: {
                data: [deletedRow],
                indexes: [deletedRowIndex],
                keys: new Set([deletedRowKey]),
                metadata: [deletedRowMetaData],
              },
            });
        }

    }

    public decision = () =>{
        if(this.isupdate()){
            this.update_handler_exe();
        }
        else{
            this.input_handler()
        }
    }

    public update_handler_exe = async () => {
        console.log("update_handler_exe");

        const row = {
            id: this.id(),
            name: this.name(),
            salary: this.salary()
        }
        let url = 'http://localhost:8080/employees/updateemp';

        const req = new Request(url, {
            headers: new Headers({
                "Content-type": "application/json; charset=UTF-8",
            }),
            body: JSON.stringify(row),
            method: "PUT"
        })

        const response = await fetch(req);
        const UpdatedRow = await response.json();

        const addedRowIndex = UpdatedRow.index;
        // console.log("addedRowIndex - ",[addedRowIndex]);
        const addedRowKey = UpdatedRow[this.keyAttributes()];
        // console.log("addedRowKey - ",addedRowKey);
        const addedRowMetaData = { key: addedRowKey };
        // console.log("addedRowMetaData - ", addedRowMetaData);
        this.dataprovider.mutate({
            update: {
                data: [UpdatedRow],
                indexes: [addedRowIndex],
                keys: new Set([addedRowKey]),
                metadata: [addedRowMetaData],
            },
        });
        this.name("");
        this.salary(null);
        this.dataprovider.refresh()
        this.isupdate = ko.observable(false);

    }


    public update_handler =  (e: Event) => {
        this.isupdate = ko.observable(true);
        console.log("update handler true false - ", this.isupdate());
        const target = e.target as HTMLElement | null;

        if (target != null) {
            const id = target.getAttribute('data-row-id');
            const name = target.getAttribute('data-row-name');
            const salary = target.getAttribute('data-row-salary');
            console.log(typeof (salary));
            this.name(name);
            if (salary != null && id !=null) {
                this.id(parseInt(id));
                this.salary(parseInt(salary));
            }

           
        }
    }

}


export = AddEmployeeViewModel;


// actionListener = (event: ojMenu.ojMenuAction) => {
//     event.detail.originalEvent.stopPropagation();
//   };

//   menuListener = (
//     event: ojMenu.ojMenuAction,
//     context: ojTable.CellTemplateContext<EmployeeData['EmployeeId'], EmployeeData>
//   ) => {
//     const rowIndex = this.deptArray.indexOf(context.item.data);
//     const rowData = context.item.data;
//     const eventValue = event.detail.selectedValue;
//     if (eventValue === 'delete') {
//       this.deptArray.splice(rowIndex, 1);
//     } else if (eventValue === 'approve') {
//       rowData.Status = 'Approved';
//       this.deptArray.splice(rowIndex, 1, rowData);
//     } else if (eventValue === 'pending') {
//       rowData.Status = 'Pending';
//       this.deptArray.splice(rowIndex, 1, rowData);
//     }
//     this.dataprovider.data = this.deptArray;
//   };