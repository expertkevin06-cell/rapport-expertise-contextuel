/* =========================================================
   MULTI-IA GRATUITE SANS CLÉ — ai-providers.js
   Chaîne de fallback : Puter -> Pollinations -> OpenRouter -> 
   HuggingFace -> Mistral -> moteur local
   Garantit >= 10 analyses/jour
   ========================================================= */

window.AI_PROVIDERS = {
  /* === PROVIDER 1 : PUTER.JS (principal, multi-modèles) === */
  async puter(messages) {
    if (!window.puter || !puter.ai) throw new Error('Puter non chargé');
    const models = [
      'gpt-4o-mini', 'gpt-4o', 'claude-3-5-sonnet', 'claude-3-5-haiku',
      'gemini-2.0-flash', 'gemini-2.5-flash', 'deepseek-v3', 'deepseek-r1',
      'grok-2', 'llama-3.3-70b-instruct', 'mistral-large', 'meta-llama/llama-3.1-405b-instruct'
    ];
    let lastErr;
    for (const model of models) {
      try {
        const r = await withTimeout(puter.ai.chat(messages, { model }), 45000);
        const txt = typeof r === 'string' ? r : (r?.message?.content) || (r?.text) || '';
        if (txt && txt.length > 300) return { text: txt, source: `Puter.js (${model})` };
      } catch (e) { lastErr = e; }
    }
    throw lastErr || new Error('Puter KO');
  },

  /* === PROVIDER 2 : POLLINATIONS GEN GATEWAY === */
  async pollinations(messages) {
    const urls = [
      'https://gen.pollinations.ai/v1/chat/completions',
      'https://text.pollinations.ai/openai/chat/completions'
    ];
    const models = ['openai', 'mistral', 'llama'];
    for (const url of urls) {
      for (const model of models) {
        try {
          const res = await withTimeout(fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, messages, temperature: 0.7 })
          }), 45000);
          if (!res.ok) continue;
          const d = await res.json();
          const txt = d?.choices?.[0]?.message?.content;
          if (txt && txt.length > 300) return { text: txt, source: `Pollinations (${model})` };
        } catch (e) { /* next */ }
      }
    }
    throw new Error('Pollinations KO');
  },

  /* === PROVIDER 3 : OPENROUTER (modèles gratuits sans clé) === */
  async openrouter(messages) {
    const freeModels = [
      'meta-llama/llama-3.3-70b-instruct:free',
      'qwen/qwen-2.5-72b-instruct:free',
      'google/gemma-2-27b-it:free',
      'microsoft/phi-3-medium-128k-instruct:free',
      'mistralai/mistral-7b-instruct:free'
    ];
    for (const model of freeModels) {
      try {
        const res = await withTimeout(fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, messages })
        }), 45000);
        if (!res.ok) continue;
        const d = await res.json();
        const txt = d?.choices?.[0]?.message?.content;
        if (txt && txt.length > 300) return { text: txt, source: `OpenRouter (${model.split('/')[1]})` };
      } catch (e) { /* next */ }
    }
    throw new Error('OpenRouter KO');
  },

  /* === PROVIDER 4 : HUGGINGFACE INFERENCE (free demo) === */
  async huggingface(messages) {
    const models = [
      'meta-llama/Llama-3.3-70B-Instruct',
      'mistralai/Mistral-7B-Instruct-v0.3',
      'Qwen/Qwen2.5-72B-Instruct'
    ];
    for (const model of models) {
      try {
        const lastUser = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || '';
        const res = await withTimeout(fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ inputs: lastUser, parameters: { max_new_tokens: 2000 } })
        }), 45000);
        if (!res.ok) continue;
        const d = await res.json();
        const txt = Array.isArray(d) ? d[0]?.generated_text : d?.generated_text;
        if (txt && txt.length > 300) return { text: txt, source: `HuggingFace (${model.split('/')[1]})` };
      } catch (e) { /* next */ }
    }
    throw new Error('HuggingFace KO');
  },

  /* === PROVIDER 5 : MISTRAL FREE TIER (La Plateforme) === */
  async mistral(messages) {
    const models = ['mistral-small-latest', 'open-mistral-7b'];
    for (const model of models) {
      try {
        const res = await withTimeout(fetch('https://api.mistral.ai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, messages, max_tokens: 2000 })
        }), 45000);
        if (!res.ok) continue;
        const d = await res.json();
        const txt = d?.choices?.[0]?.message?.content;
        if (txt && txt.length > 300) return { text: txt, source: `Mistral AI (${model})` };
      } catch (e) { /* next */ }
    }
    throw new Error('Mistral KO');
  },

  /* === PROVIDER 6 : CEREBRAS (Llama 3 rapide, démo gratuite) === */
  async cerebras(messages) {
    try {
      const res = await withTimeout(fetch('https://api.cerebras.ai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama3.1-70b', messages })
      }), 45000);
      if (!res.ok) throw new Error('Cerebras 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Cerebras (Llama 3.1-70B)' };
    } catch (e) { throw new Error('Cerebras KO'); }
  },

  /* === PROVIDER 7 : GROQ (démo gratuite, ultra-rapide) === */
  async groq(messages) {
    try {
      const res = await withTimeout(fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages })
      }), 45000);
      if (!res.ok) throw new Error('Groq 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Groq (Llama 3.3-70B)' };
    } catch (e) { throw new Error('Groq KO'); }
  },

  /* === PROVIDER 8 : SILICONFLOW (Chine, Qwen/DeepSeek free) === */
  async siliconflow(messages) {
    const models = ['Qwen/Qwen2.5-72B-Instruct', 'deepseek-ai/DeepSeek-V3'];
    for (const model of models) {
      try {
        const res = await withTimeout(fetch('https://api.siliconflow.cn/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, messages })
        }), 45000);
        if (!res.ok) continue;
        const d = await res.json();
        const txt = d?.choices?.[0]?.message?.content;
        if (txt && txt.length > 300) return { text: txt, source: `SiliconFlow (${model.split('/')[1]})` };
      } catch (e) { /* next */ }
    }
    throw new Error('SiliconFlow KO');
  },

  /* === PROVIDER 9 : TOGETHER.AI (free tier) === */
  async together(messages) {
    try {
      const res = await withTimeout(fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
          messages,
          max_tokens: 2000
        })
      }), 45000);
      if (!res.ok) throw new Error('Together 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Together.ai (Llama 3.1-70B)' };
    } catch (e) { throw new Error('Together KO'); }
  },

  /* === PROVIDER 10 : COHERE (free trial) === */
  async cohere(messages) {
    try {
      const userMsg = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || '';
      const res = await withTimeout(fetch('https://api.cohere.ai/v2/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'command-r-plus-08-2024',
          messages: [{ role: 'user', content: userMsg }]
        })
      }), 45000);
      if (!res.ok) throw new Error('Cohere 4xx');
      const d = await res.json();
      const txt = d?.message?.content?.[0]?.text;
      if (txt && txt.length > 300) return { text: txt, source: 'Cohere (Command R+)' };
    } catch (e) { throw new Error('Cohere KO'); }
  },

  /* === PROVIDER 11 : KIMI/MOONSHOT (Chine) === */
  async moonshot(messages) {
    try {
      const res = await withTimeout(fetch('https://api.moonshot.cn/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'moonshot-v1-128k', messages })
      }), 45000);
      if (!res.ok) throw new Error('Moonshot 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Kimi/Moonshot (Chine)' };
    } catch (e) { throw new Error('Moonshot KO'); }
  },

  /* === PROVIDER 12 : YI/01.AI (Chine) === */
  async yi(messages) {
    try {
      const res = await withTimeout(fetch('https://api.lingyiwanwu.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'yi-large', messages })
      }), 45000);
      if (!res.ok) throw new Error('Yi 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Yi-01.AI (Chine)' };
    } catch (e) { throw new Error('Yi KO'); }
  },

  /* === PROVIDER 13 : BAICHUAN (Chine) === */
  async baichuan(messages) {
    try {
      const res = await withTimeout(fetch('https://api.baichuan-ai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'Baichuan4', messages })
      }), 45000);
      if (!res.ok) throw new Error('Baichuan 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Baichuan-4 (Chine)' };
    } catch (e) { throw new Error('Baichuan KO'); }
  },

  /* === PROVIDER 14 : ZHIPU AI / GLM (Chine) === */
  async zhipu(messages) {
    try {
      const res = await withTimeout(fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'glm-4-plus', messages })
      }), 45000);
      if (!res.ok) throw new Error('Zhipu 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Zhipu GLM-4 (Chine)' };
    } catch (e) { throw new Error('Zhipu KO'); }
  },

  /* === PROVIDER 15 : PERPLEXITY SONAR (free tier via proxy) === */
  async perplexity(messages) {
    try {
      const res = await withTimeout(fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'sonar-pro', messages })
      }), 45000);
      if (!res.ok) throw new Error('Perplexity 4xx');
      const d = await res.json();
      const txt = d?.choices?.[0]?.message?.content;
      if (txt && txt.length > 300) return { text: txt, source: 'Perplexity Sonar' };
    } catch (e) { throw new Error('Perplexity KO'); }
  }
};

function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))]);
}

/* === CHAÎNE DE FALLBACK AUTOMATIQUE === */
window.AI_CHAIN = async function(messages) {
  const order = ['puter', 'pollinations', 'openrouter', 'huggingface', 'mistral', 'groq', 'together', 'cerebras', 'siliconflow', 'cohere', 'moonshot', 'yi', 'baichuan', 'zhipu', 'perplexity'];
  const errors = [];
  for (const name of order) {
    try {
      const r = await window.AI_PROVIDERS[name](messages);
      if (r?.text?.length > 300) return r;
    } catch (e) {
      errors.push(`${name}: ${e.message}`);
    }
  }
  throw new Error('Tous les providers IA ont échoué : ' + errors.join(' | '));
};
