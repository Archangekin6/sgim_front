'use client'

import { useState } from 'react'
import { OperationsPage, SectionCard } from '@/components/operations-page'

export default function Page() {
  const [created, setCreated] = useState(false)
  return <OperationsPage eyebrow="AGENDA OPÉRATIONNEL · 2 PROCHAINES RÉUNIONS" title="Réunions" description="Préparez les briefings, comptes-rendus et feuilles de présence." action="Planifier une réunion">
    <div className="content-grid">
      <SectionCard eyebrow="NOUVELLE RÉUNION" title="Planifier un briefing">
        <form className="operation-form" onSubmit={(event) => { event.preventDefault(); setCreated(true) }}>
          <div className="form-grid"><label>Objet<input required placeholder="Ex. Réunion de coordination" /></label><label>Date<input required type="date" /></label><label>Heure<input required type="time" /></label><label>Lieu<select required><option value="">Choisir un lieu</option><option>Salle de briefing</option><option>Visioconférence</option></select></label></div>
          <label>Participants<textarea required placeholder="Noms ou équipes invitées" /></label>
          <div className="form-actions"><button className="primary-action" type="submit">Créer la réunion</button></div>
          {created && <p className="success-message" role="status">Réunion créée et invitations préparées.</p>}
        </form>
      </SectionCard>
      <SectionCard eyebrow="AGENDA" title="Prochaines réunions"><div className="meeting-row"><div className="date-block"><strong>21</strong><span>NOV</span></div><div><strong>Réunion de coordination</strong><span>09:30 · Salle de briefing</span><small>8 participants confirmés</small></div></div><div className="meeting-row"><div className="date-block muted-date"><strong>28</strong><span>NOV</span></div><div><strong>Comité sécurité maritime</strong><span>14:00 · Visioconférence</span><small>En attente de confirmation</small></div></div></SectionCard>
    </div>
  </OperationsPage>
}
