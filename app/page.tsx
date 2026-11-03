'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  AlertTriangle,
  Anchor,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  ExternalLink,
  FileText,
  Flame,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Navigation,
  Plus,
  Radio,
  Search,
  ShieldCheck,
  Siren,
  Users,
  Waves,
  X,
} from 'lucide-react'

const incidents = [
  { id: 'INC-2024-084', type: 'Assistance médicale', place: 'Port d’Abidjan · Zone 3', time: '11:42', status: 'En cours', color: 'red' },
  { id: 'INC-2024-083', type: 'Sûreté maritime', place: 'Large Grand-Bassam', time: '10:18', status: 'Coordination', color: 'amber' },
  { id: 'INC-2024-082', type: 'Avarie moteur', place: 'Canal de Vridi', time: '09:56', status: 'Clôturé', color: 'green' },
  { id: 'INC-2024-081', type: 'Pollution maritime', place: 'Baie de San Pedro', time: '08:31', status: 'Clôturé', color: 'green' },
]

const navItems = [
  { label: 'Vue générale', href: '/', icon: LayoutDashboard },
  { label: 'Nouvelles alertes', href: '/nouvelles-alertes', icon: Siren, badge: 3 },
  { label: 'Assistance', href: '/assistance', icon: Anchor },
  { label: 'Coordination', href: '/coordination', icon: Radio },
  { label: 'Sauvetage', href: '/sauvetage', icon: Waves },
  { label: 'Rapports journaliers', href: '/rapports-journaliers', icon: ClipboardList },
  { label: 'Réunions', href: '/reunions', icon: CalendarDays },
]

