import { makeAutoObservable } from "mobx";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

class TodoStore {
  todos: Todo[] = []; 
  tempTodo: string = "";
  editingId: number | null = null; 

  constructor() {
    makeAutoObservable(this);
  }

  setData(value: string) {
    this.tempTodo = value;
  }


  addTodo() {
    if (this.tempTodo.trim() !== "") {
      const exists = this.todos.some(todo => todo.text === this.tempTodo.trim());
      
      if (!exists) {
        this.todos.push({
          id: Date.now(),
          text: this.tempTodo,
          completed: false,
        });
        this.tempTodo = ""; 
      } else {
        alert("Girilen ifade mevcut!");
      }
    }
  }
  

  toggleTodo(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  startEditing(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      this.editingId = id;
      this.tempTodo = todo.text;
    }
  }

  saveEditedTodo() {
    const todo = this.todos.find((todo) => todo.id === this.editingId);
    if (todo) {
      todo.text = this.tempTodo;
      this.editingId = null;
      this.tempTodo = "";
    }
  }
}

const todoStore = new TodoStore();
export default todoStore;
