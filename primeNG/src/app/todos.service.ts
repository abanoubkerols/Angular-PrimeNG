import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Todo } from "./interface";

@Injectable({
  providedIn: "root",
})
export class TodosService {
  baseUrl = "http://localhost:3000";
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(`${this.baseUrl}/todo`);
  }
  updateTodos(postData: Todo) {
    return this.http.patch<Todo>(`${this.baseUrl}/todo/${postData.id}`, postData);
  }

  deleteTodo(id: Todo["id"]) {
    return this.http.delete(`${this.baseUrl}/todo/${id}` );
  }

  addTodo(postData: Todo){
    return this.http.post(`${this.baseUrl}/todo` , postData )
  }
}
