import fetch from '../utils/fetch'

export const ProjectService = {
  get: async (id, token, payload) => {
    let body = {
      project_id: payload.id,
      // container: payload.container,
      container: ["BSCP0000002-9490bedb-666d-4fb9-a987-83be4a594129", "BSCP0000002-0016cf32-3621-4eb8-97b2-89898d7af286"],
      type: payload.type
    }
    return await fetch('POST', `/report`, body, token)
  },
}
