export const INITIAL_FACULTIES = [
  {
    id: 'fac-1',
    name: 'Faculty of Computer Science & Engineering',
    code: 'CSE',
    slug: 'cse',
    established: 2001,
    batchesCount: 18,
    enrolledStudents: 1420,
    dean: {
      name: 'Prof. Dr. Anwarul Hoque',
      email: 'dean.cse@university.edu',
      designation: 'Senior Professor'
    },
    status: 'Active',
    color: '#2563eb',
    description: 'Leading computational science, software engineering, intelligent systems, and networked digital infrastructure.',
    telegramChannel: 'batchsync_cse',
    departments: [
      { id: 'dept-cse-1', code: 'CSE', name: 'Computer Science & Engineering', chairperson: 'Dr. A. Hoque', batchesCount: 8, teacherCount: 28, studentCount: 640 },
      { id: 'dept-cse-2', code: 'ICE', name: 'Information & Communication Engineering', chairperson: 'Dr. N. Sultana', batchesCount: 4, teacherCount: 16, studentCount: 320 },
      { id: 'dept-cse-3', code: 'SE', name: 'Software Engineering', chairperson: 'Dr. S. Rahman', batchesCount: 4, teacherCount: 14, studentCount: 310 },
      { id: 'dept-cse-4', code: 'CSIT', name: 'Computer Systems & IT', chairperson: 'Dr. M. Islam', batchesCount: 2, teacherCount: 10, studentCount: 150 },
    ]
  },
  {
    id: 'fac-2',
    name: 'Faculty of Agriculture',
    code: 'AGRI',
    slug: 'agri',
    established: 2003,
    batchesCount: 12,
    enrolledStudents: 980,
    dean: {
      name: 'Prof. Dr. Tahmina Begum',
      email: 'dean.agri@university.edu',
      designation: 'Chair & Dean of Agriculture'
    },
    status: 'Active',
    color: '#059669',
    description: 'Dedicated to agronomy, crop enhancement, soil sustainability, and modern agricultural field technologies.',
    telegramChannel: 'batchsync_agri',
    departments: [
      { id: 'dept-agri-1', code: 'AGRON', name: 'Dept. of Agronomy', chairperson: 'Prof. R. Alam', batchesCount: 4, teacherCount: 12, studentCount: 340 },
      { id: 'dept-agri-2', code: 'HORT', name: 'Dept. of Horticulture', chairperson: 'Dr. F. Yasmin', batchesCount: 4, teacherCount: 10, studentCount: 320 },
      { id: 'dept-agri-3', code: 'SOIL', name: 'Dept. of Soil Science', chairperson: 'Dr. M. Haque', batchesCount: 4, teacherCount: 9, studentCount: 320 },
    ]
  },
  {
    id: 'fac-3',
    name: 'Faculty of Business Administration',
    code: 'FBA',
    slug: 'fba',
    established: 2004,
    batchesCount: 20,
    enrolledStudents: 1650,
    dean: {
      name: 'Prof. Kazi Mesbahuddin',
      email: 'dean.fba@university.edu',
      designation: 'Professor of Finance'
    },
    status: 'Active',
    color: '#d97706',
    description: 'Educating future leaders in financial analytics, strategic management, entrepreneurship, and commerce.',
    telegramChannel: 'batchsync_fba',
    departments: [
      { id: 'dept-fba-1', code: 'MKT', name: 'Dept. of Marketing', chairperson: 'Dr. K. Zaman', batchesCount: 5, teacherCount: 11, studentCount: 420 },
      { id: 'dept-fba-2', code: 'FIN', name: 'Dept. of Finance & Banking', chairperson: 'Prof. K. Mesbahuddin', batchesCount: 5, teacherCount: 12, studentCount: 450 },
      { id: 'dept-fba-3', code: 'ACC', name: 'Dept. of Accounting', chairperson: 'Dr. S. Akhtar', batchesCount: 4, teacherCount: 9, studentCount: 360 },
      { id: 'dept-fba-4', code: 'MGT', name: 'Dept. of Management', chairperson: 'Prof. A. Wadud', batchesCount: 4, teacherCount: 8, studentCount: 300 },
      { id: 'dept-fba-5', code: 'HRM', name: 'Dept. of Human Resource Management', chairperson: 'Dr. T. Ahmed', batchesCount: 2, teacherCount: 6, studentCount: 120 },
    ]
  },
  {
    id: 'fac-4',
    name: 'Faculty of Environmental Science & Disaster Mgmt',
    code: 'ESDM',
    slug: 'esdm',
    established: 2008,
    batchesCount: 8,
    enrolledStudents: 540,
    dean: {
      name: 'Prof. Dr. SM Zafar Alam',
      email: 'dean.esdm@university.edu',
      designation: 'Dean & Professor of Climate Dynamics'
    },
    status: 'Active',
    color: '#0d9488',
    description: 'Specialized coastal resilience, GIS spatial analytics, climate adaptation, and emergency mitigation studies.',
    telegramChannel: 'batchsync_esdm',
    departments: [
      { id: 'dept-esdm-1', code: 'ENV', name: 'Dept. of Environmental Science', chairperson: 'Prof. SM Zafar Alam', batchesCount: 4, teacherCount: 10, studentCount: 280 },
      { id: 'dept-esdm-2', code: 'DM', name: 'Dept. of Disaster Management', chairperson: 'Dr. N. Chowdhury', batchesCount: 4, teacherCount: 8, studentCount: 260 },
    ]
  },
  {
    id: 'fac-5',
    name: 'Faculty of Fisheries & Marine Science',
    code: 'FMS',
    slug: 'fms',
    established: 2011,
    batchesCount: 9,
    enrolledStudents: 620,
    dean: {
      name: 'Dr. Ashraful Haque',
      email: 'dean.fms@university.edu',
      designation: 'Associate Professor & Dean'
    },
    status: 'Active',
    color: '#0284c7',
    description: 'Advancing aquaculture biology, estuarine preservation, marine biodiversity, and hatchery operations.',
    telegramChannel: 'batchsync_fms',
    departments: [
      { id: 'dept-fms-1', code: 'AQUA', name: 'Dept. of Aquaculture', chairperson: 'Dr. A. Haque', batchesCount: 3, teacherCount: 8, studentCount: 220 },
      { id: 'dept-fms-2', code: 'FISH_BIO', name: 'Dept. of Fisheries Biology & Genetics', chairperson: 'Dr. L. Begum', batchesCount: 3, teacherCount: 7, studentCount: 200 },
      { id: 'dept-fms-3', code: 'FISH_TECH', name: 'Dept. of Fisheries Technology', chairperson: 'Prof. S. R. Majumder', batchesCount: 3, teacherCount: 7, studentCount: 200 },
    ]
  },
  {
    id: 'fac-6',
    name: 'Faculty of Law & Justice',
    code: 'FLJ',
    slug: 'flj',
    established: 2014,
    batchesCount: 6,
    enrolledStudents: 410,
    dean: {
      name: 'Barrister Shahriar Parvez',
      email: 'dean.flj@university.edu',
      designation: 'Dean of Law'
    },
    status: 'Active',
    color: '#7c3aed',
    description: 'Cultivating legal scholarship, constitutional advocacy, moot court trial practice, and ethical jurisprudence.',
    telegramChannel: 'batchsync_flj',
    departments: [
      { id: 'dept-flj-1', code: 'LAW', name: 'Dept. of Law', chairperson: 'Barrister Shahriar Parvez', batchesCount: 4, teacherCount: 10, studentCount: 260 },
      { id: 'dept-flj-2', code: 'CLJ', name: 'Dept. of Comparative Law & Jurisprudence', chairperson: 'Dr. M. Reza', batchesCount: 2, teacherCount: 6, studentCount: 150 },
    ]
  },
  {
    id: 'fac-7',
    name: 'Faculty of Nutrition & Food Science',
    code: 'FNFS',
    slug: 'fnfs',
    established: 2017,
    batchesCount: 5,
    enrolledStudents: 390,
    dean: null,
    status: 'Active',
    color: '#e11d48',
    description: 'Investigating clinical dietetics, food security processing, microbiological safety, and community health interventions.',
    telegramChannel: 'batchsync_fnfs',
    departments: [
      { id: 'dept-fnfs-1', code: 'FTECH', name: 'Dept. of Food Technology', chairperson: 'Dr. N. Sultana', batchesCount: 3, teacherCount: 7, studentCount: 210 },
      { id: 'dept-fnfs-2', code: 'CNUT', name: 'Dept. of Clinical Nutrition', chairperson: 'Dr. M. S. Hossain', batchesCount: 2, teacherCount: 6, studentCount: 180 },
    ]
  },
  {
    id: 'fac-8',
    name: 'Faculty of Animal Science & Veterinary Medicine',
    code: 'FASVM',
    slug: 'fasvm',
    established: 2018,
    batchesCount: 14,
    enrolledStudents: 820,
    dean: {
      name: 'Prof. Dr. Zahid Hasan',
      email: 'dean.fasvm@university.edu',
      designation: 'Professor & Dean'
    },
    status: 'Active',
    color: '#4f46e5',
    description: 'Excellence in veterinary clinical pathology, livestock genetics, surgical diagnostics, and epidemiology.',
    telegramChannel: 'batchsync_fasvm',
    departments: [
      { id: 'dept-fasvm-1', code: 'VET_MED', name: 'Dept. of Medicine, Surgery & Obstetrics', chairperson: 'Prof. Dr. Z. Hasan', batchesCount: 3, teacherCount: 9, studentCount: 190 },
      { id: 'dept-fasvm-2', code: 'MICRO', name: 'Dept. of Microbiology & Public Health', chairperson: 'Dr. B. K. Paul', batchesCount: 3, teacherCount: 8, studentCount: 170 },
      { id: 'dept-fasvm-3', code: 'AN_GEN', name: 'Dept. of Animal Breeding & Genetics', chairperson: 'Dr. S. K. Das', batchesCount: 2, teacherCount: 6, studentCount: 130 },
      { id: 'dept-fasvm-4', code: 'PATH', name: 'Dept. of Pathology & Parasitology', chairperson: 'Dr. M. A. Ali', batchesCount: 2, teacherCount: 6, studentCount: 120 },
      { id: 'dept-fasvm-5', code: 'PHYSIO', name: 'Dept. of Physiology & Pharmacology', chairperson: 'Dr. R. K. Debnath', batchesCount: 2, teacherCount: 5, studentCount: 110 },
      { id: 'dept-fasvm-6', code: 'DAIRY', name: 'Dept. of Dairy Science', chairperson: 'Dr. A. K. M. Mostafa', batchesCount: 1, teacherCount: 4, studentCount: 50 },
      { id: 'dept-fasvm-7', code: 'POULTRY', name: 'Dept. of Poultry Science', chairperson: 'Dr. M. R. Karim', batchesCount: 1, teacherCount: 4, studentCount: 50 },
    ]
  }
];

