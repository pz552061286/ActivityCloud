import {
  http
} from './http'

const sendRunData = (encryptedData, sessionkey, iv) => {
  return new Promise((resolve, reject) => {
    http('/StepNums/decrypt', {
      encryptedData,
      sessionkey,
      iv
    }, res => {
      if (res.code == 200) {
        resolve(res)
      } else {
        reject(res)
      }
    })
  })
}
export default sendRunData