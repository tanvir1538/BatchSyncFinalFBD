import React, { useState } from 'react';
import { api } from '../services/api.js';

export const TeacherCentralView = () => {
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceCount, setAttendanceCount] = useState(42);
  const [statusMsg, setStatusMsg] = useState(null);

  // Quick room swap modal state
  const [isRoomSwapOpen, setIsRoomSwapOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState('Room 204 (ICT Building, 2nd Floor)');

  const handleTakeAttendance = () => {
    setIsAttendanceModalOpen(true);
  };

  const handleSaveAttendance = async () => {
    setIsAttendanceModalOpen(false);
    setStatusMsg(`Digital Attendance locked: ${attendanceCount}/48 students marked present in CSE 321.`);
    try {
      await api.recordAttendance('CSE 321', attendanceCount, 48);
    } catch (e) {
      console.warn('API error recording attendance:', e);
    }
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleSwapRoom = async (newRoom) => {
    setCurrentRoom(newRoom);
    setIsRoomSwapOpen(false);
    setStatusMsg(`Room reassignment broadcasted to Batch 20 Telegram: Swapped to ${newRoom}.`);
    try {
      await api.swapRoom('sched-1', newRoom);
    } catch (e) {
      console.warn('API error swapping room:', e);
    }
    setTimeout(() => setStatusMsg(null), 3500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Alert */}
      {statusMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-[#001428] text-white shadow-2xl border border-[#dde9ff]/30">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">check_circle</span>
          <span className="text-[13px]">{statusMsg}</span>
        </div>
      )}

      {/* Sub-header Title Banner with Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-xl shadow-xs border border-[#dde9ff]">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#001428] text-[24px]">school</span>
            <h1 className="font-display text-2xl font-bold text-[#001428]">Teacher Central</h1>
            <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#465f88] text-[11px] font-semibold">
              FACULTY HUB
            </span>
          </div>
          <p className="text-[13px] text-[#43474d] mt-1">
            Welcome back, Dr. Shahria Kabir. Here is your daily academic routine and active course overview.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={async () => {
              const resTitle = prompt('Enter Course Resource Title:', 'Lecture 7 - Concurrency Models & Vector Clocks.pdf');
              if (resTitle) {
                setStatusMsg(`Resource "${resTitle}" uploaded to CSE 321 vault.`);
                try {
                  await api.uploadResource(resTitle, 'CSE 321');
                } catch (e) {
                  console.warn(e);
                }
                setTimeout(() => setStatusMsg(null), 3000);
              }
            }}
            className="px-3.5 py-2 bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-colors border border-[#dde9ff]"
          >
            <span className="material-symbols-outlined text-[16px]">upload_file</span>
            <span>+ Upload Resource</span>
          </button>
          <button
            onClick={async () => {
              const assignTitle = prompt('Enter Assignment Title:', 'Distributed Consensus & Paxos Lab Experiment');
              if (assignTitle) {
                setStatusMsg(`Assignment "${assignTitle}" published for Batch 20.`);
                try {
                  await api.createAssignment(assignTitle, 'CSE 321', 'Batch 20');
                } catch (e) {
                  console.warn(e);
                }
                setTimeout(() => setStatusMsg(null), 3000);
              }
            }}
            className="px-3.5 py-2 bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition-colors border border-[#dde9ff]"
          >
            <span className="material-symbols-outlined text-[16px]">note_add</span>
            <span>+ Create Assignment</span>
          </button>
          <button
            onClick={() => alert('Opening Teacher Master Schedule (CSE Dept Node-01)...')}
            className="px-4 py-2 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[12px] font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <span>My Routine</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* CORE FEATURE 1: NEXT CLASS (HERO / COMMANDING) */}
      <div className="relative overflow-hidden rounded-xl bg-[#001428] text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-16 -bottom-16 w-96 h-96 rounded-full bg-[#465f88]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-5 pointer-events-none flex items-center justify-end pr-8">
          <span className="material-symbols-outlined text-[240px]">developer_board</span>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded bg-white/15 backdrop-blur-sm text-[#d6e3ff] text-[11px] uppercase tracking-wider font-semibold">
                NEXT CLASS — LIVE TIMETABLE
              </span>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#b6d0ff] text-[#0f2942] text-[11px] font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#001428] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#001428]"></span>
                </span>
                <span>Starts in 25 minutes</span>
              </div>
              <span className="text-[#c3c6ce] font-mono text-[11px]">SEC-A • 48 ENROLLED</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white mb-1">
              Distributed Systems (CSE 321)
            </h2>
            <p className="text-[15px] text-[#aec7f7] mb-3 font-medium">
              Batch 20 • Dept. of CSE (Section A)
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-[14px] text-[#ebf1ff]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#d6e3ff] text-[18px]">schedule</span>
                <span className="font-mono">10:00 AM – 11:00 AM • Today</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#d6e3ff] text-[18px]">meeting_room</span>
                <span className="font-semibold text-[#aec7f7]">{currentRoom}</span>
              </div>
            </div>

            <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 border border-white/20 text-[12px]">
              <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
              <span className="text-white font-semibold">Effective Routine: Confirmed</span>
              <span className="text-[#d5e3fd]/80">(Derived from Master Routine • Room Unchanged)</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={handleTakeAttendance}
              className="px-5 py-3 rounded-lg bg-white text-[#001428] hover:bg-[#f8f9ff] font-bold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">fact_check</span>
              <span>View Class & Attendance</span>
            </button>
            <button
              onClick={() => setIsRoomSwapOpen(true)}
              className="px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium text-[13px] flex items-center justify-center gap-2 backdrop-blur-md transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
              <span>Quick Room Swap / Cancel</span>
            </button>
          </div>
        </div>
      </div>

      {/* CORE FEATURE 2: ACADEMIC SUMMARY METRICS (5 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <span className="text-[11px] text-[#465f88] uppercase font-bold">My Courses</span>
          <div className="mt-1">
            <div className="font-display text-2xl font-bold text-[#001428]">4 Courses</div>
            <span className="text-[11px] text-[#43474d] truncate block">CSE 321, EEE 214, CSE 410, SWE 302</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <span className="text-[11px] text-[#465f88] uppercase font-bold">My Batches</span>
          <div className="mt-1">
            <div className="font-display text-2xl font-bold text-[#001428]">3 Cohorts</div>
            <span className="text-[11px] text-[#43474d] block">Batch 19, 20, 21</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <span className="text-[11px] text-[#465f88] uppercase font-bold">Today's Classes</span>
          <div className="mt-1">
            <div className="font-display text-2xl font-bold text-[#001428]">3 Scheduled</div>
            <span className="text-[11px] text-[#465f88] font-medium block">1 Done • 1 Next • 1 Later</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <span className="text-[11px] text-[#465f88] uppercase font-bold">Pending Tasks</span>
          <div className="mt-1">
            <div className="font-display text-2xl font-bold text-[#001428]">14 to Review</div>
            <span className="text-[11px] text-[#ba1a1a] font-medium block">Database & OS Lab Tasks</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between col-span-2 md:col-span-1">
          <span className="text-[11px] text-[#465f88] uppercase font-bold">Attendance Rate</span>
          <div className="mt-1">
            <div className="font-display text-2xl font-bold text-[#001428] font-mono">91.4% Avg</div>
            <span className="text-[11px] text-[#43474d] block">Active Semester Track</span>
          </div>
        </div>
      </div>

      {/* 2-COLUMN LAYOUT: 8 cols left / 4 cols right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* LEFT COLUMN (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Section A: Today's Academic Schedule */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dde9ff]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#465f88] text-[20px]">calendar_view_day</span>
                <h3 className="font-display text-[16px] text-[#0d1c2f] font-bold">Today's Academic Schedule</h3>
              </div>
              <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg border border-[#dde9ff]">
                <button
                  onClick={() => setScheduleFilter('all')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    scheduleFilter === 'all' ? 'bg-white text-[#001428] shadow-xs' : 'text-[#465f88]'
                  }`}
                >
                  All Today (3)
                </button>
                <button
                  onClick={() => setScheduleFilter('upcoming')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    scheduleFilter === 'upcoming' ? 'bg-white text-[#001428] shadow-xs' : 'text-[#465f88]'
                  }`}
                >
                  Upcoming (2)
                </button>
                <button
                  onClick={() => setScheduleFilter('completed')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    scheduleFilter === 'completed' ? 'bg-white text-[#001428] shadow-xs' : 'text-[#465f88]'
                  }`}
                >
                  Completed (1)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {/* Class 1: Completed */}
              {(scheduleFilter === 'all' || scheduleFilter === 'completed') && (
                <div className="p-4 rounded-xl bg-[#eff4ff]/60 border border-[#dde9ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-white border border-[#dde9ff] text-[#465f88] shrink-0 font-mono text-center">
                      <div className="text-[11px] font-bold">08:30 AM</div>
                      <div className="text-[10px] text-[#74777e]">09:45 AM</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display text-[14px] text-[#0d1c2f] font-semibold">EEE 214: Signal Processing</h4>
                        <span className="px-1.5 py-0.5 rounded bg-white text-[#465f88] text-[10px] font-bold border border-[#dde9ff]">
                          Batch 21
                        </span>
                      </div>
                      <p className="text-[12px] text-[#43474d] mt-0.5">Auditorium-2 • Section B</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="px-2.5 py-1 rounded bg-white text-emerald-800 text-[11px] font-bold flex items-center gap-1 border border-emerald-200">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">check_circle</span>
                      Completed (Att. 38/42 Taken)
                    </span>
                  </div>
                </div>
              )}

              {/* Class 2: In-Progress Next */}
              {(scheduleFilter === 'all' || scheduleFilter === 'upcoming') && (
                <div className="p-4 rounded-xl bg-white border-2 border-[#001428]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-[#001428] text-white shrink-0 font-mono text-center">
                      <div className="text-[11px] font-bold">10:00 AM</div>
                      <div className="text-[10px] text-[#d6e3ff]">11:00 AM</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display text-[15px] text-[#001428] font-bold">CSE 321: Distributed Systems</h4>
                        <span className="px-2 py-0.5 rounded bg-[#001428] text-white text-[10px] font-bold">
                          Batch 20
                        </span>
                      </div>
                      <p className="text-[12px] text-[#43474d] mt-0.5">{currentRoom} • Section A</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="px-2.5 py-1 rounded bg-[#b6d0ff] text-[#0f2942] text-[11px] font-bold animate-pulse">
                      Starts in 25m
                    </span>
                    <button
                      onClick={handleTakeAttendance}
                      className="px-3.5 py-1.5 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[12px] font-bold transition-colors shadow-xs"
                    >
                      Take Attendance
                    </button>
                  </div>
                </div>
              )}

              {/* Class 3: Room Changed */}
              {(scheduleFilter === 'all' || scheduleFilter === 'upcoming') && (
                <div className="p-4 rounded-xl bg-[#eff4ff]/70 border border-[#aec7f7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-white border border-[#dde9ff] text-[#465f88] shrink-0 font-mono text-center">
                      <div className="text-[11px] font-bold">02:00 PM</div>
                      <div className="text-[10px] text-[#74777e]">03:30 PM</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display text-[14px] text-[#0d1c2f] font-semibold">CSE 410: Artificial Intelligence Lab</h4>
                        <span className="px-1.5 py-0.5 rounded bg-white text-[#465f88] text-[10px] font-bold border border-[#dde9ff]">
                          Batch 19
                        </span>
                      </div>
                      <p className="text-[12px] text-[#43474d] mt-0.5">
                        <span className="line-through text-[#74777e]">Lab 2A</span> → <strong className="text-[#001428]">Lab 3B</strong> (Server maintenance clearance)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="px-2.5 py-1 rounded bg-[#d6e3ff] text-[#001b3d] text-[11px] font-bold">
                      Room Changed
                    </span>
                    <button
                      onClick={() => alert('Options: Notify CR, request alternate software lab')}
                      className="p-1.5 rounded bg-white hover:bg-[#dde9ff] text-[#0d1c2f] border border-[#dde9ff]"
                    >
                      <span className="material-symbols-outlined text-[16px]">more_vert</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#dde9ff] text-right">
              <a href="#" className="text-[12px] text-[#001428] font-bold hover:underline inline-flex items-center gap-1">
                <span>View Full Weekly Routine</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Section B: Assignments & Lab Tasks */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dde9ff]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#465f88] text-[20px]">assignment</span>
                <h3 className="font-display text-[16px] text-[#0d1c2f] font-bold">Assignments & Lab Tasks</h3>
              </div>
              <span className="font-mono text-[11px] text-[#74777e] uppercase font-bold">PORTAL QUEUE</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#dde9ff]">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-[14px] text-[#0d1c2f] font-bold">
                      Database Assignment 3 (CSE 321)
                    </h4>
                    <span className="px-1.5 py-0.5 rounded bg-white text-[#465f88] text-[10px] font-bold">
                      Batch 20
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#43474d] mt-1">
                    <span><strong className="text-[#001428] font-mono">18 / 42</strong> submitted</span>
                    <span>•</span>
                    <span className="text-[#ba1a1a] font-semibold">Deadline: Today, 11:59 PM</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Reviewing 18 submissions for Database Assignment 3...')}
                  className="px-3.5 py-1.5 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[12px] font-bold transition-colors shrink-0"
                >
                  Review Submissions
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-[#eff4ff] flex flex-col md:flex-row md:items-center justify-between gap-3 border border-[#dde9ff]">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-display text-[14px] text-[#0d1c2f] font-bold">
                      AI Search Algorithms Lab Task (CSE 410)
                    </h4>
                    <span className="px-1.5 py-0.5 rounded bg-white text-[#465f88] text-[10px] font-bold">
                      Batch 19
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-[#43474d] mt-1">
                    <span><strong className="text-[#001428] font-mono">35 / 40</strong> submitted</span>
                    <span>•</span>
                    <span className="text-[#465f88] font-semibold">5 pending grading</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Opening grading rubric for AI Lab task...')}
                  className="px-4 py-1.5 bg-white hover:bg-[#dde9ff] text-[#001428] border border-[#c3c6ce] rounded-lg text-[12px] font-bold transition-colors shrink-0"
                >
                  Grade
                </button>
              </div>
            </div>
          </div>

          {/* Section C: Course Attendance Overview */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dde9ff]">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#465f88] text-[20px]">how_to_reg</span>
                <h3 className="font-display text-[16px] text-[#0d1c2f] font-bold">Course Attendance Overview</h3>
              </div>
              <a href="#" className="text-[12px] text-[#001428] font-bold hover:underline inline-flex items-center gap-1">
                <span>Manage Attendance & Rolls</span>
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </a>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="font-medium text-[#0d1c2f]">Distributed Systems (CSE 321) — Batch 20</span>
                  <span className="font-mono text-[#001428] font-bold">91% Attendance</span>
                </div>
                <div className="w-full h-2 bg-[#dde9ff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#001428] rounded-full" style={{ width: '91%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="font-medium text-[#0d1c2f]">Signal Processing (EEE 214) — Batch 21</span>
                  <span className="font-mono text-[#465f88] font-bold">87% Attendance</span>
                </div>
                <div className="w-full h-2 bg-[#dde9ff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#465f88] rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12px] mb-1">
                  <span className="font-medium text-[#0d1c2f]">AI Systems Lab (CSE 410) — Batch 19</span>
                  <span className="font-mono text-[#001428] font-bold">94% Attendance</span>
                </div>
                <div className="w-full h-2 bg-[#dde9ff] rounded-full overflow-hidden">
                  <div className="h-full bg-[#001428] rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="xl:col-span-4 space-y-6">
          {/* Section A: Important Routine & Schedule Updates */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dde9ff]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#465f88] text-[18px]">campaign</span>
                <h3 className="font-display text-[15px] text-[#0d1c2f] font-bold">Schedule Updates & Alerts</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>

            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[#fffbeb] border-l-4 border-amber-500 text-amber-950">
                <div className="text-[11px] text-amber-900 uppercase font-bold">Room Change Alert</div>
                <p className="text-[12px] mt-1 leading-snug">
                  CSE 410 Lab shifted from Lab 2A to Lab 3B by Deanery Clearance (#CR-4109).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#eff4ff] border-l-4 border-[#001428] text-[#001428]">
                <div className="text-[11px] text-[#001428] uppercase font-bold">Makeup Class Clearance</div>
                <p className="text-[12px] text-[#43474d] mt-1 leading-snug">
                  Sunday makeup slot approved for Distributed Systems (Oct 31, 03:00 PM).
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#ffdad6]/40 border-l-4 border-[#ba1a1a] text-[#ba1a1a]">
                <div className="text-[11px] uppercase font-bold">Deadline Reminder</div>
                <p className="text-[12px] text-[#43474d] mt-1 leading-snug">
                  Midterm grading window closes in 4 days (Registrar Office notice).
                </p>
              </div>
            </div>
          </div>

          {/* Section B: Quick Academic Actions */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dde9ff]">
            <h3 className="font-display text-[15px] text-[#0d1c2f] font-bold mb-3 pb-2 border-b border-[#dde9ff]">
              Quick Academic Actions
            </h3>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={handleTakeAttendance}
                className="w-full p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] text-[12px] font-semibold flex items-center justify-between transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#001428] text-[18px]">qr_code_scanner</span>
                  <span>Take Attendance (QR / Manual Roll)</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#74777e]">chevron_right</span>
              </button>

              <button
                onClick={() => alert('Opening Create Assignment modal...')}
                className="w-full p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] text-[12px] font-semibold flex items-center justify-between transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#001428] text-[18px]">add_task</span>
                  <span>Create Assignment</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#74777e]">chevron_right</span>
              </button>

              <button
                onClick={() => alert('Opening file uploader for Course Resource...')}
                className="w-full p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] text-[12px] font-semibold flex items-center justify-between transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#001428] text-[18px]">cloud_upload</span>
                  <span>Upload Course Resource / Syllabus</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#74777e]">chevron_right</span>
              </button>

              <button
                onClick={() => alert('Checking Campus Room Availability Matrix...')}
                className="w-full p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] text-[12px] font-semibold flex items-center justify-between transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#001428] text-[18px]">domain</span>
                  <span>Check Room Availability</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#74777e]">chevron_right</span>
              </button>

              <button
                onClick={() => setIsRoomSwapOpen(true)}
                className="w-full p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] text-[12px] font-semibold flex items-center justify-between transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[#001428] text-[18px]">published_with_changes</span>
                  <span>Request Routine Swap / Make-up</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-[#74777e]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Section C: Quick Room Availability (Campus Pulse) */}
          <div className="bg-white rounded-xl p-5 shadow-xs border border-[#dde9ff]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#465f88] text-[18px]">meeting_room</span>
                <h3 className="font-display text-[15px] text-[#0d1c2f] font-bold">Room Availability</h3>
              </div>
              <span className="font-mono text-[10px] text-[#465f88] font-bold">CAMPUS PULSE</span>
            </div>

            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0d1c2f]">Room 201</span>
                  <span className="text-[#74777e]">•</span>
                  <span className="text-[#465f88]">Cap: 60</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#dde9ff] text-[#001428] font-mono text-[11px] font-bold">
                  Available (Next 2h)
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#d6e3ff]/50 flex items-center justify-between text-[12px] border border-[#b6d0ff]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0d1c2f]">Room 204</span>
                  <span className="text-[#74777e]">•</span>
                  <span className="text-[#001428] font-bold">CSE 321</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#001428] text-white font-mono text-[10px] font-bold">
                  Booked by You
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0d1c2f]">Room 301</span>
                  <span className="text-[#74777e]">•</span>
                  <span className="text-[#465f88]">Cap: 60</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#dde9ff] text-[#001428] font-mono text-[11px] font-bold">
                  Available
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between text-[12px]">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#0d1c2f]">Lab 3B</span>
                  <span className="text-[#74777e]">•</span>
                  <span className="text-[#74777e]">Hardware</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white text-[#74777e] font-mono text-[10px] border border-[#dde9ff]">
                  In Use (until 1:45 PM)
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dde9ff] flex items-center justify-between">
              <button
                onClick={() => alert('Viewing all 44 academic rooms across PSTU complex...')}
                className="text-[12px] text-[#465f88] hover:text-[#001428] font-semibold"
              >
                View All Rooms
              </button>
              <button
                onClick={() => setIsRoomSwapOpen(true)}
                className="px-3.5 py-1.5 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[12px] font-bold transition-colors"
              >
                Book Room
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Modal */}
      {isAttendanceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#dde9ff] overflow-hidden">
            <div className="p-5 bg-[#001428] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[22px]">fact_check</span>
                <div>
                  <h3 className="font-display text-[16px] font-bold">Take Attendance: CSE 321</h3>
                  <p className="text-[11px] text-[#b0c9e8]">Batch 20 (Sec-A) • Lecture 14</p>
                </div>
              </div>
              <button onClick={() => setIsAttendanceModalOpen(false)} className="text-[#b0c9e8] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 text-[13px]">
              <div className="p-4 bg-[#eff4ff] rounded-xl border border-[#dde9ff] flex items-center justify-between">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">Present Count</div>
                  <div className="font-display text-3xl font-bold text-[#001428] mt-0.5">
                    {attendanceCount} / 48
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                    {Math.round((attendanceCount / 48) * 100)}% Turnout Today
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAttendanceCount(Math.max(0, attendanceCount - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-[#c3c6ce] text-[#001428] font-bold text-[18px] hover:bg-[#dde9ff]"
                  >
                    -
                  </button>
                  <button
                    onClick={() => setAttendanceCount(Math.min(48, attendanceCount + 1))}
                    className="w-9 h-9 rounded-lg bg-[#001428] text-white font-bold text-[18px] hover:bg-[#0f2942]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#c3c6ce] flex items-center justify-between">
                <span className="text-[#0d1c2f] font-medium">Automatic Biometric RFID Node-01 Sync</span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Active</span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#c3c6ce] flex items-center justify-between">
                <span className="text-[#0d1c2f] font-medium">Auto-generate QR Code for Student Scanner</span>
                <button
                  onClick={() => alert('QR Code generated on projector: Refreshing 30s token...')}
                  className="px-2.5 py-1 bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] text-[11px] font-bold rounded border border-[#dde9ff]"
                >
                  Display QR
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#eff4ff] border-t border-[#dde9ff] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setIsAttendanceModalOpen(false)}
                className="px-4 py-2 bg-white text-[#465f88] rounded-lg text-[13px] font-medium border border-[#c3c6ce]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAttendance}
                className="px-5 py-2 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg text-[13px] font-bold transition-all shadow-sm"
              >
                Lock Attendance Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Swap Modal */}
      {isRoomSwapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#dde9ff] overflow-hidden">
            <div className="p-5 bg-[#001428] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
                <h3 className="font-display text-[16px] font-bold">Quick Room Swap</h3>
              </div>
              <button onClick={() => setIsRoomSwapOpen(false)} className="text-[#b0c9e8] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-5 space-y-3 text-[13px]">
              <p className="text-[#43474d]">
                Select an authorized available room for today's Distributed Systems class session:
              </p>

              <div className="space-y-2">
                {[
                  'Room 204 (ICT Building, 2nd Floor)',
                  'Room 301 (Auditorium Wing, High-lumen Projector)',
                  'Software Lab 2 (Workstation Cluster)',
                  'Seminar Room 102 (West Complex)'
                ].map((room) => (
                  <button
                    key={room}
                    onClick={() => handleSwapRoom(room)}
                    className={`w-full p-3 rounded-lg text-left border flex items-center justify-between transition-colors ${
                      currentRoom === room
                        ? 'bg-[#eff4ff] border-[#001428] font-bold text-[#001428]'
                        : 'bg-white border-[#c3c6ce] hover:bg-[#eff4ff] text-[#0d1c2f]'
                    }`}
                  >
                    <span>{room}</span>
                    {currentRoom === room && (
                      <span className="material-symbols-outlined text-[18px] text-[#001428]">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#eff4ff] border-t border-[#dde9ff] text-right">
              <button
                onClick={() => setIsRoomSwapOpen(false)}
                className="px-4 py-2 bg-white text-[#465f88] rounded-lg text-[13px] border border-[#c3c6ce]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
