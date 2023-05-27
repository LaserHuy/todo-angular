import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { shakeAnimation } from '../service/animations.service';
import { NgForm } from '@angular/forms';
import { TodoService } from '../service/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  animations: [shakeAnimation],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit {

  animationState: string = 'start';

  ctgId: string = '';
  taskValue: string = '';
  tasks: Array<any> = [];
  btnText: string = 'Add';
  taskId: string = '';
  ctgName: string = '';

  constructor(private todoService: TodoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.ctgId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    this.todoService.loadTodos(this.ctgId).subscribe((value) => {
      this.tasks = value;
      console.log(this.tasks);
    });

    this.todoService.loadNameCategory(this.ctgId).subscribe((value) => {
      this.ctgName = JSON.parse(JSON.stringify(value)).data.category;
    });

  }

  onSubmit(f:NgForm) {
    if (f.value.todoText === '' || f.value.todoText === null) {
      this.animationState = this.animationState === 'start' ? 'shake' : 'start';
    } else if (this.btnText === 'Add') {

      let todo = {
        todo: f.value.todoText,
        isCompleted: false,
      };
      this.todoService.saveTodo(this.ctgId, todo);
      f.reset();

    } else if (this.btnText === 'Edit') {

      this.todoService.updateTask(this.taskId, this.ctgId, f.value.todoText);
      f.reset();
      this.btnText = 'Add';

    }
  }

  onEdit(todo: string, id: string) {
    this.taskValue = todo;
    this.btnText = 'Edit';
    this.taskId= id;
  }

  onDelete(id: string) {
    this.todoService.deleteTask(id, this.ctgId);
  }

  onCompleted(id: string) {
    this.todoService.markCompleted(id, this.ctgId);
  }

  onUncompleted(id: string) {
    this.todoService.markUncompleted(id, this.ctgId);
  }

}
