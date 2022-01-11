import app from "../app.js";
import sequelize from "../config/database/index.js";

const PORT = process.env.PORT || 5000;

sequelize
    .authenticate()
    .then(async () => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
