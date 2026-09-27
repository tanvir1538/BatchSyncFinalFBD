const { pool } = require('../config/db');

// GET /api/faculties
async function getAllFaculties(req, res, next) {
  try {
    const [faculties] = await pool.query('SELECT * FROM faculties ORDER BY name ASC');
    const [departments] = await pool.query('SELECT * FROM departments ORDER BY code ASC');

    const result = faculties.map((f) => {
      const depts = departments
        .filter((d) => d.faculty_id === f.id)
        .map((d) => ({
          id: d.id,
          code: d.code,
          name: d.name,
          chairperson: d.chairperson || 'Interim Chair',
          batchesCount: d.batches_count || 0,
          teacherCount: d.teacher_count || 0,
          studentCount: d.student_count || 0,
        }));

      return {
        id: f.id,
        name: f.name,
        code: f.code,
        slug: f.slug,
        established: f.established,
        batchesCount: f.batches_count,
        enrolledStudents: f.enrolled_students,
        dean: f.dean_name
          ? {
              name: f.dean_name,
              email: f.dean_email || '',
              designation: f.dean_designation || 'Dean',
            }
          : null,
        status: f.status,
        color: f.color || '#2563eb',
        description: f.description || '',
        telegramChannel: f.telegram_channel || '',
        departments: depts,
      };
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// GET /api/faculties/:id
async function getFacultyById(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM faculties WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    const f = rows[0];
    const [departments] = await pool.query('SELECT * FROM departments WHERE faculty_id = ?', [id]);

    const result = {
      id: f.id,
      name: f.name,
      code: f.code,
      slug: f.slug,
      established: f.established,
      batchesCount: f.batches_count,
      enrolledStudents: f.enrolled_students,
      dean: f.dean_name
        ? {
            name: f.dean_name,
            email: f.dean_email || '',
            designation: f.dean_designation || 'Dean',
          }
        : null,
      status: f.status,
      color: f.color || '#2563eb',
      description: f.description || '',
      telegramChannel: f.telegram_channel || '',
      departments: departments.map((d) => ({
        id: d.id,
        code: d.code,
        name: d.name,
        chairperson: d.chairperson || '',
        batchesCount: d.batches_count || 0,
        teacherCount: d.teacher_count || 0,
        studentCount: d.student_count || 0,
      })),
    };

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/faculties
async function createFaculty(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const {
      name,
      code,
      slug,
      established = new Date().getFullYear(),
      batchesCount = 0,
      enrolledStudents = 0,
      dean,
      status = 'Active',
      color = '#2563eb',
      description = '',
      telegramChannel = '',
      departments = [],
    } = req.body;

    const id = req.body.id || `fac-${Date.now()}`;
    const facSlug = slug || code.toLowerCase().trim();
    const deanName = dean ? dean.name : null;
    const deanEmail = dean ? dean.email : null;
    const deanDesignation = dean ? dean.designation : null;

    await conn.query(
      `INSERT INTO faculties (id, name, code, slug, established, batches_count, enrolled_students, dean_name, dean_email, dean_designation, status, color, description, telegram_channel)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        name,
        code.toUpperCase().trim(),
        facSlug,
        established,
        batchesCount,
        enrolledStudents,
        deanName,
        deanEmail,
        deanDesignation,
        status,
        color,
        description,
        telegramChannel,
      ]
    );

    const insertedDepts = [];
    if (Array.isArray(departments) && departments.length > 0) {
      for (let i = 0; i < departments.length; i++) {
        const d = departments[i];
        const deptId = d.id || `dept-${code.toLowerCase()}-${i + 1}-${Date.now()}`;
        const deptCode = d.code || `${code.toUpperCase()}-${i + 1}`;
        const deptName = typeof d === 'string' ? d : d.name;
        const chairperson = d.chairperson || 'Interim Chair';
        const deptBatches = d.batchesCount || 1;
        const deptTeachers = d.teacherCount || 4;
        const deptStudents = d.studentCount || 80;

        await conn.query(
          `INSERT INTO departments (id, faculty_id, code, name, chairperson, batches_count, teacher_count, student_count)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [deptId, id, deptCode, deptName, chairperson, deptBatches, deptTeachers, deptStudents]
        );

        insertedDepts.push({
          id: deptId,
          code: deptCode,
          name: deptName,
          chairperson,
          batchesCount: deptBatches,
          teacherCount: deptTeachers,
          studentCount: deptStudents,
        });
      }
    }

    // Insert Audit log
    await conn.query(
      `INSERT INTO audit_logs (id, title, details, time, actor)
       VALUES (?, ?, ?, ?, ?)`,
      [`audit-${Date.now()}`, 'New Faculty Created', `Faculty "${name}" (${code}) registered`, 'Just now', 'Central Admin']
    );

    await conn.commit();

    const created = {
      id,
      name,
      code: code.toUpperCase().trim(),
      slug: facSlug,
      established,
      batchesCount: batchesCount || (insertedDepts.length ? insertedDepts.reduce((acc, cur) => acc + cur.batchesCount, 0) : 2),
      enrolledStudents: enrolledStudents || (insertedDepts.length ? insertedDepts.reduce((acc, cur) => acc + cur.studentCount, 0) : 160),
      dean: deanName ? { name: deanName, email: deanEmail || '', designation: deanDesignation || '' } : null,
      status,
      color,
      description,
      telegramChannel,
      departments: insertedDepts,
    };

    res.status(201).json(created);
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

// PUT /api/faculties/:id
async function updateFaculty(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id } = req.params;
    const {
      name,
      code,
      slug,
      established,
      batchesCount,
      enrolledStudents,
      dean,
      status,
      color,
      description,
      telegramChannel,
      departments,
    } = req.body;

    const deanName = dean ? dean.name : null;
    const deanEmail = dean ? dean.email : null;
    const deanDesignation = dean ? dean.designation : null;

    await conn.query(
      `UPDATE faculties 
       SET name = COALESCE(?, name),
           code = COALESCE(?, code),
           slug = COALESCE(?, slug),
           established = COALESCE(?, established),
           batches_count = COALESCE(?, batches_count),
           enrolled_students = COALESCE(?, enrolled_students),
           dean_name = ?,
           dean_email = ?,
           dean_designation = ?,
           status = COALESCE(?, status),
           color = COALESCE(?, color),
           description = COALESCE(?, description),
           telegram_channel = COALESCE(?, telegram_channel)
       WHERE id = ?`,
      [
        name,
        code ? code.toUpperCase() : null,
        slug,
        established,
        batchesCount,
        enrolledStudents,
        deanName,
        deanEmail,
        deanDesignation,
        status,
        color,
        description,
        telegramChannel,
        id,
      ]
    );

    if (Array.isArray(departments)) {
      // Refresh departments if provided
      await conn.query('DELETE FROM departments WHERE faculty_id = ?', [id]);
      for (const d of departments) {
        const deptId = d.id || `dept-${id}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
        await conn.query(
          `INSERT INTO departments (id, faculty_id, code, name, chairperson, batches_count, teacher_count, student_count)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [deptId, id, d.code, d.name, d.chairperson || '', d.batchesCount || 0, d.teacherCount || 0, d.studentCount || 0]
        );
      }
    }

    // Log update
    await conn.query(
      `INSERT INTO audit_logs (id, title, details, time, actor)
       VALUES (?, ?, ?, ?, ?)`,
      [`audit-${Date.now()}`, 'Faculty Updated', `Faculty details for "${name || id}" updated`, 'Just now', 'Central Admin']
    );

    await conn.commit();

    const [updatedRows] = await pool.query('SELECT * FROM faculties WHERE id = ?', [id]);
    const [deptRows] = await pool.query('SELECT * FROM departments WHERE faculty_id = ?', [id]);

    const f = updatedRows[0];
    const result = {
      id: f.id,
      name: f.name,
      code: f.code,
      slug: f.slug,
      established: f.established,
      batchesCount: f.batches_count,
      enrolledStudents: f.enrolled_students,
      dean: f.dean_name
        ? {
            name: f.dean_name,
            email: f.dean_email || '',
            designation: f.dean_designation || 'Dean',
          }
        : null,
      status: f.status,
      color: f.color || '#2563eb',
      description: f.description || '',
      telegramChannel: f.telegram_channel || '',
      departments: deptRows.map((d) => ({
        id: d.id,
        code: d.code,
        name: d.name,
        chairperson: d.chairperson || '',
        batchesCount: d.batches_count || 0,
        teacherCount: d.teacher_count || 0,
        studentCount: d.student_count || 0,
      })),
    };

    res.json(result);
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

// DELETE /api/faculties/:id
async function deleteFaculty(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id } = req.params;

    await conn.query('DELETE FROM departments WHERE faculty_id = ?', [id]);
    const [resDelete] = await conn.query('DELETE FROM faculties WHERE id = ?', [id]);

    if (resDelete.affectedRows === 0) {
      await conn.rollback();
      return res.status(404).json({ message: 'Faculty not found' });
    }

    await conn.query(
      `INSERT INTO audit_logs (id, title, details, time, actor)
       VALUES (?, ?, ?, ?, ?)`,
      [`audit-${Date.now()}`, 'Faculty Removed', `Faculty ID "${id}" was archived/removed`, 'Just now', 'Central Admin']
    );

    await conn.commit();
    res.json({ success: true, message: 'Faculty deleted successfully' });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

module.exports = {
  getAllFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
