import { useState, useEffect } from 'react'
import { calendarData, ActivityLevel } from '../lib/calendar'

interface DayForecast {
  date: string
  tempMaxC: number
  tempMinC: number
  precipitationMm: number
  windSpeedMaxKmh: number
  windDirectionDeg: number
  avgTempC: number
  fishingScore: number
  fishingLabel: 'Poor' | 'Fair' | 'Good' | 'Excellent'
}

function calcFishingScore(avgTemp: number, wind: number, precip: number): number {
  let score = 5
  // Temperature factor
  if (avgTemp >= 12 && avgTemp <= 20) score += 2
  else if ((avgTemp >= 8 && avgTemp < 12) || (avgTemp > 20 && avgTemp <= 24)) score += 1
  else if ((avgTemp >= 4 && avgTemp < 8) || (avgTemp > 24 && avgTemp <= 27)) score += 0
  else score -= 1
  // Wind factor
  if (wind >= 8 && wind <= 20) score += 2
  else if (wind >= 21 && wind <= 30) score += 1
  else if (wind >= 5 && wind < 8) score += 0
  else if (wind >= 31 && wind <= 40) score -= 1
  else score -= 2
  // Precipitation factor
  if (precip >= 0 && precip <= 2) score += 1
  else if (precip > 2 && precip <= 8) score += 0
  else if (precip > 8 && precip <= 15) score -= 1
  else score -= 2
  return Math.max(1, Math.min(10, score))
}

function getFishingLabel(score: number): 'Poor' | 'Fair' | 'Good' | 'Excellent' {
  if (score <= 3) return 'Poor'
  if (score <= 5) return 'Fair'
  if (score <= 8) return 'Good'
  return 'Excellent'
}

function getScoreColor(score: number): string {
  if (score <= 3) return '#D4261C'
  if (score <= 5) return '#C8A84B'
  if (score <= 8) return '#2E7D32'
  return '#C8A84B' // gold for 9-10
}

const activityColors: Record<ActivityLevel, string> = {
  HOT: '#D4261C',
  ACTIVE: '#C8A84B',
  SLOW: '#4A6A82',
  CLOSED: '#1A2E42',
}

const activityEmojisFr: Record<ActivityLevel, string> = {
  HOT: '🔴 Pic',
  ACTIVE: '🟠 Actif',
  SLOW: '⚫ Lent',
  CLOSED: '⚪ Fermé',
}

const activityEmojisEn: Record<ActivityLevel, string> = {
  HOT: '🔴 Peak',
  ACTIVE: '🟠 Active',
  SLOW: '⚫ Slow',
  CLOSED: '⚪ Closed',
}

interface WeatherRegion {
  lat: number
  lon: number
  label: string
}

const REGIONS: WeatherRegion[] = [
  { lat: 45.55, lon: -73.55, label: 'Montréal / Saint-Laurent Ouest' },
  { lat: 46.20, lon: -72.85, label: 'Sorel-Tracy / Lac Saint-Pierre' },
  { lat: 45.48, lon: -75.70, label: 'Gatineau / Rivière des Outaouais' },
  { lat: 45.45, lon: -74.00, label: 'Oka / Lac des Deux Montagnes' },
  { lat: 48.35, lon: -74.98, label: 'La Tuque / Réservoir Gouin' },
  { lat: 48.52, lon: -72.00, label: 'Roberval / Lac Saint-Jean' },
  { lat: 45.12, lon: -72.23, label: 'Magog / Lac Memphrémagog' },
  { lat: 45.05, lon: -73.12, label: 'Venise-en-Québec / Lac Champlain' },
  { lat: 45.32, lon: -73.27, label: 'Saint-Jean-sur-Richelieu' },
  { lat: 47.80, lon: -69.54, label: 'Rivière-du-Loup / Saint-Laurent Est' },
  { lat: 46.50, lon: -75.50, label: 'Gatineau / Hull' },
  { lat: 47.50, lon: -73.50, label: 'Shawinigan / Saint-Maurice' },
  { lat: 47.20, lon: -79.50, label: 'Ville-Marie / Témiscamingue' },
  { lat: 48.70, lon: -79.20, label: 'La Sarre / Abitibi' },
  { lat: 48.90, lon: -65.50, label: 'Gaspé / Côte Gaspésienne' },
]

interface CalendarSectionProps {
  locale: 'fr' | 'en'
  weatherRegion?: WeatherRegion
}

interface Weather {
  temp: number
  wind: number
  precip: number
  winddir: number
  desc: string
}

