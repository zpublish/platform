// Code used from https://github.com/awesomejerry/react-native-qrcode-svg
// react-native-qrcode-svg is licensed under The MIT License (MIT)
import QRCode from 'qrcode';

export default (value: any, errorCorrectionLevel: any) => {
  const arr = Array.prototype.slice.call(QRCode.create(value, { errorCorrectionLevel }).modules.data, 0)
  const sqrt = Math.sqrt(arr.length)
  return arr.reduce((rows, key, index) => (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows, [])
}
