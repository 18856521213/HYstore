import axios from "axios"
export function request(config,success,failure){
  //1.创建axiso的实列
  const instence =axios.create({
    baseURL:"http://152.136.185.210:8000",
    timeout:5000
  })
  instence(config).then(res=>{
    success(res)
  }).catch(err=>{

  })
}

