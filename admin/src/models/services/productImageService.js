import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import { v4 as uuidv4 } from "uuid";
import ProductImage from "../productImage.js";
import { uploadFile } from "../../config/aws/aws.js";

const { QueryTypes } = pkg;

export const createNewProductImage = async (contextObject) => {
    const { file, productId, numberOrder } = contextObject;
    const { originalname } = file;

    file.key = `products/${uuidv4()}${originalname.substr(
        originalname.lastIndexOf(".")
    )}`;

    const uploadedFile = await uploadFile(file);
    const newProductImage = await ProductImage.create({
        productId,
        numberOrder,
        imageUrl: uploadedFile.Location,
    });

    return { newProductImage: newProductImage[0] };
};

export const getProductImageByProductId = async (contextObject) => {
    const { productId } = contextObject;

    const productImages = await sequelize.query(
        `SELECT imageUrl, numberOrder
        FROM product_image
        WHERE productId = ?
        ORDER BY numberOrder ASC`,
        { replacements: [productId], type: QueryTypes.SELECT }
    );

    return { productImages };
};
