-- ============================================================================
-- BatchSync — Seed Data (Initial Production & Demonstration Dataset)
-- Relational MySQL Schema (MySQL 8.0+)
-- ============================================================================

USE `batchsync_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. SEED FACULTIES
DELETE FROM `faculties`;
INSERT INTO `faculties` (`id`, `name`, `code`, `slug`, `established`, `batches_count`, `enrolled_students`, `dean_name`, `dean_email`, `dean_designation`, `status`, `color`, `description`, `telegram_channel`) VALUES
('fac-1', 'Faculty of Computer Science & Engineering', 'CSE', 'cse', 2001, 18, 1420, 'Prof. Dr. Anwarul Hoque', 'dean.cse@university.edu', 'Senior Professor', 'Active', '#2563eb', 'Leading computational science, software engineering, intelligent systems, and networked digital infrastructure.', 'batchsync_cse'),
('fac-2', 'Faculty of Agriculture', 'AGRI', 'agri', 2003, 12, 980, 'Prof. Dr. Tahmina Begum', 'dean.agri@university.edu', 'Chair & Dean of Agriculture', 'Active', '#059669', 'Dedicated to agronomy, crop enhancement, soil sustainability, and modern agricultural field technologies.', 'batchsync_agri'),
('fac-3', 'Faculty of Business Administration', 'FBA', 'fba', 2004, 20, 1650, 'Prof. Kazi Mesbahuddin', 'dean.fba@university.edu', 'Professor of Finance', 'Active', '#d97706', 'Educating future leaders in financial analytics, strategic management, entrepreneurship, and commerce.', 'batchsync_fba'),
('fac-4', 'Faculty of Environmental Science & Disaster Mgmt', 'ESDM', 'esdm', 2008, 8, 540, 'Prof. Dr. SM Zafar Alam', 'dean.esdm@university.edu', 'Dean & Professor of Climate Dynamics', 'Active', '#0d9488', 'Specialized coastal resilience, GIS spatial analytics, climate adaptation, and emergency mitigation studies.', 'batchsync_esdm'),
('fac-5', 'Faculty of Fisheries & Marine Science', 'FMS', 'fms', 2011, 9, 620, 'Dr. Ashraful Haque', 'dean.fms@university.edu', 'Associate Professor & Dean', 'Active', '#0284c7', 'Advancing aquaculture biology, estuarine preservation, marine biodiversity, and hatchery operations.', 'batchsync_fms'),
('fac-6', 'Faculty of Law & Justice', 'FLJ', 'flj', 2014, 6, 410, 'Barrister Shahriar Parvez', 'dean.flj@university.edu', 'Dean of Law', 'Active', '#7c3aed', 'Cultivating legal scholarship, constitutional advocacy, moot court trial practice, and ethical jurisprudence.', 'batchsync_flj'),
('fac-7', 'Faculty of Nutrition & Food Science', 'FNFS', 'fnfs', 2017, 5, 390, NULL, NULL, NULL, 'Active', '#e11d48', 'Investigating clinical dietetics, food security processing, microbiological safety, and community health interventions.', 'batchsync_fnfs'),
('fac-8', 'Faculty of Animal Science & Veterinary Medicine', 'FASVM', 'fasvm', 2018, 14, 820, 'Prof. Dr. Zahid Hasan', 'dean.fasvm@university.edu', 'Professor & Dean', 'Active', '#4f46e5', 'Excellence in veterinary clinical pathology, livestock genetics, surgical diagnostics, and epidemiology.', 'batchsync_fasvm');

-- 2. SEED DEPARTMENTS
DELETE FROM `departments`;
INSERT INTO `departments` (`id`, `faculty_id`, `code`, `name`, `chairperson`, `batches_count`, `teacher_count`, `student_count`) VALUES
('dept-cse-1', 'fac-1', 'CSE', 'Computer Science & Engineering', 'Dr. A. Hoque', 8, 28, 640),
('dept-cse-2', 'fac-1', 'ICE', 'Information & Communication Engineering', 'Dr. N. Sultana', 4, 16, 320),
('dept-cse-3', 'fac-1', 'SE', 'Software Engineering', 'Dr. S. Rahman', 4, 14, 310),
('dept-cse-4', 'fac-1', 'CSIT', 'Computer Systems & IT', 'Dr. M. Islam', 2, 10, 150),
('dept-agri-1', 'fac-2', 'AGRON', 'Dept. of Agronomy', 'Prof. R. Alam', 4, 12, 340),
('dept-agri-2', 'fac-2', 'HORT', 'Dept. of Horticulture', 'Dr. F. Yasmin', 4, 10, 320),
('dept-agri-3', 'fac-2', 'SOIL', 'Dept. of Soil Science', 'Dr. M. Haque', 4, 9, 320),
('dept-fba-1', 'fac-3', 'MKT', 'Dept. of Marketing', 'Dr. K. Zaman', 5, 11, 420),
('dept-fba-2', 'fac-3', 'FIN', 'Dept. of Finance & Banking', 'Prof. K. Mesbahuddin', 5, 12, 450),
('dept-fba-3', 'fac-3', 'ACC', 'Dept. of Accounting', 'Dr. S. Akhtar', 4, 9, 360),
('dept-fba-4', 'fac-3', 'MGT', 'Dept. of Management', 'Prof. A. Wadud', 4, 8, 300),
('dept-fba-5', 'fac-3', 'HRM', 'Dept. of Human Resource Management', 'Dr. T. Ahmed', 2, 6, 120),
('dept-esdm-1', 'fac-4', 'ENV', 'Dept. of Environmental Science', 'Prof. SM Zafar Alam', 4, 10, 280),
('dept-esdm-2', 'fac-4', 'DM', 'Dept. of Disaster Management', 'Dr. N. Chowdhury', 4, 8, 260),
('dept-fms-1', 'fac-5', 'AQUA', 'Dept. of Aquaculture', 'Dr. A. Haque', 3, 8, 220),
('dept-fms-2', 'fac-5', 'FISH_BIO', 'Dept. of Fisheries Biology & Genetics', 'Dr. L. Begum', 3, 7, 200),
('dept-fms-3', 'fac-5', 'FISH_TECH', 'Dept. of Fisheries Technology', 'Prof. S. R. Majumder', 3, 7, 200),
('dept-flj-1', 'fac-6', 'LAW', 'Dept. of Law', 'Barrister Shahriar Parvez', 4, 10, 260),
('dept-flj-2', 'fac-6', 'CLJ', 'Dept. of Comparative Law & Jurisprudence', 'Dr. M. Reza', 2, 6, 150),
('dept-fnfs-1', 'fac-7', 'FTECH', 'Dept. of Food Technology', 'Dr. N. Sultana', 3, 7, 210),
('dept-fnfs-2', 'fac-7', 'CNUT', 'Dept. of Clinical Nutrition', 'Dr. M. S. Hossain', 2, 6, 180),
('dept-fasvm-1', 'fac-8', 'VET_MED', 'Dept. of Medicine, Surgery & Obstetrics', 'Prof. Dr. Z. Hasan', 3, 9, 190),
('dept-fasvm-2', 'fac-8', 'MICRO', 'Dept. of Microbiology & Public Health', 'Dr. B. K. Paul', 3, 8, 170),
('dept-fasvm-3', 'fac-8', 'AN_GEN', 'Dept. of Animal Breeding & Genetics', 'Dr. S. K. Das', 2, 6, 130),
('dept-fasvm-4', 'fac-8', 'PATH', 'Dept. of Pathology & Parasitology', 'Dr. M. A. Ali', 2, 6, 120),
('dept-fasvm-5', 'fac-8', 'PHYSIO', 'Dept. of Physiology & Pharmacology', 'Dr. R. K. Debnath', 2, 5, 110),
('dept-fasvm-6', 'fac-8', 'DAIRY', 'Dept. of Dairy Science', 'Dr. A. K. M. Mostafa', 1, 4, 50),
('dept-fasvm-7', 'fac-8', 'POULTRY', 'Dept. of Poultry Science', 'Dr. M. R. Karim', 1, 4, 50);

-- 3. SEED SCHEDULES
DELETE FROM `schedules`;
INSERT INTO `schedules` (`id`, `time`, `duration`, `course_code`, `course_name`, `teacher`, `room`, `original_room`, `batch`, `section`, `status`, `status_badge_text`, `note`, `override_code`) VALUES
('sched-1', '10:00 AM – 11:30 AM', '90m', 'CSE-311', 'Database Management Systems', 'Prof. M. Rahman', 'Room 301', 'Room 204', 'Batch 12', 'Section A', 'override', 'Room Changed', 'The query execution demo requires the high-lumen overhead projector in Room 301. Attendance policy remains standard.', 'ADMIN OVERRIDE #491'),
('sched-2', '01:30 PM – 03:30 PM', '120m', 'CSE-312', 'DBMS Sessional Lab', 'Lecturer S. Haque', 'Software Lab 2', NULL, 'Batch 12', 'Section A', 'upcoming', 'Upcoming', 'Hands-on practice on index optimization and relational query execution plans.', NULL),
('sched-3', '03:30 PM – 05:00 PM', '90m', 'CSE-315', 'Theory of Computing', 'Teacher on Academic Deputation', 'Room 402', NULL, 'Batch 12', 'Section A', 'cancelled', 'Cancelled', 'CSE 315 cancelled for faculty senate meeting. Makeup schedule poll active.', NULL);

-- 4. SEED CLEARANCES
DELETE FROM `clearances`;
INSERT INTO `clearances` (`id`, `applicant`, `applicant_role`, `faculty_code`, `faculty_name`, `dept`, `requested_role`, `credentials_status`, `submitted_at`, `details`, `type`, `urgency`, `status`) VALUES
('clr-1', 'Dr. Shahria Kabir', 'Assistant Prof., Dept. of CSE', 'CSE', 'Faculty of Computer Science & Engineering', 'Dept. of CSE', 'Lecture Swap & Makeup Clearance', 'Pending Dean Endorsement', 'Today, 09:15 AM', 'Leave & makeup lecture swap request for Distributed Systems (CSE 321) on Oct 26.', 'teacher', 'high', 'pending'),
('clr-2', 'CSE Batch 21 (Session 2021–22)', 'CR Tanvir Ahmed', 'CSE', 'Faculty of Computer Science & Engineering', 'Dept. of CSE', 'Lab 3B Reservation & Makeup Approval', 'Pending CR Clearance', 'Yesterday, 4:30 PM', 'Submission of Midterm makeup schedule endorsement & Lab 3B reservation request.', 'cr', 'medium', 'pending'),
('clr-3', 'Dept. of Software Engineering', 'Academic Committee', 'CSE', 'Faculty of Computer Science & Engineering', 'Dept. of Software Engineering', 'Syllabus Credit Adjustment', 'Action Required', 'Oct 23, 2025', 'Syllabus credit adjustment for Fall 2025 Lab Electives & new Adjunct Lecturer teaching assignment.', 'dept', 'high', 'pending'),
('clr-4', 'Dr. Shahriar Parvez', 'Senior Law Faculty', 'FLJ', 'Faculty of Law & Justice', 'Dept. of Law', 'Dean Authorization', 'Awaiting Central Admin Authorization', 'Oct 22, 10:15 AM', 'Formal appointment ratification for collegiate Dean office leadership.', 'dean', 'high', 'pending'),
('clr-5', 'Dr. Zahid Hasan', 'Professor of Surgery', 'FASVM', 'Faculty of Animal Science & Veterinary Medicine', 'Dept. of Medicine & Surgery', 'Dean Re-appointment', 'Syndicate Approved', 'Oct 21, 02:40 PM', 'Central Admin counter-signature for Academic Council representation.', 'dean', 'medium', 'pending');

-- 5. SEED MEMBERSHIPS
DELETE FROM `membership_requests`;
INSERT INTO `membership_requests` (`id`, `name`, `student_id`, `program`, `requested_at`, `tag`, `status`) VALUES
('mem-1', 'Asif Rahman', '2102041', 'B.Sc in CSE', 'Today at 08:30 AM', 'REG 2021', 'pending'),
('mem-2', 'Nusrat Jahan', '2102048', 'B.Sc in CSE', 'Yesterday at 05:12 PM', 'REG 2021', 'pending'),
('mem-3', 'S. K. Mahbub', '2102066', 'Transferred from RUET Dept CSE', 'Oct 22, 11:20 AM', 'TRANSFER STUDENT', 'pending'),
('mem-4', 'Khadija Tul Kobra', '2102052', 'B.Sc in CSE', 'Oct 20, 09:45 AM', 'READMISSION', 'pending');

-- 6. SEED CLASS NOTES
DELETE FROM `class_notes`;
INSERT INTO `class_notes` (`id`, `lecture_number`, `course_code`, `course_name`, `title`, `summary`, `author_name`, `author_id`, `author_score`, `date`, `is_toppers_note`, `status`, `read_time`, `file_size`, `file_type`, `attachments_count`, `abstract`, `sections`) VALUES
('note-3', 3, 'CSE-311', 'Database Management Systems', 'Normalization (1NF, 2NF, 3NF to BCNF) & Functional Dependency Canonical Covers', 'Rigorous mathematical breakdown of closure sets (X⁺), canonical covers, lossless-join decomposition tests, and dependency-preserving BCNF proofs.', 'Rahat Mahmud', '2102019', 'Batch Top 5%', 'Oct 24, 2025', 1, 'topper_selected', '15 min deep study', '4.8 MB', 'PDF', 5, 'The core purpose of normalization is eliminating redundancy and insertion/deletion/update anomalies without losing information.', '[{\"title\":\"01. Functional Dependencies & Attribute Closure\",\"content\":\"Given relation R(A, B, C, D, E) with FD set F = { A → BC, CD → E, B → D, E → A }.\",\"formula\":\"// Computing Attribute Closure (B)⁺\\nStep 0: Closure = { B }\\nStep 1: Using B → D ⇒ Closure = { B, D }\\n// Result: (B)⁺ = { B, D } ≠ All attributes.\"},{\"title\":\"02. Normal Forms Classification Hierarchy\",\"content\":\"• 1NF: Atomic domains.\\n• 2NF: No partial dependency.\\n• 3NF: No transitive dependency.\\n• BCNF: Determinants are superkeys.\"}]'),
('note-2', 2, 'CSE-311', 'Database Management Systems', 'ER Diagrams, Ternary Relationships & Relational Schema Mapping', 'Conversion algorithms for strong/weak entity sets, multi-valued attributes into normalized tables.', 'Farzana Yasmin', '2102048', NULL, 'Oct 18, 2025', 1, 'topper_selected', '12 min read', '6.1 MB', 'PDF', 4, 'Schema mapping techniques to translate conceptual Entity-Relationship diagrams into relational schemas.', '[{\"title\":\"01. Entity Classification & Mapping Rules\",\"content\":\"Strong entity sets map directly to relation tables with primary key preserved.\"}]'),
('note-1', 1, 'CSE-311', 'Database Management Systems', 'Introduction to Relational Data Model, Tuple Relational Calculus & Relational Algebra', 'Fundamental formal query operators: Select (σ), Project (π), Natural Join (⋈), Division (÷).', 'Tanvir Hasan', '2102019', 'Batch Score: 98%', 'Oct 12, 2025', 1, 'topper_selected', '8 min read', '4.6 MB', 'PDF', 3, 'Foundations of mathematical query formulation using procedural Relational Algebra.', '[{\"title\":\"01. Fundamental Relational Algebra Operations\",\"content\":\"Six primary operators: selection, projection, union, set difference, Cartesian product, rename.\"}]'),
('pnote-1', 3, 'CSE-311', 'Database Management Systems', 'Normalization & Functional Dependencies Complete Breakdown', 'Synthesized with Prof. Rahman blackboard examples. Armstrong axioms cheatsheet included.', 'Tanvir Hasan', '2102019', NULL, 'Oct 24, 2025', 1, 'topper_selected', '15 min read', '4.8 MB', 'PDF', 0, 'Personal handwritten notes and annotated diagrams on BCNF decomposition.', '[]'),
('pnote-2', 4, 'CSE-312', 'DBMS Sessional Lab', 'MySQL Indexing & Query Execution Plans Sessional Notes', 'B-Tree vs Hash index performance benchmarks, EXPLAIN ANALYZE traces, and composite index cardinality rules.', 'Tanvir Hasan', '2102019', NULL, 'Oct 21, 2025', 0, 'pending_cr_review', '10 min read', '3.2 MB', 'PDF', 0, 'Analysis of execution plans in InnoDB storage engine with buffer pool cache hits.', '[]'),
('pnote-3', 5, 'CSE-315', 'Theory of Computing', 'Context Free Grammars & Pushdown Automata (PDA)', 'Chomsky Normal Form conversion steps and non-deterministic PDA state transition proofs. Incomplete draft.', 'Tanvir Hasan', '2102019', NULL, 'Today, 4 hours ago', 0, 'private_draft', '6 min read', '1.8 MB', 'DOCX', 0, 'Draft notes on pumping lemma for CFLs and deterministic context-free languages.', '[]');

-- 7. SEED POLLS & OPTIONS
DELETE FROM `poll_options`;
DELETE FROM `polls`;
INSERT INTO `polls` (`id`, `poll_number`, `title`, `course`, `initiated_by`, `expires_in`, `total_eligible`, `user_voted_id`, `is_closed`) VALUES
('poll-14', 14, 'Reschedule Makeup Class for Algorithm Sessional to Friday 10:00 AM?', 'CSE 312 Sessional', 'CR Tanvir Ahmed', '4 Hours Left', 54, NULL, 0);

INSERT INTO `poll_options` (`id`, `poll_id`, `text`, `votes`, `is_leading`, `sort_order`) VALUES
('opt-1', 'poll-14', 'Friday 10:00 AM', 34, 1, 1),
('opt-2', 'poll-14', 'Saturday 02:00 PM', 10, 0, 2),
('opt-3', 'poll-14', 'Disagree / Alternate', 3, 0, 3);

-- 8. SEED FUND TRANSACTIONS
DELETE FROM `fund_transactions`;
INSERT INTO `fund_transactions` (`id`, `title`, `amount`, `date`, `type`, `reference`) VALUES
('tx-1', 'Annual Tour Booking', -450.00, 'Oct 12', 'outflow', 'Invoice #892'),
('tx-2', 'Batch Lab Project Kits (8 Breadboards)', -220.00, 'Oct 10', 'outflow', 'Lab Supply Voucher'),
('tx-3', 'Semester Dues (48 students)', 960.00, 'Oct 05', 'inflow', 'BatchSync Portal Pay'),
('tx-4', 'Class Farewell Crest Advance', -150.00, 'Sep 28', 'outflow', 'Committee Advance');

-- 9. SEED NOTICES
DELETE FROM `notices`;
INSERT INTO `notices` (`id`, `title`, `body`, `author`, `time`, `synced_telegram`) VALUES
('n-1', 'CSE 311 Room Shifted to Room 301 due to projector setup', 'The query execution demo requires the high-lumen overhead projector in Room 301. Attendance policy remains standard.', 'CR Tanvir Ahmed', '40 mins ago', 1),
('n-2', 'Midterm Question Banks & Lecture Slides uploaded', 'Question archives from 2021-2024 and Slides 1-6 for CSE-311 have been compiled in the Resource Vault.', 'Academic Secretary', 'Yesterday', 0),
('n-3', 'Class Farewell Committee Meeting on Sunday at 4:00 PM', 'Representatives from each group are requested to join the discussion at cafeteria mezzanine floor regarding tour & crest allocations.', 'CR Tanvir Ahmed', '2 days ago', 0);

-- 10. SEED AUDIT LOGS
DELETE FROM `audit_logs`;
INSERT INTO `audit_logs` (`id`, `title`, `details`, `time`, `actor`) VALUES
('audit-1', 'New Faculty Created', 'Faculty of Marine Science & Oceanography registered', '25 mins ago by Main Admin', 'Dr. Julian Vance'),
('audit-2', 'Dean Approved', 'Prof. Dr. Tahmina Begum assigned as Dean of Agriculture', '2 hours ago', 'Academic Senate'),
('audit-3', 'Department Created', 'Dept. of Ocean Engineering added under FMSO', '4 hours ago', 'Registrar Node'),
('audit-4', 'Teacher Approved', '12 new faculty accounts authorized', 'Yesterday', 'Central Admin'),
('audit-5', 'Batch Created', 'CSE Batch 22 (Session 2024-25) initialized', 'Yesterday', 'Dean CSE Office'),
('audit-6', 'Faculty Updated', 'Faculty of Business Administration quota revised', '2 days ago', 'Academic Council');

SET FOREIGN_KEY_CHECKS = 1;
