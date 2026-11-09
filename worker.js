export default {
  async fetch(request, env) {
    const cors = { 
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "POST, OPTIONS", 
      "Access-Control-Allow-Headers": "Content-Type" 
    };
    
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Method Not Allowed", { headers: cors });
    
    try {
      const body = await request.json();
      const formData = new URLSearchParams();
      formData.append("key", env.SMM_API_KEY); 
      formData.append("action", "add");
      formData.append("service", "4448");
      formData.append("link", body.link);
      formData.append("quantity", body.quantity);
      
      const res = await fetch("https://7panel.net/api/v2", { method: "POST", body: formData });
      const data = await res.json();
      
      return new Response(JSON.stringify(data), { 
        headers: { ...cors, "Content-Type": "application/json" } 
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500, 
        headers: { ...cors, "Content-Type": "application/json" } 
      });
    }
  }
};