export const INITIAL_SCHEDULE = [
  {
    id: 'sched-1',
    time: '10:00 AM – 11:30 AM',
    duration: '90m',
    courseCode: 'CSE-311',
    courseName: 'Database Management Systems',
    teacher: 'Prof. M. Rahman',
    room: 'Room 301',
    originalRoom: 'Room 204',
    batch: 'Batch 12',
    section: 'Section A',
    status: 'override',
    statusBadgeText: 'Room Changed',
    note: 'The query execution demo requires the high-lumen overhead projector in Room 301. Attendance policy remains standard.',
    overrideCode: 'ADMIN OVERRIDE #491'
  },
  {
    id: 'sched-2',
    time: '01:30 PM – 03:30 PM',
    duration: '120m',
    courseCode: 'CSE-312',
    courseName: 'DBMS Sessional Lab',
    teacher: 'Lecturer S. Haque',
    room: 'Software Lab 2',
    batch: 'Batch 12',
    section: 'Section A',
    status: 'upcoming',
    statusBadgeText: 'Upcoming',
    note: 'Hands-on practice on index optimization and relational query execution plans.'
  },
  {
    id: 'sched-3',
    time: '03:30 PM – 05:00 PM',
    duration: '90m',
    courseCode: 'CSE-315',
    courseName: 'Theory of Computing',
    teacher: 'Teacher on Academic Deputation',
    room: 'Room 402',
    batch: 'Batch 12',
    section: 'Section A',
    status: 'cancelled',
    statusBadgeText: 'Cancelled',
    note: 'CSE 315 cancelled for faculty senate meeting. Makeup schedule poll active.'
  }
];

