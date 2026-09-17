import { useState } from 'react'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/common/Button'

const initialForm = {
  itemName: '',
  description: '',
  startingPrice: '',
  category: '',
  endTime: '',
}

function CreateAuction() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
    setSuccess(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}
    const startingPrice = Number(form.startingPrice)

    if (!form.itemName.trim()) nextErrors.itemName = 'Item name is required.'
    if (!form.description.trim()) nextErrors.description = 'Description is required.'
    if (!Number.isFinite(startingPrice) || startingPrice <= 0) nextErrors.startingPrice = 'Starting price must be positive.'
    if (!form.category) nextErrors.category = 'Choose a category.'
    if (!form.endTime || new Date(form.endTime).getTime() <= Date.now()) nextErrors.endTime = 'End time must be in the future.'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) setSuccess(true)
  }

  return (
    <main className="support-page page-shell">
      <style>{`
        .support-page { padding-bottom: 96px; padding-top: 48px; }
        .support-header { margin-bottom: 30px; max-width: 720px; }
        .support-header h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.4rem, 6vw, 4.8rem); letter-spacing: -.05em; line-height: .95; margin: 12px 0 16px; }
        .support-header p:not(.eyebrow) { color: var(--muted-text); font-size: 1.05rem; line-height: 1.6; margin: 0; }
        .form-panel { background: linear-gradient(145deg, rgba(24, 32, 43, .92), rgba(18, 23, 32, .92)); border: 1px solid var(--border); border-radius: 16px; max-width: 920px; padding: clamp(22px, 4vw, 40px); }
        .auction-form { display: grid; gap: 22px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .form-field { display: flex; flex-direction: column; gap: 8px; }
        .form-field-wide { grid-column: span 2; }
        .form-field label { font-size: .9rem; font-weight: 600; }
        .form-field input, .form-field textarea, .form-field select { background: var(--surface-raised); border: 1px solid var(--border); border-radius: 8px; color: var(--text); font: inherit; min-height: 46px; outline: none; padding: 11px 13px; width: 100%; }
        .form-field textarea { min-height: 130px; resize: vertical; }
        .form-field input:focus, .form-field textarea:focus, .form-field select:focus { border-color: var(--primary-accent); box-shadow: 0 0 0 2px rgba(85, 214, 190, .14); }
        .field-error { color: var(--danger); font-size: .82rem; margin: 0; }
        .form-actions { align-items: center; border-top: 1px solid var(--border); display: flex; gap: 14px; grid-column: span 2; justify-content: space-between; padding-top: 22px; }
        .cancel-link { align-items: center; color: var(--muted-text); display: inline-flex; font-size: .9rem; gap: 7px; text-decoration: none; }
        .cancel-link:hover { color: var(--text); }
        .success-message { align-items: center; background: rgba(85, 214, 190, .1); border: 1px solid rgba(85, 214, 190, .28); border-radius: 8px; color: var(--success); display: flex; font-size: .9rem; gap: 8px; grid-column: span 2; padding: 12px 14px; }
        @media (max-width: 600px) { .support-page { padding-bottom: 60px; padding-top: 32px; } .auction-form { grid-template-columns: 1fr; } .form-field-wide, .form-actions, .success-message { grid-column: auto; } .form-actions { align-items: stretch; flex-direction: column-reverse; } .form-actions .button { width: 100%; } .cancel-link { justify-content: center; min-height: 42px; } }
      `}</style>
      <header className="support-header">
        <p className="eyebrow">Open the floor</p>
        <h1>Create an auction</h1>
        <p>Bring something remarkable to the AuctionX community. Set the terms, choose your timing, and let the room decide.</p>
      </header>
      <section className="form-panel">
        <form className="auction-form" onSubmit={handleSubmit} noValidate>
          {success && <p className="success-message" role="status"><CheckCircle2 size={17} /> Auction created successfully (demo)</p>}
          <div className="form-field form-field-wide">
            <label htmlFor="itemName">Item name</label>
            <input id="itemName" name="itemName" onChange={handleChange} value={form.itemName} />
            {errors.itemName && <p className="field-error" role="alert">{errors.itemName}</p>}
          </div>
          <div className="form-field form-field-wide">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" onChange={handleChange} value={form.description} />
            {errors.description && <p className="field-error" role="alert">{errors.description}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="startingPrice">Starting price (INR)</label>
            <input id="startingPrice" min="1" name="startingPrice" onChange={handleChange} step="1" type="number" value={form.startingPrice} />
            {errors.startingPrice && <p className="field-error" role="alert">{errors.startingPrice}</p>}
          </div>
          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" onChange={handleChange} value={form.category}>
              <option value="">Select category</option>
              <option>Electronics</option>
              <option>Gaming</option>
              <option>Collectibles</option>
              <option>Fashion</option>
              <option>Other</option>
            </select>
            {errors.category && <p className="field-error" role="alert">{errors.category}</p>}
          </div>
          <div className="form-field form-field-wide">
            <label htmlFor="endTime">Auction end date and time</label>
            <input id="endTime" name="endTime" onChange={handleChange} type="datetime-local" value={form.endTime} />
            {errors.endTime && <p className="field-error" role="alert">{errors.endTime}</p>}
          </div>
          <div className="form-actions">
            <Link className="cancel-link" to="/auctions"><ArrowLeft size={16} /> Cancel and return</Link>
            <Button type="submit">Create Auction</Button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateAuction