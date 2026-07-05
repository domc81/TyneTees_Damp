// =============================================================================
// Offline layer — public exports.
//
// Wizard-only local-first data layer. Do NOT route office surfaces (costing,
// reports, quotations, Kanban, calendar, admin) through anything here.
// =============================================================================

export * from './db'
export * from './connectivity'
export * from './outbox'
export * from './profile-cache'
