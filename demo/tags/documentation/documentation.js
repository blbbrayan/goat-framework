function parseTokens(str) {
    var tokens = {
        "%n": "\n\n"
    };
    Object.keys(tokens).forEach(function (token) {
        str = str.split(token).join(tokens[token]);
    });
    return str;
}

function Article(name, text, example) {
    this.name = name;
    this.text = parseTokens(text);
    if(example)
        this.example = parseTokens(example);
}

function str(text) {
    return  {
        text: text,
        chain: function (text) {
            this.text += text;
            return this;
        },
        finish: function () {
            return this.text;
        }
    }
}

$env.select = function (article) {
    $env.article = article;
};

$env.articles = [
    new Article(
        '$env - js',
        str('The Javscript tag has access to one variable, "$env".\n')
            .chain('Use this variable to expose functions or variables to the html.\n')
            .finish(),
        str('$env.value = "hello world";\n')
            .chain('$env.alert = function () { alert($env.value) }')
            .finish()
    ), new Article(
        '$env - html',
        str("To use your tag's $env variables on the DOM simply use $$variableName, or $env.variableName.\n")
            .chain('As of now, you can only use them in goat attributes.')
            .finish(),
        str('<h1 link="$$value"></h1>\n')
            .chain('<button click="$$alert()">Click Me</button>')
            .finish()
    ), new Article(
        'Link',
        str("The link attribute allows you to set an element's innerText to a variable.")
            .finish(),
        str('JS:\n$env.greeting = "hello world";%n\nHtml:\n<h1 link="$$greeting"></h1>')
            .finish()
    ), new Article(
        'Bind',
        str("The bind attribute will set a variable to an input's value.\n")
            .chain("* Please note, you can only bind to an $env variable, thus you do not use $$. *")
            .finish(),
        str('<input bind="greeting">')
            .finish()
    ), new Article(
        'Click',
        str("The click attribute will add a click event listener")
            .finish(),
        str('<button click="$$alert()">Click Me</button>\n')
            .chain('<button click="console.log(\'goat is cool\')">goat</button>')
            .finish()
    ), new Article(
        'If',
        str("The if attribute will remove an element from the DOM WHILE the condition is false")
            .finish(),
        str('<h1 if="$$winner" link="\'The winner is: \' + $$winner + \'!\'"></h1>')
            .finish()
    ), new Article(
        'For',
        str("The for attribute acts like a forEach loop for an array, but with an element\n")
            .chain("The for loop will take an $env variable followed by a colon and a variable name\n\n")
            .chain('for="cards:card"\n\n')
            .chain("The first argument is the array found on the $env.\n")
            .chain("The second argument is the name of the variable that you can use in code.\n")
            .chain("To use this variable, you use $: instead of $$.\n")
            .chain("This is because $$ refers to $env while $: refers to the current array iterated variable")
            .finish(),
        str('<table>\n')
            .chain('\t<tr for="contacts:contact">\n')
            .chain('\t\t<td link="$:contact.name"></td>\n')
            .chain('\t\t<td link="$:contact.email"></td>\n')
            .chain('\t\t<td link="$:contact.phone"></td>\n')
            .chain('\t\t<td link="$:contact.isAvailable()"></td>\n')
            .chain('\t</tr>\n</table>')
            .finish()
    )
];

$env.article = $env.articles[0];