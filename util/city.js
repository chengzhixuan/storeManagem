import citys from './city.json'
let city = citys;

let list = [];
let lsit2 = [];
try {
    city.forEach((i, pi) => {
        let item = {
            text: i.value,
            value: `${pi}`,
            check: false,
            children: []
        }
        let item2 = {
            l: i.value,
            c: false,
            ch: []
        }
        i.children.forEach((c, ci) => {
            let cityItem = {
                text: c.value,
                value: `${pi}-${ci}`,
                check: false,
                children: []
            }
            let cityItem2 = {
                l: c.value,
                c: false,
                ch: []
            }
            if (c.children) {
                if (c.children.length === 0) {

                } else {
                    c.children.forEach((area, index) => {
                        let name = area.value
                        if (name !== '市辖区') {
                            cityItem.children.push({
                                text: name,
                                check: false,
                                value: `${pi}-${ci}-${index}`,
                            })
                            if (c.children.length === index + 1 && name !== '其他') {
                                cityItem.children.push({
                                    text: '其他',
                                    check: false,
                                    value: `${pi}-${ci}-${index + 1}`,
                                })
                            }
                            cityItem2.ch.push({
                                c: false,
                                l: name,
                            })
                        }
                    })
                }

            } else {
                cityItem.children = null
                cityItem2.ch = null
            }
            item.children.push(cityItem)
            item2.ch.push(cityItem2)
        })
        list.push(item)
        lsit2.push(item2)
    });
} catch (err) {
    console.log(err)
}
const getCityList = (add) => {
    let arr = []
    let city = list.find((i) => {
        return i.text === add[0]
    })
    if (city) {
        arr.push({ value: city.value, text: city.text })
        let area = city.children.find((i) => {
            return i.text === add[1]
        })
        if (area) {
            arr.push({ value: area.value, text: area.text })
            let street = area.children.find((i) => {
                return i.text === add[2]
            })
            if (street) {
                arr.push({ value: street.value, text: street.text })
            } else {
                street = area.children.find((i) => {
                    return i.text === '其他'
                })
                arr.push({ value: street.value, text: street.text })
            }
        }
    }
    return arr
}
export { lsit2, getCityList }
export default list