-- Users' Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20) UNIQUE NOT NULL,
    gender VARCHAR(6) NOT NULL,
    address VARCHAR(255) NOT NULL,
    cart JSONB DEFAULT '{"totalPrice": 0, "items": []}',  -- Default value as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admins' Table
CREATE TABLE admins (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phonenumber VARCHAR(20) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
    gender VARCHAR(6) NOT NULL,
	position VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users' Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phonenumber VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    delivered BOOLEAN DEFAULT FALSE,
    declined BOOLEAN DEFAULT FALSE,
    cart JSONB DEFAULT '{"totalPrice": 0, "items": []}',  -- Default value as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback Table
CREATE TABLE feedbacks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
);

-- Note Table
CREATE TABLE notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    note TEXT NOT NULL
);

-- Product Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    photo TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (id, product_name, type, description, price, photo) VALUES
(gen_random_uuid(), 'Baguette Salad', 'Bread', 'Look small? But you cannot imagine how many ingredients it have. Jambon, carrot, corn, cabbage, cucumber and mayonnaise sauce.', 18000, 'https://images.eatsmarter.com/sites/default/files/styles/max_size/public/baguette-topped-with-salad-625768.jpg'),
(gen_random_uuid(), 'Sesame Baguette Salad', 'Bread', 'Go along with the soft sesame bread is ham, cheese and fresh lettuce and tomato.', 25000, 'https://burpple-1.imgix.net/foods/62ff74b3f0933f695a21638961_original.?w=645&amp;dpr=1&amp;fit=crop&amp;q=80&amp;auto=format'),
(gen_random_uuid(), 'Sausage Danish', 'Bread', 'The crispy danish skin inside with chunky sausage and more extra flavor by chicken floss and mayonnaise sauce.', 25000, 'https://abcbakery.co/wp-content/uploads/Bread07-.png'),
(gen_random_uuid(), 'Brioche Rolls (4ct)', 'Bread', 'Contains: Wheat four, eggs, butter, milk.', 30000, 'https://od-prod-content.s3.us-east-2.amazonaws.com/10000281/menuItemMaster/images/774345.jpg'),
(gen_random_uuid(), 'Sausage Bun', 'Bread', 'Small size flavorful pizza with sausage, minced jambon and melted cheese.', 35000, 'https://www.elmundoeats.com/wp-content/uploads/2019/07/Chinese-Sausage-Bread.jpg'),
(gen_random_uuid(), 'Cheesy Pork Floss', 'Bread', 'Fresh bread, combine with tasty floss and creamy slightly mayonnaise.', 40000, 'https://www.boulangerie22.ph/Product/GetPhoto?barcode=ABI00005552'),
(gen_random_uuid(), 'Baguette', 'Bread', 'The golden baguette with crispy skin outside and moist inside.', 10000, 'https://od-prod-content.s3.us-east-2.amazonaws.com/10000281/menuItemMaster/images/773966.jpg'),
(gen_random_uuid(), 'Apple Pie', 'Pastries', 'Indulge in the rich flavors of our Apple Pie with a perfect blend of wheat flour, luscious apple pie filling, and a tantalizing glaze. The golden crust and delightful ingredients make each bite a heavenly experience.', 19000, 'https://od-prod-content.s3.us-east-2.amazonaws.com/10000281/menuItemMaster/images/774394.jpg'),
(gen_random_uuid(), 'Chocolate Bar Danish', 'Pastries', 'A perfect treat for chocolate lovers, this pastry promises a delightful blend of flaky pastry and rich chocolate flavor.', 29000, 'https://aihuebakery.vn/uploads/photos/2020/10/19/aihuebakery-mtt2s1603077538.jpg'),
(gen_random_uuid(), 'Blueberry Mung Bean Bun', 'Pastries', 'The beautiful and sweet blueberry jam with soft and delicious mung bean bun is such a perfect two.', 31000, 'https://abcbakery.co/wp-content/uploads/Pastry07-.png'),
(gen_random_uuid(), 'Taro Bun', 'Pastries', 'The savory and unique taste of taro will be more fantastic with those almond slices.', 23000, 'https://abcbakery.co/wp-content/uploads/Pastry06-.png'),
(gen_random_uuid(), 'Chocolate Chip Bun', 'Pastries', 'Feel the unforgettable chocolate flavored in each bite.', 20000, 'https://foodandjourneys.net/wp-content/uploads/2021/07/German-Chocolate-Buns-Schokobrotchen.PIC6_.jpg'),
(gen_random_uuid(), 'Custard Wormie Bread', 'Pastries', 'Do you want to try this plump, fluffy custard wormie?', 32000, 'https://cdn.store-assets.com/s/630301/i/20102376.jpg?width=1024&format=webp'),
(gen_random_uuid(), 'Coconut Bun', 'Pastries', 'With the special sweet and rich taste of coconut go along the soft fresh bread make a perfect combination.', 24000, 'https://healthynibblesandbits.com/wp-content/uploads/2021/08/Coconut-Buns-3.jpg'),
(gen_random_uuid(), 'Choux Cream', 'Pastries', 'The light, fluffy and creamy choux cream match made in food heaven.', 40000, 'https://www.theflavorbender.com/wp-content/uploads/2019/03/Salted-Caramel-Choux-au-Craquelin-9433.jpg'),
(gen_random_uuid(), 'Croissant', 'Pastries', 'Taste croissant with the crunchiness of skin and softness of interior.', 12000, 'https://od-prod-content.s3.us-east-2.amazonaws.com/10000281/menuItemMaster/images/774383.jpg'),
(gen_random_uuid(), 'Chocolate Croissant', 'Pastries', 'A perfect treat for chocolate lovers, this pastry promises a delightful blend of flaky pastry and rich chocolate flavor.', 15000, 'https://od-prod-content.s3.us-east-2.amazonaws.com/10000281/menuItemMaster/images/774103.jpg'),
(gen_random_uuid(), 'Egg Tart', 'Pastries', 'Enjoy the delightful combination of a tart shell, egg, and milk in every bite of our Egg Tart. A perfect balance of flavors that will leave you wanting more.', 15000, 'https://www.tastingtable.com/img/gallery/portuguese-egg-tart-recipe-pastry/intro-1641242937.webp'),
(gen_random_uuid(), 'Sugar Mochi Donut', 'Pastries', 'Delight in the unique combination of tapioca starch, sugar, egg, milk, and wheat in our Sugar Mochi Donut. A mouthwatering treat that brings together the best of sweet and chewy textures. ', 15000, 'https://od-prod-content.s3.us-east-2.amazonaws.com/10000281/menuItemMaster/images/837258.jpg'),
(gen_random_uuid(), 'Orange Vani', 'Cake Slice', 'Feel the orange flavored blended with rich, creamy mousse and soft sponge cake.', 18000, 'https://abcbakery.co/wp-content/uploads/SliCake09-.png'),
(gen_random_uuid(), 'Blueberry Vani', 'Cake Slice', 'Four layers cake by two solf, fresh sponge cake layers, rich creamy mousse layer and last but not least is the devilishly good blueberry mousse layer.', 25000, 'https://abcbakery.co/wp-content/uploads/SliCake08-.png'),
(gen_random_uuid(), 'Strawberry Dome', 'Cake Slice', 'The yummy dome made from sweet mousse and lovely fresh milk cream.', 27000, 'https://media01.stockfood.com/largepreviews/MTg2Njc1NzkzOA==/60217998-Strawberry-dome-tartlets.jpg'),
(gen_random_uuid(), 'Chocolate Cocoa', 'Cake Slice', 'Experience the perfection flavor from fresh sponge cake, fluffy mousse and enjoyable chocolate.', 17000, 'https://abcbakery.co/wp-content/uploads/SliCake06-.png'),
(gen_random_uuid(), 'Carrot Cake', 'Cake Slice', 'With the combination between carrot, walnuts, unsalted butter and cheese just fit enough for a queen.', 26000, 'https://abcbakery.co/wp-content/uploads/SliCake05-Carrot-Cake.png'),
(gen_random_uuid(), 'Mini Black Forest', 'Cake Slice', 'The small size of black forest but still keep the characteristic flavor from the big one.', 21000, 'https://abcbakery.co/wp-content/uploads/SliCake04-Mini-Black-Forest.png'),
(gen_random_uuid(), 'Marble Cheesecake', 'Cake Slice', 'Rich flavor from anchor cheese combine with the sweet of white and black chocolate created an unbeatable marble cheesecake.', 26000, 'https://abcbakery.co/wp-content/uploads/SliCake03-.png'),
(gen_random_uuid(), 'Lemon Cream Cake', 'Cake Slice', 'The small cream cake with light lemon flavor will fresh all you senses.', 40000, 'https://abcbakery.co/wp-content/uploads/SliCake02-.png'),
(gen_random_uuid(), 'Chocolate Almond Cake', 'Cake Slice', 'Made from moist brown and black sponge cake, with dark chocolate and sliced almond will bring along the sweetness flavor with you.', 14000, 'https://cravingsjournal.com/wp-content/uploads/2020/06/almond-chocolate-cake-4.jpg'),
(gen_random_uuid(), 'Icecream Cheesecake', 'Cheesecake', 'Icecream Cheesecake is the perfect choice for any moment, whether it''s a birthday, anniversary, or just a special gift for your loved ones. Try Icecream Cheesecake today and experience the perfect combination of flavor and texture.', 18000, 'https://jamiegeller.com/.image/c_limit,cs_srgb,q_auto:good,w_700/MTY1NTI1MTg2Mzg3NzgxMTU4/ice-cream-cheesecake-pie-82jpg.webp'),
(gen_random_uuid(), 'Cheeseo', 'Cheesecake', 'Made with the main ingredient being cheese, this cake is suitable for both hot and cold consumption. However, Vanie Nguyen recommends serving it cold to enhance the dense cheese flavor.', 25000, 'https://vaniebakery.com/wp-content/uploads/2020/08/cheeseo-800x800.png.webp'),
(gen_random_uuid(), 'Tiramisu', 'Cheesecake', 'Tiramisu is a classic Italian dessert that has become popular worldwide. It features coffee-flavored layers of sponge cake soaked in espresso and rum, and a premium cream made from mascarpone cheese, eggs, and sugar. It also includes cocoa powder for a sweet contrast.', 27000, 'https://vaniebakery.com/wp-content/uploads/2022/02/IMG_6911.png'),
(gen_random_uuid(), 'Tofu Cheesecake', 'Cheesecake', 'This cake has a fascinating creamy texture and interesting flavor. Soybeans, the main ingredient, provide protein, fiber, and antioxidants that may help protect against cancer and heart disease.', 21000, 'https://2.bp.blogspot.com/-AsOaYXfosa8/VD50FSeAF5I/AAAAAAAAAE0/8kwKjqSQl3A/s1600/Tofu%2BCheeseCake.jpg'),
(gen_random_uuid(), 'Strawberry Tart Cheese', 'Cheesecake', 'The first highlight of Tart Cheese Strawberry is a collection of beautiful fresh strawberries on the cake''s surface, not only creating an attractive appearance but also ensuring a delightful eating experience. Strawberries are rich in antioxidants, vitamin C, and fiber, offering many health benefits.', 30000, 'https://vaniebakery.com/wp-content/uploads/2020/07/tart-cheese-dau.png'),
(gen_random_uuid(), 'Japanese Cotton Cheesecake', 'Cheesecake', 'Every Japanese Cotton Cheesecake is served with fresh whole strawberries, a fruit available year-round and rich in vitamin C, fiber, and antioxidants. They create an explosion of color and flavor, making the cake even more enticing and satisfying.', 45000, 'https://runawayrice.com/wp-content/uploads/2014/05/Cotton-Cheesecake-Japanese-Cheesecake.jpg'),
(gen_random_uuid(), 'Mango Cheese Bathed Buns', 'Cheesecake', 'Unique cream cheese with a fragrant mango taste on the tip of the tongue, ensuring a creamy and satisfying cheese aftertaste. The addition of mango jelly and pure mango sauce with its shiny yellow color adds an impressive touch to the taste buds.', 39000, 'https://vaniebakery.com/wp-content/uploads/2023/05/IMG_4344-800x800.png.webp'),
(gen_random_uuid(), 'Mushroom Sauce', 'Bread', 'Delicious bread baked come from irresistible mushroom sauce and ham.', 34000, 'https://www.recipetineats.com/wp-content/uploads/2018/09/Creamy-Mushroom-Sauce_3.jpg?resize=650,910'),
(gen_random_uuid(), 'Pizza', 'Bread', 'On top of the soft, airy dough is wonderful rich cheese, sausage and green bell pepper.', 42000, 'https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/94/2023/10/02/Snapinstaapp_383855421_1711116049313714_84421771234308923_n_1080-2136112196.jpg'),
(gen_random_uuid(), 'Pepsi', 'Drinks', '', 17000, 'https://product.hstatic.net/1000141988/product/nuoc_ngot_pepsi_lon_320_ml_415ef91bdb15487ab3079155c3635f66.jpg'),
(gen_random_uuid(), '7-UP', 'Drinks', '', 17000, 'https://product.hstatic.net/1000141988/product/nuoc_ngot_7up_huong_chanh_lon_330_ml_63d1cee15d314dc39522d5e83784d4d4.jpg'),
(gen_random_uuid(), 'Strawberry Lychee Iced Tea', 'Drinks', 'The combination of lychee, orange and strawberry along with the cool aroma of tea will help you beat the summer heat. These are all toppings that are quite easy to eat, full of sweetness, sourness and aroma, creating a drink that blends all the colors and flavors worth enjoying with your friends.', 27000, 'https://www.arkadiabeverages.com.au/assets/main/RECIPES/_800xAUTO_crop_center-center_none/Strawberry-Lychee-Iced-Tea-recipe-thumb-350x350.png'),
(gen_random_uuid(), 'Lychee Green Tea Freeze', 'Drinks', 'Different from a traditional cup of lychee tea, in this drink you will clearly feel the characteristic taste of green tea combined with pureed and cooled lychee, adding a layer of floating foam on the surface that everyone will love.', 35000, 'https://dvpmarket.com/resources/uploads/thang_102019/tra-vai-green-lychee.jpg'),
(gen_random_uuid(), 'Passion Fruit Green Tea Macchiato', 'Drinks', 'Beat the heat with the brand new sweet and sour tropical flavour combined with the smooth and creamy macchiato cream~', 28000, 'https://d1u57wxxsxzpd6.cloudfront.net/cbdcab36-55e3-4aba-8fb2-1856009c3677_image.jpeg'),
(gen_random_uuid(), 'Red Dragon Fruit & Pineapple', 'Drinks', 'It''s blended with Jasmine Green Tea, topped with aloe and cheese foam. It''s pretty and refreshing without being overly sweet. (No syrup added)', 33000, 'https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-9/162270817_258152092461300_6340398896174904691_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=810d5f&_nc_ohc=i_KmSq13KMoAX-KZ54H&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfBeGsgiEpEInpLq0TA1a5iMz1xbiWK3rDTuxpbC3UXBoQ&oe=65B45E27'),
(gen_random_uuid(), 'Gelato', 'Ice Cream', 'This cold treat is creamy, decadent, and melt-in-your-mouth delicious. Essentially, it''s richer and denser than other ice cream types. Plus, it has less sugar and is lower in fat, making it perfect for indulging.', 19000, 'https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Sherbet.webp'),
(gen_random_uuid(), 'Sherbet', 'Ice Cream', 'It''s a bit fizzy, a little sweet, and a whole lot of fun!  This frozen treat comes in different flavors and is perfect if you want sweet-tart combos.', 15000, 'https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Sorbet.webp'),
(gen_random_uuid(), 'Sorbet', 'Ice Cream', 'This frozen delight has little to no dairy. Instead, it features a mix of fruit juice or purée, sweetened water, and egg whites.  It''s perfect if you want a boozy kick to your cold dessert. You can add a drizzle of wine or liqueur for the perfect party treat.', 25000, 'https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Frozen-Yogurt-1.webp'),
(gen_random_uuid(), 'Frozen Yogurt', 'Ice Cream', 'Frozen yogurt has an array of flavors that you can enjoy.  Whether you want something indulgent or something fruity, this cold treat is a perfect choice.', 20000, 'https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Soft-Serve.webp'),
(gen_random_uuid(), 'Soft Serve', 'Ice Cream', 'It''s sometimes called "whipped ice cream," or "frozen custard." Either way, it typically features milk, ice, and flavorings churned with air.  It has a smooth, fluffy texture that pairs perfectly with sweet syrups and other toppings.  Soft serve ice cream melts in your mouth with absolute indulgence. ', 10000, 'https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Ice-Popsicle.webp'),
(gen_random_uuid(), 'Kulfi', 'Ice Cream', 'Kulfi is a traditional Indian dessert made from milk, sugar, nuts, and fruit.  It''s infused with rich flavors and spices like saffron, cardamom, and rosewater, making it unique.  The rich, creamy goodness of kulfi makes it perfect if you love indulging in a treat.  And it has a satisfying crunch from the nuts that cuts through the dense texture.', 15000, 'https://insanelygoodrecipes.com/wp-content/uploads/2022/10/Mochi-Ice-Cream.webp');