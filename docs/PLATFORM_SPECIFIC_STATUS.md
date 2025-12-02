# Platform-Specific Status

This document explains how to set status per platform for Playbook kits.

## Overview

Previously, you could only set a single `status` for an entire kit (e.g., `status: stable`, `status: beta`, or `status: deprecated`). This meant if one platform implementation was beta while others were stable, you couldn't differentiate.

Now you can set status per platform using the `platforms_status` field while maintaining full backward compatibility with the existing `status` field.

## Usage

### Option 1: Kit-Level Status (Backward Compatible)

This is the traditional approach that continues to work:

```yaml
components:
  - name: my_component
    platforms: web
    status: stable  # Applies to all platforms
    icons_used: false
    react_rendered: false
    enhanced_element_used: false
```

### Option 2: Platform-Specific Status (New Feature)

Use `platforms_status` to set different statuses for different platforms:

```yaml
components:
  - name: my_component
    platforms: all
    status: stable  # Fallback if platform not specified in platforms_status
    platforms_status:
      rails: stable
      react: beta
      swift: deprecated
    icons_used: false
    react_rendered: false
    enhanced_element_used: false
```

### Hybrid Approach

You can also use both fields together. The `platforms_status` takes precedence when defined for a specific platform, otherwise it falls back to the kit-level `status`:

```yaml
components:
  - name: my_component
    platforms: all
    status: stable  # Used for platforms not listed in platforms_status
    platforms_status:
      react: beta  # Only React is beta
    icons_used: false
    react_rendered: false
    enhanced_element_used: false
```

In this example:
- Rails implementation: `stable` (from fallback)
- React implementation: `beta` (from platforms_status)
- Swift implementation: `stable` (from fallback)

## How It Works

The system checks for platform-specific status in the following order:

1. **Check `platforms_status`**: If defined and contains a status for the current platform, use that
2. **Fallback to `status`**: If `platforms_status` is not defined or doesn't contain the current platform, use the kit-level `status`

This ensures complete backward compatibility. All existing kits using only `status` will continue to work exactly as before.

## Status Values

Available status values:
- `stable`: Production-ready and fully supported
- `beta`: Functional and supported, but may undergo changes
- `deprecated`: Avoid using, will be removed in future versions


## Migration Guide

If you want to migrate a kit from kit-level status to platform-specific status:

**Before:**
```yaml
- name: my_component
  status: beta
```

**After:**
```yaml
- name: my_component
  status: stable  # Keep as fallback
  platforms_status:
    rails: stable
    react: beta
    swift: stable
```

You can do this migration gradually, there's no need to update all kits at once.
