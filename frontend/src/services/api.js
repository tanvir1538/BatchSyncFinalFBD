const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5080/api';

async function request(endpoint, options) {
  const url = `${API_BASE}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(errBody.message || `API error ${res.status}: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[BatchSync API] Request to ${endpoint} failed:`, error);
    throw error;
  }
}

// Full CRUD API client for BatchSync
export const api = {
  // Faculties CRUD
  async getFaculties() {
    return request('/faculties');
  },
  async getFacultyById(id) {
    return request(`/faculties/${id}`);
  },
  async createFaculty(data) {
    return request('/faculties', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateFaculty(id, data) {
    return request(`/faculties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async deleteFaculty(id) {
    return request(`/faculties/${id}`, {
      method: 'DELETE',
    });
  },

  // Schedules CRUD
  async getSchedules(params) {
    const query = new URLSearchParams();
    if (params?.batch) query.set('batch', params.batch);
    if (params?.teacher) query.set('teacher', params.teacher);
    if (params?.status) query.set('status', params.status);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request(`/schedules${qs}`);
  },
  async createSchedule(data) {
    return request('/schedules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateSchedule(id, data) {
    return request(`/schedules/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async swapRoom(id, newRoom) {
    return request(`/schedules/${id}/room-swap`, {
      method: 'POST',
      body: JSON.stringify({ newRoom }),
    });
  },
  async deleteSchedule(id) {
    return request(`/schedules/${id}`, {
      method: 'DELETE',
    });
  },

  // Clearances CRUD
  async getClearances(status = 'pending') {
    const qs = status ? `?status=${status}` : '';
    return request(`/clearances${qs}`);
  },
  async createClearance(data) {
    return request('/clearances', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async approveClearance(id) {
    return request(`/clearances/${id}/approve`, {
      method: 'POST',
    });
  },
  async rejectClearance(id) {
    return request(`/clearances/${id}/reject`, {
      method: 'POST',
    });
  },
  async deleteClearance(id) {
    return request(`/clearances/${id}`, {
      method: 'DELETE',
    });
  },

  // Memberships CRUD
  async getMemberships() {
    return request('/memberships');
  },
  async createMembership(data) {
    return request('/memberships', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async approveMembership(id) {
    return request(`/memberships/${id}/approve`, {
      method: 'POST',
    });
  },
  async rejectMembership(id) {
    return request(`/memberships/${id}/reject`, {
      method: 'POST',
    });
  },
  async deleteMembership(id) {
    return request(`/memberships/${id}`, {
      method: 'DELETE',
    });
  },

  // Class Notes CRUD
  async getNotes(params) {
    const query = new URLSearchParams();
    if (params?.isToppersNote !== undefined) query.set('isToppersNote', String(params.isToppersNote));
    if (params?.status) query.set('status', params.status);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request(`/notes${qs}`);
  },
  async getNoteById(id) {
    return request(`/notes/${id}`);
  },
  async createNote(data) {
    return request('/notes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async updateNote(id, data) {
    return request(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  async submitNoteToCr(id) {
    return request(`/notes/${id}/submit-cr`, {
      method: 'POST',
    });
  },
  async withdrawNote(id) {
    return request(`/notes/${id}/withdraw`, {
      method: 'POST',
    });
  },
  async electTopperNote(id) {
    return request(`/notes/${id}/elect-topper`, {
      method: 'POST',
    });
  },
  async deleteNote(id) {
    return request(`/notes/${id}`, {
      method: 'DELETE',
    });
  },

  // Polls CRUD
  async getActivePoll() {
    return request('/polls/active');
  },
  async createPoll(data) {
    return request('/polls', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async votePoll(id, optionId) {
    return request(`/polls/${id}/vote`, {
      method: 'POST',
      body: JSON.stringify({ optionId }),
    });
  },
  async closePoll(id) {
    return request(`/polls/${id}/close`, {
      method: 'POST',
    });
  },

  // Batch Funds CRUD
  async getFundsSummary() {
    return request('/funds/summary');
  },
  async addFundTransaction(title, amount, type) {
    return request('/funds/transactions', {
      method: 'POST',
      body: JSON.stringify({ title, amount, type }),
    });
  },
  async deleteFundTransaction(id) {
    return request(`/funds/transactions/${id}`, {
      method: 'DELETE',
    });
  },

  // Notices CRUD
  async getNotices() {
    return request('/notices');
  },
  async createNotice(data) {
    return request('/notices', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  async deleteNotice(id) {
    return request(`/notices/${id}`, {
      method: 'DELETE',
    });
  },

  // Teacher actions
  async recordAttendance(courseCode, presentCount, totalCount) {
    return request('/teacher/attendance', {
      method: 'POST',
      body: JSON.stringify({ courseCode, presentCount, totalCount }),
    });
  },
  async uploadResource(title, courseCode) {
    return request('/teacher/resources', {
      method: 'POST',
      body: JSON.stringify({ title, courseCode }),
    });
  },
  async createAssignment(title, courseCode, batch) {
    return request('/teacher/assignments', {
      method: 'POST',
      body: JSON.stringify({ title, courseCode, batch }),
    });
  },

  // Audit Logs & Stats
  async getAuditLogs() {
    return request('/audit-logs');
  },
  async getDashboardStats() {
    return request('/dashboard/stats');
  },
};
