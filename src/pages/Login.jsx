import { ArrowRight, Gavel } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import { createOrFindUser } from '../api/userApi'
import { saveUser } from '../utils/userStorage'

function Login() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const user = await createOrFindUser(name, email)
      saveUser(user)
      navigate('/', { replace: true })
    } catch (submissionError) {
      setError(submissionError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page page-shell">
      <section className="login-panel">
        <div className="login-brand"><span className="brand-mark"><Gavel size={20} strokeWidth={2.5} /></span><span>AuctionX</span></div>
        <p className="eyebrow">Your seat is waiting</p>
        <h1>Step onto the auction floor.</h1>
        <p className="login-copy">Enter your details to join live auctions and place bids.</p>
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="login-name">Name</label>
          <input id="login-name" onChange={(event) => setName(event.target.value)} placeholder="Your name" required value={name} />
          <label htmlFor="login-email">Email</label>
          <input id="login-email" onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required type="email" value={email} />
          <Button disabled={isSubmitting} type="submit">{isSubmitting ? 'Continuing...' : 'Continue'} <ArrowRight size={17} /></Button>
          {error && <p className="bid-error" role="alert">{error}</p>}
        </form>
      </section>
      <style>{`
        .login-page { align-items: center; display: flex; justify-content: center; min-height: calc(100vh - 76px); padding-bottom: 80px; padding-top: 80px; }
        .login-panel { background: linear-gradient(145deg, rgba(24, 32, 43, .96), rgba(18, 23, 32, .96)); border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--shadow); max-width: 520px; padding: clamp(28px, 7vw, 64px); width: 100%; }
        .login-brand { align-items: center; display: inline-flex; font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; gap: 10px; margin-bottom: 56px; }
        .login-brand .brand-mark { background: var(--primary-accent); border-radius: 10px; color: #071512; display: inline-flex; height: 36px; justify-content: center; padding: 8px; width: 36px; }
        .login-panel h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.3rem, 7vw, 4.6rem); letter-spacing: -.05em; line-height: .98; margin: 12px 0 18px; }
        .login-copy { color: var(--muted-text); line-height: 1.6; margin: 0; }
        .login-form { display: grid; gap: 9px; margin-top: 30px; }
        .login-form label { font-size: .88rem; font-weight: 600; margin-top: 9px; }
        .login-form input { background: var(--surface-raised); border: 1px solid var(--border); border-radius: 9px; color: var(--text); outline: 0; padding: 13px 14px; width: 100%; }
        .login-form input:focus { border-color: var(--primary-accent); }
        .login-form .button { justify-content: center; margin-top: 14px; }
      `}</style>
    </main>
  )
}

export default Login