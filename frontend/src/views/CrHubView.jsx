import React, { useState } from 'react';

export const CrHubView = ({
  schedule,
  membershipRequests,
  onApproveMembership,
  onRejectMembership,
  poll,
  onVotePoll,
  onClosePoll,
  onCreatePoll,
  fundBalance,
  fundTransactions,
  onAddTransaction,
}) => {
  const [notices, setNotices] = useState([
    {
      id: 'n-1',
      title: 'CSE 311 Room Shifted to Room 301 due to projector setup',
      body: 'The query execution demo requires the high-lumen overhead projector in Room 301. Attendance policy remains standard.',
      author: 'CR Tanvir Ahmed',
      time: '40 mins ago',
      syncedTelegram: true,
    },
    {
      id: 'n-2',
      title: 'Midterm Question Banks & Lecture Slides uploaded',
      body: 'Question archives from 2021-2024 and Slides 1-6 for CSE-311 have been compiled in the Resource Vault.',
      author: 'Academic Secretary',
      time: 'Yesterday',
      syncedTelegram: false,
    },
    {
      id: 'n-3',
      title: 'Class Farewell Committee Meeting on Sunday at 4:00 PM',
      body: 'Representatives from each group are requested to join the discussion at cafeteria mezzanine floor regarding tour & crest allocations.',
      author: 'CR Tanvir Ahmed',
      time: '2 days ago',
      syncedTelegram: false,
    },
  ]);

  const [topperElectMessage, setTopperElectMessage] = useState(null);
  const [selectedTopperId, setSelectedTopperId] = useState('rahat');
  const [isNewPollModalOpen, setIsNewPollModalOpen] = useState(false);
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [isNewNoticeModalOpen, setIsNewNoticeModalOpen] = useState(false);
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeBody, setNewNoticeBody] = useState('');

  const pendingRequests = membershipRequests.filter((r) => r.status === 'pending');

  const handleElectTopper = (author, noteTitle) => {
    setTopperElectMessage(`Elected "${author}"'s submission as the official Topper's Note for Lecture 03! Batch Vault updated.`);
    setSelectedTopperId(author.toLowerCase().replace(/\s+/g, ''));
    setTimeout(() => setTopperElectMessage(null), 4000);
  };

  const handleCreateNotice = (e) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    setNotices([
      {
        id: `notice-${Date.now()}`,
        title: newNoticeTitle,
        body: newNoticeBody || 'Notice broadcasted to batch members.',
        author: 'CR Tanvir Ahmed',
        time: 'Just now',
        syncedTelegram: true,
      },
      ...notices,
    ]);
    setIsNewNoticeModalOpen(false);
    setNewNoticeTitle('');
    setNewNoticeBody('');
    setTopperElectMessage('Notice dispatched and pushed to @cse12_batchsync Telegram channel!');
    setTimeout(() => setTopperElectMessage(null), 3500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Alert */}
      {topperElectMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-[#001428] text-white shadow-2xl border border-[#dde9ff]/30">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">military_tech</span>
          <span className="text-[13px]">{topperElectMessage}</span>
        </div>
      )}

      {/* Dynamic Batch Scope Header */}
      <section className="bg-white rounded-xl p-5 sm:p-6 border border-[#dde9ff] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-2xl sm:text-[28px] text-[#001428] tracking-tight font-bold">
              CSE Batch 12
            </h1>
            <span className="bg-[#eff4ff] text-[#465f88] font-mono text-[11px] px-2 py-0.5 rounded font-bold border border-[#dde9ff]">
              SEM 7
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </span>
          </div>
          <p className="text-[13px] text-[#465f88]">
            7th Semester • Academic Coordination • Dept. of Computer Science & Engineering
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsNewPollModalOpen(true)}
            className="bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] text-[12px] font-semibold px-3.5 py-2 rounded-lg border border-[#dde9ff] flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">how_to_vote</span>
            <span>+ Create Poll</span>
          </button>
          <button
            onClick={() => setIsNewNoticeModalOpen(true)}
            className="bg-[#001428] hover:bg-[#0f2942] text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[17px]">campaign</span>
            <span>+ Post Notice</span>
          </button>
        </div>
      </section>

      {/* 4 Compact KPI Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4.5 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#465f88]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Today's Classes</span>
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#001428]">3 Classes</div>
            <div className="flex items-center gap-1 mt-1 text-[#ba1a1a] text-[11px] font-semibold">
              <span className="material-symbols-outlined text-[14px]">priority_high</span>
              <span>1 Room Override Enforced</span>
            </div>
          </div>
          <div className="w-full bg-[#dde9ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#465f88] h-full rounded-full" style={{ width: '66%' }}></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-4.5 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#465f88]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Pending Requests</span>
            <span className="material-symbols-outlined text-[20px]">person_add</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-[#001428]">
                {pendingRequests.length} Pending
              </span>
              <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                Action Required
              </span>
            </div>
            <div className="text-[#465f88] text-[11px] mt-1">Student ID verification queue</div>
          </div>
          <div className="w-full bg-[#dde9ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#ba1a1a] h-full rounded-full" style={{ width: '45%' }}></div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4.5 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#465f88]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Batch Fund Balance</span>
            <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#001428] font-mono">
              ${fundBalance.toFixed(2)}
            </div>
            <div className="text-[#465f88] text-[11px] mt-1">+$350.00 this month • $960 collected</div>
          </div>
          <div className="w-full bg-[#dde9ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#465f88] h-full rounded-full" style={{ width: '78%' }}></div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4.5 rounded-xl border border-[#dde9ff] shadow-xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-[#465f88]">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Active Polls</span>
            <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-[#001428]">
              {poll.isClosed ? 'Poll Closed' : '1 Active Poll'}
            </div>
            <div className="text-[#465f88] text-[11px] mt-1">
              {poll.isClosed ? 'Results published' : 'Makeup schedule • 4h left • 82% turnout'}
            </div>
          </div>
          <div className="w-full bg-[#dde9ff] h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#001428] h-full rounded-full" style={{ width: '82%' }}></div>
          </div>
        </div>
      </section>

      {/* Two-Column Streamlined Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section A: Today's Academic Schedule */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#001428] text-[20px]">calendar_today</span>
                <h2 className="font-display text-[16px] text-[#001428] font-bold">Today's Academic Schedule</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="inline-flex rounded-lg bg-[#eff4ff] p-0.5 border border-[#dde9ff]">
                  <button className="px-2.5 py-1 rounded text-[11px] font-semibold bg-white text-[#001428] shadow-xs">
                    All Today (3)
                  </button>
                  <button className="px-2.5 py-1 rounded text-[11px] font-medium text-[#465f88] hover:text-[#001428]">
                    Upcoming (2)
                  </button>
                </div>
                <a href="#" className="text-[12px] text-[#465f88] hover:text-[#001428] font-semibold ml-1">
                  View Full Routine →
                </a>
              </div>
            </div>

            <div className="space-y-3">
              {/* Class 1: Room Change */}
              <div className="bg-[#eff4ff] border border-[#dde9ff] rounded-lg p-4 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[13px] font-bold text-[#001428]">10:00 AM – 11:30 AM</span>
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                      Room Changed
                    </span>
                    <span className="text-[#74777e] text-[11px]">• In 20 mins</span>
                  </div>
                  <h3 className="font-display text-[15px] text-[#001428] font-semibold">
                    CSE-311: Database Management Systems
                  </h3>
                  <div className="flex items-center gap-2 text-[12px] text-[#465f88] flex-wrap">
                    <span>Prof. M. Rahman</span>
                    <span>•</span>
                    <span className="text-amber-900 font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">meeting_room</span>
                      Room 301 (Override from Room 204)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      setTopperElectMessage('Broadcasted Room 301 override reminder to all Batch 12 students!');
                      setTimeout(() => setTopperElectMessage(null), 3000);
                    }}
                    className="bg-white hover:bg-[#dde9ff] text-[#001428] px-3 py-1 rounded text-[11px] font-semibold border border-[#dde9ff]"
                  >
                    Notify Batch
                  </button>
                </div>
              </div>

              {/* Class 2: Upcoming */}
              <div className="bg-[#eff4ff] border border-[#dde9ff] rounded-lg p-4 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#465f88]"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[13px] font-bold text-[#001428]">01:30 PM – 03:30 PM</span>
                    <span className="bg-[#dde9ff] text-[#001b3d] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                      Upcoming
                    </span>
                  </div>
                  <h3 className="font-display text-[15px] text-[#001428] font-semibold">
                    CSE-312: DBMS Sessional Lab
                  </h3>
                  <div className="flex items-center gap-2 text-[12px] text-[#465f88] flex-wrap">
                    <span>Lecturer S. Haque</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#0d1c2f]">
                      <span className="material-symbols-outlined text-[15px] text-[#465f88]">computer</span>
                      Software Lab 2
                    </span>
                  </div>
                </div>
                <div className="shrink-0 self-end sm:self-center">
                  <span className="text-[#74777e] font-mono text-[11px]">Standard Session</span>
                </div>
              </div>

              {/* Class 3: Cancelled */}
              <div className="bg-[#eff4ff]/70 border border-[#dde9ff] rounded-lg p-4 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-3 opacity-80">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ba1a1a]"></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[13px] text-[#74777e] line-through">03:30 PM – 05:00 PM</span>
                    <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                      Cancelled
                    </span>
                  </div>
                  <h3 className="font-display text-[15px] text-[#74777e] line-through font-semibold">
                    CSE-315: Theory of Computing
                  </h3>
                  <div className="flex items-center gap-2 text-[12px] text-[#74777e] flex-wrap">
                    <span>Teacher on Deputation</span>
                    <span>•</span>
                    <span>Room 402</span>
                  </div>
                </div>
                <div className="shrink-0 self-end sm:self-center">
                  <span className="text-[#ba1a1a] text-[11px] font-medium bg-[#ffdad6]/60 px-2 py-0.5 rounded">
                    Deputation notice logged
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section B: Batch Notices & Dispatches */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#001428] text-[20px]">campaign</span>
                <h2 className="font-display text-[16px] text-[#001428] font-bold">Batch Notices & Dispatches</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsNewNoticeModalOpen(true)}
                  className="bg-[#001428] hover:bg-[#0f2942] text-white text-[11px] font-bold px-3 py-1 rounded flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>Post Notice</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {notices.map((n) => (
                <div key={n.id} className="p-3.5 rounded-lg bg-[#eff4ff] border border-[#dde9ff] flex flex-col gap-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-[#001428] text-[13px]">{n.title}</h4>
                    {n.syncedTelegram && (
                      <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <span className="material-symbols-outlined text-[12px]">send</span> Synced to Telegram
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-[#43474d] leading-relaxed">{n.body}</p>
                  <div className="text-[11px] text-[#465f88] font-mono mt-1">
                    Posted {n.time} by {n.author}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section C: Class Note Review & Topper's Selection */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-[22px]">military_tech</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display text-[16px] text-[#001428] font-bold">Class Note Review & Topper's Selection</h2>
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                      3 Lectures Pending Review
                    </span>
                  </div>
                  <p className="text-[12px] text-[#465f88] mt-0.5">
                    Review student-submitted lecture notes by class & elect one verified Topper's Class Note for the batch archive.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between bg-[#eff4ff] px-3.5 py-1.5 rounded-lg border border-[#dde9ff]">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#465f88] text-[16px]">menu_book</span>
                  <span className="text-[12px] font-bold text-[#001428]">CSE-311: Database Management Systems</span>
                  <span className="bg-white text-[#465f88] font-mono text-[10px] px-1.5 py-0.2 rounded font-medium border border-[#dde9ff]">
                    Semester 7
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#465f88]">4 of 18 Lectures Verified</span>
              </div>

              {/* Lecture 01 Card */}
              <div className="p-3.5 rounded-lg bg-[#eff4ff] border border-[#dde9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[13px] font-bold text-[#001428]">Lecture 01: Introduction & Relational Model</span>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                      <span className="material-symbols-outlined text-[13px] text-amber-600">military_tech</span> Topper's Note Selected
                    </span>
                  </div>
                  <div className="text-[12px] text-[#465f88] flex items-center gap-2 mt-0.5">
                    <span>Author: <strong className="text-[#001428]">Tanvir Hasan</strong> (Batch Score: 98%)</span>
                    <span>•</span>
                    <span className="font-mono text-[11px]">PDF • 4.6 MB (Clean diagrams)</span>
                  </div>
                </div>
                <button
                  onClick={() => alert('Opening Tanvir Hasan Lecture 1 notes...')}
                  className="px-3 py-1 rounded bg-white hover:bg-[#dde9ff] text-[#001428] text-[11px] font-semibold border border-[#dde9ff] flex items-center gap-1 shrink-0"
                >
                  <span className="material-symbols-outlined text-[14px]">visibility</span> View Note
                </button>
              </div>

              {/* Lecture 03 Active Submissions Evaluation Box */}
              <div className="rounded-lg border-2 border-amber-300 bg-white p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#dde9ff]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-[18px]">rate_review</span>
                    <div>
                      <h4 className="text-[13px] font-bold text-[#001428]">Active Evaluation: Lecture 03 Submissions</h4>
                      <span className="text-[11px] text-[#465f88] font-mono">
                        Normalization (1NF to BCNF) — Enforces 1 Active Topper Note per Class
                      </span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Ready to Elect
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Candidate 1: Rahat Mahmud */}
                  <div className={`p-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                    selectedTopperId === 'rahatmahmud' ? 'bg-[#fffbeb] border-amber-400' : 'bg-[#eff4ff] border-[#dde9ff]'
                  }`}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#001428] text-[13px]">Rahat Mahmud</span>
                        <span className="font-mono text-[11px] text-[#465f88]">ID: 2102019</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                          Batch Top 5%
                        </span>
                      </div>
                      <div className="text-[12px] text-[#43474d] font-medium mt-0.5">
                        Normalization & Functional Dependencies Complete Guide (Handwritten + Typed Summary)
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleElectTopper('Rahat Mahmud', 'Normalization Complete Guide')}
                        className="bg-[#001428] hover:bg-[#0f2942] text-white px-3.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 transition-colors shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[14px] text-amber-400">military_tech</span>
                        <span>Select as Topper's Note</span>
                      </button>
                    </div>
                  </div>

                  {/* Candidate 2: Sarah Karim */}
                  <div className="p-3 rounded-lg bg-[#eff4ff] border border-[#dde9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#001428] text-[13px]">Sarah Karim</span>
                        <span className="font-mono text-[11px] text-[#465f88]">ID: 2102008</span>
                      </div>
                      <div className="text-[12px] text-[#43474d] font-medium mt-0.5">
                        Lecture 3 Illustrated Breakdown with De-normalization Tradeoffs
                      </div>
                    </div>
                    <button
                      onClick={() => handleElectTopper('Sarah Karim', 'De-normalization Tradeoffs')}
                      className="bg-white hover:bg-[#dde9ff] text-[#001428] px-3 py-1 rounded text-[11px] font-semibold border border-[#dde9ff]"
                    >
                      Select as Topper's Note
                    </button>
                  </div>

                  {/* Candidate 3: Abrar Fahim */}
                  <div className="p-3 rounded-lg bg-[#eff4ff] border border-[#dde9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#001428] text-[13px]">Abrar Fahim</span>
                        <span className="font-mono text-[11px] text-[#465f88]">ID: 2102033</span>
                      </div>
                      <div className="text-[12px] text-[#43474d] font-medium mt-0.5">
                        Concise Normalization Rules & Solved 2023 Exam Examples
                      </div>
                    </div>
                    <button
                      onClick={() => handleElectTopper('Abrar Fahim', 'Concise Normalization Rules')}
                      className="bg-white hover:bg-[#dde9ff] text-[#001428] px-3 py-1 rounded text-[11px] font-semibold border border-[#dde9ff]"
                    >
                      Select as Topper's Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section D: Pending Membership Requests */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#dde9ff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#001428] text-[20px]">how_to_reg</span>
                <h2 className="font-display text-[16px] text-[#001428] font-bold">Membership Verification Queue</h2>
                <span className="bg-[#ffdad6] text-[#ba1a1a] font-mono text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {pendingRequests.length} Pending
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-lg bg-[#eff4ff] border border-[#dde9ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-[14px] font-bold text-[#001428]">{req.name}</span>
                      <span className="text-[#465f88] font-mono text-[12px]">• ID: {req.studentId}</span>
                      {req.tag && (
                        <span className="bg-white text-[#001428] text-[10px] font-bold px-1.5 py-0.2 rounded uppercase border border-[#dde9ff]">
                          {req.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-[12px] text-[#465f88] mt-0.5">{req.program} • Requested {req.requestedAt}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onRejectMembership(req.id)}
                      className="bg-white hover:bg-[#dde9ff] text-[#43474d] px-3 py-1 rounded text-[12px] font-medium border border-[#c3c6ce]"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => onApproveMembership(req.id)}
                      className="bg-[#001428] hover:bg-[#0f2942] text-white px-3.5 py-1 rounded text-[12px] font-bold shadow-xs transition-colors"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
              {pendingRequests.length === 0 && (
                <div className="p-4 text-center text-[#465f88] text-[13px] bg-[#eff4ff] rounded-lg">
                  No pending membership requests in queue. All batch members verified.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Section D: CR Quick Actions */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-4.5 space-y-3">
            <div className="text-[11px] uppercase tracking-wider font-bold text-[#465f88]">
              CR Quick Actions
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsNewNoticeModalOpen(true)}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] text-[12px] border border-[#dde9ff] text-left font-medium"
              >
                <span className="material-symbols-outlined text-[18px] text-[#465f88]">campaign</span>
                <span>+ Post Notice</span>
              </button>

              <button
                onClick={() => setIsNewPollModalOpen(true)}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] text-[12px] border border-[#dde9ff] text-left font-medium"
              >
                <span className="material-symbols-outlined text-[18px] text-[#465f88]">how_to_vote</span>
                <span>+ Create Poll</span>
              </button>

              <button
                onClick={() => alert('Reviewing 54 enrolled members in Batch 12...')}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] text-[12px] border border-[#dde9ff] text-left font-medium"
              >
                <span className="material-symbols-outlined text-[18px] text-[#465f88]">verified_user</span>
                <span>Review Members</span>
              </button>

              <button
                onClick={() => {
                  const title = prompt('Enter Expense/Income Title:', 'Photocopy for Lecture Notes');
                  const amount = parseFloat(prompt('Enter amount (e.g. -45 or 120):', '-45') || '0');
                  if (title && amount) {
                    onAddTransaction(title, Math.abs(amount), amount < 0 ? 'outflow' : 'inflow');
                  }
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] text-[12px] border border-[#dde9ff] text-left font-medium"
              >
                <span className="material-symbols-outlined text-[18px] text-[#465f88]">add_card</span>
                <span>+ Add Transaction</span>
              </button>
            </div>
          </section>

          {/* Urgent Alerts */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-4.5 space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-[#dde9ff]">
              <div className="text-[11px] uppercase tracking-wider font-bold text-[#465f88]">Urgent Alerts</div>
              <span className="material-symbols-outlined text-[18px] text-amber-600">crisis_alert</span>
            </div>

            <div className="space-y-2 pt-1">
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-950">
                <div className="text-[12px] font-bold flex items-center gap-1 text-amber-900">
                  <span className="material-symbols-outlined text-[15px]">room_preferences</span> Room Change
                </div>
                <p className="text-[11px] text-amber-900 mt-0.5">CSE 311 moved to Room 301 for today's session.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-950">
                <div className="text-[12px] font-bold flex items-center gap-1 text-rose-900">
                  <span className="material-symbols-outlined text-[15px]">event_busy</span> Class Cancellation
                </div>
                <p className="text-[11px] text-rose-900 mt-0.5">CSE 315 cancelled for faculty senate meeting.</p>
              </div>

              <div className="p-2.5 rounded-lg bg-sky-50 border border-sky-200 text-sky-950">
                <div className="text-[12px] font-bold flex items-center gap-1 text-sky-900">
                  <span className="material-symbols-outlined text-[15px]">timer</span> Upcoming Deadline
                </div>
                <p className="text-[11px] text-sky-900 mt-0.5">Database Project Submission in 2 days (Wednesday 11:59 PM).</p>
              </div>
            </div>
          </section>

          {/* Section F: Active Democratic Poll */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-4.5 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#dde9ff]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#001428] text-[18px]">how_to_vote</span>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#465f88]">
                  Active Democratic Poll
                </span>
              </div>
              <span className="bg-[#eff4ff] font-mono text-[10px] font-bold text-[#001428] px-1.5 py-0.5 rounded border border-[#dde9ff]">
                POLL #{poll.pollNumber}
              </span>
            </div>

            <h3 className="text-[13px] font-bold text-[#001428] leading-snug">{poll.title}</h3>

            <div className="space-y-2 pt-1">
              {poll.options.map((opt) => {
                const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
                const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
                return (
                  <div key={opt.id} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#001428]">
                      <span className="font-semibold flex items-center gap-1">
                        {opt.text}
                        {opt.isLeading && (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1 rounded">
                            LEADING
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-[#465f88]">
                        {opt.votes} votes ({percent}%)
                      </span>
                    </div>
                    <div className="w-full bg-[#dde9ff] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#001428] h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-1 flex items-center justify-between font-mono text-[11px] text-[#465f88]">
              <span>⏱ {poll.expiresIn}</span>
              <span>47/54 Enrolled Voted</span>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => onVotePoll(poll.options[0].id)}
                className="flex-1 bg-[#001428] hover:bg-[#0f2942] text-white py-1.5 rounded text-[12px] font-bold transition-colors shadow-xs"
              >
                Cast Vote
              </button>
              <button
                onClick={onClosePoll}
                className="bg-[#eff4ff] hover:bg-[#dde9ff] text-[#ba1a1a] py-1.5 px-3 rounded text-[11px] font-semibold transition-colors border border-[#dde9ff]"
              >
                Close Poll
              </button>
            </div>
          </section>

          {/* Section G: Batch Fund Summary */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-4.5 space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-[#dde9ff]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#001428] text-[18px]">payments</span>
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#465f88]">
                  Batch Fund Summary
                </span>
              </div>
              <span className="text-[#465f88] text-[11px] font-medium">Semester 7</span>
            </div>

            <div className="bg-[#eff4ff] p-3 rounded-lg border border-[#dde9ff]">
              <div className="text-[10px] uppercase font-bold text-[#465f88]">Current Treasury</div>
              <div className="text-[24px] font-mono font-bold text-[#001428] leading-tight mt-0.5">
                ${fundBalance.toFixed(2)}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-[#dde9ff] font-mono text-[11px]">
                <div>
                  <span className="text-[#465f88] text-[10px] block uppercase">Inflow</span>
                  <span className="text-[#001428] font-bold">+$960.00</span>
                  <span className="text-[9px] text-[#74777e] block">Semester dues</span>
                </div>
                <div>
                  <span className="text-[#465f88] text-[10px] block uppercase">Outflow</span>
                  <span className="text-[#ba1a1a] font-bold">-$220.00</span>
                  <span className="text-[9px] text-[#74777e] block">Lab project kits</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const title = prompt('Enter Transaction Description:', 'Lab component breadboards');
                const amt = parseFloat(prompt('Enter amount (e.g. -50 for expense, 100 for deposit):', '-50') || '0');
                if (title && amt) {
                  onAddTransaction(title, Math.abs(amt), amt < 0 ? 'outflow' : 'inflow');
                }
              }}
              className="w-full bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] py-1.5 rounded-lg text-[12px] font-semibold border border-[#dde9ff] flex items-center justify-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">add_circle</span>
              <span>+ Record Expense/Income</span>
            </button>
          </section>

          {/* Section H: Telegram Status */}
          <section className="bg-white rounded-xl border border-[#dde9ff] shadow-xs p-4 space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[15px]">send</span>
              </div>
              <div>
                <div className="text-[12px] font-bold text-[#001428]">
                  Telegram Channel: <span className="font-mono font-normal text-[#465f88]">@cse12_batchsync</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Connected & Synced (9:15 AM)
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#dde9ff]">
              <button
                onClick={() => alert('Configuring Telegram Webhook token for CSE-12...')}
                className="flex-1 bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] py-1 rounded text-[11px] font-semibold border border-[#dde9ff]"
              >
                Telegram Settings
              </button>
              <button
                onClick={() => {
                  setTopperElectMessage('Telegram broadcast forced: @cse12_batchsync alerted.');
                  setTimeout(() => setTopperElectMessage(null), 3000);
                }}
                className="flex-1 bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] py-1 rounded text-[11px] font-semibold border border-[#dde9ff]"
              >
                Broadcast Update
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* New Notice Modal */}
      {isNewNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#dde9ff] overflow-hidden">
            <div className="p-5 bg-[#001428] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">campaign</span>
                <h3 className="font-display text-[16px] font-bold">Post Batch Notice</h3>
              </div>
              <button onClick={() => setIsNewNoticeModalOpen(false)} className="text-[#b0c9e8] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <form onSubmit={handleCreateNotice} className="p-6 space-y-4 text-[13px]">
              <div>
                <label className="text-[12px] font-bold text-[#001428] block mb-1">Notice Headline</label>
                <input
                  type="text"
                  required
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  placeholder="e.g. Makeup Class Schedule for Database Systems"
                  className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] px-3 py-2 rounded-lg focus:outline-none focus:border-[#465f88]"
                />
              </div>
              <div>
                <label className="text-[12px] font-bold text-[#001428] block mb-1">Detailed Message</label>
                <textarea
                  rows={4}
                  required
                  value={newNoticeBody}
                  onChange={(e) => setNewNoticeBody(e.target.value)}
                  placeholder="Include room numbers, prerequisites, and timing..."
                  className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] px-3 py-2 rounded-lg focus:outline-none focus:border-[#465f88]"
                ></textarea>
              </div>
              <div className="p-3 rounded bg-[#eff4ff] border border-[#dde9ff] flex items-center gap-2 text-[12px] text-[#465f88]">
                <input type="checkbox" id="syncTg" defaultChecked />
                <label htmlFor="syncTg">Automatically push notice to @cse12_batchsync Telegram bot channel</label>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewNoticeModalOpen(false)}
                  className="px-4 py-2 bg-white text-[#465f88] rounded-lg border border-[#c3c6ce]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#001428] text-white hover:bg-[#0f2942] rounded-lg font-bold shadow-xs"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Poll Modal */}
      {isNewPollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#dde9ff] overflow-hidden">
            <div className="p-5 bg-[#001428] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">how_to_vote</span>
                <h3 className="font-display text-[16px] font-bold">Create Democratic Batch Poll</h3>
              </div>
              <button onClick={() => setIsNewPollModalOpen(false)} className="text-[#b0c9e8] hover:text-white">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-5 space-y-4 text-[13px]">
              <div>
                <label className="text-[12px] font-bold text-[#001428] block mb-1">Poll Question</label>
                <input
                  type="text"
                  value={newPollQuestion}
                  onChange={(e) => setNewPollQuestion(e.target.value)}
                  placeholder="e.g. Reschedule Lab 4 to Saturday 10:00 AM?"
                  className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] px-3 py-2 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[12px] font-bold text-[#001428] block">Default Ballot Options</label>
                <div className="p-2.5 rounded bg-[#eff4ff] text-[12px]">Option A: Agree / Recommended Slot</div>
                <div className="p-2.5 rounded bg-[#eff4ff] text-[12px]">Option B: Alternate Timing</div>
                <div className="p-2.5 rounded bg-[#eff4ff] text-[12px]">Option C: Disagree</div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsNewPollModalOpen(false)}
                  className="px-4 py-2 bg-white text-[#465f88] rounded-lg border border-[#c3c6ce]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const title = newPollQuestion.trim() || 'Makeup Class Reschedule Poll';
                    if (onCreatePoll) {
                      onCreatePoll({
                        title,
                        course: 'CSE 312 Sessional',
                        options: ['Friday 10:00 AM', 'Saturday 02:00 PM', 'Disagree / Alternate'],
                      });
                    }
                    setIsNewPollModalOpen(false);
                    setTopperElectMessage(`Democratic Poll "${title}" launched and synchronized!`);
                    setNewPollQuestion('');
                    setTimeout(() => setTopperElectMessage(null), 3500);
                  }}
                  className="px-4 py-2 bg-[#001428] text-white rounded-lg font-bold"
                >
                  Launch Ballot
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
