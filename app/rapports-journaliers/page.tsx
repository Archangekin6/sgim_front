'use client'

import { useState } from 'react'
import { OperationsPage, SectionCard } from '@/components/operations-page'

export default function Page() {
  const [saved, setSaved] = useState(false)
  return <OperationsPage eyebrow="OBLIGATION DE QUART · CAR 2" title="Rapports journaliers" description="Rédigez, signez et transmettez le rapport de fin de journée." action="Nouveau rapport">
    <div className="content-grid">
      <SectionCard eyebrow="RAPPORT À COMPLÉTER" title="Rapport du 14 novembre">
        <form className="report-editor operation-form" onSubmit={(event) => { event.preventDefault(); setSaved(true) }}>
          <label>Équipe de quart<select required><option value="">Sélectionner une équipe</option><option>CAR 2 · Abidjan</option><option>MRSC · San Pedro</option></select></label>
          <label>Synthèse opérationnelle<textarea required minLength={20} placeholder="Décrivez les faits marquants du quart..." /></label>
          <div className="form-actions"><button className="secondary-action" type="button" onClick={() => setSaved(true)}>Enregistrer le brouillon</button><button className="primary-action" type="submit">Signer et transmettre</button></div>
          {saved && <p className="success-message" role="status">Rapport enregistré. Il est prêt pour validation par le chef de quart.</p>}
        </form>
      </SectionCard>
      <SectionCard eyebrow="HISTORIQUE" title="Rapports transmis"><div className="contact-list"><div><strong>13 novembre 2024 · CAR 2</strong><span>Validé par Toralou A. · Transmis à 18:04</span></div><div><strong>12 novembre 2024 · CAR 2</strong><span>Validé par Kouassi M. · Transmis à 18:01</span></div></div></SectionCard>
    </div>
  </OperationsPage>
}
