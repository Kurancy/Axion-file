/**
 * Visitor Session Helper
 * Ensures a stable, unique visitor ID is generated per browser session
 * and persists across page refreshes and navigation.
 */

export interface VisitorSession {
  visitorId: string;
  visitorName: string;
}

export function getOrCreateVisitorSession(): VisitorSession {
  // Check sessionStorage first, then localStorage
  let vid = sessionStorage.getItem("axion_visitor_id") || localStorage.getItem("axion_visitor_id");

  if (!vid) {
    // Generate a fresh unique visitor ID per browser session
    vid = "v_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
    try {
      sessionStorage.setItem("axion_visitor_id", vid);
      localStorage.setItem("axion_visitor_id", vid);
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  } else {
    // Ensure both storage mechanisms stay in sync
    try {
      sessionStorage.setItem("axion_visitor_id", vid);
      localStorage.setItem("axion_visitor_id", vid);
    } catch (e) {}
  }

  let vName = localStorage.getItem("axion_visitor_name") || sessionStorage.getItem("axion_visitor_name");

  if (!vName) {
    const shortTag = vid.slice(-4).toUpperCase();
    vName = `Visitor #${shortTag}`;
  }

  return { visitorId: vid, visitorName: vName };
}

export function updateVisitorName(name: string): void {
  const trimmed = name.trim();
  if (!trimmed) return;
  try {
    localStorage.setItem("axion_visitor_name", trimmed);
    sessionStorage.setItem("axion_visitor_name", trimmed);
  } catch (e) {}
}

export function resetVisitorSession(): VisitorSession {
  const newVid = "v_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
  try {
    sessionStorage.setItem("axion_visitor_id", newVid);
    localStorage.setItem("axion_visitor_id", newVid);
    localStorage.removeItem("axion_visitor_name");
    sessionStorage.removeItem("axion_visitor_name");
  } catch (e) {}
  const shortTag = newVid.slice(-4).toUpperCase();
  return { visitorId: newVid, visitorName: `Visitor #${shortTag}` };
}
