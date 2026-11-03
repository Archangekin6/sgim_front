'use client'

import { FormEvent, useState } from 'react'
import { AlertCircle, Check, ChevronRight, Clock3, MapPin, Radio, ShieldAlert } from 'lucide-react'
import { DataTable, OperationsPage, SectionCard } from '@/components/operations-page'

const incidents = [
  { title: 'Assistance médicale', meta: 'INC-2024-084 · Port d’Abidjan · reçu à 11:42', status: 'Urgent', tone: 'red' },
  { title: 'Sûreté maritime', meta: 'INC-2024-083 · Large Grand-Bassam · reçu à 10:18', status: 'À qualifier', tone: 'amber' },
  { title: 'Avarie moteur', meta: 'INC-2024-082 · Canal de Vridi · reçu à 09:56', status: 'En cours', tone: 'blue' },
]

export default function Page() {
  const [submitted, setSubmitted] = useState(false)
  const [priority, setPriority] = useState('Élevée')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <OperationsPage eyebrow="CENTRE DE RÉCEPTION · 3 ALERTES À TRAITER" title="Nouvelle alerte" description="Capturez les informations essentielles pour déclencher la bonne réponse opérationnelle." action="Nouvelle alerte">
      <div className="alert-page-intro">
        <div className="alert-intro-icon"><ShieldAlert size={22} /></div>
        <div><strong>Un signalement vient d’être reçu ?</strong><span>Commencez par qualifier le niveau d’urgence, puis renseignez la position et les faits observés.</span></div>
        <div className="alert-intro-step"><b>1</b><span>sur 3</span></div>
      </div>

      <div className="content-grid alert-layout">
        <SectionCard eyebrow="NOUVEAU SIGNALEMENT" title="Créer une alerte" action={<span className="draft-pill"><span />Brouillon automatique</span>}>
          <form className="alert-form redesigned-form" onSubmit={handleSubmit}>
            <div className="form-section-heading"><span>01</span><div><strong>Origine du signalement</strong><small>Comment l’information est-elle arrivée au centre ?</small></div></div>
            <div className="form-two-col">
              <label>Type d&apos;incident<select name="type" defaultValue="Assistance médicale"><option>Assistance médicale</option><option>Sûreté maritime</option><option>Avarie moteur</option><option>Pollution</option></select></label>
              <label>Canal de réception<select name="channel" defaultValue="Téléphone"><option>Téléphone</option><option>Radio VHF</option><option>Chivion</option><option>Vision</option></select></label>
            </div>

            <div className="form-section-heading"><span>02</span><div><strong>Niveau de priorité</strong><small>Le niveau peut être réévalué pendant la qualification.</small></div></div>
            <div className="priority-grid" role="radiogroup" aria-label="Niveau de priorité">
              {['Critique', 'Élevée', 'Normale'].map((level) => <button key={level} type="button" className={`priority-option ${priority === level ? 'selected' : ''} ${level === 'Critique' ? 'critical' : ''}`} onClick={() => setPriority(level)} role="radio" aria-checked={priority === level}><span className="priority-dot" /><span><b>{level}</b><small>{level === 'Critique' ? 'Danger immédiat' : level === 'Élevée' ? 'Intervention rapide' : 'Suivi standard'}</small></span>{priority === level && <Check size={15} />}</button>)}
            </div>

            <div className="form-section-heading"><span>03</span><div><strong>Position et circonstances</strong><small>Ces informations permettent d’orienter les moyens disponibles.</small></div></div>
            <label>Localisation <span className="label-hint"><MapPin size={12} /> Position estimée</span><input name="location" placeholder="Ex. Port d’Abidjan, quai 4" required /></label>
            <label>Description des faits<textarea name="description" placeholder="Décrivez les faits, le navire et les personnes impliquées…" rows={4} required /></label>
            <div className="form-meta-row"><span><Clock3 size={13} /> Réception : aujourd’hui à 12:04</span><span><Radio size={13} /> Canal sécurisé</span></div>
            <div className="form-actions"><button className="primary-action" type="submit">Enregistrer et qualifier <ChevronRight size={15} /></button><button className="secondary-action" type="reset" onClick={() => { setSubmitted(false); setPriority('Élevée') }}>Réinitialiser</button></div>
            {submitted && <p className="success-message" role="status"><Check size={15} /> Alerte enregistrée dans la file de qualification.</p>}
          </form>
        </SectionCard>

        <div className="alert-side-column">
          <SectionCard eyebrow="À QUALIFIER" title="File des signalements" action={<span className="queue-count">3 en attente</span>}><DataTable rows={incidents} /></SectionCard>
          <SectionCard eyebrow="REPÈRE OPÉRATIONNEL" title="Avant de transmettre"><div className="check-list"><div><b>01</b><span>Confirmer l’heure et le canal de réception</span></div><div><b>02</b><span>Localiser le navire ou la zone concernée</span></div><div><b>03</b><span>Décrire le risque pour les personnes</span></div></div><div className="protocol-note"><AlertCircle size={16} /><span>En cas de danger immédiat, sélectionnez <b>Critique</b> pour notifier le superviseur.</span></div></SectionCard>
        </div>
      </div>
    </OperationsPage>
  )
}
