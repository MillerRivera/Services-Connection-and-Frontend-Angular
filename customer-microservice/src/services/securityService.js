const config = require("../config");
const axios = require("axios");

async function validateTokenWithSecurityMicroservice(token) {
  try {
    const response = await axios.post(config.microserviceSecurityUrl, {
      token,
    });
    return response.data;
  } catch (error) {
    console.error("Error al validar el token:", error);
    throw error;
  }
}

module.exports = { validateTokenWithSecurityMicroservice };
