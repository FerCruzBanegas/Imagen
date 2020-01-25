import ApiService from './api.service'

const QuotationService = {

  getQuotation: async function() {
    try {
      const options = {
        method: 'get',
        url: '/download',
        responseType: 'arraybuffer'
      }
      const response = await ApiService.customRequest(options)
      return response
    } catch (error) {
      console.log(error)
    }
  },

  storeQuotation: async function(data) {
    try {
      const response = await ApiService.post('/quotations', data)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default QuotationService

export { QuotationService }