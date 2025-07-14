-- Insert sample agents
INSERT INTO agents (first_name, last_name, email, phone, license_number, hire_date) VALUES
('John', 'Smith', 'john.smith@insurance.com', '555-0101', 'LIC001', '2023-01-15'),
('Sarah', 'Johnson', 'sarah.johnson@insurance.com', '555-0102', 'LIC002', '2023-02-20'),
('Michael', 'Brown', 'michael.brown@insurance.com', '555-0103', 'LIC003', '2023-03-10');

-- Insert sample customers
INSERT INTO customers (first_name, last_name, email, phone, date_of_birth, address, city, state, zip_code) VALUES
('Alice', 'Wilson', 'alice.wilson@email.com', '555-1001', '1985-06-15', '123 Main St', 'New York', 'NY', '10001'),
('Bob', 'Davis', 'bob.davis@email.com', '555-1002', '1978-09-22', '456 Oak Ave', 'Los Angeles', 'CA', '90210'),
('Carol', 'Miller', 'carol.miller@email.com', '555-1003', '1990-12-03', '789 Pine Rd', 'Chicago', 'IL', '60601'),
('David', 'Garcia', 'david.garcia@email.com', '555-1004', '1982-04-18', '321 Elm St', 'Houston', 'TX', '77001');

-- Insert sample policies
INSERT INTO policies (customer_id, policy_number, policy_type, coverage_amount, premium_amount, premium_frequency, start_date, beneficiary_name, beneficiary_relationship) VALUES
(1, 'POL-2024-001', 'term', 500000.00, 125.50, 'monthly', '2024-01-01', 'John Wilson', 'spouse'),
(2, 'POL-2024-002', 'whole', 250000.00, 89.75, 'monthly', '2024-02-15', 'Jane Davis', 'spouse'),
(3, 'POL-2024-003', 'term', 750000.00, 185.25, 'monthly', '2024-03-01', 'Robert Miller', 'spouse'),
(4, 'POL-2024-004', 'universal', 1000000.00, 245.00, 'monthly', '2024-01-20', 'Maria Garcia', 'spouse');

-- Assign agents to policies
INSERT INTO policy_agents (policy_id, agent_id) VALUES
(1, 1), (2, 1), (3, 2), (4, 3);

-- Insert sample payments
INSERT INTO payments (policy_id, payment_amount, payment_date, payment_method, transaction_id, status) VALUES
(1, 125.50, '2024-01-01', 'credit_card', 'TXN-001', 'completed'),
(1, 125.50, '2024-02-01', 'credit_card', 'TXN-002', 'completed'),
(2, 89.75, '2024-02-15', 'bank_transfer', 'TXN-003', 'completed'),
(3, 185.25, '2024-03-01', 'credit_card', 'TXN-004', 'completed'),
(4, 245.00, '2024-01-20', 'bank_transfer', 'TXN-005', 'completed');

-- Insert a sample claim
INSERT INTO claims (policy_id, claim_number, claim_type, claim_amount, claim_date, description, documents_submitted) VALUES
(1, 'CLM-2024-001', 'disability', 50000.00, '2024-06-15', 'Temporary disability claim due to accident', true);
