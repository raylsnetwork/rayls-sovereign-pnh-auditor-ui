import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectOption } from '../../types';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input()
  public defaultOption: SelectOption = {
    value: '',
    viewValue: 'Please select your option'
  };

  @Input()
  public options: SelectOption[];

  @Output() 
  public onOptionChange: EventEmitter<string> = new EventEmitter<string>();

  public form: FormGroup;

  public option: string;

  public isFocused: boolean = false;

  public onFocus = () => { this.isFocused = true };

  public onBlur = () => { this.isFocused = false };

  public constructor(
    private formBuilder: FormBuilder
  ) {
  }

  public ngOnInit(): void {
    if (this.defaultOption) 
      this.option = String(this.defaultOption.value);

    this.initForm();
    this.subscribeToValueChanges();
  }

  public initForm() {
    this.form = this.formBuilder.group({
      option: [this.option]
    });
  }

  public subscribeToValueChanges() {
    this.form.controls['option'].valueChanges.subscribe((option) => {
      this.option = option;
      this.onOptionChange.emit(this.option);
    })
  }
}
