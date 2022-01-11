import app from "../app.js";
import sequelize from "../config/database/index.js";
// import insertData from "../script/script.js";

const PORT = process.env.PORT || 3000;

sequelize
    .authenticate()
    .then(async () => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // await insertData();
        sequelize.sync({ logging: false });
    })
    .catch((error) => {
        console.log(error);
    });
