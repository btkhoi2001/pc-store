import Category from "../models/category.js";
import Brand from "../models/brand.js";
import CategoryBrand from "../models/categoryBrand.js";
import Product from "../models/product.js";
import ProductImage from "../models/productImage.js";
import ProductSpecification from "../models/productSpecification.js";
import User from "../models/user.js";

const insertData = async (req, res) => {
    await Category.create({ content: "Vi xử lý" });
    await Category.create({ content: "Tản nhiệt" });
    await Category.create({ content: "Bo mạch chủ" });
    await Category.create({ content: "Ổ cứng HDD" });
    await Category.create({ content: "Ổ cứng SSD" });
    await Category.create({ content: "Card đồ họa" });
    await Category.create({ content: "Bộ nhớ" });
    await Category.create({ content: "Vỏ máy tính" });
    await Category.create({ content: "Nguồn" });
    await Category.create({ content: "Card âm thanh" });
    await Category.create({ content: "Màn hình" });
    await Category.create({ content: "Bàn phím" });
    await Category.create({ content: "Chuột" });
    await Category.create({ content: "Tai nghe" });
    await Category.create({ content: "Loa" });
    await Category.create({ content: "Bàn ghế gaming" });

    await Brand.create({ content: "Intel" });
    await Brand.create({ content: "AMD" });
    await Brand.create({ content: "Cooler Master" });
    await Brand.create({ content: "NZXT" });
    await Brand.create({ content: "Xigmatek" });
    await Brand.create({ content: "Nvidia" });
    await Brand.create({ content: "Akko" });
    await Brand.create({ content: "ASUS" });
    await Brand.create({ content: "Acer" });
    await Brand.create({ content: "BenQ" });
    await Brand.create({ content: "Dell" });
    await Brand.create({ content: "GIGABYTE" });
    await Brand.create({ content: "LG" });
    await Brand.create({ content: "MSI" });
    await Brand.create({ content: "SamSung" });
    await Brand.create({ content: "ViewSonic" });
    await Brand.create({ content: "Leopold" });
    await Brand.create({ content: "Keychron" });
    await Brand.create({ content: "CORSAIR" });
    await Brand.create({ content: "Ducky" });
    await Brand.create({ content: "Filco" });
    await Brand.create({ content: "E-Dra" });
    await Brand.create({ content: "SteelSeries" });
    await Brand.create({ content: "Logitech" });
    await Brand.create({ content: "Razer" });
    await Brand.create({ content: "Ikbc" });
    await Brand.create({ content: "DareU" });
    await Brand.create({ content: "Kingston" });
    await Brand.create({ content: "Creative" });
    await Brand.create({ content: "Audioengine" });
    await Brand.create({ content: "AKRacing" });
    await Brand.create({ content: "Seagate" });
    await Brand.create({ content: "Western Digital" });
    await Brand.create({ content: "DXRacer" });

    await CategoryBrand.create({ categoryId: 1, brandId: 1 });
    await CategoryBrand.create({ categoryId: 1, brandId: 2 });
    await CategoryBrand.create({ categoryId: 2, brandId: 3 });
    await CategoryBrand.create({ categoryId: 2, brandId: 4 });
    await CategoryBrand.create({ categoryId: 2, brandId: 5 });
    await CategoryBrand.create({ categoryId: 2, brandId: 8 });
    await CategoryBrand.create({ categoryId: 2, brandId: 12 });
    await CategoryBrand.create({ categoryId: 2, brandId: 19 });
    await CategoryBrand.create({ categoryId: 3, brandId: 8 });
    await CategoryBrand.create({ categoryId: 3, brandId: 12 });
    await CategoryBrand.create({ categoryId: 3, brandId: 14 });
    await CategoryBrand.create({ categoryId: 4, brandId: 32 });
    await CategoryBrand.create({ categoryId: 4, brandId: 33 });
    await CategoryBrand.create({ categoryId: 5, brandId: 12 });
    await CategoryBrand.create({ categoryId: 5, brandId: 28 });
    await CategoryBrand.create({ categoryId: 5, brandId: 15 });
    await CategoryBrand.create({ categoryId: 5, brandId: 32 });
    await CategoryBrand.create({ categoryId: 5, brandId: 33 });
    await CategoryBrand.create({ categoryId: 6, brandId: 8 });
    await CategoryBrand.create({ categoryId: 6, brandId: 12 });
    await CategoryBrand.create({ categoryId: 6, brandId: 14 });
    await CategoryBrand.create({ categoryId: 7, brandId: 33 });
    await CategoryBrand.create({ categoryId: 7, brandId: 33 });
    await CategoryBrand.create({ categoryId: 8, brandId: 19 });
    await CategoryBrand.create({ categoryId: 8, brandId: 28 });
    await CategoryBrand.create({ categoryId: 8, brandId: 12 });
    await CategoryBrand.create({ categoryId: 9, brandId: 3 });
    await CategoryBrand.create({ categoryId: 9, brandId: 8 });
    await CategoryBrand.create({ categoryId: 9, brandId: 19 });
    await CategoryBrand.create({ categoryId: 9, brandId: 4 });
    await CategoryBrand.create({ categoryId: 9, brandId: 14 });
    await CategoryBrand.create({ categoryId: 10, brandId: 8 });
    await CategoryBrand.create({ categoryId: 10, brandId: 12 });
    await CategoryBrand.create({ categoryId: 11, brandId: 8 });
    await CategoryBrand.create({ categoryId: 11, brandId: 9 });
    await CategoryBrand.create({ categoryId: 11, brandId: 10 });
    await CategoryBrand.create({ categoryId: 11, brandId: 11 });
    await CategoryBrand.create({ categoryId: 11, brandId: 12 });
    await CategoryBrand.create({ categoryId: 11, brandId: 13 });
    await CategoryBrand.create({ categoryId: 11, brandId: 14 });
    await CategoryBrand.create({ categoryId: 11, brandId: 15 });
    await CategoryBrand.create({ categoryId: 11, brandId: 16 });
    await CategoryBrand.create({ categoryId: 12, brandId: 7 });
    await CategoryBrand.create({ categoryId: 12, brandId: 17 });
    await CategoryBrand.create({ categoryId: 12, brandId: 18 });
    await CategoryBrand.create({ categoryId: 12, brandId: 19 });
    await CategoryBrand.create({ categoryId: 12, brandId: 20 });
    await CategoryBrand.create({ categoryId: 12, brandId: 21 });
    await CategoryBrand.create({ categoryId: 12, brandId: 22 });
    await CategoryBrand.create({ categoryId: 12, brandId: 23 });
    await CategoryBrand.create({ categoryId: 12, brandId: 24 });
    await CategoryBrand.create({ categoryId: 12, brandId: 25 });
    await CategoryBrand.create({ categoryId: 12, brandId: 26 });
    await CategoryBrand.create({ categoryId: 13, brandId: 8 });
    await CategoryBrand.create({ categoryId: 13, brandId: 19 });
    await CategoryBrand.create({ categoryId: 13, brandId: 24 });
    await CategoryBrand.create({ categoryId: 13, brandId: 7 });
    await CategoryBrand.create({ categoryId: 13, brandId: 23 });
    await CategoryBrand.create({ categoryId: 13, brandId: 25 });
    await CategoryBrand.create({ categoryId: 13, brandId: 27 });
    await CategoryBrand.create({ categoryId: 13, brandId: 22 });
    await CategoryBrand.create({ categoryId: 13, brandId: 10 });
    await CategoryBrand.create({ categoryId: 14, brandId: 8 });
    await CategoryBrand.create({ categoryId: 14, brandId: 19 });
    await CategoryBrand.create({ categoryId: 14, brandId: 28 });
    await CategoryBrand.create({ categoryId: 14, brandId: 23 });
    await CategoryBrand.create({ categoryId: 14, brandId: 24 });
    await CategoryBrand.create({ categoryId: 14, brandId: 25 });
    await CategoryBrand.create({ categoryId: 15, brandId: 29 });
    await CategoryBrand.create({ categoryId: 15, brandId: 30 });
    await CategoryBrand.create({ categoryId: 15, brandId: 25 });
    await CategoryBrand.create({ categoryId: 15, brandId: 24 });
    await CategoryBrand.create({ categoryId: 16, brandId: 8 });
    await CategoryBrand.create({ categoryId: 16, brandId: 22 });
    await CategoryBrand.create({ categoryId: 16, brandId: 31 });
    await CategoryBrand.create({ categoryId: 16, brandId: 34 });

    for (let i = 1; i <= 12; i++) {
        await Product.create({
            name: "Dell E2016HV Monitor – 19.5 inch, 1600×900",
            description: `Màn hình Dell E2016HV
                Kích thước màn hình 19.5 inch
                Hiển thị màu sắc Hơn 16 triệu màu
                Độ phân giải 1600 x 900 pixels
                Độ sáng 200cd/m2
                Độ tương phản 600:1
                Góc nhìn 50 ~ 65 °/90 °
                Kết nối VGA`,
            categoryBrandId: 37,
            price: 3350000,
        });
        await ProductImage.create({
            productId: i,
            numberOrder: 1,
            imageUrl:
                "https://btk-store.s3.ap-southeast-1.amazonaws.com/products/Dell-E2016HV-Monitor.jpg",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 1,
            content: "Nhãn hiệu",
            value: "Dell",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 2,
            content: "Series",
            value: "Desktop Monitor",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 3,
            content: "Mã",
            value: "E2016HV",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 4,
            content: "Kích Thước Panel",
            value: '19.5"',
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 5,
            content: "Loại Panel",
            value: "In-Plane Switching (IPS)",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 6,
            content: "Độ Phân Giải",
            value: "Full HD(1920×1080)",
        });
    }

    for (let i = 13; i <= 24; i++) {
        await Product.create({
            name: "Dell S2721HN Monitor – 27 inch, FHD, IPS, 75Hz, 2x HDMI",
            description: `Màn hình làm việc Dell S2721H chân màu bạc sang trọng
                Tích hợp sẵn 2 loa 3W tiện dụng
                Tấm nền IPS cho góc nhìn lên đến 178′
                Viền mỏng, hệ màu NTSC đạt 72% (CIE 1931)
                Hỗ trợ cổng HDMI thông dụng với mọi PC`,
            categoryBrandId: 37,
            price: 5490000,
        });
        await ProductImage.create({
            productId: i,
            numberOrder: 1,
            imageUrl:
                "https://btk-store.s3.ap-southeast-1.amazonaws.com/products/TTD-s2421hn-1-768x768.jpg",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 1,
            content: "Nhãn hiệu",
            value: "Dell",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 2,
            content: "Series",
            value: "Desktop Monitor",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 3,
            content: "Mã",
            value: "S2721HN",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 4,
            content: "Kích Thước Panel",
            value: '27"',
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 5,
            content: "Loại Panel",
            value: "In-Plane Switching (IPS)",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 6,
            content: "Độ Phân Giải",
            value: "Full HD(1920×1080)",
        });
    }

    for (let i = 25; i <= 36; i++) {
        await Product.create({
            name: "BenQ ZOWIE XL2746S eSports Gaming Monitor – 27 inch, FHD, 240Hz, DyAc+",
            description: `Màn hình gaming BenQ ZOWIE XL2746S eSports
                Tần số làm tươi lên đến 240Hz giúp chuyện động mượt mà và chính xác
                Khả năng cân bằng dải màu đen giúp hình ảnh rõ ràng ở các cảnh tối
                Dễ dành tinh chỉnh màn hình hiển thị với bộ điều khiển chuyên biệt
                Ánh sáng xanh thấp bảo vệ đôi mắt khi sử dụng trong thời gian dài
                Tấm che màn giúp giảm thiểu chói sáng từ bên ngoài đảm bảo hiển thị
                Chân đế đa năng có thể điều chỉnh góc nhìn tùy ý`,
            categoryBrandId: 36,
            price: 5490000,
        });
        await ProductImage.create({
            productId: i,
            numberOrder: 1,
            imageUrl:
                "https://btk-store.s3.ap-southeast-1.amazonaws.com/products/BenQ-ZOWIE-XL2746S-eSports-Gaming-Monitor-1-768x768.jpg",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 1,
            content: "Nhãn hiệu",
            value: "BenQ",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 2,
            content: "Series",
            value: "Desktop Monitor",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 3,
            content: "Mã",
            value: "XL2746S",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 4,
            content: "Kích Thước Panel",
            value: '27"',
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 5,
            content: "Loại Panel",
            value: "In-Plane Switching (IPS)",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 6,
            content: "Độ Phân Giải",
            value: "Full HD(1920×1080)",
        });
    }

    for (let i = 37; i <= 48; i++) {
        await Product.create({
            name: "BenQ XL2730Z Gaming Monitor – 27 inch, WQHD, 144Hz, 1ms, TN Panel",
            description: `BenQ 27” XL2730Z QHD Gaming 144Hz TN
                Độ phân giải QHD 2560×1440
                Tần số làm tươi lên đến 144Hz giúp chuyện động mượt mà và chính xác
                Đáp ứng cực nhanh và độ trễ cực thấp
                Khả năng cân bằng dải màu đen giúp hình ảnh rõ ràng ở các cảnh tối
                Dễ dành tinh chỉnh màn hình hiển thị
                Ánh sáng xanh thấp bảo vệ đôi mắt khi sử dụng trong thời gian dài`,
            categoryBrandId: 36,
            price: 5490000,
        });
        await ProductImage.create({
            productId: i,
            numberOrder: 1,
            imageUrl:
                "https://btk-store.s3.ap-southeast-1.amazonaws.com/products/8532_resource-1.jpg",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 1,
            content: "Nhãn hiệu",
            value: "BenQ",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 2,
            content: "Series",
            value: "Desktop Monitor",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 3,
            content: "Mã",
            value: "XL2730Z",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 4,
            content: "Kích Thước Panel",
            value: '27"',
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 5,
            content: "Loại Panel",
            value: "In-Plane Switching (IPS)",
        });
        await ProductSpecification.create({
            productId: i,
            numberOrder: 6,
            content: "Độ Phân Giải",
            value: "Full HD(1920×1080)",
        });
    }

    //$argon2i$v=19$m=4096,t=3,p=1$vAGTUGZjXk33rhXkkOEPsw$8Czs1X/Fe5TLP697aTJn2cS8BAGNzquHbnZ/P5a3Mgw
    await User.create({
        fullName: "Lê Gia Huấn",
        email: "legiahuan@gmail.com",
        password:
            "$argon2i$v=19$m=4096,t=3,p=1$vAGTUGZjXk33rhXkkOEPsw$8Czs1X/Fe5TLP697aTJn2cS8BAGNzquHbnZ/P5a3Mgw",
        activated: true,
        admin: true,
    });

    await User.create({
        fullName: "Nguyễn Đăng Hiếu",
        email: "nguyendanghieun@gmail.com",
        password:
            "$argon2i$v=19$m=4096,t=3,p=1$vAGTUGZjXk33rhXkkOEPsw$8Czs1X/Fe5TLP697aTJn2cS8BAGNzquHbnZ/P5a3Mgw",
        activated: true,
        admin: true,
    });

    await User.create({
        fullName: "Nguyễn Chánh Đại",
        email: "nguyenchanhdai@gmail.com",
        password:
            "$argon2i$v=19$m=4096,t=3,p=1$vAGTUGZjXk33rhXkkOEPsw$8Czs1X/Fe5TLP697aTJn2cS8BAGNzquHbnZ/P5a3Mgw",
        activated: true,
        admin: true,
    });

    await User.create({
        fullName: "Võ Đức Minh",
        email: "voducminh@gmail.com",
        password:
            "$argon2i$v=19$m=4096,t=3,p=1$vAGTUGZjXk33rhXkkOEPsw$8Czs1X/Fe5TLP697aTJn2cS8BAGNzquHbnZ/P5a3Mgw",
        activated: true,
        admin: true,
    });

    await User.create({
        fullName: "Admin",
        email: "admin@gmail.com",
        password:
            "$argon2i$v=19$m=4096,t=3,p=1$vAGTUGZjXk33rhXkkOEPsw$8Czs1X/Fe5TLP697aTJn2cS8BAGNzquHbnZ/P5a3Mgw",
        activated: true,
        admin: true,
    });
};

export default insertData;
