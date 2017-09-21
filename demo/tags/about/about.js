$env.todoInput = "";
$env.todos = [
    "Go to the mall"
];
$env.createTodo = function () {
    $env.todos.push($env.todoInput);
    $env.todoInput = "";
    console.log($env.todos);
};