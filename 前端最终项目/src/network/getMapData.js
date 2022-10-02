import {request} from "./request";

export function getMapArea() {
    return request({
        url:'/worldData'
    })
}
export function getStatic() {
    return request({
        url:'/staticData'
    })
}
export function getChinaData() {
    return request({
        url:'/chinaData'
    })
}

export function getTimeSeries() {
    return request({
        url:"https://pomber.github.io/covid19/timeseries.json"
    })
}

export class mapData {
    constructor(mapInfo){

    }
}