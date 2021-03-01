import Axios from 'axios'
import { ICurrency } from '@/types.ts'

abstract class API {
  private static codes: Array<string> = ['USD', 'USDT']

  private static api = Axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json'
  })

  static async load (): Promise<ICurrency> {
    const { data } = await this.api.get(`/all/${this.codes.join()}`)

    return data
  }
}

export default API
