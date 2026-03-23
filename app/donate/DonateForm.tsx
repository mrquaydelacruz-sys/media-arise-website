'use client'

import type {FormEvent} from 'react'
import {useMemo, useState} from 'react'

const PRESETS_CENTS = [25_00, 50_00, 100_00]

type DonateFormProps = {
  currency: string
}

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(cents / 100)
}

export default function DonateForm({currency}: DonateFormProps) {
  const [selectedCents, setSelectedCents] = useState<number>(PRESETS_CENTS[1])
  const [custom, setCustom] = useState('')
  const [useCustom, setUseCustom] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const amountCents = useMemo(() => {
    if (!useCustom) return selectedCents
    const n = Number.parseFloat(custom.replace(/,/g, ''))
    if (!Number.isFinite(n) || n <= 0) return 0
    return Math.round(n * 100)
  }, [custom, selectedCents, useCustom])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (amountCents < 100) {
      setError('Enter at least $1.00')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-donation-checkout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({amountCents, currency}),
      })
      const data = (await res.json()) as {url?: string; error?: string}
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Could not start checkout')
      }
      window.location.href = data.url
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg"
    >
      <p className="mb-6 text-sm leading-relaxed text-gray-600">
        Gifts are processed securely by Stripe. Your payment details are handled only by Stripe,
        not stored on this site.
      </p>

      <fieldset className="mb-6">
        <legend className="mb-3 text-sm font-medium text-gray-900">Amount</legend>
        <div className="flex flex-wrap gap-2">
          {PRESETS_CENTS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setUseCustom(false)
                setSelectedCents(c)
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !useCustom && selectedCents === c
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {formatMoney(c, currency)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setUseCustom(true)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              useCustom
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Other
          </button>
        </div>
        {useCustom && (
          <label className="mt-4 block">
            <span className="mb-1 block text-xs text-gray-500">Custom amount</span>
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900"
            />
          </label>
        )}
      </fieldset>

      <p className="mb-4 text-center text-lg font-semibold text-gray-900">
        {formatMoney(amountCents > 0 ? amountCents : 0, currency)}
      </p>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || amountCents < 100}
        className="w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Redirecting…' : 'Donate with card'}
      </button>
    </form>
  )
}
