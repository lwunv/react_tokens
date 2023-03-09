import { action, computed, makeAutoObservable, observable } from 'mobx'

type ThemeMode = 'light' | 'dark'
type Title = String

const STORAGE_KEY = '@theme'

export class Theme {
    constructor() {
        makeAutoObservable(this)
    }

    @observable
    protected _themeMode: ThemeMode = localStorage[STORAGE_KEY] || 'light'
    protected _title: Title = ''

    @computed
    get themeMode() {
        return this._themeMode
    }
    get pageTitle() {
        return this._title
    }

    @action
    toggle() {
        switch (this._themeMode) {
            case 'dark':
                this._themeMode = 'light'
                break;
        
            default:
                this._themeMode = 'dark'
                break;
        }

        localStorage[STORAGE_KEY] = this._themeMode
    }
    setPageTitle(val: any) {
        this._title = val
    }

    @computed
    mode(light: any, dark: any) {
        switch (this._themeMode) {
            case 'dark':
                return dark
        
            default:
                return light
        }
    }
}