function WindDir(deg: number): string {
  const dirs = ['N','NE','E','SE','S','SO','O','NO']
  return dirs[Math.round(deg / 45) % 8]
}

function WindDirEn(deg: number): string {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

function getScore(temp: number, wind: number, month: number): number {
  let score = 5
  if ([4,5,8,9].includes(month)) score += 2
  else if ([3,6,7,10].includes(month)) score += 1
  if (temp >= 10 && temp <= 22) score += 2
  else if (temp < 5 || temp > 28) score -= 2
  if (wind < 15) score += 1
  else if (wind > 30) score -= 2
  return Math.max(1, Math.min(10, score))
}

function getBestFishingTimes(month: number): { dawn: string; dusk: string } {
  const times: Record<number, { sunrise: string; sunset: string }> = {
    0:  { sunrise: '7:30', sunset: '16:30' },
    1:  { sunrise: '7:00', sunset: '17:15' },
    2:  { sunrise: '6:30', sunset: '19:00' },
    3:  { sunrise: '6:15', sunset: '19:45' },
    4:  { sunrise: '5:45', sunset: '20:20' },
    5:  { sunrise: '5:30', sunset: '20:45' },
    6:  { sunrise: '5:45', sunset: '20:40' },
    7:  { sunrise: '6:15', sunset: '20:00' },
    8:  { sunrise: '6:50', sunset: '19:00' },
    9:  { sunrise: '7:25', sunset: '18:00' },
    10: { sunrise: '7:00', sunset: '16:45' },
    11: { sunrise: '7:30', sunset: '16:15' },
  }
  const t = times[month] || times[2]
  function addHour(time: string, h: number): string {
    const [hr, min] = time.split(':').map(Number)
    const total = hr * 60 + min + h * 60
    const newHr = Math.floor(total / 60) % 24
    const newMin = total % 60
    return `${newHr}:${newMin.toString().padStart(2, '0')}`
  }
  return {
    dawn: addHour(t.sunrise, 1),
    dusk: addHour(t.sunset, -1),
  }
}

export function CalendarSection({ locale, weatherRegion }: CalendarSectionProps) {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0)
  const [forecasts, setForecasts] = useState<DayForecast[]>([])
  const [selectedDay, setSelectedDay] = useState(0)

  // Region: use prop if set (from map click), otherwise use local selector
  const region = weatherRegion ?? REGIONS[selectedRegionIdx]

  useEffect(() => {
    setLoading(true)
    setWeather(null)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation&timezone=America/Toronto`)
      .then(r => r.json())
      .then(data => {
        const c = data.current
        const temp = Math.round(c.temperature_2m)
        const wind = Math.round(c.wind_speed_10m)
        const winddir = Math.round(c.wind_direction_10m)
        const precip = c.precipitation ?? 0
        let descFr = '☀️ Clair'
        let descEn = '☀️ Clear'
        if (precip > 5) { descFr = '🌧️ Pluie'; descEn = '🌧️ Rain' }
        else if (precip > 0) { descFr = '🌦️ Averses'; descEn = '🌦️ Showers' }
        else if (wind > 30) { descFr = '💨 Venteux'; descEn = '💨 Windy' }
        else if (temp < 5) { descFr = '❄️ Froid'; descEn = '❄️ Cold' }
        setWeather({ temp, wind, precip, winddir, desc: locale === 'fr' ? descFr : descEn })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [region.lat, region.lon, locale])

  // 7-day forecast
  useEffect(() => {
    const dailyUrl = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=America/Toronto&forecast_days=7`
    fetch(dailyUrl)
      .then(r => r.json())
      .then(data => {
        const d = data.daily
        const days: DayForecast[] = d.time.map((date: string, i: number) => {
          const tempMaxC = d.temperature_2m_max[i] ?? 10
          const tempMinC = d.temperature_2m_min[i] ?? 5
          const precipitationMm = d.precipitation_sum[i] ?? 0
          const windSpeedMaxKmh = d.wind_speed_10m_max[i] ?? 15
          const windDirectionDeg = d.wind_direction_10m_dominant[i] ?? 180
          const avgTempC = (tempMaxC + tempMinC) / 2
          const fishingScore = calcFishingScore(avgTempC, windSpeedMaxKmh, precipitationMm)
          return {
            date,
            tempMaxC: Math.round(tempMaxC),
            tempMinC: Math.round(tempMinC),
            precipitationMm: Math.round(precipitationMm * 10) / 10,
            windSpeedMaxKmh: Math.round(windSpeedMaxKmh),
            windDirectionDeg,
            avgTempC: Math.round(avgTempC * 10) / 10,
            fishingScore,
            fishingLabel: getFishingLabel(fishingScore),
          }
        })
        setForecasts(days)
      })
      .catch(() => {})
  }, [region.lat, region.lon])

  const month = calendarData[selectedMonth]
  const now = new Date()
  const todayMonth = now.getMonth()
  const fishingScore = weather ? getScore(weather.temp, weather.wind, todayMonth) : null
  const bestTimes = getBestFishingTimes(todayMonth)
  const activityEmojis = locale === 'fr' ? activityEmojisFr : activityEmojisEn

  const monthNamesFr = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
  const monthNamesEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const monthNames = locale === 'fr' ? monthNamesFr : monthNamesEn

  return (
    <div className="max-w-6xl mx-auto px-4 pb-10">
      {/* FIX 2 — Show selected region in header */}
      <div style={{ marginBottom: '1rem' }}>
        <h2 className="text-3xl font-bold mb-1" style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)' }}>
          {locale === 'fr' ? 'CONDITIONS DU JOUR' : "TODAY'S CONDITIONS"}
        </h2>
        <div style={{ fontSize: '1rem', color: 'var(--accent)', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
          {new Date().toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          }).toUpperCase()}
        </div>
        <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            {locale === 'fr' ? '📍 Région:' : '📍 Region:'}
          </span>
          {!weatherRegion && (
            <select
              value={selectedRegionIdx}
              onChange={e => setSelectedRegionIdx(Number(e.target.value))}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                borderRadius: '4px',
                padding: '0.25rem 0.5rem',
                fontSize: '0.8rem',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                maxWidth: '220px',
              }}
            >
              {REGIONS.map((r, i) => (
                <option key={i} value={i}>{r.label}</option>
              ))}
            </select>
          )}
          {weatherRegion && (
            <span style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 600 }}>
              {region.label}
            </span>
          )}
        </div>
      </div>

      {/* Live weather dashboard */}
      {loading ? (
        <div style={{ padding: '1.5rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '1.5rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          {locale === 'fr' ? 'Chargement des conditions météo...' : 'Loading weather conditions...'}
        </div>
      ) : weather ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {/* Temp */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              {locale === 'fr' ? 'Température' : 'Temperature'}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>{weather.temp}°C</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{weather.desc}</div>
          </div>
          {/* Wind */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              {locale === 'fr' ? 'Vent' : 'Wind'}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: weather.wind > 30 ? '#D4261C' : 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>{weather.wind} km/h</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {locale === 'fr' ? `Direction ${WindDir(weather.winddir)}` : `Direction ${WindDirEn(weather.winddir)}`}
            </div>
          </div>
          {/* Precipitation */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              {locale === 'fr' ? 'Précipitation' : 'Precipitation'}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>{weather.precip} mm</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {weather.precip === 0
                ? (locale === 'fr' ? 'Sec' : 'Dry')
                : (locale === 'fr' ? 'Précipitation actuelle' : 'Current precipitation')}
            </div>
          </div>
          {/* Best fishing time */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              {locale === 'fr' ? 'Meilleure heure de pêche' : 'Best fishing time'}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>
              🌅 {bestTimes.dawn} · 🌆 {bestTimes.dusk}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
              {locale === 'fr' ? 'Aube · Crépuscule' : 'Dawn · Dusk'}
            </div>
          </div>
          {/* Fishing score */}
          <div style={{ background: 'var(--surface)', border: `2px solid ${fishingScore! >= 7 ? '#D4261C' : 'var(--border)'}`, borderRadius: '8px', padding: '1rem', textAlign: 'center', gridColumn: 'span 2' }}>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              {locale === 'fr' ? "Score de pêche aujourd'hui" : "Today's fishing score"}
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 700, color: fishingScore! >= 7 ? '#D4261C' : fishingScore! >= 5 ? 'var(--accent-gold)' : 'var(--text-secondary)', fontFamily: 'Oswald, sans-serif', lineHeight: 1 }}>
              {fishingScore}/10
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              {locale === 'fr'
                ? (fishingScore! >= 8 ? '🔥 Excellent — sortez ce soir!' : fishingScore! >= 6 ? '✅ Bon — conditions favorables' : fishingScore! >= 4 ? '⚠️ Moyen — essayez tôt le matin' : '❌ Difficile — attendez de meilleures conditions')
                : (fishingScore! >= 8 ? '🔥 Excellent — get out tonight!' : fishingScore! >= 6 ? '✅ Good — favorable conditions' : fishingScore! >= 4 ? '⚠️ Average — try early morning' : '❌ Difficult — wait for better conditions')}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          {locale === 'fr' ? 'Conditions météo temporairement indisponibles' : 'Weather conditions temporarily unavailable'}
        </div>
      )}

      {/* 7-Day Forecast Row */}
      {forecasts.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>
            {locale === 'fr' ? 'PRÉVISIONS 7 JOURS' : '7-DAY FORECAST'}
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {forecasts.map((day, i) => {
              const dateObj = new Date(day.date + 'T12:00:00')
              const dayName = dateObj.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', { weekday: 'short' })
              const scoreColor = getScoreColor(day.fishingScore)
              const isSelected = selectedDay === i
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(i)}
                  style={{
                    flexShrink: 0,
                    minWidth: '80px',
                    padding: '0.6rem 0.5rem',
                    borderRadius: '8px',
                    background: isSelected ? 'var(--surface)' : 'var(--bg-elevated)',
                    border: isSelected ? `2px solid ${scoreColor}` : '1px solid var(--border)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    {i === 0 ? (locale === 'fr' ? "Auj." : 'Today') : dayName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {day.tempMaxC}° / {day.tempMinC}°
                  </div>
                  <div style={{
                    marginTop: '0.3rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    fontFamily: 'Oswald, sans-serif',
                    color: scoreColor,
                  }}>
                    {day.fishingScore}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: scoreColor, marginTop: '0.1rem' }}>
                    {locale === 'fr'
                      ? (day.fishingLabel === 'Poor' ? 'Faible' : day.fishingLabel === 'Fair' ? 'Moyen' : day.fishingLabel === 'Good' ? 'Bon' : 'Excellent')
                      : day.fishingLabel}
                  </div>
                </button>
              )
            })}
          </div>
          {/* Selected day detail */}
          {forecasts[selectedDay] && (
            <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { label: locale === 'fr' ? 'Temp max' : 'Temp max', value: `${forecasts[selectedDay].tempMaxC}°C` },
                { label: locale === 'fr' ? 'Temp min' : 'Temp min', value: `${forecasts[selectedDay].tempMinC}°C` },
                { label: locale === 'fr' ? 'Vent max' : 'Max wind', value: `${forecasts[selectedDay].windSpeedMaxKmh} km/h` },
                { label: locale === 'fr' ? 'Précip.' : 'Precip.', value: `${forecasts[selectedDay].precipitationMm} mm` },
                { label: locale === 'fr' ? 'Score pêche' : 'Fish score', value: `${forecasts[selectedDay].fishingScore}/10` },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'Oswald, sans-serif' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Month selector */}
      <h3 style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>
        {locale === 'fr' ? 'CALENDRIER PAR MOIS' : 'MONTHLY CALENDAR'}
      </h3>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2 mb-6">
        {calendarData.map((m, i) => (
          <button
            key={i}
            onClick={() => setSelectedMonth(i)}
            style={{
              background: selectedMonth === i ? 'var(--accent)' : i === todayMonth ? 'rgba(212,38,28,0.15)' : 'var(--surface)',
              border: `1px solid ${selectedMonth === i ? 'var(--accent)' : i === todayMonth ? 'rgba(212,38,28,0.4)' : 'var(--border)'}`,
              color: 'var(--text-primary)',
              padding: '0.4rem',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontFamily: 'Oswald, sans-serif',
              transition: 'all 0.15s',
            }}
          >
            {monthNames[i]}
            {i === todayMonth && (
              <div style={{ fontSize: '0.6rem', color: selectedMonth === i ? 'white' : 'var(--accent)' }}>
                {locale === 'fr' ? "● AUJOURD'HUI" : '● TODAY'}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected month detail */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--text-primary)', fontSize: '1.3rem', margin: 0 }}>
            {month.month.toUpperCase()}
          </h3>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {month.iceStatus} · {month.waterTemp}
          </div>
        </div>
        {month.notes && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem', fontStyle: 'italic' }}>
            {month.notes}
          </p>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {month.activities.map(({ species: fish, level }) => (
            <div key={fish} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.6rem', background: 'var(--bg-elevated)', borderRadius: '4px' }}>
              <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>{fish}</span>
              <span style={{ fontSize: '0.75rem', color: activityColors[level], fontWeight: 600 }}>
                {activityEmojis[level]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
