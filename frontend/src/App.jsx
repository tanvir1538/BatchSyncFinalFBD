/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  INITIAL_FACULTIES,
  INITIAL_SCHEDULE,
  INITIAL_PENDING_CLEARANCES,
  INITIAL_MEMBERSHIP_REQUESTS,
  INITIAL_TOPPER_NOTES,
  INITIAL_PRIVATE_NOTES,
  INITIAL_POLL,
  INITIAL_FUND_TRANSACTIONS,
} from './data/mockData.js';
import { api } from './services/api.js';
import { Navbar } from './components/Navbar.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { LandingView } from './views/LandingView.jsx';
import { AdminDashboardView } from './views/AdminDashboardView.jsx';
import { AdminFacultiesView } from './views/AdminFacultiesView.jsx';
import { DeanPortalView } from './views/DeanPortalView.jsx';
import { TeacherCentralView } from './views/TeacherCentralView.jsx';
import { CrHubView } from './views/CrHubView.jsx';
import { StudentNotesView } from './views/StudentNotesView.jsx';

export default function App() {
  const [currentRole, setCurrentRole] = useState('admin-dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAddFacultyOpen, setIsAddFacultyOpen] = useState(false);

  // Global shared dynamic states
  const [faculties, setFaculties] = useState(INITIAL_FACULTIES);
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [pendingClearances, setPendingClearances] = useState(INITIAL_PENDING_CLEARANCES);
  const [membershipRequests, setMembershipRequests] = useState(INITIAL_MEMBERSHIP_REQUESTS);
  const [topperNotes, setTopperNotes] = useState(INITIAL_TOPPER_NOTES);
  const [privateNotes, setPrivateNotes] = useState(INITIAL_PRIVATE_NOTES);
  const [poll, setPoll] = useState(INITIAL_POLL);
  const [fundBalance, setFundBalance] = useState(1420.00);
  const [fundTransactions, setFundTransactions] = useState(INITIAL_FUND_TRANSACTIONS);
  const [isSyncing, setIsSyncing] = useState(false);

  // Hydrate all data from backend API
  const refreshAllData = useCallback(async () => {
    setIsSyncing(true);
    try {
      const [
        facultiesData,
        schedulesData,
        clearancesData,
        membershipsData,
        topperNotesData,
        privateNotesData,
        pollData,
        fundsData,
      ] = await Promise.allSettled([
        api.getFaculties(),
        api.getSchedules(),
        api.getClearances(),
        api.getMemberships(),
        api.getNotes({ isToppersNote: true }),
        api.getNotes(),
        api.getActivePoll(),
        api.getFundsSummary(),
      ]);

      if (facultiesData.status === 'fulfilled' && facultiesData.value?.length) {
        setFaculties(facultiesData.value);
      }
      if (schedulesData.status === 'fulfilled' && schedulesData.value?.length) {
        setSchedule(schedulesData.value);
      }
      if (clearancesData.status === 'fulfilled' && clearancesData.value) {
        setPendingClearances(clearancesData.value);
      }
      if (membershipsData.status === 'fulfilled' && membershipsData.value) {
        setMembershipRequests(membershipsData.value);
      }
      if (topperNotesData.status === 'fulfilled' && topperNotesData.value?.length) {
        setTopperNotes(topperNotesData.value);
      }
      if (privateNotesData.status === 'fulfilled' && privateNotesData.value?.length) {
        setPrivateNotes(privateNotesData.value.filter((n) => !n.isToppersNote));
      }
      if (pollData.status === 'fulfilled' && pollData.value) {
        setPoll(pollData.value);
      }
      if (fundsData.status === 'fulfilled' && fundsData.value) {
        setFundBalance(fundsData.value.balance);
        setFundTransactions(fundsData.value.transactions);
      }
    } catch (err) {
      console.warn('[BatchSync] Failed to sync with backend API:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Faculty Handlers (Optimistic + API)
  const handleAddFaculty = async (newFaculty) => {
    setFaculties((prev) => [newFaculty, ...prev]);
    try {
      const created = await api.createFaculty(newFaculty);
      if (created?.id) {
        setFaculties((prev) => prev.map((f) => (f.id === newFaculty.id ? created : f)));
      }
    } catch (e) {
      console.warn('API error creating faculty:', e);
    }
  };

  const handleUpdateFaculty = async (updatedFaculty) => {
    setFaculties((prev) => prev.map((f) => (f.id === updatedFaculty.id ? updatedFaculty : f)));
    try {
      await api.updateFaculty(updatedFaculty.id, updatedFaculty);
    } catch (e) {
      console.warn('API error updating faculty:', e);
    }
  };

  // Membership handlers
  const handleApproveMembership = async (id) => {
    setMembershipRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r))
    );
    try {
      await api.approveMembership(id);
    } catch (e) {
      console.warn('API error approving membership:', e);
    }
  };

  const handleRejectMembership = async (id) => {
    setMembershipRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r))
    );
    try {
      await api.rejectMembership(id);
    } catch (e) {
      console.warn('API error rejecting membership:', e);
    }
  };

  // Poll handlers
  const handleVotePoll = async (optionId) => {
    if (poll.isClosed) return;
    const updatedOptions = poll.options.map((opt) =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
    );
    const maxVotes = Math.max(...updatedOptions.map((o) => o.votes));
    const leadingOptions = updatedOptions.map((opt) => ({
      ...opt,
      isLeading: opt.votes === maxVotes,
    }));
    setPoll({
      ...poll,
      options: leadingOptions,
      userVotedId: optionId,
    });

    try {
      const updated = await api.votePoll(poll.id, optionId);
      if (updated) setPoll(updated);
    } catch (e) {
      console.warn('API error voting poll:', e);
    }
  };

  const handleClosePoll = async () => {
    setPoll((prev) => ({
      ...prev,
      isClosed: true,
      expiresIn: 'Ended by CR',
    }));
    try {
      await api.closePoll(poll.id);
    } catch (e) {
      console.warn('API error closing poll:', e);
    }
  };

  const handleCreatePoll = async (pollData) => {
    try {
      const created = await api.createPoll(pollData);
      if (created) setPoll(created);
    } catch (e) {
      console.warn('API error creating poll:', e);
    }
  };

  // Fund handlers
  const handleAddTransaction = async (title, amount, type) => {
    const newTx = {
      id: `tx-${Date.now()}`,
      title,
      amount: type === 'outflow' ? -amount : amount,
      date: 'Today',
      type,
      reference: 'Manual CR Voucher',
    };
    setFundTransactions((prev) => [newTx, ...prev]);
    setFundBalance((prev) => (type === 'outflow' ? prev - amount : prev + amount));

    try {
      const saved = await api.addFundTransaction(title, amount, type);
      if (saved) {
        setFundTransactions((prev) => prev.map((t) => (t.id === newTx.id ? saved : t)));
      }
    } catch (e) {
      console.warn('API error adding transaction:', e);
    }
  };

  // Student notes handlers
  const handleAddPrivateNote = async (note) => {
    setPrivateNotes((prev) => [note, ...prev]);
    try {
      const created = await api.createNote(note);
      if (created) {
        setPrivateNotes((prev) => prev.map((n) => (n.id === note.id ? created : n)));
      }
    } catch (e) {
      console.warn('API error creating note:', e);
    }
  };

  const handleSubmitNoteToCr = async (noteId) => {
    setPrivateNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, status: 'pending_cr_review' } : n))
    );
    try {
      await api.submitNoteToCr(noteId);
    } catch (e) {
      console.warn('API error submitting note to CR:', e);
    }
  };

  const handleWithdrawSubmission = async (noteId) => {
    setPrivateNotes((prev) =>
      prev.map((n) => (n.id === noteId ? { ...n, status: 'private_draft' } : n))
    );
    try {
      await api.withdrawNote(noteId);
    } catch (e) {
      console.warn('API error withdrawing note submission:', e);
    }
  };

  // Clearance review action in admin
  const handleClearanceAction = async (id, action) => {
    setPendingClearances((prev) => prev.filter((c) => c.id !== id));
    try {
      if (action === 'approve') {
        await api.approveClearance(id);
      } else {
        await api.rejectClearance(id);
      }
    } catch (e) {
      console.warn('API error reviewing clearance:', e);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0d1c2f] flex flex-col font-sans">
      {/* Top Universal Navbar */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onOpenAddFaculty={() => setIsAddFacultyOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* Sync Banner if needed */}
      {isSyncing && (
        <div className="fixed top-20 right-6 z-40 bg-[#001428] text-white text-xs px-3 py-1.5 rounded-full shadow-lg border border-[#dde9ff]/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Syncing with Database...</span>
        </div>
      )}

      {/* Conditional Layout: Landing page is full-width hero & catalog; other roles have Sidebar */}
      {currentRole === 'landing' ? (
        <main className="w-full pt-[92px]">
          <LandingView
            faculties={faculties}
            onSelectRole={(role) => setCurrentRole(role)}
            onExploreFaculty={() => {
              setCurrentRole('dean-portal');
            }}
          />
        </main>
      ) : (
        <div className="flex w-full min-h-[calc(100vh-92px)]">
          {/* Persistent Sidebar */}
          <Sidebar
            currentRole={currentRole}
            setCurrentRole={setCurrentRole}
            facultyCount={faculties.length}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />

          {/* Main App Content Area */}
          <main className="flex-1 w-full pl-0 md:pl-64 pt-[92px] p-4 sm:p-6 lg:p-8 bg-[#f8f9ff] overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full pb-16">
              {currentRole === 'admin-dashboard' && (
                <AdminDashboardView
                  faculties={faculties}
                  pendingClearances={pendingClearances}
                  onOpenAddFaculty={() => {
                    setCurrentRole('admin-faculties');
                    setIsAddFacultyOpen(true);
                  }}
                  onNavigate={(role) => setCurrentRole(role)}
                  onClearanceAction={handleClearanceAction}
                />
              )}

              {currentRole === 'admin-faculties' && (
                <AdminFacultiesView
                  faculties={faculties}
                  onAddFaculty={handleAddFaculty}
                  onUpdateFaculty={handleUpdateFaculty}
                  isAddDrawerOpen={isAddFacultyOpen}
                  setIsAddDrawerOpen={setIsAddFacultyOpen}
                />
              )}

              {currentRole === 'dean-portal' && (
                <DeanPortalView
                  faculties={faculties}
                  onOpenAddNotice={() => {}}
                />
              )}

              {currentRole === 'teacher-central' && (
                <TeacherCentralView />
              )}

              {currentRole === 'cr-hub' && (
                <CrHubView
                  schedule={schedule}
                  membershipRequests={membershipRequests}
                  onApproveMembership={handleApproveMembership}
                  onRejectMembership={handleRejectMembership}
                  poll={poll}
                  onVotePoll={handleVotePoll}
                  onClosePoll={handleClosePoll}
                  onCreatePoll={handleCreatePoll}
                  fundBalance={fundBalance}
                  fundTransactions={fundTransactions}
                  onAddTransaction={handleAddTransaction}
                />
              )}

              {currentRole === 'student-notes' && (
                <StudentNotesView
                  topperNotes={topperNotes}
                  privateNotes={privateNotes}
                  onAddPrivateNote={handleAddPrivateNote}
                  onSubmitToCr={handleSubmitNoteToCr}
                  onWithdrawSubmission={handleWithdrawSubmission}
                />
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}
