const CACHE = 'harris-v1';
const ASSETS = ['/', '/index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});

// Store scheduled notification IDs
let scheduledNotifs = [];

self.addEventListener('message', e => {
  if (e.data?.type === 'schedule') {
    scheduleAll(e.data.notifs, e.data.priorities);
  }
});

function scheduleAll(notifs, priorities) {
  // Clear existing
  scheduledNotifs.forEach(id => clearTimeout(id));
  scheduledNotifs = [];

  const now = new Date();

  function scheduleAt(hour, min, title, body, enabled) {
    if (!enabled) return;
    const target = new Date();
    target.setHours(hour, min, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const delay = target - now;
    const id = setTimeout(() => {
      self.registration.showNotification(title, {
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
        vibrate: [200, 100, 200],
        tag: `harris-${hour}-${min}`,
      });
    }, delay);
    scheduledNotifs.push(id);
  }

  const isWeekday = [1,2,3,4,5].includes(now.getDay());

  scheduleAt(6, 30, 'Good morning, Harris', 'Check in — who do you want to be today?', notifs.morning);
  scheduleAt(20, 0, 'Evening check-in', 'What went well today?', notifs.evening);

  if (isWeekday) {
    scheduleAt(10, 30, 'Take a break', `You said: ${priorities}`, notifs.break1);
    scheduleAt(13, 0, 'Midday break', `You said: ${priorities}`, notifs.break2);
  }
}
