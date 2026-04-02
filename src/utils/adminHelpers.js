export function downloadCSV(data, filename) {
  if (!data.length) return
  const keys = Object.keys(data[0])
  const rows = [keys.join(','), ...data.map(r => keys.map(k => {
    const v = Array.isArray(r[k]) ? r[k].join('; ') : r[k]
    return `"${String(v ?? '').replace(/"/g, '""')}"`
  }).join(','))]
  const blob = new Blob([rows.join('\n')], { type: 'text/csv' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = filename
  a.click()
}

export function fmt(date) {
  return new Date(date).toLocaleDateString('en-NG', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  })
}

export const CHART_COLORS = ['#F97316', '#111111', '#FBBF24', '#6b7280', '#d1d5db']
export const ORANGE = '#F97316'