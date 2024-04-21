import { authRepository } from "./auth.repository"

class AlertService {

    private readonly baseUrl = 'http://192.168.68.117:3030/alerts'

    private async getHeaders() {
        const logged = await authRepository.getLoggedUser()
        if (!logged) return null

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${logged.token}`
        }
    }

    public async get() {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers,
            })

            if (response.status === 401) return null
            if (response.ok) {
                return (await response.json()) as any[]
            }
        }
        return null
    }

    public async getById(id: number) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'GET',
                headers,
            })

            if (response.status === 401) return null
            if (response.ok) {
                return await response.json()
            }
        }
        return null
    }

    public async create(name: string, quantity: string, datetime: string) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({ name, quantity, datetime })
            })

            if (response.status === 400) return 'Alerta já existente'
            if (response.status === 401) return null
            return response.ok
        }
        return null
    }

    public async remove(id: number) {
        const headers = await this.getHeaders()
        if (headers) {
            const response = await fetch(`${this.baseUrl}/${id}`, {
                method: 'DELETE',
                headers,
            })

            if (response.status === 401) return null
            return response.ok
        }
        return null
    }
}

export const alertService = new AlertService()