export const INITIAL_PENDING_CLEARANCES = [
  {
    id: 'clr-1',
    applicant: 'Dr. Shahria Kabir',
    applicantRole: 'Assistant Prof., Dept. of CSE',
    facultyCode: 'CSE',
    facultyName: 'Faculty of Computer Science & Engineering',
    dept: 'Dept. of CSE',
    requestedRole: 'Lecture Swap & Makeup Clearance',
    credentialsStatus: 'Pending Dean Endorsement',
    submittedAt: 'Today, 09:15 AM',
    details: 'Leave & makeup lecture swap request for Distributed Systems (CSE 321) on Oct 26.',
    type: 'teacher',
    urgency: 'high'
  },
  {
    id: 'clr-2',
    applicant: 'CSE Batch 21 (Session 2021–22)',
    applicantRole: 'CR Tanvir Ahmed',
    facultyCode: 'CSE',
    facultyName: 'Faculty of Computer Science & Engineering',
    dept: 'Dept. of CSE',
    requestedRole: 'Lab 3B Reservation & Makeup Approval',
    credentialsStatus: 'Pending CR Clearance',
    submittedAt: 'Yesterday, 4:30 PM',
    details: 'Submission of Midterm makeup schedule endorsement & Lab 3B reservation request.',
    type: 'cr',
    urgency: 'medium'
  },
  {
    id: 'clr-3',
    applicant: 'Dept. of Software Engineering',
    applicantRole: 'Academic Committee',
    facultyCode: 'CSE',
    facultyName: 'Faculty of Computer Science & Engineering',
    dept: 'Dept. of Software Engineering',
    requestedRole: 'Syllabus Credit Adjustment',
    credentialsStatus: 'Action Required',
    submittedAt: 'Oct 23, 2025',
    details: 'Syllabus credit adjustment for Fall 2025 Lab Electives & new Adjunct Lecturer teaching assignment.',
    type: 'dept',
    urgency: 'high'
  },
  {
    id: 'clr-4',
    applicant: 'Dr. Shahriar Parvez',
    applicantRole: 'Senior Law Faculty',
    facultyCode: 'FLJ',
    facultyName: 'Faculty of Law & Justice',
    dept: 'Dept. of Law',
    requestedRole: 'Dean Authorization',
    credentialsStatus: 'Awaiting Central Admin Authorization',
    submittedAt: 'Oct 22, 10:15 AM',
    details: 'Formal appointment ratification for collegiate Dean office leadership.',
    type: 'dean',
    urgency: 'high'
  },
  {
    id: 'clr-5',
    applicant: 'Dr. Zahid Hasan',
    applicantRole: 'Professor of Surgery',
    facultyCode: 'FASVM',
    facultyName: 'Faculty of Animal Science & Veterinary Medicine',
    dept: 'Dept. of Medicine & Surgery',
    requestedRole: 'Dean Re-appointment',
    credentialsStatus: 'Syndicate Approved',
    submittedAt: 'Oct 21, 02:40 PM',
    details: 'Central Admin counter-signature for Academic Council representation.',
    type: 'dean',
    urgency: 'medium'
  }
];

