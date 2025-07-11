Actions – Dispatch intent.
Reducers – Pure functions to change state.
Selectors – Read state.
Effects – Handle side effects (e.g., API calls).

📘 What to Learn Next

1. Feature State Modules
Organizing NgRx state by feature module
StoreModule.forFeature()
EffectsModule.forFeature()
This is key in scalable apps (lazy-loaded modules especially).

2. Router Store
Connect Angular Router state with NgRx
Access route params in selectors
Dispatch navigation actions
npm install @ngrx/router-store

3. Entity State (NgRx Entity)
Managing collections (e.g. list of users/products) easily
Simplifies reducers/selectors for CRUD
Uses adapter: createEntityAdapter()
const adapter = createEntityAdapter<Product>();

4. Immutability Best Practices (IGNORED)
Deep understanding of immutable update patterns
Use immer, spread, or helper functions.

5. DevTools / Time Travel Debugging (IGNORED)
Integrate with Redux DevTools Extension
npm install @ngrx/store-devtools
StoreDevtoolsModule.instrument({ maxAge: 25 })

6. NgRx Schematics
Auto-generate boilerplate
ng generate store --name=products --module=app

7. NgRx Signals (if using Angular v17+ with Signals)
Reactive programming with Signals integration
Explore @ngrx/signals package

8. Testing in NgRx (IGNORED)
How to test:
Actions
Reducers (pure functions – easiest)
Effects (with provideMockActions) (Effects unit testing)
Selectors

9. NgRx Component Store (alternative to global store)
For local state in components/services
Simpler, more focused state management for isolated parts.
npm install @ngrx/component-store

10. Hydration / Persistence
Save and load store to/from localStorage
Use custom MetaReducers or libraries like ngrx-store-localstorage.

11. Custom Meta-Reducers (e.g., logging, error handling globally)
12. NgRx Data (experimental) – abstraction over Entity & Effects

99090 21667
nilay maheta gastrologiest zydus sarkhej