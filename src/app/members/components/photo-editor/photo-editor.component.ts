import {Component, Input, OnInit} from '@angular/core';
import {ApiUser} from '../../../types/commonTypes';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
    @Input() member: ApiUser;

  constructor() { }

  ngOnInit(): void {
  }

}