export const INITIAL_MEMBERSHIP_REQUESTS = [
  {
    id: 'mem-1',
    name: 'Asif Rahman',
    studentId: '2102041',
    program: 'B.Sc in CSE',
    requestedAt: 'Today at 08:30 AM',
    tag: 'REG 2021',
    status: 'pending'
  },
  {
    id: 'mem-2',
    name: 'Nusrat Jahan',
    studentId: '2102048',
    program: 'B.Sc in CSE',
    requestedAt: 'Yesterday at 05:12 PM',
    tag: 'REG 2021',
    status: 'pending'
  },
  {
    id: 'mem-3',
    name: 'S. K. Mahbub',
    studentId: '2102066',
    program: 'Transferred from RUET Dept CSE',
    requestedAt: 'Oct 22, 11:20 AM',
    tag: 'TRANSFER STUDENT',
    status: 'pending'
  },
  {
    id: 'mem-4',
    name: 'Khadija Tul Kobra',
    studentId: '2102052',
    program: 'B.Sc in CSE',
    requestedAt: 'Oct 20, 09:45 AM',
    tag: 'READMISSION',
    status: 'pending'
  }
];

export const INITIAL_TOPPER_NOTES = [
  {
    id: 'note-3',
    lectureNumber: 3,
    courseCode: 'CSE-311',
    courseName: 'Database Management Systems',
    title: 'Normalization (1NF, 2NF, 3NF to BCNF) & Functional Dependency Canonical Covers',
    summary: "Rigorous mathematical breakdown of closure sets (X⁺), canonical covers, lossless-join decomposition tests, and dependency-preserving BCNF proofs. Includes handwritten Armstrong's Axioms flowcharts.",
    authorName: 'Rahat Mahmud',
    authorId: '2102019',
    authorScore: 'Batch Top 5%',
    date: 'Oct 24, 2025',
    isToppersNote: true,
    status: 'topper_selected',
    readTime: '15 min deep study',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    attachmentsCount: 5,
    abstract: 'The core purpose of normalization is eliminating redundancy and insertion/deletion/update anomalies without losing information. Decompositions must guarantee two non-negotiable criteria: Lossless Join Property and Dependency Preservation.',
    sections: [
      {
        title: '01. Functional Dependencies & Attribute Closure',
        content: 'Given relation R(A, B, C, D, E) with FD set F = { A → BC, CD → E, B → D, E → A }. An attribute closure (X)⁺ represents all attributes functionally determined by X under F.',
        formula: '// Computing Attribute Closure (B)⁺\nStep 0: Closure = { B }\nStep 1: Using B → D ⇒ Closure = { B, D }\nStep 2: No more FDs can be applied.\n// Result: (B)⁺ = { B, D } ≠ All attributes. Hence B is not a candidate key.'
      },
      {
        title: '02. Normal Forms Classification Hierarchy',
        content: '• First Normal Form (1NF): All attribute domains are atomic. No repeating groups or nested relations.\n• Second Normal Form (2NF): In 1NF and no non-prime attribute is partially dependent on any candidate key.\n• Third Normal Form (3NF): In 2NF and for every X → Y, either X is a superkey or Y is a prime attribute.\n• Boyce-Codd Normal Form (BCNF): For every non-trivial FD X → Y, X must be a superkey.',
        formula: '// Lossless Join Property Test Theorem\nDecomposition of R into R1 and R2 is lossless if and only if:\n(R1 ∩ R2) → R1   OR   (R1 ∩ R2) → R2   is in F⁺.'
      },
      {
        title: '03. Structured Practice Problems from PSTU Semester Finals',
        content: 'Solved previous 5-year question sets with step-by-step canonical cover computations and 3NF synthesis algorithm demonstrations.'
      }
    ]
  },
  {
    id: 'note-2',
    lectureNumber: 2,
    courseCode: 'CSE-311',
    courseName: 'Database Management Systems',
    title: 'ER Diagrams, Ternary Relationships & Relational Schema Mapping',
    summary: 'Conversion algorithms for strong/weak entity sets, multi-valued attributes into normalized tables, and cardinalities constraints mapped to foreign keys.',
    authorName: 'Farzana Yasmin',
    authorId: '2102048',
    date: 'Oct 18, 2025',
    isToppersNote: true,
    status: 'topper_selected',
    readTime: '12 min read',
    fileSize: '6.1 MB',
    fileType: 'PDF',
    attachmentsCount: 4,
    abstract: 'Schema mapping techniques to translate conceptual Entity-Relationship diagrams into relational schemas without structural or semantic loss.',
    sections: [
      {
        title: '01. Entity Classification & Mapping Rules',
        content: "Strong entity sets map directly to relation tables with the primary key preserved. Weak entities require incorporating the identifying relationship's primary key as a composite foreign key."
      }
    ]
  },
  {
    id: 'note-1',
    lectureNumber: 1,
    courseCode: 'CSE-311',
    courseName: 'Database Management Systems',
    title: 'Introduction to Relational Data Model, Tuple Relational Calculus & Relational Algebra',
    summary: 'Fundamental formal query operators: Select (σ), Project (π), Natural Join (⋈), Division (÷). Contains complete solved examples from Korth Chapter 2 with syntax annotations.',
    authorName: 'Tanvir Hasan',
    authorId: '2102019',
    authorScore: 'Batch Score: 98%',
    date: 'Oct 12, 2025',
    isToppersNote: true,
    status: 'topper_selected',
    readTime: '8 min read',
    fileSize: '4.6 MB',
    fileType: 'PDF',
    attachmentsCount: 3,
    abstract: 'Foundations of mathematical query formulation using procedural Relational Algebra and non-procedural Tuple Relational Calculus.',
    sections: [
      {
        title: '01. Fundamental Relational Algebra Operations',
        content: 'Six primary operators: selection (σ), projection (π), union (∪), set difference (-), Cartesian product (×), and rename (ρ). Join operators (⋈) are derived compositions.'
      }
    ]
  }
];

