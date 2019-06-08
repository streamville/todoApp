var todoList = {
    todos: [],
    
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    this.displayTodos();
    },

    changeTodo: function(position, todoText){
        this.todos[position].todoText = todoText;
        this.displayTodos();
    },

    deleteTodo: function(position){
        this.todos.splice(position, 1);
        this.displayTodos();
    },

    toggleCompleted: function(position){
        var todo = this.todos[position];
        todo.completed = !todo.completed;
        this.displayTodos();
    },

    toggleAll: function(){
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        //get number of completed todos.
        for(var i = 0; i < totalTodos; i++){
            if(this.todos[i].completed === true){
                completedTodos++;
            }
        }
        // Case 1: if everything is true, make everything false.
        if(completedTodos === totalTodos){
            for(var i = 0; i < totalTodos; i++){
                this.todos[i].completed = false;
            }
        // Case 2: Otherwise, make evertyhing true.
        } else {
            for(var i = 0; i < totalTodos; i++){
                this.todos[i].completed = true;
            }
        }
        this.displayTodos();
    }
};

// onclick handlers buttons.
var handlers = {
    addTodo: function(){
        var addTodoInput = document.getElementById('addTodoInput');
        todoList.addTodo(addTodoInput.value);
        // clearing input box.
        addTodoInput.value = '';
        view.displayTodos();
    },
    changeTodo: function(){
        var changePosition = document.getElementById('changePosition');
        var changeText= document.getElementById('changeText');
        todoList.changeTodo(changePosition.valueAsNumber, changeText.value);
        changePosition.value = '';
        changeText.value = '';
        view.displayTodos();
    },
    deleteTodo: function(){
        var deletePosition = document.getElementById('deletePosition');
        todoList.deleteTodo(deletePosition.valueAsNumber);
        deletePosition.value = '';
        view.displayTodos();
    },
    toggleCompleted: function(){
        var toggleCompleted = document.getElementById('toggleCompleted');
        todoList.toggleCompleted(toggleCompletedPosition.valueAsNumber);
        toggleCompletedPosition.value = '';
        view.displayTodos();
    },
    toggleAll: function(){
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function(){
        var todoUl = document.querySelector('ul');
        // clearing the list so it doesn't render extra li.
        todoUl.innerHTML = '';
        for(var i = 0; i < todoList.todos.length; i++){
            var todoLi = document.createElement('li');
            var todo = todoList.todos[i];
            var todoTextWithCompletion  = '';

            if(todo.completed === true){
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }
            todoLi.textContent = todoTextWithCompletion;
            todoUl.appendChild(todoLi);
        }
    }
};