export default function Page() {
  const [active, setActive] = useState('Vue générale')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [claimedIncident, setClaimedIncident] = useState<string | null>(null)

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Waves size={22} strokeWidth={2.5} /></div>
          <div><strong>CPCSM</strong><span>Centre de coordination</span></div>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Fermer le menu"><X size={20} /></button>
        </div>
        <div className="side-label">ESPACE OPÉRATIONNEL</div>
        <nav aria-label="Navigation principale">
          {navItems.map(({ label, href, icon: Icon, badge }) => (
            <Link key={label} href={href} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setMobileOpen(false) }}>
              <Icon size={18} /><span>{label}</span>{badge && <b className="nav-badge">{badge}</b>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="side-label">ACCÈS RAPIDE</div>
          <button className="quick-link"><ExternalLink size={16} /> Ouvrir Chivion <ArrowUpRight size={14} /></button>
          <button className="quick-link"><CircleHelp size={16} /> Centre d’aide</button>
          <div className="shift-card">
            <div className="live-dot"><span /> QUART EN SERVICE</div>
            <strong>CAR 2 · Abidjan</strong>
            <small>Depuis 06:00 · 4 opérateurs</small>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button className="menu-trigger" onClick={() => setMobileOpen(true)} aria-label="Ouvrir le menu"><Menu size={21} /></button>
          <div className="breadcrumbs"><span>Centre de coordination</span><ChevronRight size={14} /><strong>{active}</strong></div>
          <div className="top-actions">
            <div className="search-box"><Search size={16} /><input aria-label="Rechercher" placeholder="Rechercher un incident..." /></div>
            <button className="icon-button notification" aria-label="Notifications"><Bell size={19} /><i /></button>
            <div className="operator"><div className="avatar">TA</div><div><strong>Toralou A.</strong><span>Chef de quart · CAR 2</span></div><ChevronRight size={16} /></div>
          </div>
        </header>

        <div className="page-wrap">
          <div className="page-heading">
            <div><div className="eyebrow"><span className="status-dot" /> SYSTÈME OPÉRATIONNEL · 14 NOV 2024</div><h1>Bonjour, Toralou <span>—</span></h1><p>Voici l’état de l’activité maritime sur vos zones de surveillance.</p></div>
            <Link className="primary-action" href="/nouvelle-alerte"><Plus size={18} /> Nouvelle alerte</Link>
          </div>

          <section className="kpi-grid" aria-label="Indicateurs clés">
            <Kpi icon={Siren} label="Alertes aujourd’hui" value="12" trend="+3" note="vs. hier" tone="red" />
            <Kpi icon={Anchor} label="Assistances" value="08" trend="+12 %" note="ce mois-ci" tone="blue" />
            <Kpi icon={ShieldCheck} label="Sauvetages" value="03" trend="Stable" note="ce mois-ci" tone="green" />
            <Kpi icon={Radio} label="Coordination en cours" value="05" trend="2 urgentes" note="à traiter" tone="amber" />
          </section>

          <div className="dashboard-grid">
            <section className="panel map-panel">
              <div className="panel-heading"><div><div className="eyebrow">SURVEILLANCE DES ZONES</div><h2>Carte des incidents</h2></div><button className="outline-button">Les 30 derniers jours <ChevronRight size={15} /></button></div>
              <div className="map-area">
                <div className="map-grid" /><div className="coast coast-one" /><div className="coast coast-two" />
                <div className="water-label label-abidjan">ABIDJAN</div><div className="water-label label-sanpedro">SAN PEDRO</div>
                <div className="hotspot hot-1"><span /><b>6</b></div><div className="hotspot hot-2"><span /><b>3</b></div><div className="hotspot hot-3"><span /><b>2</b></div><div className="hotspot hot-4"><span /><b>1</b></div>
                <div className="map-controls"><button aria-label="Zoom avant">+</button><button aria-label="Zoom arrière">−</button><button aria-label="Centrer"><Navigation size={15} /></button></div>
                <div className="map-legend"><span><i className="legend-dot high" /> Forte concentration</span><span><i className="legend-dot low" /> Incident isolé</span></div>
              </div>
              <div className="map-footer"><span><MapPin size={15} /> 2 zones surveillées</span><button className="text-button">Ouvrir la carte complète <ArrowUpRight size={14} /></button></div>
            </section>

            <section className="panel activity-panel">
              <div className="panel-heading"><div><div className="eyebrow">FLUX EN DIRECT</div><h2>Dernières alertes</h2></div><button className="more-button" aria-label="Plus d’options"><MoreHorizontal size={19} /></button></div>
              <div className="activity-list">{incidents.map((incident) => { const isClaimed = claimedIncident === incident.id; return <div className="activity-row" key={incident.id}><div className={`activity-icon ${incident.color}`}><AlertTriangle size={15} /></div><div className="activity-copy"><strong>{incident.type}</strong><span>{incident.place}</span><small>{incident.id} · {incident.time}</small></div><span className={`pill ${isClaimed ? 'amber' : incident.color}`}>{isClaimed ? 'Pris en charge' : incident.status}</span>{incident.status !== 'Clôturé' && <button className={`claim-button ${isClaimed ? 'claimed' : ''}`} onClick={() => setClaimedIncident(isClaimed ? null : incident.id)}>{isClaimed ? 'Libérer' : 'Prendre en charge'}</button>}</div> })}</div>
              <button className="panel-link">Voir toutes les alertes <ArrowUpRight size={14} /></button>
            </section>
          </div>

          <div className="bottom-grid">
            <section className="panel report-panel"><div className="panel-heading"><div><div className="eyebrow">OBLIGATION DE QUART</div><h2>Rapport de fin de journée</h2></div><FileText size={20} className="heading-icon" /></div><div className="report-status"><div className="report-ring"><Clock3 size={20} /></div><div><strong>Rapport du 14 novembre</strong><span>À compléter avant 18:00</span></div><span className="pill amber">Brouillon</span></div><div className="progress-line"><span style={{ width: '68%' }} /></div><div className="report-meta"><span>68 % complété</span><span>8 / 12 alertes intégrées</span></div><button className="secondary-action">Continuer la rédaction <ArrowUpRight size={15} /></button></section>
            <section className="panel meeting-panel"><div className="panel-heading"><div><div className="eyebrow">AGENDA OPÉRATIONNEL</div><h2>Prochaines réunions</h2></div><button className="plus-button" aria-label="Ajouter une réunion"><Plus size={17} /></button></div><div className="meeting-row"><div className="date-block"><strong>21</strong><span>NOV</span></div><div><strong>Réunion de coordination</strong><span>09:30 · Salle de briefing</span><small><Users size={13} /> 8 participants confirmés</small></div><ChevronRight size={17} className="row-arrow" /></div><div className="meeting-row"><div className="date-block muted-date"><strong>28</strong><span>NOV</span></div><div><strong>Comité sécurité maritime</strong><span>14:00 · Visioconférence</span><small><Users size={13} /> En attente de confirmation</small></div><ChevronRight size={17} className="row-arrow" /></div><button className="panel-link">Voir le calendrier <ArrowUpRight size={14} /></button></section>
          </div>

          <footer className="page-footer"><span><span className="footer-live" /> Données actualisées il y a moins d’une minute</span><span>Dernière synchronisation · 14:32:08 GMT</span></footer>
        </div>
      </main>
    </div>
  )
}

function Kpi({ icon: Icon, label, value, trend, note, tone }: { icon: typeof Siren; label: string; value: string; trend: string; note: string; tone: string }) {
  return <div className="kpi-card"><div className={`kpi-icon ${tone}`}><Icon size={18} /></div><div className="kpi-body"><span>{label}</span><strong>{value}</strong><small className={tone === 'red' ? 'up' : ''}>{trend} <em>{note}</em></small></div><ArrowUpRight className="kpi-arrow" size={16} /></div>
}