export const INITIAL_PRIVATE_NOTES = [
  {
    id: 'pnote-1',
    lectureNumber: 3,
    courseCode: 'CSE-311',
    courseName: 'Database Management Systems',
    title: 'Normalization & Functional Dependencies Complete Breakdown',
    summary: "Synthesized with Prof. Rahman's blackboard examples. Armstrong's axioms cheatsheet included.",
    authorName: 'Tanvir Hasan',
    authorId: '2102019',
    date: 'Oct 24, 2025',
    isToppersNote: true,
    status: 'topper_selected',
    readTime: '15 min read',
    fileSize: '4.8 MB',
    fileType: 'PDF',
    abstract: 'Personal handwritten notes and annotated diagrams on BCNF decomposition.',
    sections: []
  },
  {
    id: 'pnote-2',
    lectureNumber: 4,
    courseCode: 'CSE-312',
    courseName: 'DBMS Sessional Lab',
    title: 'MySQL Indexing & Query Execution Plans Sessional Notes',
    summary: 'B-Tree vs Hash index performance benchmarks, EXPLAIN ANALYZE traces, and composite index cardinality rules.',
    authorName: 'Tanvir Hasan',
    authorId: '2102019',
    date: 'Oct 21, 2025',
    isToppersNote: false,
    status: 'pending_cr_review',
    readTime: '10 min read',
    fileSize: '3.2 MB',
    fileType: 'PDF',
    abstract: 'Analysis of execution plans in InnoDB storage engine with buffer pool cache hits.',
    sections: []
  },
  {
    id: 'pnote-3',
    lectureNumber: 5,
    courseCode: 'CSE-315',
    courseName: 'Theory of Computing',
    title: 'Context Free Grammars & Pushdown Automata (PDA)',
    summary: 'Chomsky Normal Form conversion steps and non-deterministic PDA state transition proofs. Incomplete draft.',
    authorName: 'Tanvir Hasan',
    authorId: '2102019',
    date: 'Today, 4 hours ago',
    isToppersNote: false,
    status: 'private_draft',
    readTime: '6 min read',
    fileSize: '1.8 MB',
    fileType: 'DOCX',
    abstract: 'Draft notes on pumping lemma for CFLs and deterministic context-free languages.',
    sections: []
  }
];

