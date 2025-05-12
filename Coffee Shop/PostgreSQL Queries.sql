-- Brand Table
CREATE TABLE brand (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    opening_hours TIME NOT NULL,
    closed_hours TIME NOT NULL,
    logo_url TEXT NOT NULL,
    website_url TEXT NOT NULL,
    status VARCHAR(50) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO brand (id, name, description, opening_hours, closed_hours, logo_url, website_url, status, date_added) VALUES 
    (
        'c1cb7132-58e3-41ce-8f27-ea320c9273ba',
        'Coffee Shop 24/7',
        'Sells Coffee',
        '00:00:00',
        '24:00:00',
        'https://ga-nam-cake-shop-1.onrender.com/img/logo.png',
        'https://ga-nam-cake-shop-1.onrender.com',
        'Active',
        '2025-04-003 11:54:00.886386'
    );

-- Branch Table
CREATE TABLE branch (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID NOT NULL REFERENCES brand(id) ON DELETE CASCADE ON UPDATE CASCADE,
    address TEXT NOT NULL,
    phone VARCHAR(10) NOT NULL,
    status VARCHAR(10) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO branch (id, brand_id, address, phone, status, date_added) VALUES 
    ('3a7f5b90-12fd-4d2a-9c17-7e2a4c3d948e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '123 Pineview Lane, Denver, CO 80203', '0123455701', 'Active', '2025-04-10 10:15:44'),
    ('b5e0cfd4-b58f-4401-962d-6eec1f493c3a', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '456 Meadowbrook St, San Jose, CA 95112', '0123455702', 'Active', '2025-04-09 10:20:32'),
    ('58c22b5e-6171-4903-bf48-f1cc6c536f15', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '789 Sunset Blvd, Los Angeles, CA 90026', '0123455703', 'Active', '2025-04-08 10:25:50'),
    ('db275da2-9b63-4638-8fc6-7df0a0e7f2e0', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '321 Birchwood Drive, Orlando, FL 32801', '0123455704', 'Active', '2025-04-07 10:30:18'),
    ('456aaf52-4262-4c91-a79a-cb647e8086d3', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '213 North Avenue, Boston, MA 02115', '0123455705', 'Active', '2025-04-06 10:35:42'),
    ('f2c5c120-62de-48ec-a845-4eb1f33dd42e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '654 Willow Way, Minneapolis, MN 55401', '0123455706', 'Active', '2025-04-05 10:40:17'),
    ('e758d3d7-2be0-4077-8468-1b5c059e1a04', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '987 Oakridge Blvd, Charlotte, NC 28202', '0123455707', 'Active', '2025-04-04 10:45:29'),
    ('a81b13fa-9820-4fd6-946b-7a3534e9b7c0', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '1459 Lakeview Road, Madison, WI 53703', '0123455708', 'Active', '2025-04-03 10:50:11'),
    ('760c511e-c933-4a7d-8b1a-5aa39d6b46de', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '208 Green Street, Portland, OR 97209', '0123455709', 'Active', '2025-04-02 10:55:43'),
    ('d8edc4e6-1988-4cd4-b679-1c6de39992b1', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', '75 Highland Ave, Atlanta, GA 30307', '0123455710', 'Active', '2025-04-01 11:00:00');

-- Member Information
CREATE TABLE member_information (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    gender VARCHAR(6) NOT NULL,
    address VARCHAR(255) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customer Table
CREATE TABLE customer (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    member_information_id UUID NOT NULL REFERENCES member_information(id) ON DELETE CASCADE ON UPDATE CASCADE,
    brand_id UUID NOT NULL REFERENCES brand(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(50) NOT NULL,
    avatar TEXT,
    cart JSONB DEFAULT '{"total_price": 0, "items": []}'
);

INSERT INTO member_information (id, full_name, username, password, role, email, phone, gender, address) VALUES
    ('f25a3b14-7d68-4c91-9cb2-87e4f2b39a16', 'Emma Thompson', 'ethompson', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'ethompson@gmail.com', '5557893214', 'Female', '42 Willow Lane, Boston, MA 02115'),
    ('c38d9e7a-5f16-4b2c-8e42-9d61af3b7c05', 'Alexander Wright', 'awright', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'awright@outlook.com', '5553219876', 'Male', '187 Park Avenue, New York, NY 10003'),
    ('9b45c208-65e7-4f3d-b913-a2c47e92d684', 'Olivia Martinez', 'omartinez', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'omartinez@yahoo.com', '5556784321', 'Female', '723 Sunset Blvd, Los Angeles, CA 90026'),
    ('7a1d9f65-4e82-43b0-9c57-8d31f7a2e509', 'William Chen', 'wchen', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'wchen@hotmail.com', '5554567890', 'Male', '56 Cherry St, San Francisco, CA 94107'),
    ('5e84b721-9f36-4a09-b2c5-7d48e93a6c01', 'Sophia Patel', 'spatel', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'spatel@gmail.com', '5551237890', 'Female', '412 Maple Drive, Chicago, IL 60611'),
    ('3d72a6f9-5b18-4e07-8c94-6a53d2b8c7e0', 'Benjamin Kim', 'bkim', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'bkim@yahoo.com', '5558901230', 'Male', '89 River Road, Austin, TX 78701'),
    ('1f63b584-7d29-4a06-9e81-5c47d0a3b9c2', 'Isabella Rodriguez', 'irodriguez', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'irodriguez@outlook.com', '5552345671', 'Female', '365 Ocean View, Miami, FL 33139'),
    ('8e25d7c3-4f91-4a07-b6d3-5a28e9c4f7d1', 'Ethan Nguyen', 'enguyen', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'enguyen@gmail.com', '5559876543', 'Male', '127 Pine Street, Seattle, WA 98101'),
    ('6c47b9d1-3e85-4a02-9f67-4d8c5e2a9b38', 'Mia Johnson', 'mjohnson', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'mjohnson@hotmail.com', '5553456781', 'Female', '234 Elm Court, Denver, CO 80202'),
    ('4a29c8f5-1d76-4b03-8e59-3f7a1d9b6c24', 'Lucas Garcia', 'lgarcia2', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'lgarcia2@yahoo.com', '5557651234', 'Male', '542 Oak Street, Portland, OR 97205'),
    ('2e14d7b9-3c58-4a01-7f49-2e6b1c8d5a34', 'Charlotte Wilson', 'cwilson', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'cwilson@gmail.com', '5554329876', 'Female', '867 Highland Ave, Atlanta, GA 30306'),
    ('0b92e6a4-5d47-4f09-6c31-1a8b7c6d5e43', 'Henry Jackson', 'hjackson', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'hjackson@outlook.com', '5558765432', 'Male', '319 Cypress Lane, Nashville, TN 37203'),
    ('9d81f7e5-2c36-4a08-5b24-0e9a8f7d6c52', 'Amelia Brown', 'abrown', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'abrown@hotmail.com', '5551098765', 'Female', '751 Magnolia Blvd, New Orleans, LA 70116'),
    ('7b63e5c2-1a25-4f06-4a13-9d8c7f6e5b41', 'Samuel Lee', 'slee', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'slee@gmail.com', '5554561230', 'Male', '624 Birch Street, Philadelphia, PA 19107'),
    ('5d42c3a9-8f14-4e05-3b02-8c7d6e5f4a30', 'Ava Davis', 'adavis', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'adavis@yahoo.com', '5557892341', 'Female', '493 Cedar Road, San Diego, CA 92101'),
    ('3b21a8f7-6d03-4f04-2a91-7b6c5d4e3f29', 'Noah Smith', 'nsmith', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'nsmith@outlook.com', '5552341567', 'Male', '178 Aspen Court, Minneapolis, MN 55401'),
    ('1a09f6e4-5c92-4e03-1b80-6a5b4c3d2e18', 'Grace Taylor', 'gtaylor', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'gtaylor@gmail.com', '5556782109', 'Female', '835 Spruce Drive, Phoenix, AZ 85004'),
    ('8e97d5c1-4b81-4f02-0a79-5d4e3f2c1b07', 'Liam Walker', 'lwalker', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'lwalker@hotmail.com', '5559870123', 'Male', '267 Redwood Lane, Dallas, TX 75201'),
    ('6c76b4a8-3a70-4e01-9d68-4c3b2d1a0f96', 'Zoe Harris', 'zharris', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'zharris@yahoo.com', '5553217654', 'Female', '542 Fir Avenue, Detroit, MI 48226'),
    ('4a54a3f7-2d69-4e00-8c57-3b2a1c0e9d85', 'Mason Clark', 'mclark', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Customer', 'mclark@gmail.com', '5558761234', 'Male', '913 Palm Street, Las Vegas, NV 89101');

INSERT INTO customer (id, member_information_id, brand_id, status, avatar) VALUES
    ('e4d3c2b1-a09f-4e8d-7c6b-5a4d3c2b1a09', 'f25a3b14-7d68-4c91-9cb2-87e4f2b39a16', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/female/23.jpg'),
    ('d3c2b1a0-9f8e-7d6c-5b4a-3d2c1b0a9f8e', 'c38d9e7a-5f16-4b2c-8e42-9d61af3b7c05', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/male/45.jpg'),
    ('c2b1a09f-8e7d-6c5b-4a3d-2c1b0a9f8e7d', '9b45c208-65e7-4f3d-b913-a2c47e92d684', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/female/12.jpg'),
    ('b1a09f8e-7d6c-5b4a-3d2c-1b0a9f8e7d6c', '7a1d9f65-4e82-43b0-9c57-8d31f7a2e509', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/male/32.jpg'),
    ('a09f8e7d-6c5b-4a3d-2c1b-0a9f8e7d6c5b', '5e84b721-9f36-4a09-b2c5-7d48e93a6c01', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/female/19.jpg'),
    ('9f8e7d6c-5b4a-3d2c-1b0a-9f8e7d6c5b4a', '3d72a6f9-5b18-4e07-8c94-6a53d2b8c7e0', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/male/61.jpg'),
    ('8e7d6c5b-4a3d-2c1b-0a9f-8e7d6c5b4a3d', '1f63b584-7d29-4a06-9e81-5c47d0a3b9c2', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/female/37.jpg'),
    ('7d6c5b4a-3d2c-1b0a-9f8e-7d6c5b4a3d2c', '8e25d7c3-4f91-4a07-b6d3-5a28e9c4f7d1', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/male/28.jpg'),
    ('6c5b4a3d-2c1b-0a9f-8e7d-6c5b4a3d2c1b', '6c47b9d1-3e85-4a02-9f67-4d8c5e2a9b38', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/female/42.jpg'),
    ('5b4a3d2c-1b0a-9f8e-7d6c-5b4a3d2c1b0a', '4a29c8f5-1d76-4b03-8e59-3f7a1d9b6c24', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/male/17.jpg'),
    ('4a3d2c1b-0a9f-8e7d-6c5b-4a3d2c1b0a9f', '2e14d7b9-3c58-4a01-7f49-2e6b1c8d5a34', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/female/53.jpg'),
    ('3d2c1b0a-9f8e-7d6c-5b4a-3d2c1b0a9f8e', '0b92e6a4-5d47-4f09-6c31-1a8b7c6d5e43', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/male/39.jpg'),
    ('2c1b0a9f-8e7d-6c5b-4a3d-2c1b0a9f8e7d', '9d81f7e5-2c36-4a08-5b24-0e9a8f7d6c52', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/female/27.jpg'),
    ('1b0a9f8e-7d6c-5b4a-3d2c-1b0a9f8e7d6c', '7b63e5c2-1a25-4f06-4a13-9d8c7f6e5b41', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/male/55.jpg'),
    ('0a9f8e7d-6c5b-4a3d-2c1b-0a9f8e7d6c5b', '5d42c3a9-8f14-4e05-3b02-8c7d6e5f4a30', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/female/33.jpg'),
    ('f8e7d6c5-b4a3-d2c1-b0a9-f8e7d6c5b4a3', '3b21a8f7-6d03-4f04-2a91-7b6c5d4e3f29', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/male/47.jpg'),
    ('e7d6c5b4-a3d2-c1b0-a9f8-e7d6c5b4a3d2', '1a09f6e4-5c92-4e03-1b80-6a5b4c3d2e18', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/female/15.jpg'),
    ('d6c5b4a3-d2c1-b0a9-f8e7-d6c5b4a3d2c1', '8e97d5c1-4b81-4f02-0a79-5d4e3f2c1b07', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg'),
    ('c5b4a3d2-c1b0-a9f8-e7d6-c5b4a3d2c1b0', '6c76b4a8-3a70-4e01-9d68-4c3b2d1a0f96', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Active', 'https://xsgames.co/randomusers/assets/avatars/female/21.jpg'),
    ('b4a3d2c1-b0a9-f8e7-d6c5-b4a3d2c1b0a9', '4a54a3f7-2d69-4e00-8c57-3b2a1c0e9d85', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Inactive', 'https://xsgames.co/randomusers/assets/avatars/male/49.jpg');

-- Staff Table
CREATE TABLE staff (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    member_information_id UUID NOT NULL REFERENCES member_information(id) ON DELETE CASCADE ON UPDATE CASCADE,
    branch_id UUID NOT NULL REFERENCES branch(id) ON DELETE CASCADE ON UPDATE CASCADE,
    position VARCHAR(50),
    avatar TEXT,
    salary INTEGER NOT NULL
);

INSERT INTO member_information (id, full_name, username, password, role, email, phone, gender, address) VALUES
    ('f83c4d62-1a7b-49c5-8e32-5b9ef7f1254a', 'Michael Carter', 'mcarter', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'mcarter@example.com', '5558761230', 'Male', '475 Oak Street, Seattle, WA 98102'),
    ('27a9d851-6c3e-4f87-b2d9-c03a85437916', 'Jennifer Patel', 'jpatel', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'jpatel@example.com', '5559823471', 'Female', '892 Maple Avenue, Portland, OR 97202'),
    ('58c3f924-7e5d-4baf-81c6-a0b25d73e481', 'Thomas Wilson', 'twilson', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'twilson@example.com', '5552196743', 'Male', '127 Cedar Road, San Francisco, CA 94107'),
    ('b529e81f-3d27-4c51-9f3a-8d2e7c4a6b95', 'Nicole Henderson', 'nhenderson', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'nhenderson@example.com', '5551478523', 'Female', '358 Pine Boulevard, Chicago, IL 60605'),
    ('6a4d9b7c-8e52-4f31-b026-5d17a3e84c92', 'Robert Chen', 'rchen', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'rchen@example.com', '5557854123', 'Male', '631 Spruce Lane, Seattle, WA 98103'),
    ('d2c8a513-7f94-4e68-b1a5-c7d936e40f28', 'Sarah Johnson', 'sjohnson2', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'sjohnson2@example.com', '5553214789', 'Female', '945 Birch Way, Seattle, WA 98104'),
    ('49e7b258-a1c6-4d93-8f5a-3b26c9741e05', 'David Kim', 'dkim', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'dkim@example.com', '5554789632', 'Male', '270 Elm Drive, Seattle, WA 98105'),
    ('813f5c72-e4b9-4a36-d2e7-9f5c1a8b7d64', 'Michelle Torres', 'mtorres', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'mtorres@example.com', '5556321459', 'Female', '783 Aspen Court, Seattle, WA 98106'), 
    ('92c5d847-6b3a-5e29-f1c8-4d7a9e6b5c34', 'Christopher Lee', 'clee2', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'clee2@example.com', '5558974561', 'Male', '436 Willow Street, Portland, OR 97203'),
    ('7d1e5a3f-8c4b-2e9d-6a7f-4b2e9c8d7a5f', 'Amanda Wright', 'awright2', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'awright@example.com', '5552584769', 'Female', '519 Redwood Path, Portland, OR 97204'),
    ('3b8c5d2e-1a7f-4b9d-5e3c-8f6a2d1b4e7c', 'Kevin Nguyen', 'knguyen', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'knguyen@example.com', '5557413698', 'Male', '642 Sequoia Circle, Portland, OR 97205'),
    ('5e9f2d1c-8b7a-6e3d-4f2c-1d5e9b7a3f2d', 'Stephanie Ross', 'sross', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'sross@example.com', '5551237896', 'Female', '925 Magnolia Avenue, Portland, OR 97206'),
    ('9c4e7d2a-5f3b-1e8c-7d5f-2e1c9b4a8d3e', 'Daniel Park', 'dpark', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'dpark@example.com', '5559684237', 'Male', '378 Juniper Lane, San Francisco, CA 94108'),
    ('1f8e5d2c-7b4a-9e3d-6c2f-5a1d8e7b4c3a', 'Jessica Martinez', 'jmartinez', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'jmartinez@example.com', '5553698741', 'Female', '741 Cypress Road, San Francisco, CA 94109'),
    ('8d4c2e7b-3f5a-1d9e-6c4b-8f5a2d1e7c3b', 'Andrew Thompson', 'athompson2', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'athompson2@example.com', '5556987412', 'Male', '156 Fir Drive, San Francisco, CA 94110'),
    ('4e2d9c7b-1f5a-8e3d-6b2f-9c4a7e2d1b5f', 'Rachel Santos', 'rsantos', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'rsantos@example.com', '5554712368', 'Female', '593 Sycamore Boulevard, San Francisco, CA 94111'),
    ('7b3f5d2e-9c4a-1d8e-7f3b-6c2d5e4a9b7c', 'Brian Taylor', 'btaylor', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'btaylor@example.com', '5557841236', 'Male', '827 Hickory Street, Chicago, IL 60606'),
    ('2d9e7b4f-5c3a-8d1e-4f2b-9c7d3e5a1b8f', 'Lisa Adams', 'ladams', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'ladams@example.com', '5552369874', 'Female', '216 Walnut Avenue, Chicago, IL 60607'),
    ('5c1d8e4f-2b7a-9d3e-6f2c-8b4d7a5e2c1f', 'Stephen Moore', 'smoore', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Manager', 'smoore@example.com', '5558523697', 'Male', '469 Cherry Lane, Chicago, IL 60608'),
    ('9e7d4c2b-1f5a-3e8d-7c4f-2b5e9d7c4b2a', 'Katherine Davis', 'kdavis', '$2a$10$40t2odlWr.2ibBzZ2q2JTuOVzXtJUEVPObw58/PCwL9XNh2jR4e26', 'Branch Employee', 'kdavis@example.com', '5551472583', 'Female', '713 Poplar Road, Chicago, IL 60609');

INSERT INTO staff (id, member_information_id, branch_id, position, salary, avatar) VALUES
    ('c547e832-9b14-4a67-8d25-3f98c61ae4b5', 'f83c4d62-1a7b-49c5-8e32-5b9ef7f1254a', '3a7f5b90-12fd-4d2a-9c17-7e2a4c3d948e', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/male/6.jpg'), 
    ('a9d26c84-5f31-4e79-b852-7c14d3e96f28', '6a4d9b7c-8e52-4f31-b026-5d17a3e84c92', '3a7f5b90-12fd-4d2a-9c17-7e2a4c3d948e', 'Branch Employee', 15000000, 'https://xsgames.co/randomusers/assets/avatars/female/5.jpg'),
    ('5e84b973-2c1f-4a96-8d35-7b42e9a5c618', '27a9d851-6c3e-4f87-b2d9-c03a85437916', 'b5e0cfd4-b58f-4401-962d-6eec1f493c3a', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/female/9.jpg'), 
    ('b147c369-8e52-4f7d-a936-2c58d41e9f73', 'd2c8a513-7f94-4e68-b1a5-c7d936e40f28', 'b5e0cfd4-b58f-4401-962d-6eec1f493c3a', 'Branch Employee', 12000000, 'https://xsgames.co/randomusers/assets/avatars/female/52.jpg'), 
    ('7c5e9d8f-2a3b-4c6d-8e7f-9a1b2c3d4e5f', '58c3f924-7e5d-4baf-81c6-a0b25d73e481', '58c22b5e-6171-4903-bf48-f1cc6c536f15', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/female/76.jpg'), 
    ('e3d4c9b8-7a6f-5e2d-1c4b-3a8f7e6d5c4b', '49e7b258-a1c6-4d93-8f5a-3b26c9741e05', '58c22b5e-6171-4903-bf48-f1cc6c536f15', 'Branch Employee', 19000000, 'https://xsgames.co/randomusers/assets/avatars/male/14.jpg'), 
    ('f4e5d6c7-b8a9-1e2d-3c4b-5f6e7d8a9b0c', 'b529e81f-3d27-4c51-9f3a-8d2e7c4a6b95', 'db275da2-9b63-4638-8fc6-7df0a0e7f2e0', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/male/32.jpg'), 
    ('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', '813f5c72-e4b9-4a36-d2e7-9f5c1a8b7d64', 'db275da2-9b63-4638-8fc6-7df0a0e7f2e0', 'Branch Employee', 16500000, 'https://xsgames.co/randomusers/assets/avatars/male/65.jpg'), 
    ('7b8c9d0e-1f2a-3b4c-5d6e-7f8a9b0c1d2e', '7d1e5a3f-8c4b-2e9d-6a7f-4b2e9c8d7a5f', '456aaf52-4262-4c91-a79a-cb647e8086d3', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/male/8.jpg'), 
    ('d7c6b5a4-3e2f-1d0c-b9a8-7f6e5d4c3b2a', '92c5d847-6b3a-5e29-f1c8-4d7a9e6b5c34', '456aaf52-4262-4c91-a79a-cb647e8086d3', 'Branch Employee', 11500000, 'https://xsgames.co/randomusers/assets/avatars/male/48.jpg'), 
    ('3f2e1d4c-5b6a-7d8e-9f0a-1b2c3d4e5f6a', '3b8c5d2e-1a7f-4b9d-5e3c-8f6a2d1b4e7c', 'f2c5c120-62de-48ec-a845-4eb1f33dd42e', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/male/62.jpg'),
    ('9e8d7c6b-5a4f-3e2d-1c0b-a9f8e7d6c5b4', '5e9f2d1c-8b7a-6e3d-4f2c-1d5e9b7a3f2d', 'f2c5c120-62de-48ec-a845-4eb1f33dd42e', 'Branch Employee', 14000000, 'https://xsgames.co/randomusers/assets/avatars/female/40.jpg'), 
    ('5f4e3d2c-1b0a-9f8e-7d6c-5b4a3f2e1d0c', '9c4e7d2a-5f3b-1e8c-7d5f-2e1c9b4a8d3e', 'e758d3d7-2be0-4077-8468-1b5c059e1a04', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/female/46.jpg'), 
    ('1c2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f', '1f8e5d2c-7b4a-9e3d-6c2f-5a1d8e7b4c3a', 'e758d3d7-2be0-4077-8468-1b5c059e1a04', 'Branch Employee', 13000000, 'https://xsgames.co/randomusers/assets/avatars/female/42.jpg'), 
    ('7e8f9a0b-1c2d-3e4f-5a6b-7c8d9e0f1a2b', '8d4c2e7b-3f5a-1d9e-6c4b-8f5a2d1e7c3b', 'a81b13fa-9820-4fd6-946b-7a3534e9b7c0', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg'), 
    ('3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a', '4e2d9c7b-1f5a-8e3d-6b2f-9c4a7e2d1b5f', 'a81b13fa-9820-4fd6-946b-7a3534e9b7c0', 'Branch Employee', 20000000, 'https://xsgames.co/randomusers/assets/avatars/male/41.jpg'), 
    ('9b0c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e', '7b3f5d2e-9c4a-1d8e-7f3b-6c2d5e4a9b7c', '760c511e-c933-4a7d-8b1a-5aa39d6b46de', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/male/23.jpg'), 
    ('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', '2d9e7b4f-5c3a-8d1e-4f2b-9c7d3e5a1b8f', '760c511e-c933-4a7d-8b1a-5aa39d6b46de', 'Branch Employee', 18500000, 'https://xsgames.co/randomusers/assets/avatars/male/55.jpg'), 
    ('1d2e3f4a-5b6c-7d8e-9f0a-1b2c3d4e5f6a', '5c1d8e4f-2b7a-9d3e-6f2c-8b4d7a5e2c1f', 'd8edc4e6-1988-4cd4-b679-1c6de39992b1', 'Branch Manager', 30000000, 'https://xsgames.co/randomusers/assets/avatars/male/5.jpg'),
    ('7f8e9d0c-1b2a-3d4e-5f6a-7b8c9d0e1f2a', '9e7d4c2b-1f5a-3e8d-7c4f-2b5e9d7c4b2a', 'd8edc4e6-1988-4cd4-b679-1c6de39992b1', 'Branch Employee', 12500000, 'https://xsgames.co/randomusers/assets/avatars/male/20.jpg');

-- User's Order Table
CREATE TABLE "order" (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    branch_id UUID NOT NULL REFERENCES branch(id) ON DELETE CASCADE ON UPDATE CASCADE,
    status VARCHAR(50) NOT NULL,
    type VARCHAR(50),
    preorder_time TIME,
    late BOOLEAN NOT NULL DEFAULT false,
    resolved BOOLEAN NOT NULL DEFAULT false,
    payment_method VARCHAR(50) NOT NULL,
    cart JSONB DEFAULT '{"total_price": 0, "items": []}',
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Feedback Table
CREATE TABLE feedback (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customer(id) ON DELETE CASCADE ON UPDATE CASCADE,
    branch_id UUID NOT NULL REFERENCES branch(id) ON DELETE CASCADE ON UPDATE CASCADE,
    type VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    status VARCHAR(10) NOT NULL DEFAULT 'Pending', 
    solved_by UUID REFERENCES member_information(id) ON DELETE CASCADE ON UPDATE CASCADE,
    updated_at TIMESTAMP,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Product Table
CREATE TABLE product (
    id UUID NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_id UUID NOT NULL REFERENCES brand(id) ON DELETE CASCADE ON UPDATE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    photo TEXT NOT NULL,
    stock INTEGER NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO product (id, brand_id, name, type, description, price, photo, stock) VALUES
    ('a7e89c23-fc12-4b4e-b0f6-9d8a8c6d9e72', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Espresso', 'Coffee', 'A strong, concentrated coffee shot with a rich crema.', 25000, 'https://images.unsplash.com/photo-1511920170033-f8396924c348', 100),
    ('b2f71d45-1a6c-49d7-8e15-4c76b9d87a3e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Americano', 'Coffee', 'Espresso diluted with hot water for a milder taste.', 27000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 130),
    ('c3e82f67-2b7d-41e8-9f26-5d87b4e19c4f', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Cappuccino', 'Coffee', 'Espresso with steamed milk and a thick layer of foam.', 30000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 158),
    ('d4f93e89-3c8e-42f9-a037-6e98c5f2a7d0', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Latte', 'Coffee', 'Espresso mixed with steamed milk and a light foam topping.', 32000, 'https://images.unsplash.com/photo-1521302080334-4bebac2760f4', 151),
    ('e5a04f9a-4d9f-43ea-b148-7f09d6e3b8e1', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Mocha', 'Coffee', 'A chocolate-flavored variant of a latte.', 35000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 47),
    ('f6b15e0b-5ea0-44fb-c259-8e1a7f4c9f24', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Flat White', 'Coffee', 'Espresso with microfoam, offering a velvety texture.', 31000, 'https://images.unsplash.com/photo-1521302080334-4bebac2760f4', 21),
    ('a7c26f1c-6eb1-45fc-d36a-9f2b8e0d02a3', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Macchiato', 'Coffee', 'Espresso marked with a small amount of steamed milk.', 28000, 'https://images.unsplash.com/photo-1511920170033-f8396924c348', 14),
    ('b8d37e2d-7fc2-46ed-e47b-a03c9f1e11b4', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Cortado', 'Coffee', 'Equal parts espresso and steamed milk.', 29000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 47),
    ('c9e48f3e-8ed3-47fe-f58c-b14d0e2f42c5', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Affogato', 'Coffee', 'Espresso poured over a scoop of vanilla ice cream.', 40000, 'https://images.unsplash.com/photo-1511920170033-f8396924c348',36),
    ('d0f59e4f-9fe4-48ff-e69d-c25e1f3e23d6', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Irish Coffee', 'Coffee', 'Coffee combined with Irish whiskey and cream.', 45000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 75),
    ('e1f60f5e-a0f5-49e0-f7ae-d36f2e41f4e7', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Cold Brew', 'Coffee', 'Smooth, cold-extracted coffee served over ice.', 33000, 'https://images.unsplash.com/photo-1567934152031-9c3b6df3b3f3', 24),
    ('f2e71e6f-b1e6-40f1-e8bf-e47e3f51e5f8', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Nitro Cold Brew', 'Coffee', 'Cold brew infused with nitrogen for a creamy texture.', 37000, 'https://images.unsplash.com/photo-1605478488243-3f81a837a6b6', 36),
    ('a3f82f7e-c2f7-41f2-f9ce-f58f4f60f6e9', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Iced Latte', 'Coffee', 'Espresso with cold milk and ice.', 32000, 'https://images.unsplash.com/photo-1541167760496-1628856ab772', 78),
    ('b4e93e8f-d3e8-42f3-eadf-e69e5e7e47f0', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Iced Mocha', 'Coffee', 'Chilled mocha drink with milk and chocolate.', 34000, 'https://images.unsplash.com/photo-1564844533300-1a5e3e1c4a30', 99),
    ('c5fa4f9e-e4f9-43f4-fbe0-f7a06f8f78e1', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Vietnamese Iced Coffee', 'Coffee', 'Strong coffee with sweetened condensed milk over ice.', 30000, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2e', 100),
    ('d6eb5eaf-f5ea-44f5-ecf1-e8b17e96e9f2', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Caramel Macchiato', 'Coffee', 'Espresso with vanilla, milk, and caramel drizzle.', 36000, 'https://images.unsplash.com/photo-1548365328-9e4f5f4f6eb4', 14),
    ('e7fc6fbe-e6fb-45f6-fde2-f9c28faf4a03', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Hazelnut Latte', 'Coffee', 'Espresso with steamed milk and hazelnut flavor.', 33000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 42),
    ('f8ed7ecf-f7ec-46f7-eef3-ead39e5bfb14', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Vanilla Cappuccino', 'Coffee', 'Cappuccino infused with vanilla syrup.', 33000, 'https://images.unsplash.com/photo-1541167760496-1628856ab772', 56),
    ('a9fe8fde-e8fd-47f8-fff4-fbe4afc5ec25', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Pumpkin Spice Latte', 'Coffee', 'Seasonal latte with pumpkin, cinnamon, and nutmeg.', 37000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 57),
    ('b0ef9eef-f9ee-48f9-e0f5-ecf5bedf2d36', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Espresso Con Panna', 'Coffee', 'Espresso topped with whipped cream.', 29000, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2e', 58),
    ('c1f0aff0-eaff-49fa-f1f6-fde6cfe4ee47', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Ristretto', 'Coffee', 'A more concentrated shot of espresso.', 27000, 'https://images.unsplash.com/photo-1511920170033-f8396924c348', 59),
    ('d2e1be0f-fbe0-40fb-e2f7-eff7deffdf58', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Long Black', 'Coffee', 'Hot water topped with espresso.', 27000, 'https://images.unsplash.com/photo-1521302080334-4bebac2760f4', 93),
    ('e3f2cf1e-ecf1-41fc-f3f8-f0e8efe0ee69', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Doppio', 'Coffee', 'Double shot of espresso for extra strength.', 29000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 22),
    ('f4e3de2f-fde2-42fd-e4f9-f1f9fff1ff7a', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Iced Americano', 'Coffee', 'Espresso diluted with cold water over ice.', 28000, 'https://images.unsplash.com/photo-1541167760496-1628856ab772', 24),
    ('a5f4ef3e-eef3-43fe-f5fa-e2fa00e20f8b', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Toffee Nut Latte', 'Coffee', 'Rich toffee flavor blended in a creamy latte.', 34000, 'https://images.unsplash.com/photo-1564844533300-1a5e3e1c4a30', 27),
    ('b6e5f04f-ff04-44ff-e6fb-f3fb11f31e9c', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Tiramisu Latte', 'Coffee', 'Coffee with mascarpone flavor and cocoa dust.', 35000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 28),
    ('c7f6e15e-e0f5-45e0-f7fc-e4fc22e42f0d', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'White Chocolate Mocha', 'Coffee', 'Espresso with white chocolate syrup and milk.', 36000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 29),
    ('d8e7f26f-f1f6-46f1-e8ed-f5ed33f53e1e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Java Chip Frappe', 'Coffee', 'Blended coffee with chocolate chips and whipped cream.', 39000, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2e', 30),
    ('e9f8e37e-e2f7-47f2-f9fe-e6fe44f64f2f', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Matcha Espresso Fusion', 'Coffee', 'Layered matcha and espresso drink.', 35000, 'https://images.unsplash.com/photo-1548365328-9e4f5f4f6eb4', 31),
    ('f0e9f48f-f3f8-48f3-eaef-f7ef55e75e3e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Spanish Latte', 'Coffee', 'Sweetened condensed milk and espresso over ice.', 33000, 'https://images.unsplash.com/photo-1541167760496-1628856ab772', 32),
    ('a1fae59e-e4f9-49f4-fbf0-e8f066f86f4f', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Coconut Cold Brew', 'Coffee', 'Cold brew mixed with coconut milk.', 34000, 'https://images.unsplash.com/photo-1567934152031-9c3b6df3b3f3', 33),
    ('b2ebf6af-f5fa-40f5-ecf1-f9f177f97e5e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Salted Caramel Cold Brew', 'Coffee', 'Sweet and salty cold brew with cream foam.', 36000, 'https://images.unsplash.com/photo-1564844533300-1a5e3e1c4a30', 34),
    ('c3fcf7be-e6fb-41f6-fde2-eae288ea8f6f', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Honey Almond Milk Latte', 'Coffee', 'Honey and almond milk with espresso.', 34000, 'https://images.unsplash.com/photo-1605478488243-3f81a837a6b6', 35),
    ('d4ede8cf-f7ec-42f7-eef3-fbf399fb9e7e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Oat Milk Latte', 'Coffee', 'Smooth and creamy latte with oat milk.', 33000, 'https://images.unsplash.com/photo-1521302080334-4bebac2760f4', 36),
    ('e5fef9de-e8fd-43f8-fff4-ecf4aaeaaf8f', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Iced Coffee with Cream', 'Coffee', 'Cold brewed coffee with fresh cream.', 31000, 'https://images.unsplash.com/photo-1564844533300-1a5e3e1c4a30', 37),
    ('f6efface-f9fe-44f9-e0f5-fde5bbfbbe9e', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Chocolate Affogato', 'Coffee', 'Espresso poured over chocolate ice cream.', 40000, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2e', 38),
    ('a70e01bf-eaef-45fa-f1f6-eef6cceccfaf', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Chai Coffee Latte', 'Coffee', 'Fusion of chai spices and coffee.', 35000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 39),
    ('b81f12ce-fbf0-46fb-e2f7-fff7ddeddebe', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Brown Sugar Iced Latte', 'Coffee', 'Espresso and milk with brown sugar syrup.', 34000, 'https://images.unsplash.com/photo-1548365328-9e4f5f4f6eb4', 40),
    ('c92e23df-ecf1-47fc-f3f8-e0e8eeffdcfd', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Dirty Chai', 'Coffee', 'Chai tea with a shot of espresso.', 35000, 'https://images.unsplash.com/photo-1567934152031-9c3b6df3b3f3', 41),
    ('d03f34ee-fde2-48fd-e4f9-f1f9fffecdec', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Turkish Coffee', 'Coffee', 'Traditional strong coffee with foam.', 32000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 42),
    ('e14e45ff-eef3-49fe-f5fa-e2faddfddfdb', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Greek Frappe', 'Coffee', 'Shaken instant coffee with sugar and milk.', 30000, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 43),
    ('f25f56ee-ff04-40ff-e6fb-f3fbeefececa', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Kopi Luwak', 'Coffee', 'Exotic coffee made from civet-processed beans.', 95000, 'https://images.unsplash.com/photo-1521302080334-4bebac2760f4', 44),
    ('a36e67ff-e0f5-41e0-f7fc-e4fcfffddfb9', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Egg Coffee', 'Coffee', 'Vietnamese coffee with whipped egg cream.', 35000, 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2e', 45),
    ('b47f78ee-f1f6-42f1-e8ed-f5edee2ecca8', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Black Eye', 'Coffee', 'Drip coffee with two shots of espresso.', 36000, 'https://images.unsplash.com/photo-1541167760496-1628856ab772', 46),
    ('c58e89ff-e2f7-43f2-f9fe-e6fedd4fdb97', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Red Eye', 'Coffee', 'Coffee with one espresso shot.', 34000, 'https://images.unsplash.com/photo-1564844533300-1a5e3e1c4a30', 47),
    ('d69f9aee-f3f8-44f3-eaef-f7efc4cebb86', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Brewed Coffee', 'Coffee', 'Classic brewed filter coffee.', 28000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', 48),
    ('e7a0abff-e4f9-45f4-fbf0-e8f0bb02a975', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Drip Coffee', 'Coffee', 'Manual pour-over brewed coffee.', 27000, 'https://images.unsplash.com/photo-1541167760496-1628856ab772', 49),
    ('f8b1bcee-f5fa-46f5-ecf1-f9f1995aa864', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Iced Flat White', 'Coffee', 'Flat white served over ice for a cold twist.', 31000, 'https://images.unsplash.com/photo-1567934152031-9c3b6df3b3f3', 50),
    ('a9c2cdff-e6fb-47f6-fde2-eae2a9429753', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Lavender Latte', 'Coffee', 'Latte infused with floral lavender syrup.', 37000, 'https://images.unsplash.com/photo-1548365328-9e4f5f4f6eb4', 51),
    ('b0d3deee-f7ec-48f7-eef3-fbf388886542', 'c1cb7132-58e3-41ce-8f27-ea320c9273ba', 'Maple Cinnamon Latte', 'Coffee', 'Sweet maple flavor blended with cinnamon.', 36000, 'https://images.unsplash.com/photo-1605478488243-3f81a837a6b6', 52);

-- Session
CREATE TABLE session (
  sid varchar PRIMARY KEY,
  sess json NOT NULL,
  expire timestamp NOT NULL
);