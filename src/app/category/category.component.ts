import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { shakeAnimation } from '../service/animations.service';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [shakeAnimation],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {

  animationState: string = 'start';

  color: Array<string> = ["#572a97", "#4653ff", "#ffd975", "#fccbe1", 
  "#d7278b", "#c977d6", "#37f4f4", "#0d0c43", "#4058ae", "#495324", "#fef3c6"];

  categories: Array<any> = [];
  ctgName: string = '';
  ctgId: string = '';
  btnText: string = 'Add';

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {

    this.categoryService.loadCategories().subscribe((value) => {
      
      this.categories = value;
      console.log(this.categories);
    });

  }

  onSubmit(f:NgForm) {
    if (f.value.categoryName === '') {
      this.animationState = this.animationState === 'start' ? 'shake' : 'start';
    } else if (this.btnText === 'Add') {

      let randomColor = Math.floor(Math.random() * this.color.length);
      let todoCategory = {
        category: f.value.categoryName,
        colorCode: this.color[randomColor],
        todoCount: 0
      };    
      this.categoryService.saveCategory(todoCategory);
      f.resetForm();

    } else if (this.btnText === 'Edit') {

      this.categoryService.updateCategory(this.ctgId, f.value.categoryName);
      f.resetForm();
      this.btnText = 'Add';
      
    }
  }

  onEdit(category: string, id: string) {
    this.ctgName = category;
    this.btnText = 'Edit';
    this.ctgId = id;
  }

}
