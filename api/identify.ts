import Anthropic from '@anthropic-ai/sdk';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { image } = await req.json();
    
    const anthropic = new Anthropic({
      apiKey: process.env.VITE_ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: {
              type: 'base64',
              media_type: 'image/jpeg',
              data: image.split(',')[1] || image,
            },
          },
          {
            type: 'text',
            text: `You are a botanical expert specializing in the wildflowers and plants of the Catskill Mountains in New York. 

Identify this plant and provide:
1. Common name
2. Scientific (Latin) name
3. Plant family
4. Bloom season (spring/summer/fall/winter)
5. Typical habitat
6. Your confidence level (0-100)
7. Brief reasoning for your identification

Format your response as JSON with these exact keys: commonName, latinName, family, bloomSeason, habitat, confidence, reasoning.

If you cannot identify it with reasonable confidence, still provide your best guess but set confidence appropriately low.`
          }
        ]
      }],
    });

    const content = message.content[0];
    if (content.type === 'text') {
      // Parse the JSON response
      const jsonMatch = content.text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const result = JSON.parse(jsonMatch[0]);
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    return new Response(JSON.stringify({ error: 'Could not parse identification result' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error: any) {
    console.error('Identification error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
