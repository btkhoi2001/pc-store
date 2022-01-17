import pkg from "sequelize";
import sequelize from "../../config/database/index.js";
import { v4 as uuidv4 } from "uuid";
import ProductImage from "../productImage.js";
import { uploadFile, deleteFile } from "../../config/aws/aws.js";

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

export const deleteProductImage = async (contextObject) => {
    const { productId } = contextObject;

    const productImages = await sequelize.query(
        `SELECT *
        FROM product_image
        WHERE product_image.productId = ?`,
        { replacements: [productId], type: QueryTypes.SELECT }
    );

    for (const image of productImages) {
        const index = image.imageUrl.indexOf("products");
        const key = image.imageUrl.substring(index);

        await deleteFile(key);
    }

    await ProductImage.destroy({
        where: {
            productId,
        },
    });
};
