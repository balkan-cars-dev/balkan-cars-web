import {Component, Input} from '@angular/core';
import {BlogInterface} from '../../Interfaces/blog-interface';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-blog-component',
  imports: [
    DatePipe
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  @Input()blog!: BlogInterface;

}
