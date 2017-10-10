$env = {
    todo: "",
    todos: [
        {title: 'Call dad...', desc: 'desc 1'},
        {title: 'Say happy birthday...', desc: 'desc 2'},
        {title: 'Mention goat commit...', desc: 'desc 3'}
    ],
    codes: [
        {type: "Javascript"},
        {type: "Html"}
    ],
    add: function () {
        this.todos.push({title:this.todo+"", desc: ''});
        goat.get('#todo').value = "";
    },
    remove: function (todo) {
        this.todos.splice(this.todos.indexOf(todo), 1);
    },
    setCode: function (i) {
        this.code = this.codes[i];
    }
};

function init () {
    goat.http.get("./tags/todo/todo.js", function (er, data) { $env.codes[0].val = data });
    goat.http.get("./tags/todo/todo.html", function (er, data) { $env.codes[1].val = data });
    $env.setCode(0);
}
init();
