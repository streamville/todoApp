var todoList = {
    todos: [],
    
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },

    changeTodo: function(position, todoText){
        this.todos[position].todoText = todoText;
    },

    deleteTodo: function(position){
        this.todos.splice(position, 1);
    },

    toggleCompleted: function(position){
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },

    toggleAll: function(){
        var totalTodos = this.todos.length;
        var completedTodos = 0;

        // Get number of completed todos.
        this.todos.forEach(function(todo){
            if(todo.completed === true){
                completedTodos++;
            }
        });

        this.todos.forEach(function(todo){
        // Case 1: if everything is true, make everything false.
        if(completedTodos === totalTodos){
            todo.completed = false;
        } else {
            // Case 2: Otherwise, make evertyhing true.
            todo.completed = true;
            }
        });
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
    deleteTodo: function(position){
        todoList.deleteTodo(position);
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

        /* displayTodos is the method that actually renders all the todos that is being inputted. */
      displayTodos: function(){
        var todoUl = document.querySelector('ul');
        
        // clearing the list so it doesn't render extra li.
        todoUl.innerHTML = '';

        todoList.todos.forEach(function(todo,position){
            var todoLi = document.createElement('li');
            var todo = todoList.todos[position];
            var todoTextWithCompletion  = '';

            if(todo.completed === true){
                todoTextWithCompletion = '(x) ' + todo.todoText;
            } else {
                todoTextWithCompletion = '( ) ' + todo.todoText;
            }

        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        // Append the delete button.
        todoLi.appendChild(this.createDeleteBtn());
        todoUl.appendChild(todoLi);
        }, this);
    },

    /* New method for creating the delete button */
    createDeleteBtn: function(){
        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'deleteBtn';
        return deleteBtn;
    },
    setupEventListeners: function(){
        var todoUl = document.querySelector('ul');
            todoUl.addEventListener('click', function(){
            console.log(event.target.parentNode.id);

            // Get the element that was clicked on.
            var elementClicked = event.target;

            // Check if elementClicked is a delete button.
            if(elementClicked.className === 'deleteBtn'){
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
                }
            });
        }
};
view.setupEventListeners();
