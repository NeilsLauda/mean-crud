import { EmployeeService } from './../../service/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Employee } from '../../models/employee';


declare var M: any;
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form?: NgForm) {
    console.log(form.value);
    if (form.value._id) {
      this.employeeService.putEmployee(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getEmployees();
          console.log(res);
          M.toast({ html: 'Updated Successfully' });
        });
    } else {
      this.employeeService.postEmployee(form.value)
        .subscribe(res => {
          console.log(res);
          this.getEmployees();
          this.resetForm(form);
          M.toast({ html: 'save Successfuly' });
        });
    }
  }

  getEmployees() {
    this.employeeService.getEmployees()
      .subscribe(res => {
        this.employeeService.employees = res as Employee[];
        console.log(res);
      });
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
  }

  deleteEmployee(_id: string) {
    if (confirm('Are you sure want to delete it ?')) {
      this.employeeService.deleteEmployee(_id)
        .subscribe(res => {
          console.log(res);
          this.getEmployees();
        });
    }
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }

}
