import { Component, ViewChild } from "@angular/core";
import { Validators } from "@angular/forms";
import { FieldConfig } from "./field.interface";
import { DynamicFormComponent } from "./components/dynamic-form/dynamic-form.component";
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  json: any = {
    name: {
      label: 'Name',
      value: 'test',
      type: 'text',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 10
      },
    },
    age: {
      label: 'Age',
      value: 32,
      type: 'number'
    },
    email: {
      label: 'Email Address',
      value: null,
      type: 'email'
    },
    profilePic: {
      label: 'Profile Picture Upload',
      type: 'file'
    },
    comment: {
      label: 'comment',
      value: null,
      type: 'text',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 10
      },
    },
    gender: {
      label: 'Gender',
      value: 'M',
      type: 'radio',
      options: [
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' }
      ]
    },
    city: {
      label: 'City',
      value: '39010',
      type: 'select',
      options: [
        { label: '(choose one)', value: '' },
        { label: 'Bolzano', value: '39100' },
        { label: 'Meltina', value: '39010' },
        { label: 'Appiano', value: '39057' }
      ],
      validation: {
        required: true
      }
    }
  };


  components(fg: FormGroup) {
    if (fg.controls['gender'].value == 'F' && fg.controls['age'].value != '--') {
      fg.controls['age'].setValue('--');
      fg.controls['age'].disable();
    } else if (fg.controls['gender'].value == 'M' && !fg.controls['age'].enabled) {
      fg.controls['age'].enable();
      fg.controls['age'].setValue('');
    }
  }

  update($event) {
    // debugger;
    this.json = JSON.parse($event.target.value);
  }

  get rapidPageValue() {
    return JSON.stringify(this.json, null, 2);
  }

  set rapidPageValue(v) {
    try {
      this.json = JSON.parse(v);
    }
    catch (e) {
      console.log('error occored while you were typing the JSON');
    };
  }



  name = 'Angular';
  fields = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: "required",
          message: "Name Required"
        },
        {
          name: "pattern",
          validator: "^[a-zA-Z]+$",
          message: "Accept only text"
        }
      ]
    }, {
      type: "password",
      label: "Password",
      inputType: "text",
      name: "name",
      validations: [
        {
          name: "required",
          validator: "required",
          message: "Password Required"
        }
      ]
    }
  ];


  dynamicForm: FormGroup;
  dynamicFormm: FormGroup;
  constructor() {
    const controls = {}; const controlss = {};
    this.fields.forEach(res => {
      const validationsArray = [];
      res.validations.forEach(val => {
        if (val.name === 'required') {
          validationsArray.push(
            Validators.required
          );
        }
        if (val.name === 'pattern') {
          validationsArray.push(
            Validators.pattern(val.validator)
          );
        }
      });
      controls[res.label] = new FormControl('', validationsArray);
    });
    this.dynamicForm = new FormGroup(
      controls
    );
    console.log("temp.fields", this.temp.fields);

    this.temp.fields.forEach(res => {
      const tempFiledsValidationsArray = [];

      if (res.validation.isMandatory) {
        console.log("valid result", res.validation.isMandatory)
        tempFiledsValidationsArray.push(
          Validators.required
        );
      }
      switch (res.validation.stringType) {
        case "alpha":
          tempFiledsValidationsArray.push(
            Validators.pattern("^[A-Za-z]+$")//only alphabets
          );
          break;
        case "alphanumeric":
          tempFiledsValidationsArray.push(
            Validators.pattern("([A-z0-9a-z\s]){2,}")// alphanumeric
          );
          break;
        case "all":
          tempFiledsValidationsArray.push(
            Validators.pattern(".{2,}")//all
          );
          break;


        default:
          tempFiledsValidationsArray.push(
            Validators.pattern(".{2,}")//all
          );
          break;
      }

      if (res.validation.minInclusive && res.validation.maxInclusive) {
        tempFiledsValidationsArray.push(
          Validators.min(res.validation.minInclusive),
          Validators.max(res.validation.maxInclusive)
        );
        console.log("res.validation.minInclusive", tempFiledsValidationsArray);
      }

      // if (res.name === 'pattern') {
      //   validationsArray.push(
      //     Validators.pattern(res.validator)
      //   );
      // }

      controlss[res.label] = new FormControl('', tempFiledsValidationsArray);
    });
    console.log("controlss ++ ", controlss)
    this.dynamicFormm = new FormGroup(
      controlss
    );


  }

  onSubmit() {
    console.log("newForm value", this.dynamicFormm.value);
  }


  temp = {
    "name": "Contact Us",
    fields: [{
      label: "Name",
      name: "Name",
      id: "name",
      type: "text",
      validation: {
        isMandatory: true,
        stringType: "alpha" // (other values - alphaNumeric, all)
      }
    },
    {
      label: "Age",
      name: "Age",
      id: "age",
      type: "number",
      validation: {
        // pattern:"[1-9]*",
        isMandatory: false,
        minInclusive: 10,
        maxInclusive: 20,
      }
    },
    {
      label: "City",
      name: "City",
      id: "city",
      selectBox: true,
      type: "select",
      values: ["Chennai", "Bangalore", "Coimbatore"],
      validation: {
        isMandatory: true,
        isMultiSelection: false
      }
    },
    {
      label: "Email",
      name: "Email",
      id: "email",
      type: "email",
      validation: {
        isMandatory: true,
      }
    }
    ]

  };




}