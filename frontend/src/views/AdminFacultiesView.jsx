import React, { useState, useMemo } from 'react';

export const AdminFacultiesView = ({
  faculties,
  onAddFaculty,
  onUpdateFaculty,
  isAddDrawerOpen,
  setIsAddDrawerOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Cascading showcase states
  const [cascadeFacultyId, setCascadeFacultyId] = useState(faculties[0]?.id || 'fac-1');
  const [cascadeDeptId, setCascadeDeptId] = useState('');

  // Form states for Add Faculty Drawer
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formDean, setFormDean] = useState('');
  const [formStatus, setFormStatus] = useState('Active');
  const [formColor, setFormColor] = useState('#2563eb');
  const [formDepts, setFormDepts] = useState([
    'Dept. of Marine Ecology',
    'Dept. of Ocean Engineering'
  ]);
  const [newDeptInput, setNewDeptInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  // Filter and sort faculties
  const filteredFaculties = useMemo(() => {
    return faculties
      .filter((fac) => {
        const matchesSearch =
          fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          fac.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (fac.dean && fac.dean.name.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || fac.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'depts') return b.departments.length - a.departments.length;
        if (sortBy === 'batches') return b.batchesCount - a.batchesCount;
        return 0;
      });
  }, [faculties, searchTerm, statusFilter, sortBy]);

  // Selected faculty in cascading showcase
  const currentCascadeFaculty = faculties.find((f) => f.id === cascadeFacultyId) || faculties[0];
  const availableDepts = currentCascadeFaculty ? currentCascadeFaculty.departments : [];

  const handleAddDeptTag = () => {
    if (newDeptInput.trim()) {
      setFormDepts([...formDepts, newDeptInput.trim()]);
      setNewDeptInput('');
    }
  };

  const handleRemoveDeptTag = (index) => {
    setFormDepts(formDepts.filter((_, i) => i !== index));
  };

  const handleSaveNewFaculty = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formCode.trim()) return;

    const newFacultyDepartments = formDepts.map((dName, idx) => ({
      id: `dept-${formCode.toLowerCase()}-${idx + 1}`,
      code: `${formCode.toUpperCase()}-${idx + 1}`,
      name: dName,
      chairperson: 'Interim Department Chair',
      batchesCount: 1,
      teacherCount: 4,
      studentCount: 80,
    }));

    const newFaculty = {
      id: `fac-${Date.now()}`,
      name: formName.trim(),
      code: formCode.trim().toUpperCase(),
      slug: formCode.trim().toLowerCase(),
      established: new Date().getFullYear(),
      batchesCount: 2,
      enrolledStudents: 160,
      dean: formDean
        ? {
            name: formDean,
            email: `dean.${formCode.toLowerCase()}@university.edu`,
            designation: 'Appointed Dean',
          }
        : null,
      status: formStatus,
      color: formColor,
      description: formDesc || 'Newly chartered collegiate faculty in the university academic governance structure.',
      telegramChannel: `batchsync_${formCode.toLowerCase()}`,
      departments: newFacultyDepartments,
    };

    onAddFaculty(newFaculty);
    setIsAddDrawerOpen(false);

    // Reset form
    setFormName('');
    setFormCode('');
    setFormDesc('');
    setFormDean('');
    setFormStatus('Active');
    setToastMessage(`Faculty "${newFaculty.name}" successfully created and synchronized system-wide!`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleExportCSV = () => {
    const headers = 'Faculty Name,Code,Departments,Batches,Enrolled Students,Dean,Status\n';
    const rows = faculties
      .map(
        (f) =>
          `"${f.name}","${f.code}",${f.departments.length},${f.batchesCount},${f.enrolledStudents},"${f.dean ? f.dean.name : 'Vacant'}","${f.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `PSTU_Faculties_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMessage('Faculty Directory CSV downloaded to your device.');
    setTimeout(() => setToastMessage(null), 3500);
  };

  const totalDepts = faculties.reduce((acc, f) => acc + f.departments.length, 0);
  const totalBatches = faculties.reduce((acc, f) => acc + f.batchesCount, 0);
  const assignedDeansCount = faculties.filter((f) => f.dean !== null).length;

  return (
    <div className="w-full space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-4 rounded-xl bg-[#001428] text-white shadow-2xl border border-[#dde9ff]/30">
          <span className="material-symbols-outlined text-emerald-400 text-[24px]">verified</span>
          <div className="flex flex-col">
            <span className="font-display font-semibold text-[13px]">Operation Successful</span>
            <span className="text-[12px] text-[#b0c9e8]">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="ml-3 text-[#b0c9e8] hover:text-white">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-1.5 text-[12px] text-[#465f88] pt-1">
        <span>Overview</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span>University</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-[#0d1c2f] font-semibold">Faculty Management & Dynamic Provisioning</span>
      </nav>

      {/* Primary Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#dde9ff] pb-4">
        <div>
          <h1 className="font-display text-2xl sm:text-[28px] text-[#001428] font-bold tracking-tight">
            Faculty Management
          </h1>
          <p className="text-[14px] text-[#43474d]">
            Manage all faculties across the university with dynamic auto-propagation.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#c3c6ce] text-[#0d1c2f] text-[12px] font-semibold hover:bg-[#eff4ff] transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-[#465f88]">download</span>
            <span>Export Directory (CSV)</span>
          </button>
          <button
            onClick={() => setIsAddDrawerOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#001428] text-white text-[13px] font-bold hover:bg-[#0f2942] transition-colors shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>+ Add Faculty</span>
          </button>
        </div>
      </div>

      {/* Key Statistics Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-xl bg-white border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Faculties</span>
            <span className="material-symbols-outlined text-[20px]">account_balance</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-[#001428]">{faculties.length}</span>
            <span className="text-[12px] text-[#465f88]">Faculties</span>
          </div>
          <div className="text-[12px] text-[#43474d] mt-1">{faculties.length} Active • 0 Inactive</div>
        </div>

        <div className="p-4.5 rounded-xl bg-white border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Departments</span>
            <span className="material-symbols-outlined text-[20px]">domain</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-[#001428]">{totalDepts}</span>
            <span className="text-[12px] text-[#465f88]">Departments</span>
          </div>
          <div className="text-[12px] text-[#43474d] mt-1">Across all university faculties</div>
        </div>

        <div className="p-4.5 rounded-xl bg-white border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Active Batches</span>
            <span className="material-symbols-outlined text-[20px]">school</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-[#001428]">{totalBatches}</span>
            <span className="text-[12px] text-[#465f88]">Batches</span>
          </div>
          <div className="text-[12px] text-[#43474d] mt-1">Enrolled academic cohorts</div>
        </div>

        <div className="p-4.5 rounded-xl bg-white border border-[#dde9ff] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#465f88] mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Dean Appointments</span>
            <span className="material-symbols-outlined text-[20px]">badge</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-3xl font-bold text-[#001428]">
              {assignedDeansCount}/{faculties.length}
            </span>
            <span className="text-[12px] text-[#465f88]">Assigned</span>
          </div>
          <div className="text-[12px] text-[#ba1a1a] mt-1 font-semibold">
            {faculties.length - assignedDeansCount} Faculty Dean Pending
          </div>
        </div>
      </div>

      {/* Interactive Architecture Showcase: Cascading Propagation (Levels 1-4) */}
      <div className="rounded-xl bg-white border border-[#dde9ff] shadow-xs p-5 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#b6d0ff] flex items-center justify-center text-[#0f2942]">
              <span className="material-symbols-outlined text-[22px]">account_tree</span>
            </div>
            <div>
              <h2 className="font-display text-[16px] font-bold text-[#001428]">
                Interactive Architecture Showcase: Cascading Propagation
              </h2>
              <p className="text-[12px] text-[#43474d]">
                Test real-time schema dependency binding: Selecting an existing or freshly provisioned faculty dynamically populates downstream selector branches.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-[#eff4ff] text-[#465f88] font-mono text-[11px] rounded border border-[#dde9ff]">
            <span>GET /api/v1/faculties/:id/branches</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 rounded-lg bg-[#eff4ff] border border-[#dde9ff]">
          {/* Level 1: Select Faculty */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#001428] text-white flex items-center justify-center text-[10px]">1</span>
              Select Faculty
            </label>
            <div className="relative">
              <select
                value={cascadeFacultyId}
                onChange={(e) => {
                  setCascadeFacultyId(e.target.value);
                  const targetFac = faculties.find((f) => f.id === e.target.value);
                  if (targetFac && targetFac.departments.length > 0) {
                    setCascadeDeptId(targetFac.departments[0].id);
                  }
                }}
                className="w-full bg-white text-[#0d1c2f] text-[13px] py-2 px-3 rounded-lg appearance-none border border-[#c3c6ce] focus:outline-none focus:border-[#465f88] shadow-xs cursor-pointer font-medium"
              >
                {faculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.code})
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2 text-[18px] text-[#74777e] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Level 2: Inherited Department */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#465f88] text-white flex items-center justify-center text-[10px]">2</span>
              Inherited Department
            </label>
            <div className="relative">
              <select
                value={cascadeDeptId || (availableDepts[0]?.id || '')}
                onChange={(e) => setCascadeDeptId(e.target.value)}
                className="w-full bg-white text-[#0d1c2f] text-[13px] py-2 px-3 rounded-lg appearance-none border border-[#c3c6ce] focus:outline-none focus:border-[#465f88] shadow-xs cursor-pointer font-medium"
              >
                {availableDepts.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2 text-[18px] text-[#74777e] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Level 3: Subordinate Batch */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#465f88] text-white flex items-center justify-center text-[10px]">3</span>
              Subordinate Batch
            </label>
            <div className="relative">
              <select className="w-full bg-white text-[#0d1c2f] text-[13px] py-2 px-3 rounded-lg appearance-none border border-[#c3c6ce] focus:outline-none focus:border-[#465f88] shadow-xs cursor-pointer font-medium">
                <option>{currentCascadeFaculty?.code} Batch 12 (Session 2021-22)</option>
                <option>{currentCascadeFaculty?.code} Batch 13 (Session 2022-23)</option>
                <option>{currentCascadeFaculty?.code} Batch 14 (Session 2023-24)</option>
                <option>{currentCascadeFaculty?.code} Batch 15 (Session 2024-25)</option>
              </select>
              <span className="material-symbols-outlined absolute right-2.5 top-2 text-[18px] text-[#74777e] pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Level 4: Target Routine */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] uppercase tracking-wider text-[#465f88] font-bold flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#465f88] text-white flex items-center justify-center text-[10px]">4</span>
              Target Routine
            </label>
            <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-[#c3c6ce] shadow-xs">
              <span className="font-mono text-[12px] text-[#001428] font-bold">
                {currentCascadeFaculty?.code}-2025-W08-LIVE
              </span>
              <span className="material-symbols-outlined text-[16px] text-[#465f88]">open_in_new</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search, Filter & Sort Bar */}
      <div className="rounded-xl bg-white border border-[#dde9ff] shadow-xs flex flex-col overflow-visible">
        <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#eff4ff] border-b border-[#dde9ff]">
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#74777e]">search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search faculties by name, code, or dean..."
                className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] text-[13px] pl-9 pr-3 py-1.5 rounded-lg focus:outline-none focus:border-[#465f88] placeholder-[#74777e]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-[#c3c6ce] px-2.5 py-1.5 rounded-lg shadow-xs">
              <span className="text-[11px] text-[#465f88] font-semibold">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-[12px] text-[#0d1c2f] focus:outline-none cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#c3c6ce] px-2.5 py-1.5 rounded-lg shadow-xs">
              <span className="text-[11px] text-[#465f88] font-semibold">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-[12px] text-[#0d1c2f] focus:outline-none cursor-pointer"
              >
                <option value="name">Faculty Name (A-Z)</option>
                <option value="depts">Departments (High to Low)</option>
                <option value="batches">Batches (High to Low)</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setSortBy('name');
              }}
              className="p-1.5 rounded-lg bg-white border border-[#c3c6ce] hover:bg-[#eff4ff] text-[#465f88] transition-colors"
              title="Reset Filters"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
            </button>
          </div>
        </div>

        {/* Faculty Table */}
        <div className="overflow-x-auto min-h-[380px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#dde9ff]/50 text-[#465f88] text-[11px] uppercase tracking-wider border-b border-[#dde9ff]">
                <th className="py-3 px-4 font-semibold">Faculty Name</th>
                <th className="py-3 px-3 font-semibold">Faculty Code</th>
                <th className="py-3 px-3 font-semibold">Departments</th>
                <th className="py-3 px-3 font-semibold">Batches</th>
                <th className="py-3 px-3 font-semibold">Dean</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#dde9ff] text-[13px] text-[#0d1c2f]">
              {filteredFaculties.map((fac) => (
                <tr key={fac.id} className="hover:bg-[#eff4ff]/60 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs"
                        style={{ backgroundColor: fac.color || '#2563eb' }}
                        title={`Color: ${fac.color}`}
                      ></div>
                      <div className="flex flex-col">
                        <span className="font-display text-[14px] font-semibold text-[#001428]">
                          {fac.name}
                        </span>
                        <span className="text-[11px] text-[#74777e]">Established {fac.established}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-[#eff4ff] font-mono text-[12px] font-bold text-[#001428] border border-[#dde9ff]">
                      {fac.code}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[12px] font-medium text-[#0d1c2f]">{fac.departments.length} Depts</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[12px] font-medium text-[#0d1c2f]">{fac.batchesCount} Batches</span>
                  </td>
                  <td className="py-3 px-3">
                    {fac.dean ? (
                      <div className="flex flex-col">
                        <span className="text-[12px] font-semibold text-[#0d1c2f]">{fac.dean.name}</span>
                        <span className="text-[11px] text-[#465f88]">{fac.dean.email}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#ba1a1a] text-[11px] font-semibold">
                          Vacant - Pending
                        </span>
                        <button
                          onClick={() => {
                            const newDeanName = prompt(`Enter appointed Dean for ${fac.name}:`, 'Prof. Dr. Academic Fellow');
                            if (newDeanName) {
                              onUpdateFaculty({
                                ...fac,
                                dean: {
                                  name: newDeanName,
                                  email: `dean.${fac.code.toLowerCase()}@university.edu`,
                                },
                              });
                              setToastMessage(`Dean appointed for ${fac.name}!`);
                              setTimeout(() => setToastMessage(null), 3000);
                            }
                          }}
                          className="px-2 py-0.5 rounded bg-[#001428] text-white text-[11px] font-semibold hover:bg-[#0f2942]"
                        >
                          Assign
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        fac.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-[#eff4ff] text-[#43474d]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          fac.status === 'Active' ? 'bg-emerald-600' : 'bg-[#74777e]'
                        }`}
                      ></span>
                      {fac.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right relative">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setActiveMenuId(activeMenuId === fac.id ? null : fac.id)}
                        className="px-3 py-1 rounded bg-[#eff4ff] hover:bg-[#dde9ff] text-[#0d1c2f] text-[12px] font-semibold inline-flex items-center gap-1 border border-[#c3c6ce]/50 transition-colors"
                      >
                        <span>Manage</span>
                        <span className="material-symbols-outlined text-[15px]">expand_more</span>
                      </button>

                      {activeMenuId === fac.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-[#dde9ff] py-1 z-30 text-left">
                          <button
                            onClick={() => {
                              alert(`Viewing faculty specifications for ${fac.name}\nDepartments: ${fac.departments.map(d => d.name).join(', ')}`);
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#eff4ff] text-[12px] text-[#0d1c2f]"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[#465f88]">visibility</span>
                            View Faculty
                          </button>
                          <button
                            onClick={() => {
                              const newName = prompt('Edit Faculty Name:', fac.name);
                              if (newName) {
                                onUpdateFaculty({ ...fac, name: newName });
                              }
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#eff4ff] text-[12px] text-[#0d1c2f]"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[#465f88]">edit</span>
                            Edit Faculty
                          </button>
                          <button
                            onClick={() => {
                              const dName = prompt(`Add Department to ${fac.code}:`, 'Dept. of Advanced Research');
                              if (dName) {
                                const newDept = {
                                  id: `dept-${Date.now()}`,
                                  code: `${fac.code}-${fac.departments.length + 1}`,
                                  name: dName,
                                  chairperson: 'Pending Chairperson',
                                  batchesCount: 1,
                                  teacherCount: 3,
                                  studentCount: 60,
                                };
                                onUpdateFaculty({
                                  ...fac,
                                  departments: [...fac.departments, newDept],
                                });
                                setToastMessage(`Department "${dName}" added to ${fac.code}!`);
                                setTimeout(() => setToastMessage(null), 3000);
                              }
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#eff4ff] text-[12px] text-[#0d1c2f]"
                          >
                            <span className="material-symbols-outlined text-[16px] text-[#465f88]">domain</span>
                            Add Department
                          </button>
                          <div className="my-1 border-t border-[#dde9ff]"></div>
                          <button
                            onClick={() => {
                              onUpdateFaculty({
                                ...fac,
                                status: fac.status === 'Active' ? 'Draft' : 'Active',
                              });
                              setActiveMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 hover:bg-[#ffdad6]/40 text-[12px] text-[#ba1a1a]"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {fac.status === 'Active' ? 'block' : 'check_circle'}
                            </span>
                            {fac.status === 'Active' ? 'Deactivate Faculty' : 'Activate Faculty'}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#eff4ff] border-t border-[#dde9ff] text-[12px] text-[#43474d]">
          <div className="flex items-center gap-2">
            <span>
              Showing <strong>{filteredFaculties.length} of {faculties.length}</strong> faculties
            </span>
            <span>•</span>
            <span>University Registry v2.4</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2.5 py-1 rounded bg-white border border-[#c3c6ce] shadow-xs disabled:opacity-40" disabled>
              Previous
            </button>
            <button className="px-2.5 py-1 rounded bg-[#001428] text-white font-bold">1</button>
            <button className="px-2.5 py-1 rounded bg-white border border-[#c3c6ce] shadow-xs disabled:opacity-40" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ================= '+ Add Faculty' MODAL / DRAWER ================= */}
      {isAddDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#001428]/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsAddDrawerOpen(false)}
          ></div>

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col border-l border-[#dde9ff]">
              {/* Header */}
              <div className="px-6 py-4 bg-[#001428] text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[22px] text-[#aec7f7]">account_balance</span>
                  <div>
                    <h2 className="font-display text-[18px] font-bold">Add Faculty</h2>
                    <p className="text-[11px] text-[#b0c9e8]">Register a new university collegiate faculty</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddDrawerOpen(false)}
                  className="p-1 rounded text-[#b0c9e8] hover:text-white hover:bg-white/10"
                >
                  <span className="material-symbols-outlined text-[22px]">close</span>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSaveNewFaculty} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 text-[13px]">
                {/* System Notice Callout */}
                <div className="p-3 bg-[#eff4ff] rounded-lg border border-[#dde9ff] flex items-start gap-2.5 text-[#43474d] text-[12px]">
                  <span className="material-symbols-outlined text-[18px] text-[#465f88] mt-0.5 shrink-0">info</span>
                  <p className="leading-relaxed">
                    <strong>System Notice:</strong> When a new faculty is created, it automatically appears across the public directory, department creation, batch scheduling, teacher assignments, and reports without code deployment.
                  </p>
                </div>

                {/* Faculty Name */}
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#0d1c2f]">
                    Faculty Name <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Faculty of Marine Science & Oceanography"
                    className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] px-3 py-2 rounded-lg focus:outline-none focus:border-[#465f88] shadow-xs"
                  />
                </div>

                {/* Faculty Code */}
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#0d1c2f]">
                    Faculty Code <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                    placeholder="e.g. FMSO"
                    className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] font-mono uppercase px-3 py-2 rounded-lg focus:outline-none focus:border-[#465f88] shadow-xs"
                  />
                  <span className="text-[11px] text-[#465f88]">
                    Short uppercase academic abbreviation (e.g. CSE, AGRI, FMSO).
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#0d1c2f]">Description</label>
                  <textarea
                    rows={2}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Brief outline of the faculty's academic scope and degrees..."
                    className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] px-3 py-2 rounded-lg focus:outline-none focus:border-[#465f88] shadow-xs"
                  ></textarea>
                </div>

                {/* Dean Assignment */}
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#0d1c2f]">Dean Assignment (Optional)</label>
                  <select
                    value={formDean}
                    onChange={(e) => setFormDean(e.target.value)}
                    className="w-full bg-white border border-[#c3c6ce] text-[#0d1c2f] px-3 py-2 rounded-lg focus:outline-none focus:border-[#465f88] shadow-xs cursor-pointer"
                  >
                    <option value="">Leave Vacant (Interim Assignment)</option>
                    <option value="Prof. Dr. Ashraful Haque">Prof. Dr. Ashraful Haque (Senior Fellow)</option>
                    <option value="Prof. Dr. SM Zafar Alam">Prof. Dr. SM Zafar Alam (Academic Fellow)</option>
                    <option value="Prof. Dr. Zahid Hasan">Prof. Dr. Zahid Hasan</option>
                    <option value="Barrister Shahriar Parvez">Barrister Shahriar Parvez</option>
                  </select>
                </div>

                {/* Color Swatch */}
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#0d1c2f]">Faculty Accent Theme</label>
                  <div className="flex items-center gap-3 pt-1">
                    {['#2563eb', '#059669', '#d97706', '#0d9488', '#0284c7', '#7c3aed', '#e11d48'].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setFormColor(c)}
                        className={`w-6 h-6 rounded-full transition-transform ${
                          formColor === c ? 'ring-2 ring-offset-2 ring-[#001428] scale-110' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Initial Departments Tag Box */}
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#0d1c2f]">Initial Departments</label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-[#eff4ff] border border-[#dde9ff] rounded-lg">
                    {formDepts.map((d, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white border border-[#c3c6ce] text-[#001428] text-[11px] font-medium"
                      >
                        {d}
                        <button
                          type="button"
                          onClick={() => handleRemoveDeptTag(index)}
                          className="material-symbols-outlined text-[13px] text-[#74777e] hover:text-[#ba1a1a]"
                        >
                          close
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <input
                      type="text"
                      value={newDeptInput}
                      onChange={(e) => setNewDeptInput(e.target.value)}
                      placeholder="Add department name..."
                      className="flex-1 bg-white border border-[#c3c6ce] text-[#0d1c2f] text-[12px] px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#465f88]"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddDeptTag();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddDeptTag}
                      className="px-3 py-1.5 rounded-lg bg-[#dde9ff] hover:bg-[#b6d0ff] text-[#0f2942] text-[12px] font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Status Selection */}
                <div className="space-y-1">
                  <label className="text-[12px] font-semibold text-[#0d1c2f]">Faculty Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                        formStatus === 'Active'
                          ? 'bg-[#eff4ff] border-[#465f88]'
                          : 'bg-white border-[#c3c6ce]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="faculty-status"
                        checked={formStatus === 'Active'}
                        onChange={() => setFormStatus('Active')}
                      />
                      <div>
                        <div className="font-semibold text-[#0d1c2f] text-[12px]">Active</div>
                        <div className="text-[11px] text-[#465f88]">Immediately visible</div>
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer ${
                        formStatus === 'Draft'
                          ? 'bg-[#eff4ff] border-[#465f88]'
                          : 'bg-white border-[#c3c6ce]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="faculty-status"
                        checked={formStatus === 'Draft'}
                        onChange={() => setFormStatus('Draft')}
                      />
                      <div>
                        <div className="font-semibold text-[#0d1c2f] text-[12px]">Draft</div>
                        <div className="text-[11px] text-[#465f88]">Hidden from students</div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Actions inside form */}
                <div className="pt-4 border-t border-[#dde9ff] flex items-center justify-end gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => setIsAddDrawerOpen(false)}
                    className="px-4 py-2 rounded-lg text-[#465f88] text-[13px] font-medium hover:bg-[#eff4ff]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#001428] text-white text-[13px] font-bold hover:bg-[#0f2942] transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">add</span>
                    <span>Save Faculty</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
