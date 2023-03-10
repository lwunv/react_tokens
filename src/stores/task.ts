import { action, computed, makeAutoObservable, observable } from 'mobx'

import { TokenInterface } from '../interfaces'

export class Task {
    constructor() {
        makeAutoObservable(this)
    }

    @observable
    protected _tasks: TokenInterface[] = [
        {
            id: 1,
            title: 'Binance',
            price: '666666',
            logo: 'https://picsum.photos/50',
            isDone: false,
            updatedAt: new Date().getTime()
        },
        {
            id: 2,
            title: 'Binance 1',
            price: '888888',
            logo: 'https://picsum.photos/60',
            isDone: false,
            updatedAt: new Date().getTime()
        },
        {
            id: 3,
            title: 'Binance 2',
            price: '999999',
            logo: 'https://picsum.photos/70',
            isDone: false,
            updatedAt: new Date().getTime()
        }
    ]

    @observable
    protected _taskEdit?: TokenInterface

    @computed
    get taskEdit() {
        return this._taskEdit
    }

    @action
    edit(task: TokenInterface) {
        this._taskEdit = task
    }

    @computed
    get tasks() {
        return this._tasks.filter((task) => !task.isDone)
            .sort((a,b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()))
    }

    @computed
    get completedTasks() {
        return this._tasks.filter((task) => task.isDone)
            .sort((a,b) => parseFloat(b.price.toString()) - parseFloat(a.price.toString()))
    }

    protected generateId(): number {
        let rand = Math.random()

        while(this._tasks.find(task => task.id === rand)) {
            rand = Math.random()
        }

        return rand
    }

    protected find(id: TokenInterface['id'], callback: (task: TokenInterface, index: number) => void) {
        const index = this._tasks.findIndex((task) => task.id === id)

        if (index !== -1) {
            callback(this._tasks[index], index)
        }
    }

    @action
    add(token: any) {
        if (token.title){
            this._tasks.push({
                title: token.title,
                logo: token.logo,
                price: token.price,
                id: this.generateId(),
                isDone: false,
                updatedAt: new Date().getTime()
            })
        }
    }
    
    @action
    update(id: TokenInterface['id'], title: string, logo: string, price: string) {
        this.find(id, (task, i) => {
            this._tasks[i] = {
                ...task,
                title,
                updatedAt: !task.isDone ? new Date().getTime() : task.updatedAt
            }

            this._taskEdit = undefined
        })
    }

    @action
    updatePrice(id: TokenInterface['id'], price: string | number) {
        this.find(id, (task, i) => {
            this._tasks[i] = {
                ...task,
                price,
                updatedAt: new Date().getTime()
            }

            this._taskEdit = undefined
        })
    }

    @action
    remove(id: TokenInterface['id']) {
        this.find(id, (_, i) => {
            this._tasks.splice(i, 1)
        })
    }
}
