const form = document.getElementById(`form`);
const input = document.getElementById('input');
const todoUl = document.getElementById('todo');


const todos = JSON.parse(localStorage.getItem('todo'));

if (todos) {
	todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	addTodo()
})

function addTodo(todo) {
	let todoText = input.value;

	if (todo) {
		todoText = todo.text
	}

	if (todoText) {
		const todoEl = document.createElement('li');
		if (todo && todo.completed) {
			todoEl.classList.add('completed');
		}

		todoEl.innerText = todoText;
		
		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('completed');
			updateLs()
		})

		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault()
			todoEl.remove();
			updateLs()
		}) 

		todoUl.appendChild(todoEl);
		input.value = ''

		updateLs()
	}
}

function updateLs() {
	todosEl = document.querySelectorAll('li');

	const todos = [];

	todosEl.forEach(todoEl => {
		todos.push({
			text: todoEl.innerText,
			completed: todoEl.classList.contains('completed')
		})
	})

	localStorage.setItem('todo', JSON.stringify(todos))
}
