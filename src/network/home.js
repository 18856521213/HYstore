import request from "./request.js"

export function getHomeQuest(){

  return request({
    url:"/api/h8/home/data",

  })
}