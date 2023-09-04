import { Component, OnInit, ViewChild } from "@angular/core";
import { Todo } from "./interface";
import { TodosService } from "./todos.service";
import { CheckboxChangeEvent } from "primeng/checkbox";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("todoTask") todoTask: any;
  title = "primeNG";
  task = "";
  todos: Todo[] = [];

  constructor(private todoServ: TodosService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.todoServ.getTodos().subscribe((response) => {
      this.todos = response;
    });
  }
  updatedTodo(e: CheckboxChangeEvent, todo: Todo) {
    this.todoServ
      .updateTodos({ ...todo, completed: e.checked })
      .subscribe((res) => console.log(res));
  }
  delete(e: Event, id: Todo["id"]) {
    this.todoServ.deleteTodo(id).subscribe(
      response => this.getList()
    )
  }

  addTodo() {
    this.todoServ
      .addTodo({ task: this.task, completed: false })
      .subscribe((res) => {
        this.getList();
        this.todoTask.reset();
      });
  }
}
