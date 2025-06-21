
# NgRx Schematics CLI Cheat Sheet

This document lists the most useful `@ngrx/schematics` CLI commands and what each command does.

---

## ✅ Set Default Schematics Collection (Optional)

```bash
ng config cli.defaultCollection @ngrx/schematics
```
> ⚠️ This only works if you have a traditional `angular.json` setup. If you're using `standalone` and don’t have a `module`, you may skip this.

---

## 1. Create Entity Feature (Actions + Reducer + Model)

```bash
ng generate @ngrx/schematics:entity store/products/product --flat --group
```
- 📁 Creates:
  - `product.actions.ts`
  - `product.reducer.ts`
  - `product.models.ts`
- ➕ Adds Entity boilerplate for CRUD support.
- ❌ Does **not** generate selectors or effects.

---

## 2. Create Selectors

```bash
ng generate @ngrx/schematics:selector store/products/product --flat --group
```
- 📁 Creates:
  - `product.selectors.ts`
- ✅ Auto-generates `createFeatureSelector` and uses entity adapter if present.

---

## 3. Create Effects

```bash
ng generate @ngrx/schematics:effect store/products/product --flat --group
```
- 📁 Creates:
  - `product.effects.ts`
- ⚠️ You must manually implement the effect logic.
- ✅ Automatically injects `Actions`.

---

## 4. Create Feature (NgModule-based projects)

```bash
ng generate @ngrx/schematics:feature store/products --module app --group
```
- 📁 Creates:
  - `products.actions.ts`
  - `products.reducer.ts`
> ⚠️ Not useful if you're using **standalone components** and **`app.config.ts`** instead of `app.module.ts`.

---

## 5. Create Actions

```bash
ng generate @ngrx/schematics:action store/products/product --flat --group
```
- 📁 Creates:
  - `product.actions.ts`
- Uses `createActionGroup`.

---

## Notes

- `--flat`: Create file directly in `store/products/` folder, not nested inside `product/`.
- `--group`: Group by type (puts actions/reducer/effect/selector together).

---

## 💡 Recommended File Structure

```
store/
  products/
    product.actions.ts
    product.reducer.ts
    product.selectors.ts
    product.effects.ts
    product.entity.ts
    product.models.ts
```

---

## 🛠 Manual Integration

In `app.config.ts`:

```ts
provideStore({ products: productReducer }),
provideEffects(ProductEffects)
```

---

## 🔗 References

- Official Docs: https://ngrx.io/guide/schematics
