import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { FORM_ACTIONS, FORM_BUILDER, FORM_METHODS } from './form-contracts.mjs';
import { COMMON_FORM_FAQS, KIT_USAGE_FAQS, usageFaqsForKit } from './usage-faqs.mjs';

const extractor = fileURLToPath(new URL('./extract_form_structure.rb', import.meta.url));

export function extractFormStructure(packageRoot) {
  try {
    return JSON.parse(execFileSync('ruby', [extractor, packageRoot], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }));
  } catch (error) {
    throw new Error(`Cannot extract Rails form structure (Ruby with standard-library Ripper is required):\n${error.stderr || error.message}`);
  }
}

export function formContractForKit(kit, metadata) {
  const methods = metadata.methods.filter((method) => method.kit === kit);
  if (!methods.length && kit !== metadata.actions.kit) return null;
  return { rails: { builder: { ...metadata.builder, methods, ...(kit === metadata.actions.kit ? { actions: metadata.actions } : {}) } } };
}

/** Structural facts come exclusively from Ruby; every method still needs curated behavior. */
export function validateFormContracts(packageRoot, kitNames, contracts = FORM_METHODS) {
  const structure = extractFormStructure(packageRoot);
  const names = contracts.map(({ name }) => name);
  if (new Set(names).size !== names.length) throw new Error('Duplicate form method contract');
  if (new Set(structure.methods.map(({ name }) => name)).size !== structure.methods.length) throw new Error('Duplicate Ruby form method');
  for (const method of structure.methods) {
    if (!names.includes(method.name)) throw new Error(`Missing or incorrect form contract: ${method.name} → ${method.kit}`);
    if (!kitNames.includes(method.kit)) throw new Error(`Unknown form kit: ${method.kit}`);
  }
  for (const contract of contracts) {
    if (!structure.methods.some(({ name }) => name === contract.name)) throw new Error(`Stale form contract: ${contract.name}`);
    if (['kit', 'signature', 'sources'].some((key) => key in contract)) throw new Error(`Structural fields must come from Ruby: ${contract.name}`);
  }
  const metadata = {
    builder: FORM_BUILDER,
    methods: structure.methods.map((method) => ({ ...contracts.find(({ name }) => name === method.name), ...method })),
    actions: { ...FORM_ACTIONS, ...structure.actions },
  };
  if (!kitNames.includes(metadata.actions.kit)) throw new Error('Missing form action kit');
  for (const kit of Object.keys(KIT_USAGE_FAQS)) {
    if (!kitNames.includes(kit)) throw new Error(`Unknown FAQ kit: ${kit}`);
  }
  for (const kit of kitNames) {
    const form = formContractForKit(kit, metadata);
    const faqs = usageFaqsForKit(kit, form);
    if (new Set(faqs.map(({ id }) => id)).size !== faqs.length) throw new Error(`Duplicate FAQ id for ${kit}`);
    for (const faq of faqs) {
      for (const reference of faq.contractPaths || []) {
        const resolved = reference.split('.').reduce((value, key) => value?.[key], { form });
        if (resolved === undefined || resolved === null) throw new Error(`Unresolved FAQ contract path: ${kit}/${faq.id}/${reference}`);
      }
    }
  }
  return metadata;
}

export function buildFormsIndex(version, metadata) {
  return { metadataVersion: 1, version, ...metadata, faqs: COMMON_FORM_FAQS };
}

export function enrichSchemaForms(schema, kit, metadata) {
  const form = formContractForKit(kit, metadata);
  const faqs = usageFaqsForKit(kit, form);
  if (!form && !faqs.length) return schema;
  return { ...schema, ...(form ? { form } : {}), faqs };
}
