'use client';

import React from "react";

import { observer } from "mobx-react-lite";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  Checkbox,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import EditIcon from "@mui/icons-material/Edit";

import todoStore from "../../stores/TodoStore";


const TodoApp = observer(() => {

  const add = () => {
    todoStore.addTodo(); 
  };

  const todoOnChange = (e) => {
    const value = e.target.value;
    console.log("value:", value);
    todoStore.setData(value);
  };

  const save = () => {
    todoStore.saveEditedTodo(); 
  };
 

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", padding: 4, textAlign: "center" }}>

      <Typography variant="h4" gutterBottom>
        Todo App
      </Typography>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 3 }}>

        <TextField
          value={todoStore.tempTodo} 
          label={todoStore.editingId ? "Edit Todo" : "Add Todo"}
          variant="outlined"
          size="small"
          onChange={todoOnChange}
          sx={{ marginRight: 2, flex: 1 }} 
        />

        <Button
          variant="contained"
          onClick={todoStore.editingId ? save : add} 
          sx={{ flexShrink: 0 }} 
        >
          {todoStore.editingId ? "Save" : "Add"}
        </Button>

      </Box>

      <List sx={{ padding: 0 }}>

        {todoStore.todos.map((todo) => (

          <ListItem
            key={todo.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 0",  
              borderBottom: "1px solid #ddd",  
            }}
          >

            <Box sx={{ display: "flex", alignItems: "center" }}>

              <Checkbox
                checked={todo.completed}
                onChange={() => todoStore.toggleTodo(todo.id)}
                sx={{ marginRight: 2 }} 
              />

              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  marginLeft: 1,
                  fontWeight: todo.completed ? "normal" : "bold", 
                }}
              >
                {todo.text}
              </Typography>

            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>

              <IconButton
                color="primary"
                onClick={() => todoStore.startEditing(todo.id)}
                sx={{ padding: 1 }}
              >
                <EditIcon />

              </IconButton>

              <IconButton
                color="secondary"
                onClick={() => todoStore.removeTodo(todo.id)}
                sx={{ padding: 1 }}
              >
                <DeleteIcon />

              </IconButton>

            </Box>
            
          </ListItem>
        ))}
      </List>
    </Box>
  );
});

export default TodoApp;
