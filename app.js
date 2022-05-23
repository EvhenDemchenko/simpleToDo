class TodoList {

    constructor(selector, btn) {
        this.list = document.querySelector(selector);
        this.input = document.querySelector('.input');
        this.btn = document.querySelector(btn)
        this.deleteBtn;
        this.i = 1;
        this.store =[];
    }


    addEvents() {
        this.btn.addEventListener('click', this.render.bind(this));
    }

    localStorage() {
        this.tempValue = localStorage.getItem('todo')
        if (this.tempValue === '[]'){
            this.store = [
                {id: this.i++, title: 'попробуйте добавить '},
                {id: this.i++, title: 'свою тудушку '},
            ];
        }else{
            this.parseTempValue = JSON.parse(this.tempValue)
            this.store = this.parseTempValue;
        }

    }

    refreshInfo() {
        localStorage.setItem('todo', JSON.stringify(this.store))
    }

    createNewTask() {
        this.curentValue = this.input.value;
        if (this.input.value === '') {
            return false;
        } else {
            this.curentStore = {
                id: this.i++,
                title: this.curentValue,
            }
            this.store.push(this.curentStore);
            this.input.value = '';
        }
    }

    deleteTask(currentItem) {
        for (let i = 0; i < this.store.length; i++) {
            if (this.store[i].id === Number(currentItem)) {
                this.store.splice(i, 1);
                this.render();
                break;
            }
        }
    }

    targetId() {
        this.deleteBtn = document.querySelectorAll('.delete');
        this.deleteBtn.forEach(item => {
            item.addEventListener('click', (Event) => {
                this.deleteTask(Event.target.getAttribute('data-id'))
            })
        })
    }

    render() {
        this.createNewTask();
        let itemToDo = ''
        this.store.forEach(({id, title}) => {
            itemToDo += `
            <li  class="list_item">${id}. ${title}
            <button data-id="${id}" class="delete"> delete</button>
        </li>`
        })
        this.list.innerHTML = itemToDo;
        this.refreshInfo()
        this.targetId()
    }
}


const a = new TodoList('.list', '.add');
a.localStorage()
a.render()
a.addEvents()


