$env = {};

//init
$env.todos = [
    {title: 'Call dad...', desc: 'desc 1'},
    {title: 'Say happy birthday...', desc: 'desc 2'},
    {title: 'Mention Zing commit...', desc: 'desc 3'}
];

$env.codes = [
    {type: "Javascript"},
    {type: "Html"}
];

$env.todo = "";

//functions
$env.add = function () {
    $env.todos.push({title:$env.todo+"", desc: ''});
    zing.get('#todo').value = "";
};

$env.remove = function (todo) {
    $env.todos.splice($env.todos.indexOf(todo), 1);
};

$env.setCode = function (i) {
    $env.code = $env.codes[i];
};

function init () {
    zing.http.get("./tags/todo/todo.js", function (er, data) { $env.codes[0].val = data });
    zing.http.get("./tags/todo/todo.html", function (er, data) { $env.codes[1].val = data });
    $env.setCode(0);
}
init();
