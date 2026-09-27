-- ============================================================================
-- BatchSync — University Academic Coordination & Management System
-- Relational MySQL Schema (MySQL 8.0+)
-- Engine: InnoDB | Character Set: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `batchsync_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `batchsync_db`;

SET FOREIGN_KEY_CHECKS = 0;

-- 1. FACULTIES
DROP TABLE IF EXISTS `faculties`;
CREATE TABLE `faculties` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(50) NOT NULL,
  `established` INT DEFAULT 2000,
  `batches_count` INT DEFAULT 0,
  `enrolled_students` INT DEFAULT 0,
  `dean_name` VARCHAR(150) NULL,
  `dean_email` VARCHAR(150) NULL,
  `dean_designation` VARCHAR(150) NULL,
  `status` ENUM('Active', 'Draft', 'Inactive') DEFAULT 'Active',
  `color` VARCHAR(30) DEFAULT '#2563eb',
  `description` TEXT NULL,
  `telegram_channel` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_faculties_code` (`code`),
  UNIQUE KEY `uq_faculties_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. DEPARTMENTS
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `id` VARCHAR(50) NOT NULL,
  `faculty_id` VARCHAR(50) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `chairperson` VARCHAR(150) DEFAULT '',
  `batches_count` INT DEFAULT 0,
  `teacher_count` INT DEFAULT 0,
  `student_count` INT DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_departments_faculty` (`faculty_id`),
  CONSTRAINT `fk_departments_faculty` FOREIGN KEY (`faculty_id`)
    REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. SCHEDULES / CLASS ROUTINES
DROP TABLE IF EXISTS `schedules`;
CREATE TABLE `schedules` (
  `id` VARCHAR(50) NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `duration` VARCHAR(50) DEFAULT '90m',
  `course_code` VARCHAR(50) NOT NULL,
  `course_name` VARCHAR(255) NOT NULL,
  `teacher` VARCHAR(150) NOT NULL,
  `room` VARCHAR(100) NOT NULL,
  `original_room` VARCHAR(100) NULL,
  `batch` VARCHAR(50) NOT NULL,
  `section` VARCHAR(50) NOT NULL,
  `status` ENUM('upcoming', 'completed', 'cancelled', 'override') DEFAULT 'upcoming',
  `status_badge_text` VARCHAR(100) NULL,
  `note` TEXT NULL,
  `override_code` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PENDING CLEARANCES
DROP TABLE IF EXISTS `clearances`;
CREATE TABLE `clearances` (
  `id` VARCHAR(50) NOT NULL,
  `applicant` VARCHAR(150) NOT NULL,
  `applicant_role` VARCHAR(150) NOT NULL,
  `faculty_code` VARCHAR(50) NOT NULL,
  `faculty_name` VARCHAR(255) NOT NULL,
  `dept` VARCHAR(150) NOT NULL,
  `requested_role` VARCHAR(150) NOT NULL,
  `credentials_status` VARCHAR(150) NOT NULL,
  `submitted_at` VARCHAR(100) NOT NULL,
  `details` TEXT NOT NULL,
  `type` ENUM('dean', 'teacher', 'cr', 'dept') NOT NULL,
  `urgency` ENUM('high', 'medium', 'normal') NOT NULL DEFAULT 'normal',
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. MEMBERSHIP REQUESTS
DROP TABLE IF EXISTS `membership_requests`;
CREATE TABLE `membership_requests` (
  `id` VARCHAR(50) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `student_id` VARCHAR(50) NOT NULL,
  `program` VARCHAR(255) NOT NULL,
  `requested_at` VARCHAR(100) NOT NULL,
  `tag` VARCHAR(100) NULL,
  `status` ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. CLASS NOTES
DROP TABLE IF EXISTS `class_notes`;
CREATE TABLE `class_notes` (
  `id` VARCHAR(50) NOT NULL,
  `lecture_number` INT NOT NULL,
  `course_code` VARCHAR(50) NOT NULL,
  `course_name` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `summary` TEXT NOT NULL,
  `author_name` VARCHAR(150) NOT NULL,
  `author_id` VARCHAR(50) NOT NULL,
  `author_score` VARCHAR(100) NULL,
  `date` VARCHAR(100) NOT NULL,
  `is_toppers_note` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('topper_selected', 'pending_cr_review', 'private_draft') NOT NULL DEFAULT 'private_draft',
  `read_time` VARCHAR(100) DEFAULT '10 min read',
  `file_size` VARCHAR(50) DEFAULT '3.5 MB',
  `file_type` ENUM('PDF', 'DOCX') NOT NULL DEFAULT 'PDF',
  `attachments_count` INT DEFAULT 0,
  `abstract` TEXT NULL,
  `sections` JSON NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. POLLS
DROP TABLE IF EXISTS `polls`;
CREATE TABLE `polls` (
  `id` VARCHAR(50) NOT NULL,
  `poll_number` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `course` VARCHAR(100) NOT NULL,
  `initiated_by` VARCHAR(150) NOT NULL,
  `expires_in` VARCHAR(100) NOT NULL,
  `total_eligible` INT NOT NULL DEFAULT 50,
  `user_voted_id` VARCHAR(50) NULL,
  `is_closed` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_polls_poll_number` (`poll_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. POLL OPTIONS
DROP TABLE IF EXISTS `poll_options`;
CREATE TABLE `poll_options` (
  `id` VARCHAR(50) NOT NULL,
  `poll_id` VARCHAR(50) NOT NULL,
  `text` VARCHAR(255) NOT NULL,
  `votes` INT NOT NULL DEFAULT 0,
  `is_leading` TINYINT(1) NOT NULL DEFAULT 0,
  `sort_order` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_poll_options_poll` (`poll_id`),
  CONSTRAINT `fk_poll_options_poll` FOREIGN KEY (`poll_id`)
    REFERENCES `polls` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. FUND TRANSACTIONS
DROP TABLE IF EXISTS `fund_transactions`;
CREATE TABLE `fund_transactions` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `amount` DECIMAL(10,2) NOT NULL,
  `date` VARCHAR(100) NOT NULL,
  `type` ENUM('inflow', 'outflow') NOT NULL,
  `reference` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. NOTICES
DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `body` TEXT NOT NULL,
  `author` VARCHAR(150) NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `synced_telegram` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. AUDIT LOGS
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `details` TEXT NOT NULL,
  `time` VARCHAR(100) NOT NULL,
  `actor` VARCHAR(150) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. TEACHER ATTENDANCE LOGS
DROP TABLE IF EXISTS `attendance_logs`;
CREATE TABLE `attendance_logs` (
  `id` VARCHAR(50) NOT NULL,
  `course_code` VARCHAR(50) NOT NULL,
  `batch` VARCHAR(50) NOT NULL,
  `present_count` INT NOT NULL,
  `total_count` INT NOT NULL,
  `marked_by` VARCHAR(150) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. TEACHER RESOURCES
DROP TABLE IF EXISTS `teacher_resources`;
CREATE TABLE `teacher_resources` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `course_code` VARCHAR(50) NOT NULL,
  `file_url` VARCHAR(500) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. TEACHER ASSIGNMENTS
DROP TABLE IF EXISTS `teacher_assignments`;
CREATE TABLE `teacher_assignments` (
  `id` VARCHAR(50) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `course_code` VARCHAR(50) NOT NULL,
  `batch` VARCHAR(50) NOT NULL,
  `due_date` VARCHAR(100) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
