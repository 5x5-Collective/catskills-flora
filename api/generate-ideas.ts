import Anthropic from '@anthropic-ai/sdk';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { commonName, latinName, family } = await req.json();
    
    const anthropic = new Anthropic({
      apiKey: process.env.VITE_ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      messages: [{
        role: 'user',
        content: `You are a creative naturalist and herbalist with deep knowledge of traditional plant uses.

For the plant "${commonName}" (${latinName}, family ${family}), generate creative DIY ideas across these categories:

1. Food & Drink (teas, culinary uses, foraging)
2. Medicine & Wellness (remedies, aromatherapy)
3. Fiber & Dye (textiles, natural dyes, crafts)
4. Home & Craft (decorative, practical household uses)
5. Unusual/Experimental (creative, unexpected applications)
6. Historical uses (how indigenous peoples and early settlers used it)

For each category, provide 1-2 specific ideas. Each idea should include:
- title: Short catchy name
- method: Step-by-step instructions (2-4 sentences)
- difficulty: "Easy", "Moderate", or "Advanced"
- seasonRelevance: When this is best done
- category: Which category it belongs to (food/medicine/fiber/home/unusual/historical)

**IMPORTANT SAFETY NOTE**: If any part of the plant is toxic or has safety concerns, mention this clearly in the method. If the plant should not be consumed or handled, focus on observation, photography, or symbolic/decorative uses instead.

Return your response as a JSON array of idea objects. Aim for 8-12 diverse, creative, and practical ideas.`
      }],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      // Parse the JSON response
      const jsonMatch = content.text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const ideas = JSON.parse(jsonMatch[0]);
        return new Response(JSON.stringify(ideas), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Could not parse ideas' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Idea generation error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
