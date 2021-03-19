import moment from 'moment'

export default Vue => {
    Vue.filter('dealTime', function (date, type = 'YYYY年-MM月-DD') {
        if (!moment(date).isValid()) {
            return '- -'
        } else {
            return moment(date).format(type)
        }
    }),
        Vue.filter('getMonth', function (date, type = 'M月') {
            if (!moment(date).isValid()) {
                return '- -'
            } else {
                return moment(date).format(type)
            }
        }),
        Vue.filter('replaceTele', function (tele, conter = '0370') {

                return tele.replace(/155/,conter)

        })
}
