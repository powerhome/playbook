/**
 * Load kit catalog metadata from playbook-website/config/menu.yml.
 * Uses Ruby Psych (aliases enabled) — no extra npm YAML dependency.
 */

import { execFileSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// playbook/scripts/lib → repo root → playbook-website/config/menu.yml
const DEFAULT_MENU_PATH = path.resolve(
  __dirname,
  '../../../playbook-website/config/menu.yml'
);

const RUBY_EXTRACT = `
require "yaml"
require "json"

path = ARGV[0]
menu = YAML.load_file(path, aliases: true)
kits_out = {}
categories_out = {}

(menu["kits"] || []).each do |category|
  cat_name = category["category"]
  cat_desc = category["description"].to_s.strip.gsub(/\\s+/, " ")
  categories_out[cat_name] = { "description" => cat_desc }

  (category["components"] || []).each do |component|
    parent = component["parent"]
    name = component["name"]
    kit_name = (parent && !parent.to_s.empty?) ? parent : name
    desc = component["description"].to_s.strip.gsub(/\\s+/, " ")
    status = component["status"]

    kits_out[kit_name] ||= {
      "category" => cat_name,
      "categoryDescription" => cat_desc,
      "description" => nil,
      "status" => status,
      "sections" => []
    }

    if parent && !parent.to_s.empty?
      kits_out[kit_name]["description"] ||= cat_desc
      kits_out[kit_name]["sections"] << {
        "name" => name,
        "description" => desc.empty? ? nil : desc
      }.compact
    else
      kits_out[kit_name]["description"] = desc.empty? ? cat_desc : desc
      kits_out[kit_name]["status"] = status if status
    end
  end
end

puts JSON.generate({ "categories" => categories_out, "kits" => kits_out })
`;

export function loadMenuCatalog(menuPath = DEFAULT_MENU_PATH) {
  try {
    const stdout = execFileSync('ruby', ['-e', RUBY_EXTRACT, menuPath], {
      encoding: 'utf8',
      maxBuffer: 10 * 1024 * 1024,
    });
    return JSON.parse(stdout);
  } catch (error) {
    console.warn('⚠️  Could not load menu.yml catalog:', error.message);
    return { categories: {}, kits: {} };
  }
}

/** Prefer menu description over thin generated "X component" schema text. */
export function isThinSchemaDescription(description) {
  if (!description || typeof description !== 'string') return true;
  const trimmed = description.trim();
  if (trimmed.length < 40) return true;
  return /component$/i.test(trimmed);
}

export function enrichSchemaFromMenu(schema, kitName, menuKit) {
  if (!schema || !menuKit) return schema;

  const next = { ...schema };
  if (menuKit.description && isThinSchemaDescription(schema.description)) {
    next.description = menuKit.description;
  }
  if (menuKit.category) next.category = menuKit.category;
  if (menuKit.status) next.status = menuKit.status;
  return next;
}
