import { Component, OnInit } from '@angular/core';
import * as jsonic from 'jsonic';
import { KeysPipe } from './keys.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  displayOutput: any;
  userInput: string;

  constructor() { }

  ngOnInit() {
  }

  submit() {
    try {
      this.displayOutput = this.getInterface(jsonic(this.userInput));
    }
    catch {
      console.log('error');
    }
  }

  onKey(input) {
    this.userInput = input.target.value;
  }

  getInterface(res: any) {
    let intfAdd: any = {};
    let intf: any = {};
    for (let key in res) {
      if (typeof(res[key]) === 'object') {
        let newIntf = key.charAt(0).toUpperCase() + key.substr(1);
        let temp;
        if (Array.isArray(res[key])) {
          temp = this.getInterface(res[key][0]);
          intf[key] = newIntf + '[]';
        }
        else {
          temp = this.getInterface(res[key]);
          intf[key] = newIntf;
        }
        let saveAdd: boolean = true;
        for (let innerKey in intfAdd) {
          if (JSON.stringify(intfAdd[innerKey]) === JSON.stringify(temp.main)) {
             intf[key] = Array.isArray(res[key]) ? innerKey + '[]' : innerKey;
             saveAdd = false;
          }
        }
        if (saveAdd) {
          intfAdd[newIntf] = temp.main;
        }
        intfAdd = Object.assign({}, intfAdd, temp.add);
      }
      else {
        intf[key] = typeof(res[key]);
      }
    }
    let intfRet = {
      main: intf,
      add: intfAdd
    }
    return intfRet;
  }

}
