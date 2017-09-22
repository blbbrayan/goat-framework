$env.todos = [
    {title: 'Call dad...', desc: 'desc 1'},
    {title: 'Say happy birthday...', desc: 'desc 2'},
    {title: 'Mention Zing commit...', desc: 'desc 3'}
];

$env.todo = "";

$env.add = function () {
    $env.todos.push({title:$env.todo+"", desc: ''});
    zing.get('#todo').value = "";
};

$env.remove = function (todo) {
    $env.todos.splice($env.todos.indexOf(todo), 1);
};