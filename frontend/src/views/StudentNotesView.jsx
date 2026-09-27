import React, { useState } from 'react';

export const StudentNotesView = ({
  topperNotes,
  privateNotes,
  onAddPrivateNote,
  onSubmitToCr,
  onWithdrawSubmission,
}) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [courseFilter, setCourseFilter] = useState('CSE-311');
  const [isComposeDrawerOpen, setIsComposeDrawerOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // New Note Form States
  const [noteCourse, setNoteCourse] = useState('CSE-311');
  const [noteLecture, setNoteLecture] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [nominateTopper, setNominateTopper] = useState(false);

  const handleSaveDraft = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    const newNote = {
      id: `pnote-${Date.now()}`,
      lectureNumber: 6,
      courseCode: noteCourse,
      courseName: 'Database Management Systems',
      title: noteTitle,
      summary: noteContent.slice(0, 150) || 'Comprehensive lecture notes compiled for review.',
      authorName: 'Tanvir Hasan',
      authorId: '2102019',
      date: 'Just now',
      isToppersNote: false,
      status: nominateTopper ? 'pending_cr_review' : 'private_draft',
      readTime: '8 min read',
      fileSize: '2.4 MB',
      fileType: 'PDF',
      abstract: noteContent || 'Synthesized lecture analysis.',
      sections: [
        {
          title: '01. Conceptual Overview',
          content: noteContent || 'Key principles and theorem breakdowns recorded during instructor lecture.',
        },
      ],
    };

    onAddPrivateNote(newNote);
    setIsComposeDrawerOpen(false);
    setNoteLecture('');
    setNoteTitle('');
    setNoteContent('');
    setNominateTopper(false);
    setNotification(
      nominateTopper
        ? 'Note saved and queued for CR Tanvir Ahmed\'s Topper Review!'
        : 'Note successfully saved to your Private Personal Repository.'
    );
    setTimeout(() => setNotification(null), 3500);
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-[#001428] text-white shadow-2xl border border-[#dde9ff]/30">
          <span className="material-symbols-outlined text-emerald-400 text-[22px]">verified</span>
          <span className="text-[13px]">{notification}</span>
        </div>
      )}

      {/* Top Context Ribbon & Persona Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#eff4ff] p-5 rounded-xl shadow-xs border border-[#dde9ff]">
        <div className="flex items-center gap-4 min-w-0">
          <div className="relative shrink-0">
            <div className="w-13 h-13 rounded-xl bg-[#0f2942] text-white flex items-center justify-center font-display text-2xl font-bold shadow-md">
              TH
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#465f88] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#465f88]"></span>
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-xl sm:text-2xl text-[#001428] font-bold tracking-tight truncate">
                Welcome back, Tanvir Hasan
              </h1>
              <span className="bg-[#dde9ff] text-[#001428] font-mono text-[11px] px-2 py-0.5 rounded font-bold uppercase">
                B.Sc in CSE • 7th Sem
              </span>
              <span className="bg-white text-[#465f88] font-mono text-[11px] px-2 py-0.5 rounded border border-[#dde9ff]">
                ID: 2102019
              </span>
            </div>
            <p className="text-[12px] text-[#465f88] mt-1 flex items-center gap-1.5 flex-wrap">
              <span className="material-symbols-outlined text-[15px] text-[#465f88]">verified_user</span>
              <span>Class Section: CSE Batch 12 • Fall 2025 Regular Cohort • Synergized with Node-04 Central</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap self-start lg:self-auto">
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#dde9ff] text-[12px] text-[#0d1c2f] font-medium">
            <span className="material-symbols-outlined text-[16px] text-[#465f88]">auto_stories</span>
            <span>Curriculum: OBE-2024</span>
          </div>
          <button
            onClick={() => setIsComposeDrawerOpen(true)}
            className="bg-[#001428] hover:bg-[#0f2942] text-white text-[12px] font-bold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Draft New Note</span>
          </button>
        </div>
      </div>

      {/* 4 Top Enterprise Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">Today's Routine</span>
              <span className="bg-[#eff4ff] text-[#001428] font-mono text-[10px] px-1.5 py-0.2 rounded font-bold">
                3 Classes
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-[#001428]">3 Scheduled</div>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#ba1a1a] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
            <span>Next: CSE-311 (DBMS) in 20m • Room 301</span>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">My Private Notes</span>
              <span className="bg-[#dde9ff] text-[#001428] text-[10px] px-1.5 py-0.2 rounded font-bold">
                Personal Repo
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-[#001428]">{privateNotes.length} Saved</div>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#43474d]">
            <span>1 Draft • 1 In Review</span>
            <span className="text-[#001428] font-bold">1 Selected Topper</span>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-amber-600">military_tech</span>
                Batch Vault
              </span>
              <span className="bg-[#eff4ff] text-[#465f88] font-mono text-[10px] px-1.5 py-0.2 rounded font-bold">
                Batch 12
              </span>
            </div>
            <div className="font-display text-2xl font-bold text-[#001428]">{topperNotes.length} Published</div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-[#43474d]">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified</span>
            <span>Peer-reviewed by CR Tanvir Ahmed</span>
          </div>
        </div>

        <div className="bg-white p-4.5 rounded-xl shadow-xs border border-[#dde9ff] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">Attendance Health</span>
              <span className="bg-[#eff4ff] text-[#001428] font-mono text-[10px] px-1.5 py-0.2 rounded font-bold">
                Req: 75%
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold text-[#001428]">94.8%</span>
              <span className="text-[11px] text-emerald-700 font-bold">Safe Margin</span>
            </div>
          </div>
          <div className="mt-3 w-full bg-[#dde9ff] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#001428] h-1.5 rounded-full" style={{ width: '94.8%' }}></div>
          </div>
        </div>
      </div>

      {/* Split Workspace Layout: 7 cols Topper's Vault / 5 cols My Private Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL (7 cols): Batch Topper's Class Notes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-[#dde9ff] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#dde9ff]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-amber-600 text-[22px]">workspace_premium</span>
                  <h2 className="font-display text-[16px] text-[#001428] font-bold">Topper's Class Notes</h2>
                  <span className="bg-[#eff4ff] text-[#465f88] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#dde9ff]">
                    Batch Vault
                  </span>
                </div>
                <p className="text-[12px] text-[#465f88] mt-0.5">
                  CR-endorsed lecture artifacts, peer synthesis, and algorithmic solution blueprints.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-[#eff4ff] p-1 rounded-lg border border-[#dde9ff]">
                <span className="text-[10px] text-[#465f88] font-bold px-1 uppercase">Filter:</span>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="bg-white text-[#0d1c2f] text-[11px] font-bold px-2 py-1 rounded outline-none border border-[#c3c6ce]"
                >
                  <option value="CSE-311">CSE-311: Database Systems</option>
                  <option value="CSE-312">CSE-312: DBMS Sessional</option>
                  <option value="CSE-315">CSE-315: Theory of Computing</option>
                </select>
              </div>
            </div>

            <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between flex-wrap gap-2 mt-3 border border-[#dde9ff]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#dde9ff] flex items-center justify-center text-[#001428]">
                  <span className="material-symbols-outlined text-[18px]">database</span>
                </div>
                <div>
                  <div className="text-[12px] text-[#001428] font-bold">CSE-311: Database Management Systems</div>
                  <div className="text-[11px] text-[#465f88]">Instructor: Prof. Dr. M. Rahman • 4 of 18 Lectures Published</div>
                </div>
              </div>
              <span className="font-mono text-[10px] bg-white text-[#465f88] px-2 py-0.5 rounded border border-[#dde9ff] font-bold">
                SYNC: REVISION WEEK 8
              </span>
            </div>
          </div>

          {/* Artifact Cards */}
          <div className="space-y-4">
            {topperNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-xl p-5 border border-[#dde9ff] shadow-xs hover:shadow-md transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-amber-500"></div>

                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="bg-[#eff4ff] text-[#001428] text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold border border-[#dde9ff]">
                    <span className="material-symbols-outlined text-[13px] text-amber-600">workspace_premium</span>
                    Topper's Class Note
                  </span>
                  <span className="font-mono text-[11px] bg-[#eff4ff] text-[#465f88] px-1.5 py-0.5 rounded font-bold">
                    Lecture {note.lectureNumber < 10 ? `0${note.lectureNumber}` : note.lectureNumber}
                  </span>
                  <span className="text-[11px] text-[#74777e]">{note.date}</span>
                </div>

                <h3
                  onClick={() => setSelectedNote(note)}
                  className="font-display text-[15px] text-[#001428] font-bold hover:text-[#465f88] cursor-pointer transition-colors leading-snug"
                >
                  {note.title}
                </h3>

                <p className="text-[12px] text-[#43474d] mt-1.5 leading-relaxed line-clamp-2">
                  {note.summary}
                </p>

                <div className="mt-3 flex items-center gap-4 flex-wrap text-[12px] text-[#465f88]">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#465f88]">person_check</span>
                    <span>Author: <strong className="text-[#001428]">{note.authorName}</strong> ({note.authorId})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px] text-[#465f88]">how_to_reg</span>
                    <span>Selected by CR Tanvir Ahmed</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#dde9ff] flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-[#74777e] font-mono text-[11px]">
                    <span className="material-symbols-outlined text-[15px]">schedule</span>
                    <span>{note.readTime}</span>
                    <span>•</span>
                    <span>{note.fileType} • {note.fileSize}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedNote(note)}
                      className="bg-[#001428] hover:bg-[#0f2942] text-white text-[12px] font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">visibility</span>
                      <span>Read Note</span>
                    </button>
                    <button
                      onClick={() => {
                        setNotification(`Generating verified digital PDF archive for ${note.title}...`);
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] text-[12px] font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 border border-[#dde9ff] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[15px]">download</span>
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL (5 cols): My Notes Repository */}
        <div className="lg:col-span-5 space-y-4">
          {/* Privacy Callout */}
          <div className="bg-white p-5 rounded-xl border border-[#dde9ff] shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#eff4ff] border border-[#dde9ff] flex items-center justify-center shrink-0 text-[#001428]">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="font-display text-[15px] font-bold text-[#001428]">My Notes Repository</h2>
                  <span className="bg-[#eff4ff] text-[#465f88] text-[10px] font-bold px-1.5 py-0.2 rounded border border-[#dde9ff]">
                    Personal & Private
                  </span>
                </div>
                <p className="text-[12px] text-[#43474d] mt-1 leading-relaxed">
                  <strong>Private by Default:</strong> Your personal lecture notes remain strictly visible to you alone. Electing to submit a note sends it to your Class Representative (CR) for peer evaluation and possible inclusion in the Batch Topper's Vault.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dde9ff] flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#465f88]">
                {privateNotes.length} Active Files Staged
              </span>
              <button
                onClick={() => setIsComposeDrawerOpen(true)}
                className="bg-[#001428] hover:bg-[#0f2942] text-white text-[12px] font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">post_add</span>
                <span>+ Create New Note</span>
              </button>
            </div>
          </div>

          {/* Private Notes Cards Stack */}
          <div className="space-y-3">
            {privateNotes.map((pnote) => (
              <div
                key={pnote.id}
                className="bg-white p-4.5 rounded-xl border border-[#dde9ff] shadow-xs space-y-2"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-mono text-[11px] bg-[#eff4ff] text-[#465f88] px-1.5 py-0.5 rounded font-bold border border-[#dde9ff]">
                    {pnote.courseCode} • Lecture 0{pnote.lectureNumber}
                  </span>

                  {pnote.status === 'topper_selected' && (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-amber-600">workspace_premium</span>
                      Selected as Topper's Note
                    </span>
                  )}

                  {pnote.status === 'pending_cr_review' && (
                    <span className="bg-[#eff4ff] text-[#0f2942] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#dde9ff] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#465f88]">hourglass_top</span>
                      Pending CR Review
                    </span>
                  )}

                  {pnote.status === 'private_draft' && (
                    <span className="bg-[#eff4ff] text-[#43474d] text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#dde9ff]">
                      Draft (Private to you)
                    </span>
                  )}
                </div>

                <h4 className="font-display text-[14px] font-bold text-[#001428] leading-snug">
                  {pnote.title}
                </h4>

                <p className="text-[12px] text-[#43474d] leading-relaxed line-clamp-2">
                  {pnote.summary}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#dde9ff] flex items-center justify-between flex-wrap gap-2 text-[11px]">
                  <span className="font-mono text-[#74777e]">{pnote.date}</span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedNote(pnote)}
                      className="px-2.5 py-1 bg-[#eff4ff] hover:bg-[#dde9ff] text-[#001428] rounded font-semibold border border-[#dde9ff]"
                    >
                      View Note
                    </button>

                    {pnote.status === 'private_draft' && (
                      <button
                        onClick={() => onSubmitToCr(pnote.id)}
                        className="px-3 py-1 bg-[#001428] hover:bg-[#0f2942] text-white rounded font-bold shadow-xs flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[13px]">send</span>
                        <span>Submit to CR</span>
                      </button>
                    )}

                    {pnote.status === 'pending_cr_review' && (
                      <button
                        onClick={() => onWithdrawSubmission(pnote.id)}
                        className="px-2.5 py-1 bg-white hover:bg-[#ffdad6]/40 text-[#ba1a1a] rounded font-semibold border border-[#ffdad6]"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Democratic note election explanation */}
          <div className="bg-[#eff4ff] p-4 rounded-xl border border-[#dde9ff] flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#465f88] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">how_to_vote</span>
            </div>
            <div className="text-[12px]">
              <div className="font-bold text-[#001428]">Democratic Note Election System</div>
              <p className="text-[#43474d] mt-0.5">
                Batch 12 Class Representative reviews weekly submissions. Highly rated notes are endorsed to the public Batch Vault.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= RICH LECTURE PREVIEW MODAL ================= */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001428]/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#dde9ff]">
            {/* Modal Header */}
            <div className="bg-[#eff4ff] px-6 py-4 flex items-center justify-between border-b border-[#dde9ff]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#dde9ff] text-amber-700 flex items-center justify-center shrink-0 shadow-xs">
                  <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#001428] text-white font-mono text-[10px] px-2 py-0.5 rounded font-bold">
                      {selectedNote.courseCode}
                    </span>
                    <span className="text-[11px] text-[#465f88] font-bold">
                      Official Batch 12 Peer Study Note
                    </span>
                    <span className="bg-white font-mono text-[#74777e] text-[10px] px-1.5 py-0.2 rounded border border-[#dde9ff]">
                      Verified #B12-N311-0{selectedNote.lectureNumber}
                    </span>
                  </div>
                  <h2 className="font-display text-[17px] font-bold text-[#001428] truncate mt-0.5">
                    Lecture {selectedNote.lectureNumber < 10 ? `0${selectedNote.lectureNumber}` : selectedNote.lectureNumber}: {selectedNote.title}
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="w-8 h-8 rounded-lg bg-white hover:bg-[#dde9ff] text-[#465f88] border border-[#dde9ff] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Metadata Strip */}
            <div className="bg-white px-6 py-2.5 border-b border-[#dde9ff] flex items-center justify-between flex-wrap gap-2 text-[12px] text-[#43474d]">
              <div className="flex items-center gap-4 flex-wrap">
                <div>Author: <strong className="text-[#001428]">{selectedNote.authorName}</strong> ({selectedNote.authorId})</div>
                <div>Verified By: <strong className="text-[#001428]">CR Tanvir Ahmed</strong></div>
                <div className="font-mono">Published: {selectedNote.date}</div>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Registrar Audit Clear</span>
              </div>
            </div>

            {/* Note Body (Scrollable Rich Academic Canvas) */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white text-[13px] leading-relaxed">
              {/* Abstract Callout */}
              <div className="p-4 rounded-xl bg-[#eff4ff] border border-[#dde9ff]">
                <h4 className="font-display text-[14px] font-bold text-[#001428] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#465f88] text-[18px]">auto_stories</span>
                  <span>Lecture Abstract & Objective</span>
                </h4>
                <p className="text-[#0d1c2f] leading-relaxed">{selectedNote.abstract}</p>
              </div>

              {/* Section 1 */}
              <section className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[#465f88] font-bold">01.</span>
                  <h3 className="font-display text-[15px] font-bold text-[#001428]">
                    Functional Dependencies & Attribute Closure
                  </h3>
                </div>
                <p className="text-[#43474d]">
                  Given relation <code className="bg-[#eff4ff] px-1.5 py-0.5 rounded font-mono text-[#001428]">R(A, B, C, D, E)</code> with FD set{' '}
                  <code className="bg-[#eff4ff] px-1.5 py-0.5 rounded font-mono text-[#001428]">F = &#123; A → BC, CD → E, B → D, E → A &#125;</code>.
                </p>
                <div className="p-4 rounded-xl bg-[#001428] font-mono text-[12px] text-[#dde9ff] space-y-1">
                  <div className="text-emerald-400 font-semibold">// Computing Attribute Closure (B)+</div>
                  <div>Step 0: Closure = &#123; B &#125;</div>
                  <div>Step 1: Using B → D ⇒ Closure = &#123; B, D &#125;</div>
                  <div>Step 2: No more FDs can be applied.</div>
                  <div className="text-[#ffdad6] font-medium">// Result: (B)+ = &#123; B, D &#125; ≠ All attributes. Hence B is not a candidate key.</div>
                </div>
              </section>

              {/* Section 2 */}
              <section className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[#465f88] font-bold">02.</span>
                  <h3 className="font-display text-[15px] font-bold text-[#001428]">
                    Normal Forms Classification Hierarchy
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#dde9ff]">
                    <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">
                      1NF
                    </span>
                    <p className="text-[12px] text-[#0d1c2f] mt-1">
                      All attribute domains are atomic. No repeating groups or nested relations allowed.
                    </p>
                  </div>
                  <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#dde9ff]">
                    <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">
                      2NF
                    </span>
                    <p className="text-[12px] text-[#0d1c2f] mt-1">
                      In 1NF and no non-prime attribute is partially dependent on any candidate key.
                    </p>
                  </div>
                  <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#dde9ff]">
                    <span className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold">
                      3NF
                    </span>
                    <p className="text-[12px] text-[#0d1c2f] mt-1">
                      In 2NF and for every X → Y, either X is a superkey or Y is a prime attribute.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#dde9ff]/50 border border-[#b6d0ff] flex items-start gap-3 mt-3">
                  <span className="material-symbols-outlined text-[#001428] text-[22px]">verified</span>
                  <div>
                    <div className="font-display text-[14px] font-bold text-[#001428]">
                      Decomposition Theorem (Lossless Join)
                    </div>
                    <p className="text-[12px] text-[#0d1c2f] mt-1">
                      Decomposition of R into R1 and R2 is lossless if and only if:{' '}
                      <code className="font-mono font-bold text-[#001428] bg-white px-1 py-0.5 rounded border border-[#dde9ff]">
                        (R1 ∩ R2) → R1
                      </code>{' '}
                      OR{' '}
                      <code className="font-mono font-bold text-[#001428] bg-white px-1 py-0.5 rounded border border-[#dde9ff]">
                        (R1 ∩ R2) → R2
                      </code>{' '}
                      is in F⁺.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[#465f88] font-bold">03.</span>
                  <h3 className="font-display text-[15px] font-bold text-[#001428]">
                    Structured Practice Problems
                  </h3>
                </div>
                <p className="text-[#43474d]">
                  Practice questions compiled directly from previous 5-year Semester Finals with Dr. Rahman's suggested grading criteria.
                </p>
                <div className="p-3 bg-[#eff4ff] rounded-lg flex items-center justify-between border border-[#dde9ff]">
                  <span className="text-[12px] font-semibold text-[#001428]">
                    Download full vector blackboard notes (PDF high-res)
                  </span>
                  <button
                    onClick={() => {
                      setNotification(`Downloading PDF: Lecture-03-Normalization-${selectedNote.authorName}.pdf`);
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="bg-[#001428] hover:bg-[#0f2942] text-white text-[11px] font-bold px-3 py-1 rounded"
                  >
                    Download 4.8 MB
                  </button>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#eff4ff] px-6 py-3 border-t border-[#dde9ff] flex items-center justify-between flex-wrap gap-2 text-[12px]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setNotification('Note saved to your Offline Revision Shelf!');
                    setTimeout(() => setNotification(null), 2500);
                  }}
                  className="flex items-center gap-1 text-[#465f88] hover:text-[#001428] font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">bookmark_add</span>
                  <span>Save to Study Shelf</span>
                </button>
                <button
                  onClick={() => {
                    setNotification('Direct peer link copied: https://batchsync.edu/vault/cse311/l03');
                    setTimeout(() => setNotification(null), 2500);
                  }}
                  className="flex items-center gap-1 text-[#465f88] hover:text-[#001428] font-semibold"
                >
                  <span className="material-symbols-outlined text-[16px]">share</span>
                  <span>Share with Peer</span>
                </button>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="bg-[#001428] text-white text-[12px] font-bold px-5 py-1.5 rounded-lg hover:bg-[#0f2942]"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= DRAFT NEW NOTE DRAWER ================= */}
      {isComposeDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#001428]/40 backdrop-blur-xs">
          <div className="w-full max-w-xl h-full bg-white shadow-2xl flex flex-col border-l border-[#dde9ff]">
            {/* Header */}
            <div className="bg-[#001428] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[20px] text-[#aec7f7]">note_add</span>
                <h3 className="font-display text-[16px] font-bold">Compose Private Note</h3>
              </div>
              <button
                onClick={() => setIsComposeDrawerOpen(false)}
                className="text-[#b0c9e8] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveDraft} className="flex-1 overflow-y-auto p-6 space-y-4 text-[13px]">
              <div>
                <label className="block text-[12px] font-bold text-[#001428] mb-1">
                  Associated Academic Course
                </label>
                <select
                  value={noteCourse}
                  onChange={(e) => setNoteCourse(e.target.value)}
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-[13px] p-2.5 rounded-lg border border-[#dde9ff] outline-none"
                >
                  <option value="CSE-311">CSE-311: Database Management Systems</option>
                  <option value="CSE-312">CSE-312: DBMS Sessional Lab</option>
                  <option value="CSE-315">CSE-315: Theory of Computing</option>
                  <option value="CSE-317">CSE-317: Artificial Intelligence</option>
                </select>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#001428] mb-1">
                  Lecture / Lab Identifier
                </label>
                <input
                  type="text"
                  value={noteLecture}
                  onChange={(e) => setNoteLecture(e.target.value)}
                  placeholder="e.g. Lecture 04: B-Trees and Multi-level Indexing"
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-[13px] p-2.5 rounded-lg border border-[#dde9ff] outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#001428] mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder="e.g. Detailed proofs and canonical reduction patterns"
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-[13px] p-2.5 rounded-lg border border-[#dde9ff] outline-none"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#001428] mb-1">
                  Note Content & Formulas (Markdown Supported)
                </label>
                <textarea
                  rows={8}
                  required
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Formulate academic synthesis, closure proofs, algorithm steps..."
                  className="w-full bg-[#eff4ff] text-[#0d1c2f] text-[13px] p-2.5 rounded-lg border border-[#dde9ff] outline-none resize-none font-mono"
                ></textarea>
              </div>

              <div className="p-3 rounded-lg bg-[#eff4ff] border border-[#dde9ff] flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="immediateSubmit"
                  checked={nominateTopper}
                  onChange={(e) => setNominateTopper(e.target.checked)}
                  className="mt-0.5"
                />
                <label htmlFor="immediateSubmit" className="text-[12px] text-[#43474d]">
                  <strong>Nominate for Topper's Note:</strong> Immediately dispatch this draft to Batch 12 Class Representative (CR Tanvir Ahmed) for peer review and Batch Vault election upon saving.
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-[#dde9ff] mt-auto">
                <button
                  type="button"
                  onClick={() => setIsComposeDrawerOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-[#c3c6ce] text-[#465f88] hover:bg-[#eff4ff]"
                >
                  Discard Draft
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#001428] text-white hover:bg-[#0f2942] font-bold shadow-xs"
                >
                  Save to My Notes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
