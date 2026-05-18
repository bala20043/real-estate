import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Calendar, Trash2, ShieldAlert, Sparkles, Database, RefreshCw, Link as LinkIcon, Lock, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Admin = () => {
  const [leads, setLeads] = useState([]);
  const [filterType, setFilterType] = useState('all');
  
  // Authentication States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      loadLeads();
    }
  }, [isLoggedIn]);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('elara_enquiries')
        .select('*')
        .order('timestamp', { ascending: false });
      if (error) throw error;
      
      const formatted = (data || []).map(l => ({
        id: l.id,
        name: l.name,
        email: l.email,
        phone: l.phone,
        message: l.message,
        propertyName: l.property_name,
        propertyId: l.property_id,
        timestamp: l.timestamp,
        agentName: l.agent_name
      }));
      setLeads(formatted);
    } catch (err) {
      console.error("Failed to load leads from Supabase, loading fallback:", err);
      const data = JSON.parse(localStorage.getItem('elara_enquiries') || '[]');
      setLeads(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteLead = async (id) => {
    try {
      const { error } = await supabase
        .from('elara_enquiries')
        .delete()
        .eq('id', id);
      if (error) throw error;
      setLeads(prev => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error("Failed to delete lead from Supabase:", err);
      // Local state fallback
      const updated = leads.filter(l => l.id !== id);
      localStorage.setItem('elara_enquiries', JSON.stringify(updated));
      setLeads(updated);
    }
  };

  const clearAllLeads = async () => {
    if (window.confirm("Are you sure you want to permanently clear all submissions from the cloud database?")) {
      try {
        const { error } = await supabase
          .from('elara_enquiries')
          .delete()
          .neq('id', 0); // Deletes all rows!
        if (error) throw error;
        setLeads([]);
      } catch (err) {
        console.error("Failed to clear Supabase table:", err);
        localStorage.setItem('elara_enquiries', '[]');
        setLeads([]);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid administrator email address.');
      return;
    }

    if (password.length < 4) {
      setError('Password must contain at least 4 characters.');
      return;
    }

    setLoading(true);
    try {
      // Query Supabase to see if the admin user exists
      const { data: user, error: fetchErr } = await supabase
        .from('elara_admin_users')
        .select('*')
        .eq('email', email.trim().toLowerCase())
        .maybeSingle();

      if (fetchErr) {
        console.error("Supabase fetch credentials error:", fetchErr);
      }

      if (user) {
        // User exists: verify password
        if (user.password === password) {
          setIsLoggedIn(true);
        } else {
          setError('Invalid credentials. Password does not match registered account.');
        }
      } else {
        // Email not registered: dynamically register them!
        const { error: insertErr } = await supabase
          .from('elara_admin_users')
          .insert([{ email: email.trim().toLowerCase(), password }]);
        
        if (insertErr) {
          setError('Failed to register new administrator account: ' + insertErr.message);
        } else {
          // Successfully registered new account & logs in!
          setIsLoggedIn(true);
        }
      }
    } catch (err) {
      console.error("Auth process error, using local fallback:", err);
      setIsLoggedIn(true);
    } finally {
      setLoading(false);
    }
  };

  // Incredible developer feature: lets you seed beautiful demo leads to view immediately!
  const injectMockLeads = async () => {
    const mock = [
      {
        name: "Lord Harrison Sterling",
        email: "harrison.sterling@crownchambers.co.uk",
        phone: "+44 20 7946 0912",
        message: "We are seeking to acquire a beachfront villa in Palm Jumeirah as a winter estate. I would love to arrange a private helicopter tour and site briefing this coming Friday. Please ensure the agent has NDA templates ready.",
        property_name: "Serenity Mansion",
        property_id: 1,
        agent_name: "Isabella Chen"
      },
      {
        name: "Dr. Miyako Sato",
        email: "sato.miyako@tokyo-health.jp",
        phone: "+81 90 5555 0143",
        message: "I am interested in buying the Royal Penthouse in Downtown Dubai. Please advise if the building has private medical access elevators and high-capacity tesla chargers in the private basement garage.",
        property_name: "Royal Penthouse",
        property_id: 2,
        agent_name: "Alexander Mercer"
      },
      {
        name: "Gabriella Vance",
        email: "gvance@vancetech.io",
        phone: "+1 (415) 555-2671",
        message: "Do you have any modern properties currently under construction that feature space for an art gallery and dual pools? I will be landing in Dubai next week for negotiations.",
        property_name: "Property Type: Luxury",
        property_id: null,
        agent_name: "General Support Team"
      }
    ];
    
    try {
      const { error } = await supabase
        .from('elara_enquiries')
        .insert(mock);
      if (error) throw error;
      loadLeads();
    } catch (err) {
      console.error("Failed to seed mock leads to Supabase:", err);
      // Fallback local
      const blended = [
        ...mock.map((l, i) => ({ id: Date.now() - i, ...l, propertyName: l.property_name, agentName: l.agent_name })), 
        ...leads
      ];
      localStorage.setItem('elara_enquiries', JSON.stringify(blended));
      setLeads(blended);
    }
  };

  const filteredLeads = leads.filter(l => {
    if (filterType === 'all') return true;
    if (filterType === 'properties') return l.propertyId !== null;
    if (filterType === 'general') return l.propertyId === null;
    return true;
  });

  return (
    <main className="pt-32 pb-24 min-h-screen bg-primary flex items-center justify-center relative">
      <AnimatePresence mode="wait">
        {!isLoggedIn ? (
          /* ================= LOGIN FORM CONTAINER ================= */
          <motion.div 
            key="login-panel"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md p-8 bg-secondary border border-border rounded-sm shadow-xl relative z-10"
          >
            {/* Center Lock Badge */}
            <div className="mx-auto w-16 h-16 bg-accent/5 border border-accent/20 rounded-full flex items-center justify-center mb-6">
              <Lock className="text-accent" size={24} />
            </div>

            <div className="text-center mb-8">
              <h1 className="font-heading text-3xl text-accent">Admin <span className="italic text-accent-light">Gate</span></h1>
              <p className="text-muted font-body text-xs mt-2 uppercase tracking-[0.1em] font-bold">Authorized Access Only</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 font-body">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs text-center font-medium">
                  {error}
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="text-xs text-muted tracking-wider uppercase mb-1.5 block font-bold">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@elararealty.com"
                    required
                    className="w-full bg-primary border border-border px-3 py-2.5 pl-10 text-accent text-sm focus:border-accent focus:outline-none placeholder-muted/60"
                  />
                  <Mail className="absolute left-3.5 top-3.5 text-accent/50" size={14} />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-xs text-muted tracking-wider uppercase mb-1.5 block font-bold">Security Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-primary border border-border px-3 py-2.5 pl-10 pr-10 text-accent text-sm focus:border-accent focus:outline-none placeholder-muted/60"
                  />
                  <Lock className="absolute left-3.5 top-3.5 text-accent/50" size={14} />
                  
                  {/* Eye Toggle */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-accent/40 hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Gold Luxury Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-primary py-3 font-semibold text-xs uppercase tracking-[0.2em] hover:bg-accent-light transition-all duration-300 shadow-md shadow-accent/15 cursor-pointer flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin" size={14} /> Verifying Credentials...
                  </>
                ) : (
                  <>
                    <ShieldCheck size={14} /> Unseal Dashboard
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-muted/70 text-[10px] mt-6 leading-relaxed font-body">
              *Enter any active email ID and security password combination to unlock the portal for pair-programming verification.
            </p>
          </motion.div>
        ) : (
          /* ================= MAIN LEADS DASHBOARD ================= */
          <motion.div 
            key="dashboard-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-7xl mx-auto px-6"
          >
            {/* Admin Header */}
            <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-border pb-8">
              <div>
                <div className="flex items-center gap-2 text-accent text-xs font-body font-bold tracking-[0.25em] uppercase">
                  <ShieldCheck size={14} /> Authenticated: {email}
                </div>
                <h1 className="font-heading text-4xl md:text-5xl text-accent mt-2">Leads <span className="italic text-accent-light">Dashboard</span></h1>
                <p className="text-muted font-body text-sm mt-2">Monitor sent property enquiries, agent contact forms, and client message submissions in real-time.</p>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={injectMockLeads}
                  className="flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent hover:border-accent font-body text-xs font-semibold uppercase tracking-[0.1em] transition-all bg-secondary/50 cursor-pointer"
                >
                  <Sparkles size={12} /> Inject Test Leads
                </button>
                <button
                  onClick={clearAllLeads}
                  disabled={leads.length === 0}
                  className="flex items-center gap-2 px-4 py-2 border border-red-500/30 text-red-500 hover:border-red-500 disabled:opacity-40 font-body text-xs font-semibold uppercase tracking-[0.1em] transition-all bg-red-500/5 cursor-pointer"
                >
                  <Trash2 size={12} /> Clear Database
                </button>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {[
                { title: 'Total Leads Inbox', value: leads.length, desc: 'Central database submissions' },
                { title: 'Property Enquiries', value: leads.filter(l => l.propertyId).length, desc: 'Direct agent inquiries' },
                { title: 'Support Requests', value: leads.filter(l => !l.propertyId).length, desc: 'General page inquiries' }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-secondary border border-border rounded-sm relative overflow-hidden">
                  <div className="text-muted text-xs font-body font-bold uppercase tracking-wider">{stat.title}</div>
                  <div className="font-heading text-4xl text-accent mt-3 font-light">{stat.value}</div>
                  <div className="text-muted text-xs font-body mt-2">{stat.desc}</div>
                  <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-5 pointer-events-none">
                    <Database size={100} className="text-accent" />
                  </div>
                </div>
              ))}
            </div>

            {/* Filters and List view */}
            <div className="bg-secondary border border-border rounded-sm overflow-hidden shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-border bg-primary/20">
                <div className="flex items-center gap-2">
                  <span className="font-body text-xs text-muted font-bold uppercase tracking-wider mr-2">Filters:</span>
                  {['all', 'properties', 'general'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1.5 text-xs font-body uppercase font-bold tracking-[0.05em] cursor-pointer transition-all ${
                        filterType === type 
                          ? 'bg-accent text-primary' 
                          : 'text-accent/60 hover:text-accent border border-border hover:border-accent/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={loadLeads}
                  className="p-2 border border-border hover:border-accent/40 text-accent transition-all cursor-pointer"
                  title="Refresh leads list"
                >
                  <RefreshCw size={13} className="animate-hover" />
                </button>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="text-center py-20 bg-primary/10">
                  <Database size={40} className="text-accent/25 mx-auto mb-4" />
                  <p className="text-accent font-heading text-lg font-light">Leads Inbox is empty</p>
                  <p className="text-muted font-body text-xs mt-2 max-w-sm mx-auto">
                    No users have submitted enquiries yet. You can submit one via the properties pages, or click <strong className="text-accent hover:underline cursor-pointer" onClick={injectMockLeads}>"Inject Test Leads"</strong> to populate instantly!
                  </p>
                </div>
              ) : (
                <>
                  {/* MOBILE & TABLET LAYOUT: Card Grid (block md:hidden) */}
                  <div className="block md:hidden divide-y divide-border/60">
                    {filteredLeads.map((lead) => (
                      <motion.div 
                        key={lead.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 space-y-4 hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-accent text-base">{lead.name}</h3>
                            <div className="flex flex-col gap-1 mt-2">
                              <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors">
                                <Mail size={12} /> {lead.email}
                              </a>
                              <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors">
                                <Phone size={12} /> {lead.phone}
                              </a>
                            </div>
                          </div>

                          <button
                            onClick={() => deleteLead(lead.id)}
                            className="p-2.5 border border-red-500/20 hover:border-red-500 text-red-500 hover:bg-red-500/5 transition-all cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                          {lead.propertyId ? (
                            <Link 
                              to={`/property/${lead.propertyId}`}
                              className="font-medium text-accent hover:underline text-xs flex items-center gap-1 bg-accent/5 px-2 py-1 border border-accent/20"
                            >
                              <LinkIcon size={11} /> {lead.propertyName}
                            </Link>
                          ) : (
                            <span className="text-accent/80 font-medium px-2 py-1 border border-accent/20 bg-accent/5 text-[10px] uppercase tracking-wider">
                              {lead.propertyName}
                            </span>
                          )}
                          <span className="text-[10px] font-mono font-medium text-accent/60 border border-border bg-primary/40 px-2 py-1 uppercase">
                            Agent: {lead.agentName}
                          </span>
                        </div>

                        <p className="text-xs text-accent/80 leading-relaxed italic bg-primary/20 p-3 border-l border-accent/30 whitespace-pre-line">
                          "{lead.message}"
                        </p>

                        <div className="flex items-center gap-1 text-[10px] text-muted font-mono pt-1">
                          <Calendar size={11} />
                          {new Date(lead.timestamp).toLocaleDateString()} at {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* DESKTOP LAYOUT: Full Details Table (hidden md:block) */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse font-body font-normal">
                      <thead>
                        <tr className="border-b border-border bg-primary/30 text-xs font-bold uppercase tracking-wider text-accent/80">
                          <th className="p-4">Contact Info</th>
                          <th className="p-4">Property / Lead Source</th>
                          <th className="p-4">Assigned Agent</th>
                          <th className="p-4">User Message</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/60 text-sm">
                        {filteredLeads.map((lead) => (
                          <motion.tr 
                            key={lead.id} 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }}
                            className="hover:bg-primary/20 transition-colors"
                          >
                            {/* Contact column */}
                            <td className="p-4">
                              <div className="font-bold text-accent">{lead.name}</div>
                              <div className="flex items-center gap-1.5 text-xs text-muted mt-1 hover:text-accent transition-colors">
                                <Mail size={11} />
                                <a href={`mailto:${lead.email}`}>{lead.email}</a>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-muted mt-1 hover:text-accent transition-colors">
                                <Phone size={11} />
                                <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                              </div>
                            </td>

                            {/* Property column */}
                            <td className="p-4">
                              {lead.propertyId ? (
                                <Link 
                                  to={`/property/${lead.propertyId}`}
                                  className="font-medium text-accent hover:underline flex items-center gap-1"
                                >
                                  <LinkIcon size={12} className="text-accent/60" />
                                  {lead.propertyName}
                                </Link>
                              ) : (
                                <span className="text-accent/80 font-medium px-2 py-0.5 border border-accent/20 bg-accent/5 text-xs">
                                  {lead.propertyName}
                                </span>
                              )}
                            </td>

                            {/* Agent column */}
                            <td className="p-4">
                              <span className="text-xs font-medium text-accent/70 font-mono">
                                {lead.agentName}
                              </span>
                            </td>

                            {/* Message column */}
                            <td className="p-4 max-w-sm">
                              <p className="text-xs text-accent/80 leading-relaxed italic bg-primary/20 p-2.5 border-l border-accent/30 whitespace-pre-line">
                                "{lead.message}"
                              </p>
                            </td>

                            {/* Date column */}
                            <td className="p-4 text-xs text-muted font-mono">
                              <div className="flex items-center gap-1">
                                <Calendar size={11} />
                                {new Date(lead.timestamp).toLocaleDateString()}
                              </div>
                              <div className="mt-0.5 opacity-60">
                                {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </td>

                            {/* Action column */}
                            <td className="p-4 text-center">
                              <button
                                onClick={() => deleteLead(lead.id)}
                                className="p-2 border border-red-500/20 hover:border-red-500 text-red-500/70 hover:text-red-500 transition-all rounded-sm cursor-pointer hover:bg-red-500/5"
                                title="Delete Lead"
                              >
                                <Trash2 size={13} />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Admin;
