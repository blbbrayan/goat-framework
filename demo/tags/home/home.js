$env.value = false;


zing.get('#code').innerText = 'JS:\n$env.value = false;\n\nHTML:\n<button click="$$value=!$$value" link="$$value"></button>\n<label if="$$value">Its true!</label>';