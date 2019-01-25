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
    } catch (err) {
      console.log('error: ' + err);
    }
  }

  onKey(input) {
    this.userInput = input.target.value;
  }

  getInterface(res: any) {
    let intfAdd: any = {};
    const intf: any = {};

    // loop through each key in object
    for (const key in res) {

      // process nested object
      if (typeof(res[key]) === 'object') {

        const newIntf = key.charAt(0).toUpperCase() + key.substr(1);
        let temp;

        // process arrays
        if (Array.isArray(res[key])) {
          if (typeof(res[key][0]) !== 'object') {
            intf[key] = typeof(res[key][0]) + '[]';
            continue;
          }
          else {
            // if nested object, call this function recursively, until each
            // nested object is extracted
            temp = this.getInterface(res[key][0]);
            intf[key] = newIntf + '[]';
          }
        }
        else {
          temp = this.getInterface(res[key]);
          intf[key] = newIntf;
        }
        let saveAdd = true;
        for (const innerKey in intfAdd) {
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
    const intfRet = {
      main: intf,
      add: intfAdd
    };
    return intfRet;
  }

}
