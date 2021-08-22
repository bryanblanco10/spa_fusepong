const API_URL = process.env.VUE_APP_API_URL;
const API_VERSION = process.env.VUE_APP_API_VERSION;

const API_ROUTES = {
  auth: {
    login: `${API_URL}/api/${API_VERSION}/auth/login`,
    register: `${API_URL}/api/${API_VERSION}/auth/register`
  },
  enterprise: {
    get: `${API_URL}/api/${API_VERSION}/enterprise`,
    save: `${API_URL}/api/${API_VERSION}/enterprise`,
    delete: `${API_URL}/api/${API_VERSION}/enterprise`,
    update: `${API_URL}/api/${API_VERSION}/enterprise`
  },
  project: {
    get: `${API_URL}/api/${API_VERSION}/project/project-user`,
    save: `${API_URL}/api/${API_VERSION}/project`,
    delete: `${API_URL}/api/${API_VERSION}/project`,
    update: `${API_URL}/api/${API_VERSION}/project`
  },
  userHistory: {
    get: `${API_URL}/api/${API_VERSION}/userHistory/user-history-project`,
    save: `${API_URL}/api/${API_VERSION}/userHistory`,
    delete: `${API_URL}/api/${API_VERSION}/userHistory`,
    update: `${API_URL}/api/${API_VERSION}/userHistory`
  },
  ticket: {
    get: `${API_URL}/api/${API_VERSION}/ticket/ticket-user-history`,
    save: `${API_URL}/api/${API_VERSION}/ticket`,
    delete: `${API_URL}/api/${API_VERSION}/ticket`,
    update: `${API_URL}/api/${API_VERSION}/ticket`
  }

};

export { API_ROUTES };