## Umami Integration Steps

### 1. **Deploy Umami**

- Deploy Umami using Docker or a free hosting provider like **Render**.
- Add your website in the Umami dashboard to get a `website-id`.

---

### 2. **Add Tracking Script to Your App**

Add this to your `index.html` (in `<head>`):

```html
<script
  defer
  src="https://your-umami-instance/script.js"
  data-website-id="your-website-id"
></script>
```

---

### 3. **Track Custom Events in Your React App**

#### a. **Create a tracking utility**

Example (`umamiTracker.ts`):

```ts
export const trackEvent = (eventName: string, data?: object) => {
  if ((window as any).umami) {
    (window as any).umami.track(eventName, data || {});
  }
};
```

---

### 4. **Track Visit Frequency**

```ts
const trackVisitFrequency = () => {
  let userId = localStorage.getItem("umami_user_id");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("umami_user_id", userId);
  }

  trackEvent("visit-frequency", { userId });
};
```

---

### 5. **Track Session Duration**

```ts
const trackSessionDuration = () => {
  const start = Date.now();
  window.addEventListener("beforeunload", () => {
    const duration = Math.round((Date.now() - start) / 1000);
    trackEvent("session-duration", { duration });
  });
};
```

---

### 6. **Track Login/Logout Time**

```ts
const trackLogin = () => {
  trackEvent("login-time", { timestamp: new Date().toISOString() });
};

const trackLogout = () => {
  trackEvent("logout-time", { timestamp: new Date().toISOString() });
};
```

---

### 7. **Call These Functions in Your App**

In your `main.tsx` or inside a React effect:

```ts
trackVisitFrequency();
trackSessionDuration();
// Call login/logout trackers wherever appropriate
```

---
