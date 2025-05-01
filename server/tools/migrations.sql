-- SQL for a posgresql database
-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    birthDate DATE,
    image TEXT,
    university VARCHAR(255),
    role VARCHAR(50) NOT NULL
);

-- Insert example users
INSERT INTO users (firstName, lastName, age, gender, email, phone, birthDate, image, university, role)
VALUES
    ('John', 'Doe', 28, 'Male', 'john.doe@example.com', '555-123-4567', '1995-05-15', 'https://randomuser.me/api/portraits/men/1.jpg', 'State University', 'customer'),
    ('Jane', 'Smith', 34, 'Female', 'jane.smith@example.com', '555-987-6543', '1989-09-23', 'https://randomuser.me/api/portraits/women/2.jpg', 'Tech Institute', 'customer'),
    ('Bob', 'Johnson', 45, 'Male', 'bob.johnson@example.com', '555-555-5555', '1978-12-10', 'https://randomuser.me/api/portraits/men/3.jpg', 'Business School', 'admin'),
    ('Sara', 'Wilson', 22, 'Female', 'sara.wilson@example.com', '555-222-3333', '2001-03-28', 'https://randomuser.me/api/portraits/women/4.jpg', 'Art College', 'customer');

-- Add indexes for performance optimization
CREATE INDEX idx_users_email ON users(email);

-- Create the products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    rating NUMERIC(3, 2),
    stock INT,
    tags TEXT [],
    brand VARCHAR(100),
    sku VARCHAR(50),
    weight NUMERIC(10, 2),
    dimensions JSONB,
    shipping_information TEXT,
    availability_status VARCHAR(50),
    return_policy TEXT,
    minimum_order_quantity INT,
    meta JSONB,
    images TEXT [],
    thumbnail TEXT
);

-- Insert example products
INSERT INTO products (title, description, category, price, rating, stock, tags, brand, sku, weight, dimensions, shipping_information, availability_status, return_policy, minimum_order_quantity, meta, images, thumbnail)
VALUES
    ('Smartphone X', 'Latest smartphone model with advanced features', 'Electronics', 999.99, 4.5, 100, ARRAY['phone', 'mobile', 'tech'], 'TechBrand', 'SM-X100', 0.35, '{"width": 7.5, "height": 15.0, "depth": 0.8}', 'Free shipping on orders over $50', 'In Stock', '30-day return policy', 1, '{"release_year": 2023, "colors": ["black", "silver", "gold"]}', ARRAY['https://example.com/phone1.jpg', 'https://example.com/phone2.jpg'], 'https://example.com/phone_thumb.jpg'),
    ('Ergonomic Chair', 'Office chair with lumbar support and adjustable height', 'Furniture', 249.99, 4.2, 50, ARRAY['chair', 'office', 'ergonomic'], 'ComfortPlus', 'EC-200', 15.8, '{"width": 60.0, "height": 120.0, "depth": 65.0}', 'Standard shipping: 3-5 business days', 'In Stock', '14-day return policy', 1, '{"colors": ["black", "gray"], "material": "mesh"}', ARRAY['https://example.com/chair1.jpg', 'https://example.com/chair2.jpg'], 'https://example.com/chair_thumb.jpg'),
    ('Organic Coffee Beans', 'Premium organic coffee beans from Colombia', 'Food', 19.99, 4.8, 200, ARRAY['coffee', 'organic', 'beverages'], 'BeanMaster', 'OCB-500', 0.5, '{"width": 10.0, "height": 20.0, "depth": 5.0}', 'Same day shipping for orders before 2pm', 'In Stock', '7-day return policy if unopened', 2, '{"origin": "Colombia", "roast": "medium"}', ARRAY['https://example.com/coffee1.jpg', 'https://example.com/coffee2.jpg'], 'https://example.com/coffee_thumb.jpg');

-- Create the product_reviews table
CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    rating NUMERIC(3, 2) NOT NULL,
    comment TEXT,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert example product reviews
INSERT INTO product_reviews (product_id, user_id, rating, comment)
VALUES
    (1, 1, 4.5, 'Great smartphone! The camera quality is outstanding.'),
    (1, 2, 3.8, 'Good phone, but battery life could be better.'),
    (2, 3, 5.0, 'Most comfortable chair I have ever used!'),
    (3, 4, 4.7, 'Excellent coffee, would buy again.');

-- Add indexes for performance optimization
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_tags ON products USING GIN(tags);
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_product_reviews_user_id ON product_reviews(user_id);

-- Create the orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    total_amount NUMERIC(10, 2) NOT NULL,
    shipping_address JSONB,
    payment_method VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert example orders
INSERT INTO orders (user_id, status, total_amount, shipping_address, payment_method)
VALUES
    (1, 'Completed', 1249.98, '{"street": "123 Main St", "city": "New York", "state": "NY", "zip": "10001", "country": "USA"}', 'Credit Card'),
    (2, 'Processing', 19.99, '{"street": "456 Oak Ave", "city": "Los Angeles", "state": "CA", "zip": "90001", "country": "USA"}', 'PayPal'),
    (4, 'Shipped', 269.98, '{"street": "789 Pine Rd", "city": "Chicago", "state": "IL", "zip": "60601", "country": "USA"}', 'Credit Card');

-- Create the order_items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

-- Insert example order items
INSERT INTO order_items (order_id, product_id, quantity, price)
VALUES
    (1, 1, 1, 999.99),
    (1, 3, 1, 249.99),
    (2, 3, 1, 19.99),
    (3, 2, 1, 249.99),
    (3, 3, 1, 19.99);

-- Add indexes for performance optimization
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- The following SQL statements are used to allow aggregate functions in PostgREST
ALTER ROLE authenticator
SET pgrst.db_aggregates_enabled = 'true';
NOTIFY pgrst,
'reload config';