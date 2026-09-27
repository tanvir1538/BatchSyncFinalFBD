import React, { useState } from 'react';

export const DeanPortalView = ({ faculties }) => {
  const cseFaculty = faculties.find((f) => f.code === 'CSE') || faculties[0];
  const [newsList, setNewsList] = useState([
    {
      id: 'news-1',
      title: 'Midterm Lab Assessment Rubrics for 3rd & 4th Year CSE',
      date: 'Oct 24',
      target: 'CSE Academic Board',
      details: 'Published by Dean\'s Office • Standardized rubrics for database and networking labs across all 4 departments.',
      audience: 'Visible only within Faculty of CSE'
    },
    {
      id: 'news-2',
      title: 'Guest Lecture on Distributed Cloud Infrastructure by Alumni Fellow',
      date: 'Oct 22',
      target: 'Auditorium-2 • 180 seats',
      details: 'Auditorium-2 session scheduled for Friday 3:00 PM. Target: 3rd & 4th year undergraduate cohorts.',
      audience: 'Visible only within Faculty of CSE'
    }
  ]);

  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'dec-1',
      name: 'Dr. Shahria Kabir',
      designation: 'Assistant Prof., Dept. of CSE',
      badge: 'Pending Dean Endorsement',
      action: 'Makeup lecture & schedule swap for Distributed Systems (CSE 321) on Oct 26.',
      time: 'Today, 09:15 AM',
      reqId: '#T-8821'
    },
    {
      id: 'dec-2',
      name: 'CSE Batch 21 (Session 2021–22)',
      designation: 'CR Tanvir Ahmed',
      badge: 'Pending CR Clearance',
      action: 'Lab 3B reservation & midterm schedule endorsement.',
      time: 'Yesterday, 4:30 PM',
      reqId: '#CR-4109'
    },
    {
      id: 'dec-3',
      name: 'Dept. of Software Engineering',
      designation: 'Academic Committee',
      badge: 'Action Required',
      action: 'Elective syllabus credit revision & new Adjunct Lecturer teaching assignment.',
      time: 'Oct 23, 2025',
      reqId: '#SE-MOD-04'
    }
  ]);

  const [notification, setNotification] = useState(null);

  const handleDecision = (id, actionText) => {
    setPendingApprovals(pendingApprovals.filter(p => p.id !== id));
    setNotification(`Dean Authorization: Request ${actionText} processed.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCreateNotice = () => {
    const title = prompt('Enter Faculty Announcement Title:', 'Semester Routine Finalization Deadline');
    if (title) {
      setNewsList([
        {
          id: `news-${Date.now()}`,
          title,
          date: 'Just Now',
          target: 'Faculty Academic Board',
          details: 'Deanery notification dispatched across all faculty department coordinators and batch CRs.',
          audience: 'Visible only within Faculty of CSE'
        },
        ...newsList
      ]);
      setNotification('Faculty dispatch published!');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-[#001428] text-white shadow-2xl border border-[#dde9ff]/30">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">verified</span>
          <span className="text-[13px]">{notification}</span>
        </div>
      )}

      {/* 1. Header & Scoped Deanery Ribbon */}
      <div className="bg-white p-6 rounded-xl shadow-xs border border-[#dde9ff] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-[#b6d0ff]/40 text-[#0f2942] px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#465f88]"></span>
                Assigned Faculty Context (Scoped)
              </span>
              <span className="inline-flex items-center gap-1 bg-[#dde9ff] text-[#001428] px-2 py-0.5 rounded font-mono text-[11px] font-semibold">
                CODE: {cseFaculty.code} • Node-01
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-[28px] text-[#001428] font-bold tracking-tight">
              Faculty Administration
            </h1>
            <p className="text-[13px] text-[#43474d]">
              Manage your faculty, departments, batches, teachers and academic operations.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              onClick={() => alert('Opening Master Routine timetable for Faculty of CSE...')}
              className="inline-flex items-center gap-1.5 bg-white text-[#0d1c2f] hover:bg-[#eff4ff] border border-[#c3c6ce] px-3.5 py-2 rounded-lg text-[12px] font-semibold shadow-xs"
            >
              <span className="material-symbols-outlined text-[17px] text-[#465f88]">calendar_month</span>
              <span>Open Master Routine</span>
            </button>
            <button
              onClick={handleCreateNotice}
              className="inline-flex items-center gap-1.5 bg-[#001428] text-white hover:bg-[#0f2942] px-4 py-2 rounded-lg text-[13px] font-bold shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>+ Publish Faculty Notice</span>
            </button>
          </div>
        </div>

        {/* Deanery Banner Strip */}
        <div className="bg-[#eff4ff] p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#dde9ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0f2942] text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">account_balance</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display text-[15px] font-bold text-[#0d1c2f]">
                  {cseFaculty.name}
                </span>
                <span className="bg-[#dde9ff] text-[#0f2942] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                  DEANERY
                </span>
              </div>
              <p className="text-[12px] text-[#43474d] flex items-center gap-2 flex-wrap mt-0.5">
                <span>Dean: <strong className="text-[#0d1c2f] font-semibold">Prof. Dr. M. R. Karim</strong></span>
                <span>•</span>
                <span>{cseFaculty.departments.length} Departments</span>
                <span>•</span>
                <span>{cseFaculty.batchesCount} Batches</span>
                <span>•</span>
                <span className="text-[#465f88] font-medium">Academic Session 2024–2025</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start md:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#43474d] text-[11px] font-medium border border-[#dde9ff]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Dean-scoped Access Only
            </span>
          </div>
        </div>
      </div>

      {/* 2. Top Faculty Metrics (6 Compact KPI Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Departments</span>
            <span className="material-symbols-outlined text-[18px]">domain</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#001428]">{cseFaculty.departments.length}</div>
            <div className="text-[11px] text-[#43474d] truncate">CSE, ICE, SE, CSIT</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Batches</span>
            <span className="material-symbols-outlined text-[18px]">layers</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#001428]">{cseFaculty.batchesCount}</div>
            <div className="text-[11px] text-[#43474d] truncate">Across 4 Year Cohorts</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Teachers</span>
            <span className="material-symbols-outlined text-[18px]">badge</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#001428]">68</div>
            <div className="text-[11px] text-[#43474d] truncate">54 Full-time, 14 Adjunct</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Students</span>
            <span className="material-symbols-outlined text-[18px]">school</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#001428]">1,420</div>
            <div className="text-[11px] text-[#43474d] truncate">Undergraduate & MS</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#465f88]">Teacher Approvals</span>
            <span className="bg-[#ffdad6] text-[#ba1a1a] px-1 py-0.2 rounded text-[10px] font-bold">Action</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#ba1a1a]">3</div>
            <div className="text-[11px] text-[#ba1a1a] font-medium truncate">3 Pending</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#465f88]">CR Requests</span>
            <span className="bg-[#ffdad6] text-[#ba1a1a] px-1 py-0.2 rounded text-[10px] font-bold">Action</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#ba1a1a]">4</div>
            <div className="text-[11px] text-[#ba1a1a] font-medium truncate">4 Pending</div>
          </div>
        </div>
      </div>

      {/* 3. Pending Faculty Actions & Approvals */}
      <div className="bg-white p-5 rounded-xl border border-[#dde9ff] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#ba1a1a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">pending_actions</span>
            </div>
            <div>
              <h2 className="font-display text-[16px] font-bold text-[#001428]">
                Pending Faculty Actions & Approvals
              </h2>
              <p className="text-[12px] text-[#43474d]">Decisions awaiting Dean's clearance within Faculty of CSE</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-bold px-3 py-1 rounded-full self-start sm:self-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
            {pendingApprovals.length} Total Pending
          </span>
        </div>

        <div className="space-y-3">
          {pendingApprovals.map((req) => (
            <div
              key={req.id}
              className="bg-[#eff4ff] hover:bg-[#dde9ff]/50 transition-colors p-4 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4 border border-[#dde9ff]"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#0f2942] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </div>
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-[14px] text-[#0d1c2f] font-semibold">{req.name}</span>
                    <span className="text-[#465f88] text-[12px]">• {req.designation}</span>
                    <span className="bg-[#dde9ff] text-[#001428] px-2 py-0.5 rounded text-[11px] font-semibold">
                      {req.badge}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#0d1c2f] leading-snug">{req.action}</p>
                  <div className="flex items-center gap-3 text-[#465f88] font-mono text-[11px] pt-1">
                    <span>{req.time}</span>
                    <span>•</span>
                    <span>Req ID: <strong className="text-[#0d1c2f]">{req.reqId}</strong></span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleDecision(req.id, 'Declined')}
                  className="bg-white text-[#0d1c2f] hover:bg-[#dde9ff] px-3.5 py-1.5 rounded text-[12px] font-medium border border-[#c3c6ce]"
                >
                  Decline
                </button>
                <button
                  onClick={() => handleDecision(req.id, 'Approved')}
                  className="bg-[#001428] text-white hover:bg-[#0f2942] px-4 py-1.5 rounded text-[12px] font-semibold shadow-xs"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Today's Academic Overview */}
      <div className="bg-white p-5 rounded-xl border border-[#dde9ff] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-[16px] font-bold text-[#001428]">Today's Academic Overview</h2>
              <span className="bg-[#dde9ff] text-[#0f2942] px-2 py-0.5 rounded text-[11px] font-bold">
                Fall 2025 • Week 8
              </span>
            </div>
            <p className="text-[12px] text-[#43474d]">Live operational pulse across CSE classroom & lab blocks</p>
          </div>
          <button
            onClick={() => alert('Opening live master timetable matrix...')}
            className="inline-flex items-center gap-1 text-[#001428] hover:text-[#465f88] text-[12px] font-semibold self-start sm:self-center"
          >
            <span>Open Live Master Timetable</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#eff4ff] p-4 rounded-lg space-y-2 flex flex-col justify-between border border-[#dde9ff]">
            <div>
              <div className="flex items-center justify-between text-[#465f88] mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold">Today's Classes</span>
                <span className="material-symbols-outlined text-[18px]">menu_book</span>
              </div>
              <div className="font-display text-xl font-bold text-[#001428]">42 Scheduled</div>
              <p className="text-[12px] text-[#43474d] mt-1">
                <strong className="text-emerald-700 font-semibold">36 On track</strong>, 4 Rescheduled, 2 Makeup Requested
              </p>
            </div>
            <div className="space-y-1 pt-1">
              <div className="w-full bg-[#dde9ff] h-2 rounded-full overflow-hidden flex">
                <div className="bg-emerald-600 h-full" style={{ width: '85.7%' }}></div>
                <div className="bg-amber-500 h-full" style={{ width: '9.5%' }}></div>
                <div className="bg-[#465f88] h-full" style={{ width: '4.8%' }}></div>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-[#465f88]">
                <span>86% completed/active</span>
                <span>6 slots pending</span>
              </div>
            </div>
          </div>

          <div className="bg-[#eff4ff] p-4 rounded-lg space-y-2 flex flex-col justify-between border border-[#dde9ff]">
            <div>
              <div className="flex items-center justify-between text-[#465f88] mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold">Upcoming Peak Time</span>
                <span className="material-symbols-outlined text-[18px]">pace</span>
              </div>
              <div className="font-display text-xl font-bold text-[#001428]">11:30 AM — 01:00 PM</div>
              <p className="text-[12px] text-[#43474d] mt-1">
                Labs & Hall 2 (14 concurrent sections running across CSE Labs & ICT Complex)
              </p>
            </div>
            <div className="bg-white px-3 py-1.5 rounded flex items-center justify-between font-mono text-[11px] border border-[#dde9ff]">
              <span className="text-[#001428] font-medium">Batch 19, 20 & 22 in session</span>
              <span className="text-[#465f88]">Density: High</span>
            </div>
          </div>

          <div className="bg-[#eff4ff] p-4 rounded-lg space-y-2 flex flex-col justify-between border border-[#dde9ff]">
            <div>
              <div className="flex items-center justify-between text-[#465f88] mb-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold">Room & Lab Availability</span>
                <span className="material-symbols-outlined text-[18px]">meeting_room</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-xl font-bold text-[#001428]">12 / 16 In Use</span>
                <span className="text-[11px] text-[#465f88] font-semibold">(75% Occupancy)</span>
              </div>
              <p className="text-[12px] text-[#43474d] mt-1">
                Labs 3A & 3B fully booked. Auditorium-2 available after 02:00 PM.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#43474d]">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span> 4 Computing Labs Busy
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span> 4 Classrooms Free
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Faculty Management Shortcuts (6 Tiles) */}
      <div className="bg-white p-5 rounded-xl border border-[#dde9ff] shadow-xs space-y-4">
        <div>
          <h2 className="font-display text-[16px] font-bold text-[#001428]">
            Faculty Quick Access & Management Shortcuts
          </h2>
          <p className="text-[12px] text-[#43474d]">Direct operational consoles scoped to Faculty of CSE</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-3.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff]/50 border border-[#dde9ff] transition-all flex items-start gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[#dde9ff] text-[#001428] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">domain</span>
            </div>
            <div>
              <h3 className="font-display text-[14px] font-bold text-[#0d1c2f]">Departments</h3>
              <p className="text-[11px] text-[#43474d] mt-0.5">Manage 4 departments, syllabi & chairs</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff]/50 border border-[#dde9ff] transition-all flex items-start gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[#dde9ff] text-[#001428] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">layers</span>
            </div>
            <div>
              <h3 className="font-display text-[14px] font-bold text-[#0d1c2f]">Batches</h3>
              <p className="text-[11px] text-[#43474d] mt-0.5">18 active batch schedules & student rosters</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff]/50 border border-[#dde9ff] transition-all flex items-start gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[#dde9ff] text-[#001428] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </div>
            <div>
              <h3 className="font-display text-[14px] font-bold text-[#0d1c2f]">Teachers</h3>
              <p className="text-[11px] text-[#43474d] mt-0.5">68 faculty members & routine loads</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff]/50 border border-[#dde9ff] transition-all flex items-start gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[#dde9ff] text-[#001428] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </div>
            <div>
              <h3 className="font-display text-[14px] font-bold text-[#0d1c2f]">Courses</h3>
              <p className="text-[11px] text-[#43474d] mt-0.5">74 accredited course modules & prerequisites</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff]/50 border border-[#dde9ff] transition-all flex items-start gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[#dde9ff] text-[#001428] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">meeting_room</span>
            </div>
            <div>
              <h3 className="font-display text-[14px] font-bold text-[#0d1c2f]">Rooms & Labs</h3>
              <p className="text-[11px] text-[#43474d] mt-0.5">ICT Building & Block A • 16 facilities</p>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff]/50 border border-[#dde9ff] transition-all flex items-start gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-lg bg-[#dde9ff] text-[#001428] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
            </div>
            <div>
              <h3 className="font-display text-[14px] font-bold text-[#0d1c2f]">Master Routine</h3>
              <p className="text-[11px] text-[#43474d] mt-0.5">Faculty timetable, overrides & conflict check</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Departmental Composition & Faculty News Split (7 / 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Departmental Composition (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-[#dde9ff] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-[16px] font-bold text-[#001428]">Departmental Composition</h2>
              <p className="text-[12px] text-[#43474d]">Enrollment & faculty headcount distribution</p>
            </div>
            <span className="font-mono text-[11px] bg-[#dde9ff] px-2 py-0.5 rounded text-[#001428] font-bold">
              4 DEPT UNITS
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="bg-[#eff4ff] text-[#465f88] text-[11px] uppercase tracking-wider">
                  <th className="py-2 px-3 rounded-l">Department</th>
                  <th className="py-2 px-3">Chairperson</th>
                  <th className="py-2 px-3 text-center">Batches</th>
                  <th className="py-2 px-3 text-center">Teachers</th>
                  <th className="py-2 px-3 text-right rounded-r">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff4ff]">
                {cseFaculty.departments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-[#eff4ff]/50">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#001428]">{dept.code}</div>
                      <div className="text-[11px] text-[#74777e]">{dept.name}</div>
                    </td>
                    <td className="py-2.5 px-3 text-[#0d1c2f] font-medium">{dept.chairperson}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-[#001428]">{dept.batchesCount}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{dept.teacherCount}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-[#001428]">{dept.studentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Student capacity distribution progress bar */}
          <div className="bg-[#eff4ff] p-3 rounded-lg space-y-1.5 border border-[#dde9ff]">
            <div className="flex items-center justify-between text-[11px] text-[#43474d]">
              <span className="font-medium">Faculty Student Capacity Distribution</span>
              <span className="font-mono font-bold">1,420 Enrolled Total</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden flex bg-[#dde9ff]">
              <div className="bg-[#001428] h-full" style={{ width: '45.1%' }}></div>
              <div className="bg-[#465f88] h-full" style={{ width: '22.5%' }}></div>
              <div className="bg-[#49607c] h-full" style={{ width: '21.8%' }}></div>
              <div className="bg-[#aec7f7] h-full" style={{ width: '10.6%' }}></div>
            </div>
            <div className="flex items-center gap-3 text-[10px] text-[#43474d] pt-0.5 flex-wrap">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#001428]"></span> CSE (45%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#465f88]"></span> ICE (22.5%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#49607c]"></span> SE (22%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#aec7f7]"></span> CSIT (10.5%)</span>
            </div>
          </div>
        </div>

        {/* Right: Faculty News & Dispatches (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-[#001428]">campaign</span>
                <h2 className="font-display text-[16px] font-bold text-[#001428]">Faculty News & Dispatches</h2>
              </div>
              <button
                onClick={handleCreateNotice}
                className="bg-[#dde9ff] hover:bg-[#b6d0ff] text-[#001428] px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
                <span>+ Create</span>
              </button>
            </div>

            <div className="space-y-2.5">
              {newsList.map((item) => (
                <div key={item.id} className="p-3 bg-[#eff4ff] rounded-lg space-y-1 border border-[#dde9ff]">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="bg-[#b6d0ff]/50 text-[#0f2942] px-1.5 py-0.5 rounded font-semibold truncate max-w-[200px]">
                      {item.audience}
                    </span>
                    <span className="font-mono text-[#74777e]">{item.date}</span>
                  </div>
                  <h4 className="font-display text-[13px] font-bold text-[#0d1c2f] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[12px] text-[#43474d] leading-relaxed">{item.details}</p>
                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#465f88]">
                    <span className="font-mono">{item.target}</span>
                    <div className="flex items-center gap-2 font-semibold">
                      <button onClick={() => alert('Editing notice...')} className="hover:underline">Edit</button>
                      <button onClick={() => alert('Configuring notice audience visibility...')} className="hover:underline text-[#001428]">Manage</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-2.5 bg-[#dde9ff]/50 rounded-lg flex items-start gap-2 text-[11px] text-[#43474d]">
            <span className="material-symbols-outlined text-[16px] text-[#465f88] shrink-0 mt-0.5">lock</span>
            <p>News is visible only within the <strong>Faculty of CSE</strong> unless explicitly escalated to the University Public Portal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
