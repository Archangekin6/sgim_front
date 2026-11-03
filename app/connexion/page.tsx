"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { ArrowLeft, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react"

export default function ConnexionPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="auth-page">
      <section className="auth-brand-panel" aria-label="Présentation de SGIM">
        <Link href="/" className="auth-back-link">
          <ArrowLeft size={16} /> Retour au tableau de bord
        </Link>
        <div className="auth-brand-content">
          <div className="brand-mark auth-mark">S</div>
          <span className="auth-eyebrow">SGIM • Centre opérationnel</span>
          <h1>Un pilotage clair, même dans l&apos;urgence.</h1>
          <p>Retrouvez vos alertes, équipes et opérations depuis un espace sécurisé pensé pour le terrain.</p>
          <div className="auth-trust-list">
            <div><ShieldCheck size={18} /><span>Accès sécurisé aux opérations</span></div>
            <div><LockKeyhole size={18} /><span>Données protégées et traçables</span></div>
          </div>
        </div>
        <span className="auth-version">SGIM v2.4.0</span>
      </section>

      <section className="auth-form-panel">
        <div className="auth-form-wrap">
          <div className="mobile-brand"><div className="brand-mark">S</div><span>SGIM</span></div>
          <div className="auth-heading">
            <span className="auth-kicker">Espace opérationnel</span>
            <h2>Bon retour parmi nous</h2>
            <p>Connectez-vous pour accéder à votre centre de coordination.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="email">Adresse e-mail</label>
            <div className="auth-input-wrap">
              <Mail size={18} aria-hidden="true" />
              <input id="email" name="email" type="email" placeholder="prenom.nom@organisation.fr" autoComplete="email" required />
            </div>

            <div className="auth-label-row">
              <label htmlFor="password">Mot de passe</label>
              <Link href="/mot-de-passe-oublie">Mot de passe oublié&nbsp;?</Link>
            </div>
            <div className="auth-input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="••••••••••••" autoComplete="current-password" minLength={8} required />
              <button type="button" className="password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label className="remember-row"><input type="checkbox" name="remember" /> <span>Garder ma session ouverte</span></label>
            {submitted && <p className="auth-notice" role="status">Votre demande de connexion a été enregistrée.</p>}
            <button className="auth-submit" type="submit">Se connecter <span aria-hidden="true">→</span></button>
          </form>

          <p className="auth-help">Vous n&apos;avez pas encore de compte&nbsp;? <Link href="/inscription">Demander un accès</Link></p>
          <p className="auth-legal">En vous connectant, vous acceptez les conditions d&apos;utilisation et la politique de confidentialité de SGIM.</p>
        </div>
      </section>
    </main>
  )
}
