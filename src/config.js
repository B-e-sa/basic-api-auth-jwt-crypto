const crypto = require("crypto");

const config = {
    key: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates aut nostrum commodi nisi doloremque unde, fugiat debitis dolore culpa eius saepe cum optio? Similique cumque ipsam perferendis tempore omnis qui!",
    salt: crypto.randomBytes(16).toString("hex"),
    apiUrl: "/api/v1"
}

module.exports = config;