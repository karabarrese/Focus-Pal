/* tutorial: https://www.youtube.com/watch?v=6eFwtaZf6zc&t=0s */
/*math english, business personal
math = business, english = personal*/
window.addEventListener('load', () => {
    /*if there are to-do's saved in local storage, gettem!
    also, encoding with JSON.string so JSON.parse unlocks it somehow
    todos is a global variable so we can use it anywhere without const?*/
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newTodoForm = document.querySelector('#new-todo-form');

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			estimate: e.target.elements.estimate.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const notes = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'english') {
			span.classList.add('english');
		} else {
			span.classList.add('math');
		}
		content.classList.add('todo-content');
		actions.classList.add('actions');
		notes.classList.add('notes');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');

		if (todo.category ==undefined && todo.estimate ==undefined ){
			content.innerHTML = `<input type="text" size="40" value="${todo.content}" readonly>`;

		} else if (todo.category == undefined){
			content.innerHTML = `<input type="text" size="40" value="${todo.content} (${todo.estimate}m) " readonly>`;
		}
		else if (todo.estimate ==undefined ){
			content.innerHTML = `<input type="text" size="40" value="${todo.category}: ${todo.content}" readonly>`;
		}
		else {
			content.innerHTML = `<input type="text" size="40" value="${todo.category}: ${todo.content} (${todo.estimate}m) " readonly>`;

		}
	
		notes.innerHTML = "Notes";
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(notes); /*myadd*/
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		notes.addEventListener('click', (e) => {
			/*add part where it goes to a notes page*/
		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				/*todo.estimate = e.target.estimate;*/
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
			})
		})


		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})
	})
}