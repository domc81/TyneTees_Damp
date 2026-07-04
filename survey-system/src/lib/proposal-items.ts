// =============================================================================
// Predefined Proposal Items — Quick-select for surveyors
// Based on client requirements (Steven's ChatGPT demo)
// =============================================================================

export interface ProposalItem {
  id: string
  label: string
  text: string
  category: 'damp' | 'condensation' | 'timber' | 'woodworm' | 'external' | 'general'
}

export const PROPOSAL_ITEMS: ProposalItem[] = [
  {
    id: 'injection_dpc',
    label: 'Injection damp proof course',
    text: 'Install a low-pressure injection damp proof course system as indicated on the attached sketch plan.',
    category: 'damp',
  },
  {
    id: 'strip_plaster',
    label: 'Strip plaster/render',
    text: 'Strip off existing plaster/render to the affected areas.',
    category: 'damp',
  },
  {
    id: 'damp_proofing_system',
    label: 'Install damp proofing system',
    text: 'Install a damp proofing system as per the attached sketch plan.',
    category: 'damp',
  },
  {
    id: 'french_drain',
    label: 'French drain / lower ground levels',
    text: 'Form a French drain or lower external ground levels to reduce bridging risk.',
    category: 'external',
  },
  {
    id: 'piv_unit',
    label: 'PIV unit',
    text: 'Supply and install a positive input ventilation system to improve background air movement and reduce condensation risk.',
    category: 'condensation',
  },
  {
    id: 'extractor_cvent',
    label: 'Extractor / Cvent',
    text: 'Supply and install extractor fan or Cvent unit to improve ventilation to the affected area.',
    category: 'condensation',
  },
  {
    id: 'mould_treatment',
    label: 'Mould treatment',
    text: 'Treat and clean mould-affected surfaces with suitable fungicidal wash.',
    category: 'condensation',
  },
  {
    id: 'subfloor_ventilation',
    label: 'Improve sub-floor ventilation',
    text: 'Improve sub-floor ventilation by upgrading or installing additional airbricks.',
    category: 'external',
  },
  {
    id: 'timber_investigation',
    label: 'Timber opening up / investigation',
    text: 'Carry out further investigation and opening up during works to confirm the full extent of timber decay.',
    category: 'timber',
  },
  {
    id: 'timber_repair',
    label: 'Timber repair/treatment',
    text: 'Cut out affected timbers and treat remaining timber cut ends as required.',
    category: 'timber',
  },
  {
    id: 'woodworm_treatment',
    label: 'Woodworm treatment',
    text: 'Carry out treatment for woodboring insects to affected and connected timber areas.',
    category: 'woodworm',
  },
  {
    id: 'client_arrange_others',
    label: 'Client to arrange others',
    text: 'Client to arrange separate plumber/electrician/joiner attendance where required.',
    category: 'general',
  },
  {
    id: 'no_damp_works',
    label: 'Pre-purchase / dry areas — no works proposed',
    text: 'No remedial damp proofing works are proposed to the areas where dry readings/no visible damp were recorded at the time of inspection.',
    category: 'general',
  },
]

// =============================================================================
// Predefined Limitations — Quick-select access restrictions
// Based on client requirements (company protection)
// =============================================================================

export interface LimitationItem {
  id: string
  label: string
  text: string
}

export const LIMITATION_ITEMS: LimitationItem[] = [
  {
    id: 'furniture',
    label: 'Furniture',
    text: 'Areas concealed behind fitted or freestanding furniture were not inspected.',
  },
  {
    id: 'floor_coverings',
    label: 'Floor coverings',
    text: 'Areas beneath fitted floor coverings were not inspected.',
  },
  {
    id: 'kitchen_units',
    label: 'Kitchen units',
    text: 'Areas behind and beneath fitted kitchen units were not accessible.',
  },
  {
    id: 'wall_linings',
    label: 'Wall linings / plasterboard',
    text: 'Areas behind wall linings, dry lining or plasterboard could not be inspected without destructive testing.',
  },
  {
    id: 'fitted_wardrobes',
    label: 'Fitted wardrobes',
    text: 'Areas behind and beneath fitted wardrobes were not inspected.',
  },
  {
    id: 'subfloor_inaccessible',
    label: 'Inaccessible sub-floor void',
    text: 'The sub-floor void was not accessible for inspection at the time of survey.',
  },
  {
    id: 'loft_restricted',
    label: 'Loft restrictions',
    text: 'Access to part or all of the loft space was restricted at the time of inspection.',
  },
  {
    id: 'cellar_restricted',
    label: 'Cellar restrictions',
    text: 'Access to part or all of the cellar was restricted at the time of inspection.',
  },
  {
    id: 'concealed_timbers',
    label: 'Concealed timbers',
    text: 'Timbers concealed within floors, walls or ceilings were not inspected without opening up.',
  },
  {
    id: 'stored_items',
    label: 'Stored items',
    text: 'Areas blocked by stored items or personal possessions were not inspected.',
  },
  {
    id: 'high_level',
    label: 'High-level areas',
    text: 'High-level areas that could not be safely reached were inspected from ground level only.',
  },
  {
    id: 'tenant_occupied',
    label: 'Tenant occupied',
    text: 'Certain areas could not be fully accessed as the property was tenant occupied at the time of inspection.',
  },
]