export const INITIAL_POLL = {
  id: 'poll-14',
  pollNumber: 14,
  title: 'Reschedule Makeup Class for Algorithm Sessional to Friday 10:00 AM?',
  course: 'CSE 312 Sessional',
  initiatedBy: 'CR Tanvir Ahmed',
  expiresIn: '4 Hours Left',
  totalEligible: 54,
  options: [
    { id: 'opt-1', text: 'Friday 10:00 AM', votes: 34, isLeading: true },
    { id: 'opt-2', text: 'Saturday 02:00 PM', votes: 10 },
    { id: 'opt-3', text: 'Disagree / Alternate', votes: 3 }
  ]
};

export const INITIAL_FUND_TRANSACTIONS = [
  { id: 'tx-1', title: 'Annual Tour Booking', amount: -450.00, date: 'Oct 12', type: 'outflow', reference: 'Invoice #892' },
  { id: 'tx-2', title: 'Batch Lab Project Kits (8 Breadboards)', amount: -220.00, date: 'Oct 10', type: 'outflow', reference: 'Lab Supply Voucher' },
  { id: 'tx-3', title: 'Semester Dues (48 students)', amount: 960.00, date: 'Oct 05', type: 'inflow', reference: 'BatchSync Portal Pay' },
  { id: 'tx-4', title: 'Class Farewell Crest Advance', amount: -150.00, date: 'Sep 28', type: 'outflow', reference: 'Committee Advance' }
];

export const AUDIT_LOGS = [
  { id: 'audit-1', title: 'New Faculty Created', details: 'Faculty of Marine Science & Oceanography registered', time: '25 mins ago by Main Admin', actor: 'Dr. Julian Vance' },
  { id: 'audit-2', title: 'Dean Approved', details: 'Prof. Dr. Tahmina Begum assigned as Dean of Agriculture', time: '2 hours ago', actor: 'Academic Senate' },
  { id: 'audit-3', title: 'Department Created', details: 'Dept. of Ocean Engineering added under FMSO', time: '4 hours ago', actor: 'Registrar Node' },
  { id: 'audit-4', title: 'Teacher Approved', details: '12 new faculty accounts authorized', time: 'Yesterday', actor: 'Central Admin' },
  { id: 'audit-5', title: 'Batch Created', details: 'CSE Batch 22 (Session 2024-25) initialized', time: 'Yesterday', actor: 'Dean CSE Office' },
  { id: 'audit-6', title: 'Faculty Updated', details: 'Faculty of Business Administration quota revised', time: '2 days ago', actor: 'Academic Council' }
];
