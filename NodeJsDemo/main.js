import readline from 'readline-sync';
import fs, { read } from 'fs';
import { Employee } from './main2.js';
// --------------use of readline-sync-----------------
// let x = readline.question("enter your email")
// let y = readline.question("enter a password - having 8 character a Capital case and a special charcater")
// let z = readline.question("Confirm password")
// if(/[0-9]/.test(y) && /[A-Z]/.test(y) && /[!@#$%^&*(),.?":{}|<>]/.test && y.length>=8 && y===z){
//     console.log("password is okay");

// }
// else{
//     console.log("reset new password");
// }


// -------------------use of FS module----------------

// let x = readline.question("enter a text - ")
// fs.writeFileSync("demo.txt",x+"\n",{flag:"a+"});

// const data = fs.readFileSync("demo.txt");
// console.log(data.toString());

// ---------append data---------
// let appeded_data = readline.question("enter a text to be append")
// fs.appendFile("demo.txt",appeded_data,(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })

// const manish = new Employee(1,"harsh",45678)
// manish.display();


let x = readline.question("click 1 for adding employee - ")
if (x == 1) {
    let w = readline.question("Number of employee you want to add")
    for (let i = 0; i < w; i++) {
        let id = readline.question("Enter the id -")
        let name = readline.question("Enter the name - ")
        let salary = readline.question("Enter the salary - ")

        let employee = {
            id: id,
            name: name,
            salary: salary
        }

        let data;
        try {
            data = fs.readFileSync("dataset.json", "utf8");
        } catch (error) {
            data = "[]";
        }
        const emplarr = JSON.parse(data);

        emplarr.push(employee);

        fs.writeFileSync("dataset.json", JSON.stringify(emplarr));
    }
}
console.log("current Employees are");
const datasetvalues = JSON.parse(fs.readFileSync("dataset.json", "utf8"));

for (let i = 0; i < datasetvalues.length; i++) {
    const singemp = new Employee(datasetvalues[i].id, datasetvalues[i].name, datasetvalues[i].salary);
    singemp.display()
}
