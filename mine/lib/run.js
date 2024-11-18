class SVCStub {
    constructor(context) {
        context.__proto__ = { next: 0 }
        this.ctx = context;
        [
            'Delay', 'IotControl'
        ].forEach(name => {
            this[name] = (function (args) { return this.Call(name, args) }).bind(this)
        })
    }

    next = 0;

    _callSets = [];

    get tales() {
        return [...this._callSets];
    }

    awrap(env, callSet) {
        return {
            prev: this.ctx.prev
            , next: this.ctx.next
            , env
            , exec: this._Emit(callSet)
        }
    }

    stop() {
        return {
            prev: this.ctx.prev
            , next: -1
            , exec: this._Emit()
        }
    }

    abrupt() {
        return {
            prev: this.ctx.prev
            , next: -2
            , exec: this._Emit()
        }
    }

    _Emit(callSet) {
        let cc = this._callSets;
        this._callSets = [];
        let mode = callSet?.mode || 0
        let x = {
            mode, cc
        };
        if (mode !== 0) {
            x.back = callSet.ids
        }
        return x;
    }

    Spread(mode, ...callSets) {
        let ids = callSets.map(x => x.id)
        return {
            mode,
            ids
        }
    }

    Call(exe, args) {
        this._callSets.push({
            exe, args
        })
        return {
            id: this._callSets.length - 1
        }
    }
}