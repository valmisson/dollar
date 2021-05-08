import type { Currencies } from '@/types'
import Axios from 'axios'

abstract class API {
  private static codes: Array<string> = ['USD', 'USDT']

  private static api = Axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/json'
  })

  static async load (): Promise<Currencies> {
    const { data } = await this.api.get(`/all/${this.codes.join()}`)

    return data
  }
}

export default API
