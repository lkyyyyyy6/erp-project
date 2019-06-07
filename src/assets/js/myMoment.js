import moment from 'moment'
let momentObj = {}
momentObj.install = function(Vue){
  Vue.filter('timeFormat',(value)=>{
    return moment(value).format('YYYY-MM-DD hh:mm:ss')
  })
}
export default momentObj