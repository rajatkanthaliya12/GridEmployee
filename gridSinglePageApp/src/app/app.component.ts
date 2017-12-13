import {Component, OnInit} from '@angular/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  p = 1;
  data: any;
  selected = [];
  selectAll = false;

  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.api.getData().subscribe(data => {
      this.data = data;
      console.log(data);
    });
  }

  calSalary(salary) {
    const sal = parseFloat(salary.basic ? salary.basic : '0') + parseFloat(salary.allowance ? salary.allowance : '0') - parseFloat(salary.deduction ? salary.deduction : '0');
    return sal;
  }

  exist(item) {
    return (this.selected.indexOf(item) > -1);
  }

  toggleSelection(e, item) {
    const id = this.selected.indexOf(item);
    if (id > -1) {
      this.selected.splice(id, 1);
      this.selectAll = false;
    } else {
      this.selected.push(item);
    }
    e.stopPropagation();
  }

  checkAll() {
    if (!this.selectAll) {
      this.data.forEach(item => {
        const id = this.selected.indexOf(item);
        if (id >= 0) {
          return true;
        } else {
          this.selected.push(item);
        }
      });
    } else {
      this.selected = [];
    }
  }

  delete() {
    if (this.selectAll) {
      this.data = [];
    } else {
      this.selected.forEach(item => {
        const id = this.data.indexOf(item);
        if (id > -1) {
          this.data.splice(id, 1);
        }
      });
    }
  }

}
