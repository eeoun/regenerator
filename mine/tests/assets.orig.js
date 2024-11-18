async function entry(event) {
    let ex = 0;
    const dd = [1,2,3]
    for(er of dd){
        console.log(er)
        let result = await svc.Delay({})
    }
    for (let i = 1; i < 50; i++) {
        console.log(`asdasd${i}`)
        if (i % 2 == 0) {
            svc.IotControl({})
            let result = await svc.Delay({})
            if (result.code != 200) {
                return;
            }
        }
        if (i % 31 == 30) {
            throw {}
        }
        let results = await svc.Spread(1, svc.Delay({}), svc.IotControl({}))
        let result = await svc.Call("", {})
    }
}