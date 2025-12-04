# Step 2 Implementation Summary: Runtime Deprecation Warnings

## What Was Implemented

### 1. Core Utility (`deprecated.ts`)
**Location:** `/playbook/app/pb_kits/playbook/utilities/deprecated.ts`

**Key Function:** `deprecatedKitWarning(kitName, message?)`

**Features:**
- ✅ Logs console warnings for deprecated kits
- ✅ Only runs in development mode (production-safe)
- ✅ Prevents duplicate warnings (one per kit per page load)
- ✅ Supports custom deprecation messages
- ✅ TypeScript typed

**Implementation Details:**
```typescript
const warnedKits = new Set<string>(); // Tracks which kits have warned

export const deprecatedKitWarning = (
  kitName: string,
  message?: string
): void => {
  if (process.env.NODE_ENV === 'production') return;
  if (warnedKits.has(kitName)) return;
  
  warnedKits.add(kitName);
  console.warn(message || `[Playbook] The "${kitName}" kit is deprecated...`);
};
```

### 2. Test Suite (`deprecated.test.ts`)
**Location:** `/playbook/app/pb_kits/playbook/utilities/deprecated.test.ts`

**Coverage:**
- ✅ Warns in development mode
- ✅ Silent in production mode
- ✅ Only logs once per kit
- ✅ Tracks multiple kits separately
- ✅ Custom messages work
- ✅ Reset functionality (for testing)

### 3. Example Implementation (BarGraph)
**Location:** `/playbook/app/pb_kits/playbook/pb_bar_graph/_bar_graph.tsx`

**Changes:**
1. Added import: `import { deprecatedKitWarning } from "../utilities/deprecated";`
2. Added useEffect hook:
```tsx
useEffect(() => {
  deprecatedKitWarning('BarGraph', '[Playbook] The "BarGraph" kit is deprecated. Please use "PbBarGraph" instead.');
}, []);
```

### 4. Documentation
**Location:** `/playbook/app/pb_kits/playbook/utilities/DEPRECATION_WARNINGS.md`

**Contents:**
- Overview and key features
- Step-by-step usage guide
- When to apply warnings (menu.yml reference)
- API reference
- Testing instructions
- Best practices
- Future roadmap

## How It Works

### Developer Experience

**In Development:**
```
Console Output:
[Playbook] The "BarGraph" kit is deprecated. Please use "PbBarGraph" instead.
```
- Warning appears once per page load
- Shows immediately when deprecated kit renders
- Provides clear migration path

**In Production:**
- No warnings (zero performance impact)
- Code is stripped/ignored in production builds

### Integration Pattern

For any deprecated React kit:

1. Import the utility
2. Add a useEffect that runs once on mount
3. Call `deprecatedKitWarning` with kit name and optional custom message

```tsx
import { deprecatedKitWarning } from "../utilities/deprecated";

const YourKit = (props) => {
  useEffect(() => {
    deprecatedKitWarning('YourKit', 'Custom message here');
  }, []);
  
  // ... rest of component
};
```

## Files Created

1. `/playbook/app/pb_kits/playbook/utilities/deprecated.ts` - Core utility
2. `/playbook/app/pb_kits/playbook/utilities/deprecated.test.ts` - Test suite
3. `/playbook/app/pb_kits/playbook/utilities/DEPRECATION_WARNINGS.md` - Documentation
4. `/playbook/STEP_2_SUMMARY.md` - This file

## Files Modified

1. `/playbook/app/pb_kits/playbook/pb_bar_graph/_bar_graph.tsx` - Example implementation

## Next Steps

### To Apply to Other Deprecated Kits

1. Check `playbook-website/config/menu.yml` for kits with:
   - `status: deprecated` (all platforms)
   - `platforms_status: { react: deprecated }` (React-only)

2. For each deprecated React kit:
   - Add import for `deprecatedKitWarning`
   - Add useEffect hook with warning
   - Customize message with migration path

### Current Deprecated Kits (from menu.yml)

**Fully Deprecated:**
- `bar_graph` - ✅ Already implemented (example)

**Platform-Specific (Check before applying):**
- `rich_text_editor` - Rails only, **do NOT apply to React**

### Future Work (Step 3 & 4)

**Step 3:** ESLint rule or TS/JS codemod
- Static analysis to flag deprecated kit imports
- Build-time warnings
- Better DX for catching issues early

**Step 4:** Prop/variant deprecation
- Fine-grained control (deprecate specific props, not whole kit)
- More granular migration paths

## Testing the Implementation

### Manual Testing
1. In a dev environment, import and use `<BarGraph />` component
2. Check browser console for warning
3. Refresh page - warning should appear again
4. Use the component multiple times on same page - warning appears only once

### Automated Testing
```bash
cd playbook
npm test -- deprecated.test.ts
```

## Benefits

✅ **Safe:** Production builds unaffected  
✅ **Simple:** Easy to apply to any kit  
✅ **Smart:** Prevents console spam  
✅ **Scalable:** Can be rolled out kit-by-kit  
✅ **Helpful:** Provides clear migration guidance  

## Risks & Considerations

### Low Risk
- Only runs in dev mode
- No performance impact in production
- Non-breaking (just warnings)
- Easy to remove if needed

### Potential Issues
- Relies on `process.env.NODE_ENV` being set correctly
- Console warnings might be ignored by developers
- Doesn't prevent deprecated kit usage (that's Step 3)

## Success Criteria

✅ Utility function created and tested  
✅ Applied to at least one deprecated kit (BarGraph)  
✅ Works as expected (once per page, dev only)  
✅ Documented for team use  
✅ Ready for rollout to other deprecated kits  

## Conclusion

Step 2 is **complete and ready for rollout**. The deprecation warning system is:
- Implemented and tested
- Applied to an example kit (BarGraph)
- Fully documented
- Safe for production
- Ready to be applied to other deprecated kits

The next step is to systematically apply this to all deprecated React kits by reviewing menu.yml and following the documented process.
