import fetch from '../utils/fetch'

export const ProjectService = {
  get: async (id, token) => {
    return await fetch('GET', `/project/${id}`, {}, token)
  },
}
