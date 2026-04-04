import { supabase } from './supabase'

async function invokeEmailFunction(fnName, payload) {
  try {
    const { error } = await supabase.functions.invoke(fnName, { body: payload })
    if (error) console.error(`[${fnName}] Email error:`, error.message)
  } catch (err) {
    // Email failure should never block the user's form submission
    console.error(`[${fnName}] Email error:`, err)
  }
}

export const sendRegistrationEmail = (data) =>
  invokeEmailFunction('send-registration-email', data)

export const sendVolunteerEmail = (data) =>
  invokeEmailFunction('send-volunteer-email', data)

export const sendSponsorEmail = (data) =>
  invokeEmailFunction('send-sponsor-email', data)

export const sendExhibitionEmail = (data) =>
  invokeEmailFunction('send-exhibition-email', data)