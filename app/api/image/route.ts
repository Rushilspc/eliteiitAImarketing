import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { imageDescription } = await request.json()

    const enhancementSystemPrompt = `You are a senior prompt engineer specializing in Google Imagen 3 prompts for India's top edtech brands. Your role is to transform a single-line marketing idea into a highly focused, versatile image prompt that drives engagement and aligns with best practices from leading edtech in india

MARKETING IMAGE GUIDELINES:
- Adapt to any campaign type: discounts, festive offers, course launches, success stories, testimonials, referral drives, or event announcements  
- Reflect brand professionalism with clean, modern design: uncluttered layouts, strong focal points, balanced negative space  
- Include relevant elements: product screenshots, certificates, trophies, animated icons, or abstract branding shapes—depending on idea  
- Use emotive cues: confident expressions, celebratory gestures, teamwork, aspiration, or curiosity  
- Ensure versatility: can feature students, instructors, icons, text overlays, symbolic imagery (e.g., rising arrows for growth, clocks for time-limited offers)  
- Maintain Indian market appeal: bright yet natural lighting, clear typography areas, culturally neutral backgrounds  

TECHNICAL OPTIMIZATION:
- Resolution: Ultra HD, 300 dpi  
- Composition: rule of thirds or centered focus, adjustable per idea  
- Lighting: even diffused daylight style or spotlight emphasis  
- Depth of Field: selective focus to highlight main subject  
- Color Palette: brand-aligned accent colors with high contrast for call-to-action  
- Style: photorealistic with graphic design polish, or stylized illustration if idea demands

USER IDEA: "${imageDescription}"

TASK:
Craft a detailed Google Imagen 3 prompt that:
1. Interprets the user's marketing idea accurately  
2. Selects appropriate visual elements (people, icons, symbols, backgrounds)  
3. Specifies detailed composition, lighting, and style  
4. Aligns with Indian edtech marketing standards  
5. Is ready for immediate generation by Imagen 3  

Output only the final enhanced prompt.`

    const enhanceResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content: enhancementSystemPrompt
          },
          {
            role: 'user',
            content: `Enhance this image idea: ${imageDescription}`
          }
        ],
      }),
    })

    const enhanceData = await enhanceResponse.json()
    
    if (!enhanceResponse.ok) {
      throw new Error(enhanceData.error?.message || 'Failed to enhance prompt')
    }

    const enhancedPrompt = enhanceData.choices[0]?.message?.content || imageDescription

    return NextResponse.json({ 
      enhancedPrompt,
      originalIdea: imageDescription
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to enhance prompt' },
      { status: 500 }
    )
  }
}
