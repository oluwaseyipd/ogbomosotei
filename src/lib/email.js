import { supabase } from './supabase'

async function invokeEmailFunction(fnName, payload) {
  try {
    const { error } = await supabase.functions.invoke(fnName, { body: payload })
    if (error) console.error(`[${fnName}] Email error:`, error.message)
  } catch (err) {
    console.error(`[${fnName}] Email error:`, err)
  }
}

async function addToNewsletter(email, firstName, lastName = '', source = '') {
  try {
    await supabase.from('newsletter_subscribers').insert([{
      email,
      first_name: firstName,
      last_name: lastName,
      source,
    }])
    // If email already exists, ignore the conflict silently
  } catch (err) {
    console.error('[newsletter] error:', err)
  }
}

export const sendRegistrationEmail = async (data) => {
  await invokeEmailFunction('send-registration-email', data)
  await addToNewsletter(data.email, data.first_name, data.last_name, 'registration')
}

export const sendVolunteerEmail = async (data) => {
  await invokeEmailFunction('send-volunteer-email', data)
  const firstName = data.full_name?.split(' ')[0] || ''
  const lastName = data.full_name?.split(' ').slice(1).join(' ') || ''
  await addToNewsletter(data.email, firstName, lastName, 'volunteer')
}

export const sendSponsorEmail = async (data) => {
  await invokeEmailFunction('send-sponsor-email', data)
  const firstName = data.contact_name?.split(' ')[0] || ''
  const lastName = data.contact_name?.split(' ').slice(1).join(' ') || ''
  await addToNewsletter(data.email, firstName, lastName, 'sponsor')
}

export const sendExhibitionEmail = async (data) => {
  await invokeEmailFunction('send-exhibition-email', data)
  const firstName = data.contact_name?.split(' ')[0] || ''
  const lastName = data.contact_name?.split(' ').slice(1).join(' ') || ''
  await addToNewsletter(data.email, firstName, lastName, 'exhibition')
}