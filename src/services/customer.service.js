import ApiService from './api.service'

const CustomerService = {

  searchCustomer: async function(url) {
    try {
      const response = await ApiService.get(url)
      return response
    } catch (error) {
      throw error
    }
  },
}

export default CustomerService

export { CustomerService }