import { Component, OnInit } from '@angular/core';
import * as jsonic from 'jsonic';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  displayOutput: any;
  arrayOfKeys: any;

  constructor() { }

  ngOnInit() {
  }

  onKey(input) {
    try {
      this.displayOutput = this.getInterface(jsonic(input.target.value));
      this.arrayOfKeys = Object.keys(this.displayOutput.add);
    }
    catch {
      console.log('error');
    }
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


//https://stackoverflow.com/questions/35647365/how-to-display-json-object-using-ngfor
/*
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}
*/
