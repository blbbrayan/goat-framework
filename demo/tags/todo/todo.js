$env.todos = [{title: 'title 1', desc: 'desc 1'}, {title: 'title 2', desc: 'desc 2'}];

$env.todo = "";

$env.add = function () {
    $env.todos.push({title:$env.todo+"", desc: ''});
    zing.get('#todo').value = "";
};

$env.remove = function (todo) {
    $env.todos.splice($env.todos.indexOf(todo), 1);
};